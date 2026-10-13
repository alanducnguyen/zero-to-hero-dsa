import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = input.n;
  const memo = new Map<number, number>();
  const stack: string[] = [];
  const viz = (hl: Record<number, Highlight> = {}) => arr(Array.from({ length: n + 1 }, (_, i) => (i <= 1 ? i : memo.has(i) ? memo.get(i)! : '·')), { title: 'memo[i] (nhãn = i)', highlights: hl });
  function* f(k: number): Generator<Frame, number> {
    stack.push(`fib(${k})`);
    if (k <= 1) { stack.pop(); return k; }
    if (memo.has(k)) {
      yield frame(4, { n: k, 'memo[n]': memo.get(k) }, viz({ [k]: 'done' }), `fib(${k}) đã có trong memo = ${memo.get(k)} ⇒ trả ngay, không đệ quy lại. Đây là chỗ tiết kiệm hàm mũ.`, { callStack: [...stack] });
      stack.pop();
      return memo.get(k)!;
    }
    yield frame(5, { n: k }, viz({ [k]: 'active' }), `fib(${k}) chưa có ⇒ tính fib(${k - 1}) + fib(${k - 2}).`, { callStack: [...stack] });
    const v = (yield* f(k - 1)) + (yield* f(k - 2));
    memo.set(k, v);
    yield frame(6, { n: k, v }, viz({ [k]: 'swap' }), `Lưu memo[${k}] = ${v}. Mỗi i chỉ được tính một lần ⇒ tổng O(n).`, { callStack: [...stack] });
    stack.pop();
    return v;
  }
  const r = yield* f(n);
  yield frame(7, { result: r, 'số bài con đã tính': memo.size }, viz(Object.fromEntries([...memo.keys()].map((k) => [k, 'done' as Highlight]))), `fib(${n}) = ${r} với ${memo.size} bài con, mỗi bài tính một lần.`);
  return r;
}
