import CoffeeAnimation from './coffeeAnimation';
import { useCallback, useRef, useState } from 'react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';

import { useAppSelector } from '../../redux/hooks';
import { translations } from '../../redux/translations';
import type { Language } from '../../constants/types';

type Direction = 'next' | 'prev';

interface CoffeeCardProps {
  title: string;
  description: string;
  reverse: boolean;
  image: string;
  onReachEnd: (direction: Direction) => void;
}

export default function CoffeeCard({
  title,
  description,
  reverse,
  image,
  onReachEnd,
}: CoffeeCardProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const language = useAppSelector((state) => state.language.lang) as Language;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const maxScroll = element.scrollHeight - element.clientHeight;
    const nextProgress = maxScroll > 0
      ? Math.min(1, Math.max(0, element.scrollTop / maxScroll))
      : 0;

    // Avoid React work when the normalized scroll position has not changed.
    setProgress((previous) => previous === nextProgress ? previous : nextProgress);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col px-1 py-5 sm:gap-20">
      <div className="sticky top-5 flex w-full flex-col items-center gap-2 pt-2 text-center">
        <span className="rounded-full bg-amber-200/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
          {translations[language].title}
        </span>

        <h2 className="text-3xl font-black text-white sm:text-4xl">
          {translations[language].typeCoffee}
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          {translations[language].desCoffee}
        </p>
      </div>

      <div
        className={`flex w-full max-w-7xl flex-col gap-8 rounded-[34px] px-3 py-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:sticky sm:top-52 sm:gap-8 sm:border sm:border-slate-200/30 sm:bg-white/90 sm:p-6 ${
          reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        <div className="flex min-w-0 w-full flex-col gap-2 sm:gap-8 sm:text-center lg:w-[55%] lg:text-left">
          <h3 className="pb-2 text-center text-2xl font-bold leading-tight text-amber-200 sm:pb-0 sm:text-3xl sm:text-slate-900">
            {title}
          </h3>
          <div
            ref={descriptionRef}
            className="h-[30vh] min-h-[180px] overflow-y-auto overscroll-contain rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700 sm:h-[430px] sm:rounded-3xl sm:border sm:border-slate-200/70 sm:p-6 sm:text-base sm:leading-7 sm:shadow-inner sm:shadow-slate-200/40"
            onScroll={handleScroll}
          >
            {description}
          </div>
        </div>
        <div className="flex min-w-0 w-full flex-row items-center justify-between gap-2 sm:pt-0 lg:w-[45%]">
          <button
            type="button"
            onClick={() => onReachEnd('prev')}
            aria-label={language === 'fa' ? 'قهوه قبلی' : 'Previous coffee'}
            className="z-50 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 text-slate-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ArrowLeftCircleIcon className="h-6 w-6" />
          </button>
          <div className="relative flex min-w-0 flex-1 items-center justify-center">
            <CoffeeAnimation reverse={reverse} progress={progress} machineImage={image} />
          </div>
          <button
            type="button"
            onClick={() => onReachEnd('next')}
            aria-label={language === 'fa' ? 'قهوه بعدی' : 'Next coffee'}
            className="z-50 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 text-slate-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ArrowRightCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
