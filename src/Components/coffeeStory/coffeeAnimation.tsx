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
      {/* Espresso machine */}
      <motion.div
        className={`absolute left-[calc(50%-55px)] top-2 z-20 w-[130px] sm:left-[calc(50%-100px)] sm:top-[40px] sm:w-[200px] ${
          reverse ? 'scale-x-[-1]' : ''
        }`}
        style={{
          rotate: -40 * amount,
          transformOrigin: '4% 40%',
          opacity: amount > 0.02 && amount < 0.96 ? 1 : 0.18,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 22 }}
      >
        <img
          src={machineImage}
          alt="Espresso machine"
          className="h-[130px] w-[130px] -rotate-12 object-contain sm:h-[200px] sm:w-[200px]"
          draggable={false}
        />
      </motion.div>

      {/* Espresso stream: only visible during the pouring part of the story */}
      <motion.div
        className="absolute left-[calc(50%-20px)] top-[88px] z-10 origin-top sm:left-[calc(50%-25px)] sm:top-[145px]"
        style={{
          opacity: streamOpacity,
          scaleY: pourProgress,
        }}
      >
        <svg
          className="h-[90px] w-[40px] sm:h-[125px] sm:w-[50px]"
          viewBox="0 0 50 260"
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
            d="M21 0 C16 38 29 65 22 98 C16 132 29 159 22 194 C19 218 25 242 23 260 L31 260 C34 226 27 207 32 180 C39 143 27 119 32 88 C38 53 25 28 30 0 Z"
            fill={`url(#${gradientId})`}
            animate={{ x: [0, 1.5, -1, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path
            d="M25 8 C23 72 28 145 25 250"
            stroke="#f2c18b"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.48"
          />
        </svg>
      </motion.div>

      {/* Cup and rising espresso surface */}
      <motion.div
        className="absolute left-[calc(50%-50px)] top-[185px] sm:left-[calc(50%-100px)] sm:top-[245px]"
        animate={{
          y: amount > 0.94 ? -26 : 0,
          scale: amount > 0 && amount < 0.99 ? 1 : 0.98,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="relative w-[100px] sm:w-[200px]">
          <img
            src="/pic/cup.png"
            alt="Coffee cup"
            className="relative z-10 w-full object-contain"
            draggable={false}
          />

          {/* Keep the liquid clipped to the visible opening of the cup. */}
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
            className="absolute -top-20 left-0 sm:-top-[130px] sm:left-[50px]"
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
