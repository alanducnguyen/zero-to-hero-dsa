import { SegmentTree } from './impl';
export interface STInput { nums: number[]; ops: string[] }
export type Op = { op: 'query'; l: number; r: number } | { op: 'update'; idx: number; val: number };
export function parseOps(ops: string[], n: number): Op[] {
  const out: Op[] = [];
  for (const raw of ops) {
    const q = /^(query|sum)\s+(\d+)\s+(\d+)$/i.exec(raw.trim());
    const u = /^(update|set)\s+(\d+)\s+(-?\d+)$/i.exec(raw.trim());
    if (q) { const l = Math.min(Number(q[2]), Number(q[3])), r = Math.max(Number(q[2]), Number(q[3])); if (r < n) out.push({ op: 'query', l, r }); }
    else if (u) { const idx = Number(u[2]); if (idx < n) out.push({ op: 'update', idx, val: Number(u[3]) }); }
  }
  return out;
}
export function run(input: STInput): number[] {
  const st = new SegmentTree(input.nums);
  const results: number[] = [];
  for (const o of parseOps(input.ops, input.nums.length)) {
    if (o.op === 'query') results.push(st.query(o.l, o.r));
    else st.update(o.idx, o.val);
  }
  return results;
}
