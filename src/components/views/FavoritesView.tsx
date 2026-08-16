import { useMemo, useState } from 'react';
import { Heart, Trash2, Filter } from 'lucide-react';
import { TOOLS, CATEGORIES, type Tool } from '@/data/catalog';
import { ToolRow } from '../ToolRow';

interface FavoritesViewProps {
  favIds: string[];
  isFav: (id: string) => boolean;
  onToggleFav: (id: string) => void;
  onOpen: (tool: Tool) => void;
  onClear: () => void;
  onNotify: (msg: string, variant?: 'default' | 'success' | 'warning') => void;
}

export function FavoritesView({
  favIds,
  isFav,
  onToggleFav,
  onOpen,
  onClear,
  onNotify,
}: FavoritesViewProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const tools = useMemo<Tool[]>(() => {
    const list = favIds.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean) as Tool[];
    return filter ? list.filter((t) => t.categories.includes(filter)) : list;
  }, [favIds, filter]);

  const usedCats = CATEGORIES.filter((c) =>
    favIds.some((id) => TOOLS.find((t) => t.id === id)?.categories.includes(c.id)),
  );

  if (favIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-700 bg-ink-850/50 px-6 py-20 text-center animate-fade-in">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-800 text-ink-600">
          <Heart size={28} />
        </div>
        <h2 className="text-lg font-bold text-white">No favorites yet</h2>
        <p className="mt-1 max-w-sm text-sm text-ink-500">
          Tap the star icon on any tool to save it here. Your favorites stay available across
          visits on this device.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Favorites</h2>
          <p className="text-sm text-ink-500">
            {favIds.length} saved {favIds.length === 1 ? 'tool' : 'tools'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            onClear();
            onNotify('Cleared all favorites', 'default');
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 bg-ink-850 px-3 py-2 text-sm font-medium text-ink-500 transition-colors hover:border-red-500/40 hover:text-red-400"
        >
          <Trash2 size={15} />
          Clear all
        </button>
      </div>

      {/* Filter chips */}
      {usedCats.length > 1 && (
        <div className="mb-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="flex shrink-0 items-center gap-1 text-xs text-ink-600">
            <Filter size={13} /> Filter
          </span>
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === null ? 'bg-white text-ink-950' : 'bg-ink-800 text-ink-500 hover:text-white'
            }`}
          >
            All
          </button>
          {usedCats.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(filter === c.id ? null : c.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filter === c.id ? 'bg-accent-500 text-white' : 'bg-ink-800 text-ink-500 hover:text-white'
              }`}
            >
              {c.short}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <ToolRow
            key={t.id}
            tool={t}
            isFav={isFav(t.id)}
            onToggleFav={onToggleFav}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}
