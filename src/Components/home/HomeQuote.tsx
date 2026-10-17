import { Link } from 'react-router-dom';
import { ShoppingCartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Comment from '../comment';
import type { Language } from '../../constants/types';

interface HomeQuoteProps {
  quoteText: string;
  commentIndex: number;
  language: Language;
}

export default function HomeQuote({ quoteText, commentIndex, language }: HomeQuoteProps) {
  const isRTL = language === 'fa';

  return (
    <section className="flex w-full flex-col items-center justify-end px-4 pb-6 pt-5 sm:px-6 sm:pb-10">
      <div className="w-full max-w-5xl rounded-[2rem] border border-white/15 bg-slate-950/65 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.65fr)] md:items-center">
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">{isRTL ? 'لحظه‌ای برای خودت' : 'YOUR LITTLE COFFEE MOMENT'}</p>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight">{quoteText}</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {isRTL
                ? 'نوشیدنی‌های دست‌ساز، خوراکی‌های تازه و طعمی که روزت را بهتر می‌کند.'
                : 'Handcrafted drinks, fresh treats, and a little something to make your day better.'}
            </p>
            <div className={`mt-6 flex flex-wrap gap-3 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <Link to="/category/drinks" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200">
                {isRTL ? 'سفارش نوشیدنی' : 'Explore drinks'} <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link to="/cart" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                <ShoppingCartIcon className="h-4 w-4" />{isRTL ? 'سبد خرید' : 'View cart'}
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">{isRTL ? 'نظر مشتریان' : 'KIND WORDS'}</p>
            <Comment commentIndex={commentIndex} language={language} />
          </div>
        </div>
      </div>
    </section>
  );
}
