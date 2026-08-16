import { useEffect } from 'react';
import { X, ExternalLink, Check, Flame, Star } from 'lucide-react';
import type { Tool } from '@/data/catalog';
import { categoryName } from '@/data/catalog';
import { ToolLogo } from './ToolLogo';
import { PricingBadge } from './PricingBadge';
import { FavButton } from './FavButton';

interface ToolModalProps {
  tool: Tool | null;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  onClose: () => void;
}

export function ToolModal({ tool, isFav, onToggleFav, onClose }: ToolModalProps) {
  useEffect(() => {
    if (!tool) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [tool, onClose]);

  if (!tool) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-ink-700 bg-ink-850 shadow-2xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent banner */}
        <div
          className="h-24 w-full"
          style={{
            background: `linear-gradient(135deg, ${tool.color}40, ${tool.color}10)`,
          }}
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg bg-ink-900/60 p-2 text-ink-500 transition-colors hover:bg-ink-800 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="px-6 pb-6">
          {/* Logo overlapping banner */}
          <div className="-mt-10 mb-4 flex items-end justify-between">
            <ToolLogo tool={tool} size={72} className="ring-4 ring-ink-850" />
            <FavButton
              active={isFav}
              onClick={() => onToggleFav(tool.id)}
              size={22}
              className="rounded-lg bg-ink-800 p-2"
              label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            />
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
            {tool.trending && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] font-semibold text-orange-400 ring-1 ring-orange-500/30">
                <Flame size={11} /> Trending
              </span>
            )}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-ink-500">{tool.tagline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <PricingBadge pricing={tool.pricing} />
            {tool.categories.map((c) => (
              <span
                key={c}
                className="rounded-full bg-ink-800 px-2.5 py-0.5 text-[11px] font-medium text-ink-500"
              >
                {categoryName(c)}
              </span>
            ))}
          </div>

          {/* Why it's great */}
          <div className="mt-5 rounded-xl border border-ink-700 bg-ink-900/60 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-600">
              Why people love it
            </h3>
            <ul className="mt-2 space-y-1.5">
              {FEATURES[tool.id]?.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink-500">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent-400" />
                  {f}
                </li>
              )) ?? (
                <li className="flex items-start gap-2 text-sm text-ink-500">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent-400" />
                  A capable, well-maintained tool in its category.
                </li>
              )}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-5 flex gap-3">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
            >
              Visit {tool.name}
              <ExternalLink size={16} />
            </a>
            <button
              type="button"
              onClick={() => onToggleFav(tool.id)}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                isFav
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                  : 'border-ink-600 bg-ink-800 text-white hover:bg-ink-750'
              }`}
            >
              <Star size={16} fill={isFav ? 'currentColor' : 'none'} />
              {isFav ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES: Record<string, string[]> = {
  chatgpt: ['Versatile across writing, coding, analysis, and brainstorming.', 'Huge ecosystem of plugins and custom GPTs.', 'Free tier covers most casual use.'],
  claude: ['Handles very long documents and complex reasoning well.', 'More nuanced, careful writing style.', 'Excellent for summarization and analysis.'],
  gemini: ['Deep integration with Google Workspace.', 'Multimodal — understands images and files.', 'Generous free tier.'],
  midjourney: ['Best artistic quality in the industry.', 'Strong, recognizable aesthetic.', 'Active community and prompts ecosystem.'],
  'dalle3': ['Excellent at following exact prompts.', 'Handles text inside images well.', 'Built into ChatGPT for iterative editing.'],
  'stable-diffusion': ['Open-source — run it locally for free.', 'Huge library of community models and styles.', 'No per-image cost when self-hosted.'],
  ideogram: ['Best at rendering legible text in images.', 'Great for logos, posters, and mockups.', 'Free daily generations.'],
  leonardo: ['Tailored for game assets and concept art.', 'Fine-tuned models for specific styles.', 'Active community asset library.'],
  flux: ['Photorealistic output quality.', 'Open weights for local deployment.', 'Strong prompt adherence.'],
  'photoshop-ai': ['Generative Fill seamlessly inside Photoshop.', 'Industry-standard editing tools.', 'Non-destructive AI workflow.'],
  remini: ['One-tap face and photo restoration.', 'Great for old or low-res photos.', 'Mobile-first and easy to use.'],
  photoroom: ['Instant, clean background removal.', 'Studio-quality product shots in seconds.', 'Batch editing for e-commerce.'],
  luminar: ['AI sky replacement and scene relighting.', 'One-click AI enhancements.', 'Works as standalone or plugin.'],
  upscale: ['Free and open-source upscaler.', 'Runs locally for privacy.', 'Batch processing support.'],
  runway: ['Full text-to-video and video-to-video suite.', 'Motion brush and camera controls.', 'Used in real film production.'],
  pika: ['Fun, fast text-to-video clips.', 'Great for animation and social content.', 'Easy region-based editing.'],
  sora: ['High-fidelity, coherent long video clips.', 'Strong understanding of physics and motion.', 'Integrated with ChatGPT.'],
  'capcut-ai': ['Free AI captions and effects.', 'Mobile and desktop editors.', 'Huge template library.'],
  synthesia: ['Professional AI avatar videos.', '140+ languages and voices.', 'No camera or studio needed.'],
  descript: ['Edit video by editing text.', 'Overdub and voice cloning.', 'All-in-one podcast and video tool.'],
  v0: ['Generates production-ready React components.', 'Iterate with natural language.', 'Great for rapid prototyping.'],
  bolt: ['Full-stack apps from a prompt.', 'Runs entirely in the browser.', 'Deploy with one click.'],
  lovable: ['Chat to build and ship full apps.', 'Handles database and auth for you.', 'Fast path from idea to production.'],
  cursor: ['AI-first editor with deep codebase context.', 'Multi-file edits and agent mode.', 'Works with your existing extensions.'],
  'replit-ai': ['Build and deploy from any browser.', 'AI agent handles setup and hosting.', 'Great for quick projects.'],
  'framer-ai': ['Generate and publish a site in minutes.', 'No-code design control.', 'Built-in hosting and CMS.'],
  jasper: ['Brand voice and campaign templates.', 'Built for marketing teams.', 'SEO-optimized output.'],
  'copy-ai': ['Go-to-market content automation.', 'Workflow templates for sales and marketing.', 'Free tier available.'],
  grammarly: ['Real-time grammar and clarity fixes.', 'Tone and style suggestions.', 'Works everywhere you write.'],
  'notion-ai': ['AI writing and Q&A inside your notes.', 'Summarize and extract from pages.', 'No context switching.'],
  elevenlabs: ['Most realistic AI voices available.', 'Voice cloning from a short sample.', 'Multilingual support.'],
  suno: ['Full songs from a text prompt.', 'Surprisingly good musical quality.', 'Fun and fast to iterate.'],
  udio: ['High-fidelity music across genres.', 'Fine control over structure and lyrics.', 'Active community.'],
  'play-ht': ['Real-time ultra-realistic TTS.', 'Huge voice library.', 'API for developers.'],
  'copilot-gh': ['AI pair programmer in your editor.', 'Suggests whole functions and tests.', 'Chat with your codebase.'],
  'claude-code': ['Agentic — edits across multiple files.', 'Runs in the terminal alongside git.', 'Great for refactors and features.'],
  codeium: ['Free AI completion across 40+ languages.', 'Fast inline suggestions.', 'Privacy-friendly option.'],
  tabnine: ['Privacy-first, trainable on your code.', 'Good for enterprise teams.', 'Works offline.'],
  aider: ['Open-source terminal coding agent.', 'Works directly with git.', 'Great for developers who love the CLI.'],
  elicit: ['Automates systematic literature review.', 'Extracts data from papers.', 'Saves hours of research time.'],
  notebooklm: ['Grounded in sources you upload.', 'Generates study guides and audio overviews.', 'Free from Google.'],
  consensus: ['Evidence-based answers from papers.', 'Great for scientific questions.', 'Saves research time.'],
  eeve: ['Chat with your own documents.', 'Fast and private.', 'Good for legal and academic docs.'],
  gamma: ['Polished decks from a prompt.', 'One-click restyle.', 'Export to PPTX or share link.'],
  'beautiful-ai': ['Smart templates that adapt to content.', 'Brand-consistent decks.', 'Team collaboration.'],
  'canva-ai': ['Magic Design for slides and graphics.', 'All-in-one design platform.', 'Huge template library.'],
  tome: ['AI-native storytelling format.', 'Great for pitch decks.', 'Fast from idea to deck.'],
  'zapier-ai': ['Connect 6,000+ apps with AI steps.', 'No-code automation.', 'Natural language workflow builder.'],
  make: ['Visual, powerful automation builder.', 'AI steps inside workflows.', 'Great for complex pipelines.'],
  motion: ['AI auto-schedules your tasks.', 'Calendar + task manager in one.', 'Great for busy teams.'],
  'surfer-seo': ['On-page SEO content optimizer.', 'Real-time content scoring.', 'SERP-based recommendations.'],
  'hubspot-ai': ['AI across CRM, content, and service.', 'Free CRM tier.', 'Good for growing teams.'],
  'semrush-ai': ['Competitive and keyword research.', 'AI content templates.', 'Industry-standard SEO toolkit.'],
  'copilot-m365': ['Built into Word, Excel, Outlook, Teams.', 'Summarize and draft across Office.', 'Enterprise-grade security.'],
  perplexity: ['Answers with cited web sources.', 'Great for factual research.', 'Follow-up questions.'],
};
