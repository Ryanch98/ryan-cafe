import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { SparklesIcon, HeartIcon, GlobeAltIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function About() {
  const language = useAppSelector((state) => state.language.lang);
  const isRTL = language === 'fa';

  const features = isRTL
    ? [
        { title: 'کیفیت در هر فنجان', text: 'به انتخاب مواد اولیه و آماده‌سازی دقیق هر سفارش اهمیت می‌دهیم.', Icon: SparklesIcon },
        { title: 'ساخته‌شده برای دورهمی', text: 'کافه باید جایی برای مکث، گفت‌وگو و لحظه‌های خوب باشد.', Icon: HeartIcon },
        { title: 'انتخاب آگاهانه', text: 'به دنبال انتخاب‌های سنجیده‌تر و کاهش دورریز در کار روزانه هستیم.', Icon: GlobeAltIcon },
      ]
    : [
        { title: 'Quality in every cup', text: 'We care about thoughtful ingredients and the small details in every order.', Icon: SparklesIcon },
        { title: 'Made for connection', text: 'A cafe should be a place to pause, talk, and enjoy the little moments.', Icon: HeartIcon },
        { title: 'Mindful choices', text: 'We aim to make considered choices and reduce waste in our daily work.', Icon: GlobeAltIcon },
      ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="pb-8 text-white">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-900 shadow-2xl shadow-black/20">
        <div aria-hidden="true" className="absolute -left-16 -top-16 -z-10 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="grid items-center gap-8 p-5 sm:p-9 lg:grid-cols-2 lg:gap-12 lg:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">{isRTL ? 'داستان ما' : 'OUR STORY'}</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{isRTL ? 'قهوه‌ی خوب، لحظه‌های بهتر.' : 'Good coffee. Better moments.'}</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {isRTL
                ? 'ما باور داریم یک فنجان قهوه می‌تواند شروع یک گفت‌وگوی خوب، یک استراحت کوتاه یا خاطره‌ای ماندگار باشد. هدف ما فراهم‌کردن تجربه‌ای گرم، ساده و باکیفیت است.'
                : 'We believe a great cup of coffee can start a good conversation, create a quiet pause, or become a memorable part of the day. Our goal is to make that experience warm, simple, and consistently thoughtful.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/category/drinks" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">
                {isRTL ? 'دیدن منو' : 'Explore the menu'} <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a href="#contact" className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
                {isRTL ? 'ارتباط با ما' : 'Get in touch'}
              </a>
            </div>
          </div>
          <div className="relative">
            <img src="/pic/about-hero.jpg" alt={isRTL ? 'فضای کافه' : 'Cafe atmosphere'} className="aspect-[4/3] w-full rounded-3xl border border-white/10 bg-slate-800 object-cover shadow-2xl" />
            <div className="absolute -bottom-3 rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur ltr:left-3 rtl:right-3 sm:ltr:left-6 sm:rtl:right-6">
              <p className="text-sm font-semibold text-amber-200">{isRTL ? 'یک فنجان، یک مکث' : 'One cup. A little pause.'}</p>
              <p className="mt-1 text-xs text-slate-400">{isRTL ? 'هر روز، با دقت آماده می‌شود' : 'Thoughtfully made, every day'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, text, Icon }) => (
          <article key={title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-200"><Icon className="h-5 w-5" /></span>
            <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
          </article>
        ))}
      </section>

      <section id="contact" className="mt-6 rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-7">
        <h2 className="text-xl font-semibold">{isRTL ? 'در تماس باشیم' : 'Let’s keep in touch'}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
          {isRTL ? 'برای پرسش‌ها، سفارش‌های ویژه یا پیشنهادها، از راه ارتباطی زیر استفاده کن.' : 'For questions, special orders, or feedback, reach out using the contact details below.'}
        </p>
        <a href="mailto:hello@moderncafe.example" className="mt-4 inline-flex rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-amber-200 transition hover:border-amber-300/30 hover:bg-white/5">hello@moderncafe.example</a>
        <p className="mt-2 text-xs text-slate-500">{isRTL ? 'آدرس ایمیل نمونه است؛ قبل از انتشار آن را با ایمیل واقعی جایگزین کن.' : 'This is a placeholder email address; replace it with the real contact before launch.'}</p>
      </section>
    </div>
  );
}
