import { Heart, Clock, TrendingUp, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES, TOOLS, type Tool } from '@/data/catalog';
import { ToolRow } from '../ToolRow';
import { ToolCard } from '../ToolCard';
import * as Icons from 'lucide-react';

interface DashboardViewProps {
  favIds: string[];
  recentIds: string[];
  isFav: (id: string) => boolean;
  onToggleFav: (id: string) => void;
  onOpen: (tool: Tool) => void;
  onNavigate: (view: 'favorites' | 'recent' | 'all') => void;
  onSeeAll: (catId: string) => void;
  onOpenQuiz: () => void;
}

export function DashboardView({
  favIds,
  recentIds,
  isFav,
  onToggleFav,
  onOpen,
  onNavigate,
  onSeeAll,
  onOpenQuiz,
}: DashboardViewProps) {
  const favTools = favIds.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean) as Tool[];
  const recentTools = recentIds.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean) as Tool[];
  const trending = TOOLS.filter((t) => t.trending).slice(0, 4);

  const favByCategory = CATEGORIES.map((cat) => ({
    cat,
    count: favTools.filter((t) => t.categories.includes(cat.id)).length,
  })).filter((x) => x.count > 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Heart} label="Favorites" value={favIds.length} accent="text-amber-400" onClick={() => onNavigate('favorites')} />
        <StatCard icon={Clock} label="Recently viewed" value={recentIds.length} accent="text-accent-400" onClick={() => onNavigate('recent')} />
        <StatCard icon={BarChart3} label="Tools in catalog" value={TOOLS.length} accent="text-violet-400" onClick={() => onNavigate('all')} />
        <StatCard icon={Sparkles} label="Categories" value={CATEGORIES.length} accent="text-emerald-400" onClick={onOpenQuiz} />
      </div>

      {/* Recently viewed */}
      <section>
        <SectionHeader
          title="Continue exploring"
          subtitle="Pick up where you left off."
          action={recentIds.length > 0 ? () => onNavigate('recent') : undefined}
          actionLabel="See all"
        />
        {recentTools.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="Nothing here yet"
            subtitle="Tools you open will show up here so you can find them again."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {recentTools.slice(0, 4).map((t) => (
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
        )}
      </section>

      {/* Your favorites */}
      <section>
        <SectionHeader
          title="Your favorites"
          subtitle="Quick access to the tools you've saved."
          action={favIds.length > 0 ? () => onNavigate('favorites') : undefined}
          actionLabel="See all"
        />
        {favTools.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            subtitle="Tap the star on any tool to save it here for easy access."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favTools.slice(0, 4).map((t) => (
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
      </section>

      {/* Favorite categories */}
      {favByCategory.length > 0 && (
        <section>
          <SectionHeader title="Your favorite categories" subtitle="Where your saved tools live." />
          <div className="flex flex-wrap gap-2">
            {favByCategory.map(({ cat, count }) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.iconName] ?? Icons.Box;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSeeAll(cat.id)}
                  className="flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-850 px-4 py-3 text-sm transition-colors hover:bg-ink-800"
                >
                  <Icon size={16} className="text-accent-400" />
                  <span className="font-medium text-white">{cat.short}</span>
                  <span className="rounded-full bg-ink-800 px-2 py-0.5 text-[11px] font-bold text-ink-500">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Trending */}
      <section>
        <SectionHeader
          title="Trending now"
          subtitle="Tools other people are loving."
          icon={TrendingUp}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trending.map((t) => (
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
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
  onClick,
}: {
  icon: Icons.LucideIcon;
  label: string;
  value: number;
  accent: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-2xl border border-ink-700/80 bg-ink-850 p-4 text-left transition-all hover:border-ink-600 hover:bg-ink-800"
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 ${accent}`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-ink-500">{label}</div>
      </div>
    </button>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
  actionLabel,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  action?: () => void;
  actionLabel?: string;
  icon?: Icons.LucideIcon;
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500/20 to-violet-500/20 text-accent-400">
            <Icon size={16} />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-xs text-ink-600">{subtitle}</p>
        </div>
      </div>
      {action && (
        <button
          type="button"
          onClick={action}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink-500 transition-colors hover:text-white"
        >
          {actionLabel} <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: Icons.LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-700 bg-ink-850/50 px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-800 text-ink-600">
        <Icon size={22} />
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <p className="mt-1 max-w-xs text-xs text-ink-500">{subtitle}</p>
    </div>
  );
}

