import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Link, useParams } from 'react-router-dom';
import { translations } from '../redux/translations';
import formatPrice from '../utils/formatPrice';
import { addToCart } from '../redux/cartSlice';
import { ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const CATEGORY_KEY_MAP: Record<string, string> = {
  'نوشیدنی ها': 'drinks',
  'نوشیدنی‌ها': 'drinks',
  drinks: 'drinks',
  غذاها: 'foods',
  غذا: 'foods',
  foods: 'foods',
  'کیک ها': 'cakes',
  'کیک‌ها': 'cakes',
  کیک: 'cakes',
  cakes: 'cakes',
};

export default function Category() {
  const dispatch = useAppDispatch();
  const { name = 'drinks' } = useParams();
  const menuItems = useAppSelector((state) => state.menu.menuItems);
  const language = useAppSelector((state) => state.language.lang);
  const cartItems = useAppSelector((state) => state.cart.items);
  const t = translations[language];
  const isRTL = language === 'fa';

  const categoryKey = CATEGORY_KEY_MAP[name] || name;
  const categoryEntry = menuItems[categoryKey];
  const categoryData = categoryEntry?.items || [];
  const categoryTitle =
    categoryEntry?.title && typeof categoryEntry.title === 'object'
      ? categoryEntry.title[language]
      : categoryEntry?.title || (isRTL ? 'منوی کافه' : 'Cafe menu');

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-[65vh] pb-8 text-white">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-900 px-5 py-10 shadow-2xl shadow-black/20 sm:px-10 sm:py-14">
        <div aria-hidden="true" className="absolute -right-10 -top-16 -z-10 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">{isRTL ? 'تازه و با عشق آماده شده' : 'Freshly made, thoughtfully served'}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">{categoryTitle}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          {t.categoryDescription || (isRTL ? 'چیز دلخواهت را انتخاب کن و به سبد خرید اضافه کن.' : 'Explore the menu, find your favorite, and add something delicious to your cart.')}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
            {categoryData.length} {isRTL ? 'محصول' : 'items'}
          </span>
          <Link to="/cart" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-200">
            <ShoppingBagIcon className="h-4 w-4" />
            {isRTL ? 'سبد خرید' : 'View cart'} ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </Link>
        </div>
      </section>

      {categoryData.length > 0 ? (
        <section aria-label={String(categoryTitle)} className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {categoryData.map((item) => {
            const itemName = typeof item.name === 'object' ? item.name[language] || item.name.en : item.name;
            const description = typeof item.description === 'object'
              ? item.description[language] || item.description.en
              : item.description || t.descriptionUnavailable;
            const quantity = cartItems.find((cartItem) => String(cartItem.id) === String(item.id))?.quantity || 0;

            return (
              <article key={item.id} className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:shadow-xl hover:shadow-black/20">
                <div className="relative aspect-[5/3] overflow-hidden bg-slate-800/80">
                  {item.image ? (
                    <img src={item.image} alt={itemName} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">{isRTL ? 'تصویر موجود نیست' : 'Image unavailable'}</div>
                  )}
                  {quantity > 0 && <span className="absolute top-3 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-slate-950 shadow-lg ltr:right-3 rtl:left-3">{isRTL ? `${quantity} عدد در سبد` : `${quantity} in cart`}</span>}
                </div>
                <div className={`flex flex-1 flex-col p-4 sm:p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-white">{itemName}</h2>
                    <span className="shrink-0 rounded-full bg-amber-300/10 px-3 py-1.5 text-sm font-bold text-amber-200">{formatPrice(item.price, language)}</span>
                  </div>
                  <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-6 text-slate-400">{description}</p>
                  <button
                    type="button"
                    onClick={() => dispatch(addToCart({ ...item, name: itemName, image: item.image ?? '' }))}
                    className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-[0.99]"
                  >
                    <ShoppingBagIcon className="h-4 w-4" />
                    {t.addToCartLabel}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="mt-7 rounded-3xl border border-white/10 bg-slate-900/60 px-5 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-300/10 text-amber-200"><ShoppingBagIcon className="h-7 w-7" /></div>
          <h2 className="mt-4 text-xl font-semibold text-white">{t.noItemsAvailable}</h2>
          <p className="mt-2 text-sm text-slate-400">{isRTL ? 'دسته‌ی دیگری را امتحان کن.' : 'Try browsing another category.'}</p>
          <Link to="/category/drinks" className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-white transition hover:border-amber-300/40 hover:text-amber-200">
            <ArrowLeftIcon className="h-4 w-4" />
            {isRTL ? 'مشاهده نوشیدنی‌ها' : 'Browse drinks'}
          </Link>
        </section>
      )}
    </div>
  );
}
