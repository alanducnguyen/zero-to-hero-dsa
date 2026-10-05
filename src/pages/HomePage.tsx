import { Link } from 'react-router-dom';
import { ArrowRight, Bug, Code2, Layers, RefreshCw, Sparkles } from 'lucide-react';
import { LEVELS } from '@/content/levels';
import { ALGORITHMS, byLevel } from '@/content/registry';
import { useProgress } from '@/lib/progress';

export function HomePage() {
  const { completed } = useProgress();
  const next = ALGORITHMS.find((m) => !completed[m.meta.id]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <section className="mb-12">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-fg-muted"><Sparkles size={12} className="text-accent" /> Luyện phỏng vấn big tech bằng tiếng Việt</div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Hiểu thuật toán đến <span className="text-accent">từng dòng code</span>.</h1>
        <p className="mt-4 max-w-2xl text-lg text-fg-muted">Mỗi thuật toán có phân tích sâu, chứng minh đúng, tradeoff, use case thực tế và chế độ <strong className="text-fg">Debug</strong>: chạy từng dòng, xem biến và hình ảnh thay đổi theo thời gian thực. Code TypeScript chạy được trên Node.js.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {next && <Link to={`/algo/${next.meta.id}`} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-semibold text-accent-fg shadow-sm hover:bg-accent/90">{Object.keys(completed).length ? 'Học tiếp' : 'Bắt đầu'}: {next.meta.title} <ArrowRight size={16} /></Link>}
          <Link to="/level/basic" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 font-semibold hover:bg-surface-3">Xem lộ trình</Link>
          <Link to="/event-loop" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 font-semibold hover:bg-surface-3"><RefreshCw size={16} className="text-accent" /> Node.js Event Loop</Link>
        </div>
      </section>

      <section className="mb-12 grid gap-4 sm:grid-cols-3">
        {[[Bug, 'Debug line-by-line', 'Highlight dòng đang chạy, breakpoint, tua ngược/xuôi, xem biến thay đổi.'], [Layers, '4 cấp độ', 'Cơ bản → Middle → Nâng cao → Siêu cấp, theo đúng độ khó phỏng vấn.'], [Code2, 'TypeScript sạch', 'Code idiomatic có JSDoc, test bằng Vitest, chạy ngay với tsx trên Node.']].map(([Icon, t, d]) => {
          const I = Icon as typeof Bug;
          return (
            <div key={t as string} className="rounded-2xl border border-border bg-surface-2/50 p-5">
              <I size={20} className="mb-3 text-accent" /><div className="font-semibold">{t as string}</div><p className="mt-1 text-sm text-fg-muted">{d as string}</p>
            </div>
          );
        })}
      </section>

      <h2 className="mb-4 text-xl font-bold">Lộ trình</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {LEVELS.map((l) => {
          const list = byLevel(l.id);
          const done = list.filter((m) => completed[m.meta.id]).length;
          const pct = list.length ? Math.round((done / list.length) * 100) : 0;
          return (
            <Link key={l.id} to={`/level/${l.id}`} className="group rounded-2xl border border-border p-5 transition hover:border-accent/50 hover:shadow-md">
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg font-mono text-sm font-bold text-white" style={{ background: `var(--color-${l.color})` }}>{l.order}</span>
                <div><div className="font-semibold">{l.title}</div><div className="text-xs text-fg-muted">{l.short}</div></div>
                <span className="ml-auto font-mono text-xs text-fg-muted">{done}/{list.length}</span>
              </div>
              <p className="text-sm text-fg-muted">{l.description}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3"><div className="h-full transition-all" style={{ width: `${pct}%`, background: `var(--color-${l.color})` }} /></div>
              <div className="mt-3 flex flex-wrap gap-1.5">{list.map((m) => <span key={m.meta.id} className="rounded-md bg-surface-3 px-1.5 py-0.5 text-[11px]">{m.meta.title}</span>)}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
