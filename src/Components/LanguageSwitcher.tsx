import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleLanguage } from '../redux/languageSlice';
import type { Language } from '../constants/types';

const LANGUAGE_LABELS: Record<Language, { flag: string; label: string; next: string }> = {
  en: { flag: 'en', label: 'EN', next: 'Switch to Persian' },
  fa: { flag: 'ir', label: 'فا', next: 'تغییر زبان به انگلیسی' },
};

export default function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.language.lang) as Language;
  const info = LANGUAGE_LABELS[currentLanguage];

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleLanguage())}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-bold text-white transition hover:border-amber-300/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      title={info.next}
      aria-label={info.next}
    >
      <img src={`/pic/${info.flag}.png`} alt="" aria-hidden="true" className="h-5 w-5 rounded-full object-cover" />
      <span>{info.label}</span>
    </button>
  );
}
