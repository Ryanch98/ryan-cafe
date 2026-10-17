import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  const language = useAppSelector((state) => state.language.lang);
  const isRTL = language === 'fa';

  return (
    <section dir={isRTL ? 'rtl' : 'ltr'} className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
      <span className="text-7xl font-black tracking-tight text-amber-300 sm:text-9xl">404</span>
      <h1 className="mt-5 text-2xl font-bold text-white sm:text-3xl">{isRTL ? 'این صفحه پیدا نشد' : 'Page not found'}</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">{isRTL ? 'ممکن است آدرس اشتباه باشد یا صفحه جابه‌جا شده باشد.' : 'The link may be incorrect, or the page may have moved.'}</p>
      <Link to="/" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">
        {isRTL ? <HomeIcon className="h-4 w-4" /> : <ArrowLeftIcon className="h-4 w-4" />}
        {isRTL ? 'بازگشت به خانه' : 'Back to home'}
      </Link>
    </section>
  );
}
