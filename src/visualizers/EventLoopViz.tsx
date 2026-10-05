import { AnimatePresence, motion } from 'framer-motion';
import type { EventLoopPhase, EventLoopVisual } from '@/engine/types';
import { cn } from '@/lib/cn';

const RING: { id: EventLoopPhase; label: string; sub: string }[] = [
  { id: 'timers', label: 'timers', sub: 'setTimeout / setInterval' },
  { id: 'pending', label: 'pending', sub: 'I/O callbacks hoãn' },
  { id: 'poll', label: 'poll', sub: 'I/O mới, chờ' },
  { id: 'check', label: 'check', sub: 'setImmediate' },
  { id: 'close', label: 'close', sub: "socket 'close'" },
];

function Box({ title, items, active, changed, empty = 'rỗng', hint }: { title: string; items: string[]; active?: boolean; changed?: boolean; empty?: string; hint?: string }) {
  return (
    <div className={cn('rounded-xl border p-2 transition-colors', active ? 'border-viz-active bg-viz-active/10' : changed ? 'border-viz-swap/60' : 'border-border bg-surface-2/60')}>
      <div className="mb-1 flex items-baseline justify-between"><span className="text-[11px] font-semibold uppercase tracking-wider text-fg-muted">{title}</span>{hint && <span className="text-[10px] text-fg-muted">{hint}</span>}</div>
      <div className="flex min-h-7 flex-wrap gap-1">
        <AnimatePresence initial={false}>
          {items.map((it, i) => (
            <motion.span key={`${it}-${i}`} layout initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }}
              className={cn('rounded-md px-2 py-0.5 font-mono text-xs', active && i === 0 ? 'bg-viz-active text-white' : 'bg-surface-3')}>{it}</motion.span>
          ))}
        </AnimatePresence>
        {items.length === 0 && <span className="self-center text-[11px] text-fg-muted">{empty}</span>}
      </div>
    </div>
  );
}

export function EventLoopViz({ v }: { v: EventLoopVisual }) {
  const cx = 110, cy = 110, R = 78;
  const inLoop = RING.some((r) => r.id === v.phase) || v.phase === 'idle';
  return (
    <div className="grid w-full max-w-[980px] gap-3 lg:grid-cols-[1fr_240px_1fr]">
      {/* trái: call stack + microtask */}
      <div className="flex flex-col gap-2">
        <div className={cn('rounded-xl border p-2', v.phase === 'main' || v.changed === 'stack' ? 'border-viz-active bg-viz-active/10' : 'border-border bg-surface-2/60')}>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">Call stack (V8)</div>
          <div className="flex min-h-[72px] flex-col-reverse gap-1">
            <AnimatePresence initial={false}>
              {v.callStack.map((c, i) => (
                <motion.div key={`${c}-${i}`} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={cn('rounded-md px-2 py-1 font-mono text-xs', i === v.callStack.length - 1 ? 'bg-viz-active text-white' : 'bg-surface-3')}>{c}</motion.div>
              ))}
            </AnimatePresence>
            {v.callStack.length === 0 && <div className="self-center text-[11px] text-fg-muted">rỗng – event loop được phép chạy</div>}
          </div>
        </div>
        <Box title="nextTick queue" items={v.nextTick} active={v.phase === 'nextTick'} changed={v.changed === 'nextTick'} hint="ưu tiên 1" />
        <Box title="Microtask queue (promise)" items={v.microtasks} active={v.phase === 'microtask'} changed={v.changed === 'microtasks'} hint="ưu tiên 2" />
      </div>

      {/* giữa: vòng phase */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 220 220" width={220} height={220} style={{ maxWidth: '100%', height: 'auto' }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--border)" strokeWidth={10} />
          <defs><marker id="el-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--fg-muted)" /></marker></defs>
          <path d={`M ${cx + R * Math.cos(-0.2)} ${cy + R * Math.sin(-0.2)} A ${R} ${R} 0 0 1 ${cx + R * Math.cos(0.6)} ${cy + R * Math.sin(0.6)}`} fill="none" stroke="var(--fg-muted)" strokeWidth={2} markerEnd="url(#el-arrow)" opacity={0.6} />
          {RING.map((r, i) => {
            const ang = -Math.PI / 2 + (i / RING.length) * Math.PI * 2;
            const x = cx + R * Math.cos(ang), y = cy + R * Math.sin(ang);
            const on = v.phase === r.id;
            return (
              <g key={r.id}>
                <circle cx={x} cy={y} r={on ? 22 : 18} fill={on ? 'var(--color-viz-active)' : 'var(--surface)'} stroke={on ? 'var(--color-viz-active)' : 'var(--border)'} strokeWidth={2} style={{ transition: 'all .2s' }} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize={on ? 11 : 10} fontWeight={700} fill={on ? '#fff' : 'var(--fg)'} fontFamily="var(--font-mono)">{r.label}</text>
              </g>
            );
          })}
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize={11} fill="var(--fg-muted)">event loop</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize={16} fontWeight={700} fill={inLoop ? 'var(--color-viz-active)' : 'var(--fg)'} fontFamily="var(--font-mono)">{v.phase === 'idle' ? 'zzz' : v.phase === 'exit' ? 'exit' : inLoop ? v.phase : v.phase === 'main' ? 'script' : v.phase}</text>
          <text x={cx} y={cy + 30} textAnchor="middle" fontSize={11} fill="var(--fg-muted)" fontFamily="var(--font-mono)">now = {v.now}ms</text>
        </svg>
        <div className="text-center text-[11px] text-fg-muted">{RING.find((r) => r.id === v.phase)?.sub ?? (v.phase === 'idle' ? 'ngủ chờ sự kiện (epoll/kqueue)' : v.phase === 'main' ? 'chạy script chính' : v.phase === 'exit' ? 'không còn gì pending' : 'drain hàng đợi ưu tiên')}</div>
      </div>

      {/* phải: macrotask + output */}
      <div className="flex flex-col gap-2">
        <Box title="timers" items={v.timers.map((t) => `${t.label} @${t.due}ms`)} active={v.phase === 'timers'} changed={v.changed === 'timers'} hint="theo due" />
        <Box title="I/O (libuv thread pool)" items={v.io.map((t) => `${t.label} ~${t.due}ms`)} active={v.phase === 'poll'} changed={v.changed === 'io'} />
        <Box title="check: setImmediate" items={v.immediates} active={v.phase === 'check'} changed={v.changed === 'immediates'} />
        <div className={cn('rounded-xl border p-2', v.changed === 'output' ? 'border-viz-done' : 'border-border')} style={{ background: 'var(--surface-2)' }}>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">console</div>
          <pre className="min-h-[60px] whitespace-pre-wrap font-mono text-xs leading-5">{v.output.length ? v.output.map((o, i) => <div key={i} className={i === v.output.length - 1 && v.changed === 'output' ? 'text-viz-done' : ''}>{o}</div>) : <span className="text-fg-muted">—</span>}</pre>
        </div>
      </div>
    </div>
  );
}
