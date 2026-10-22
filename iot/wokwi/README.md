# Hippios — Simulation Wokwi du capteur

Simulation d'un ESP32 relié à trois capteurs :

| Capteur | Rôle | Dans Wokwi |
|---|---|---|
| **AD8232** | ECG (rythme cardiaque) | Puce custom (`ad8232.chip.*`), Wokwi ne la fournit pas |
| **MPU6050 (GY-521)** | Accéléromètre + gyroscope 6 axes | `wokwi-mpu6050` (natif) |
| **DS18B20** (sonde étanche) | Température | `wokwi-ds18b20` (natif) |

Le firmware envoie une mesure JSON par seconde sur le port série :

```json
{"ts":12000,"ecg":{"leadsOff":false,"bpm":36.2},"temperature":37.80,
 "imu":{"accel":[0.00,0.00,9.81],"gyro":[0.000,0.000,0.000],"pitch":0.0,"roll":0.0,"accelNorm":9.81}}
```

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `diagram.json` | Schéma : composants et câblage |
| `sketch.ino` | Firmware ESP32 (Arduino) |
| `libraries.txt` | Bibliothèques Arduino (format wokwi.com) |
| `ad8232.chip.json` / `ad8232.chip.c` | Puce custom qui simule l'AD8232 (onde PQRST) |
| `platformio.ini` / `wokwi.toml` | Uniquement pour lancer la simulation dans VS Code |

## Câblage

| Capteur | Broche capteur | ESP32 |
|---|---|---|
| AD8232 | 3.3V / GND | 3V3 / GND |
| | OUTPUT | GPIO 34 (ADC) |
| | LO+ | GPIO 32 |
| | LO- | GPIO 33 |
| | SDN | non connecté (actif par défaut) |
| MPU6050 | VCC / GND | 3V3 / GND |
| | SDA | GPIO 21 |
| | SCL | GPIO 22 |
| DS18B20 | VCC / GND | 3V3 / GND |
| | DQ (data) | GPIO 4 + résistance de pull-up 4,7 kΩ vers 3V3 |

Ce câblage marche aussi sur le vrai matériel. L'AD8232 doit être alimenté en **3,3 V** et pas en 5 V, sinon sa sortie dépasse la tension que l'ADC de l'ESP32 accepte.

## Option 1 — wokwi.com (le plus simple)

1. Va sur <https://wokwi.com/projects/new/esp32>.
2. Remplace le contenu de `sketch.ino` et de `diagram.json` par celui de ce dossier.
3. Ajoute les autres fichiers avec le bouton **▾ → New file…** (`libraries.txt`, `ad8232.chip.json`, `ad8232.chip.c`), avec exactement ces noms.
4. Clique sur ▶. Wokwi compile la puce custom tout seul.

## Option 2 — VS Code (extension Wokwi + PlatformIO)

1. Installe les extensions **PlatformIO IDE** et **Wokwi Simulator**, puis active la licence Wokwi (`F1 → Wokwi: Request a new License`).
2. Compile le firmware depuis ce dossier. Sous Windows, `pio` n'est pas dans le PATH : passe par le terminal PlatformIO (icône 🐜 → *New Terminal*) ou appelle-le avec son chemin complet :
   ```powershell
   & "$env:USERPROFILE\.platformio\penv\Scripts\pio.exe" run
   ```
3. Compile la puce custom en WebAssembly (`ad8232.chip.wasm`). Il faut [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (l'archive `x86_64-windows`, à extraire) et l'en-tête `wokwi-api.h`. Avec Git Bash :
   ```bash
   SDK=/c/chemin/vers/wasi-sdk-34.0-x86_64-windows
   curl -o wokwi-api.h https://wokwi.com/api/chips/wokwi-api.h
   "$SDK/bin/clang.exe" --target=wasm32-wasip1 --sysroot "$SDK/share/wasi-sysroot" \
     -nostartfiles -Wl,--import-memory -Wl,--export-table -Wl,--no-entry \
     -Wl,--export=chip_init -O2 -o ad8232.chip.wasm ad8232.chip.c
   ```
   Recompile la puce à chaque modification de `ad8232.chip.c`.
4. `F1 → Wokwi: Start Simulator`.

## Jouer avec la simulation

Clique sur un composant pendant la simulation pour changer ses valeurs :

- **AD8232** : fréquence cardiaque (BPM, 36 par défaut, soit un cheval au repos), bruit, et électrodes décollées (`leadsOff = 1`, ce qui met LO+/LO- à HIGH).
- **MPU6050** : accélération et rotation sur chaque axe. Le firmware en tire le tangage (pitch), le roulis (roll) et la norme de l'accélération.
- **DS18B20** : température (37,8 °C par défaut, la normale d'un cheval se situe entre 37,5 et 38,5 °C).

Pour voir le signal ECG brut, mets `#define STREAM_ECG 1` dans `sketch.ino` : chaque échantillon s'affiche alors sous la forme `ecg:<mV>`.
