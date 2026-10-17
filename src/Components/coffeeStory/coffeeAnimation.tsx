import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';

export default function CoffeeAnimation({ reverse, progress = 0, machineImage }) {
  const pressOpacity = progress <= 0 || progress >= 0.95 ? 0 : 1;
  const surfaceOpacity = progress > 0.95 ? (progress - 0.95) / 0.05 : 0;
  const rotate = progress * -40;

  const t = useRef(0);
  const [, setTick] = useState(0);
  useAnimationFrame((time) => {
    t.current = time / 1000;
    setTick((v) => v + 1);
  });

  function getStreamScale(rotate) {
    const angle = Math.abs(rotate);

    if (angle < 30) {
      return 0;
    }

    return Math.min((angle - 30) / 10, 1);
  }

  function wave(t, speed = 1, amp = 1, offset = 0) {
    return Math.sin(t * speed + offset) * amp;
  }
  const baseX = 24;

  const p = (y, ox, oy) => {
    const time = t.current;

    const nx = wave(time, 2.2, ox, y * 0.1);
    const ny = wave(time, 1.8, oy, y * 0.05);

    return `${baseX + nx} ${y + ny}`;
  };

  const path = `
    M ${p(0, 2, 0)}
    C ${p(0, 6, 2)} ${p(100, 8, 4)} ${p(150, 6, 2)}
    C ${p(200, 5, 3)} ${p(230, 3, 2)} ${p(260, 2, 1)}
    L 34 260
    C ${p(20, 3, 2)} ${p(20, 4, 3)} ${p(50, 5, 2)}
    C ${p(100, 6, 3)} ${p(50, 5, 2)} ${p(0, 2, 0)}
    Z
  `;

  return (
    <div
      className={`relative flex h-[280px] w-full items-center justify-center sm:h-[350px] lg:h-[500px] ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} `}
    >
      {/* Coffee Machine */}
      <motion.div
        style={{
          opacity: pressOpacity,
          rotate: rotate,
          transformOrigin: '4% 40%',
          scaleX: 1,
        }}
        className={`absolute left-[calc(50%-55px)] top-2 z-20 w-[130px] sm:left-[calc(50%-100px)] sm:top-[40px] sm:w-[200px] ${reverse ? 'scale-x-[-1]' : ''}`}
      >
        <img
          src={machineImage}
          alt="Coffee Maker"
          className="h-[130px] w-[130px] -rotate-12 object-contain sm:h-[200px] sm:w-[200px]"
        />
      </motion.div>

      <motion.div
        className="absolute left-[calc(50%-26px)] top-[90px] z-10 sm:left-[calc(50%-25px)] sm:top-[145px]"
        style={{
          opacity: pressOpacity,
          transformOrigin: 'top center',
          scaleY: getStreamScale(rotate),
        }}
      >
        <svg className="h-[80px] w-[40px] sm:h-[120px] sm:w-[50px]" viewBox="0 0 50 260" preserveAspectRatio="none">
          <defs>
            {/* Coffee Body */}
            <linearGradient id="coffeeBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1d0e07" />
              <stop offset="18%" stopColor="#4d250f" />
              <stop offset="50%" stopColor="#c67b43" />
              <stop offset="75%" stopColor="#6e3417" />
              <stop offset="100%" stopColor="#1d0e07" />
            </linearGradient>

            {/* Reflection */}
            <linearGradient id="reflection" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255,255,255,.55)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <filter id="coffeeShadow">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Main Flow */}
          <>
            {/* Body (main thick stream) */}
            <motion.path d={path} fill="url(#coffeeBody)" opacity="0.95" />

            {/* Thickness shadow (خیلی مهم) */}
            <motion.path d={path} fill="#2a140a" opacity="0.35" transform="translate(1.8,0)" />

            {/* Inner depth layer */}
            <motion.path d={path} fill="#5a2c12" opacity="0.2" transform="translate(-0.8,0)" />
          </>

          {/* Gloss */}
          <motion.path
            d="M22 10 C21 80 24 160 22 250"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.45"
            filter="url(#coffeeShadow)"
            animate={{
              x: [0, 1.5, -1, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          />

          {/* Edge Highlight */}
          <motion.path
            d="M28 0 C30 80 30 180 28 260"
            stroke="#e0a06b"
            strokeWidth="1"
            opacity="0.35"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
          />
        </svg>

        {/* Falling Droplets */}
      </motion.div>

      {/* Coffee Stream */}

      {/* Cup */}
      <div className={`absolute sm:bottom-12 sm:top-48`}>
        <div
          className={`relative w-[100px] transition-all duration-700 ease-out sm:w-[200px] ${
            progress > 0 && progress < 0.99
              ? reverse
                ? 'scale-150 sm:translate-y-0 sm:scale-100'
                : 'scale-150 sm:-translate-x-5 sm:translate-y-0 sm:scale-100'
              : 'scale-150 sm:translate-y-[-70px]'
          }`}
        >
          <img src="/pic/cup.png" alt="Cup" className="w-[200px]" />

          <motion.div
            className="absolute left-[24px] top-[24px] h-[12px] w-[50px] bg-[#4c2f1d] sm:left-[54px] sm:top-[48px] sm:h-[20px] sm:w-[90px]"
            style={{
              opacity: surfaceOpacity,
              clipPath: 'ellipse(50% 45% at 50% 50%)',
            }}
          />
        </div>
        {progress > 0.98 && (
          <motion.svg
            className="absolute -top-20 sm:-top-[130px] sm:left-[50px]"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[0, 1, 2].map((i) => {
              const x = 40 + i * 15;

              return (
                <motion.path
                  key={i}
                  d={`M ${x} 100 C ${x - 10} 80, ${x + 10} 60, ${x} 30`}
                  stroke="rgba(120, 90, 70, 0.45)"
                  strokeWidth="2"
                  fill="transparent"
                  strokeLinecap="round"
                  animate={{
                    y: [0, -20, -40],
                    opacity: [0, 0.6, 0],
                    pathLength: [0, 1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </motion.svg>
        )}
      </div>
    </div>
  );
}
