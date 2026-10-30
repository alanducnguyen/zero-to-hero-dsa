/** Thao tác Min Stack dùng chung cho mọi lời giải (cùng định dạng với bài src/algorithms/basic/min-stack). */
export type Op = { op: 'push'; val: number } | { op: 'pop' | 'top' | 'getMin' };
export interface MSInput { ops: string[] }

/** "push x" / "pop" / "top" / "getMin" (hoặc "min") → Op; dòng sai định dạng bị bỏ qua. */
export function parseOps(ops: string[]): Op[] {
  const out: Op[] = [];
  for (const raw of ops) {
    const m = /^(push|pop|top|getMin|min)\s*(-?\d+)?$/i.exec(raw.trim());
    if (!m) continue;
    const name = m[1].toLowerCase();
    if (name === 'push') { if (m[2] !== undefined) out.push({ op: 'push', val: Number(m[2]) }); }
    else out.push({ op: name === 'pop' ? 'pop' : name === 'top' ? 'top' : 'getMin' });
  }
  return out;
}
