import { useId } from 'react';

interface CoffeeAnimationProps {
  reverse: boolean;
  progress?: number;
  machineImage: string;
}

type PourLayout = {
  outletX: number;
  outletY: number;
  cupX: number;
  cupY: number;
  streamPath: string;
  pour: boolean;
};

// Coordinates are relative to the shared 320 × 360 illustration canvas.
// Devices with a non-pouring orientation (the moka pot) stay upright: the
// stream is not faked by rotating the appliance independently of its outlet.
function getPourLayout(image: string): PourLayout {
  if (image.includes('mocapot')) {
    return {
      outletX: 214, outletY: 144, cupX: 104, cupY: 228,
      streamPath: 'M 214 144 C 205 174, 183 211, 163 257',
      pour: true,
    };
  }
  if (image.includes('turkish')) {
    return {
      outletX: 218, outletY: 132, cupX: 104, cupY: 228,
      streamPath: 'M 218 132 C 209 169, 183 214, 163 257',
      pour: true,
    };
  }
  return {
    outletX: 211, outletY: 137, cupX: 104, cupY: 228,
    streamPath: 'M 211 137 C 205 173, 184 215, 163 257',
    pour: true,
  };
}

export default function CoffeeAnimation({
  reverse,
  progress = 0,
  machineImage,
}: CoffeeAnimationProps) {
  const gradientId = `coffee-stream-${useId().replace(/:/g, '')}`;
  const amount = Math.min(1, Math.max(0, progress));
  const layout = getPourLayout(machineImage);
  const pourProgress = Math.min(1, Math.max(0, (amount - 0.14) / 0.48));
  const coffeeLevel = Math.min(1, Math.max(0, (amount - 0.35) / 0.6));
  const streamLength = 190;
  const streamVisible = layout.pour ? pourProgress * streamLength : 0;

  return (
    <div
      className="relative aspect-[8/9] w-full max-w-[340px] overflow-visible"
      role="img"
      aria-label="Coffee pouring into a cup"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 360"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#281006" />
            <stop offset="30%" stopColor="#6b3518" />
            <stop offset="52%" stopColor="#bd7941" />
            <stop offset="75%" stopColor="#713719" />
            <stop offset="100%" stopColor="#2a1007" />
          </linearGradient>
          <clipPath id={`${gradientId}-cup`}>
            <ellipse cx="159" cy="257" rx="28" ry="7.5" />
          </clipPath>
        </defs>

        {/* Cup is stationary; liquid grows inside the opening in canvas space. */}
        <g transform={reverse ? 'translate(320 0) scale(-1 1)' : undefined}>
          <image
            href="/pic/cup.png"
            x={layout.cupX}
            y={layout.cupY}
            width="112"
            height="112"
            preserveAspectRatio="xMidYMid meet"
          />
          <g clipPath={`url(#${gradientId}-cup)`}>
            <rect
              x="130"
              y={264 - 15 * coffeeLevel}
              width="58"
              height={15 * coffeeLevel + 2}
              fill="#4b2412"
              opacity={coffeeLevel > 0 ? 1 : 0}
            />
            <ellipse
              cx="159"
              cy={264 - 15 * coffeeLevel}
              rx="28"
              ry={7.5 * coffeeLevel}
              fill="#8a4b25"
              opacity={coffeeLevel > 0 ? 1 : 0}
            />
          </g>
        </g>

        {/* Stream is revealed by scroll progress, with no clock-driven motion. */}
        <path
          d={layout.streamPath}
          pathLength={streamLength}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={streamLength}
          strokeDashoffset={streamLength - streamVisible}
          opacity={pourProgress > 0 ? Math.min(1, pourProgress * 3) : 0}
        />
        <path
          d={layout.streamPath}
          pathLength={streamLength}
          fill="none"
          stroke="#f2c18b"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={streamLength}
          strokeDashoffset={streamLength - streamVisible}
          opacity={pourProgress > 0 ? 0.35 : 0}
        />
      </svg>

      {/* The appliance remains upright so its outlet cannot drift away from
          a separately transformed stream. Its position shares the SVG canvas. */}
      <img
        src={machineImage}
        alt=""
        draggable={false}
        className={`pointer-events-none absolute left-[28%] top-[1%] h-[48%] w-[68%] select-none object-contain ${reverse ? '-scale-x-100' : ''}`}
      />
    </div>
  );
}
