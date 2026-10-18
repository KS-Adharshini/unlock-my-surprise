import React from 'react';
import { Award, Heart, Printer, Sparkles, Check } from 'lucide-react';

export default function CertificateOfLove() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ marginBottom: '50px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '28px',
            color: '#ffffff',
            margin: '0 0 6px 0',
          }}
        >
          An Official Decree of Love 📜
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ffb3c6', margin: 0 }}>
          Signed, sealed, and valid for eternity.
        </p>
      </div>

      <div className="certificate-frame-wrapper" id="printable-certificate">
        <div className="certificate-inner-border">
          {/* Top Stamp */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#b8860b" />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#855307',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              Certified by the Universe • 15 August 2025
            </span>
            <Sparkles size={20} color="#b8860b" />
          </div>

          <h2 className="cert-main-title">Officially the Owner of My Heart</h2>
          <div className="cert-subtitle">Certificate of Eternal Love & Devotion</div>

          <p style={{ margin: '14px 0 6px 0', fontSize: '14px', color: '#661a29', fontStyle: 'italic' }}>
            This prestigious document certifies that on this momentous 21st birthday,
          </p>

          <div className="cert-recipient-name">My Favorite Person</div>

          <div className="cert-description">
            Is hereby recognized as the undisputed, permanent, and cherished owner of my heart,
            soul, smiles, and all future tomorrows. Granted with all the love in the universe,
            celebrating your 21st milestone, and backed by a lifetime warranty of kisses,
            warm hugs, and unwavering loyalty.
          </div>

          {/* Seals & Signatures */}
          <div className="cert-seal-section">
            <div style={{ textAlign: 'center' }}>
              <div className="cert-signature-line">Forever Yours</div>
              <span style={{ fontSize: '12px', color: '#855307', fontWeight: 600 }}>
                Signed with all my love ❤️
              </span>
            </div>

            {/* Embossed Wax Seal */}
            <div className="wax-seal" style={{ margin: '0 12px' }}>
              <Heart size={26} fill="#ffffff" color="#ffffff" className="wax-seal-heart" />
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  color: '#8c1028',
                  fontWeight: 700,
                  borderBottom: '1px solid #8c1028',
                  paddingBottom: '4px',
                }}
              >
                8 November
              </div>
              <span style={{ fontSize: '12px', color: '#855307', fontWeight: 600 }}>
                21st Birthday Milestone
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn-romantic-primary"
          onClick={handlePrint}
          style={{ background: 'linear-gradient(135deg, #855307, #d4af37)', color: '#ffffff' }}
        >
          <Printer size={16} />
          <span>Print / Save Certificate</span>
        </button>
      </div>
    </div>
  );
}
