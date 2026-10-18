import { useState } from 'react';
import type { CategoryMenuItem, Language } from '../../constants/types';
import { useAppSelector } from '../../redux/hooks';
import { translations } from '../../redux/translations';

interface CategorySelectorProps {
  items: readonly CategoryMenuItem[];
  selectedCategory: string;
  onSelectCategory: (key: string) => void;
}

export default function CategorySelector({
  items,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  const language = useAppSelector((state) => state.language.lang) as Language;
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = language === 'fa';

  return (
    <nav
      aria-label={isRTL ? 'دسته‌بندی‌های منو' : 'Menu categories'}
      className="menu-gooey-root relative z-20 px-4 pt-5 sm:pt-8"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <style>{`
        .menu-gooey-root .menu-gooey-blobs {
          filter: url(#menu-gooey-filter);
          pointer-events: none;
          isolation: isolate;
        }
        .menu-gooey-root .menu-gooey-blob {
          position: absolute;
          display: block;
          border-radius: 9999px;
          background: #fbbf24;
          opacity: .85;
          will-change: transform;
        }
        .menu-gooey-root .menu-gooey-blob-one {
          width: 24px; height: 24px; left: calc(50% - 48px); top: 8px;
          animation: menu-gooey-float-one 2.4s ease-in-out infinite;
        }
        .menu-gooey-root .menu-gooey-blob-two {
          width: 17px; height: 17px; left: calc(50% + 23px); top: 23px;
          animation: menu-gooey-float-two 2.1s ease-in-out infinite;
        }
        .menu-gooey-root .menu-gooey-blob-three {
          width: 12px; height: 12px; left: calc(50% + 4px); top: 1px;
          animation: menu-gooey-float-three 1.8s ease-in-out infinite;
        }
        @keyframes menu-gooey-float-one {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, -10px) scale(.78); }
        }
        @keyframes menu-gooey-float-two {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(13px, 8px) scale(1.2); }
        }
        @keyframes menu-gooey-float-three {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(8px, -12px) scale(.75); }
        }
        .menu-gooey-root .menu-category-panel {
          animation: menu-category-reveal 320ms cubic-bezier(.2,.8,.2,1) both;
        }
        @keyframes menu-category-reveal {
          from { opacity: 0; transform: translateY(-8px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .menu-gooey-root .menu-gooey-blob,
          .menu-gooey-root .menu-category-panel { animation: none !important; }
        }
      `}</style>
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter id="menu-gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="soft-blur" />
            <feColorMatrix
              in="soft-blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <div className="relative flex min-h-16 items-center justify-center">
          <div className="menu-gooey-blobs absolute inset-0" aria-hidden="true">
            <span className="menu-gooey-blob menu-gooey-blob-one" />
            <span className="menu-gooey-blob menu-gooey-blob-two" />
            <span className="menu-gooey-blob menu-gooey-blob-three" />
          </div>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="home-menu-categories"
            onClick={() => setIsOpen((open) => !open)}
            className="relative z-10 rounded-full border border-amber-300/30 bg-slate-950/90 px-8 py-3 text-xl font-black tracking-[0.18em] text-amber-200 shadow-lg shadow-amber-950/20 transition hover:border-amber-200/70 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:text-2xl"
          >
            {isRTL ? 'منو' : 'Menu'}
            <span aria-hidden="true" className={`ms-2 inline-block text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
          </button>
        </div>

        {isOpen && (
          <div
            id="home-menu-categories"
            className="menu-category-panel relative mt-3 w-full"
          >
            <div className="menu-gooey-blobs absolute inset-x-0 top-1/2 h-12 -translate-y-1/2" aria-hidden="true">
              <span className="menu-gooey-blob menu-gooey-blob-one" />
              <span className="menu-gooey-blob menu-gooey-blob-two" />
              <span className="menu-gooey-blob menu-gooey-blob-three" />
            </div>
            <div className="relative mx-auto flex max-w-3xl items-stretch justify-center gap-3 sm:gap-6">
              {items.map((item) => {
                const isSelected = selectedCategory === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      onSelectCategory(item.key);
                      setIsOpen(false);
                    }}
                    className={`group flex min-w-0 flex-1 max-w-40 flex-col items-center gap-2 rounded-2xl border px-3 py-3 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:gap-3 sm:rounded-3xl sm:px-5 sm:py-4 ${
                      isSelected
                        ? 'border-amber-300/70 bg-amber-300/15 shadow-lg shadow-amber-950/20'
                        : 'border-white/10 bg-slate-950/90 hover:-translate-y-1 hover:border-amber-200/50 hover:bg-slate-900'
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Select ${translations[language][item.name]} category`}
                  >
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl transition sm:h-20 sm:w-20 ${
                      isSelected ? 'bg-amber-300/15' : 'bg-white/5 group-hover:bg-white/10'
                    }`}>
                      <img
                        className="h-11 w-11 object-contain sm:h-16 sm:w-16"
                        src={item.pic.startsWith('/') ? item.pic : `/${item.pic}`}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                      />
                    </span>
                    <span className={`text-center text-xs font-semibold sm:text-sm ${
                      isSelected ? 'text-amber-200' : 'text-white/85'
                    }`}>
                      {translations[language][item.name]}
                    </span>
                    <span className={`h-1 w-5 rounded-full transition-all ${
                      isSelected ? 'w-8 bg-amber-300' : 'bg-transparent'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
