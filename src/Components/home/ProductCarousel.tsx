import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import type { MenuItemContent, Language } from '../../constants/types';
import { addToCart } from '../../redux/cartSlice';
import formatPrice from '../../utils/formatPrice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ShoppingBagIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ProductCarouselProps {
  items: MenuItemContent[];
  language: Language;
}

export default function ProductCarousel({ items, language }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartIndex = useRef(0);
  const dragMoved = useRef(false);
  const cartQuantities = useAppSelector((state) =>
    state.cart.items.reduce<Record<string, number>>((acc, ci) => {
      acc[String(ci.id)] = ci.quantity;
      return acc;
    }, {}),
  );
  const dispatch = useAppDispatch();
  const isRtl = language === 'fa';
  const activeItem = items[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  const step = useCallback((direction: number) => {
    setActiveIndex((current) => (current + direction + items.length) % items.length);
    setPinnedIndex(null);
  }, [items.length]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragStartX.current = event.clientX;
    dragStartIndex.current = activeIndex;
    dragMoved.current = false;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null || event.buttons !== 1) return;
    const deltaX = event.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 8) dragMoved.current = true;
    if (!dragMoved.current) return;
    const steps = Math.round(-deltaX / 80);
    setActiveIndex((dragStartIndex.current + steps % items.length + items.length) % items.length);
  };

  const handlePointerUp = () => {
    dragStartX.current = null;
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragMoved.current) {
      event.preventDefault();
      event.stopPropagation();
      dragMoved.current = false;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(isRtl ? -1 : 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(isRtl ? 1 : -1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(items.length - 1);
    }
  };

  const angle = items.length ? 360 / items.length : 0;
  const radius = useMemo(() => {
    if (items.length < 2) return 0;
    const cardWidth = 320;
    return Math.max(185, Math.round(cardWidth / (2 * Math.tan(Math.PI / items.length))));
  }, [items.length]);

  if (!items.length) {
    return (
      <div className="mx-auto flex min-h-48 w-full max-w-xl items-center justify-center px-6 text-center text-sm text-white/70">
        {isRtl ? 'در این دسته هنوز محصولی وجود ندارد.' : 'No products are available in this category yet.'}
      </div>
    );
  }

  return (
    <section
      aria-label={isRtl ? 'محصولات منو' : 'Menu products'}
      aria-roledescription={isRtl ? 'چرخ‌وفلک سه‌بعدی' : '3D carousel'}
      className="home-ring-carousel w-full px-3 pt-3 sm:px-5 sm:pt-5"
      dir={isRtl ? 'rtl' : 'ltr'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <style>{`
        .home-ring-stage { perspective: 1200px; perspective-origin: 50% 42%; touch-action: pan-y; cursor: grab; user-select: none; -webkit-user-select: none; }
        .home-ring-stage:active { cursor: grabbing; }
        .home-ring-stage img { -webkit-user-drag: none; }
        .home-ring { position: relative; width: 320px; height: 100%; transform-style: preserve-3d; transition: transform 750ms cubic-bezier(.2,.75,.2,1); }
        .home-ring-panel { position: absolute; inset: 0; width: 320px; height: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .home-ring-card { transform: perspective(900px) rotateX(0deg); transform-origin: 50% 0%; transition: transform 320ms ease, border-color 320ms ease; }
        .home-ring-panel[data-pinned="true"] .home-ring-card, .home-ring-card:focus-visible, .home-ring-card:focus-within { transform: perspective(900px) rotateX(7deg) translateY(3px); }
        .home-ring-pin { position: absolute; z-index: 5; left: 50%; top: -118px; width: min(280px, 90%); transform: translate(-50%, 12px); opacity: 0; pointer-events: none; transition: opacity 260ms ease, transform 320ms ease; }
        .home-ring-panel[data-pinned="true"] .home-ring-pin, .home-ring-panel:focus-within .home-ring-pin { opacity: 1; transform: translate(-50%, 0); }
        .home-ring-pin-label { position: relative; margin: 0 auto; max-width: 100%; border: 1px solid rgba(252,211,77,.32); border-radius: 14px; background: rgba(2,6,23,.96); padding: 10px 13px; color: rgba(255,255,255,.9); text-align: center; font-size: 12px; line-height: 1.55; box-shadow: 0 0 24px rgba(252,211,77,.12); }
        .home-ring-pin-stem { display: block; width: 2px; height: 28px; margin: 0 auto; background: linear-gradient(to bottom, rgba(252,211,77,.9), rgba(252,211,77,.35)); }
        .home-ring-pin-dot { display: block; width: 9px; height: 9px; margin: 0 auto; border-radius: 999px; background: #fcd34d; box-shadow: 0 0 0 4px rgba(252,211,77,.12), 0 0 18px rgba(252,211,77,.8); }
        .home-ring-carousel:focus-visible { outline: 2px solid #fcd34d; outline-offset: 5px; border-radius: 1rem; }
        @media (prefers-reduced-motion: reduce) {
          .home-ring { transform: none !important; transition: none !important; }
          .home-ring-panel { transform: none !important; opacity: 0; pointer-events: none; transition: opacity 180ms ease; }
          .home-ring-panel[data-active="true"] { opacity: 1; pointer-events: auto; }
          .home-ring-card, .home-ring-card *, .home-ring-pin { transition: none !important; animation: none !important; }
        }
      `}</style>

      <div
        className="home-ring-stage relative mx-auto h-[470px] w-full max-w-6xl sm:h-[510px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
      >
        <div
          className="home-ring mx-auto"
          style={{ transform: `translateZ(-${radius}px) rotateY(${-activeIndex * angle}deg)` }}
        >
          {items.map((item, index) => {
            const quantity = cartQuantities[String(item.id)] ?? 0;
            const name = item.name[language] || item.name.en;
            const description =
              typeof item.description === 'object'
                ? item.description[language] || item.description.en
                : item.description;
            const isActive = index === activeIndex;

            return (
              <div
                key={item.id}
                className="home-ring-panel"
                data-active={isActive}
                data-pinned={pinnedIndex === index}
                aria-hidden={!isActive}
                style={{ transform: `rotateY(${index * angle}deg) translateZ(${radius}px)` }}
              >
                {description && (
                  <div className="home-ring-pin" aria-live="polite">
                    <p className="home-ring-pin-label">{description}</p>
                    <span className="home-ring-pin-stem" aria-hidden="true" />
                    <span className="home-ring-pin-dot" aria-hidden="true" />
                  </div>
                )}
                <article
                  className="home-ring-card group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 text-white shadow-2xl shadow-black/30 backdrop-blur-xl hover:border-amber-300/30"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setPinnedIndex((current) => current === index ? null : index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setPinnedIndex((current) => current === index ? null : index);
                    }
                  }}
                  aria-label={isRtl ? `نمایش توضیحات ${name}` : `Show description for ${name}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/[0.06] to-slate-900 p-3 sm:p-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={name}
                        loading={Math.abs(index - activeIndex) < 2 ? 'eager' : 'lazy'}
                        className="h-full w-full rounded-2xl border border-white/10 bg-slate-950/40 object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-white/40">
                        {isRtl ? 'تصویری موجود نیست' : 'No image available'}
                      </div>
                    )}
                    {quantity > 0 && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-slate-950 shadow-lg">
                        <CheckIcon className="h-3.5 w-3.5" />
                        {quantity}
                      </span>
                    )}
                  </div>
                  <div className={`flex flex-1 flex-col p-4 sm:p-5 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-semibold leading-6 text-white sm:text-lg">{name}</h2>
                      <span className="shrink-0 rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs font-semibold text-amber-200">
                        {formatPrice(item.price, language)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => { event.stopPropagation(); dispatch(addToCart({ ...item, name, image: item.image ?? '' })); }}
                      tabIndex={isActive ? 0 : -1}
                      className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.99]"
                      aria-label={isRtl ? `افزودن ${name} به سبد خرید` : `Add ${name} to cart`}
                    >
                      <ShoppingBagIcon className="h-4 w-4" />
                      {isRtl ? 'افزودن به سبد خرید' : 'Add to cart'}
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl items-center justify-center gap-5 pb-3 pt-2 text-white">
        <button
          type="button"
          onClick={() => step(isRtl ? 1 : -1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-amber-300/60 hover:bg-amber-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          aria-label={isRtl ? 'محصول قبلی' : 'Previous product'}
        >
          {isRtl ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
        <p className="min-w-24 text-center text-xs font-medium text-white/65" aria-hidden="true">
          <span className="text-amber-200">{activeIndex + 1}</span> / {items.length}
        </p>
        <button
          type="button"
          onClick={() => step(isRtl ? -1 : 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-amber-300/60 hover:bg-amber-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          aria-label={isRtl ? 'محصول بعدی' : 'Next product'}
        >
          {isRtl ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
        </button>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {isRtl
          ? `محصول ${activeIndex + 1} از ${items.length}: ${activeItem?.name[language] || activeItem?.name.en || ''}`
          : `Product ${activeIndex + 1} of ${items.length}: ${activeItem?.name[language] || activeItem?.name.en || ''}`}
      </p>
      <p className="sr-only">
        {isRtl ? 'برای جابه‌جایی از کلیدهای جهت‌دار استفاده کنید.' : 'Use the arrow keys to navigate products. Home goes to the first product; End goes to the last.'}
      </p>
    </section>
  );
}
