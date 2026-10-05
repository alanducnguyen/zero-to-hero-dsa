import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Bug, MessageSquare, RefreshCw } from 'lucide-react';
import type { AlgorithmModule } from '@/engine/types';
import { DebuggerPanel } from '@/debugger/DebuggerPanel';
import { Markdown } from '@/components/Markdown';
import { PRESETS, presetById } from '@/eventloop/presets';
import { generate } from '@/eventloop/scenario';
import { simulate } from '@/eventloop/simulate';
import content from '@/eventloop/content.md?raw';
import interview from '@/eventloop/interview.md?raw';
import { cn } from '@/lib/cn';

const TABS = [
  { id: 'debug', label: 'Mô phỏng', icon: Bug },
  { id: 'learn', label: 'Học', icon: BookOpen },
  { id: 'interview', label: 'Phỏng vấn', icon: MessageSquare },
] as const;
type TabId = (typeof TABS)[number]['id'];

function toModule(id: string): AlgorithmModule {
  const sc = presetById.get(id) ?? PRESETS[0];
  const { source } = generate(sc);
  return {
    meta: {
      id: `event-loop:${sc.id}`,
      title: sc.title,
      subtitle: sc.description,
      level: 'advanced',
      category: 'Node.js',
      tags: ['event-loop'],
      companies: [],
      complexity: { time: '—', space: '—' },
      inputs: [],
    },
    source,
    content: '',
    interview: '',
    run: () => { const g = simulate(sc); let r = g.next(); while (!r.done) r = g.next(); return r.value; },
    trace: () => simulate(sc),
  };
}

export function EventLoopPage() {
  const [sp, setSp] = useSearchParams();
  const tab = (sp.get('tab') as TabId) || 'debug';
  const presetId = sp.get('preset') ?? PRESETS[0].id;
  const [copied, setCopied] = useState(false);
  const mod = useMemo(() => toModule(presetId), [presetId]);
  const sc = presetById.get(presetId) ?? PRESETS[0];
  const set = (next: Record<string, string>) => setSp({ tab, preset: presetId, ...next }, { replace: true });

  return (
    <div className={cn('mx-auto px-4 py-6 md:px-8', tab === 'debug' ? 'max-w-[1600px]' : 'max-w-4xl')}>
      <div className="mb-4">
        <div className="mb-1 flex items-center gap-2 text-sm text-fg-muted"><RefreshCw size={16} className="text-accent" /> Node.js</div>
        <h1 className="text-2xl font-bold md:text-3xl">Event Loop</h1>
        <p className="mt-1 text-fg-muted">Call stack → nextTick → microtask → timers → poll → check. Chạy từng bước và xem callback nào tới lượt, vì sao.</p>
      </div>
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => set({ tab: t.id })} className={cn('-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition', tab === t.id ? 'border-accent text-accent' : 'border-transparent text-fg-muted hover:text-fg')}><t.icon size={15} />{t.label}</button>
        ))}
      </div>

      {tab === 'debug' && (
        <div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button key={p.id} type="button" onClick={() => set({ preset: p.id })} className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium transition', p.id === presetId ? 'border-accent bg-accent text-accent-fg' : 'border-border bg-surface hover:bg-surface-3')}>{p.title}</button>
            ))}
          </div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface-2/60 px-4 py-2 text-sm">
            <span><span className="font-semibold">{sc.title}.</span> {sc.description}{sc.nondeterministic && <span className="ml-1 text-viz-compare">Thứ tự timeout/immediate ở top-level có thể đảo ngoài đời.</span>}</span>
            <button type="button" onClick={() => navigator.clipboard.writeText(mod.source).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); })} className="rounded-lg border border-border px-2.5 py-1 text-xs hover:bg-surface-3">{copied ? 'Đã copy' : 'Copy code để chạy node'}</button>
          </div>
          <p className="mb-3 text-sm text-fg-muted">Phím tắt: <kbd className="rounded border border-border px-1 font-mono text-[11px]">←</kbd> <kbd className="rounded border border-border px-1 font-mono text-[11px]">→</kbd> bước, <kbd className="rounded border border-border px-1 font-mono text-[11px]">Space</kbd> chạy/dừng. Bấm "Mở rộng" ở khung Visualize để xem toàn màn hình.</p>
          <DebuggerPanel mod={mod} />
        </div>
      )}
      {tab === 'learn' && <Markdown>{content}</Markdown>}
      {tab === 'interview' && <Markdown>{interview}</Markdown>}
    </div>
  );
}
