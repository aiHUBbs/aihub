import { Clock, X } from 'lucide-react';
import { TOOLS, type Tool } from '@/data/catalog';
import { ToolRow } from '../ToolRow';

interface RecentViewProps {
  recentIds: string[];
  isFav: (id: string) => boolean;
  onToggleFav: (id: string) => void;
  onOpen: (tool: Tool) => void;
  onClear: () => void;
}

export function RecentView({ recentIds, isFav, onToggleFav, onOpen, onClear }: RecentViewProps) {
  const tools = recentIds.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean) as Tool[];

  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-700 bg-ink-850/50 px-6 py-20 text-center animate-fade-in">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-800 text-ink-600">
          <Clock size={28} />
        </div>
        <h2 className="text-lg font-bold text-white">No recently viewed tools</h2>
        <p className="mt-1 max-w-sm text-sm text-ink-500">
          Tools you open will appear here so you can jump back to them quickly.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Recently viewed</h2>
          <p className="text-sm text-ink-500">{tools.length} tools</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 bg-ink-850 px-3 py-2 text-sm font-medium text-ink-500 transition-colors hover:border-red-500/40 hover:text-red-400"
        >
          <X size={15} />
          Clear
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <ToolRow
            key={t.id}
            tool={t}
            isFav={isFav(t.id)}
            onToggleFav={onToggleFav}
            onOpen={onOpen}
            showVisitedTime
          />
        ))}
      </div>
    </div>
  );
}
