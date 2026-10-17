import { useNavigate, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import LanguageSwitcher from '../LanguageSwitcher';

interface HomeHeaderProps {
  signInText: string;
  aboutUsText: string;
  onSignIn: () => void;
}

export default function HomeHeader({ signInText, aboutUsText, onSignIn }: HomeHeaderProps) {
  const navigate = useNavigate();

  const navLinkClass =
    'rounded-full px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300';

  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-xl sm:rounded-full sm:px-5">
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onSignIn}
            className="rounded-full bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            {signInText}
          </button>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
        </div>

        <Link to="/" aria-label="Modern Cafe home" className="flex min-w-0 items-center justify-center">
          <img
            className="h-12 w-auto max-w-[112px] object-contain sm:h-14 sm:max-w-[145px]"
            src="/pic/logo.png"
            alt="Modern Cafe"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <button type="button" onClick={() => navigate('/about')} className={navLinkClass}>
            {aboutUsText}
          </button>
          <Link to="/category/نوشیدنی ها" className={navLinkClass}>Drinks</Link>
          <Link to="/cart" className="ml-1 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:border-amber-300/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
            Cart
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <div className="sm:hidden">
            <LanguageSwitcher />
          </div>
          <Menu as="div" className="relative">
            <MenuButton
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {({ open }) => open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </MenuButton>
            <MenuItems className="absolute right-0 top-12 z-50 w-56 origin-top-right rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm text-white shadow-2xl shadow-black/40 backdrop-blur-xl focus:outline-none">
              <MenuItem>
                {({ close }) => <Link to="/" onClick={close} className="block rounded-xl px-3 py-2.5 transition hover:bg-white/10">Home</Link>}
              </MenuItem>
              <MenuItem>
                {({ close }) => <Link to="/category/نوشیدنی ها" onClick={close} className="block rounded-xl px-3 py-2.5 transition hover:bg-white/10">Drinks</Link>}
              </MenuItem>
              <MenuItem>
                {({ close }) => <Link to="/category/کیک" onClick={close} className="block rounded-xl px-3 py-2.5 transition hover:bg-white/10">Cakes</Link>}
              </MenuItem>
              <MenuItem>
                {({ close }) => <Link to="/category/غذا" onClick={close} className="block rounded-xl px-3 py-2.5 transition hover:bg-white/10">Foods</Link>}
              </MenuItem>
              <MenuItem>
                {({ close }) => <button type="button" onClick={() => { close(); navigate('/about'); }} className="block w-full rounded-xl px-3 py-2.5 text-left transition hover:bg-white/10">{aboutUsText}</button>}
              </MenuItem>
              <MenuItem>
                {({ close }) => <button type="button" onClick={() => { close(); onSignIn(); }} className="block w-full rounded-xl px-3 py-2.5 text-left transition hover:bg-white/10">{signInText}</button>}
              </MenuItem>
              <MenuItem>
                {({ close }) => <Link to="/cart" onClick={close} className="mt-1 block rounded-xl bg-amber-400 px-3 py-2.5 font-semibold text-slate-950 transition hover:bg-amber-300">Cart</Link>}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  );
}
