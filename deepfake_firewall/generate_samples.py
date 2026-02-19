import numpy as np
import soundfile as sf

def generate_tone(filename, duration=3.0, sr=22050, freq=440.0, vibration=False):
    t = np.linspace(0, duration, int(sr * duration))
    
    if vibration:
        # Simulate "human-like" micro-tremors (Frequency Modulation)
        # Vibrato: 5Hz oscillation with larger depth
        vibrato = 4.0 * np.sin(2 * np.pi * 5.0 * t) 
        # Jitter: Random noise added to frequency (Increased for detector threshold)
        jitter = np.random.normal(0, 2.0, len(t))
        
        # Instantaneous frequency
        inst_freq = freq + vibrato + jitter
        phase = 2 * np.pi * np.cumsum(inst_freq) / sr
        
        # Base tone + Harmonics (Human voice has structure, not just one sine)
        audio = 0.5 * np.sin(phase)
        audio += 0.25 * np.sin(2 * phase) # 2nd harmonic
        audio += 0.12 * np.sin(3 * phase) # 3rd harmonic
        
        # Add simulated breathing (amplitude modulation)
        # Breath every 1.0 seconds, longer duration (300ms)
        envelope = np.ones_like(t)
        breath_indices = np.where((t % 1.0) < 0.3) 
        envelope[breath_indices] *= 0.05 # silence during breath
        audio = audio * envelope

        # Add slight background noise to improve spectral flatness (reality isn't empty)
        audio += np.random.normal(0, 0.005, len(audio))

    else:
        # Pure Synthetic Tone (Perfectly flat pitch, no breath, no harmonics)
        # Deepfakes are getting better, but raw synthesis often lacks "dirt"
        audio = 0.5 * np.sin(2 * np.pi * freq * t)

    # Normalize
    audio = audio / np.max(np.abs(audio))
    
    sf.write(filename, audio, sr)
    print(f"Generated: {filename}")

if __name__ == "__main__":
    generate_tone("synthetic_sample.wav", vibration=False)
    generate_tone("human_simulated_sample.wav", vibration=True)
