// Simulation Wokwi du module ECG AD8232.
// Génère un signal PQRST synthétique sur OUTPUT (centré sur Vs/2, comme le vrai module),
// et pilote LO+ / LO- pour la détection d'électrodes décollées.

#include "wokwi-api.h"
#include <math.h>
#include <stdlib.h>

#define SAMPLE_US  2000      // 500 Hz
#define VCC        3.3f
#define BASELINE   1.65f

typedef struct {
  pin_t out;
  pin_t lo_plus;
  pin_t lo_minus;
  pin_t sdn;
  uint32_t bpm_attr;
  uint32_t noise_attr;
  uint32_t leads_off_attr;
  float beat_t;   // temps écoulé dans le battement courant (s)
  float time;     // temps total (s), pour la dérive de ligne de base
} chip_state_t;

static float gauss(float t, float mu, float sigma, float amp) {
  float d = (t - mu) / sigma;
  return amp * expf(-0.5f * d * d);
}

static float clampf(float v, float lo, float hi) {
  return v < lo ? lo : (v > hi ? hi : v);
}

static void on_tick(void *user_data) {
  chip_state_t *chip = (chip_state_t *)user_data;
  const float dt = SAMPLE_US / 1e6f;

  float bpm = clampf(attr_read_float(chip->bpm_attr), 20.0f, 250.0f);
  float period = 60.0f / bpm;
  chip->time += dt;
  chip->beat_t += dt;
  if (chip->beat_t >= period) chip->beat_t -= period;

  // SDN à LOW = module en veille
  if (pin_read(chip->sdn) == LOW) {
    pin_dac_write(chip->out, 0.0f);
    pin_write(chip->lo_plus, LOW);
    pin_write(chip->lo_minus, LOW);
    return;
  }

  // Électrodes décollées : LO+/LO- passent à HIGH, la sortie sature
  if (attr_read_float(chip->leads_off_attr) >= 0.5f) {
    pin_write(chip->lo_plus, HIGH);
    pin_write(chip->lo_minus, HIGH);
    pin_dac_write(chip->out, VCC);
    return;
  }
  pin_write(chip->lo_plus, LOW);
  pin_write(chip->lo_minus, LOW);

  // Compression des intervalles quand le rythme est rapide
  float k = period < 1.0f ? period : 1.0f;
  float t = chip->beat_t / k;

  float v = BASELINE;
  v += gauss(t, 0.20f, 0.025f, 0.12f);   // onde P
  v += gauss(t, 0.37f, 0.010f, -0.12f);  // Q
  v += gauss(t, 0.40f, 0.012f, 1.00f);   // R
  v += gauss(t, 0.43f, 0.010f, -0.25f);  // S
  v += gauss(t, 0.68f, 0.045f, 0.25f);   // onde T

  // Dérive respiratoire + bruit
  v += 0.04f * sinf(2.0f * 3.14159265f * 0.2f * chip->time);
  float noise = attr_read_float(chip->noise_attr);
  v += (((float)rand() / (float)RAND_MAX) - 0.5f) * 2.0f * noise;

  pin_dac_write(chip->out, clampf(v, 0.0f, VCC));
}

void chip_init(void) {
  chip_state_t *chip = malloc(sizeof(chip_state_t));
  chip->out = pin_init("OUTPUT", ANALOG);
  chip->lo_plus = pin_init("LO_PLUS", OUTPUT_LOW);
  chip->lo_minus = pin_init("LO_MINUS", OUTPUT_LOW);
  chip->sdn = pin_init("SDN", INPUT_PULLUP);
  chip->bpm_attr = attr_init_float("bpm", 36.0f);       // cheval au repos : ~28-44 BPM
  chip->noise_attr = attr_init_float("noise", 0.02f);
  chip->leads_off_attr = attr_init_float("leadsOff", 0.0f);
  chip->beat_t = 0.0f;
  chip->time = 0.0f;

  const timer_config_t timer_config = {
    .callback = on_tick,
    .user_data = chip,
  };
  timer_t timer = timer_init(&timer_config);
  timer_start(timer, SAMPLE_US, true);
}
