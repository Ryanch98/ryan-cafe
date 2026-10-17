import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { translations } from '../redux/translations';

export default function Footer() {
  const language = useAppSelector((state) => state.language.lang);
  const t = translations[language];
  const isRTL = language === 'fa';

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} className="mt-12 border-t border-white/10 bg-slate-950/80 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <section>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/pic/logo.png" alt="" className="h-12 w-12 rounded-full border border-white/10 object-contain" />
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Modern Cafe</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">{t.footerAboutText}</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white">{t.footerContactTitle}</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p className="flex items-start gap-2"><span aria-hidden="true">⌖</span><span>{t.footerAddress}</span></p>
              <p className="flex items-start gap-2"><span aria-hidden="true">☎</span><span>{t.footerPhone}</span></p>
              <p className="flex items-start gap-2"><span aria-hidden="true">✉</span><span>{t.footerEmail}</span></p>
              <p className="flex items-start gap-2"><span aria-hidden="true">◷</span><span>{t.footerHours}</span></p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white">{t.footerFollowTitle}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">{isRTL ? 'تازه‌ترین خبرها و پیشنهادهای کافه را دنبال کنید.' : 'Follow the cafe for updates, seasonal drinks and special treats.'}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { href: 'https://instagram.com', label: 'Instagram' },
                { href: 'https://facebook.com', label: 'Facebook' },
                { href: 'https://youtube.com', label: 'YouTube' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-amber-300/40 hover:text-amber-200">
                  {social.label}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footerCopyright}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/" className="transition hover:text-amber-200">{isRTL ? 'خانه' : 'Home'}</Link>
            <Link to="/about" className="transition hover:text-amber-200">{isRTL ? 'درباره ما' : 'About us'}</Link>
            <Link to="/cart" className="transition hover:text-amber-200">{isRTL ? 'سبد خرید' : 'Cart'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
