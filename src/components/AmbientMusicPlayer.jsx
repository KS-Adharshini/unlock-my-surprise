import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../utils/soundSynth';

export default function AmbientMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const active = soundEngine.toggleMusic();
    setIsPlaying(active);
  };

  return (
    <button
      className="floating-music-btn"
      onClick={toggleMusic}
      title={isPlaying ? 'Mute romantic music' : 'Play romantic music'}
      aria-label="Toggle background music"
    >
      {isPlaying ? (
        <>
          <Volume2 size={18} className="anim-glow-pulse" style={{ color: '#ff2a6d' }} />
          <span>Melody Playing</span>
          <div className="music-waves" aria-hidden="true">
            <span className="music-bar" />
            <span className="music-bar" />
            <span className="music-bar" />
          </div>
        </>
      ) : (
        <>
          <VolumeX size={18} style={{ color: '#ffb3c6' }} />
          <span>Music Off</span>
        </>
      )}
    </button>
  );
}
