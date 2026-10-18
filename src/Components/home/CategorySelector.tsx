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

  const categoryPosition: Record<string, string> = {
    drinks: 'menu-orbit-drinks',
    foods: 'menu-orbit-foods',
    cakes: 'menu-orbit-cakes',
  };

  return (
    <nav
      aria-label={isRTL ? 'دسته‌بندی‌های منو' : 'Menu categories'}
      className={`menu-orbit-root relative z-20 px-4 pt-3 sm:pt-5 ${isOpen ? 'menu-orbit-open' : ''}`}
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
        .menu-orbit-root .menu-orbit-stage {
          position: relative;
          width: min(100%, 380px);
          height: 264px;
          margin: 0 auto;
          isolation: isolate;
        }
        .menu-orbit-root .menu-orbit-main {
          position: absolute;
          z-index: 5;
          left: 50%;
          top: 136px;
          width: 120px;
          height: 120px;
          transform: translateX(-50%);
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: 1px solid rgba(252,211,77,.72);
          background: radial-gradient(circle at 35% 25%, rgba(120,53,15,.65), rgba(2,6,23,.98) 70%);
          color: #fde68a;
          box-shadow: 0 0 0 6px rgba(251,191,36,.045), 0 12px 38px rgba(0,0,0,.4), inset 0 0 24px rgba(251,191,36,.08);
          transition: box-shadow 300ms ease, border-color 300ms ease, transform 300ms ease;
        }
        .menu-orbit-root .menu-orbit-main:hover,
        .menu-orbit-root .menu-orbit-main:focus-visible {
          border-color: #fcd34d;
          box-shadow: 0 0 0 8px rgba(251,191,36,.09), 0 0 36px rgba(251,191,36,.18), 0 12px 38px rgba(0,0,0,.4);
          outline: 2px solid #fcd34d;
          outline-offset: 4px;
        }
        .menu-orbit-root .menu-orbit-category {
          position: absolute;
          z-index: 4;
          display: flex;
          width: 102px;
          height: 102px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,.16);
          background: radial-gradient(circle at 35% 25%, rgba(51,65,85,.98), rgba(2,6,23,.98) 78%);
          color: rgba(255,255,255,.88);
          box-shadow: 0 8px 24px rgba(0,0,0,.32);
          opacity: 0;
          pointer-events: none;
          transform: translate(0, 12px) scale(.48);
          transition: opacity 280ms ease, transform 440ms cubic-bezier(.2,.85,.2,1), border-color 250ms ease, background 250ms ease;
        }
        .menu-orbit-root .menu-orbit-drinks { left: 2px; top: 96px; }
        .menu-orbit-root .menu-orbit-foods { left: 50%; top: 0; }
        .menu-orbit-root .menu-orbit-cakes { right: 2px; top: 96px; }
        .menu-orbit-root.menu-orbit-open .menu-orbit-category,
        .menu-orbit-root:focus-within .menu-orbit-category {
          opacity: 1;
          pointer-events: auto;
          transform: translate(0, 0) scale(1);
        }
        .menu-orbit-root .menu-orbit-foods { transform: translate(-50%, 25px) scale(.48); }
        .menu-orbit-root.menu-orbit-open .menu-orbit-foods,
        .menu-orbit-root:focus-within .menu-orbit-foods { transform: translate(-50%, 0) scale(1); }
        .menu-orbit-root .menu-orbit-category:hover,
        .menu-orbit-root .menu-orbit-category:focus-visible,
        .menu-orbit-root .menu-orbit-category[aria-pressed="true"] {
          border-color: rgba(252,211,77,.9);
          background: radial-gradient(circle at 35% 25%, rgba(120,53,15,.95), rgba(2,6,23,.98) 78%);
          color: #fde68a;
          box-shadow: 0 0 0 4px rgba(251,191,36,.07), 0 0 25px rgba(251,191,36,.16);
          outline: none;
        }
        .menu-orbit-root .menu-orbit-goo {
          position: absolute;
          z-index: 2;
          inset: 8px 4px 10px;
          pointer-events: none;
          filter: url(#menu-orbit-goo-filter);
        }
        .menu-orbit-root .menu-orbit-goo span {
          position: absolute;
          display: block;
          border-radius: 9999px;
          background: #fbbf24;
          opacity: 0;
          transition: opacity 250ms ease, transform 450ms cubic-bezier(.2,.85,.2,1);
        }
        .menu-orbit-root .menu-orbit-goo span:nth-child(1) { width: 22px; height: 22px; left: 25%; top: 43%; }
        .menu-orbit-root .menu-orbit-goo span:nth-child(2) { width: 17px; height: 17px; left: 48%; top: 23%; }
        .menu-orbit-root .menu-orbit-goo span:nth-child(3) { width: 20px; height: 20px; right: 24%; top: 43%; }
        .menu-orbit-root.menu-orbit-open .menu-orbit-goo span,
        .menu-orbit-root:focus-within .menu-orbit-goo span { opacity: .9; }
        .menu-orbit-root.menu-orbit-open .menu-orbit-goo span:nth-child(1),
        .menu-orbit-root:focus-within .menu-orbit-goo span:nth-child(1) { transform: translate(-22px, 9px) scale(.7); }
        .menu-orbit-root.menu-orbit-open .menu-orbit-goo span:nth-child(2),
        .menu-orbit-root:focus-within .menu-orbit-goo span:nth-child(2) { transform: translateY(-11px) scale(.75); }
        .menu-orbit-root.menu-orbit-open .menu-orbit-goo span:nth-child(3),
        .menu-orbit-root:focus-within .menu-orbit-goo span:nth-child(3) { transform: translate(22px, 9px) scale(.7); }
        .menu-orbit-root .menu-orbit-category img { width: 40px; height: 40px; object-fit: contain; }
        .menu-orbit-root .menu-orbit-category span { max-width: 90px; padding: 0 3px; font-size: 13px; font-weight: 700; line-height: 1.15; text-align: center; }
        @media (max-width: 380px) {
          .menu-orbit-root .menu-orbit-stage { transform: scale(.92); transform-origin: top center; margin-bottom: -19px; }
          .menu-orbit-root .menu-orbit-main { width: 108px; height: 108px; }
          .menu-orbit-root .menu-orbit-category { width: 88px; height: 88px; }
          .menu-orbit-root .menu-orbit-category img { width: 34px; height: 34px; }
          .menu-orbit-root .menu-orbit-category span { font-size: 11px; }
          .menu-orbit-root .menu-orbit-drinks { left: 2px; }
          .menu-orbit-root .menu-orbit-cakes { right: 2px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .menu-orbit-root .menu-orbit-main,
          .menu-orbit-root .menu-orbit-category,
          .menu-orbit-root .menu-orbit-goo span { transition: none !important; }
        }
      `}</style>

      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter id="menu-orbit-goo-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="menu-orbit-stage">
        <div className="menu-orbit-goo" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <button
          type="button"
          className="menu-orbit-main"
          aria-expanded={isOpen}
          aria-controls="home-menu-categories"
          onClick={() => setIsOpen((open) => !open)}
          onFocus={() => setIsOpen(true)}
        >
          <span className="text-xl font-black tracking-[0.12em]">{isRTL ? 'منو' : 'Menu'}</span>
          <span aria-hidden="true" className="mt-1 text-[10px] tracking-[0.16em] text-amber-100/55">● ● ●</span>
        </button>

        <div id="home-menu-categories" aria-label={isRTL ? 'انتخاب دسته‌بندی' : 'Choose a category'}>
          {items.map((item) => {
            const isSelected = selectedCategory === item.key;
            const categoryLabel = translations[language][item.name];

            return (
              <button
                key={item.key}
                type="button"
                className={`menu-orbit-category ${categoryPosition[item.key] || ''}`}
                onClick={() => {
                  onSelectCategory(item.key);
                  setIsOpen(false);
                }}
                aria-pressed={isSelected}
                aria-label={`Select ${categoryLabel} category`}
                tabIndex={isOpen ? 0 : -1}
              >
                <img src={item.pic.startsWith('/') ? item.pic : `/${item.pic}`} alt="" aria-hidden="true" loading="lazy" />
                <span>{categoryLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
