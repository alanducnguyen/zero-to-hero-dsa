import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const show = (v: number) => (v === Infinity ? '∞' : v);

export function* trace(input: { coins: number[]; amount: number }): Generator<Frame, number> {
  const { coins, amount } = input;
  const memo = new Map<number, number>();
  const stack: string[] = [];
  const viz = (hl: Record<number, Highlight> = {}) =>
    arr(Array.from({ length: amount + 1 }, (_, i) => (i === 0 ? 0 : memo.has(i) ? show(memo.get(i)!) : '·')), { title: 'memo[rem] (nhãn = rem, · = chưa giải)', highlights: hl });
  function* best(rem: number): Generator<Frame, number> {
    stack.push(`best(${rem})`);
    if (rem === 0) { stack.pop(); return 0; }
    if (memo.has(rem)) {
      yield frame(6, { rem, 'memo[rem]': show(memo.get(rem)!) }, viz({ [rem]: 'done' }), `best(${rem}) đã có trong memo = ${show(memo.get(rem)!)} ⇒ trả ngay, cắt bỏ cả cây con mà bản đệ quy thuần phải tính lại.`, { callStack: [...stack] });
      stack.pop();
      return memo.get(rem)!;
    }
    yield frame(8, { rem }, viz({ [rem]: 'active' }), `best(${rem}) chưa giải ⇒ thử từng đồng c ≤ ${rem}. Chỉ có ${amount + 1} trạng thái nên tổng công việc O(amount·k).`, { callStack: [...stack] });
    let min = Infinity;
    for (const c of coins) if (c <= rem) min = Math.min(min, (yield* best(rem - c)) + 1);
    memo.set(rem, min);
    yield frame(11, { rem, min: show(min) }, viz({ [rem]: 'swap' }), `Lưu memo[${rem}] = ${show(min)}. Lần sau ai cần best(${rem}) đều lấy O(1).`, { callStack: [...stack] });
    stack.pop();
    return min;
  }
  const r = yield* best(amount);
  const res = r === Infinity ? -1 : r;
  yield frame(15, { result: res, 'số bài con đã giải': memo.size }, viz(amount > 0 ? { [amount]: 'done' } : {}), `Kết quả ${res}. Mỗi số tiền giải đúng một lần (${memo.size} bài con), nhưng vẫn dùng stack đệ quy sâu tới amount.`);
  return res;
}
