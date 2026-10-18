import React from 'react';
import {
  Sparkles,
  Heart,
  MessageCircle,
  Eye,
  PhoneCall,
  Flame,
  Infinity,
  Gift,
} from 'lucide-react';
import { TIMELINE_MILESTONES } from '../../data/timelineData';

export default function LoveTimeline() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles size={18} />;
      case 'Heart':
        return <Heart size={18} fill="#ff2a6d" />;
      case 'MessageCircle':
        return <MessageCircle size={18} />;
      case 'Eye':
        return <Eye size={18} />;
      case 'PhoneCall':
        return <PhoneCall size={18} />;
      case 'Flame':
        return <Flame size={18} />;
      case 'Infinity':
        return <Infinity size={18} />;
      case 'Gift':
        return <Gift size={18} />;
      default:
        return <Heart size={18} />;
    }
  };

  return (
    <div style={{ marginBottom: '50px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '28px',
            color: '#ffffff',
            margin: '0 0 6px 0',
          }}
        >
          Our Love Journey Timeline ⏳❤️
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ffb3c6', margin: 0 }}>
          From the day you were born to our 21st birthday celebration and beyond.
        </p>
      </div>

      <div className="timeline-list">
        {TIMELINE_MILESTONES.map((m) => (
          <div key={m.id} className="timeline-item">
            {/* Circular Marker Node */}
            <div className="timeline-marker-node">{getIcon(m.icon)}</div>

            {/* Scrapbook Card */}
            <div className="timeline-card-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <span className="timeline-date-chip">{m.date}</span>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#ff758f',
                    background: 'rgba(255, 117, 143, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontWeight: 700,
                  }}
                >
                  {m.badge}
                </span>
              </div>

              <h4 className="timeline-item-title">{m.title}</h4>
              <p className="timeline-item-desc">{m.description}</p>
              {m.note && (
                <div style={{ fontSize: '12px', color: '#f5c869', fontStyle: 'italic', marginTop: '6px' }}>
                  {m.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
