import { arr, composite, mapViz } from '@/engine/helpers';
import type { Highlight, Pointer, VisualState } from '@/engine/types';

export type In = { s: string; t: string };

/** s ≤ 20, t ≤ 8 ký tự: brute force xét ≤ 210 substring ⇒ trace luôn dưới giới hạn 4000 frame. */
export const norm = (i: Record<string, unknown>): In => ({ s: String(i.s ?? '').slice(0, 20), t: String(i.t ?? '').slice(0, 8) });

export const count = (str: string) => {
  const m = new Map<string, number>();
  for (const c of str) m.set(c, (m.get(c) ?? 0) + 1);
  return m;
};

export interface ViewOpts {
  lo?: number;
  hi?: number;
  best?: [number, number] | null; // [start, len]
  hl?: Record<number, Highlight>;
  pointers?: Pointer[];
  map: Record<string, string | number>;
  mapHl?: Record<string, Highlight>;
  mapTitle: string;
}

/** Chuỗi s với cửa sổ đang xét (cyan) + cửa sổ tốt nhất (xanh lá), kèm bảng đếm. */
export function view(s: string, t: string, o: ViewOpts): VisualState {
  const ranges: { from: number; to: number; label?: string; color?: Highlight }[] = [];
  const hl: Record<number, Highlight> = {};
  if (o.lo !== undefined && o.hi !== undefined && o.hi >= o.lo) {
    ranges.push({ from: o.lo, to: o.hi, label: `cửa sổ (${o.hi - o.lo + 1})`, color: 'range' });
    for (let k = o.lo; k <= o.hi; k++) hl[k] = 'range';
  }
  if (o.best) ranges.push({ from: o.best[0], to: o.best[0] + o.best[1] - 1, label: `best = ${o.best[1]}`, color: 'done' });
  return composite([
    arr([...s], { title: `Chuỗi s (cần phủ t = "${t}")`, highlights: { ...hl, ...o.hl }, pointers: o.pointers, ranges, mode: 'cells' }),
    mapViz(o.map, o.mapHl, o.mapTitle),
  ]);
}
