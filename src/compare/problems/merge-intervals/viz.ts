import { matrix } from '@/engine/helpers';
import type { Highlight, MatrixVisual } from '@/engine/types';

export type Iv = [number, number];
const LIMIT = 100;
const clamp = (x: number) => Math.max(-LIMIT, Math.min(LIMIT, x));

/** "1-3" hoặc "1,3" ⇒ [1,3]; toạ độ kẹp vào [−100, 100] để mảng đếm của line sweep luôn nhỏ trong demo. */
export function parse(items: unknown): Iv[] {
  const out: Iv[] = [];
  for (const raw of Array.isArray(items) ? items : []) {
    const m = /^\s*(-?\d+)\s*[-,:]\s*(-?\d+)\s*$/.exec(String(raw));
    if (!m) continue;
    const a = clamp(Number(m[1])), b = clamp(Number(m[2]));
    out.push([Math.min(a, b), Math.max(a, b)]);
  }
  return out;
}

export const fmt = (iv: Iv) => `[${iv[0]},${iv[1]}]`;

/** Vẽ các khoảng trên một trục thời gian chung (mỗi hàng một khoảng). */
export function timeline(rows: { label: string; iv: Iv; hl: Highlight }[], all: Iv[], title = 'Trục toạ độ'): MatrixVisual {
  if (all.length === 0 || rows.length === 0) return matrix([[null]], { title: `${title} (rỗng)`, rowLabels: ['—'] });
  const lo = Math.min(...all.map((i) => i[0]));
  const hi = Math.max(...all.map((i) => i[1]));
  const width = Math.min(hi - lo, 40);
  const scale = (x: number) => Math.round(((x - lo) / Math.max(1, hi - lo)) * width);
  const cells = rows.map((r) => Array.from({ length: width + 1 }, (_, c) => (c >= scale(r.iv[0]) && c <= scale(r.iv[1]) ? '' : null)));
  const h: Record<string, Highlight> = {};
  rows.forEach((r, ri) => { for (let c = scale(r.iv[0]); c <= scale(r.iv[1]); c++) h[`${ri},${c}`] = r.hl; });
  return matrix(cells, { title: `${title} ${lo} → ${hi}`, rowLabels: rows.map((r) => r.label), highlights: h });
}
