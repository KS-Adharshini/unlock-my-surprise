import React, { useState } from 'react';
import {
  KeyRound,
  Unlock,
  Sparkles,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { soundEngine } from '../utils/soundSynth';
import { triggerLevelUnlockConfetti } from '../utils/confettiBurst';
import TypewriterLetter from './TypewriterLetter';

export default function LevelCard({
  level,
  levelState = {}, // { isUnlocked, unlockedLetter }
  onUnlockLevel,
  onProceedNext,
}) {
  const [passwordInput, setPasswordInput] = useState('');
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [showClue, setShowClue] = useState(false);

  // Handle Secret Password / Date Verification
  const handleVerifyPassword = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setErrorMessage('Please enter your answer to unlock the love letter ❤️');
      setShakeKey((prev) => prev + 1);
      soundEngine.playErrorBoop();
      return;
    }

    setErrorMessage('');
    setIsVerifyingPassword(true);

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          levelId: level.id,
          password: passwordInput.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification error.');
      }

      if (!data.success) {
        // Cute incorrect message
        soundEngine.playErrorBoop();
        setErrorMessage(data.message || 'Not quite, birthday boy! ❤️ Try again—your love letter is waiting.');
        setShakeKey((prev) => prev + 1);
      } else {
        // Correct Password!
        soundEngine.playSuccessChime();
        triggerLevelUnlockConfetti();
        onUnlockLevel(level.id, data.loveLetter);
      }
    } catch (err) {
      console.error('Password Verification Error:', err);
      setErrorMessage('Something went wrong connecting to the server. Please try again.');
      soundEngine.playErrorBoop();
      setShakeKey((prev) => prev + 1);
    } finally {
      setIsVerifyingPassword(false);
    }
  };

  const isUnlocked = Boolean(levelState.isUnlocked);

  return (
    <div className="level-container-wrapper">
      <div className="paper-card-3d" style={{ padding: '36px 32px' }}>
        {/* Level Title & Header Badge */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="level-header-badge">
            <Sparkles size={14} />
            <span>Chapter {level.id} of 6</span>
          </div>
          <h2 className="level-main-title">{level.title}</h2>
          <p className="level-main-subtitle">{level.subtitle}</p>
        </div>

        {/* ---------------- SECRET PASSWORD / DATE QUESTION ---------------- */}
        {!isUnlocked ? (
          <div className="step2-active-box" style={{ marginTop: '10px' }}>
            <div className="step-title-pill" style={{ background: '#d90429' }}>
              <KeyRound size={14} />
              <span>Unlock Secret Love Letter</span>
            </div>

            <p className="step-question-text" style={{ fontSize: '20px', color: '#3d0a1b', margin: '14px 0 16px 0' }}>
              "{level.passwordQuestion}"
            </p>

            {/* Hint Accordion */}
            <div style={{ marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => setShowClue(!showClue)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8c234a',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: 0,
                }}
              >
                <HelpCircle size={15} />
                <span>{showClue ? 'Hide Hint' : 'Need a hint, birthday boy? 💡'}</span>
              </button>

              {showClue && (
                <div className="step-clue-pill" style={{ marginTop: '8px' }}>
                  <Sparkles size={16} />
                  <span>{level.passwordClue}</span>
                </div>
              )}
            </div>

            {/* Answer / Password Form */}
            <form onSubmit={handleVerifyPassword}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="step-input"
                  style={{ flex: '1 1 240px' }}
                  placeholder="Enter your answer..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  disabled={isVerifyingPassword}
                  autoComplete="off"
                  autoFocus
                />

                <button
                  type="submit"
                  className="btn-romantic-primary"
                  disabled={isVerifyingPassword || !passwordInput.trim()}
                  style={{ flexShrink: 0 }}
                >
                  <Unlock size={17} />
                  <span>{isVerifyingPassword ? 'Checking...' : 'Unlock Love Letter 💌'}</span>
                </button>
              </div>

              {/* Cute error shake message */}
              {errorMessage && (
                <div key={shakeKey} className="error-shake-banner anim-cute-shake">
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>
        ) : (
          /* Level is fully unlocked! */
          <div
            style={{
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: '12px',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Unlock size={20} color="#16a34a" />
              <span style={{ fontWeight: 700, color: '#166534', fontSize: '15px' }}>
                Chapter Unlocked! ✨
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 600 }}>
              Love Letter Revealed Below
            </span>
          </div>
        )}

        {/* ---------------- UNLOCKED LOVE LETTER ---------------- */}
        {isUnlocked && (
          <TypewriterLetter
            letterContent={levelState.unlockedLetter || ''}
            levelTitle={level.title}
            levelId={level.id}
            isFinalLevel={level.id === 6}
            onProceed={onProceedNext}
          />
        )}
      </div>
    </div>
  );
}
