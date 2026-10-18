import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, RefreshCw, KeyRound, Award, CheckCircle2 } from 'lucide-react';
import FloatingBalloons from './components/FloatingBalloons';
import AmbientMusicPlayer from './components/AmbientMusicPlayer';
import OpeningEnvelope from './components/OpeningEnvelope';
import LevelCard from './components/LevelCard';
import FinalCelebration from './components/finale/FinalCelebration';

// Fallback levels metadata with clearly framed date questions
const DEFAULT_LEVELS_FALLBACK = [
  {
    id: 1,
    title: 'The Spark',
    subtitle: 'Where our story began and how you stole my heart',
    personalQuestion: 'What do you like most about me?',
    passwordQuestion: 'What was the date of our first text?',
    passwordClue: '23rd of which month and year',
  },
  {
    id: 2,
    title: 'Our Favourite Memory',
    subtitle: 'Golden moments, late-night talks, and endless laughter',
    personalQuestion: 'What is one memory with me that always makes you smile?',
    passwordQuestion: 'What was the date of our first in-person meeting?',
    passwordClue: '15th of which month and year',
  },
  {
    id: 3,
    title: 'Our Magical First Kiss',
    subtitle: 'Under the summer evening sky where stars stood still',
    personalQuestion: 'What do you remember most about our first kiss?',
    passwordQuestion: 'What was the date of our magical first kiss?',
    passwordClue: '13th of which month and year',
  },
  {
    id: 4,
    title: 'Us, Together',
    subtitle: 'The little adventures and a love without end',
    personalQuestion: 'What is your favourite thing we have done together?',
    passwordQuestion: 'What was the date of our first phone call?',
    passwordClue: '16th of which month and year',
  },
  {
    id: 5,
    title: 'A Dream for Two',
    subtitle: 'Looking toward all the beautiful tomorrows waiting for us',
    personalQuestion: 'What is one thing you hope we get to experience together?',
    passwordQuestion: 'What is the date of our official anniversary?',
    passwordClue: '15th of which month and year',
  },
  {
    id: 6,
    title: 'One Last Little Promise',
    subtitle: 'Stepping into your 21st milestone with all my devotion',
    personalQuestion: 'What is one thing you want me to always remember about your love?',
    passwordQuestion: 'What is the date of your birth?',
    passwordClue: '8th of which month and year',
  },
];

const STORAGE_KEY = 'unlock_my_heart_state_v1';

export default function App() {
  const [isStarted, setIsStarted] = useState(() => {
    return localStorage.getItem('unlock_my_heart_started') === 'true';
  });

  const [levels, setLevels] = useState(DEFAULT_LEVELS_FALLBACK);
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [completedLevelIds, setCompletedLevelIds] = useState([]);
  const [levelStates, setLevelStates] = useState({});
  const [showFinale, setShowFinale] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore saved progress from localStorage on load
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.currentLevelId) setCurrentLevelId(parsed.currentLevelId);
        if (Array.isArray(parsed.completedLevelIds)) setCompletedLevelIds(parsed.completedLevelIds);
        if (parsed.levelStates) setLevelStates(parsed.levelStates);
        if (parsed.showFinale) setShowFinale(parsed.showFinale);
      }
    } catch (e) {
      console.warn('Could not restore saved progress:', e);
    }
  }, []);

  // Persist state changes
  useEffect(() => {
    try {
      const dataToSave = {
        currentLevelId,
        completedLevelIds,
        levelStates,
        showFinale,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Could not save progress:', e);
    }
  }, [currentLevelId, completedLevelIds, levelStates, showFinale]);

  // Fetch levels metadata from backend
  useEffect(() => {
    async function fetchLevels() {
      try {
        const res = await fetch('/api/levels-meta');
        if (res.ok) {
          const data = await res.json();
          if (data.levels && Array.isArray(data.levels) && data.levels.length > 0) {
            setLevels(data.levels);
          }
        }
      } catch (err) {
        console.warn('Using default fallback level configuration:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLevels();
  }, []);

  // When opening the initial envelope
  const handleEnvelopeOpen = () => {
    setIsStarted(true);
    localStorage.setItem('unlock_my_heart_started', 'true');
  };

  // Step 1: Save personal answer
  const handleSaveStep1 = (levelId, answer, feedback) => {
    setLevelStates((prev) => ({
      ...prev,
      [levelId]: {
        ...(prev[levelId] || {}),
        personalAnswer: answer,
        step1Submitted: true,
        step1Feedback: feedback,
      },
    }));
  };

  // Step 2: Secret password unlocked
  const handleUnlockLevel = (levelId, loveLetter) => {
    setLevelStates((prev) => ({
      ...prev,
      [levelId]: {
        ...(prev[levelId] || {}),
        isUnlocked: true,
        unlockedLetter: loveLetter,
      },
    }));

    if (!completedLevelIds.includes(levelId)) {
      setCompletedLevelIds((prev) => [...prev, levelId]);
    }
  };

  // Proceed to next level or grand finale
  const handleProceedNext = () => {
    if (currentLevelId < 6) {
      const nextId = currentLevelId + 1;
      setCurrentLevelId(nextId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowFinale(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset entire journey for replay
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to restart your journey from the beginning? ❤️')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('unlock_my_heart_started');
      setCurrentLevelId(1);
      setCompletedLevelIds([]);
      setLevelStates({});
      setShowFinale(false);
      setIsStarted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentLevel = levels.find((l) => l.id === currentLevelId) || levels[0];
  const allLevelsCompleted = completedLevelIds.length === 6;

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Floating Heart Balloons Animation Layer */}
      <FloatingBalloons />

      {/* Floating Audio Controller */}
      <AmbientMusicPlayer />

      {/* Top Brand & Chapter Navigation Header */}
      <header
        style={{
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 117, 143, 0.15)',
          background: 'rgba(10, 4, 8, 0.75)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={20} fill="#ff2a6d" color="#ff2a6d" className="anim-glow-pulse" />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '17px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.5px',
            }}
          >
            Unlock My Surprise
          </span>
        </div>

        {/* Compact Chapter Selector in Header (replaces bulky section above content) */}
        {isStarted && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {levels.map((lvl) => {
              const isCompleted = completedLevelIds.includes(lvl.id);
              const isCurrent = currentLevelId === lvl.id && !showFinale;
              const isLocked = !isCompleted && !isCurrent;

              return (
                <button
                  key={lvl.id}
                  disabled={isLocked}
                  onClick={() => {
                    setCurrentLevelId(lvl.id);
                    setShowFinale(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  title={
                    isCompleted
                      ? `Chapter ${lvl.id}: ${lvl.title} (Unlocked)`
                      : isCurrent
                      ? `Chapter ${lvl.id}: ${lvl.title} (Active)`
                      : `Chapter ${lvl.id} (Locked)`
                  }
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: isCurrent
                      ? '1.5px solid #ffd166'
                      : isCompleted
                      ? '1px solid #f5c869'
                      : '1px solid rgba(255, 117, 143, 0.25)',
                    background: isCurrent
                      ? 'linear-gradient(135deg, #d90429, #ff2a6d)'
                      : isCompleted
                      ? 'rgba(56, 16, 40, 0.9)'
                      : 'rgba(25, 8, 20, 0.6)',
                    color: isCurrent ? '#ffffff' : isCompleted ? '#f5c869' : '#ffb3c6',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    opacity: isLocked ? 0.4 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: isCurrent ? '0 0 10px rgba(255, 42, 109, 0.6)' : 'none',
                  }}
                >
                  {isCompleted ? '✓' : lvl.id}
                </button>
              );
            })}

            {/* Finale Button */}
            <button
              disabled={!allLevelsCompleted}
              onClick={() => {
                setShowFinale(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title={allLevelsCompleted ? 'Open 21st Birthday Surprise! 🎂' : 'Finale (Locked)'}
              style={{
                height: '30px',
                padding: '0 10px',
                borderRadius: '999px',
                border: showFinale
                  ? '1.5px solid #ffd166'
                  : allLevelsCompleted
                  ? '1px solid #f5c869'
                  : '1px solid rgba(255, 117, 143, 0.2)',
                background: showFinale
                  ? 'linear-gradient(135deg, #f5c869, #d90429)'
                  : allLevelsCompleted
                  ? '#381028'
                  : 'rgba(25, 8, 20, 0.5)',
                color: allLevelsCompleted ? '#ffd166' : '#ffb3c6',
                fontSize: '11px',
                fontWeight: 700,
                cursor: !allLevelsCompleted ? 'not-allowed' : 'pointer',
                opacity: !allLevelsCompleted ? 0.4 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>🎂</span>
              <span>Finale</span>
            </button>
          </div>
        )}

        {isStarted && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleResetProgress}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffb3c6',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                padding: '4px 8px',
                borderRadius: '6px',
              }}
              title="Restart journey"
            >
              <RefreshCw size={12} />
              <span>Restart</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area — Completely clean with NO image section or bulky banner above */}
      <main style={{ padding: '24px 16px 80px 16px' }}>
        {!isStarted ? (
          /* Opening Sealed 3D Envelope */
          <OpeningEnvelope onOpen={handleEnvelopeOpen} />
        ) : showFinale || (allLevelsCompleted && showFinale) ? (
          /* Grand 21st Birthday Finale Screen */
          <FinalCelebration onRevisitLevels={() => setShowFinale(false)} />
        ) : (
          /* Current Active Chapter Card — Direct, clean, and romantic */
          currentLevel && (
            <LevelCard
              key={currentLevel.id}
              level={currentLevel}
              levelState={levelStates[currentLevel.id] || {}}
              onSaveStep1={handleSaveStep1}
              onUnlockLevel={handleUnlockLevel}
              onProceedNext={handleProceedNext}
            />
          )
        )}
      </main>
    </div>
  );
}
