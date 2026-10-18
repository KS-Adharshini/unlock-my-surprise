import React, { useState } from 'react';
import { Heart, Sparkles, Gift, Flame } from 'lucide-react';
import { soundEngine } from '../../utils/soundSynth';
import { triggerLevelUnlockConfetti } from '../../utils/confettiBurst';

export default function SecretCapsule() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    soundEngine.playSuccessChime();
    triggerLevelUnlockConfetti();
    setIsOpened(true);
  };

  return (
    <div className="secret-capsule-card">
      <div style={{ marginBottom: '16px' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: '#f5c869',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 800,
          }}
        >
          ✨ Final Hidden Surprise
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '26px',
            color: '#ffffff',
            margin: '6px 0 0 0',
          }}
        >
          One Last Mystery Waiting Just For You
        </h3>
      </div>

      {!isOpened ? (
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#ffb3c6', maxWidth: '440px', margin: '0 auto 24px auto' }}>
            Tap the pulsing heart below to break the final golden seal...
          </p>

          <button
            className="secret-heart-trigger anim-glow-pulse"
            onClick={handleOpen}
            aria-label="Unlock final surprise"
          >
            <Heart size={44} fill="#ffffff" color="#ffffff" />
          </button>

          <div style={{ fontSize: '13px', color: '#f5c869', fontWeight: 600 }}>
            Tap to open 💌
          </div>
        </div>
      ) : (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1.5px solid #ff758f',
            borderRadius: '14px',
            padding: '24px',
            animation: 'paperPopIn 0.6s ease both',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <Gift size={36} color="#ffd166" className="anim-glow-pulse" />
          </div>

          <h4
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '28px',
              color: '#ffd166',
              margin: '0 0 10px 0',
            }}
          >
            A Secret Birthday Gift For You 🎁
          </h4>

          <p
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '22px',
              color: '#ffffff',
              lineHeight: 1.6,
              margin: '0 0 18px 0',
            }}
          >
            "P.S. Words on a screen are just the beginning. There is an actual surprise gift
            waiting for you in real life. Come find me right now for your official 21st birthday hug,
            sweet kisses, and your surprise! I love you more than all the stars in the sky."
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(217, 4, 41, 0.3)',
              border: '1px solid #ff2a6d',
              padding: '8px 18px',
              borderRadius: '999px',
              color: '#ffb3c6',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            <Flame size={16} color="#ff2a6d" />
            <span>Valid forever • Redeemable immediately</span>
          </div>
        </div>
      )}
    </div>
  );
}
