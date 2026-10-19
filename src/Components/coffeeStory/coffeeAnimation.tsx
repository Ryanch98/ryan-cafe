import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react';

interface CoffeeAnimationProps {
  reverse: boolean;
  progress?: number;
  machineImage: string;
}

interface StreamGeometry {
  width: number;
  height: number;
  path: string;
}

export default function CoffeeAnimation({
  reverse,
  progress = 0,
  machineImage,
}: CoffeeAnimationProps) {
  const gradientId = `espresso-stream-${useId().replace(/:/g, '')}`;
  const sceneRef = useRef<HTMLDivElement>(null);
  const spoutRef = useRef<HTMLSpanElement>(null);
  const cupOpeningRef = useRef<HTMLSpanElement>(null);
  const [geometry, setGeometry] = useState<StreamGeometry>({ width: 1, height: 1, path: '' });
  const reduceMotion = useReducedMotion();
  const amount = Math.min(1, Math.max(0, progress));
  const pourProgress = reduceMotion ? (amount > 0.12 && amount < 0.86 ? 1 : 0) : Math.min(1, Math.max(0, (amount - 0.12) / 0.68));
  const streamOpacity = Math.min(1, Math.max(0, (amount - 0.1) / 0.04)) * Math.min(1, Math.max(0, (0.9 - amount) / 0.04));
  const coffeeLevel = Math.min(1, Math.max(0, (amount - 0.35) / 0.58));

  const measureStream = useCallback(() => {
    const scene = sceneRef.current;
    const spout = spoutRef.current;
    const cupOpening = cupOpeningRef.current;
    if (!scene || !spout || !cupOpening) return;

    const sceneRect = scene.getBoundingClientRect();
    const startRect = spout.getBoundingClientRect();
    const endRect = cupOpening.getBoundingClientRect();
    if (!sceneRect.width || !sceneRect.height || !startRect.width && !startRect.height || !endRect.width && !endRect.height) return;

    const x1 = startRect.left + startRect.width / 2 - sceneRect.left;
    const y1 = startRect.top + startRect.height / 2 - sceneRect.top;
    const x2 = endRect.left + endRect.width / 2 - sceneRect.left;
    const y2 = endRect.top + endRect.height / 2 - sceneRect.top;
    const distance = Math.max(1, y2 - y1);
    const bend = Math.min(22, Math.abs(x2 - x1) * 0.16 + distance * 0.035) * (reverse ? -1 : 1);
    const path = `M ${x1} ${y1} C ${x1 + bend} ${y1 + distance * 0.34}, ${x2 - bend} ${y1 + distance * 0.72}, ${x2} ${y2}`;
    setGeometry({ width: sceneRect.width, height: sceneRect.height, path });
  }, [reverse, amount, machineImage]);

  useLayoutEffect(() => {
    measureStream();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measureStream);
    if (sceneRef.current) observer?.observe(sceneRef.current);
    if (spoutRef.current) observer?.observe(spoutRef.current);
    if (cupOpeningRef.current) observer?.observe(cupOpeningRef.current);
    window.addEventListener('resize', measureStream);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measureStream);
    };
  }, [measureStream]);

  return (
    <div
      ref={sceneRef}
      className="relative flex h-[280px] w-full items-center justify-center overflow-visible sm:h-[350px] lg:h-[500px]"
      aria-label="Coffee pouring into a cup"
    >
      {/* Both endpoints are DOM anchors. Measuring their transformed rectangles keeps the stream
          attached to the spout and cup even when the press rotates, mirrors, or resizes. */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 overflow-visible"
        width="100%"
        height="100%"
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#281006" />
            <stop offset="28%" stopColor="#6b3518" />
            <stop offset="52%" stopColor="#bd7941" />
            <stop offset="74%" stopColor="#713719" />
            <stop offset="100%" stopColor="#2a1007" />
          </linearGradient>
        </defs>
        {geometry.path && (
          <>
            <motion.path
              d={geometry.path}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="6"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - pourProgress}
              opacity={streamOpacity}
            />
            <motion.path
              d={geometry.path}
              fill="none"
              stroke="#f2c18b"
              strokeWidth="1.2"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - pourProgress}
              opacity={streamOpacity * 0.48}
            />
          </>
        )}
      </svg>

      <motion.div
        className={`absolute left-[calc(50%-55px)] top-2 z-20 w-[130px] sm:left-[calc(50%-100px)] sm:top-[40px] sm:w-[200px] ${reverse ? 'scale-x-[-1]' : ''}`}
        style={{
          rotate: -40 * amount,
          transformOrigin: '4% 40%',
          opacity: amount > 0.02 && amount < 0.96 ? 1 : 0.18,
        }}
      >
        <div className="relative h-[130px] w-[130px] -rotate-12 sm:h-[200px] sm:w-[200px]">
          <img
            src={machineImage}
            alt="French press"
            className="h-full w-full object-contain"
            draggable={false}
            onLoad={measureStream}
          />
          <span
            ref={spoutRef}
            className="absolute left-[12%] top-[56%] h-0.5 w-0.5"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[calc(50%-50px)] top-[185px] z-20 sm:left-[calc(50%-100px)] sm:top-[245px]"
        animate={{
          y: amount > 0.94 ? -26 : 0,
          scale: amount > 0 && amount < 0.99 ? 1 : 0.98,
        }}
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="relative w-[100px] sm:w-[200px]">
          <img
            src="/pic/cup.png"
            alt="Coffee cup"
            className="relative z-10 w-full object-contain"
            draggable={false}
            onLoad={measureStream}
          />
          <span
            ref={cupOpeningRef}
            className="absolute left-1/2 top-[30%] z-30 h-0.5 w-0.5 -translate-x-1/2"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[24px] top-[24px] z-20 h-[12px] w-[50px] overflow-hidden rounded-[50%] bg-[#4b2412] sm:left-[54px] sm:top-[48px] sm:h-[20px] sm:w-[90px]"
            style={{
              opacity: coffeeLevel > 0 ? 1 : 0,
              scaleY: Math.max(0.05, coffeeLevel),
              transformOrigin: 'bottom center',
              clipPath: 'ellipse(50% 45% at 50% 50%)',
            }}
          >
            <div className="absolute inset-0 rounded-[50%] bg-gradient-to-br from-[#c78b50] via-[#6b3518] to-[#2b1209]" />
            {!reduceMotion && (
              <motion.div
                className="absolute left-[18%] top-[18%] h-[2px] w-[35%] rounded-full bg-amber-100/50"
                animate={{ x: [0, 5, 0], opacity: [0.25, 0.65, 0.25] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
        </div>
        {!reduceMotion && amount > 0.88 && (
          <motion.svg
            className="pointer-events-none absolute -top-20 left-0 sm:-top-[130px] sm:left-[50px]"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-hidden="true"
          >
            {[0, 1, 2].map((index) => {
              const x = 40 + index * 15;
              return (
                <motion.path
                  key={index}
                  d={`M ${x} 100 C ${x - 10} 80, ${x + 10} 60, ${x} 30`}
                  stroke="rgba(220, 205, 190, 0.58)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ y: [0, -16, -32], opacity: [0, 0.65, 0] }}
                  transition={{ duration: 2.1, repeat: Infinity, delay: index * 0.35, ease: 'easeOut' }}
                />
              );
            })}
          </motion.svg>
        )}
      </motion.div>
    </div>
  );
}
