import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function CoffeeGuide() {
  const language = useAppSelector((state) => state.language.lang);
  const isRTL = language === 'fa';
  const sections = isRTL
    ? [
        { title: 'هوشیاری و تمرکز', text: 'کافئین می‌تواند در کوتاه‌مدت احساس خواب‌آلودگی را کمتر و هوشیاری را بیشتر کند؛ میزان اثر آن به بدن و مقدار مصرف بستگی دارد.' },
        { title: 'آنتی‌اکسیدان‌ها', text: 'قهوه حاوی ترکیبات زیست‌فعال و آنتی‌اکسیدان است، اما قهوه به‌تنهایی جایگزین رژیم غذایی متنوع و متعادل نیست.' },
        { title: 'لذتِ یک مکث', text: 'آماده‌کردن یک فنجان قهوه می‌تواند بخشی از یک عادت روزانه آرامش‌بخش و فرصتی برای مکث و ارتباط باشد.' },
      ]
    : [
        { title: 'Alertness and focus', text: 'Caffeine can temporarily reduce sleepiness and increase alertness. The effect varies with the person and the amount consumed.' },
        { title: 'Antioxidants', text: 'Coffee contains bioactive compounds and antioxidants, but it is not a substitute for a varied, balanced diet.' },
        { title: 'A moment to pause', text: 'Making a cup of coffee can be a comforting daily ritual and an opportunity to slow down and connect.' },
      ];
  return (
    <article dir={isRTL ? 'rtl' : 'ltr'} className="pb-10 text-white">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 p-6 sm:p-10 lg:p-14">
        <div aria-hidden="true" className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">{isRTL ? 'راهنمای قهوه' : 'THE COFFEE GUIDE'}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">{isRTL ? 'قهوه چه فایده‌هایی دارد؟' : 'What are the benefits of coffee?'}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">{isRTL ? 'قهوه فقط یک نوشیدنی خوش‌عطر نیست؛ برای بسیاری از ما بخشی از برنامه روزانه است. این راهنمای کوتاه نگاهی متعادل به چند نکته درباره قهوه دارد.' : 'Coffee is more than an aromatic drink; for many of us, it is part of a daily ritual. This short guide takes a balanced look at a few things worth knowing.'}</p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {sections.map((section, index) => (
          <div key={section.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300/10 text-lg font-black text-amber-200">0{index + 1}</span>
            <h2 className="mt-4 text-xl font-bold">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{section.text}</p>
          </div>
        ))}
      </section>
      <section className="mt-6 rounded-3xl border border-amber-200/15 bg-amber-300/[0.06] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-amber-100">{isRTL ? 'چند نکته برای مصرف متعادل' : 'A few tips for enjoying coffee mindfully'}</h2>
        <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-7 text-slate-300">
          {(isRTL ? ['به واکنش بدن خود و میزان کافئین توجه کن.', 'اگر کافئین خواب تو را مختل می‌کند، از نوشیدن آن در ساعات پایانی روز بپرهیز.', 'برای افراد حساس، باردار یا دارای شرایط پزشکی خاص، مقدار مناسب می‌تواند متفاوت باشد؛ در صورت نیاز از متخصص سلامت راهنمایی بگیر.'] : ['Pay attention to how your body responds and how much caffeine you consume.', 'If caffeine affects your sleep, avoid it later in the day.', 'Suitable intake can differ for people who are sensitive to caffeine, pregnant, or have specific health conditions; ask a healthcare professional if unsure.']).map((tip) => <li key={tip}>{tip}</li>)}
        </ul>
        <p className="mt-5 text-xs leading-6 text-slate-400">{isRTL ? 'این مطالب اطلاعات عمومی هستند و توصیه پزشکی محسوب نمی‌شوند.' : 'This page is for general information and is not medical advice.'}</p>
        <Link to="/category/drinks" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">{isRTL ? 'انتخاب نوشیدنی' : 'Explore drinks'} <span className="ms-2" aria-hidden="true">→</span></Link>
      </section>
    </article>
  );
}
