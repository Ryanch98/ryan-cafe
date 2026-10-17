import type { CategoryMenuItem, Language } from '../../constants/types';
import { useAppSelector } from '../../redux/hooks';
import { translations } from '../../redux/translations';

interface CategorySelectorProps {
  items: readonly CategoryMenuItem[];
  selectedCategory: string;
  onSelectCategory: (key: string) => void;
}

export default function CategorySelector({
  items,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  const language = useAppSelector((state) => state.language.lang) as Language;

  return (
    <nav aria-label="Browse menu categories" className="px-4 pt-5 sm:pt-8">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 sm:gap-6">
        {items.map((item) => {
          const isSelected = selectedCategory === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectCategory(item.key)}
              className={`group flex min-w-0 flex-1 max-w-40 flex-col items-center gap-2 rounded-2xl border px-3 py-3 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:gap-3 sm:rounded-3xl sm:px-5 sm:py-4 ${
                isSelected
                  ? 'border-amber-300/70 bg-amber-300/15 shadow-lg shadow-amber-950/20'
                  : 'border-white/10 bg-slate-950/35 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10'
              }`}
              aria-pressed={isSelected}
              aria-label={`Select ${translations[language][item.name]} category`}
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl transition sm:h-20 sm:w-20 ${
                isSelected ? 'bg-amber-300/15' : 'bg-white/5 group-hover:bg-white/10'
              }`}>
                <img
                  className="h-11 w-11 object-contain sm:h-16 sm:w-16"
                  src={item.pic.startsWith('/') ? item.pic : `/${item.pic}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              </span>
              <span className={`text-center text-xs font-semibold sm:text-sm ${
                isSelected ? 'text-amber-200' : 'text-white/85'
              }`}>
                {translations[language][item.name]}
              </span>
              <span className={`h-1 w-5 rounded-full transition-all ${
                isSelected ? 'w-8 bg-amber-300' : 'bg-transparent'
              }`} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
