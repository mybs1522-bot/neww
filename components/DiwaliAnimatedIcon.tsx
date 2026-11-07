import React, { useId } from 'react';

interface DiwaliAnimatedIconProps {
  size?: number;
  className?: string;
}

export const DiwaliAnimatedIcon: React.FC<DiwaliAnimatedIconProps> = ({
  size = 20,
  className = '',
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '_');

  const flameOuterId = `diwaliFlameOuter_${id}`;
  const flameMidId = `diwaliFlameMid_${id}`;
  const flameCoreId = `diwaliFlameCore_${id}`;
  const bowlId = `diwaliBowl_${id}`;
  const rimId = `diwaliRim_${id}`;
  const auraId = `diwaliAura_${id}`;

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 relative select-none ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Diwali Diya Lamp"
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Radiant Aura / Fire Glow */}
          <radialGradient id={auraId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFA500" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#FF4500" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>

          {/* Outer flame gradient - Crimson to Fiery Orange */}
          <linearGradient id={flameOuterId} x1="12" y1="1.8" x2="12" y2="15.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="20%" stopColor="#FDE047" />
            <stop offset="55%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          {/* Mid flame gradient - Vibrant Saffron Gold */}
          <linearGradient id={flameMidId} x1="12" y1="4" x2="12" y2="14.8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Inner flame core - Brilliant Incandescent White */}
          <linearGradient id={flameCoreId} x1="12" y1="6.8" x2="12" y2="14.2" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          {/* Diya bowl gradient - Rich terracotta burnished brass */}
          <linearGradient id={bowlId} x1="3" y1="13.5" x2="21" y2="23.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="30%" stopColor="#D97706" />
            <stop offset="65%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Diya rim highlight */}
          <linearGradient id={rimId} x1="3" y1="13.5" x2="21" y2="16.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <style>
            {`
              @keyframes diyaFlameDance {
                0% {
                  transform: scale(1, 1) rotate(0deg) skewX(0deg);
                  filter: drop-shadow(0 0 2.5px rgba(245, 158, 11, 0.95)) drop-shadow(0 0 5px rgba(239, 68, 68, 0.6));
                }
                20% {
                  transform: scale(1.09, 0.94) rotate(-3.5deg) skewX(-2deg);
                  filter: drop-shadow(0 0 4px rgba(251, 191, 36, 1)) drop-shadow(0 0 7px rgba(249, 115, 22, 0.8));
                }
                45% {
                  transform: scale(0.93, 1.07) rotate(2.5deg) skewX(1.5deg);
                  filter: drop-shadow(0 0 3px rgba(245, 158, 11, 0.85)) drop-shadow(0 0 5px rgba(239, 68, 68, 0.55));
                }
                70% {
                  transform: scale(1.06, 0.97) rotate(-2deg) skewX(-1deg);
                  filter: drop-shadow(0 0 4.5px rgba(251, 191, 36, 1)) drop-shadow(0 0 8px rgba(245, 158, 11, 0.9));
                }
                85% {
                  transform: scale(0.96, 1.04) rotate(3deg) skewX(2deg);
                  filter: drop-shadow(0 0 3.5px rgba(245, 158, 11, 0.9)) drop-shadow(0 0 6px rgba(239, 68, 68, 0.7));
                }
                100% {
                  transform: scale(1, 1) rotate(0deg) skewX(0deg);
                  filter: drop-shadow(0 0 2.5px rgba(245, 158, 11, 0.95)) drop-shadow(0 0 5px rgba(239, 68, 68, 0.6));
                }
              }

              @keyframes diyaAuraPulse {
                0%, 100% {
                  opacity: 0.45;
                  transform: scale(0.85);
                }
                50% {
                  opacity: 0.9;
                  transform: scale(1.2);
                }
              }

              @keyframes diyaSparkleFloat {
                0%, 100% {
                  opacity: 0.25;
                  transform: scale(0.7) translateY(0px) rotate(0deg);
                }
                50% {
                  opacity: 1;
                  transform: scale(1.25) translateY(-1.5px) rotate(45deg);
                }
              }

              @keyframes diyaEmberFloat {
                0% {
                  opacity: 0;
                  transform: translateY(2px) scale(0.4);
                }
                40% {
                  opacity: 0.95;
                  transform: translateY(-2px) scale(1.1);
                }
                100% {
                  opacity: 0;
                  transform: translateY(-6px) scale(0.3);
                }
              }

              .diwali-aura-pulsing {
                transform-box: fill-box;
                transform-origin: 50% 50%;
                animation: diyaAuraPulse 1.8s ease-in-out infinite;
                will-change: transform, opacity;
              }

              .diwali-flame-dancing {
                transform-box: fill-box;
                transform-origin: 50% 100%;
                animation: diyaFlameDance 1.25s ease-in-out infinite;
                will-change: transform, filter;
              }

              .diwali-sparkle-topright {
                transform-box: fill-box;
                transform-origin: 50% 50%;
                animation: diyaSparkleFloat 1.9s ease-in-out infinite;
              }

              .diwali-sparkle-topleft {
                transform-box: fill-box;
                transform-origin: 50% 50%;
                animation: diyaSparkleFloat 2.2s ease-in-out infinite 0.6s;
              }

              .diwali-ember-rising {
                transform-box: fill-box;
                transform-origin: 50% 50%;
                animation: diyaEmberFloat 1.5s ease-out infinite;
              }
            `}
          </style>
        </defs>

        {/* 1. Warm Firelight Radiant Aura (pulsing behind flame) */}
        <circle
          cx="12"
          cy="9.5"
          r="8"
          fill={`url(#${auraId})`}
          className="diwali-aura-pulsing"
        />

        {/* 2. Rising Golden Ember */}
        <circle
          cx="12.3"
          cy="1.2"
          r="0.8"
          fill="#FEF08A"
          className="diwali-ember-rising"
        />

        {/* 3. Twinkling Golden Star Sparkles */}
        <path
          d="M 19.5 1.5 L 20.2 3.3 L 22 4 L 20.2 4.7 L 19.5 6.5 L 18.8 4.7 L 17 4 L 18.8 3.3 Z"
          fill="#FDE047"
          className="diwali-sparkle-topright"
        />
        <path
          d="M 4.5 3.5 L 5.1 5.2 L 6.8 5.8 L 5.1 6.4 L 4.5 8.1 L 3.9 6.4 L 2.2 5.8 L 3.9 5.2 Z"
          fill="#FBBF24"
          className="diwali-sparkle-topleft"
        />

        {/* 4. Multilayered Dancing Flame (GPU Accelerated with transform-box) */}
        <g className="diwali-flame-dancing">
          {/* Outer Crimson/Orange flame */}
          <path
            d="M 12 1.8 C 14.8 5 17 8.2 17 11.5 C 17 14.5 14.8 15.5 12 15.5 C 9.2 15.5 7 14.5 7 11.5 C 7 8.2 9.2 5 12 1.8 Z"
            fill={`url(#${flameOuterId})`}
          />
          {/* Middle Saffron/Gold flame */}
          <path
            d="M 12 4.2 C 14 6.8 15.5 9.2 15.5 11.8 C 15.5 14 13.8 14.8 12 14.8 C 10.2 14.8 8.5 14 8.5 11.8 C 8.5 9.2 10 6.8 12 4.2 Z"
            fill={`url(#${flameMidId})`}
          />
          {/* Inner Incandescent Core */}
          <path
            d="M 12 7.2 C 13.2 9.2 14 10.8 14 12.3 C 14 13.8 13 14.3 12 14.3 C 11 14.3 10 13.8 10 12.3 C 10 10.8 10.8 9.2 12 7.2 Z"
            fill={`url(#${flameCoreId})`}
          />
        </g>

        {/* 5. Traditional Cotton Wick (Baati) */}
        <path
          d="M 11.4 14.8 C 11.8 13.8 12.4 13.5 12.7 13.9"
          stroke="#27272A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 6. Diya Base Stand */}
        <path
          d="M 9.2 21.8 L 7.5 23.5 C 7.5 23.5 9.5 23.8 12 23.8 C 14.5 23.8 16.5 23.5 16.5 23.5 L 14.8 21.8 Z"
          fill="#78350F"
        />

        {/* 7. Diya Earthen Bowl Body */}
        <path
          d="M 2.2 14.8 C 2.8 19.8 7.2 22.4 12 22.4 C 16.8 22.4 21.2 19.8 21.8 14.8 C 17.5 17 6.5 17 2.2 14.8 Z"
          fill={`url(#${bowlId})`}
          stroke="#92400E"
          strokeWidth="0.6"
        />

        {/* 8. Diya Rim Oval */}
        <ellipse
          cx="12"
          cy="14.8"
          rx="9.8"
          ry="2"
          fill={`url(#${rimId})`}
          opacity="0.95"
        />

        {/* 9. Golden Carved Rim Arc */}
        <path
          d="M 3.8 15.2 C 7.2 17.2 16.8 17.2 20.2 15.2"
          stroke="#FEF08A"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* 10. Festive Ornamental Beads on Rim */}
        <circle cx="7" cy="15.8" r="0.65" fill="#FEF08A" />
        <circle cx="12" cy="16.5" r="0.75" fill="#FEF08A" />
        <circle cx="17" cy="15.8" r="0.65" fill="#FEF08A" />
      </svg>
    </span>
  );
};

export default DiwaliAnimatedIcon;
