import React, { useState } from 'react';
import { Heart } from 'lucide-react';

// Default Polaroid items featuring couple's special memories
const INITIAL_POLAROIDS = [
  {
    id: 'first-meeting',
    caption: 'The Day My Eyes Met Yours',
    rotation: '-2deg',
    tapeColor: 'pink',
    defaultImage: '/photos/photo1.png',
  },
  {
    id: 'first-kiss',
    caption: 'Pure Magic Under The Stars',
    rotation: '2.5deg',
    tapeColor: 'gold',
    defaultImage: '/photos/photo2.png',
  },
  {
    id: 'anniversary',
    caption: 'Two Hearts, One Promise',
    rotation: '-1.5deg',
    tapeColor: 'pink',
    defaultImage: '/photos/photo3.png',
  },
  {
    id: 'first-call',
    caption: 'Hours That Felt Like Minutes',
    rotation: '2deg',
    tapeColor: 'gold',
    defaultImage: '/photos/photo4.png',
  },
  {
    id: 'birthday-21',
    caption: 'Cheers to 21 Years of You',
    rotation: '-2.5deg',
    tapeColor: 'pink',
    defaultImage: '/photos/photo5.png',
  },
  {
    id: 'first-text',
    caption: 'Where It All Began',
    rotation: '1.8deg',
    tapeColor: 'gold',
    defaultImage: '/photos/photo1.png',
  },
];

export default function PolaroidWall() {
  const [userPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('unlock_my_heart_user_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '28px',
            color: '#ffffff',
            margin: '0 0 6px 0',
          }}
        >
          Our Polaroid Scrapbook Wall 📸
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ffb3c6', margin: 0 }}>
          Our favorite memories together, sealed with love forever.
        </p>
      </div>

      <div className="polaroid-gallery-grid">
        {INITIAL_POLAROIDS.map((p) => {
          const displayImage = userPhotos[p.id] || p.defaultImage;

          return (
            <div
              key={p.id}
              className="polaroid-card"
              style={{ transform: `rotate(${p.rotation})` }}
            >
              {/* Scrapbook Washi Tape */}
              <div
                className={`washi-tape ${p.tapeColor === 'gold' ? 'gold' : ''}`}
                style={{ width: '90px', top: '-10px' }}
              />

              {/* Photo Display Frame */}
              <div
                className="polaroid-image-frame"
                style={{
                  background: '#000000',
                }}
              >
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={p.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      padding: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <Heart size={42} fill="#ff2a6d" color="#ff2a6d" />
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '15px',
                        color: '#ffffff',
                        fontWeight: 600,
                        marginTop: '8px',
                      }}
                    >
                      {p.caption}
                    </span>
                  </div>
                )}
              </div>

              {/* Handwritten Title */}
              <div className="polaroid-caption">{p.caption}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

