import { Star } from 'lucide-react';

export function Stars({ count = 5, size = 'h-4 w-4' }: { count?: number; size?: string }) {
  return (
    <div className="flex gap-0.5 text-[var(--onestop-star)]">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${size} fill-current`} />
      ))}
    </div>
  );
}
