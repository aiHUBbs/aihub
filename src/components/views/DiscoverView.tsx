import { TrendingUp, Flame, ArrowRight } from 'lucide-react';
import { CATEGORIES, TOOLS, toolsByCategory, type Tool } from '@/data/catalog';
import { ToolCard } from '../ToolCard';
import { ToolRow } from '../ToolRow';
import * as Icons from 'lucide-react';

interface DiscoverViewProps {
  activeCategory: string | null;
  isFav: (id: string) => boolean;
  onToggleFav: (id: string) => void;
  onOpen: (tool: Tool) => void;
  onSeeAll: (catId: string) => void;
}

export function DiscoverView({
  activeCategory,
  isFav,
  onToggleFav,
  onOpen,
  onSeeAll,
}: DiscoverViewProps) {
  // When a category is active, show just that category in full
  if (activeCategory) {
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    const tools = toolsByCategory(activeCategory);
    return (
      <div className="animate-fade-in">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">{cat?.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{cat?.description}</p>
        </div>
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
      </div>
    );
  }

  // Default: hero-like landing + trending + category rows
  const trending = TOOLS.filter((t) => t.trending).slice(0, 8);
  const featured = TOOLS.filter((t) => t.featured).slice(0, 4);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Featured */}
      {featured.length > 0 && (
        <section>
          <SectionHeader icon={Flame} title="Featured" subtitle="Hand-picked standouts this week." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((t) => (
              <ToolCard
                key={t.id}
                tool={t}
                isFav={isFav(t.id)}
                onToggleFav={onToggleFav}
                onOpen={onOpen}
              />
            ))}
          </div>
        </section>
      )}

      {/* Trending row */}
      <section>
        <SectionHeader icon={TrendingUp} title="Trending now" subtitle="What people are buzzing about." />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {trending.map((t) => (
            <ToolRow
              key={t.id}
              tool={t}
              isFav={isFav(t.id)}
              onToggleFav={onToggleFav}
              onOpen={onOpen}
            />
          ))}
        </div>
      </section>

      {/* Category sections */}
      {CATEGORIES.map((cat) => {
        const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.iconName] ?? Icons.Box;
        const tools = toolsByCategory(cat.id).slice(0, 4);
        if (tools.length === 0) return null;
        return (
          <section key={cat.id}>
            <div className="mb-4 flex items-end justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-800 text-accent-400">
                  <Icon size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                  <p className="text-xs text-ink-600">{cat.description}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSeeAll(cat.id)}
                className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink-500 transition-colors hover:text-white"
              >
                See all <ArrowRight size={14} />
              </button>
            </div>
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
          </section>
        );
      })}
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: Icons.LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500/20 to-violet-500/20 text-accent-400">
        <Icon size={16} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs text-ink-600">{subtitle}</p>
      </div>
    </div>
  );
}
