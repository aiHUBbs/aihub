import type { Tool } from '@/data/catalog';

interface LogoProps {
  tool: Tool;
  size?: number;
  className?: string;
}

/** A colored tile with the tool's glyph — stands in for a real brand logo. */
export function ToolLogo({ tool, size = 44, className = '' }: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl font-bold text-white shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${tool.color}, ${tool.color}cc)`,
        fontSize: size * 0.36,
      }}
      aria-hidden
    >
      {tool.glyph}
    </div>
  );
}
