import React, { useState, useEffect, useRef } from 'react';
import { BUNDLE_PRICE, BUNDLE_ORIGINAL_PRICE } from '../constants';

interface AnimatedPriceSlashProps {
  isDark?: boolean;
  salePrice?: number;
  originalPrice?: number;
  className?: string;
}

export const AnimatedPriceSlash: React.FC<AnimatedPriceSlashProps> = ({
  isDark = false,
  salePrice = BUNDLE_PRICE,
  originalPrice = BUNDLE_ORIGINAL_PRICE,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCut, setIsCut] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const savings = originalPrice - salePrice;
  const discountPercent = Math.round((1 - salePrice / originalPrice) * 100);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check if element is already in viewport on mount
    const checkIntersection = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
      if (inView && !hasTriggered) {
        setHasTriggered(true);
        setTimeout(() => setIsCut(true), 450);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
            setTimeout(() => {
              setIsCut(true);
            }, 450); // 450ms pause so the user registers the regular price first
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    checkIntersection();

    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-between w-full px-1 min-h-[44px] select-none ${className}`}
    >
      <div className="flex items-baseline gap-2.5">
        {/* Sale Price ₹799 - Pops in with celebratory spring bounce when cut */}
        <div className="relative flex items-center">
          <span
            className={`font-heading font-extrabold tracking-tight transition-all duration-500 inline-block ${
              isDark ? 'text-white' : 'text-zinc-950'
            } ${
              isCut
                ? 'text-3xl sm:text-4xl opacity-100 scale-100 translate-y-0'
                : 'text-2xl sm:text-3xl opacity-0 scale-50 -translate-x-2 w-0 overflow-hidden'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            ₹{salePrice}
          </span>

          {/* Golden burst ring flash on reveal */}
          {isCut && (
            <span className="absolute -inset-1 rounded-lg bg-amber-400/25 blur-xs pointer-events-none animate-[ping_0.7s_ease-out_1]" />
          )}
        </div>

        {/* Regular Price with animated red slash line cut */}
        <div className="relative inline-flex items-center">
          <span
            className={`transition-all duration-500 ${
              isCut
                ? 'text-zinc-400 text-xs sm:text-sm font-mono'
                : 'text-2xl sm:text-3xl font-heading font-bold text-zinc-600'
            }`}
          >
            ₹{originalPrice.toLocaleString('en-IN')}
          </span>

          {/* Dynamic Animated Cut Line */}
          <svg
            className={`absolute -inset-x-1.5 inset-y-0 w-[calc(100%+12px)] h-full pointer-events-none transition-opacity duration-200 ${
              isCut ? 'opacity-100' : 'opacity-0'
            }`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              x1="-4"
              y1="85"
              x2="104"
              y2="15"
              stroke="#DC2626"
              strokeWidth="8"
              strokeLinecap="round"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: isCut ? 0 : 200,
                transition: 'stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </svg>
        </div>
      </div>

      {/* Savings Badge - Animated reveal */}
      <div className="shrink-0">
        <span
          className={`inline-flex items-center gap-1 font-mono font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full shadow-2xs transition-all duration-500 ${
            isCut
              ? 'opacity-100 scale-100 bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
              : 'opacity-70 scale-90 bg-zinc-100 text-zinc-500 border border-zinc-200'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {isCut ? (
            <>
              <span>🎉</span>
              <span>{discountPercent}% OFF • SAVE ₹{savings.toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              Diwali Offer
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default AnimatedPriceSlash;
