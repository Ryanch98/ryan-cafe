import { SparklesIcon } from '@heroicons/react/24/outline';

interface CoffeeAssistantButtonProps {
  onClick: () => void;
  language: 'en' | 'fa';
}

export default function CoffeeAssistantButton({ onClick, language }: CoffeeAssistantButtonProps) {
  const isRTL = language === 'fa';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group fixed bottom-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full border border-amber-200/40 bg-amber-300 px-4 py-3 font-semibold text-slate-950 shadow-xl shadow-black/30 transition hover:-translate-y-0.5 hover:bg-amber-200 active:scale-95 sm:bottom-6 ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}
      title={isRTL ? 'دستیار قهوه' : 'Coffee assistant'}
      aria-label={isRTL ? 'باز کردن دستیار قهوه' : 'Open coffee assistant'}
    >
      <SparklesIcon className="h-5 w-5 transition group-hover:rotate-12" />
      <span className="text-sm">{isRTL ? 'دستیار قهوه' : 'Ask AI'}</span>
    </button>
  );
}
