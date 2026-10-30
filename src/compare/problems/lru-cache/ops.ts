/** Thao tác LRU dùng chung cho mọi lời giải (cùng định dạng với bài src/algorithms/intermediate/lru-cache). */
export type Op = { op: 'put'; key: number; value: number } | { op: 'get'; key: number };
export interface LRUInput { capacity: number; ops: string[] }

/** "put k v" / "get k" → Op; dòng sai định dạng bị bỏ qua. */
export function parseOps(ops: string[]): Op[] {
  const out: Op[] = [];
  for (const raw of ops) {
    const m = /^(put|get)\s+(-?\d+)(?:\s+(-?\d+))?$/i.exec(raw.trim());
    if (!m) continue;
    if (m[1].toLowerCase() === 'put') { if (m[3] !== undefined) out.push({ op: 'put', key: Number(m[2]), value: Number(m[3]) }); }
    else out.push({ op: 'get', key: Number(m[2]) });
  }
  return out;
}

export const clampCapacity = (c: number) => Math.max(1, Math.min(6, Math.floor(Number(c) || 1)));
