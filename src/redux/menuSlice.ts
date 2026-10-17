import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedcategory: 'drinks',
  menuItems: {
    drinks: {
      title: {
        fa: 'نوشیدنی ها',
        en: 'Drinks',
      },
      items: [
        {
          id: 1,
          name: {
            fa: 'قهوه ترک',
            en: 'Turkish Coffee',
          },
          price: 50000,
          description: {
            fa: 'قهوه ترک سنتی با عطر و طعم غنی',
            en: 'Traditional Turkish coffee with a rich aroma and bold flavor.',
          },
          image: '/pic/iteams/turk.png',
        },
        {
          id: 2,
          name: {
            fa: 'اسپرسو',
            en: 'Espresso',
          },
          price: 35000,
          description: {
            fa: 'تک‌شات یا دبل‌شات عصاره غلیظ قهوه',
            en: 'A concentrated shot of coffee with a rich and intense taste.',
          },
          image: '/pic/iteams/espre.png',
        },
        {
          id: 3,
          name: {
            fa: 'لته',
            en: 'Latte',
          },
          price: 75000,
          description: {
            fa: 'اسپرسو همراه با شیر بخار داده شده و فوم کم',
            en: 'Espresso blended with steamed milk and a light layer of foam.',
          },
          image: '/pic/iteams/latte.png',
          scale: 1,
        },
        {
          id: 4,
          name: {
            fa: 'کاپوچینو',
            en: 'Cappuccino',
          },
          price: 75000,
          description: {
            fa: 'اسپرسو همراه با شیر و فوم غلیظ',
            en: 'Espresso topped with steamed milk and thick milk foam.',
          },
          image: '/pic/iteams/capo.png',
        },
        {
          id: 5,
          name: {
            fa: 'موکا',
            en: 'Mocha',
          },
          price: 85000,
          description: {
            fa: 'ترکیب اسپرسو، شکلات و شیر',
            en: 'A delicious blend of espresso, chocolate, and steamed milk.',
          },
          image: '/pic/iteams/mocha.png',
        },
        {
          id: 6,
          name: {
            fa: 'آمریکانو',
            en: 'Americano',
          },
          price: 55000,
          description: {
            fa: 'اسپرسو رقیق شده با آب داغ',
            en: 'Espresso diluted with hot water for a smooth coffee experience.',
          },
          image: '/pic/iteams/amer.png',
        },
        {
          id: 7,
          name: {
            fa: 'آیس لته',
            en: 'Iced Latte',
          },
          price: 80000,
          description: {
            fa: 'اسپرسو، شیر سرد و یخ',
            en: 'Chilled espresso mixed with cold milk and ice.',
          },
          image: '/pic/iteams/icel.png',
        },
        {
          id: 8,
          name: {
            fa: 'آیس موکا',
            en: 'Iced Mocha',
          },
          price: 80000,
          description: {
            fa: 'اسپرسو، شکلات، شیر سرد و یخ',
            en: 'A refreshing blend of espresso, chocolate, cold milk, and ice.',
          },
          image: '/pic/iteams/icem.png',
        },
        {
          id: 9,
          name: {
            fa: 'چای سبز',
            en: 'Green Tea',
          },
          price: 35000,
          description: {
            fa: 'چای سبز طبیعی با طعمی ملایم و آرامش‌بخش',
            en: 'Natural green tea with a light, refreshing, and soothing taste.',
          },
          image: '/pic/iteams/chay.png',
        },
        {
          id: 10,
          name: {
            fa: 'چای ماسالا',
            en: 'Masala Tea',
          },
          price: 45000,
          description: {
            fa: 'چای هندی معطر با ادویه‌های گرم',
            en: 'Traditional Indian tea infused with aromatic spices.',
          },
          image: '/pic/iteams/turk.png',
        },
      ],
    },

    foods: {
      title: {
        fa: 'غذاها',
        en: 'Foods',
      },
      items: [
        {
          id: 11,
          name: {
            fa: 'پیتزا مخصوص',
            en: 'Special Pizza',
          },
          price: 280000,
          description: {
            fa: 'ترکیبی از بهترین مواد اولیه، گوشت، قارچ و پنیر',
            en: 'Loaded with premium toppings, meat, mushrooms, and mozzarella cheese.',
          },
          image: '/pic/iteams/pizza/pz3.png',
        },
        {
          id: 12,
          name: {
            fa: 'پیتزا پپرونی',
            en: 'Pepperoni Pizza',
          },
          price: 260000,
          description: {
            fa: 'پپرونی تند و پنیر موزارلا',
            en: 'Classic pizza topped with spicy pepperoni and melted mozzarella.',
          },
          image: '/pic/iteams/pizza/pz2.png',
        },
        {
          id: 13,
          name: {
            fa: 'پیتزا مخلوط',
            en: 'Mixed Pizza',
          },
          price: 250000,
          description: {
            fa: 'ترکیب گوشت، مرغ، قارچ و فلفل دلمه‌ای',
            en: 'A flavorful combination of meat, chicken, mushrooms, and bell peppers.',
          },
          image: '/pic/iteams/pizza/pz2.png',
        },
        {
          id: 14,
          name: {
            fa: 'پیتزا بیف',
            en: 'Beef Pizza',
          },
          price: 340000,
          description: {
            fa: 'گوشت گریل شده با پنیر فراوان',
            en: 'Tender beef slices topped with rich melted cheese.',
          },
          image: '/pic/iteams/pizza/pz7.png',
        },
        {
          id: 15,
          name: {
            fa: 'پیتزا گوشت قارچ',
            en: 'Meat & Mushroom Pizza',
          },
          price: 260000,
          description: {
            fa: 'گوشت مزه‌دار شده همراه قارچ تازه',
            en: 'Seasoned meat combined with fresh mushrooms and cheese.',
          },
          image: '/pic/iteams/pizza/pz2.png',
        },
        {
          id: 16,
          name: {
            fa: 'پیتزا سبزیجات',
            en: 'Vegetable Pizza',
          },
          price: 190000,
          description: {
            fa: 'پیتزای سبک با سبزیجات تازه',
            en: 'Fresh vegetables on a crispy crust with mozzarella cheese.',
          },
          image: '/pic/iteams/pizza/pz2.png',
        },
        {
          id: 17,
          name: {
            fa: 'پیتزا مرغ قارچ',
            en: 'Chicken & Mushroom Pizza',
          },
          price: 240000,
          description: {
            fa: 'مرغ گریل شده همراه قارچ و پنیر',
            en: 'Grilled chicken, mushrooms, and melted mozzarella cheese.',
          },
          image: '/pic/iteams/pizza/pz2.png',
        },
        {
          id: 18,
          name: {
            fa: 'پیتزا ایتالیایی',
            en: 'Italian Pizza',
          },
          price: 290000,
          description: {
            fa: 'پیتزای اصیل ایتالیایی با خمیر نازک',
            en: 'Authentic Italian-style pizza with a thin crispy crust.',
          },
          image: '/pic/iteams/pizza/pz6.png',
        },
        {
          id: 19,
          name: {
            fa: 'پیتزا آمریکایی',
            en: 'American Pizza',
          },
          price: 280000,
          description: {
            fa: 'پیتزای ضخیم با پنیر فراوان و مواد متنوع',
            en: 'A hearty pizza with a thick crust and generous toppings.',
          },
          image: '/pic/iteams/pizza/pz2.png',
        },
        {
          id: 20,
          name: {
            fa: 'نان سیر',
            en: 'Garlic Bread',
          },
          price: 170000,
          description: {
            fa: 'نان تست شده با کره و سیر تازه',
            en: 'Toasted bread brushed with garlic butter and herbs.',
          },
          image: '/pic/iteams/pizza/pz2.png',
        },
      ],
    },

    cakes: {
      title: {
        fa: 'کیک و شیرینی',
        en: 'Cakes & Pastries',
      },
      items: [
        {
          id: 21,
          image: '/pic/croissant.png',
          name: {
            fa: 'کیک شکلاتی',
            en: 'Chocolate Cake',
          },
          price: 95000,
          description: {
            fa: 'کیک شکلاتی نرم با طعم غنی کاکائو',
            en: 'Moist chocolate cake made with rich cocoa flavor.',
          },
        },
        {
          id: 22,
          image: '/pic/croissant.png',
          name: {
            fa: 'کراسان شکلاتی',
            en: 'Chocolate Croissant',
          },
          price: 75000,
          description: {
            fa: 'کراسان کره‌ای با مغز شکلات',
            en: 'Buttery croissant filled with smooth chocolate.',
          },
        },
        {
          id: 23,
          image: '/pic/croissant.png',
          name: {
            fa: 'پن شکلاتی',
            en: 'Chocolate Roll',
          },
          price: 88000,
          description: {
            fa: 'نان رول شده با شکلات خوش‌طعم',
            en: 'Soft pastry roll layered with delicious chocolate.',
          },
        },
        {
          id: 24,
          image: '/pic/croissant.png',
          name: {
            fa: 'رول دارچین',
            en: 'Cinnamon Roll',
          },
          price: 86000,
          description: {
            fa: 'رول نرم با عطر دلپذیر دارچین',
            en: 'Freshly baked roll infused with aromatic cinnamon.',
          },
        },
        {
          id: 25,
          image: '/pic/croissant.png',
          name: {
            fa: 'کوکی کشمشی',
            en: 'Raisin Cookie',
          },
          price: 54000,
          description: {
            fa: 'کوکی خانگی با کشمش تازه',
            en: 'Homemade-style cookie packed with sweet raisins.',
          },
        },
        {
          id: 26,
          image: '/pic/croissant.png',
          name: {
            fa: 'کوکی شکلاتی',
            en: 'Chocolate Cookie',
          },
          price: 54000,
          description: {
            fa: 'کوکی ترد با تکه‌های شکلات',
            en: 'Crunchy cookie loaded with chocolate chunks.',
          },
        },
      ],
    },
  },
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedcategory = action.payload;
    },
  },
});

export const { setCategory } = menuSlice.actions;
export default menuSlice.reducer;
