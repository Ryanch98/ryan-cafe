import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '../../redux/hooks';
import { translations } from '../../redux/translations';
import type { Language } from '../../constants/types';
import CoffeeCard from './coffeeCard';

type direction = 'next' | 'prev';

type CoffeeDescriptionKey =
  | 'frenchCoffeeDescription'
  | 'TurkishCoffee'
  | 'EspressoCoffeeDescription';

type CoffeeData = {
  title: string;
  descriptionKey: CoffeeDescriptionKey;
  reverse: boolean;
  image: string;
};

export default function CoffeeStory() {
  const language = useAppSelector((state) => state.language.lang) as Language;
  const coffees: CoffeeData[] = [
    {
      title: translations[language].coffeeNames.french,
      descriptionKey: 'frenchCoffeeDescription',
      reverse: false,
      image: '/pic/french.png',
    },
    {
      title: translations[language].coffeeNames.turkish,
      descriptionKey: 'TurkishCoffee',
      image: '/pic/turkish.png',
      reverse: true,
    },
    {
      title: translations[language].coffeeNames.Espresso,
      descriptionKey: 'EspressoCoffeeDescription',
      image: '/pic/mokapot.png',
      reverse: false,
    },
  ];
  const [currentCard, setCurrentCard] = useState(0);

  const sectionRef = useRef(null);

  const handlerChangeCoffee = (direction: direction) => {
    if (direction === 'next') {
      setCurrentCard((prev) => Math.min(prev + 1, coffees.length - 1));
    } else {
      setCurrentCard((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100"
    >
      <div className="flex w-full sm:top-10 sm:items-start sm:justify-start sm:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <CoffeeCard
              key={currentCard}
              title={coffees[currentCard].title}
              description={
                translations[language][coffees[currentCard].descriptionKey] ??
                translations[language].descriptionUnavailable
              }
              reverse={coffees[currentCard].reverse}
              image={coffees[currentCard].image}
              onReachEnd={handlerChangeCoffee}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
