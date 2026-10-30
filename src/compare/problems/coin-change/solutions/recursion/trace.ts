import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

const show = (v: number) => (v === Infinity ? '∞' : v);

export function* trace(input: { coins: number[]; amount: number }): Generator<Frame, number> {
  const { coins, amount } = input;
  const calls: number[] = new Array<number>(amount + 1).fill(0);
  const stack: string[] = [];
  const viz = (hl?: number) => arr(calls, { title: 'số lần gọi best(rem) (nhãn = rem) – bài con bị tính lại', highlights: hl !== undefined ? { [hl]: 'active' } : {} });
  function* best(rem: number): Generator<Frame, number> {
    stack.push(`best(${rem})`);
    calls[rem]++;
    if (rem === 0) {
      yield frame(4, { rem, 'calls[rem]': calls[rem] }, viz(rem), `best(0) = 0: đã gom đủ tiền. Lần gọi thứ ${calls[0]} – mỗi đường đi thành công đều chạm đáy này.`, { callStack: [...stack] });
      stack.pop();
      return 0;
    }
    yield frame(6, { rem, 'calls[rem]': calls[rem] }, viz(rem), calls[rem] > 1
      ? `best(${rem}) bị gọi lần thứ ${calls[rem]} – kết quả y hệt lần trước nhưng vẫn tính lại cả cây con. Đây là chỗ lãng phí hàm mũ.`
      : `best(${rem}): thử từng đồng c ≤ ${rem} làm đồng cuối, đệ quy best(${rem} − c).`, { callStack: [...stack] });
    let min = Infinity;
    for (const c of coins) if (c <= rem) min = Math.min(min, (yield* best(rem - c)) + 1);
    yield frame(9, { rem, min: show(min) }, viz(rem), min === Infinity ? `best(${rem}) = ∞: không đồng nào ghép được đúng ${rem}.` : `best(${rem}) = ${min}: lấy nhánh tốt nhất trong các đồng đã thử, cộng 1 cho đồng cuối.`, { callStack: [...stack] });
    stack.pop();
    return min;
  }
  const r = yield* best(amount);
  const total = calls.reduce((s, c) => s + c, 0);
  const res = r === Infinity ? -1 : r;
  yield frame(12, { result: res, 'tổng số lần gọi': total }, viz(), `Kết quả ${res} nhưng tốn ${total} lời gọi cho chỉ ${amount + 1} bài con khác nhau ⇒ cần memo.`);
  return res;
}
