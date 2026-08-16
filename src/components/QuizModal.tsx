import { useEffect, useMemo, useState } from 'react';
import { X, Sparkles, ArrowRight, ArrowLeft, RefreshCw, Star, ExternalLink } from 'lucide-react';
import { CATEGORIES, TOOLS, type Tool } from '@/data/catalog';
import { ToolLogo } from './ToolLogo';
import { PricingBadge } from './PricingBadge';

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  onToggleFav: (id: string) => void;
  isFav: (id: string) => boolean;
  onOpenTool: (tool: Tool) => void;
  onNotify: (msg: string, variant?: 'default' | 'success' | 'warning') => void;
}

interface Question {
  id: string;
  prompt: string;
  options: { label: string; emoji: string; categories: string[] }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'task',
    prompt: 'What do you want to do?',
    options: [
      { label: 'Write or edit text', emoji: '✍️', categories: ['writing'] },
      { label: 'Create images or art', emoji: '🎨', categories: ['image', 'photo'] },
      { label: 'Make videos', emoji: '🎬', categories: ['video'] },
      { label: 'Build a website or app', emoji: '🛠️', categories: ['webdev', 'coding'] },
      { label: 'Research a topic', emoji: '🔍', categories: ['research', 'chat'] },
      { label: 'Automate busywork', emoji: '⚡', categories: ['productivity'] },
      { label: 'Market my product', emoji: '📈', categories: ['marketing'] },
      { label: 'Make a presentation', emoji: '📊', categories: ['design'] },
    ],
  },
  {
    id: 'voice',
    prompt: 'Do you need voice or audio?',
    options: [
      { label: 'Yes — voiceover or music', emoji: '🎙️', categories: ['voice'] },
      { label: 'No, text and visuals are fine', emoji: '🚫', categories: [] },
    ],
  },
  {
    id: 'budget',
    prompt: 'What is your budget?',
    options: [
      { label: 'Free only', emoji: '🆓', categories: [] },
      { label: 'Free is fine, I might pay', emoji: '💰', categories: [] },
      { label: 'Happy to pay for quality', emoji: '💎', categories: [] },
    ],
  },
];

export function QuizModal({ open, onClose, onToggleFav, isFav, onOpenTool, onNotify }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [budget, setBudget] = useState<'free' | 'any' | 'paid'>('any');

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setBudget('any');
  };

  const close = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const pick = (q: Question, opt: Question['options'][number]) => {
    if (q.id === 'budget') {
      if (opt.label.startsWith('Free only')) setBudget('free');
      else if (opt.label.startsWith('Happy to pay')) setBudget('paid');
      else setBudget('any');
    }
    setAnswers((prev) => ({ ...prev, [q.id]: opt.categories }));
    setStep((s) => s + 1);
  };

  const recommendations = useMemo<Tool[]>(() => {
    const allCats = Object.values(answers).flat();
    const catCounts = new Map<string, number>();
    allCats.forEach((c) => catCounts.set(c, (catCounts.get(c) ?? 0) + 1));

    let scored = TOOLS.map((t) => {
      let score = 0;
      t.categories.forEach((c) => score += (catCounts.get(c) ?? 0) * 2);
      if (t.trending) score += 1;
      if (t.featured) score += 1;
      if (budget === 'free' && t.pricing === 'Free') score += 3;
      if (budget === 'free' && t.pricing !== 'Free') score -= 4;
      if (budget === 'paid' && t.pricing === 'Paid') score += 1;
      return { t, score };
    });

    scored = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((s) => s.t);
  }, [answers, budget]);

  if (!open) return null;

  const done = step >= QUESTIONS.length;
  const progress = Math.min(step, QUESTIONS.length) / QUESTIONS.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-ink-700 bg-ink-850 shadow-2xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-700/60 px-6 py-4">
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-violet-500">
              <Sparkles size={15} />
            </div>
            <span className="text-sm font-semibold">Find My AI</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-ink-800 hover:text-white"
            aria-label="Close quiz"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-ink-800">
          <div
            className="h-full bg-gradient-to-r from-accent-400 to-violet-500 transition-all duration-300"
            style={{ width: `${done ? 100 : progress * 100}%` }}
          />
        </div>

        {!done ? (
          <div className="px-6 py-6">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-ink-600">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <h2 className="text-xl font-bold text-white">{QUESTIONS[step].prompt}</h2>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => pick(QUESTIONS[step], opt)}
                  className="flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-900/60 px-4 py-3 text-left text-sm font-medium text-white transition-all hover:border-accent-500/50 hover:bg-ink-800"
                >
                  <span className="text-lg">{opt.emoji}</span>
                  {opt.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 transition-colors hover:text-white"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
          </div>
        ) : (
          <div className="px-6 py-6">
            <h2 className="text-xl font-bold text-white">Your top picks</h2>
            <p className="mt-1 text-sm text-ink-500">
              Based on your answers, here are the AI tools we recommend.
            </p>
            <ul className="mt-4 space-y-2">
              {recommendations.map((tool) => {
                const fav = isFav(tool.id);
                return (
                  <li
                    key={tool.id}
                    className="flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-900/60 p-3"
                  >
                    <ToolLogo tool={tool} size={40} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-white">{tool.name}</div>
                      <div className="truncate text-xs text-ink-500">{tool.tagline}</div>
                      <div className="mt-1">
                        <PricingBadge pricing={tool.pricing} />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onToggleFav(tool.id);
                        onNotify(
                          fav ? `Removed ${tool.name} from favorites` : `Saved ${tool.name} to favorites`,
                          fav ? 'default' : 'success',
                        );
                      }}
                      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                      className={`shrink-0 rounded-lg p-2 transition-all hover:scale-110 active:scale-95 ${
                        fav ? 'text-amber-400' : 'text-ink-600 hover:text-amber-400'
                      }`}
                    >
                      <Star size={16} fill={fav ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenTool(tool);
                        close();
                      }}
                      className="shrink-0 rounded-lg bg-ink-800 p-2 text-ink-500 transition-colors hover:bg-ink-750 hover:text-white"
                      aria-label={`Open ${tool.name}`}
                    >
                      <ExternalLink size={15} />
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-300 transition-colors hover:text-accent-200"
            >
              <RefreshCw size={14} /> Retake quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// keep CATEGORIES import used (prevents tree-shake warning in some setups)
void CATEGORIES;
