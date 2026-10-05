import type { HeapVisual } from '@/engine/types';
import { ArrayViz } from './ArrayViz';
import { TreeViz } from './TreeViz';

/** Heap hiển thị hai dạng: mảng và cây nhị phân hoàn chỉnh. */
export function HeapViz({ v }: { v: HeapVisual }) {
  const nodes = v.items.map((val, i) => ({
    id: String(i),
    label: String(val),
    children: [2 * i + 1, 2 * i + 2].filter((c) => c < v.items.length).map(String),
  }));
  const highlights: Record<string, NonNullable<HeapVisual['highlights']>[number]> = {};
  for (const [k, h] of Object.entries(v.highlights ?? {})) highlights[k] = h;
  return (
    <div className="flex flex-col items-center gap-4">
      {v.title && <div className="text-xs font-medium text-fg-muted">{v.title}</div>}
      <TreeViz v={{ kind: 'tree', nodes, rootId: v.items.length ? '0' : null, highlights }} />
      <ArrayViz v={{ kind: 'array', items: v.items, highlights: v.highlights, title: 'Biểu diễn mảng (con của i: 2i+1, 2i+2)' }} />
    </div>
  );
}
