import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Gift, Sparkles, FastForward } from 'lucide-react';
import { soundEngine } from '../utils/soundSynth';

export default function TypewriterLetter({
  letterContent = '',
  levelTitle = '',
  levelId = 1,
  isFinalLevel = false,
  onProceed,
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    setIsFinished(false);

    // Play subtle paper unfolding sound
    soundEngine.playEnvelopeOpen();

    const speed = 18; // ms per character for smooth cadence
    const interval = setInterval(() => {
      if (currentIndex < letterContent.length) {
        setDisplayedText(letterContent.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsFinished(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [letterContent]);

  const handleSkip = () => {
    setDisplayedText(letterContent);
    setIsFinished(true);
  };

  return (
    <div className="love-letter-paper paper-card-3d">
      {/* Decorative Wax Stamp at top-right */}
      <div className="love-letter-wax-stamp wax-seal">
        <Heart size={24} fill="#ffffff" color="#ffffff" className="wax-seal-heart" />
      </div>

      {/* Letter Header */}
      <div style={{ marginBottom: '18px' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: '#a31128',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 800,
          }}
        >
          💌 Unlocked Love Letter — Chapter {levelId}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            color: '#2b0b1c',
            margin: '4px 0 0 0',
            fontWeight: 700,
          }}
        >
          {levelTitle}
        </h3>
      </div>

      {/* Typewriter Body */}
      <div className="love-letter-body">
        {displayedText}
        {!isFinished && <span className="letter-typewriter-cursor" />}
      </div>

      {/* Signature */}
      <div className="love-letter-signature">
        With all my love & heart, forever yours ❤️
      </div>

      {/* Actions Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px dashed rgba(217, 4, 41, 0.2)',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {!isFinished ? (
          <button
            onClick={handleSkip}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8c234a',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
            }}
          >
            <FastForward size={14} />
            <span>Reveal full letter</span>
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '13px', fontWeight: 600 }}>
            <Sparkles size={16} />
            <span>Chapter Complete</span>
          </div>
        )}

        <button
          className="btn-romantic-primary anim-glow-pulse"
          onClick={onProceed}
          style={{
            fontSize: '15px',
            padding: '12px 28px',
          }}
        >
          {isFinalLevel ? (
            <>
              <Gift size={18} />
              <span>Unlock 21st Birthday Surprise! 🎂</span>
            </>
          ) : (
            <>
              <span>Continue to Level {levelId + 1}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
