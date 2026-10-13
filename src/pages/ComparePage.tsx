import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BookOpen, Bug, ExternalLink, GitCompare, ListOrdered, MessageSquare, Trophy } from 'lucide-react';
import { PROBLEMS, COMPARE_TAGS, problemById } from '@/compare/registry';
import { byPresentation, byRank, toModule } from '@/compare/toModule';
import type { CompareProblem, Difficulty, Solution } from '@/compare/types';
import { byId } from '@/content/registry';
import { DebuggerPanel } from '@/debugger/DebuggerPanel';
import { Markdown } from '@/components/Markdown';
import { Tag } from '@/components/Badge';
import { cn } from '@/lib/cn';

const TABS = [
  { id: 'problem', label: 'Đề bài', icon: BookOpen },
  { id: 'solutions', label: 'Lời giải', icon: Bug },
  { id: 'compare', label: 'So sánh & xếp hạng', icon: ListOrdered },
  { id: 'interview', label: 'Phỏng vấn', icon: MessageSquare },
] as const;
type TabId = (typeof TABS)[number]['id'];

const DIFF_CLASS: Record<Difficulty, string> = {
  Easy: 'bg-viz-done/15 text-viz-done border-viz-done/40',
  Medium: 'bg-viz-compare/15 text-viz-compare border-viz-compare/40',
  Hard: 'bg-viz-swap/15 text-viz-swap border-viz-swap/40',
};

export function DifficultyBadge({ d }: { d: Difficulty }) {
  return <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold', DIFF_CLASS[d])}>{d}</span>;
}

export function ComparePage() {
  const { id } = useParams();
  const current = id ? problemById.get(id) : undefined;
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  return current ? <ProblemDetail p={current} /> : <ProblemIndex />;
}

function ProblemIndex() {
  const [tag, setTag] = useState('all');
  const list = useMemo(() => PROBLEMS.filter((p) => tag === 'all' || p.tags.includes(tag)), [tag]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2 text-sm text-fg-muted"><GitCompare size={16} className="text-accent" /> Nhiều lời giải</div>
        <h1 className="text-3xl font-bold">Một bài toán, nhiều cách giải</h1>
        <p className="mt-2 max-w-3xl text-fg-muted">Phỏng vấn chấm điểm cách bạn <strong className="text-fg">đi từ brute force tới tối ưu</strong> và giải thích vì sao chọn cách này thay vì cách kia. Mỗi bài dưới đây có 3–4 lời giải, mỗi lời giải chạy được ở chế độ Debug, kèm bảng so sánh, xếp hạng và kịch bản trình bày.</p>
      </div>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {['all', ...COMPARE_TAGS].map((t) => (
          <button key={t} type="button" onClick={() => setTag(t)} className={cn('rounded-lg border px-2.5 py-1 text-xs transition', tag === t ? 'border-accent bg-accent text-accent-fg' : 'border-border bg-surface hover:bg-surface-3')}>{t === 'all' ? 'Tất cả' : t}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => {
          const best = byRank(p)[0];
          return (
            <Link key={p.id} to={`/compare/${p.id}`} className="flex flex-col rounded-2xl border border-border bg-surface p-4 transition hover:border-accent/50 hover:bg-surface-2">
              <div className="mb-2 flex items-center gap-2"><DifficultyBadge d={p.difficulty} /><span className="text-[11px] text-fg-muted">LeetCode #{p.leetcode.id}</span></div>
              <div className="font-semibold">{p.title}</div>
              <p className="mt-1 line-clamp-2 text-sm text-fg-muted">{p.subtitle}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="rounded-md bg-surface-3 px-1.5 py-0.5">{p.solutions.length} lời giải</span>
                <span className="inline-flex items-center gap-1 rounded-md border border-viz-done/40 bg-viz-done/10 px-1.5 py-0.5 text-viz-done"><Trophy size={11} /> {best.name} · {best.complexity.time}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ProblemDetail({ p }: { p: CompareProblem }) {
  const [sp, setSp] = useSearchParams();
  const tab = (TABS.some((t) => t.id === sp.get('tab')) ? sp.get('tab') : 'problem') as TabId;
  const presentation = byPresentation(p);
  const solId = sp.get('sol') ?? presentation[0].id;
  const sol = p.solutions.find((s) => s.id === solId) ?? presentation[0];
  const set = (next: Record<string, string>) => setSp({ tab, sol: sol.id, ...next }, { replace: true });
  const mod = toModule(p, sol); // React Compiler memo hoá; key={mod.meta.id} bên dưới đủ để reset panel
  const related = byId.get(p.id);
  const wide = tab === 'solutions';

  return (
    <div className={cn('mx-auto px-4 py-6 md:px-8', wide ? 'max-w-[1600px]' : 'max-w-4xl')}>
      <div className="mb-4">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <Link to="/compare" className="text-xs text-fg-muted hover:text-fg">← Nhiều lời giải</Link>
          <DifficultyBadge d={p.difficulty} />
          {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          <a href={`https://leetcode.com/problems/${p.leetcode.slug}/`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">LeetCode #{p.leetcode.id} <ExternalLink size={11} /></a>
          {related && <Link to={`/algo/${related.meta.id}`} className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[11px] font-medium text-accent hover:bg-accent/20">bài lý thuyết: {related.meta.title}</Link>}
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">{p.title}</h1>
        <p className="mt-1 text-fg-muted">{p.subtitle}</p>
      </div>

      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => set({ tab: t.id })} className={cn('-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition', tab === t.id ? 'border-accent text-accent' : 'border-transparent text-fg-muted hover:text-fg')}><t.icon size={15} />{t.label}</button>
        ))}
      </div>

      {tab === 'problem' && <Markdown>{p.statement}</Markdown>}

      {tab === 'solutions' && (
        <div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {presentation.map((s, i) => (
              <button key={s.id} type="button" onClick={() => set({ sol: s.id })} className={cn('inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition', s.id === sol.id ? 'border-accent bg-accent/12 text-accent' : 'border-border bg-surface hover:bg-surface-3')}>
                <span className="font-mono text-[11px] text-fg-muted">{i + 1}.</span> {s.name}
                {s.rank === 1 && <Trophy size={13} className="text-viz-done" />}
              </button>
            ))}
          </div>
          <SolutionCard s={sol} total={p.solutions.length} />
          <DebuggerPanel key={mod.meta.id} mod={mod} />
        </div>
      )}

      {tab === 'compare' && (
        <div className="prose-dsa">
          <h2>Bảng so sánh</h2>
          <table>
            <thead><tr><th>#</th><th>Lời giải</th><th>Thời gian</th><th>Bộ nhớ</th><th>Khi nào dùng</th></tr></thead>
            <tbody>
              {byRank(p).map((s) => (
                <tr key={s.id}>
                  <td>{s.rank === 1 ? '🏆 1' : s.rank}</td>
                  <td><button type="button" className="font-medium text-accent hover:underline" onClick={() => set({ tab: 'solutions', sol: s.id })}>{s.name}</button></td>
                  <td><code>{s.complexity.time}</code></td>
                  <td><code>{s.complexity.space}</code></td>
                  <td>{s.whenToUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Markdown>{p.comparison}</Markdown>
        </div>
      )}

      {tab === 'interview' && <Markdown>{p.interview}</Markdown>}
    </div>
  );
}

function SolutionCard({ s, total }: { s: Solution; total: number }) {
  return (
    <div className="mb-3 grid gap-3 rounded-2xl border border-border bg-surface-2/50 p-4 md:grid-cols-[1.2fr_1fr_1fr]">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className={cn('rounded-full border px-2 py-0.5 text-[11px] font-semibold', s.rank === 1 ? 'border-viz-done/40 bg-viz-done/15 text-viz-done' : 'border-border bg-surface text-fg-muted')}>Xếp hạng {s.rank}/{total}</span>
          <span className="font-mono text-xs">{s.complexity.time} · {s.complexity.space}</span>
        </div>
        <div className="font-semibold">{s.name}</div>
        <p className="mt-1 text-sm text-fg-muted">{s.approach}</p>
        <p className="mt-2 text-xs"><span className="font-semibold text-fg">Dùng khi:</span> <span className="text-fg-muted">{s.whenToUse}</span></p>
      </div>
      <div><div className="mb-1 text-xs font-semibold text-viz-done">Ưu</div><ul className="list-disc pl-4 text-sm text-fg-muted">{s.pros.map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div><div className="mb-1 text-xs font-semibold text-viz-swap">Nhược</div><ul className="list-disc pl-4 text-sm text-fg-muted">{s.cons.map((x) => <li key={x}>{x}</li>)}</ul></div>
    </div>
  );
}
