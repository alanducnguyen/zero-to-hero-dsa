import { FenwickTree } from './impl';

export interface BITInput { nums: number[]; ops: string[] }
export type Op = { op: 'sum'; l: number; r: number } | { op: 'add'; idx: number; delta: number };

/** Phân tích thao tác: "sum l r" (tổng đoạn), "add i d" (cộng d vào vị trí i). */
export function parseOps(ops: string[], n: number): Op[] {
  const out: Op[] = [];
  for (const raw of ops) {
    const q = /^(sum|query)\s+(\d+)\s+(\d+)$/i.exec(raw.trim());
    const a = /^(add|update)\s+(\d+)\s+(-?\d+)$/i.exec(raw.trim());
    if (q) {
      const l = Math.min(Number(q[2]), Number(q[3]));
      const r = Math.max(Number(q[2]), Number(q[3]));
      if (r < n) out.push({ op: 'sum', l, r });
    } else if (a) {
      const idx = Number(a[2]);
      if (idx < n) out.push({ op: 'add', idx, delta: Number(a[3]) });
    }
  }
  return out;
}

export function run(input: BITInput): number[] {
  const bit = new FenwickTree(input.nums);
  const results: number[] = [];
  for (const o of parseOps(input.ops, input.nums.length)) {
    if (o.op === 'sum') results.push(bit.rangeSum(o.l, o.r));
    else bit.add(o.idx, o.delta);
  }
  return results;
}
