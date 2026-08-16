export type Pricing = 'Free' | 'Freemium' | 'Paid';

export interface Category {
  id: string;
  name: string;
  short: string;
  description: string;
  iconName: string;
}

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  categories: string[];
  pricing: Pricing;
  url: string;
  /** hex color used for the logo tile + accents */
  color: string;
  /** single-letter or short glyph shown in the logo tile */
  glyph: string;
  trending?: boolean;
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  { id: 'chat', name: 'Chat & General Assistants', short: 'Chat', description: 'Conversational AI for everyday questions and tasks.', iconName: 'MessageCircle' },
  { id: 'image', name: 'Image Generation', short: 'Image', description: 'Create original artwork and images from text.', iconName: 'Image' },
  { id: 'photo', name: 'Photo Editing & Enhancement', short: 'Photo', description: 'Edit, retouch, and enhance photos with AI.', iconName: 'Wand2' },
  { id: 'video', name: 'Video Generation & Editing', short: 'Video', description: 'Generate and edit video from text or footage.', iconName: 'Video' },
  { id: 'webdev', name: 'Website & App Development', short: 'Web Dev', description: 'Build websites and apps with AI assistance.', iconName: 'LayoutTemplate' },
  { id: 'writing', name: 'Writing & Content', short: 'Writing', description: 'Draft, rewrite, and polish written content.', iconName: 'PenLine' },
  { id: 'voice', name: 'Voice & Audio', short: 'Audio', description: 'Generate voiceovers, music, and audio.', iconName: 'Mic' },
  { id: 'coding', name: 'Coding Assistants', short: 'Coding', description: 'AI pair programmers and code completion.', iconName: 'Code2' },
  { id: 'research', name: 'Research & Data Analysis', short: 'Research', description: 'Find, summarize, and analyze information.', iconName: 'Search' },
  { id: 'design', name: 'Presentations & Design', short: 'Design', description: 'Create slides, decks, and visual designs.', iconName: 'Presentation' },
  { id: 'productivity', name: 'Productivity & Automation', short: 'Productivity', description: 'Automate workflows and busywork.', iconName: 'Workflow' },
  { id: 'marketing', name: 'Marketing & SEO', short: 'Marketing', description: 'Optimize content for search and campaigns.', iconName: 'TrendingUp' },
];

export const TOOLS: Tool[] = [
  // Chat & General Assistants
  { id: 'chatgpt', name: 'ChatGPT', tagline: 'General-purpose conversational assistant for any task.', categories: ['chat'], pricing: 'Freemium', url: 'https://chat.openai.com', color: '#10a37f', glyph: 'C', trending: true, featured: true },
  { id: 'claude', name: 'Claude', tagline: 'Thoughtful assistant great at long documents and reasoning.', categories: ['chat', 'writing'], pricing: 'Freemium', url: 'https://claude.ai', color: '#d97757', glyph: 'Cl', trending: true },
  { id: 'gemini', name: 'Gemini', tagline: "Google's multimodal assistant across text, image, and code.", categories: ['chat'], pricing: 'Freemium', url: 'https://gemini.google.com', color: '#4285f4', glyph: 'G' },
  { id: 'copilot-m365', name: 'Copilot', tagline: 'Microsoft AI assistant built into Office and Windows.', categories: ['chat', 'productivity'], pricing: 'Paid', url: 'https://copilot.microsoft.com', color: '#0078d4', glyph: 'Co' },
  { id: 'perplexity', name: 'Perplexity', tagline: 'Answer engine that cites live web sources.', categories: ['chat', 'research'], pricing: 'Freemium', url: 'https://perplexity.ai', color: '#20808d', glyph: 'P', trending: true },

  // Image Generation
  { id: 'midjourney', name: 'Midjourney', tagline: 'Best-in-class artistic image generation.', categories: ['image'], pricing: 'Paid', url: 'https://midjourney.com', color: '#4d4d4d', glyph: 'M', trending: true, featured: true },
  { id: 'dalle3', name: 'DALL·E 3', tagline: 'OpenAI image generator with strong prompt adherence.', categories: ['image'], pricing: 'Freemium', url: 'https://openai.com/dall-e-3', color: '#10a37f', glyph: 'D' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', tagline: 'Open-source image generation you can run locally.', categories: ['image'], pricing: 'Free', url: 'https://stability.ai', color: '#7c3aed', glyph: 'SD' },
  { id: 'ideogram', name: 'Ideogram', tagline: 'Image generation that nails legible text in images.', categories: ['image'], pricing: 'Freemium', url: 'https://ideogram.ai', color: '#ff3d57', glyph: 'Id' },
  { id: 'leonardo', name: 'Leonardo AI', tagline: 'Game-asset and illustration-focused image generation.', categories: ['image'], pricing: 'Freemium', url: 'https://leonardo.ai', color: '#9333ea', glyph: 'L' },
  { id: 'flux', name: 'FLUX', tagline: 'High-quality open image model for photoreal output.', categories: ['image'], pricing: 'Freemium', url: 'https://blackforestlabs.ai', color: '#111827', glyph: 'F' },

  // Photo Editing & Enhancement
  { id: 'photoshop-ai', name: 'Photoshop AI', tagline: 'Generative Fill and AI edits inside Photoshop.', categories: ['photo'], pricing: 'Paid', url: 'https://adobe.com/photoshop', color: '#31a8ff', glyph: 'Ps' },
  { id: 'remini', name: 'Remini', tagline: 'One-tap photo restoration and face enhancement.', categories: ['photo'], pricing: 'Freemium', url: 'https://remini.ai', color: '#ff6b6b', glyph: 'R' },
  { id: 'photoroom', name: 'Photoroom', tagline: 'Instant background removal and product photo studio.', categories: ['photo'], pricing: 'Freemium', url: 'https://photoroom.com', color: '#5b3df5', glyph: 'Ph' },
  { id: 'luminar', name: 'Luminar Neo', tagline: 'AI photo editor with sky and scene relighting.', categories: ['photo'], pricing: 'Paid', url: 'https://skylum.com/luminar', color: '#f59e0b', glyph: 'Ln' },
  { id: 'upscale', name: 'Upscayl', tagline: 'Free, local AI image upscaler for sharper photos.', categories: ['photo'], pricing: 'Free', url: 'https://upscayl.org', color: '#06b6d4', glyph: 'U' },

  // Video Generation & Editing
  { id: 'runway', name: 'Runway', tagline: 'Text-to-video and AI video editing suite.', categories: ['video'], pricing: 'Freemium', url: 'https://runwayml.com', color: '#22d3ee', glyph: 'Rw', trending: true, featured: true },
  { id: 'pika', name: 'Pika', tagline: 'Playful text-to-video clips and animation.', categories: ['video'], pricing: 'Freemium', url: 'https://pika.art', color: '#ff4d8d', glyph: 'Pk' },
  { id: 'sora', name: 'Sora', tagline: "OpenAI's high-fidelity text-to-video model.", categories: ['video'], pricing: 'Paid', url: 'https://openai.com/sora', color: '#10a37f', glyph: 'S', trending: true },
  { id: 'capcut-ai', name: 'CapCut AI', tagline: 'Free AI video editor with captions and effects.', categories: ['video'], pricing: 'Freemium', url: 'https://capcut.com', color: '#00d4aa', glyph: 'Cc' },
  { id: 'synthesia', name: 'Synthesia', tagline: 'AI avatar videos from a typed script.', categories: ['video'], pricing: 'Paid', url: 'https://synthesia.io', color: '#6366f1', glyph: 'Sy' },
  { id: 'descript', name: 'Descript', tagline: 'Edit video and podcasts by editing the transcript.', categories: ['video', 'voice'], pricing: 'Freemium', url: 'https://descript.com', color: '#ffd23f', glyph: 'De' },

  // Website & App Development
  { id: 'v0', name: 'v0', tagline: 'Generate UI components and pages from a prompt.', categories: ['webdev', 'coding'], pricing: 'Freemium', url: 'https://v0.dev', color: '#000000', glyph: 'v0', trending: true },
  { id: 'bolt', name: 'Bolt', tagline: 'Prompt-to-full-stack web app builder in the browser.', categories: ['webdev'], pricing: 'Freemium', url: 'https://bolt.new', color: '#0ea5e9', glyph: 'B', trending: true, featured: true },
  { id: 'lovable', name: 'Lovable', tagline: 'Chat to build and ship web apps end-to-end.', categories: ['webdev'], pricing: 'Freemium', url: 'https://lovable.dev', color: '#ec4899', glyph: 'Lv' },
  { id: 'cursor', name: 'Cursor', tagline: 'The AI-first code editor for fast development.', categories: ['webdev', 'coding'], pricing: 'Freemium', url: 'https://cursor.com', color: '#000000', glyph: 'Cu', trending: true },
  { id: 'replit-ai', name: 'Replit AI', tagline: 'Build and deploy apps with an AI agent in the cloud.', categories: ['webdev', 'coding'], pricing: 'Freemium', url: 'https://replit.com', color: '#f26207', glyph: 'Re' },
  { id: 'framer-ai', name: 'Framer AI', tagline: 'Generate and publish a website from a prompt.', categories: ['webdev', 'design'], pricing: 'Freemium', url: 'https://framer.com', color: '#0099ff', glyph: 'Fr' },

  // Writing & Content
  { id: 'jasper', name: 'Jasper', tagline: 'Marketing copy generator for brands and teams.', categories: ['writing', 'marketing'], pricing: 'Paid', url: 'https://jasper.ai', color: '#9333ea', glyph: 'J' },
  { id: 'copy-ai', name: 'Copy.ai', tagline: 'Go-to-market content and copy automation.', categories: ['writing', 'marketing'], pricing: 'Freemium', url: 'https://copy.ai', color: '#3b82f6', glyph: 'Cp' },
  { id: 'grammarly', name: 'Grammarly', tagline: 'Real-time grammar, tone, and clarity suggestions.', categories: ['writing'], pricing: 'Freemium', url: 'https://grammarly.com', color: '#15c39a', glyph: 'Gm' },
  { id: 'notion-ai', name: 'Notion AI', tagline: 'AI writing and Q&A built into your notes.', categories: ['writing', 'productivity'], pricing: 'Paid', url: 'https://notion.so/product/ai', color: '#111111', glyph: 'N' },

  // Voice & Audio
  { id: 'elevenlabs', name: 'ElevenLabs', tagline: 'Ultra-realistic AI voiceovers and voice cloning.', categories: ['voice'], pricing: 'Freemium', url: 'https://elevenlabs.io', color: '#e0e0e0', glyph: 'El', trending: true },
  { id: 'suno', name: 'Suno', tagline: 'Generate full songs from a text description.', categories: ['voice'], pricing: 'Freemium', url: 'https://suno.com', color: '#f97316', glyph: 'Sn', trending: true },
  { id: 'udio', name: 'Udio', tagline: 'High-quality AI music generation across genres.', categories: ['voice'], pricing: 'Freemium', url: 'https://udio.com', color: '#a855f7', glyph: 'Ud' },
  { id: 'play-ht', name: 'PlayHT', tagline: 'Real-time AI text-to-speech with many voices.', categories: ['voice'], pricing: 'Freemium', url: 'https://play.ht', color: '#22c55e', glyph: 'Pl' },

  // Coding Assistants
  { id: 'copilot-gh', name: 'GitHub Copilot', tagline: 'AI pair programmer inside your editor.', categories: ['coding'], pricing: 'Freemium', url: 'https://github.com/features/copilot', color: '#6e7681', glyph: 'Gh' },
  { id: 'claude-code', name: 'Claude Code', tagline: 'Agentic coding assistant for the terminal.', categories: ['coding'], pricing: 'Paid', url: 'https://claude.ai/code', color: '#d97757', glyph: 'Cc', trending: true },
  { id: 'codeium', name: 'Codeium', tagline: 'Free AI code completion across many editors.', categories: ['coding'], pricing: 'Freemium', url: 'https://codeium.com', color: '#09b6a2', glyph: 'Cx' },
  { id: 'tabnine', name: 'Tabnine', tagline: 'Privacy-first AI code completion for teams.', categories: ['coding'], pricing: 'Freemium', url: 'https://tabnine.com', color: '#6366f1', glyph: 'Tb' },
  { id: 'aider', name: 'Aider', tagline: 'Open-source AI coding agent in the terminal.', categories: ['coding'], pricing: 'Free', url: 'https://aider.chat', color: '#ef4444', glyph: 'Ai' },

  // Research & Data Analysis
  { id: 'elicit', name: 'Elicit', tagline: 'Automate literature review with academic papers.', categories: ['research'], pricing: 'Freemium', url: 'https://elicit.com', color: '#7c3aed', glyph: 'E' },
  { id: 'notebooklm', name: 'NotebookLM', tagline: 'Google research assistant grounded in your sources.', categories: ['research', 'productivity'], pricing: 'Free', url: 'https://notebooklm.google.com', color: '#4285f4', glyph: 'Nb', trending: true },
  { id: 'consensus', name: 'Consensus', tagline: 'Search engine for evidence-based answers.', categories: ['research'], pricing: 'Freemium', url: 'https://consensus.app', color: '#0ea5e9', glyph: 'Cs' },
  { id: 'eeve', name: 'Eeve', tagline: 'Ask questions across your uploaded documents.', categories: ['research'], pricing: 'Freemium', url: 'https://eeve.ai', color: '#f59e0b', glyph: 'Ev' },

  // Presentations & Design
  { id: 'gamma', name: 'Gamma', tagline: 'Generate polished decks and docs from a prompt.', categories: ['design'], pricing: 'Freemium', url: 'https://gamma.app', color: '#7c3aed', glyph: 'Gm', trending: true, featured: true },
  { id: 'beautiful-ai', name: 'Beautiful.ai', tagline: 'AI presentation maker with smart templates.', categories: ['design'], pricing: 'Paid', url: 'https://beautiful.ai', color: '#ec4899', glyph: 'Ba' },
  { id: 'canva-ai', name: 'Canva AI', tagline: 'Magic Design for slides, graphics, and branding.', categories: ['design', 'photo'], pricing: 'Freemium', url: 'https://canva.com/ai', color: '#00c4cc', glyph: 'Cv' },
  { id: 'tome', name: 'Tome', tagline: 'AI-native storytelling and deck creation.', categories: ['design'], pricing: 'Freemium', url: 'https://tome.app', color: '#6366f1', glyph: 'Tm' },

  // Productivity & Automation
  { id: 'zapier-ai', name: 'Zapier AI', tagline: 'Automate workflows across 6,000+ apps.', categories: ['productivity'], pricing: 'Freemium', url: 'https://zapier.com/ai', color: '#ff4a00', glyph: 'Z' },
  { id: 'make', name: 'Make', tagline: 'Visual no-code automation with AI steps.', categories: ['productivity'], pricing: 'Freemium', url: 'https://make.com', color: '#6d00cc', glyph: 'Mk' },
  { id: 'motion', name: 'Motion', tagline: 'AI calendar that auto-schedules your tasks.', categories: ['productivity'], pricing: 'Paid', url: 'https://usemotion.com', color: '#5b21b6', glyph: 'Mo' },

  // Marketing & SEO
  { id: 'surfer-seo', name: 'Surfer SEO', tagline: 'On-page SEO content optimizer and research.', categories: ['marketing'], pricing: 'Paid', url: 'https://surferseo.com', color: '#3b82f6', glyph: 'Sf' },
  { id: 'hubspot-ai', name: 'HubSpot AI', tagline: 'AI tools for CRM, content, and customer service.', categories: ['marketing'], pricing: 'Freemium', url: 'https://hubspot.com/ai', color: '#ff7a59', glyph: 'Hs' },
  { id: 'semrush-ai', name: 'Semrush AI', tagline: 'SEO and competitive research with AI insights.', categories: ['marketing'], pricing: 'Freemium', url: 'https://semrush.com', color: '#ff642d', glyph: 'Se' },
];

export function toolsByCategory(catId: string): Tool[] {
  return TOOLS.filter((t) => t.categories.includes(catId));
}

export function toolById(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}

export function categoryName(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.name ?? id;
}
