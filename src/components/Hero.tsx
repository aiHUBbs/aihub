import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/data/catalog';

interface HeroProps {
  onBrowse: () => void;
  onQuiz: () => void;
}

export function Hero({ onBrowse, onQuiz }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-ink-700/60">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent-500/20 blur-[120px]" />
        <div className="absolute -top-10 right-1/4 h-64 w-64 rounded-full bg-violet-500/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-850/60 px-4 py-1.5 text-xs font-medium text-ink-500 backdrop-blur">
            <Zap size={13} className="text-accent-400" />
            {TOOLS.length}+ AI tools · updated weekly
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl">
            The directory for
            <br />
            <span className="text-gradient">every AI tool</span> you need
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-500 md:text-lg">
            Browse, compare, and bookmark the best AI products across {CATEGORIES.length} categories.
            Find the right tool for any task in seconds.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBrowse}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Browse the catalog
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={onQuiz}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-850/60 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-ink-800"
            >
              <Sparkles size={16} className="text-accent-400" />
              Find my AI match
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
