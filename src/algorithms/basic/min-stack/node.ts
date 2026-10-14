import { MinStack } from './impl';
export interface MSInput { ops: string[] }
export type Op = { op: 'push'; val: number } | { op: 'pop' | 'top' | 'getMin' };
export function parseOps(ops: string[]): Op[] {
  const out: Op[] = [];
  for (const raw of ops) {
    const m = /^(push|pop|top|getMin|min)\s*(-?\d+)?$/i.exec(raw.trim());
    if (!m) continue;
    const name = m[1].toLowerCase();
    if (name === 'push') { if (m[2] !== undefined) out.push({ op: 'push', val: Number(m[2]) }); }
    else out.push({ op: name === 'min' ? 'getMin' : (name as 'pop' | 'top' | 'getMin') });
  }
  return out;
}
export function run(input: MSInput): (number | null)[] {
  const s = new MinStack();
  const res: (number | null)[] = [];
  for (const o of parseOps(input.ops)) {
    if (o.op === 'push') { s.push(o.val); res.push(null); }
    else if (o.op === 'pop') res.push(s.pop() ?? null);
    else if (o.op === 'top') res.push(s.top() ?? null);
    else res.push(s.getMin() ?? null);
  }
  return res;
}
