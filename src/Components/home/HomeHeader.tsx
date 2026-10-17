import { useNavigate, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import LanguageSwitcher from '../LanguageSwitcher';
import { useAppSelector } from '../../redux/hooks';

interface HomeHeaderProps {
  signInText: string;
  aboutUsText: string;
  onSignIn: () => void;
}

export default function HomeHeader({ signInText, aboutUsText, onSignIn }: HomeHeaderProps) {
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.language.lang);
  const isRTL = language === 'fa';
  const cartQuantity = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const navLinkClass =
    'whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300';

  const links = [
    { to: '/category/drinks', en: 'Drinks', fa: 'نوشیدنی‌ها' },
    { to: '/category/cakes', en: 'Cakes', fa: 'کیک‌ها' },
    { to: '/category/foods', en: 'Food', fa: 'غذاها' },
    { to: '/coffee-guide', en: 'Coffee guide', fa: 'راهنمای قهوه' },
  ];

  return (
    <header dir={isRTL ? 'rtl' : 'ltr'} className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/[0.09] bg-slate-950/85 px-3 py-2.5 shadow-lg shadow-black/20 backdrop-blur-2xl sm:rounded-full sm:px-5 lg:px-6">
        <Link to="/" aria-label="Modern Cafe home" className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-200/20 bg-amber-300/[0.08] p-1.5 transition group-hover:border-amber-200/40 sm:h-12 sm:w-12">
            <img className="h-full w-full object-contain" src="/pic/logo.png" alt="" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block text-sm font-black tracking-[0.13em] text-white">MODERN CAFE</span>
            <span className="mt-0.5 block text-[10px] tracking-[0.12em] text-amber-200/75">
              {isRTL ? 'قهوه • طعم • لحظه' : 'COFFEE · TASTE · MOMENTS'}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={isRTL ? 'ناوبری اصلی' : 'Main navigation'}>
          <button type="button" onClick={() => navigate('/about')} className={navLinkClass}>{aboutUsText}</button>
          {links.map((item) => (
            <Link key={item.to} to={item.to} className={navLinkClass}>{isRTL ? item.fa : item.en}</Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block"><LanguageSwitcher /></div>
          <button
            type="button"
            onClick={onSignIn}
            className="hidden rounded-full border border-amber-200/25 bg-amber-300 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 sm:inline-flex"
          >
            {signInText}
          </button>
          <Link
            to="/cart"
            aria-label={isRTL ? `سبد خرید، ${cartQuantity} کالا` : `Cart, ${cartQuantity} items`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-amber-200/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:h-11 sm:w-11"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {cartQuantity > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-300 px-1 text-[10px] font-black text-slate-950">{cartQuantity > 99 ? '99+' : cartQuantity}</span>}
          </Link>

          <div className="sm:hidden"><LanguageSwitcher /></div>
          <Menu as="div" className="relative lg:hidden">
            <MenuButton
              aria-label={isRTL ? 'باز کردن منو' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {({ open }) => open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </MenuButton>
            <MenuItems className={`absolute ${isRTL ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} top-12 z-50 w-60 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm text-white shadow-2xl shadow-black/40 backdrop-blur-xl focus:outline-none`}>
              <MenuItem>{({ close }) => <Link to="/" onClick={close} className="block rounded-xl px-3 py-2.5 text-start text-slate-300 transition hover:bg-white/[0.07] hover:text-amber-200">{isRTL ? 'خانه' : 'Home'}</Link>}</MenuItem>
              {links.map((item) => (
                <MenuItem key={item.to}>{({ close }) => <Link to={item.to} onClick={close} className="block rounded-xl px-3 py-2.5 text-start text-slate-300 transition hover:bg-white/[0.07] hover:text-amber-200">{isRTL ? item.fa : item.en}</Link>}</MenuItem>
              ))}
              <MenuItem>{({ close }) => <button type="button" onClick={() => { close(); navigate('/about'); }} className="block w-full rounded-xl px-3 py-2.5 text-start text-slate-300 transition hover:bg-white/[0.07] hover:text-amber-200">{aboutUsText}</button>}</MenuItem>
              <MenuItem>{({ close }) => <button type="button" onClick={() => { close(); onSignIn(); }} className="mt-1 block w-full rounded-xl bg-amber-300 px-3 py-2.5 text-start font-bold text-slate-950 transition hover:bg-amber-200">{signInText}</button>}</MenuItem>
              <MenuItem>{({ close }) => <Link to="/cart" onClick={close} className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-start text-slate-300 transition hover:bg-white/[0.07] hover:text-amber-200"><span>{isRTL ? 'سبد خرید' : 'Cart'}</span><span>{cartQuantity}</span></Link>}</MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  );
}
