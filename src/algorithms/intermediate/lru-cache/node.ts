import { LRUCache } from './impl';
export interface LRUInput { capacity: number; ops: string[] }
export type Op = { op: 'put'; key: number; value: number } | { op: 'get'; key: number };
export function parseOps(ops: string[]): Op[] {
  const out: Op[] = [];
  for (const raw of ops) {
    const m = /^(put|get)\s+(-?\d+)(?:\s+(-?\d+))?$/i.exec(raw.trim());
    if (!m) continue;
    if (m[1].toLowerCase() === 'put') { if (m[3] === undefined) continue; out.push({ op: 'put', key: Number(m[2]), value: Number(m[3]) }); }
    else out.push({ op: 'get', key: Number(m[2]) });
  }
  return out;
}
export function run(input: LRUInput): (number | null)[] {
  const cache = new LRUCache(Math.max(1, Math.min(6, Math.floor(input.capacity))));
  const results: (number | null)[] = [];
  for (const o of parseOps(input.ops)) {
    if (o.op === 'put') { cache.put(o.key, o.value); results.push(null); }
    else results.push(cache.get(o.key));
  }
  return results;
}
