// Hippios — capteur santé cheval (ESP32)
// AD8232 (ECG) + MPU6050 (accéléro/gyro) + DS18B20 (température)
// Envoie une mesure JSON par seconde sur le port série (115200 bauds).

#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// --- Brochage ---
#define PIN_ECG_OUT   34   // AD8232 OUTPUT (ADC1, entrée seule)
#define PIN_ECG_LOP   32   // AD8232 LO+
#define PIN_ECG_LOM   33   // AD8232 LO-
#define PIN_I2C_SDA   21   // MPU6050 SDA
#define PIN_I2C_SCL   22   // MPU6050 SCL
#define PIN_ONEWIRE   4    // DS18B20 DQ (pull-up 4.7 kΩ vers 3V3)

// --- Réglages ---
#define ECG_SAMPLE_HZ     250
#define REPORT_PERIOD_MS  1000
#define REFRACTORY_MS     250    // ignore les pics trop rapprochés (> 240 BPM)
#define STREAM_ECG        0      // 1 = envoie aussi chaque échantillon ECG brut

Adafruit_MPU6050 mpu;
OneWire oneWire(PIN_ONEWIRE);
DallasTemperature tempSensor(&oneWire);

bool mpuOk = false;
float lastTempC = NAN;
unsigned long lastTempRequest = 0;

// Détection des pics R
float ecgPeak = 0;
float ecgBaseline = 1650;
bool aboveThreshold = false;
unsigned long lastBeatMs = 0;
float bpm = 0;
bool leadsOff = false;

unsigned long lastSampleUs = 0;
unsigned long lastReportMs = 0;

void setupMpu() {
  mpuOk = mpu.begin(0x68, &Wire);
  if (!mpuOk) {
    Serial.println("{\"error\":\"MPU6050 introuvable\"}");
    return;
  }
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
}

void setupTemperature() {
  tempSensor.begin();
  tempSensor.setResolution(12);
  tempSensor.setWaitForConversion(false);  // lecture non bloquante
  tempSensor.requestTemperatures();
  lastTempRequest = millis();
}

void sampleEcg() {
  leadsOff = digitalRead(PIN_ECG_LOP) == HIGH || digitalRead(PIN_ECG_LOM) == HIGH;
  if (leadsOff) {
    bpm = 0;
    return;
  }

  float mv = analogReadMilliVolts(PIN_ECG_OUT);

  // Ligne de base lente + enveloppe du pic qui décroît
  ecgBaseline += (mv - ecgBaseline) * 0.005f;
  float amplitude = mv - ecgBaseline;
  ecgPeak = max(ecgPeak * 0.999f, amplitude);

  float threshold = ecgPeak * 0.6f;
  unsigned long now = millis();
  if (!aboveThreshold && amplitude > threshold && ecgPeak > 200) {
    aboveThreshold = true;
    if (now - lastBeatMs > REFRACTORY_MS) {
      if (lastBeatMs > 0) {
        float instant = 60000.0f / (now - lastBeatMs);
        bpm = bpm == 0 ? instant : bpm * 0.7f + instant * 0.3f;
      }
      lastBeatMs = now;
    }
  } else if (aboveThreshold && amplitude < threshold * 0.5f) {
    aboveThreshold = false;
  }

  // Plus de battement depuis 5 s : rythme inconnu
  if (lastBeatMs > 0 && now - lastBeatMs > 5000) bpm = 0;

#if STREAM_ECG
  Serial.printf("ecg:%.0f\n", mv);
#endif
}

void updateTemperature() {
  // Conversion 12 bits = 750 ms
  if (millis() - lastTempRequest >= 750) {
    float t = tempSensor.getTempCByIndex(0);
    lastTempC = (t == DEVICE_DISCONNECTED_C) ? NAN : t;
    tempSensor.requestTemperatures();
    lastTempRequest = millis();
  }
}

void report() {
  Serial.print("{\"ts\":");
  Serial.print(millis());

  Serial.print(",\"ecg\":{\"leadsOff\":");
  Serial.print(leadsOff ? "true" : "false");
  Serial.print(",\"bpm\":");
  Serial.print(bpm, 1);
  Serial.print("}");

  Serial.print(",\"temperature\":");
  if (isnan(lastTempC)) Serial.print("null");
  else Serial.print(lastTempC, 2);

  if (mpuOk) {
    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);
    float pitch = atan2(-a.acceleration.x,
                        sqrt(a.acceleration.y * a.acceleration.y + a.acceleration.z * a.acceleration.z)) * 180.0 / PI;
    float roll = atan2(a.acceleration.y, a.acceleration.z) * 180.0 / PI;
    float accelNorm = sqrt(a.acceleration.x * a.acceleration.x +
                           a.acceleration.y * a.acceleration.y +
                           a.acceleration.z * a.acceleration.z);

    Serial.printf(",\"imu\":{\"accel\":[%.2f,%.2f,%.2f],\"gyro\":[%.3f,%.3f,%.3f],"
                  "\"pitch\":%.1f,\"roll\":%.1f,\"accelNorm\":%.2f}",
                  a.acceleration.x, a.acceleration.y, a.acceleration.z,
                  g.gyro.x, g.gyro.y, g.gyro.z,
                  pitch, roll, accelNorm);
  } else {
    Serial.print(",\"imu\":null");
  }

  Serial.println("}");
}

void setup() {
  Serial.begin(115200);
  delay(200);
  Serial.println("{\"status\":\"Hippios sensor boot\"}");

  pinMode(PIN_ECG_LOP, INPUT);
  pinMode(PIN_ECG_LOM, INPUT);
  analogReadResolution(12);
  analogSetPinAttenuation(PIN_ECG_OUT, ADC_11db);

  Wire.begin(PIN_I2C_SDA, PIN_I2C_SCL);
  setupMpu();
  setupTemperature();
}

void loop() {
  unsigned long nowUs = micros();
  if (nowUs - lastSampleUs >= 1000000UL / ECG_SAMPLE_HZ) {
    lastSampleUs = nowUs;
    sampleEcg();
  }

  updateTemperature();

  if (millis() - lastReportMs >= REPORT_PERIOD_MS) {
    lastReportMs = millis();
    report();
  }
}
