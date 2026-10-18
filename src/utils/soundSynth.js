// Romantic audio synthesizer using Web Audio API
// Generates dreamy harp-like ambient chords and delicate UI sound effects without external audio files

class RomanticSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // muted until user interaction
    this.ambientInterval = null;
    this.chordStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle ambient romantic music
  toggleMusic() {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
    return !this.isMuted;
  }

  startAmbient() {
    this.init();
    if (this.ambientInterval) return;
    this.isMuted = false;

    // Dreamy chord progression: Cmaj9 -> Am9 -> Fmaj7 -> G9
    const chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9 (C4, E4, G4, B4, D5)
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9 (A3, C4, E4, G4, B4)
      [174.61, 261.63, 329.63, 349.23, 440.00], // Fmaj7 (F3, C4, E4, F4, A4)
      [196.00, 246.94, 293.66, 392.00, 440.00], // G9 (G3, B3, D4, G4, A4)
    ];

    const playArpeggio = () => {
      if (this.isMuted || !this.ctx) return;
      const chord = chords[this.chordStep % chords.length];
      this.chordStep++;

      // Stagger notes to sound like an acoustic harp arpeggio
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.isMuted) {
            this.playSoftNote(freq, 2.8, 0.045);
          }
        }, idx * 380);
      });
    };

    playArpeggio();
    this.ambientInterval = setInterval(playArpeggio, 3600);
  }

  stopAmbient() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  playSoftNote(freq, duration = 1.5, volume = 0.08) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine wave with slight triangle warmth
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, this.ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio note error:', e);
    }
  }

  // SFX: Delicate chime when personal answer is submitted
  playAnswerChime() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playPluck(freq, 1.2, 0.12);
      }, i * 90);
    });
  }

  // SFX: Triumphant romantic celestial burst on correct password
  playSuccessChime() {
    this.init();
    if (!this.ctx) return;
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playPluck(freq, 2.2, 0.16);
      }, i * 110);
    });
  }

  // SFX: Cute soft wobble boop on incorrect password
  playErrorBoop() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.32);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      console.warn(e);
    }
  }

  // SFX: Paper glide / envelope fold sound
  playEnvelopeOpen() {
    this.init();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.25);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.25);
    } catch (e) {
      console.warn(e);
    }
  }

  playPluck(freq, duration = 1.5, volume = 0.1) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn(e);
    }
  }
}

export const soundEngine = new RomanticSoundEngine();
