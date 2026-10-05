import { useEffect, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Bookmark, BookmarkCheck, BookOpen, Bug, Check, CheckCircle2, Code2, Copy, ExternalLink, MessageSquare } from 'lucide-react';
import { byId, ALGORITHMS } from '@/content/registry';
import { LevelBadge, Tag } from '@/components/Badge';
import { Markdown } from '@/components/Markdown';
import { DebuggerPanel } from '@/debugger/DebuggerPanel';
import { useProgress } from '@/lib/progress';
import { patternsForAlgorithm } from '@/content/patterns';
import { cn } from '@/lib/cn';

const TABS = [
  { id: 'learn', label: 'Học', icon: BookOpen },
  { id: 'debug', label: 'Debug', icon: Bug },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'interview', label: 'Phỏng vấn', icon: MessageSquare },
] as const;
type TabId = (typeof TABS)[number]['id'];

export function AlgorithmPage() {
  const { id } = useParams();
  const mod = id ? byId.get(id) : undefined;
  const [sp, setSp] = useSearchParams();
  const tab = (sp.get('tab') as TabId) || 'learn';
  const setTab = (t: TabId) => setSp({ tab: t }, { replace: true });
  const { completed, bookmarked, toggleCompleted, toggleBookmark } = useProgress();
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  if (!mod) return <Navigate to="/" replace />;
  const { meta } = mod;
  const idx = ALGORITHMS.indexOf(mod);
  const prev = ALGORITHMS[idx - 1], next = ALGORITHMS[idx + 1];
  const isDone = !!completed[meta.id];

  return (
    <div className={cn('mx-auto px-4 py-6 md:px-8', tab === 'debug' ? 'max-w-[1600px]' : 'max-w-4xl')}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2"><LevelBadge level={meta.level} /><Tag>{meta.category}</Tag>
            {patternsForAlgorithm(meta.id).map((p) => <Link key={p.id} to={`/patterns/${p.id}`} className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[11px] font-medium text-accent hover:bg-accent/20">pattern: {p.title}</Link>)}
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">{meta.title}</h1>
          <p className="mt-1 text-fg-muted">{meta.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => toggleBookmark(meta.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-surface-3">{bookmarked[meta.id] ? <BookmarkCheck size={16} className="text-viz-compare" /> : <Bookmark size={16} />}<span className="hidden sm:inline">Lưu</span></button>
          <button type="button" onClick={() => toggleCompleted(meta.id)} className={cn('inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm', isDone ? 'border-viz-done bg-viz-done/15 text-viz-done' : 'border-border hover:bg-surface-3')}>{isDone ? <CheckCircle2 size={16} /> : <Check size={16} />}{isDone ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[['Thời gian', meta.complexity.time], ['Bộ nhớ', meta.complexity.space], ['Tốt nhất', meta.complexity.best ?? '—'], ['Xấu nhất', meta.complexity.worst ?? '—']].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-border bg-surface-2/60 px-3 py-2"><div className="text-[11px] uppercase tracking-wider text-fg-muted">{k}</div><div className="font-mono text-sm font-semibold">{v}</div></div>
        ))}
      </div>

      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} className={cn('-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition', tab === t.id ? 'border-accent text-accent' : 'border-transparent text-fg-muted hover:text-fg')}><t.icon size={15} />{t.label}</button>
        ))}
      </div>

      {tab === 'learn' && <Markdown>{mod.content}</Markdown>}
      {tab === 'debug' && (
        <div>
          <p className="mb-3 text-sm text-fg-muted">Phím tắt: <kbd className="rounded border border-border px-1 font-mono text-[11px]">←</kbd> <kbd className="rounded border border-border px-1 font-mono text-[11px]">→</kbd> bước, <kbd className="rounded border border-border px-1 font-mono text-[11px]">Space</kbd> chạy/dừng, <kbd className="rounded border border-border px-1 font-mono text-[11px]">F8</kbd> tới breakpoint. Click vào lề trái số dòng để đặt breakpoint.</p>
          <DebuggerPanel mod={mod} />
        </div>
      )}
      {tab === 'code' && <CodeTab mod={mod} />}
      {tab === 'interview' && (
        <div>
          {meta.companies.length > 0 && <div className="mb-4 flex flex-wrap items-center gap-1.5 text-sm"><span className="text-fg-muted">Hay gặp ở:</span>{meta.companies.map((c) => <Tag key={c}>{c}</Tag>)}</div>}
          <Markdown>{mod.interview}</Markdown>
          {meta.leetcode && meta.leetcode.length > 0 && (
            <div className="mt-6 rounded-2xl border border-border bg-surface-2/50 p-4">
              <div className="mb-2 font-semibold">Bài LeetCode liên quan</div>
              <ul className="flex flex-col gap-1">{meta.leetcode.map((p) => <li key={p.id}><a className="inline-flex items-center gap-1 text-sm text-accent hover:underline" href={`https://leetcode.com/problems/${p.slug}/`} target="_blank" rel="noreferrer">#{p.id} {p.title} <ExternalLink size={12} /></a></li>)}</ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 flex justify-between gap-2 border-t border-border pt-4 text-sm">
        {prev ? <Link to={`/algo/${prev.meta.id}`} className="rounded-lg border border-border px-3 py-2 hover:bg-surface-3">← {prev.meta.title}</Link> : <span />}
        {next ? <Link to={`/algo/${next.meta.id}`} className="rounded-lg border border-border px-3 py-2 hover:bg-surface-3">{next.meta.title} →</Link> : <span />}
      </div>
    </div>
  );
}

function CodeTab({ mod }: { mod: NonNullable<ReturnType<typeof byId.get>> }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(mod.source).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  const path = `src/algorithms/${mod.meta.level}/${mod.meta.id}/impl.ts`;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between"><span className="font-mono text-xs text-fg-muted">{path}</span><button type="button" onClick={copy} className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs hover:bg-surface-3">{copied ? <Check size={12} /> : <Copy size={12} />}{copied ? 'Đã copy' : 'Copy'}</button></div>
      <Markdown>{'```ts\n' + mod.source + '\n```'}</Markdown>
      <h3 className="mt-6 mb-2 font-semibold">Chạy trên Node.js</h3>
      <Markdown>{`Clone repo, cài dependencies rồi chạy:\n\n\`\`\`bash\npnpm install\npnpm algo ${mod.meta.id}          # chạy với input mẫu\npnpm vitest run ${mod.meta.id}   # chạy test\n\`\`\`\n\nHoặc import trực tiếp trong code của bạn:\n\n\`\`\`ts\nimport { ${exportName(mod.source)} } from './${path}';\n\`\`\``}</Markdown>
    </div>
  );
}

function exportName(src: string) {
  return /export function\*? (\w+)/.exec(src)?.[1] ?? 'fn';
}
