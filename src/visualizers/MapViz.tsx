import { AnimatePresence, motion } from 'framer-motion';
import type { MapVisual } from '@/engine/types';
import { fillFor } from './colors';

export function MapViz({ v }: { v: MapVisual }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs font-medium text-fg-muted">{v.title ?? 'HashMap'}</div>
      <div className="flex min-h-12 flex-wrap justify-center gap-1.5 rounded-xl border border-border bg-surface-2 p-2">
        <AnimatePresence initial={false}>
          {v.entries.map((e) => {
            const h = v.highlights?.[e.key];
            return (
              <motion.div key={e.key} layout initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                className="flex items-center overflow-hidden rounded-md border border-border font-mono text-xs">
                <span className="px-2 py-1" style={{ background: fillFor(h), color: h ? '#fff' : 'var(--fg)' }}>{e.key}</span>
                <span className="bg-surface px-2 py-1 text-fg">{String(e.value)}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {v.entries.length === 0 && <span className="self-center text-xs text-fg-muted">rỗng</span>}
      </div>
    </div>
  );
}
