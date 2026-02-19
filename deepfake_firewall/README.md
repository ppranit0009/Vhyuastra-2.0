# Deepfake Firewall Prototype

This module implements a basic audio analysis tool to detect synthetic voices based on biological markers like pitch jitter, breath patterns, and spectral anomalies.

## Prerequisites

You need Python installed on your system.

## Setup

1.  Open a terminal in this directory:
    ```bash
    cd deepfake_firewall
    ```

2.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: You might need to install `libsndfile` separately on some systems if you encounter errors with `soundfile`)*

## How to Run

### 1. Generate Test Data
First, generate the sample audio files (one synthetic, one simulated human):

```bash
python generate_samples.py
```
This will create `synthetic_sample.wav` and `human_simulated_sample.wav`.

### 2. Run the Detector
Now run the detector on the generated samples:

**Test Synthetic Audio:**
```bash
python detector.py synthetic_sample.wav
```

**Test Human-Simulated Audio:**
```bash
python detector.py human_simulated_sample.wav
```

## How it Works
The detector looks for:
*   **Pitch Stability**: AI voices often lack the natural micro-tremors of human vocal cords.
*   **Breath Patterns**: Real speech has pauses for breathing; AI can generate unnaturally long continuous segments.
*   **Spectral Artifacts**: Analysis of high-frequency data for cutoff patterns common in vocoders.
