import React from 'react';
import { ChevronRight } from 'lucide-react';

// Convert hex color to rgba
const hexToRgba = (hex, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(99, 102, 241, ${alpha})`;
  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
};

const EngineCard = ({ title, description, icon: Icon, color, onClick }) => {
  const bgColor = hexToRgba(color, 0.12);
  const borderColor = hexToRgba(color, 0.25);
  const glowColor = hexToRgba(color, 0.15);

  return (
    <div
      className="premium-card-v2"
      onClick={onClick}
      style={{ cursor: 'pointer', height: '100%', padding: '1.75rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', position: 'relative', zIndex: 1, gap: '1rem' }}>

        {/* Icon */}
        <div
          className="engine-icon-wrapper"
          style={{
            backgroundColor: bgColor,
            color: color,
            border: `1px solid ${borderColor}`,
            boxShadow: `0 0 24px ${glowColor}, 0 4px 12px rgba(0,0,0,0.2)`
          }}
        >
          <Icon size={30} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem', justifyContent: 'center' }}>
            <h3 className="tracking-tight" style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {title}
            </h3>
            <span style={{
              fontSize: '7px', background: 'linear-gradient(135deg, #f97316, #ef4444)',
              color: 'white', padding: '2px 6px', borderRadius: '40px', fontWeight: '900',
              letterSpacing: '0.5px', lineHeight: '1.6'
            }}>V6</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.65', maxWidth: '260px' }}>
            {description}
          </p>
        </div>

        {/* Footer CTA */}
        <div style={{
          width: '100%', paddingTop: '1rem',
          borderTop: `1px solid ${hexToRgba(color, 0.15)}`,
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px'
        }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase',
            letterSpacing: '1px', color: color
          }}>Launch Engine</span>
          <ChevronRight size={14} color={color} />
        </div>
      </div>

      {/* Hover gradient overlay (CSS-controlled via ::before in index.css) */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 0,
        background: `radial-gradient(circle at 50% 50%, ${hexToRgba(color, 0.06)} 0%, transparent 70%)`,
        opacity: 0, transition: 'opacity 0.35s ease',
        pointerEvents: 'none'
      }} className="card-glow-bg" />
    </div>
  );
};

export default EngineCard;
