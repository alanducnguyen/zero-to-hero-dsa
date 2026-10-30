import { matrix } from '@/engine/helpers';
import type { Highlight, MatrixVisual } from '@/engine/types';

export type Iv = [number, number];
const LIMIT = 100;
const clamp = (x: number) => Math.max(0, Math.min(LIMIT, x));

/**
 * "a-b" (hoặc "a,b") ⇒ [a, b] với 0 ≤ a < b ≤ 100; cuộc họp độ dài 0 bị bỏ (đề đảm bảo start < end),
 * tối đa 20 cuộc họp. Toạ độ ≤ 100 giữ mảng diff của line sweep nhỏ ⇒ mọi trace dưới 4000 frame.
 */
export function parse(items: unknown): Iv[] {
  const out: Iv[] = [];
  for (const raw of Array.isArray(items) ? items : []) {
    const m = /^\s*(-?\d+)\s*[-,:]\s*(-?\d+)\s*$/.exec(String(raw));
    if (!m) continue;
    const a = clamp(Number(m[1])), b = clamp(Number(m[2]));
    if (a !== b) out.push([Math.min(a, b), Math.max(a, b)]);
  }
  return out.slice(0, 20);
}

export const norm = (i: Record<string, unknown>) => ({ intervals: parse(i.intervals) });
export const label = (iv: Iv) => `${iv[0]}-${iv[1]}`;

/** Timeline: mỗi hàng một cuộc họp, mỗi cột một đơn vị thời gian [x, x+1). */
export function timeline(ivs: Iv[], hlOf: (k: number) => Highlight, title = 'Timeline (nửa mở [start, end))', col?: number): MatrixVisual {
  if (ivs.length === 0) return matrix([[null]], { title: `${title} – rỗng`, rowLabels: ['—'] });
  const lo = Math.min(...ivs.map((x) => x[0]));
  const hi = Math.max(...ivs.map((x) => x[1]));
  const w = Math.min(hi - lo, 40);
  const sc = (x: number) => Math.round(((x - lo) / (hi - lo)) * w);
  const cells = ivs.map(([a, b]) => Array.from({ length: w }, (_, c) => (c >= sc(a) && c < sc(b) ? '■' : null)));
  const h: Record<string, Highlight> = {};
  ivs.forEach(([a, b], k) => { for (let c = sc(a); c < sc(b); c++) h[`${k},${c}`] = col !== undefined && sc(col) === c ? 'compare' : hlOf(k); });
  return matrix(cells, { title: `${title} ${lo} → ${hi}`, rowLabels: ivs.map(label), highlights: h, colLabels: Array.from({ length: w }, (_, c) => (w === hi - lo ? String(lo + c) : '')) });
}
