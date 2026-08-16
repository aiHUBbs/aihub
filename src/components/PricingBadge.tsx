import type { Pricing } from '@/data/catalog';

const styles: Record<Pricing, string> = {
  Free: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
  Freemium: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30',
  Paid: 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30',
};

export function PricingBadge({ pricing, className = '' }: { pricing: Pricing; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${styles[pricing]} ${className}`}
    >
      {pricing}
    </span>
  );
}
