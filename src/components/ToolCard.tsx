import { ArrowUpRight, Flame } from 'lucide-react';
import type { Tool } from '@/data/catalog';
import { ToolLogo } from './ToolLogo';
import { PricingBadge } from './PricingBadge';
import { FavButton } from './FavButton';

interface ToolCardProps {
  tool: Tool;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  onOpen: (tool: Tool) => void;
}

export function ToolCard({ tool, isFav, onToggleFav, onOpen }: ToolCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(tool)}
      className="group relative flex flex-col rounded-2xl border border-ink-700/80 bg-ink-850 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-ink-600 hover:shadow-xl hover:shadow-black/30"
    >
      {/* Top row: logo + favorite */}
      <div className="flex items-start justify-between">
        <ToolLogo tool={tool} size={44} />
        <FavButton active={isFav} onClick={() => onToggleFav(tool.id)} />
      </div>

      {/* Name + external link */}
      <div className="mt-3 flex items-center gap-1">
        <h3 className="truncate text-base font-semibold text-white">{tool.name}</h3>
        <ArrowUpRight
          size={15}
          className="shrink-0 text-ink-600 transition-all group-hover:text-accent-400"
        />
      </div>

      {/* Tagline */}
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-500">
        {tool.tagline}
      </p>

      {/* Footer: badges */}
      <div className="mt-3 flex items-center gap-2">
        <PricingBadge pricing={tool.pricing} />
        {tool.trending && (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] font-semibold text-orange-400 ring-1 ring-orange-500/30">
            <Flame size={10} />
            Trending
          </span>
        )}
      </div>
    </button>
  );
}
