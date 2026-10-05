import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Clock } from 'lucide-react';
import type { Level } from '@/engine/types';
import { levelById } from '@/content/levels';
import { byLevel } from '@/content/registry';
import { useProgress } from '@/lib/progress';
import { Tag } from '@/components/Badge';

export function LevelPage() {
  const { level } = useParams<{ level: Level }>();
  const l = levelById(level as Level);
  const list = byLevel(l.id);
  const { completed } = useProgress();
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-xl font-mono text-lg font-bold text-white" style={{ background: `var(--color-${l.color})` }}>{l.order}</span>
        <div><h1 className="text-2xl font-bold">{l.title}</h1><p className="text-fg-muted">{l.description}</p></div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((m) => (
          <Link key={m.meta.id} to={`/algo/${m.meta.id}`} className="rounded-2xl border border-border p-4 transition hover:border-accent/50 hover:shadow-md">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1"><div className="font-semibold">{m.meta.title}</div><div className="mt-0.5 text-sm text-fg-muted">{m.meta.subtitle}</div></div>
              {completed[m.meta.id] ? <CheckCircle2 size={18} className="shrink-0 text-viz-done" /> : <Clock size={18} className="shrink-0 text-fg-muted/50" />}
            </div>
            <div className="mt-3 flex flex-wrap gap-1"><Tag>{m.meta.category}</Tag><Tag>{m.meta.complexity.time}</Tag><Tag>{m.meta.complexity.space}</Tag></div>
          </Link>
        ))}
        {list.length === 0 && <div className="text-sm text-fg-muted">Sắp có.</div>}
      </div>
    </div>
  );
}
