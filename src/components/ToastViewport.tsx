import { Check, AlertTriangle, Info } from 'lucide-react';
import type { Toast } from '@/hooks/useToasts';

interface ToastViewportProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

const config = {
  default: { icon: Info, ring: 'ring-ink-600', iconColor: 'text-ink-500' },
  success: { icon: Check, ring: 'ring-emerald-500/40', iconColor: 'text-emerald-400' },
  warning: { icon: AlertTriangle, ring: 'ring-amber-500/40', iconColor: 'text-amber-400' },
};

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => {
        const c = config[t.variant];
        const Icon = c.icon;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onDismiss(t.id)}
            className={`pointer-events-auto flex items-center gap-2.5 rounded-xl border border-ink-700 bg-ink-850/95 px-4 py-3 text-sm text-white shadow-2xl shadow-black/50 ring-1 ${c.ring} backdrop-blur-xl animate-toast-in`}
          >
            <Icon size={16} className={c.iconColor} />
            {t.message}
          </button>
        );
      })}
    </div>
  );
}
