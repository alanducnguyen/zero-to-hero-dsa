import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, Briefcase, Compass, ExternalLink, ListChecks, Search, Shapes, Target } from 'lucide-react';
import { DECISION_TREE, PATTERNS, PATTERN_GROUPS, patternById, type Pattern } from '@/content/patterns';
import { byId } from '@/content/registry';
import { LevelBadge } from '@/components/Badge';
import { Markdown } from '@/components/Markdown';
import { cn } from '@/lib/cn';

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function PatternsPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<string>('all');
  const [picked, setPicked] = useState<Record<number, number | null>>({});
  const current = id ? patternById.get(id) : undefined;

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return PATTERNS.filter((p) => (group === 'all' || p.group === group) && (!nq || norm([p.title, p.tagline, ...p.signals].join(' ')).includes(nq)));
  }, [q, group]);

  // gợi ý từ cây quyết định: pattern xuất hiện ở nhiều lựa chọn nhất
  const suggested = useMemo(() => {
    const score = new Map<string, number>();
    Object.entries(picked).forEach(([qi, oi]) => {
      if (oi === null || oi === undefined) return;
      for (const pid of DECISION_TREE[Number(qi)].options[oi].patterns) score.set(pid, (score.get(pid) ?? 0) + 1);
    });
    return [...score.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([pid, s]) => ({ p: patternById.get(pid)!, s }));
  }, [picked]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2 text-sm text-fg-muted"><Shapes size={16} className="text-accent" /> Nhận diện pattern</div>
        <h1 className="text-3xl font-bold">Đọc đề → biết dùng gì</h1>
        <p className="mt-2 max-w-3xl text-fg-muted">Phỏng vấn không hỏi "hãy viết Dijkstra"; họ mô tả một tình huống và chờ bạn nhận ra pattern. Mỗi pattern dưới đây có <strong className="text-fg">dấu hiệu nhận biết</strong>, <strong className="text-fg">khi nào không dùng</strong>, khung code, ví dụ thực tế và liên kết tới bài có debug.</p>
      </div>

      {!current && (
        <section className="mb-8 rounded-2xl border border-border bg-surface-2/50 p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold"><Compass size={18} className="text-accent" /> Cây quyết định nhanh</div>
          <div className="grid gap-4 md:grid-cols-3">
            {DECISION_TREE.map((qn, qi) => (
              <div key={qi}>
                <div className="mb-2 text-sm font-medium">{qi + 1}. {qn.question}</div>
                <div className="flex flex-wrap gap-1.5">
                  {qn.options.map((o, oi) => (
                    <button key={oi} type="button" onClick={() => setPicked({ ...picked, [qi]: picked[qi] === oi ? null : oi })}
                      className={cn('rounded-lg border px-2.5 py-1 text-xs transition', picked[qi] === oi ? 'border-accent bg-accent text-accent-fg' : 'border-border bg-surface hover:bg-surface-3')}>{o.label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {suggested.length > 0 && (
            <div className="mt-4 border-t border-border pt-3">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-muted">Gợi ý (khớp nhiều tiêu chí nhất trước)</div>
              <div className="flex flex-wrap gap-2">
                {suggested.map(({ p, s }) => (
                  <Link key={p.id} to={`/patterns/${p.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/20">{p.title}<span className="rounded bg-accent/20 px-1 font-mono text-[10px]">{s}</span></Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-border bg-surface px-2">
            <Search size={14} className="text-fg-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo dấu hiệu…" className="h-9 w-full bg-transparent text-sm outline-none" />
          </div>
          <div className="mb-3 flex flex-wrap gap-1">
            {['all', ...PATTERN_GROUPS].map((g) => (
              <button key={g} type="button" onClick={() => setGroup(g)} className={cn('rounded-md px-2 py-0.5 text-[11px]', group === g ? 'bg-accent text-accent-fg' : 'bg-surface-3 hover:bg-border')}>{g === 'all' ? 'Tất cả' : g}</button>
            ))}
          </div>
          <ul className="flex max-h-[60vh] flex-col gap-0.5 overflow-y-auto pr-1">
            {list.map((p) => (
              <li key={p.id}>
                <Link to={`/patterns/${p.id}`} className={cn('block rounded-lg px-3 py-2 text-sm transition', current?.id === p.id ? 'bg-accent/12 font-medium text-accent' : 'hover:bg-surface-3')}>
                  <div>{p.title}</div>
                  <div className="truncate text-[11px] text-fg-muted">{p.group}</div>
                </Link>
              </li>
            ))}
            {list.length === 0 && <li className="px-3 py-4 text-sm text-fg-muted">Không có pattern khớp.</li>}
          </ul>
        </aside>

        <main className="min-w-0">
          {current ? <PatternDetail p={current} /> : (
            <div className="grid gap-3 sm:grid-cols-2">
              {list.map((p) => (
                <button key={p.id} type="button" onClick={() => nav(`/patterns/${p.id}`)} className="rounded-2xl border border-border p-4 text-left transition hover:border-accent/50 hover:shadow-md">
                  <div className="mb-1 text-[11px] uppercase tracking-wider text-fg-muted">{p.group}</div>
                  <div className="font-semibold">{p.title}</div>
                  <p className="mt-1 text-sm text-fg-muted">{p.tagline}</p>
                  <div className="mt-3 text-xs text-fg-muted"><span className="font-medium text-fg">Dấu hiệu:</span> {p.signals[0]}</div>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Section({ icon, title, children, tone }: { icon: React.ReactNode; title: string; children: React.ReactNode; tone?: 'good' | 'bad' }) {
  return (
    <section className={cn('rounded-2xl border p-4', tone === 'good' ? 'border-viz-done/40 bg-viz-done/5' : tone === 'bad' ? 'border-viz-swap/40 bg-viz-swap/5' : 'border-border')}>
      <div className="mb-2 flex items-center gap-2 font-semibold">{icon}{title}</div>
      {children}
    </section>
  );
}

function PatternDetail({ p }: { p: Pattern }) {
  const algos = p.algorithms.map((id) => byId.get(id)).filter((m): m is NonNullable<typeof m> => !!m);
  return (
    <article className="flex flex-col gap-4">
      <div>
        <div className="mb-1 text-[11px] uppercase tracking-wider text-fg-muted">{p.group}</div>
        <h2 className="text-2xl font-bold">{p.title}</h2>
        <p className="mt-1 text-fg-muted">{p.tagline}</p>
        <div className="mt-2 inline-block rounded-md bg-surface-3 px-2 py-0.5 font-mono text-xs">{p.complexity}</div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Section icon={<Target size={16} className="text-viz-done" />} title="Dấu hiệu nhận biết" tone="good">
          <ul className="list-disc space-y-1 pl-5 text-sm">{p.signals.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </Section>
        <Section icon={<AlertTriangle size={16} className="text-viz-swap" />} title="Khi nào KHÔNG dùng" tone="bad">
          <ul className="list-disc space-y-1 pl-5 text-sm">{p.avoid.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </Section>
      </div>
      {p.distinguish && (
        <div className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm"><span className="font-semibold text-accent">Phân biệt: </span>{p.distinguish}</div>
      )}
      <Section icon={<ListChecks size={16} className="text-accent" />} title="Cách áp dụng">
        <ol className="list-decimal space-y-1 pl-5 text-sm">{p.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
      </Section>
      <Section icon={<Shapes size={16} className="text-accent" />} title="Khung code">
        <Markdown>{'```ts\n' + p.template + '\n```'}</Markdown>
      </Section>
      <Section icon={<Briefcase size={16} className="text-accent" />} title="Ví dụ thực tế">
        <div className="grid gap-2 sm:grid-cols-2">
          {p.realWorld.map((r, i) => (
            <div key={i} className="rounded-xl bg-surface-2 p-3 text-sm"><div className="mb-0.5 font-medium">{r.domain}</div><div className="text-fg-muted">{r.example}</div></div>
          ))}
        </div>
      </Section>
      {algos.length > 0 && (
        <Section icon={<Compass size={16} className="text-accent" />} title="Bài trên site (có Debug)">
          <div className="grid gap-2 sm:grid-cols-2">
            {algos.map((m) => (
              <Link key={m.meta.id} to={`/algo/${m.meta.id}`} className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm hover:border-accent/50 hover:bg-surface-2">
                <span className="min-w-0 flex-1 truncate font-medium">{m.meta.title}</span><LevelBadge level={m.meta.level} />
              </Link>
            ))}
          </div>
        </Section>
      )}
      <Section icon={<ExternalLink size={16} className="text-accent" />} title="Luyện tập LeetCode">
        <ul className="flex flex-col gap-1">
          {p.leetcode.map((l) => (
            <li key={l.id}><a href={`https://leetcode.com/problems/${l.slug}/`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">#{l.id} {l.title} <ExternalLink size={12} /></a></li>
          ))}
        </ul>
      </Section>
    </article>
  );
}
