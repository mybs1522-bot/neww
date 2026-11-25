import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

/*
 * Code versions of the two hero graphics (formerly live-classes-every-week.png and banner-1.png).
 * Each banner is laid out on a fixed design canvas (the original image's pixel size) and scaled
 * to its container, so every piece below can be positioned and animated on its own.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Scales a fixed-size design canvas to the width of its container. */
const useFitScale = (designWidth: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / designWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);
  return { ref, scale };
};

interface BannerProps {
  onClick?: () => void;
  className?: string;
}

const Canvas: React.FC<{
  width: number;
  height: number;
  label: string;
  onClick?: () => void;
  className?: string;
  children: (shown: boolean) => React.ReactNode;
}> = ({ width, height, label, onClick, className = '', children }) => {
  const { ref, scale } = useFitScale(width);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      onClick={onClick}
      className={`relative w-full cursor-pointer select-none hover:scale-[1.01] transition-transform duration-300 ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children(inView || !!reduce)}
      </div>
    </div>
  );
};

/* ═══ LIVE CLASSES — EVERY WEEK ═══ */

const FAN = [
  { src: '/renders/RENDER-9.jpg', angle: -34 },
  { src: '/renders/RENDER-2.jpg', angle: -17 },
  { src: '/renders/RENDER-6.jpg', angle: 0 },
  { src: '/renders/RENDER-11.jpg', angle: 17 },
  { src: '/renders/RENDER-16.jpg', angle: 32 },
];

export const LiveClassesBanner: React.FC<BannerProps> = ({ onClick, className }) => (
  <Canvas width={1024} height={471} label="Live classes for doubts & questions every week" onClick={onClick} className={className}>
    {(shown) => (
      <>
        {/* Fanned project photos behind the monitor */}
        {FAN.map((card, i) => (
          <motion.div
            key={card.src}
            className="absolute overflow-hidden rounded-[6px] bg-white p-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
            style={{ left: 643, top: 22, width: 174, height: 240, transformOrigin: '50% 230%' }}
            initial={{ rotate: 0, opacity: 0, y: 60 }}
            animate={shown ? { rotate: card.angle, opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.35 + Math.abs(i - 2) * 0.08, ease: EASE }}
          >
            <img src={card.src} alt="" className="h-full w-full rounded-[3px] object-cover" draggable={false} />
          </motion.div>
        ))}

        {/* Monitor with the live class grid */}
        <motion.div
          className="absolute"
          style={{ left: 541, top: 153, width: 376 }}
          initial={{ opacity: 0, y: 40 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="rounded-t-[10px] bg-[#0b0b0c] p-[21px] pb-[19px] shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
            <motion.img
              src="/promo/live-grid.jpg"
              alt=""
              draggable={false}
              className="block h-[187px] w-[334px] object-cover"
              initial={{ opacity: 0, filter: 'brightness(2.2)' }}
              animate={shown ? { opacity: 1, filter: 'brightness(1)' } : undefined}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
          </div>
          <div className="h-[33px] rounded-b-[12px] bg-gradient-to-b from-[#ececec] to-[#d4d4d4]" />
          <div className="mx-auto h-[36px] w-[92px] bg-gradient-to-b from-[#cfcfcf] to-[#e6e6e6] [clip-path:polygon(6%_0,94%_0,100%_100%,0_100%)]" />
          <div className="mx-auto h-[8px] w-[150px] rounded-[50%] bg-gradient-to-b from-[#e2e2e2] to-[#b9b9b9] shadow-[0_6px_10px_rgba(0,0,0,0.18)]" />
        </motion.div>

        {/* Headline */}
        <div className="absolute text-center" style={{ left: 40, top: 286, width: 470 }}>
          <motion.div
            className="whitespace-nowrap font-['Montserrat'] text-[14.5px] font-semibold uppercase text-[#111]"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={shown ? { opacity: 1, letterSpacing: '0.12em' } : undefined}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            Live classes for doubts &amp; questions
          </motion.div>
          <div className="overflow-hidden">
            <motion.div
              className="font-['Bodoni_Moda'] text-[58px] font-semibold uppercase leading-[1.05] tracking-[0.01em] text-[#111]"
              initial={{ y: '105%' }}
              animate={shown ? { y: '0%' } : undefined}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            >
              Every Week
            </motion.div>
          </div>
        </div>
      </>
    )}
  </Canvas>
);

/* ═══ 15 DAYS TO STUNNING DESIGNS & RENDERS ═══ */

const TOOLS = [
  ['sketchup', 'SketchUp'], ['d5', 'D5 Render'], ['vray', 'V-Ray'], ['3dsmax', '3ds Max'], ['revit', 'Revit'],
  ['lumion', 'Lumion'], ['photoshop', 'Photoshop'], ['ai', 'AI Rendering'], ['enscape', 'Enscape'], ['autocad', 'AutoCAD'],
];

const ROOM = '/renders/RENDER-22.jpg';

/* Laptop drawn in the banner's own coordinates; the screen wipes from a line sketch to the render. */
const Laptop: React.FC<{ shown: boolean }> = ({ shown }) => {
  // Screen is a slightly sheared quad: top-left (181,190), top-right (369,183), bottom-left (181,309).
  const screen = 'matrix(1 -0.0372 0 1 181 190)';
  const W = 188, H = 119;
  return (
    <svg className="absolute left-0 top-0 overflow-visible" width={477} height={523} viewBox="0 0 477 523">
      <defs>
        <filter id="pb-sketch" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feGaussianBlur stdDeviation="0.6" />
          <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="-2.2" intercept="1" />
            <feFuncG type="linear" slope="-2.2" intercept="1" />
            <feFuncB type="linear" slope="-2.2" intercept="1" />
          </feComponentTransfer>
        </filter>
        <clipPath id="pb-screen"><rect width={W} height={H} /></clipPath>
        <clipPath id="pb-wipe">
          <motion.rect
            height={H}
            initial={{ width: W }}
            animate={shown ? { width: [W, W, 0, 0, W] } : undefined}
            transition={{ duration: 7, times: [0, 0.18, 0.5, 0.82, 1], delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </clipPath>
        <linearGradient id="pb-deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3e5e8" />
          <stop offset="1" stopColor="#b4b8bd" />
        </linearGradient>
        <linearGradient id="pb-lip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9a9ea4" />
          <stop offset="1" stopColor="#6d7177" />
        </linearGradient>
      </defs>

      <motion.g
        initial={{ opacity: 0, y: 30 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
      >
        {/* Base */}
        <path d="M66 333 L184 309 L372 312 L330 352 Z" fill="url(#pb-deck)" />
        <path d="M66 333 L330 352 L329 361 L68 340 Z" fill="url(#pb-lip)" />
        <path d="M108 330 L190 314 L344 317 L316 340 Z" fill="#3a3d42" opacity="0.35" />
        <path d="M200 343 L262 347 L268 340 L208 336 Z" fill="#a6aab0" />
        {/* Lid */}
        <path d="M176 186 L374 178 L376 314 L177 313 Z" fill="#1a1b1e" />
        <g transform={screen}>
          <g clipPath="url(#pb-screen)">
            <image href={ROOM} width={W} height={H} preserveAspectRatio="xMidYMid slice" />
            <g clipPath="url(#pb-wipe)">
              <rect width={W} height={H} fill="#fff" />
              <image href={ROOM} width={W} height={H} preserveAspectRatio="xMidYMid slice" filter="url(#pb-sketch)" />
            </g>
            {/* App toolbar */}
            <rect width={W} height={8} fill="#f4f4f5" />
            {['#e5484d', '#f5a524', '#30a46c', '#3e63dd', '#8e4ec6', '#e5484d', '#30a46c', '#3e63dd'].map((c, i) => (
              <rect key={i} x={6 + i * 8} y={2} width={4.5} height={4.5} rx={1} fill={c} />
            ))}
            <rect width={6} height={H} y={8} fill="#f4f4f5" />
          </g>
        </g>
      </motion.g>
    </svg>
  );
};

export const RendersBanner: React.FC<BannerProps> = ({ onClick, className }) => (
  <Canvas width={477} height={523} label="15 days to stunning designs & renders" onClick={onClick} className={className}>
    {(shown) => (
      <>
        {/* Title card */}
        <motion.div
          className="absolute text-left rounded-[22px] border border-white/10 bg-gradient-to-br from-[#33373b] via-[#1d1f22] to-[#121314] shadow-[0_14px_30px_rgba(0,0,0,0.3)]"
          style={{ left: 28, top: 54, width: 230, height: 190, rotate: -3 }}
          initial={{ opacity: 0, x: -40 }}
          animate={shown ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center gap-[7px] px-[20px] pt-[20px] font-['Poppins'] text-[21px] font-medium text-white">
            <CalendarDays size={23} strokeWidth={2} />
            <span>15-Days to</span>
          </div>
          <div className="mx-[16px] mt-[10px] h-px bg-white/25" />
          <div className="px-[18px] pt-[6px] font-['Poppins'] text-[31px] font-semibold leading-[1.1] text-white">
            {['Stunning', 'Designs &', 'Renders'].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={shown ? { y: '0%' } : undefined}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Exterior and interior photos */}
        {[
          { src: '/renders/RENDER-16.jpg', left: 236, top: 10, w: 220, h: 140, rot: -2.5, d: 0.2 },
          { src: ROOM, left: 244, top: 140, w: 228, h: 172, rot: 3, d: 0.35 },
        ].map((p) => (
          <motion.div
            key={p.src}
            className="absolute overflow-hidden rounded-[18px] border-[3px] border-white bg-white shadow-[0_12px_28px_rgba(0,0,0,0.25)]"
            style={{ left: p.left, top: p.top, width: p.w, height: p.h }}
            initial={{ opacity: 0, y: -30, rotate: p.rot - 8 }}
            animate={shown ? { opacity: 1, y: 0, rotate: p.rot } : undefined}
            transition={{ duration: 0.8, delay: p.d, ease: EASE }}
          >
            <img src={p.src} alt="" className="h-full w-full object-cover" draggable={false} />
          </motion.div>
        ))}

        <Laptop shown={shown} />

        {/* Software tiles */}
        <div className="absolute grid grid-cols-5 gap-x-[4px] gap-y-[8px]" style={{ left: 18, top: 365, width: 442 }}>
          {TOOLS.map(([id, name], i) => (
            <motion.div
              key={id}
              className="flex h-[66px] flex-col items-center rounded-[13px] border border-white/[0.07] bg-gradient-to-b from-[#2e3134] to-[#17191a] shadow-[0_6px_14px_rgba(0,0,0,0.28)]"
              initial={{ opacity: 0, scale: 0.6, y: 14 }}
              animate={shown ? { opacity: 1, scale: 1, y: 0 } : undefined}
              transition={{ type: 'spring', stiffness: 420, damping: 22, delay: 0.9 + i * 0.05 }}
            >
              <img
                src={`/promo/logos/${id}.png`}
                alt=""
                draggable={false}
                className="mt-[4px] h-[38px] w-[40px] [mask-image:radial-gradient(closest-side,#000_72%,transparent)]"
              />
              <span className="mt-[1px] font-['Poppins'] text-[11.5px] font-medium text-white">{name}</span>
            </motion.div>
          ))}
        </div>
      </>
    )}
  </Canvas>
);
