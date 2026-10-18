import React, { useState } from 'react';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { soundEngine } from '../utils/soundSynth';
import { triggerLevelUnlockConfetti } from '../utils/confettiBurst';

export default function OpeningEnvelope({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio SFX & Ambient music start on user action
    soundEngine.playEnvelopeOpen();
    triggerLevelUnlockConfetti();

    // Start 3D flap animation
    setIsOpen(true);

    // Smooth transition to Level 1
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px 16px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Handwritten Message Above Envelope */}
      <div
        style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: 'clamp(24px, 4vw, 36px)',
          color: '#ffb3c6',
          marginBottom: '12px',
          filter: 'drop-shadow(0 2px 8px rgba(255, 42, 109, 0.4))',
          animation: 'floatGentle 4s infinite ease-in-out',
        }}
      >
        To My Favorite Person, With All My Heart
      </div>

      {/* Main Title & Subtitle */}
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 6.5vw, 62px)',
          fontWeight: 900,
          color: '#ffffff',
          margin: '0 0 10px 0',
          textShadow: '0 4px 20px rgba(217, 4, 41, 0.6), 0 0 40px rgba(255, 42, 109, 0.35)',
          letterSpacing: '-0.5px',
        }}
      >
        Unlock My Surprise <span style={{ color: '#ff2a6d' }}>❤️</span>
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(15px, 2.2vw, 18px)',
          color: '#ffe5ec',
          maxWidth: '560px',
          margin: '0 auto 34px auto',
          lineHeight: 1.55,
          fontWeight: 400,
        }}
      >
        Six little levels. Our favourite memories. One letter written just for you.
      </p>

      {/* 3D Envelope Scene */}
      <div className="envelope-3d-scene" style={{ marginBottom: '36px' }}>
        <div
          className={`envelope-wrapper ${isOpen ? 'is-open' : ''}`}
          onClick={handleOpenSurprise}
          title="Click to open your surprise!"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpenSurprise();
            }
          }}
        >
          {/* Top Flap (Folds back in 3D) */}
          <div className="envelope-flap" />

          {/* Envelope Pocket */}
          <div className="envelope-pocket" />

          {/* Wax Seal with Heart (Center) */}
          <div
            className="wax-seal"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: isOpen
                ? 'translate(-50%, -50%) scale(1.3) rotate(25deg)'
                : 'translate(-50%, -50%)',
              opacity: isOpen ? 0 : 1,
              transition: 'all 0.6s ease',
              zIndex: 10,
            }}
          >
            <Heart className="wax-seal-heart" size={26} fill="#ffffff" />
          </div>

          {/* Letter Peeking / Rising from Inside */}
          <div className="envelope-inner-letter">
            <Sparkles size={28} color="#d90429" style={{ marginBottom: '6px' }} />
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '24px',
                color: '#2b0b1c',
                fontWeight: 700,
              }}
            >
              Happy 21st Birthday, My Love!
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: '#8c234a',
                marginTop: '4px',
              }}
            >
              A special journey through our story awaits you...
            </span>
          </div>
        </div>
      </div>

      {/* Animated Action Button */}
      <button
        id="btn-open-surprise"
        className="btn-romantic-primary anim-glow-pulse"
        onClick={handleOpenSurprise}
        disabled={isOpening}
        style={{
          fontSize: '17px',
          padding: '16px 38px',
          cursor: isOpening ? 'wait' : 'pointer',
        }}
      >
        <MailOpen size={20} />
        <span>{isOpening ? 'Opening Your Surprise...' : 'Open Your Surprise'}</span>
        <Sparkles size={18} />
      </button>
    </div>
  );
}
