import librosa
import numpy as np
import sys
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

class DeepfakeDetector:
    def __init__(self, audio_path):
        self.audio_path = audio_path
        try:
            # Load audio (y=waveform, sr=sample rate)
            self.y, self.sr = librosa.load(audio_path, sr=None)
        except Exception as e:
            print(f"Error loading audio: {e}")
            sys.exit(1)

    def analyze_biological_markers(self):
        """
        Analyzes features that are difficult for AI to replicate perfectly:
        1. Pitch Micro-Tremors (Jitter/Stability)
        2. Breath/Pause Patterns
        3. Spectral Artifacts
        """
        features = {}
        
        # 1. Pitch Stability (Simulating Jitter analysis)
        # Extract fundamental frequency (f0)
        f0, voiced_flag, voiced_probs = librosa.pyin(self.y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'))
        
        # Filter out unvoiced parts
        voiced_f0 = f0[~np.isnan(f0)]
        
        if len(voiced_f0) > 0:
            # Calculate standard deviation of pitch (simpler proxy for jitter in pure python)
            pitch_std = np.std(voiced_f0)
            # Calculate differences between consecutive pitch frames
            pitch_diff = np.diff(voiced_f0)
            avg_jitter_proxy = np.mean(np.abs(pitch_diff))
            
            features['pitch_variability'] = pitch_std
            features['jitter_proxy'] = avg_jitter_proxy
        else:
            features['pitch_variability'] = 0
            features['jitter_proxy'] = 0

        # 2. Spectral Flatness (AI voices historically have different flatness signatures)
        flatness = librosa.feature.spectral_flatness(y=self.y)
        features['avg_flatness'] = np.mean(flatness)

        # 3. Silence/Breath Ratio
        # Split audio into non-silent chunks
        non_silent = librosa.effects.split(self.y, top_db=20)
        total_duration = librosa.get_duration(y=self.y, sr=self.sr)
        non_silent_duration = sum([(end - start) / self.sr for start, end in non_silent])
        silence_duration = total_duration - non_silent_duration
        
        features['silence_ratio'] = silence_duration / total_duration if total_duration > 0 else 0
        
        # 4. High Frequency Artifacts (Spectral Rolloff)
        # Deepfakes often have "hard cuts" in high frequencies due to vocoder limitations
        rolloff = librosa.feature.spectral_rolloff(y=self.y, sr=self.sr, roll_percent=0.85)
        features['avg_rolloff'] = np.mean(rolloff)

        return features

    def detect(self):
        print(f"🔍 Analyzing: {self.audio_path}...\n")
        
        feats = self.analyze_biological_markers()
        
        score = 0
        reasons = []

        # --- Heuristics (Simplistic for Prototype) ---
        
        # 1. Check for "Too Perfect" Pitch (Low Jitter)
        # Real voices have natural micro-tremors. AI can be too smooth.
        if feats['jitter_proxy'] < 2.0:  # Threshold would need tuning
            score += 30
            reasons.append(f"Unnaturally stable pitch (Jitter: {feats['jitter_proxy']:.2f}) - Lacks human micro-tremors")
        else:
            reasons.append(f"Natural pitch instability detected (Jitter: {feats['jitter_proxy']:.2f})")

        # 2. Check for "Machine-like" Breath Patterns (Low Silence)
        # AI often generates continuous speech without breathing pauses.
        if feats['silence_ratio'] < 0.05: # Less than 5% silence
            score += 25
            reasons.append(f"Abnormal continuous speech (Silence Ratio: {feats['silence_ratio']:.2%}) - Possible lack of breathing")
        
        # 3. Spectral Anomalies
        # Very low flatness can indicate robotic/vocoder artifacts in some contexts, 
        # or very high flatness might indicate purely synthetic noise.
        # This is complex, but here we flag extremes.
        if feats['avg_flatness'] < 0.001:
            score += 20
            reasons.append(f"Suspicious spectral structure (Flatness: {feats['avg_flatness']:.5f})")

        # Result
        print("--- 📊 Analysis Report ---")
        for r in reasons:
            mark = "❌" if "Unnaturally" in r or "Abnormal" in r or "Suspicious" in r else "✅"
            print(f"{mark} {r}")

        print("\n" + "="*30)
        probability = min(score, 99)
        if probability > 50:
            print(f"⚠️  HIGH RISK: Synthetic Audio Detected (Confidence: {probability}%)")
        else:
            print(f"✅  LOW RISK: Audio appears biological (Confidence: {100-probability}%)")
        print("="*30)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python detector.py <path_to_audio_file>")
        print("Example: python detector.py sample.wav")
    else:
        detector = DeepfakeDetector(sys.argv[1])
        detector.detect()
