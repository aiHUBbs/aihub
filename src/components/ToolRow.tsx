import { ArrowUpRight, Star, Clock } from 'lucide-react';
import type { Tool } from '@/data/catalog';
import { categoryName } from '@/data/catalog';
import { ToolLogo } from './ToolLogo';
import { PricingBadge } from './PricingBadge';

interface ToolRowProps {
  tool: Tool;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  onOpen: (tool: Tool) => void;
  showVisitedTime?: boolean;
}

export function ToolRow({ tool, isFav, onToggleFav, onOpen, showVisitedTime }: ToolRowProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(tool)}
      className="group flex w-full items-center gap-3 rounded-xl border border-ink-700/80 bg-ink-850 p-3 text-left transition-all hover:border-ink-600 hover:bg-ink-800"
    >
      <ToolLogo tool={tool} size={40} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-sm font-semibold text-white">{tool.name}</h3>
          <ArrowUpRight
            size={13}
            className="shrink-0 text-ink-600 transition-colors group-hover:text-accent-400"
          />
        </div>
        <p className="truncate text-xs text-ink-500">{tool.tagline}</p>
        <div className="mt-1 flex items-center gap-2">
          <PricingBadge pricing={tool.pricing} />
          <span className="text-[11px] text-ink-600">{categoryName(tool.categories[0])}</span>
          {showVisitedTime && (
            <span className="inline-flex items-center gap-1 text-[11px] text-ink-600">
              <Clock size={10} />
              Recently viewed
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onToggleFav(tool.id);
        }}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        className={`shrink-0 rounded-lg p-2 transition-all hover:scale-110 active:scale-95 ${
          isFav ? 'text-amber-400' : 'text-ink-600 hover:text-amber-400'
        }`}
      >
        <Star size={16} fill={isFav ? 'currentColor' : 'none'} />
      </button>
    </button>
  );
}
