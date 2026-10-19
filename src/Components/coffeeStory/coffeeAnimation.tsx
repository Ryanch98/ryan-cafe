import { useCallback, useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';

interface CoffeeAnimationProps {
  reverse: boolean;
  progress?: number;
  machineImage: string;
}

type PourGeometry = {
  width: number;
  height: number;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  path: string;
  length: number;
};

export default function CoffeeAnimation({
  reverse,
  progress = 0,
  machineImage,
}: CoffeeAnimationProps) {
  const id = useId().replace(/:/g, '');
  const sceneRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const streamPathRef = useRef<SVGPathElement>(null);
  const streamHighlightRef = useRef<SVGPathElement>(null);
  const streamRevealRef = useRef<SVGRectElement>(null);
  const streamGroupRef = useRef<SVGGElement>(null);
  const coffeeRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<SVGSVGElement>(null);
  const latestProgressRef = useRef(progress);
  const updateRef = useRef<() => void>(() => undefined);

  latestProgressRef.current = progress;

  const measureAndRender = useCallback(() => {
    const scene = sceneRef.current;
    const press = pressRef.current;
    const image = imageRef.current;
    const cup = cupRef.current;
    const path = streamPathRef.current;
    const highlight = streamHighlightRef.current;
    const reveal = streamRevealRef.current;
    const group = streamGroupRef.current;
    const coffee = coffeeRef.current;
    const steam = steamRef.current;

    if (!scene || !press || !image || !cup || !path || !highlight || !reveal || !group || !coffee) return;
    if (!image.complete || image.naturalWidth === 0) return;

    const sceneBox = scene.getBoundingClientRect();
    const imageBox = image.getBoundingClientRect();
    const pressBox = press.getBoundingClientRect();
    const cupBox = cup.getBoundingClientRect();
    if (!sceneBox.width || !sceneBox.height || !imageBox.width || !cupBox.width) return;

    // The outlet anchor is expressed in the image's own coordinate system, then
    // rotated around the actual wrapper transform-origin. This avoids positioning
    // the stream with viewport-specific pixel offsets.
    const p = gsap.utils.clamp(0, 1, latestProgressRef.current);
    const angle = (reverse ? 40 : -40) * p * Math.PI / 180;
    const originX = reverse ? pressBox.width * 0.96 : pressBox.width * 0.04;
    const originY = pressBox.height * 0.4;
    const localX = imageBox.width * (reverse ? 0.88 : 0.12);
    const localY = imageBox.height * 0.56;
    const dx = localX - originX;
    const dy = localY - originY;
    const rotatedX = originX + dx * Math.cos(angle) - dy * Math.sin(angle);
    const rotatedY = originY + dx * Math.sin(angle) + dy * Math.cos(angle);
    const sourceX = pressBox.left - sceneBox.left + (reverse ? pressBox.width - rotatedX : rotatedX);
    const sourceY = pressBox.top - sceneBox.top + rotatedY;

    // Target the centre of the visible cup opening, not the cup container edge.
    const targetX = cupBox.left - sceneBox.left + cupBox.width * 0.5;
    const targetY = cupBox.top - sceneBox.top + Math.min(cupBox.width * 0.28, 56);

    const vx = targetX - sourceX;
    const vy = targetY - sourceY;
    const distance = Math.max(1, Math.hypot(vx, vy));
    const bend = Math.max(-18, Math.min(18, vx * 0.075));
    const c1x = sourceX + vx * 0.3 + bend;
    const c1y = sourceY + vy * 0.32;
    const c2x = sourceX + vx * 0.72 - bend * 0.45;
    const c2y = sourceY + vy * 0.76;
    const nx = -vy / distance;
    const ny = vx / distance;
    const width = Math.max(3.2, Math.min(7.2, sceneBox.width * 0.012));

    // A tapered, gently curved liquid silhouette, with a narrow highlight.
    const d = [
      `M ${sourceX} ${sourceY}`,
      `C ${c1x + nx * width * 0.45} ${c1y + ny * width * 0.45}, ${c2x + nx * width * 0.55} ${c2y + ny * width * 0.55}, ${targetX + nx * width * 0.9} ${targetY + ny * width * 0.9}`,
      `Q ${targetX} ${targetY + 1} ${targetX - nx * width * 0.9} ${targetY - ny * width * 0.9}`,
      `C ${c2x - nx * width * 0.55} ${c2y - ny * width * 0.55}, ${c1x - nx * width * 0.45} ${c1y - ny * width * 0.45}, ${sourceX} ${sourceY} Z`,
    ].join(' ');

    const dHighlight = `M ${sourceX} ${sourceY + 1} C ${c1x - width * 0.12} ${c1y}, ${c2x - width * 0.12} ${c2y}, ${targetX - width * 0.12} ${targetY - 1}`;
    path.setAttribute('d', d);
    highlight.setAttribute('d', dHighlight);

    const pour = gsap.utils.clamp(0, 1, (p - 0.1) / 0.72);
    const fadeIn = gsap.utils.clamp(0, 1, (p - 0.08) / 0.09);
    const fadeOut = gsap.utils.clamp(0, 1, (0.94 - p) / 0.08);
    const opacity = Math.min(fadeIn, fadeOut);
    const coffeeLevel = gsap.utils.clamp(0, 1, (p - 0.34) / 0.58);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Clip the same continuous path from the spout downward; scroll reversal
    // simply moves the reveal boundary back up the curve.
    gsap.set(reveal, { attr: { x: 0, y: 0, width: sceneBox.width, height: distance * pour + 2 } });
    gsap.set(group, { autoAlpha: opacity });
    gsap.set(coffee, {
      scaleY: Math.max(0.03, coffeeLevel),
      autoAlpha: coffeeLevel > 0 ? 1 : 0,
      transformOrigin: '50% 100%',
    });
    gsap.set(cup, { y: p > 0.96 ? -3 : 0 });
    if (steam) gsap.set(steam, { autoAlpha: p > 0.9 ? 0.55 : 0 });

    // Tiny fluid drift only; no repeated stretching or bouncing of the stream.
    if (!reduceMotion) {
      const drift = Math.sin(p * Math.PI * 8) * 0.45;
      group.setAttribute('transform', `translate(${drift} 0)`);
    } else {
      group.removeAttribute('transform');
    }
  }, [reverse]);

  useEffect(() => {
    const scene = sceneRef.current;
    const press = pressRef.current;
    const image = imageRef.current;
    const cup = cupRef.current;
    if (!scene || !press || !image || !cup) return;

    const ctx = gsap.context(() => {
      gsap.set(press, {
        rotation: 0,
        transformOrigin: reverse ? '96% 40%' : '4% 40%',
      });
      gsap.set(streamGroupRef.current, { autoAlpha: 0 });
      gsap.set(coffeeRef.current, { scaleY: 0.03, autoAlpha: 0, transformOrigin: '50% 100%' });
      gsap.set(steamRef.current, { autoAlpha: 0 });

      updateRef.current = () => {
        const p = gsap.utils.clamp(0, 1, latestProgressRef.current);
        gsap.set(press, { rotation: (reverse ? 40 : -40) * p });
        measureAndRender();
      };

      const observer = new ResizeObserver(() => updateRef.current());
      observer.observe(scene);
      observer.observe(image);
      observer.observe(cup);
      image.addEventListener('load', updateRef.current);
      window.addEventListener('resize', updateRef.current);
      updateRef.current();

      return () => {
        observer.disconnect();
        image.removeEventListener('load', updateRef.current);
        window.removeEventListener('resize', updateRef.current);
      };
    }, scene);

    return () => {
      updateRef.current = () => undefined;
      ctx.revert();
    };
  }, [machineImage, measureAndRender, reverse]);

  useEffect(() => {
    updateRef.current();
  }, [progress]);

  return (
    <div
      ref={sceneRef}
      className="relative isolate flex h-[280px] w-full items-center justify-center overflow-visible sm:h-[350px] lg:h-[500px]"
      aria-label="Coffee pouring into a cup"
    >
      <div
        ref={pressRef}
        className={`absolute top-2 z-30 w-[130px] sm:top-[40px] sm:w-[200px] ${reverse ? 'right-[calc(50%-55px)] sm:right-[calc(50%-100px)]' : 'left-[calc(50%-55px)] sm:left-[calc(50%-100px)]'}`}
      >
        <img
          ref={imageRef}
          src={machineImage}
          alt={reverse ? 'Coffee brewer' : 'French press'}
          className={`h-[130px] w-[130px] object-contain sm:h-[200px] sm:w-[200px] ${reverse ? '-scale-x-100' : ''}`}
          draggable={false}
        />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`coffee-body-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#281006" />
            <stop offset="26%" stopColor="#542510" />
            <stop offset="52%" stopColor="#a65b2c" />
            <stop offset="68%" stopColor="#bd7941" />
            <stop offset="100%" stopColor="#351508" />
          </linearGradient>
          <linearGradient id={`coffee-glint-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f4d0a0" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#f4d0a0" stopOpacity="0.12" />
          </linearGradient>
          <clipPath id={`coffee-reveal-${id}`}>
            <rect ref={streamRevealRef} x="0" y="0" width="0" height="0" />
          </clipPath>
        </defs>
        <g ref={streamGroupRef} clipPath={`url(#coffee-reveal-${id})`}>
          <path ref={streamPathRef} d="" fill={`url(#coffee-body-${id})`} />
          <path ref={streamHighlightRef} d="" fill="none" stroke={`url(#coffee-glint-${id})`} strokeWidth="1.1" strokeLinecap="round" />
        </g>
      </svg>

      <div
        ref={cupRef}
        className="absolute left-[calc(50%-50px)] top-[185px] z-10 sm:left-[calc(50%-100px)] sm:top-[245px]"
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
