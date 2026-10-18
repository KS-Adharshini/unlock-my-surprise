import React from 'react';
import { Heart, Lock, CheckCircle2, Gift, Sparkles } from 'lucide-react';

export default function ProgressBar({
  levels = [],
  currentLevelId,
  completedLevelIds = [],
  onSelectLevel,
  allCompleted = false,
  onShowFinale,
}) {
  const total = levels.length || 6;
  const completedCount = completedLevelIds.length;
  const progressPercent = Math.min(100, Math.round((completedCount / total) * 100));

  return (
    <div className="progress-bar-container">
      {/* Top Meta Info */}
      <div className="progress-header-info">
        <div className="progress-title">
          <Heart size={18} fill="#ff2a6d" color="#ff2a6d" className="anim-glow-pulse" />
          <span>Our Journey Progress</span>
        </div>
        <div className="progress-counter">
          {completedCount} of {total} Chapters Unlocked ({progressPercent}%)
        </div>
      </div>

      {/* Progress Track */}
      <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Level Steps Row */}
      <div className="level-steps-list">
        {levels.map((lvl) => {
          const isCompleted = completedLevelIds.includes(lvl.id);
          const isCurrent = currentLevelId === lvl.id && !allCompleted;
          const isLocked = !isCompleted && !isCurrent;

          return (
            <button
              key={lvl.id}
              className={`level-step-node ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              disabled={isLocked}
              onClick={() => onSelectLevel(lvl.id)}
              title={
                isCompleted
                  ? `Level ${lvl.id}: ${lvl.title} (Unlocked - Click to review)`
                  : isCurrent
                  ? `Level ${lvl.id}: ${lvl.title} (In Progress)`
                  : `Level ${lvl.id} (Locked - Complete earlier levels first)`
              }
            >
              <div className="level-node-icon">
                {isCompleted ? (
                  <CheckCircle2 size={18} color="#f5c869" />
                ) : isCurrent ? (
                  <Heart size={18} fill="#ffffff" color="#ffffff" className="anim-glow-pulse" />
                ) : (
                  <Lock size={15} color="#ffb3c6" />
                )}
              </div>
              <span className="level-node-label">Level {lvl.id}</span>
            </button>
          );
        })}

        {/* Finale Node */}
        <button
          className={`level-step-node ${allCompleted ? 'active' : ''}`}
          disabled={!allCompleted}
          onClick={onShowFinale}
          title={allCompleted ? 'View Grand 21st Birthday Surprise! 🎂' : 'Locked until all 6 levels are unlocked'}
        >
          <div
            className="level-node-icon"
            style={{
              background: allCompleted
                ? 'linear-gradient(135deg, #f5c869, #d90429)'
                : 'rgba(45, 14, 38, 0.8)',
              borderColor: allCompleted ? '#ffd166' : 'rgba(255, 117, 143, 0.3)',
            }}
          >
            <Gift size={18} color={allCompleted ? '#ffffff' : '#ffb3c6'} />
          </div>
          <span className="level-node-label" style={{ color: allCompleted ? '#ffd166' : '#ffb3c6' }}>
            Finale
          </span>
        </button>
      </div>
    </div>
  );
}
