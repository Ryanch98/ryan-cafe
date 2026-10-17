import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import MenuCastum from './menu';
import Footer from './footer';
import LanguageSwitcher from './LanguageSwitcher';
import SkeletonLoader from './SkeletonLoader';
import CoffeeAssistant from './CoffeeAssistant';
import CoffeeAssistantButton from './CoffeeAssistantButton';
import { useAppSelector } from '../redux/hooks';
import type { Language } from '../constants/types';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const language = useAppSelector((state) => state.language.lang) as Language;
  const cartQuantity = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const isRTL = language === 'fa';

  useEffect(() => {
    setLoading(true);
    setMobileMenuOpen(false);
    const timer = window.setTimeout(() => setLoading(false), 250);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const navClass =
    'rounded-full px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="flex min-h-screen w-full flex-col overflow-x-clip bg-slate-950 text-white"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <a href="#main-content" className="sr-only z-[100] rounded-full bg-amber-300 px-4 py-2 text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {isRTL ? 'رفتن به محتوای اصلی' : 'Skip to main content'}
      </a>

      <header className="sticky top-0 z-30 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 shadow-xl shadow-black/10 backdrop-blur-2xl sm:rounded-full sm:px-5">
          <Link to="/" aria-label="Modern Cafe home" className="flex min-w-0 shrink items-center gap-2.5">
            <img src="/pic/logo.png" alt="" className="h-10 w-10 rounded-full border border-white/10 object-contain sm:h-12 sm:w-12" />
            <span className="hidden min-w-0 sm:block">
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-amber-300 sm:text-sm">Modern Cafe</span>
              <span className="block text-xs text-slate-400">{isRTL ? 'قهوه، خوراکی و لحظه‌های خوب' : 'Coffee, treats & good moments'}</span>
            </span>
          </Link>

          <nav aria-label={isRTL ? 'ناوبری اصلی' : 'Main navigation'} className="hidden items-center gap-1 md:flex">
            <Link to="/" className={navClass}>{isRTL ? 'خانه' : 'Home'}</Link>
            <Link to="/category/drinks" className={navClass}>{isRTL ? 'نوشیدنی‌ها' : 'Drinks'}</Link>
            <Link to="/category/cakes" className={navClass}>{isRTL ? 'کیک‌ها' : 'Cakes'}</Link>
            <Link to="/category/foods" className={navClass}>{isRTL ? 'غذاها' : 'Food'}</Link>
            <Link to="/about" className={navClass}>{isRTL ? 'درباره ما' : 'About'}</Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher />
            <Link to="/cart" className="relative inline-flex h-10 items-center gap-2 rounded-full bg-amber-300 px-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200 sm:px-4" aria-label={isRTL ? `سبد خرید، ${cartQuantity} کالا` : `Shopping cart, ${cartQuantity} items`}>
              <ShoppingBagIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{isRTL ? 'سبد خرید' : 'Cart'}</span>
              {cartQuantity > 0 && <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-slate-950 px-1.5 py-0.5 text-[11px] text-amber-200">{cartQuantity}</span>}
            </Link>
            <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden" aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? (isRTL ? 'بستن منو' : 'Close menu') : (isRTL ? 'باز کردن منو' : 'Open menu')}>
              {mobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav aria-label={isRTL ? 'منوی موبایل' : 'Mobile navigation'} className="mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden">
            {[
              { to: '/', en: 'Home', fa: 'خانه' },
              { to: '/category/drinks', en: 'Drinks', fa: 'نوشیدنی‌ها' },
              { to: '/category/cakes', en: 'Cakes', fa: 'کیک‌ها' },
              { to: '/category/foods', en: 'Food', fa: 'غذاها' },
              { to: '/about', en: 'About us', fa: 'درباره ما' },
            ].map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-white/5 px-4 py-3 text-sm text-white/85 transition hover:border-amber-300/30 hover:bg-white/5">
                {isRTL ? item.fa : item.en}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {loading ? (
        <div className="flex-1"><SkeletonLoader isHome={isHome} /></div>
      ) : (
        <main id="main-content" className={`w-full flex-1 ${isHome ? '' : 'mx-auto max-w-7xl px-3 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8'}`}>
          <Outlet />
        </main>
      )}

      {!loading && <Footer />}
      <CoffeeAssistantButton onClick={() => setShowAssistant(true)} language={language} />
      <CoffeeAssistant isOpen={showAssistant} onClose={() => setShowAssistant(false)} language={language} />
      <div className="hidden"><MenuCastum /></div>
    </div>
  );
}
