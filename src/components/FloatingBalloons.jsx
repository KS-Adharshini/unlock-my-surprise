import React, { useMemo } from 'react';

export default function FloatingBalloons() {
  // Generate randomized balloons for natural variety
  const balloons = useMemo(() => {
    const colors = [
      { fill: '#d90429', highlight: '#ff4d6d' }, // Crimson
      { fill: '#ff2a6d', highlight: '#ff758f' }, // Rose Pink
      { fill: '#a31128', highlight: '#e6194b' }, // Velvet Wine
      { fill: '#ff758f', highlight: '#ffb3c6' }, // Soft Blush
      { fill: '#f5c869', highlight: '#fae19c' }, // Warm Gold
      { fill: '#c9184a', highlight: '#ff758f' }, // Deep Rose
    ];

    return Array.from({ length: 14 }).map((_, i) => {
      const left = Math.floor(Math.random() * 94) + 3; // 3% to 97%
      const duration = (Math.random() * 12 + 16).toFixed(1); // 16s - 28s
      const delay = (Math.random() * 18).toFixed(1); // 0s - 18s
      const scale = (Math.random() * 0.45 + 0.75).toFixed(2); // 0.75 - 1.2
      const color = colors[i % colors.length];

      return {
        id: i,
        left: `${left}%`,
        duration: `${duration}s`,
        delay: `-${delay}s`,
        scale,
        color,
      };
    });
  }, []);

  return (
    <div className="floating-balloons-layer" aria-hidden="true">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon-item"
          style={{
            left: b.left,
            animationDuration: b.duration,
            animationDelay: b.delay,
            transform: `scale(${b.scale})`,
          }}
        >
          {/* 3D Paper Heart Balloon SVG */}
          <svg
            className="balloon-heart"
            width="42"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`heartGrad-${b.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={b.color.highlight} />
                <stop offset="70%" stopColor={b.color.fill} />
                <stop offset="100%" stopColor="#400010" />
              </linearGradient>
              <radialGradient id={`heartShine-${b.id}`} cx="35%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`url(#heartGrad-${b.id})`}
            />
            {/* Soft highlight curve */}
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`url(#heartShine-${b.id})`}
            />
            {/* Knot at base */}
            <polygon points="11,21 13,21 12,23" fill={b.color.fill} />
          </svg>
          {/* Balloon string with swaying physics */}
          <div className="balloon-string" />
        </div>
      ))}
    </div>
  );
}
