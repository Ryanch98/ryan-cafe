import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../redux/hooks';
import SignInForm from './SignInForm';

export default function SignInModal({ open, onClose }) {
  const language = useAppSelector((state) => state.language.lang);
  const isRTL = language === 'fa';

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4" dir={isRTL ? 'rtl' : 'ltr'} role="presentation">
      <button type="button" className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-md" onClick={onClose} aria-label={isRTL ? 'بستن پنجره ورود' : 'Close sign in dialog'} />
      <section role="dialog" aria-modal="true" aria-label={isRTL ? 'ورود به حساب' : 'Sign in'} className="relative z-10 my-auto w-full max-w-md">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label={isRTL ? 'بستن' : 'Close'}>
          <XMarkIcon className="h-5 w-5" />
        </button>
        <SignInForm onSuccess={onClose} onClose={onClose} />
      </section>
    </div>
  );
}
