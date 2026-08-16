import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/catalog';
import * as Icons from 'lucide-react';

interface CategoryStripProps {
  active: string | null;
  onChange: (id: string | null) => void;
}

export function CategoryStrip({ active, onChange }: CategoryStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-16 z-20 border-b border-ink-700/60 bg-ink-900/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 md:px-6">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="hidden shrink-0 rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-ink-800 hover:text-white md:block"
          aria-label="Scroll categories left"
        >
          <ChevronLeft size={18} />
        </button>
        <div
          ref={scrollRef}
          className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none py-3"
        >
          <button
            type="button"
            onClick={() => onChange(null)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active === null
                ? 'bg-white text-ink-950'
                : 'bg-ink-800 text-ink-500 hover:bg-ink-750 hover:text-white'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.iconName] ?? Icons.Box;
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange(isActive ? null : cat.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-500 text-white'
                    : 'bg-ink-800 text-ink-500 hover:bg-ink-750 hover:text-white'
                }`}
              >
                <Icon size={14} />
                {cat.short}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="hidden shrink-0 rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-ink-800 hover:text-white md:block"
          aria-label="Scroll categories right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
