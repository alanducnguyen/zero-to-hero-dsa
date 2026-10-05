import { cn } from '@/lib/cn';
import type { Level } from '@/engine/types';
import { levelById } from '@/content/levels';

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  const l = levelById(level);
  return <span className={cn('inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold text-white', className)} style={{ background: `var(--color-${l.color})` }}>{l.title}</span>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-fg-muted">{children}</span>;
}
