import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Link } from 'react-router-dom';
import { clearCart, removeFromCart, updateQuantity } from '../redux/cartSlice';
import { translations } from '../redux/translations';
import formatPrice from '../utils/formatPrice';
import { ArrowLeftIcon, MinusIcon, PlusIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const language = useAppSelector((state) => state.language.lang);
  const t = translations[language];
  const isRTL = language === 'fa';
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-[65vh] pb-8 text-white">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">{t.cartTitleSmall}</p>
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{t.cartHeading}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{t.cartDescription}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">{totalItems} {t.itemsLabel}</span>
            <span className="rounded-full bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950">{formatPrice(totalPrice, language)}</span>
          </div>
        </div>
      </section>

      {cartItems.length === 0 ? (
        <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/60 px-5 py-14 text-center sm:py-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-300/10 text-amber-200"><ShoppingBagIcon className="h-8 w-8" /></div>
          <h2 className="mt-5 text-2xl font-semibold text-white">{t.cartEmptyTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">{t.cartEmptyDesc}</p>
          <Link to="/category/drinks" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">
            <ShoppingBagIcon className="h-4 w-4" />{t.selectProducts}
          </Link>
        </section>
      ) : (
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section aria-label={isRTL ? 'اقلام سبد خرید' : 'Cart items'} className="space-y-3">
            {cartItems.map((item) => (
              <article key={item.id} className="flex min-w-0 flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-white/15 sm:flex-row sm:items-center sm:p-5">
                <img src={item.image || '/pic/logo.png'} alt={item.name} loading="lazy" className="h-24 w-full rounded-2xl bg-slate-800 object-cover sm:h-24 sm:w-28" />
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="break-words text-lg font-semibold text-white">{item.name}</h2>
                      <p className="mt-1 text-sm text-slate-400">{t.unitPriceLabel}: {formatPrice(item.price, language)}</p>
                    </div>
                    <button type="button" onClick={() => dispatch(removeFromCart(item.id))} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-red-400/20 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-400/10" aria-label={isRTL ? 'حذف کالا' : 'Remove item'}>
                      <TrashIcon className="h-4 w-4" />{t.deleteItemLabel}
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 p-1.5">
                      <button type="button" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35" aria-label={isRTL ? 'کم کردن تعداد' : 'Decrease quantity'}><MinusIcon className="h-4 w-4" /></button>
                      <span className="min-w-6 text-center text-sm font-bold tabular-nums" aria-live="polite">{item.quantity}</span>
                      <button type="button" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10" aria-label={isRTL ? 'زیاد کردن تعداد' : 'Increase quantity'}><PlusIcon className="h-4 w-4" /></button>
                    </div>
                    <p className="text-sm font-bold text-amber-200">{t.totalLabel}: {formatPrice(item.price * item.quantity, language)}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-black/10 lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold text-white">{t.orderSummary}</h2>
            <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
              <span>{t.itemsLabel}</span><span className="font-semibold text-white">{totalItems}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
              <span>{t.totalLabel}</span><span className="text-xl font-bold text-amber-200">{formatPrice(totalPrice, language)}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">{isRTL ? 'هزینه نهایی ارسال یا پرداخت، در صورت فعال بودن، در مرحله تسویه مشخص می‌شود.' : 'Delivery or payment charges, if enabled, are confirmed at checkout.'}</p>
            <button type="button" onClick={() => dispatch(clearCart())} disabled={cartItems.length === 0} className="mt-6 w-full rounded-full border border-red-400/20 px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40">
              {isRTL ? 'خالی کردن سبد' : t.clearCart}
            </button>
            <Link to="/category/drinks" className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">
              <ArrowLeftIcon className="h-4 w-4" />{t.continueShopping}
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
