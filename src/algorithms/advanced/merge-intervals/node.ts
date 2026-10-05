import { mergeIntervals } from './impl';
export interface MInput { intervals: string[] }
/** "1-3" hoặc "1,3" ⇒ [1,3] */
export function parse(items: string[]): [number, number][] {
  const out: [number, number][] = [];
  for (const raw of items) {
    const m = /^\s*(-?\d+)\s*[-,:]\s*(-?\d+)\s*$/.exec(raw);
    if (!m) continue;
    const a = Number(m[1]), b = Number(m[2]);
    out.push([Math.min(a, b), Math.max(a, b)]);
  }
  return out;
}
export const run = (input: MInput) => mergeIntervals(parse(input.intervals));
