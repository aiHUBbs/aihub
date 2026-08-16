import { useCallback, useMemo, useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import type { Tool } from '@/data/catalog';
import { TOOLS } from '@/data/catalog';
import { useSet, useOrderedSet } from '@/hooks/useLocalStorage';
import { useToasts } from '@/hooks/useToasts';
import { TopBar } from '@/components/TopBar';
import { Sidebar, type View } from '@/components/Sidebar';
import { CategoryStrip } from '@/components/CategoryStrip';
import { Hero } from '@/components/Hero';
import { ToolCard } from '@/components/ToolCard';
import { ToolModal } from '@/components/ToolModal';
import { QuizModal } from '@/components/QuizModal';
import { ToastViewport } from '@/components/ToastViewport';
import { InstallPrompt } from '@/components/InstallPrompt';
import { DiscoverView } from '@/components/views/DiscoverView';
import { DashboardView } from '@/components/views/DashboardView';
import { FavoritesView } from '@/components/views/FavoritesView';
import { RecentView } from '@/components/views/RecentView';
import { AllToolsView } from '@/components/views/AllToolsView';

export default function App() {
  const [view, setView] = useState<View>('discover');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [allToolsInitialCat, setAllToolsInitialCat] = useState<string | null>(null);

  const favorites = useSet('aihub:favorites');
  const recent = useOrderedSet('aihub:recent', 30);
  const { toasts, notify, dismiss } = useToasts();

  const toggleFav = useCallback(
    (id: string) => {
      const tool = TOOLS.find((t) => t.id === id);
      const willAdd = !favorites.has(id);
      favorites.toggle(id);
      if (tool) {
        notify(
          willAdd ? `Saved ${tool.name} to favorites` : `Removed ${tool.name} from favorites`,
          willAdd ? 'success' : 'default',
        );
      }
    },
    [favorites, notify],
  );

  const openTool = useCallback(
    (tool: Tool) => {
      setSelectedTool(tool);
      recent.add(tool.id);
    },
    [recent],
  );

  // Search results for the top-bar dropdown
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.categories.some((c) => c.includes(q)),
    ).slice(0, 8);
  }, [query]);

  // Full-screen search mode
  const isSearching = query.trim().length > 0;
  const searchFullResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.categories.some((c) => c.includes(q)),
    );
  }, [query]);

  const handleSeeAll = useCallback((catId: string) => {
    setActiveCategory(catId);
    setView('discover');
    setAllToolsInitialCat(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavAll = useCallback(() => {
    setView('all');
    setAllToolsInitialCat(null);
  }, []);

  const goHome = useCallback(() => {
    setView('discover');
    setActiveCategory(null);
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);



  const showHero = view === 'discover' && !activeCategory && !isSearching;
  const showCategoryStrip = view === 'discover' && !isSearching;

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink-950 text-white">
      <TopBar
        query={query}
        onQueryChange={setQuery}
        results={searchResults}
        onPickResult={openTool}
        onOpenQuiz={() => setQuizOpen(true)}
        onLogoClick={goHome}
      />

      <div className="flex">
        <Sidebar
          view={view}
          onViewChange={(v) => {
            if (v === 'all') handleNavAll();
            else setView(v);
          }}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          favCount={favorites.size}
          recentCount={recent.size}
          mobileOpen={mobileNav}
          onCloseMobile={() => setMobileNav(false)}
          onOpenQuiz={() => setQuizOpen(true)}
        />

        <main className="min-h-[calc(100vh-4rem)] min-w-0 flex-1 md:ml-64">
          {/* Mobile nav button */}
          <div className="flex items-center justify-between px-4 pt-4 md:hidden">
            <button
              type="button"
              onClick={() => setMobileNav(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-850 px-3 py-2 text-sm font-medium text-white"
            >
              <Menu size={16} /> Menu
            </button>
            <button
              type="button"
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-500 to-violet-500 px-3 py-2 text-sm font-semibold text-white"
            >
              <Sparkles size={14} /> Find My AI
            </button>
          </div>

          {showHero && <Hero onBrowse={() => setView('all')} onQuiz={() => setQuizOpen(true)} />}

          {showCategoryStrip && (
            <CategoryStrip active={activeCategory} onChange={setActiveCategory} />
          )}

          <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6">
            {/* Search results override views */}
            {isSearching ? (
              <div className="animate-fade-in">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-white">
                    Search results for “{query}”
                  </h2>
                  <p className="text-sm text-ink-500">{searchFullResults.length} matches</p>
                </div>
                {searchFullResults.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-ink-700 bg-ink-850/50 px-6 py-16 text-center text-sm text-ink-500">
                    No tools match your search. Try a different keyword.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {searchFullResults.map((t) => (
                      <ToolCard
                        key={t.id}
                        tool={t}
                        isFav={favorites.has(t.id)}
                        onToggleFav={toggleFav}
                        onOpen={openTool}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : view === 'discover' ? (
              <DiscoverView
                activeCategory={activeCategory}
                isFav={favorites.has}
                onToggleFav={toggleFav}
                onOpen={openTool}
                onSeeAll={handleSeeAll}
              />
            ) : view === 'dashboard' ? (
              <DashboardView
                favIds={favorites.ids}
                recentIds={recent.ids}
                isFav={favorites.has}
                onToggleFav={toggleFav}
                onOpen={openTool}
                onNavigate={(v) => setView(v)}
                onSeeAll={handleSeeAll}
                onOpenQuiz={() => setQuizOpen(true)}
              />
            ) : view === 'favorites' ? (
              <FavoritesView
                favIds={favorites.ids}
                isFav={favorites.has}
                onToggleFav={toggleFav}
                onOpen={openTool}
                onClear={favorites.clear}
                onNotify={notify}
              />
            ) : view === 'recent' ? (
              <RecentView
                recentIds={recent.ids}
                isFav={favorites.has}
                onToggleFav={toggleFav}
                onOpen={openTool}
                onClear={recent.clear}
              />
            ) : view === 'all' ? (
              <AllToolsView
                isFav={favorites.has}
                onToggleFav={toggleFav}
                onOpen={openTool}
                initialCategory={allToolsInitialCat}
              />
            ) : null}
          </div>

          {/* Footer */}
          <footer className="border-t border-ink-700/60 px-4 py-8 md:px-6">
            <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 text-xs text-ink-600 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-accent-400 to-violet-500 text-white">
                  <Sparkles size={12} />
                </div>
                <span>AI Hub — your directory for AI tools</span>
              </div>
              <span>Bookmarks are stored on this device. Tool info may change over time.</span>
            </div>
            <div className="mt-2 text-center sm:mt-0">
              made by <span className="font-semibold text-ink-500">ANKRAT</span>{' '}
              <span className="text-ink-600">2521</span>
            </div>
            <p className="mt-1 text-center text-[10px] italic text-ink-700">
              with great power comes great responsibility
            </p>
          </footer>
        </main>
      </div>

      <ToolModal
        tool={selectedTool}
        isFav={selectedTool ? favorites.has(selectedTool.id) : false}
        onToggleFav={toggleFav}
        onClose={() => setSelectedTool(null)}
      />

      <QuizModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onToggleFav={toggleFav}
        isFav={favorites.has}
        onOpenTool={openTool}
        onNotify={notify}
      />

      <ToastViewport toasts={toasts} onDismiss={dismiss} />
      <InstallPrompt />
    </div>
  );
}
