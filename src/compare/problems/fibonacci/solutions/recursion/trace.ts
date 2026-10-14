import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = input.n;
  const calls: number[] = new Array<number>(n + 1).fill(0);
  const stack: string[] = [];
  const viz = (hl?: number) => arr(calls, { title: 'số lần gọi fib(i) (nhãn = i) – chú ý bài con bị tính lại', highlights: hl !== undefined ? { [hl]: 'active' } : {} });
  function* f(k: number): Generator<Frame, number> {
    stack.push(`fib(${k})`);
    calls[k]++;
    if (k <= 1) {
      yield frame(3, { n: k, 'calls[n]': calls[k] }, viz(k), `fib(${k}) = ${k} (cơ sở). Lần gọi thứ ${calls[k]} với cùng tham số.`, { callStack: [...stack] });
      stack.pop();
      return k;
    }
    yield frame(4, { n: k, 'calls[n]': calls[k] }, viz(k), `fib(${k}) gọi fib(${k - 1}) rồi fib(${k - 2}). Cây gọi phình gấp đôi mỗi tầng.`, { callStack: [...stack] });
    const a = yield* f(k - 1);
    const b = yield* f(k - 2);
    yield frame(4, { n: k, result: a + b }, viz(k), `fib(${k}) = ${a} + ${b} = ${a + b}.`, { callStack: [...stack] });
    stack.pop();
    return a + b;
  }
  const r = yield* f(n);
  yield frame(4, { result: r, 'tổng số lần gọi': calls.reduce((s, c) => s + c, 0) }, viz(), `fib(${n}) = ${r} nhưng tốn ${calls.reduce((s, c) => s + c, 0)} lời gọi – hàm mũ. fib(1) bị gọi ${calls[1]} lần.`);
  return r;
}
