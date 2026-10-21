import { motion } from 'framer-motion';
import { useId } from 'react';

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
  const gradientId = `espresso-stream-${useId().replace(/:/g, '')}`;
  const amount = Math.min(1, Math.max(0, progress));
  // Leave a short intro and outro so the pour feels intentional.
  const pourProgress = Math.min(1, Math.max(0, (amount - 0.12) / 0.68));
  const streamOpacity = amount > 0.12 && amount < 0.86 ? 1 : 0;
  const coffeeLevel = Math.min(1, Math.max(0, (amount - 0.35) / 0.58));

  return (
    <div
      className={`relative flex h-[280px] w-full items-center justify-center sm:h-[350px] lg:h-[500px] ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
      aria-label="Coffee pouring into a cup"
    >
      {/* Machine and pour stream share the same anchor so coffee starts at the outlet. */}
      <motion.div
        className={`absolute left-[35%] top-2 z-20 w-[130px] sm:left-[calc(70%-100px)] sm:top-[120px] sm:w-[200px] ${
          reverse ? 'scale-x-[-1]' : ''
        }`}
        style={{
          rotate: -40 * amount,
          transformOrigin: '4% 40%',
          opacity: amount < 0.94 ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 22 }}
      >
        <img
          src={machineImage}
          alt="Coffee machine"
          className={
            'ml-10 mt-0 -rotate-12 scale-125 sm:ml-20 sm:mt-4 sm:max-h-[180px] sm:w-[200px]'
          }
          draggable={false}
        />

        {/* The stream is attached to the lower outlet area, not the center of the canvas. */}
        <motion.div
          className="absolute left-[25%] top-[35%] z-10 origin-top-left sm:left-[40%] sm:top-[35%]"
          style={{
            opacity: streamOpacity,
            scaleY: pourProgress,
            // Counter the machine tilt so the espresso falls vertically.
            rotate: 40 * amount,
          }}
        >
          <svg
            className="h-[40px] w-[30px] sm:h-[80px] sm:w-[38px]"
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
            <motion.path
              d="M14 0 C10 38 22 65 15 98 C10 132 22 159 15 194 C12 218 18 242 16 260 L23 260 C27 226 20 207 25 180 C32 143 20 119 25 88 C31 53 18 28 23 0 Z"
              fill={`url(#${gradientId})`}
              animate={{ x: [0, 1.2, -0.8, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path
              d="M18 8 C16 72 21 145 18 250"
              stroke="#f2c18b"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.48"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Cup and rising espresso surface */}
      <motion.div
        className="absolute left-[calc(50%-50px)] top-[185px] sm:left-[calc(50%-100px)] sm:top-[1/2]"
        animate={{
          y: amount > 0.94 ? -26 : 0,
          scale: amount > 0 && amount < 0.99 ? 1 : 0.98,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="relative bottom-0 left-1/2 w-[180px] -translate-x-[70%] translate-y-[-160px] sm:bottom-5 sm:w-[250px] sm:-translate-x-[57%] sm:translate-y-0">
          <img
            src="/pic/cup.png"
            alt="Coffee cup"
            className="relative z-10 w-full object-contain"
            draggable={false}
          />

          {/* Keep the liquid clipped to the visible opening of the cup. */}
          <motion.div
            className="absolute left-[49px] top-[46px] z-20 h-[12px] w-[82px] overflow-hidden rounded-[50%] bg-[#4b2412] sm:left-[27%] sm:top-[60px] sm:h-[20px] sm:w-[115px]"
            style={{
              opacity: coffeeLevel > 0 ? 1 : 0,
              scaleY: Math.max(0.05, coffeeLevel),
              transformOrigin: 'bottom center',
              clipPath: 'ellipse(50% 45% at 50% 50%)',
            }}
          >
            <div className="absolute inset-0 rounded-[50%] bg-gradient-to-br from-[#c78b50] via-[#6b3518] to-[#2b1209]" />
            <motion.div
              className="absolute left-[18%] top-[18%] h-[2px] w-[35%] rounded-full bg-amber-100/50"
              animate={{ x: [0, 5, 0], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Subtle steam appears once the pour is nearly complete. */}
        {amount > 0.88 && (
          <motion.svg
            className="absolute -top-52 left-0 sm:-top-[50px] sm:left-[54px]"
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
                  stroke="rgba(220, 205, 190, 0.9)"
                  strokeWidth="2.8"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ y: [0, -16, -32], opacity: [0, 0.65, 0] }}
                  transition={{
                    duration: 2.1,
                    repeat: Infinity,
                    delay: index * 0.35,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </motion.svg>
        )}
      </motion.div>
    </div>
  );
}
