import { useAppSelector } from '../redux/hooks';
import { translations } from '../redux/translations';
import { signIn as firebaseSignIn, signInWithGoogle, signInWithFacebook } from '../firebase';
import { useState } from 'react';

export default function SignInForm({ onSuccess, onClose }) {
  const language = useAppSelector((s) => s.language.lang);
  const t = translations[language];
  const isRTL = language === 'fa';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const finishSignIn = async (provider) => {
    setError(null);
    setLoading(true);
    try {
      if (provider === 'email') await firebaseSignIn(email.trim(), password);
      if (provider === 'google') await signInWithGoogle();
      if (provider === 'facebook') await signInWithFacebook();
      if (onSuccess) onSuccess();
    } catch (err) {
      const code = err?.code;
      const friendlyErrors = {
        'auth/invalid-credential': isRTL ? 'ایمیل یا رمز عبور درست نیست.' : 'The email or password is incorrect.',
        'auth/invalid-email': isRTL ? 'فرمت ایمیل معتبر نیست.' : 'Please enter a valid email address.',
        'auth/too-many-requests': isRTL ? 'تلاش‌ها زیاد بوده؛ کمی بعد دوباره امتحان کن.' : 'Too many attempts. Please try again later.',
        'auth/popup-closed-by-user': isRTL ? 'پنجره ورود بسته شد.' : 'The sign-in window was closed.',
        'auth/network-request-failed': isRTL ? 'اتصال شبکه برقرار نیست.' : 'Network connection failed. Please try again.',
      };
      setError(friendlyErrors[code] || (isRTL ? 'ورود انجام نشد. دوباره تلاش کن.' : 'Sign-in failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white placeholder-slate-500 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/20';

  return (
    <div className="w-full rounded-[2rem] border border-white/10 bg-slate-900/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
      <div className={isRTL ? 'text-right' : 'text-left'}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">{isRTL ? 'خوش برگشتی' : 'WELCOME BACK'}</p>
        <h1 className="mt-2 text-2xl font-bold text-white">{t.signIn}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">{isRTL ? 'برای ادامه، وارد حساب خودت شو.' : 'Sign in to continue to your cafe experience.'}</p>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); finishSignIn('email'); }} className="mt-6 space-y-4">
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-slate-300">{isRTL ? 'ایمیل' : 'Email address'}</label>
          <input id="signin-email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" className={inputClass} placeholder="you@example.com" dir="ltr" disabled={loading} />
        </div>
        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-slate-300">{isRTL ? 'رمز عبور' : 'Password'}</label>
          <input id="signin-password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} type="password" className={inputClass} placeholder="••••••••" dir="ltr" disabled={loading} />
        </div>

        {error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2.5 text-sm leading-6 text-red-200">{error}</p>}

        <button type="submit" disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200 disabled:cursor-wait disabled:opacity-60">
          {loading ? (isRTL ? 'در حال ورود…' : 'Signing in…') : t.signIn}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
        <span className="h-px flex-1 bg-white/10" /><span>{isRTL ? 'یا ادامه بده با' : 'OR CONTINUE WITH'}</span><span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" disabled={loading} onClick={() => finishSignIn('google')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50">
          <img src="/pic/google.svg" alt="" aria-hidden="true" className="h-5 w-5" />Google
        </button>
        <button type="button" disabled={loading} onClick={() => finishSignIn('facebook')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50">
          <img src="/pic/facebook.svg" alt="" aria-hidden="true" className="h-5 w-5" />Facebook
        </button>
      </div>

      <button type="button" onClick={onClose} className="mt-5 min-h-10 w-full rounded-full px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
        {isRTL ? 'بستن' : 'Close'}
      </button>
    </div>
  );
}
