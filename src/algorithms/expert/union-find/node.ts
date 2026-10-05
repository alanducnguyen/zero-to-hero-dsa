import { UnionFind } from './impl';

export interface UFInput {
  n: number;
  /** "a-b" = union(a,b); "a?b" = connected(a,b) */
  ops: string[];
}

export interface UFOp { kind: 'union' | 'query'; a: number; b: number }

export function parseOps(n: number, ops: string[]): UFOp[] {
  const out: UFOp[] = [];
  for (const raw of ops) {
    const m = /^(\d+)\s*([-?])\s*(\d+)$/.exec(raw.trim());
    if (!m) continue;
    const a = Number(m[1]), b = Number(m[3]);
    if (a < 0 || b < 0 || a >= n || b >= n) continue;
    out.push({ kind: m[2] === '?' ? 'query' : 'union', a, b });
  }
  return out;
}

export function run(input: UFInput): { parent: number[]; count: number; results: string[] } {
  const n = Math.max(1, Math.min(12, Math.floor(input.n)));
  const uf = new UnionFind(n);
  const results: string[] = [];
  for (const op of parseOps(n, input.ops)) {
    if (op.kind === 'union') results.push(`union(${op.a},${op.b}) = ${uf.union(op.a, op.b)}`);
    else results.push(`connected(${op.a},${op.b}) = ${uf.connected(op.a, op.b)}`);
  }
  return { parent: [...uf.parent], count: uf.count, results };
}
