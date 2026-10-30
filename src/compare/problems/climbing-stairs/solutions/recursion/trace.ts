import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = input.n;
  const calls = new Array<number>(n + 1).fill(0);
  const stack: string[] = [];
  const viz = (hl?: number) => arr(calls, { title: 'số lần gọi ways(i) (nhãn = i) – bài con bị tính lại', highlights: hl !== undefined ? { [hl]: 'active' } : {} });
  function* f(k: number): Generator<Frame, number> {
    stack.push(`climb(${k})`);
    calls[k]++;
    if (k <= 2) {
      yield frame(3, { n: k, 'lần gọi': calls[k] }, viz(k), `climb(${k}) = ${k} (cơ sở: ${k <= 1 ? 'chỉ một cách' : '1+1 hoặc 2'}). Lần gọi thứ ${calls[k]} với cùng tham số.`, { callStack: [...stack] });
      stack.pop();
      return k;
    }
    yield frame(4, { n: k, 'lần gọi': calls[k] }, viz(k), `Bước cuối lên bậc ${k} là 1 bậc (từ ${k - 1}) hoặc 2 bậc (từ ${k - 2}) ⇒ cộng số cách của hai bài con.`, { callStack: [...stack] });
    const a = yield* f(k - 1);
    const b = yield* f(k - 2);
    yield frame(4, { n: k, result: a + b }, viz(k), `climb(${k}) = ${a} + ${b} = ${a + b}.`, { callStack: [...stack] });
    stack.pop();
    return a + b;
  }
  const r = yield* f(n);
  const total = calls.reduce((s, c) => s + c, 0);
  yield frame(4, { result: r, 'tổng số lần gọi': total }, viz(), `climb(${n}) = ${r} nhưng tốn ${total} lời gọi cho ${n} bài con khác nhau – hàm mũ.`);
  return r;
}
