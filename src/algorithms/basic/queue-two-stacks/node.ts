import { QueueTwoStacks } from './impl';
export interface QInput { ops: string[] }
/** ops: "push 3", "pop", "peek" */
export function parseOps(ops: string[]): { op: 'push' | 'pop' | 'peek'; val?: number }[] {
  const out: { op: 'push' | 'pop' | 'peek'; val?: number }[] = [];
  for (const raw of ops) {
    const m = /^(push|pop|peek)\s*(-?\d+)?$/i.exec(raw.trim());
    if (!m) continue;
    const op = m[1].toLowerCase() as 'push' | 'pop' | 'peek';
    if (op === 'push') { if (m[2] === undefined) continue; out.push({ op, val: Number(m[2]) }); } else out.push({ op });
  }
  return out;
}
export function run(input: QInput): (number | undefined)[] {
  const q = new QueueTwoStacks<number>();
  const results: (number | undefined)[] = [];
  for (const { op, val } of parseOps(input.ops)) {
    if (op === 'push') { q.push(val!); results.push(undefined); }
    else if (op === 'pop') results.push(q.pop());
    else results.push(q.peek());
  }
  return results;
}
