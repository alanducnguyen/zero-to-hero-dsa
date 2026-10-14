import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ALGORITHMS } from '@/content/registry';
import { PATTERNS } from '@/content/patterns';
import { PROBLEMS } from '@/compare/registry';
import { LevelBadge } from './Badge';
import type { Level } from '@/engine/types';
import { cn } from '@/lib/cn';

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

interface Entry { key: string; title: string; subtitle: string; to: string; level?: Level; badge?: string; text: string }
const ENTRIES: Entry[] = [
  ...ALGORITHMS.map((m) => ({ key: `algo:${m.meta.id}`, title: m.meta.title, subtitle: m.meta.subtitle, to: `/algo/${m.meta.id}`, level: m.meta.level, text: norm([m.meta.title, m.meta.subtitle, m.meta.category, ...m.meta.tags].join(' ')) })),
  ...PROBLEMS.map((p) => ({ key: `compare:${p.id}`, title: p.title, subtitle: p.subtitle, to: `/compare/${p.id}`, badge: 'Nhiều lời giải', text: norm([p.title, p.subtitle, ...p.tags, ...p.solutions.map((s) => s.name)].join(' ')) })),
  ...PATTERNS.map((p) => ({ key: `pattern:${p.id}`, title: p.title, subtitle: p.tagline, to: `/patterns/${p.id}`, badge: 'Pattern', text: norm([p.title, p.tagline, ...p.signals].join(' ')) })),
  { key: 'event-loop', title: 'Node.js Event Loop', subtitle: 'Mô phỏng call stack, nextTick, microtask, timers, poll, check', to: '/event-loop', badge: 'Node.js', text: norm('node.js event loop nexttick microtask settimeout setimmediate promise') },
];

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const nav = useNavigate();
  const results = useMemo(() => {
    const nq = norm(q.trim());
    return ENTRIES.filter((e) => !nq || e.text.includes(nq)).slice(0, 12);
  }, [q]);
  const go = (to: string) => { nav(to); onClose(); };
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 p-4 pt-[12vh]" onClick={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search size={16} className="text-fg-muted" />
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder="Tìm thuật toán, pattern, bài nhiều lời giải…" className="h-12 flex-1 bg-transparent text-sm outline-none"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(results.length - 1, s + 1)); }
              else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
              else if (e.key === 'Enter' && results[sel]) go(results[sel].to);
              else if (e.key === 'Escape') onClose();
            }} />
          <kbd className="rounded border border-border px-1.5 font-mono text-[10px] text-fg-muted">Esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-1.5">
          {results.map((m, i) => (
            <li key={m.key}>
              <button type="button" onMouseEnter={() => setSel(i)} onClick={() => go(m.to)} className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left', i === sel && 'bg-accent/12')}>
                <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{m.title}</div><div className="truncate text-xs text-fg-muted">{m.subtitle}</div></div>
                {m.level ? <LevelBadge level={m.level} /> : <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-fg-muted">{m.badge}</span>}
              </button>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-fg-muted">Không tìm thấy</li>}
        </ul>
      </div>
    </div>
  );
}
