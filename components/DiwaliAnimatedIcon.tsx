import React from 'react';

interface DiwaliAnimatedIconProps {
  size?: number;
  className?: string;
}

export const DiwaliAnimatedIcon: React.FC<DiwaliAnimatedIconProps> = ({
  size = 18,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
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
          {/* Flame outer gradient */}
          <linearGradient id="diwaliFlameOuter" x1="12" y1="2" x2="12" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          {/* Flame core gradient */}
          <linearGradient id="diwaliFlameCore" x1="12" y1="5.5" x2="12" y2="14.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Diya bowl metallic gradient */}
          <linearGradient id="diwaliBowl" x1="3" y1="13" x2="21" y2="23" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="35%" stopColor="#D97706" />
            <stop offset="70%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Diya rim highlight */}
          <linearGradient id="diwaliRim" x1="3" y1="13.5" x2="21" y2="15.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <style>
            {`
              @keyframes diwaliFlicker {
                0%, 100% {
                  transform: scale(1) rotate(0deg);
                  filter: drop-shadow(0 0 2.5px rgba(245, 158, 11, 0.95)) drop-shadow(0 0 5px rgba(239, 68, 68, 0.6));
                }
                25% {
                  transform: scale(1.08, 0.94) rotate(-2.5deg);
                  filter: drop-shadow(0 0 4px rgba(251, 191, 36, 1)) drop-shadow(0 0 7px rgba(249, 115, 22, 0.8));
                }
                50% {
                  transform: scale(0.94, 1.06) rotate(2deg);
                  filter: drop-shadow(0 0 3px rgba(245, 158, 11, 0.85)) drop-shadow(0 0 5px rgba(239, 68, 68, 0.5));
                }
                75% {
                  transform: scale(1.05, 0.97) rotate(-1.5deg);
                  filter: drop-shadow(0 0 4.5px rgba(251, 191, 36, 1)) drop-shadow(0 0 8px rgba(245, 158, 11, 0.9));
                }
              }

              @keyframes diwaliTwinkle1 {
                0%, 100% { opacity: 0.3; transform: scale(0.7) rotate(0deg); }
                50% { opacity: 1; transform: scale(1.2) rotate(45deg); }
              }

              @keyframes diwaliTwinkle2 {
                0%, 100% { opacity: 0.85; transform: scale(1.15) rotate(20deg); }
                50% { opacity: 0.25; transform: scale(0.65) rotate(-15deg); }
              }

              .diwali-flame-anim {
                transform-origin: 12px 14.5px;
                animation: diwaliFlicker 1.4s ease-in-out infinite;
                will-change: transform, filter;
              }

              .diwali-sparkle-1 {
                transform-origin: 19px 4.5px;
                animation: diwaliTwinkle1 1.8s ease-in-out infinite;
              }

              .diwali-sparkle-2 {
                transform-origin: 5px 6.5px;
                animation: diwaliTwinkle2 2.1s ease-in-out infinite;
              }
            `}
          </style>
        </defs>

        {/* Twinkling festive sparkles */}
        <path
          d="M 19 2 L 19.6 3.9 L 21.5 4.5 L 19.6 5.1 L 19 7 L 18.4 5.1 L 16.5 4.5 L 18.4 3.9 Z"
          fill="#FDE047"
          className="diwali-sparkle-1"
        />
        <path
          d="M 5 4.5 L 5.5 6 L 7 6.5 L 5.5 7 L 5 8.5 L 4.5 7 L 3 6.5 L 4.5 6 Z"
          fill="#FBBF24"
          className="diwali-sparkle-2"
        />

        {/* Flickering Flame Group */}
        <g className="diwali-flame-anim">
          {/* Outer flame */}
          <path
            d="M 12 2.2 C 14.5 5.5 16.5 8.2 16.5 11.5 C 16.5 14 14.5 15.2 12 15.2 C 9.5 15.2 7.5 14 7.5 11.5 C 7.5 8.2 9.5 5.5 12 2.2 Z"
            fill="url(#diwaliFlameOuter)"
          />
          {/* Inner bright core */}
          <path
            d="M 12 6 C 13.3 8 14.5 9.6 14.5 11.8 C 14.5 13.4 13.4 14.4 12 14.4 C 10.6 14.4 9.5 13.4 9.5 11.8 C 9.5 9.6 10.7 8 12 6 Z"
            fill="url(#diwaliFlameCore)"
          />
        </g>

        {/* Diya Base Stand */}
        <path
          d="M 9 21.5 L 7.5 23.5 L 16.5 23.5 L 15 21.5 Z"
          fill="#78350F"
        />

        {/* Diya Bowl (Earthen lamp body) */}
        <path
          d="M 2.5 14.5 C 3 19.5 7.5 22.2 12 22.2 C 16.5 22.2 21 19.5 21.5 14.5 C 17.5 16.8 6.5 16.8 2.5 14.5 Z"
          fill="url(#diwaliBowl)"
          stroke="#92400E"
          strokeWidth="0.5"
        />

        {/* Diya Rim Oval Highlight */}
        <ellipse
          cx="12"
          cy="14.5"
          rx="9.5"
          ry="1.8"
          fill="url(#diwaliRim)"
          opacity="0.9"
        />

        {/* Diya Rim decorative edge */}
        <path
          d="M 4 14.8 C 7.5 16.4 16.5 16.4 20 14.8"
          stroke="#FEF08A"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      </svg>
    </span>
  );
};

export default DiwaliAnimatedIcon;
