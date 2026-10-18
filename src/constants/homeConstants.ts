// Carousel images for home page hero section
export const HOME_CAROUSEL_IMAGES = [
  '/pic/pic1.jpg',
  '/pic/pic2.jpg',
  '/pic/pic3.jpg',
  '/pic/pic4.jpg',
  '/pic/pic5.jpg',
] as const;

// Category menu items for home page
export const HOME_CATEGORY_MENU = [
  {
    pic: 'pic/cake.svg',
    name: 'menuCakes',
    key: 'cakes',
  },
  {
    pic: 'pic/pizza.svg',
    name: 'menuFoods',
    key: 'foods',
  },
  {
    pic: 'pic/coffee.svg',
    name: 'menuDrinks',
    key: 'drinks',
  },
] as const;

// Carousel autoplay interval in milliseconds
export const CAROUSEL_AUTOPLAY_INTERVAL = 4000;

// Initial selected category
export const DEFAULT_SELECTED_CATEGORY = 'drinks';

// Swiper carousel settings
export const SWIPER_COVERFLOW_SETTINGS = {
  rotate: 0,
  stretch: 0,
  depth: 120,
  modifier: 2,
  scale: 0.8,
  slideShadows: false,
} as const;

export const SWIPER_CONFIG = {
  effect: 'coverflow' as const,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 2,
  initialSlide: 0,
  loop: true,
  spaceBetween: 24,
  slidesOffsetBefore: 24,
  slidesOffsetAfter: 24,
} as const;
