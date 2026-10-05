import { AnimatePresence, motion } from 'framer-motion';
import type { StackQueueVisual } from '@/engine/types';
import { fillFor } from './colors';

export function StackQueueViz({ v }: { v: StackQueueVisual }) {
  const isStack = v.mode === 'stack';
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs font-medium text-fg-muted">{v.title ?? (isStack ? 'Stack (đỉnh ở trên)' : 'Queue (đầu ở trái)')}</div>
      <div className={isStack ? 'flex min-h-[120px] w-28 flex-col-reverse items-stretch gap-1 rounded-xl border border-border bg-surface-2 p-2' : 'flex min-h-[64px] min-w-[200px] items-stretch gap-1 rounded-xl border border-border bg-surface-2 p-2'}>
        <AnimatePresence initial={false}>
          {v.items.map((it, i) => {
            const h = v.highlights?.[i];
            return (
              <motion.div key={`${i}-${it}`} layout initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.18 }}
                className="flex h-10 min-w-10 items-center justify-center rounded-md px-2 font-mono text-sm font-semibold"
                style={{ background: fillFor(h), color: h ? '#fff' : 'var(--fg)', opacity: h ? 1 : 0.7 }}>
                {String(it)}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {v.items.length === 0 && <div className="flex flex-1 items-center justify-center text-xs text-fg-muted">rỗng</div>}
      </div>
      {!isStack && v.items.length > 0 && <div className="flex w-full justify-between px-2 text-[10px] text-fg-muted"><span>front</span><span>back</span></div>}
      {isStack && v.items.length > 0 && <div className="text-[10px] text-fg-muted">top = {String(v.items[v.items.length - 1])}</div>}
    </div>
  );
}
