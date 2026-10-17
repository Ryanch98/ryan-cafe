import { useCallback, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { Link } from 'react-router-dom';
import CoffeeStory from '../Components/coffeeStory/coffeeStory';
import { translations } from '../redux/translations';
import SignInModal from '../Components/SignInModal';
import HomeHeader from '../Components/home/HomeHeader';
import CategorySelector from '../Components/home/CategorySelector';
import ProductCarousel from '../Components/home/ProductCarousel';
import HomeQuote from '../Components/home/HomeQuote';
import { useCarouselAutoplay } from '../hooks/useCarouselAutoplay';
import {
  HOME_CAROUSEL_IMAGES,
  HOME_CATEGORY_MENU,
  CAROUSEL_AUTOPLAY_INTERVAL,
  DEFAULT_SELECTED_CATEGORY,
} from '../constants/homeConstants';
import type { CategoryData, Language } from '../constants/types';

export default function Home() {
  const language = useAppSelector((state) => state.language.lang) as Language;
  const menuItems = useAppSelector((state) => state.menu.menuItems) as CategoryData;
  const t = translations[language];

  // State management
  const [showSignIn, setShowSignIn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentIndex, setCommentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_SELECTED_CATEGORY);

  // Get selected category items
  const selectedCategoryItems = menuItems[selectedCategory]?.items || [];

  // Memoized handlers
  const handleSignIn = useCallback(() => {
    setShowSignIn(true);
  }, []);

  const handleSelectCategory = useCallback((categoryKey: string) => {
    setSelectedCategory(categoryKey);
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === HOME_CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1,
    );
    setCommentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
  }, []);

  // Custom hook for autoplay
  useCarouselAutoplay({
    isPaused,
    onNextSlide: handleNextSlide,
    interval: CAROUSEL_AUTOPLAY_INTERVAL,
    totalSlides: HOME_CAROUSEL_IMAGES.length,
  });

  return (
    <>
      <div
        className="relative min-h-screen w-full overflow-hidden bg-slate-950"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Hero Section */}
        <div className="absolute inset-0 hidden sm:block">
          <img
            src={HOME_CAROUSEL_IMAGES[currentImageIndex]}
            alt="Cafe background"
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 block bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 sm:hidden" />

        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen w-full flex-col justify-between gap-2 md:gap-4">
          {/* Header Section */}
          <HomeHeader signInText={t.signIn} aboutUsText={t.aboutUs} onSignIn={handleSignIn} />

          {/* Category Selector */}
          <CategorySelector
            items={HOME_CATEGORY_MENU}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* Product Carousel */}
          <ProductCarousel items={selectedCategoryItems} language={language} />

          {/* Quote Section */}
          <HomeQuote quoteText={t.quoteText} commentIndex={commentIndex} language={language} />
        </div>
      </div>

      {/* Coffee Story Section */}
      <CoffeeStory />

      {/* Editorial guide promotion */}
      <section dir={language === 'fa' ? 'rtl' : 'ltr'} className="relative overflow-hidden bg-gradient-to-br from-amber-950/70 via-slate-950 to-slate-900 px-5 py-14 text-white sm:px-10 sm:py-20">
        <div aria-hidden="true" className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">{language === 'fa' ? 'بیشتر درباره قهوه بدان' : 'BREW YOUR KNOWLEDGE'}</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">{language === 'fa' ? 'قهوه، فراتر از یک فنجان' : 'Coffee is more than a cup'}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">{language === 'fa' ? 'با فواید احتمالی قهوه، نقش کافئین و چند نکته ساده برای لذت‌بردن متعادل از نوشیدنی محبوبت آشنا شو.' : 'Explore potential benefits, understand caffeine, and find simple tips for enjoying your favourite drink mindfully.'}</p>
          </div>
          <Link to="/coffee-guide" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200">
            {language === 'fa' ? 'مطالعه راهنمای قهوه' : 'Read the coffee guide'} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Sign In Modal */}
      <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  );
}
