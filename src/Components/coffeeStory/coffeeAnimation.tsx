import { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';

interface CoffeeAnimationProps {
  reverse: boolean;
  progress?: number;
  machineImage: string;
}

export default function CoffeeAnimation({
  reverse,
  progress = 0,
  machineImage,
}: CoffeeAnimationProps) {
  const gradientId = `coffee-stream-${useId().replace(/:/g, '')}`;
  const sceneRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<SVGSVGElement>(null);
  const streamShapeRef = useRef<SVGPathElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const coffeeRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<SVGSVGElement>(null);
  const updateProgressRef = useRef<(value: number) => void>(() => undefined);
  const latestProgressRef = useRef(progress);
  latestProgressRef.current = progress;

  useEffect(() => {
    const scene = sceneRef.current;
    const press = pressRef.current;
    const stream = streamRef.current;
    const streamShape = streamShapeRef.current;
    const cup = cupRef.current;
    const coffee = coffeeRef.current;
    const steam = steamRef.current;

    if (!scene || !press || !stream || !streamShape || !cup || !coffee) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer: ResizeObserver | undefined;

    const ctx = gsap.context(() => {
      gsap.set(stream, { transformOrigin: '50% 0%', scaleY: 0, autoAlpha: 0 });
      gsap.set(streamShape, { x: 0 });
      gsap.set(cup, { y: 0, scale: 1 });
      gsap.set(coffee, { scaleY: 0.05, autoAlpha: 0, transformOrigin: '50% 100%' });
      if (steam) gsap.set(steam, { autoAlpha: 0 });

      updateProgressRef.current = (rawProgress: number) => {
        const p = gsap.utils.clamp(0, 1, rawProgress);
        const tilt = reverse ? 40 * p : -40 * p;
        const pour = gsap.utils.clamp(0, 1, (p - 0.12) / 0.68);
        const streamOpacity = p > 0.12 && p < 0.86 ? 1 : 0;
        const coffeeLevel = gsap.utils.clamp(0, 1, (p - 0.35) / 0.58);
        const set = reduceMotion ? gsap.set : gsap.to;
        const duration = reduceMotion ? 0 : 0.08;

        // Stream is nested in the brewer wrapper: its anchor follows the same
        // responsive position and rotation rather than relying on viewport offsets.
        set(press, {
          rotation: tilt,
          transformOrigin: reverse ? '96% 40%' : '4% 40%',
          duration, ease: 'none', overwrite: true,
        });
        set(stream, {
          scaleY: pour,
          autoAlpha: streamOpacity,
          rotation: -tilt,
          duration, ease: 'none', overwrite: true,
        });
        set(streamShape, {
          x: reduceMotion ? 0 : Math.sin(p * Math.PI * 10) * 0.65,
          duration, ease: 'none', overwrite: true,
        });
        set(cup, {
          y: p > 0.94 ? -8 : 0,
          scale: p > 0 && p < 0.99 ? 1 : 0.985,
          duration, ease: 'none', overwrite: true,
        });
        set(coffee, {
          scaleY: Math.max(0.05, coffeeLevel),
          autoAlpha: coffeeLevel > 0 ? 1 : 0,
          duration, ease: 'none', overwrite: true,
        });
        if (steam) set(steam, { autoAlpha: p > 0.88 ? 0.75 : 0, duration, ease: 'none', overwrite: true });
      };
    }, scene);

    observer = new ResizeObserver(() => updateProgressRef.current(latestProgressRef.current));
    observer.observe(scene);
    updateProgressRef.current(progress);

    return () => {
      observer?.disconnect();
      updateProgressRef.current = () => undefined;
      ctx.revert();
    };
  }, [reverse, machineImage]);

  useEffect(() => {
    latestProgressRef.current = progress;
    updateProgressRef.current(progress);
  }, [progress]);

  return (
    <div
      ref={sceneRef}
      className="relative flex h-[280px] w-full items-center justify-center overflow-visible sm:h-[350px] lg:h-[500px]"
      aria-label="Coffee pouring into a cup"
    >
      <div
        ref={pressRef}
        className={`absolute top-2 z-20 w-[130px] sm:top-[40px] sm:w-[200px] ${reverse ? 'right-[calc(50%-55px)] sm:right-[calc(50%-100px)]' : 'left-[calc(50%-55px)] sm:left-[calc(50%-100px)]'}`}
      >
        <img
          src={machineImage}
          alt={reverse ? 'Coffee brewer' : 'French press'}
          className={`h-[130px] w-[130px] object-contain sm:h-[200px] sm:w-[200px] ${reverse ? '-scale-x-100' : ''}`}
          draggable={false}
        />
        <svg
          ref={streamRef}
          className={`absolute top-[56%] z-10 h-[128px] w-[30px] sm:h-[145px] sm:w-[38px] ${reverse ? 'right-[12%]' : 'left-[12%]'}`}
          viewBox="0 0 38 260"
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
          <path
            ref={streamShapeRef}
            d="M14 0 C10 38 22 65 15 98 C10 132 22 159 15 194 C12 218 18 242 16 260 L23 260 C27 226 20 207 25 180 C32 143 20 119 25 88 C31 53 18 28 23 0 Z"
            fill={`url(#${gradientId})`}
          />
          <path d="M18 8 C16 72 21 145 18 250" stroke="#f2c18b" strokeWidth="2" strokeLinecap="round" opacity="0.48" />
        </svg>
      </div>

      <div
        ref={cupRef}
        className="absolute left-[calc(50%-50px)] top-[185px] sm:left-[calc(50%-100px)] sm:top-[245px]"
      >
        <div className="relative w-[100px] sm:w-[200px]">
          <img src="/pic/cup.png" alt="Coffee cup" className="relative z-10 w-full object-contain" draggable={false} />
          <div
            ref={coffeeRef}
            className="absolute left-[24px] top-[24px] z-20 h-[12px] w-[50px] overflow-hidden rounded-[50%] sm:left-[54px] sm:top-[48px] sm:h-[20px] sm:w-[90px]"
            style={{ clipPath: 'ellipse(50% 45% at 50% 50%)' }}
          >
            <div className="absolute inset-0 rounded-[50%] bg-gradient-to-br from-[#c78b50] via-[#6b3518] to-[#2b1209]" />
            <div className="absolute left-[18%] top-[18%] h-[2px] w-[35%] rounded-full bg-amber-100/50" />
          </div>
        </div>
        <svg
          ref={steamRef}
          className="pointer-events-none absolute -top-20 left-0 sm:-top-[130px] sm:left-[50px]"
          width="120" height="120" viewBox="0 0 120 120" aria-hidden="true"
        >
          {[0, 1, 2].map((index) => {
            const x = 40 + index * 15;
            return <path key={index} d={`M ${x} 100 C ${x - 10} 80, ${x + 10} 60, ${x} 30`} stroke="rgba(220, 205, 190, 0.58)" strokeWidth="2" fill="none" strokeLinecap="round" />;
          })}
        </svg>
      </div>
    </div>
  );
}
