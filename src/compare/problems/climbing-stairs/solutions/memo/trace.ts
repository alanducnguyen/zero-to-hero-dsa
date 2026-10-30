import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = input.n;
  const memo = new Map<number, number>();
  const stack: string[] = [];
  const viz = (hl: Record<number, Highlight> = {}) =>
    arr(Array.from({ length: n + 1 }, (_, i) => (i === 0 ? '–' : i <= 2 ? i : memo.has(i) ? memo.get(i)! : '·')), { title: 'memo[i] = số cách lên bậc i (nhãn = i)', highlights: hl });
  function* f(k: number): Generator<Frame, number> {
    if (k <= 2) {
      yield frame(3, { n: k }, viz({ [k]: 'done' }), `climb(${k}) = ${k}: cơ sở, không cần memo.`, { callStack: [...stack, `climb(${k})`] });
      return k;
    }
    stack.push(`climb(${k})`);
    if (memo.has(k)) {
      yield frame(4, { n: k, 'memo[n]': memo.get(k) }, viz({ [k]: 'done' }), `climb(${k}) đã có = ${memo.get(k)} ⇒ trả ngay, cắt bỏ cả cây con.`, { callStack: [...stack] });
      stack.pop();
      return memo.get(k)!;
    }
    yield frame(5, { n: k }, viz({ [k]: 'active' }), `climb(${k}) chưa có ⇒ tính climb(${k - 1}) + climb(${k - 2}).`, { callStack: [...stack] });
    const v = (yield* f(k - 1)) + (yield* f(k - 2));
    memo.set(k, v);
    yield frame(6, { n: k, v }, viz({ [k]: 'swap' }), `Lưu memo[${k}] = ${v}. Mỗi bậc chỉ tính một lần ⇒ O(n).`, { callStack: [...stack] });
    stack.pop();
    return v;
  }
  const r = yield* f(n);
  yield frame(7, { result: r, 'số bài con đã lưu': memo.size }, viz({ [n]: 'done' }), `climb(${n}) = ${r}. O(n) thời gian nhưng stack sâu n tầng – n = 10⁵ có thể tràn stack.`);
  return r;
}
