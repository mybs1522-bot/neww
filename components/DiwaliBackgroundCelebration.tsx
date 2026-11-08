import React, { useEffect, useState } from 'react';
import { DiwaliAnimatedIcon } from './DiwaliAnimatedIcon';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export const DiwaliBackgroundCelebration: React.FC = () => {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  const [showLandingBurst, setShowLandingBurst] = useState(true);

  // Generate festive landing sparkles on mount
  useEffect(() => {
    const colors = ['#F59E0B', '#FBBF24', '#FDE047', '#EF4444', '#F97316', '#FFFFFF'];
    const p: SparkleParticle[] = [];
    for (let i = 0; i < 28; i++) {
      p.push({
        id: i,
        x: Math.random() * 96 + 2, // 2% to 98% width
        y: Math.random() * 70 + 5,  // 5% to 75% height
        size: Math.random() * 8 + 4,
        delay: Math.random() * 1.2,
        duration: Math.random() * 1.8 + 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(p);

    // Gently fade out the intense initial landing burst after 4.5 seconds
    const timer = setTimeout(() => {
      setShowLandingBurst(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ═══ 1. SUBTLE FESTIVE BACKGROUND DIYA CELEBRATION (PERSISTENT & ELEGANT) ═══ */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Warm Ambient Corner Firelight Glows */}
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-60 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-60 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.14) 0%, rgba(249, 115, 22, 0.06) 50%, transparent 70%)'
          }}
        />
        <div 
          className="absolute top-1/2 left-0 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute top-2/3 right-0 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.07) 0%, transparent 70%)'
          }}
        />

        {/* Faint Sacred Rangoli Mandala Watermark Pattern (Centered in Hero) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] opacity-[0.035] pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_180s_linear_infinite]">
            <circle cx="100" cy="100" r="95" stroke="#D97706" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="80" stroke="#B45309" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" stroke="#D97706" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="40" stroke="#B45309" strokeWidth="1" />
            <circle cx="100" cy="100" r="20" stroke="#D97706" strokeWidth="1" />
            {/* 8-pointed star & lotus petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 100 100)`}>
                <path d="M 100 20 C 108 50, 108 70, 100 85 C 92 70, 92 50, 100 20 Z" fill="#F59E0B" opacity="0.3" />
                <circle cx="100" cy="22" r="3" fill="#D97706" />
                <path d="M 100 40 L 105 60 L 100 80 L 95 60 Z" stroke="#B45309" strokeWidth="0.8" />
              </g>
            ))}
          </svg>
        </div>

        {/* Subtle Background Glowing Diyas along Screen Edges */}
        {/* Top-Left Ambient Diya */}
        <div className="absolute top-6 left-2 sm:left-8 opacity-40 hover:opacity-80 transition-opacity pointer-events-none scale-90 sm:scale-100">
          <DiwaliAnimatedIcon size={28} />
          <div className="w-8 h-2 bg-amber-500/20 blur-xs rounded-full -mt-1 mx-auto" />
        </div>

        {/* Top-Right Ambient Diya */}
        <div className="absolute top-6 right-2 sm:right-8 opacity-40 hover:opacity-80 transition-opacity pointer-events-none scale-90 sm:scale-100">
          <DiwaliAnimatedIcon size={28} />
          <div className="w-8 h-2 bg-amber-500/20 blur-xs rounded-full -mt-1 mx-auto" />
        </div>

        {/* Mid-Left Subtle Floating Diya */}
        <div className="hidden md:block absolute top-[42%] left-4 opacity-30 pointer-events-none">
          <DiwaliAnimatedIcon size={26} />
          <div className="w-7 h-2 bg-amber-500/15 blur-xs rounded-full -mt-1 mx-auto" />
        </div>

        {/* Mid-Right Subtle Floating Diya */}
        <div className="hidden md:block absolute top-[55%] right-4 opacity-30 pointer-events-none">
          <DiwaliAnimatedIcon size={26} />
          <div className="w-7 h-2 bg-amber-500/15 blur-xs rounded-full -mt-1 mx-auto" />
        </div>

        {/* Persistent Floating Firefly Embers (Lightweight, pure GPU transforms) */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: '8%', delay: '0s', duration: '9s', size: 3 },
            { left: '22%', delay: '2s', duration: '11s', size: 2.5 },
            { left: '38%', delay: '5s', duration: '8.5s', size: 3.5 },
            { left: '62%', delay: '1s', duration: '10s', size: 2 },
            { left: '78%', delay: '4s', duration: '9.5s', size: 3 },
            { left: '92%', delay: '3s', duration: '12s', size: 2.5 },
          ].map((ember, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-full pointer-events-none"
              style={{
                left: ember.left,
                width: `${ember.size}px`,
                height: `${ember.size}px`,
                backgroundColor: '#FDE047',
                boxShadow: '0 0 6px 1.5px rgba(245, 158, 11, 0.7)',
                animation: `diwaliBackgroundEmberRise ${ember.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite ${ember.delay}`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ═══ 2. DIWALI EFFECT ON PAGE LANDING (CELEBRATORY SPARKS & BURST) ═══ */}
      {showLandingBurst && (
        <div 
          className="fixed inset-0 pointer-events-none z-[60] overflow-hidden transition-opacity duration-1000"
          style={{ opacity: showLandingBurst ? 1 : 0 }}
        >
          {/* Festive Top Light Curtain Flare */}
          <div 
            className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.18) 0%, rgba(239, 68, 68, 0.06) 60%, transparent 100%)',
              animation: 'diwaliCurtainFade 4.5s ease-out forwards',
            }}
          />

          {/* Dazzling Landing Golden Sparkles */}
          {particles.map((pt) => (
            <div
              key={pt.id}
              className="absolute pointer-events-none"
              style={{
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                animation: `diwaliLandingSparkle ${pt.duration}s cubic-bezier(0.2, 0.8, 0.3, 1) forwards ${pt.delay}s`,
              }}
            >
              <svg
                width={pt.size}
                height={pt.size}
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  filter: `drop-shadow(0 0 4px ${pt.color})`,
                }}
              >
                <path
                  d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                  fill={pt.color}
                />
              </svg>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DiwaliBackgroundCelebration;
