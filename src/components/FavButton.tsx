import { Star } from 'lucide-react';

interface FavButtonProps {
  active: boolean;
  onClick: () => void;
  size?: number;
  className?: string;
  label?: string;
}

export function FavButton({ active, onClick, size = 18, className = '', label }: FavButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      aria-label={label ?? (active ? 'Remove from favorites' : 'Add to favorites')}
      aria-pressed={active}
      className={`group/fav inline-flex items-center justify-center rounded-lg transition-all hover:scale-110 active:scale-95 ${
        active ? 'text-amber-400' : 'text-ink-500 hover:text-amber-400'
      } ${className}`}
    >
      <Star
        size={size}
        strokeWidth={2}
        fill={active ? 'currentColor' : 'none'}
        className="transition-all"
      />
    </button>
  );
}
