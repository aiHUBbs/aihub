import { useMemo, useState } from 'react';
import { Filter } from 'lucide-react';
import { TOOLS, CATEGORIES, type Pricing, type Tool } from '@/data/catalog';
import { ToolCard } from '../ToolCard';

interface AllToolsViewProps {
  isFav: (id: string) => boolean;
  onToggleFav: (id: string) => void;
  onOpen: (tool: Tool) => void;
  initialCategory?: string | null;
}

type SortKey = 'name' | 'trending';

export function AllToolsView({ isFav, onToggleFav, onOpen, initialCategory = null }: AllToolsViewProps) {
  const [cat, setCat] = useState<string | null>(initialCategory);
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [sort, setSort] = useState<SortKey>('trending');

  const tools = useMemo(() => {
    let list = [...TOOLS];
    if (cat) list = list.filter((t) => t.categories.includes(cat));
    if (pricing) list = list.filter((t) => t.pricing === pricing);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => Number(Boolean(b.trending)) - Number(Boolean(a.trending)));
    return list;
  }, [cat, pricing, sort]);

  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">All tools</h2>
        <p className="text-sm text-ink-500">Browse the full catalog of {TOOLS.length} AI tools.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="flex shrink-0 items-center gap-1 text-xs text-ink-600">
            <Filter size={13} /> Category
          </span>
          <button
            type="button"
            onClick={() => setCat(null)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              cat === null ? 'bg-white text-ink-950' : 'bg-ink-800 text-ink-500 hover:text-white'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(cat === c.id ? null : c.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                cat === c.id ? 'bg-accent-500 text-white' : 'bg-ink-800 text-ink-500 hover:text-white'
              }`}
            >
              {c.short}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-ink-600">Pricing</span>
          {(['Free', 'Freemium', 'Paid'] as Pricing[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPricing(pricing === p ? null : p)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                pricing === p ? 'bg-violet-500 text-white' : 'bg-ink-800 text-ink-500 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
          <span className="ml-3 text-xs text-ink-600">Sort</span>
          <button
            type="button"
            onClick={() => setSort(sort === 'trending' ? 'name' : 'trending')}
            className="rounded-full bg-ink-800 px-3 py-1 text-xs font-medium text-ink-500 transition-colors hover:text-white"
          >
            {sort === 'trending' ? 'Trending first' : 'A → Z'}
          </button>
        </div>
      </div>

      <div className="mb-3 text-sm text-ink-500">{tools.length} results</div>

      {tools.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-700 bg-ink-850/50 px-6 py-16 text-center text-sm text-ink-500">
          No tools match those filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((t) => (
            <ToolCard
              key={t.id}
              tool={t}
              isFav={isFav(t.id)}
              onToggleFav={onToggleFav}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}
