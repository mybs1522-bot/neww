import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight, ChevronsLeftRight } from 'lucide-react';

/*
 * "SketchUp model → final render" showcase.
 * Images live in /public/before-after as {id}-sketch.webp and {id}-render.webp (same size, same camera).
 */

export const SKETCH_PAIRS = [
  { id: 'kitchen-3', title: 'Island Kitchen', tool: 'SketchUp + Enscape' },
  { id: 'living', title: 'Living Room', tool: 'SketchUp + V-Ray' },
  { id: 'villa', title: 'Modern Villa', tool: 'SketchUp + Lumion' },
  { id: 'bedroom', title: 'Master Bedroom', tool: 'SketchUp + D5' },
  { id: 'bathroom', title: 'Luxury Bathroom', tool: 'SketchUp + V-Ray' },
  { id: 'dining', title: 'Dining Room', tool: 'SketchUp + D5' },
  { id: 'mandir-foyer', title: 'Mandir Foyer', tool: 'SketchUp + V-Ray' },
  { id: 'office', title: 'Home Office', tool: 'SketchUp + Enscape' },
  { id: 'kitchen-1', title: 'Kitchen Corner', tool: 'SketchUp + D5' },
  { id: 'cafe', title: 'Café Interior', tool: 'SketchUp + Lumion' },
  { id: 'kids-room', title: 'Kids Room', tool: 'SketchUp + D5' },
  { id: 'kitchen-2', title: 'Classic Kitchen', tool: 'SketchUp + D5' },
  { id: 'balcony', title: 'City Balcony', tool: 'SketchUp + Lumion' },
];

const src = (id: string, kind: 'sketch' | 'render') => `/before-after/${id}-${kind}.webp`;

/* Drag-to-compare slider. Each pair wipes sketch -> render on its own, then calls onDone so the showcase moves to the next pair.
 * Dragging pauses it; it resumes 3 s after the visitor lets go. */
const CompareSlider: React.FC<{ id: string; title: string; tool: string; onDone: () => void }> = ({ id, title, tool, onDone }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const pos = useMotionValue(100);
  const clip = useTransform(pos, (p) => `inset(0 0 0 ${p}%)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const [touched, setTouched] = useState(false);
  const [pct, setPct] = useState(100);
  const resumeTimer = useRef<number>();
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useMotionValueEvent(pos, 'change', (p) => setPct(Math.round(p)));

  useEffect(() => {
    if (!inView || touched) return;
    let cancelled = false;
    let controls: ReturnType<typeof animate> | undefined;
    const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
    (async () => {
      if (pos.get() > 95) await wait(350); // show the SketchUp model first
      if (cancelled) return;
      controls = animate(pos, 0, { duration: 1.1 * (pos.get() / 100) + 0.2, ease: [0.65, 0, 0.35, 1] });
      await controls;
      if (cancelled) return;
      await wait(800); // hold on the render
      if (!cancelled) doneRef.current();
    })();
    return () => { cancelled = true; controls?.stop(); };
  }, [inView, touched, id, pos]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);
  const releaseLater = () => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setTouched(false), 3000);
  };

  const moveTo = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
      onPointerDown={(e) => {
        setTouched(true);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        window.clearTimeout(resumeTimer.current);
        moveTo(e.clientX);
      }}
      onPointerUp={releaseLater}
      onPointerCancel={releaseLater}
      onPointerMove={(e) => e.buttons && moveTo(e.clientX)}
      role="slider"
      aria-label={`${title}: SketchUp model compared with final render`}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          setTouched(true);
          releaseLater();
          pos.set(Math.min(100, Math.max(0, pos.get() + (e.key === 'ArrowLeft' ? -5 : 5))));
        }
      }}
    >
      <img src={src(id, 'sketch')} alt={`${title} SketchUp model`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <motion.img
        src={src(id, 'render')}
        alt={`${title} final render`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: clip }}
        draggable={false}
      />

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-zinc-900 shadow">
        SketchUp model
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-zinc-950/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-amber-300 shadow">
        Final render
      </span>
      <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-zinc-950/80 px-2 py-1 font-mono text-[10px] text-zinc-200">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        {title} · {tool}
      </span>

      <motion.div className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]" style={{ left }}>
        <div className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-zinc-950/70 text-white backdrop-blur">
          <ChevronsLeftRight className="size-5" />
        </div>
      </motion.div>
    </div>
  );
};

export const SketchToRenderShowcase: React.FC = () => {
  const [active, setActive] = useState(0);
  const pair = SKETCH_PAIRS[active];
  const strip = useRef<HTMLDivElement>(null);
  const next = () => setActive((i) => (i + 1) % SKETCH_PAIRS.length);

  // keep the active thumbnail in view inside the strip (scrolls the strip only, never the page)
  useEffect(() => {
    const el = strip.current, card = el?.children[active] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <div className="w-full">
      <div className="mb-4 px-3 text-center sm:px-4">
        <span className="mb-2 inline-block rounded-full border border-zinc-700 bg-zinc-800 px-3 py-0.5 font-mono text-[10px] font-medium text-zinc-300 sm:text-xs">
          Student Work · SketchUp → Render
        </span>
        <h2 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
          What our students model. <span className="text-amber-400">What they get.</span>
        </h2>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-zinc-400">
          Every student project starts as a SketchUp model and ends as a photoreal render. Drag to compare.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-3 sm:px-4">
        <CompareSlider key={pair.id} {...pair} onDone={next} />
      </div>

      {/* All pairs, side by side */}
      <div ref={strip} className="relative mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
        {SKETCH_PAIRS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            className={`group w-[82%] shrink-0 snap-center cursor-pointer rounded-xl border bg-zinc-900 p-1.5 text-left transition-colors sm:w-[360px] ${
              i === active ? 'border-amber-400' : 'border-zinc-800 hover:border-zinc-600'
            }`}
          >
            <div className="relative grid grid-cols-2 gap-1.5">
              <img src={src(p.id, 'sketch')} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" draggable={false} />
              <img src={src(p.id, 'render')} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" draggable={false} />
              <span className="absolute left-1/2 top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-zinc-900 bg-amber-400 text-zinc-950 shadow-lg transition-transform group-hover:scale-110">
                <ArrowRight className="size-3.5 stroke-[3]" />
              </span>
            </div>
            <div className="flex items-center justify-between px-1 pb-0.5 pt-1.5 font-mono text-[10px]">
              <span className="font-semibold text-zinc-100">{p.title}</span>
              <span className="text-zinc-500">{p.tool}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
