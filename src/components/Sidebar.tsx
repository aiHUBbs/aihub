import { Home, Compass, Heart, Clock, Sparkles, LayoutGrid, X } from 'lucide-react';
import type { Category } from '@/data/catalog';
import { CATEGORIES } from '@/data/catalog';

export type View = 'discover' | 'dashboard' | 'favorites' | 'recent' | 'all';

interface SidebarProps {
  view: View;
  onViewChange: (v: View) => void;
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  favCount: number;
  recentCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenQuiz: () => void;
}

export function Sidebar({
  view,
  onViewChange,
  activeCategory,
  onCategoryChange,
  favCount,
  recentCount,
  mobileOpen,
  onCloseMobile,
  onOpenQuiz,
}: SidebarProps) {
  const navItems: { id: View; label: string; icon: typeof Home; badge?: number }[] = [
    { id: 'discover', label: 'Discover', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'favorites', label: 'Favorites', icon: Heart, badge: favCount },
    { id: 'recent', label: 'Recently Viewed', icon: Clock, badge: recentCount },
    { id: 'all', label: 'All Tools', icon: Compass },
  ];

  const handleNav = (v: View) => {
    onViewChange(v);
    onCategoryChange(null);
    onCloseMobile();
  };

  const handleCat = (id: string | null) => {
    if (id) onViewChange('discover');
    onCategoryChange(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 z-30 w-64 shrink-0 border-r border-ink-700/60 bg-ink-900 transition-transform md:top-16 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto scrollbar-thin px-3 py-4">
          {/* Mobile close */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="mb-2 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-ink-500 md:hidden"
          >
            <span>Menu</span>
            <X size={18} />
          </button>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.id && !activeCategory;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-accent-500/10 text-accent-300'
                      : 'text-ink-500 hover:bg-ink-800 hover:text-white'
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? 'text-accent-400' : 'text-ink-500 group-hover:text-white'}
                  />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        active ? 'bg-accent-500/20 text-accent-300' : 'bg-ink-800 text-ink-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="my-4 h-px bg-ink-700/60" />

          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
            Categories
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => handleCat(null)}
              className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                view === 'discover' && !activeCategory
                  ? 'text-white'
                  : 'text-ink-500 hover:bg-ink-800 hover:text-white'
              }`}
            >
              <LayoutGrid size={15} className="text-ink-600 group-hover:text-white" />
              All categories
            </button>
            {CATEGORIES.map((cat: Category) => {
              const active = view === 'discover' && activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCat(cat.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? 'bg-accent-500/10 text-accent-300'
                      : 'text-ink-500 hover:bg-ink-800 hover:text-white'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-accent-400' : 'bg-ink-600'}`}
                  />
                  {cat.short}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-6">
            <div className="rounded-xl border border-ink-700 bg-gradient-to-br from-ink-850 to-ink-900 p-4">
              <div className="flex items-center gap-2 text-accent-300">
                <Sparkles size={16} />
                <span className="text-sm font-semibold text-white">Not sure where to start?</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
                Take the 30-second quiz and we'll match you with the right tools.
              </p>
              <button
                type="button"
                onClick={() => {
                  onOpenQuiz();
                  onCloseMobile();
                }}
                className="mt-3 w-full rounded-lg bg-gradient-to-r from-accent-500 to-violet-500 px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
              >
                Take the quiz
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
