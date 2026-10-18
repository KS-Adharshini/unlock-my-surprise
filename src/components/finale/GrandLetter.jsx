import React, { useState, useEffect } from 'react';
import { Edit3, Check, RotateCcw, Heart, Sparkles } from 'lucide-react';

const DEFAULT_LETTER = `My dearest birthday boy,

Born on 8 November 2005, you entered this world destined to be someone truly extraordinary. And on 1 May 2006, I arrived — unaware that twenty years later, the stars would align on 23 August 2023 when our very first text message changed both of our lives forever.

Today, you turn 21. Twenty-one incredible years of your kindness, your laughter, your brilliant mind, and that gentle smile that makes my entire world stop. You are not just the boy I love; you are my best friend, my greatest comfort, and my favorite adventure.

Thank you for every tight hug when I needed it most, every late-night conversation that felt like five minutes, and every sweet promise you keep every single day. Stepping into this milestone year with you is an honor, and I cannot wait to stand beside you through every dream you chase and achieve.

You have my whole heart today, tomorrow, and through all the birthdays still to come.

Happy 21st Birthday, my favorite person in the entire universe! 🥂❤️`;

export default function GrandLetter() {
  const [letterText, setLetterText] = useState(() => {
    return localStorage.getItem('unlock_my_heart_grand_letter') || DEFAULT_LETTER;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(letterText);

  const handleSave = () => {
    setLetterText(draftText);
    localStorage.setItem('unlock_my_heart_grand_letter', draftText);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset the letter back to the original message?')) {
      setDraftText(DEFAULT_LETTER);
      setLetterText(DEFAULT_LETTER);
      localStorage.removeItem('unlock_my_heart_grand_letter');
      setIsEditing(false);
    }
  };

  return (
    <div className="grand-letter-box paper-card-3d">
      {/* Corner washi tape */}
      <div className="washi-tape corner-left washi-tape gold" />
      <div className="washi-tape corner-right washi-tape" />

      {/* Wax Seal Stamp */}
      <div className="wax-seal" style={{ position: 'absolute', top: '-26px', right: '30px' }}>
        <Heart size={26} fill="#ffffff" color="#ffffff" className="wax-seal-heart" />
      </div>

      {/* Edit / Customize Bar */}
      <div className="letter-action-bar">
        {!isEditing ? (
          <button className="btn-letter-edit" onClick={() => { setDraftText(letterText); setIsEditing(true); }}>
            <Edit3 size={14} />
            <span>Personalize Letter</span>
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-letter-edit"
              onClick={handleSave}
              style={{ background: '#d90429', color: '#ffffff', borderColor: '#d90429' }}
            >
              <Check size={14} />
              <span>Save My Words</span>
            </button>
            <button className="btn-letter-edit" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="btn-letter-edit" onClick={handleReset} title="Reset to default">
              <RotateCcw size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Letter Content or Editor */}
      {!isEditing ? (
        <div className="grand-letter-text">{letterText}</div>
      ) : (
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#8c234a', fontWeight: 600 }}>
            ✨ Edit your personal birthday letter (saves automatically to your browser):
          </label>
          <textarea
            style={{
              width: '100%',
              minHeight: '260px',
              fontFamily: 'var(--font-handwriting)',
              fontSize: '22px',
              color: '#2b0b1c',
              padding: '16px',
              borderRadius: '10px',
              border: '2px solid #ff758f',
              outline: 'none',
              lineHeight: 1.6,
              background: '#ffffff',
            }}
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
        </div>
      )}

      {/* Bottom Flourish */}
      <div
        style={{
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px dashed rgba(217, 4, 41, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8c234a' }}>
          <Sparkles size={18} color="#d90429" />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 600 }}>
            Forever & Always, 8 November
          </span>
        </div>
        <div style={{ fontFamily: 'var(--font-handwriting)', fontSize: '28px', color: '#d90429', fontWeight: 700 }}>
          The Love of Your Life ❤️
        </div>
      </div>
    </div>
  );
}
