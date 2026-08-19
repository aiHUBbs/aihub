import { useEffect, useRef, useState } from 'react';
import { Search, Sparkles, X, Command } from 'lucide-react';
import type { Tool } from '@/data/catalog';
import { ToolLogo } from './ToolLogo';
import { PricingBadge } from './PricingBadge';

interface TopBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  results: Tool[];
  onPickResult: (tool: Tool) => void;
  onOpenQuiz: () => void;
  onLogoClick: () => void;
}

export function TopBar({
  query,
  onQueryChange,
  results,
  onPickResult,
  onOpenQuiz,
  onLogoClick,
}: TopBarProps) {
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
      if (e.key === 'Escape') {
        onQueryChange('');
        (document.activeElement as HTMLElement | null)?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onQueryChange]);

  const showDropdown = focused && query.trim().length > 0;

  return (
    <header className="sticky top-0 z-40 hidden border-b border-ink-700/60 bg-ink-900/80 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 md:px-6">
        {/* Logo */}
        <button
          type="button"
          onClick={onLogoClick}
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-violet-500 text-white shadow-lg shadow-accent-500/20">
            <Sparkles size={18} strokeWidth={2.5} />
          </div>
          <span className="hidden text-lg font-bold tracking-tight text-white sm:block">
            AI<span className="text-gradient">Hub</span>
          </span>
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-2xl mx-auto">
          <div
            className={`flex items-center gap-2 rounded-xl border bg-ink-850 px-3 transition-colors ${
              focused ? 'border-accent-500/60 ring-2 ring-accent-500/20' : 'border-ink-700'
            }`}
          >
            <Search size={18} className="shrink-0 text-ink-500" />
            <input
              id="global-search"
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={() => {
                window.clearTimeout(blurTimer.current);
                setFocused(true);
              }}
              onBlur={() => {
                blurTimer.current = window.setTimeout(() => setFocused(false), 150);
              }}
              placeholder="Search 50+ AI tools…"
              className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-ink-500 focus:outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                className="shrink-0 text-ink-500 transition-colors hover:text-white"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            ) : (
              <kbd className="hidden shrink-0 items-center gap-0.5 rounded-md border border-ink-600 bg-ink-800 px-1.5 py-0.5 text-[10px] font-medium text-ink-500 md:flex">
                <Command size={10} /> K
              </kbd>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-ink-700 bg-ink-850 shadow-2xl shadow-black/40 animate-scale-in">
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-ink-500">
                  No tools match “{query}”.
                </div>
              ) : (
                <ul className="max-h-[60vh] overflow-y-auto scrollbar-thin">
                  {results.slice(0, 8).map((tool) => (
                    <li key={tool.id}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          onPickResult(tool);
                          onQueryChange('');
                          setFocused(false);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-ink-800"
                      >
                        <ToolLogo tool={tool} size={36} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-white">{tool.name}</div>
                          <div className="truncate text-xs text-ink-500">{tool.tagline}</div>
                        </div>
                        <PricingBadge pricing={tool.pricing} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Quiz CTA */}
        <button
          type="button"
          onClick={onOpenQuiz}
          className="hidden shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-500/20 transition-transform hover:scale-[1.03] active:scale-95 sm:flex"
        >
          <Sparkles size={16} />
          Find My AI
        </button>
      </div>
    </header>
  );
}
