import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Camera,
  Calendar,
  Award,
  Mail,
  RotateCcw,
} from 'lucide-react';
import { triggerGrandFinaleConfetti } from '../../utils/confettiBurst';
import { soundEngine } from '../../utils/soundSynth';
import GrandLetter from './GrandLetter';
import PolaroidWall from './PolaroidWall';
import LoveTimeline from './LoveTimeline';
import CertificateOfLove from './CertificateOfLove';

export default function FinalCelebration({ onRevisitLevels }) {
  const [activeTab, setActiveTab] = useState('letter');

  useEffect(() => {
    // Fire grand celebration fireworks on load
    triggerGrandFinaleConfetti();
    soundEngine.playSuccessChime();
  }, []);

  return (
    <div className="finale-screen-container">
      {/* Grand Hero Section */}
      <div className="finale-hero">
        <div className="finale-birthday-pill anim-glow-pulse">
          <Sparkles size={16} />
          <span>The Grand 21st Milestone</span>
          <Sparkles size={16} />
        </div>

        <h1 className="finale-main-heading">
          Happy 21st Birthday, My Favorite Person! ❤️
        </h1>

        <p className="finale-subtitle">
          You unlocked every level, solved every mystery, and captured my whole heart forever.
        </p>

        {/* Re-trigger Confetti Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            className="btn-romantic-primary"
            onClick={() => {
              triggerGrandFinaleConfetti();
              soundEngine.playSuccessChime();
            }}
            style={{ fontSize: '14px', padding: '10px 22px' }}
          >
            <Sparkles size={16} />
            <span>More Birthday Fireworks! 🎆</span>
          </button>

          <button
            onClick={onRevisitLevels}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 117, 143, 0.3)',
              color: '#ffe5ec',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <RotateCcw size={16} />
            <span>Revisit Our 6 Chapters</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="finale-nav-tabs">
        <button
          className={`finale-tab-btn ${activeTab === 'letter' ? 'active' : ''}`}
          onClick={() => setActiveTab('letter')}
        >
          <Mail size={16} />
          <span>21st Birthday Letter</span>
        </button>

        <button
          className={`finale-tab-btn ${activeTab === 'polaroids' ? 'active' : ''}`}
          onClick={() => setActiveTab('polaroids')}
        >
          <Camera size={16} />
          <span>Polaroid Wall</span>
        </button>

        <button
          className={`finale-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          <Calendar size={16} />
          <span>Love Timeline</span>
        </button>

        <button
          className={`finale-tab-btn ${activeTab === 'certificate' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificate')}
        >
          <Award size={16} />
          <span>Official Certificate</span>
        </button>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'letter' && <GrandLetter />}
      {activeTab === 'polaroids' && <PolaroidWall />}
      {activeTab === 'timeline' && <LoveTimeline />}
      {activeTab === 'certificate' && <CertificateOfLove />}
    </div>
  );
}
