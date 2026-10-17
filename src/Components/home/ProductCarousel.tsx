import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import type { MenuItemContent, Language } from '../../constants/types';
import { SWIPER_CONFIG, SWIPER_COVERFLOW_SETTINGS } from '../../constants/homeConstants';
import { addToCart } from '../../redux/cartSlice';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ShoppingBagIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ProductCarouselProps {
  items: MenuItemContent[];
  language: Language;
}

export default function ProductCarousel({ items, language }: ProductCarouselProps) {
  const cartQuantities = useAppSelector((state) =>
    state.cart.items.reduce<Record<string, number>>((acc, ci) => {
      acc[String(ci.id)] = ci.quantity;
      return acc;
    }, {}),
  );
  const dispatch = useAppDispatch();

  if (!items.length) {
    return (
      <div className="mx-auto flex min-h-48 w-full max-w-xl items-center justify-center px-6 text-center text-sm text-white/70">
        {language === 'fa' ? 'در این دسته هنوز محصولی وجود ندارد.' : 'No products are available in this category yet.'}
      </div>
    );
  }

  return (
    <section aria-label={language === 'fa' ? 'محصولات منو' : 'Menu products'} className="w-full pt-3 sm:pt-5">
      <Swiper
        {...SWIPER_CONFIG}
        modules={[EffectCoverflow]}
        coverflowEffect={SWIPER_COVERFLOW_SETTINGS}
        breakpoints={{
          0: { slidesPerView: 1.25, spaceBetween: 14 },
          480: { slidesPerView: 1.8, spaceBetween: 18 },
          768: { slidesPerView: 2.3, spaceBetween: 22 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        style={{ padding: '12px 24px 24px' }}
        className="w-full overflow-visible"
      >
        {items.map((item) => {
          const quantity = cartQuantities[String(item.id)] ?? 0;
          const name = item.name[language] || item.name.en;
          const description =
            typeof item.description === 'object'
              ? item.description[language] || item.description.en
              : item.description;

          return (
            <SwiperSlide key={item.id}>
              <article className="group mx-auto flex h-full max-w-[320px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/65 text-white shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:shadow-2xl hover:shadow-black/30">
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      style={{ transform: undefined }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-white/40">
                      {language === 'fa' ? 'تصویری موجود نیست' : 'No image available'}
                    </div>
                  )}
                  {quantity > 0 && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-slate-950 shadow-lg">
                      <CheckIcon className="h-3.5 w-3.5" />
                      {quantity}
                    </span>
                  )}
                </div>
                <div className={`flex flex-1 flex-col p-4 sm:p-5 ${language === 'fa' ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-semibold leading-6 text-white sm:text-lg">{name}</h2>
                    <span className="shrink-0 rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs font-semibold text-amber-200">
                      {item.price.toLocaleString(language === 'fa' ? 'fa-IR' : 'en-US')}
                    </span>
                  </div>
                  {description && (
                    <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-white/60 sm:text-sm">
                      {description}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          ...item,
                          name,
                          image: item.image ?? '',
                        }),
                      )
                    }
                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.99]"
                    aria-label={language === 'fa' ? `افزودن ${name} به سبد خرید` : `Add ${name} to cart`}
                  >
                    <ShoppingBagIcon className="h-4 w-4" />
                    {language === 'fa' ? 'افزودن به سبد خرید' : 'Add to cart'}
                  </button>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
