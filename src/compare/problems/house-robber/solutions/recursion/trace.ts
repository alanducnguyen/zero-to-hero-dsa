import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = input.nums;
  const n = nums.length;
  const calls = new Array<number>(n + 1).fill(0); // ô cuối gộp mọi i ≥ n
  const stack: string[] = [];
  const viz = (i?: number) =>
    composite([
      arr(nums, { title: 'nums (nhãn = i)', highlights: i !== undefined && i < n ? { [i]: 'active' } : {} }),
      arr(calls, { title: 'số lần gọi rob(i) (ô cuối = i ≥ n) – chú ý bài con bị tính lại', highlights: i !== undefined ? { [Math.min(i, n)]: 'compare' } : {} }),
    ]);
  function* f(i: number): Generator<Frame, number> {
    stack.push(`rob(${i})`);
    calls[Math.min(i, n)]++;
    if (i >= n) {
      yield frame(3, { i, 'lần gọi': calls[n] }, viz(i), `rob(${i}): đã vượt nhà cuối ⇒ 0. Trường hợp cơ sở này bị chạm tới rất nhiều lần.`, { callStack: [...stack] });
      stack.pop();
      return 0;
    }
    yield frame(4, { i, 'nums[i]': nums[i], 'lần gọi': calls[i] }, viz(i), `rob(${i}) (lần gọi thứ ${calls[i]}): thử BỎ nhà ${i} trước ⇒ cần rob(${i + 1}).`, { callStack: [...stack] });
    const skip = yield* f(i + 1);
    yield frame(5, { i, skip }, viz(i), `Bỏ nhà ${i} được ${skip}. Giờ thử CƯỚP nhà ${i} (+${nums[i]}) ⇒ nhà ${i + 1} bị cấm, nhảy sang rob(${i + 2}).`, { callStack: [...stack] });
    const take = nums[i] + (yield* f(i + 2));
    const v = Math.max(skip, take);
    yield frame(6, { i, skip, take, 'rob(i)': v }, viz(i), `rob(${i}) = max(bỏ ${skip}, cướp ${take}) = ${v}. Hai nhánh mỗi tầng ⇒ cây gọi phình như Fibonacci.`, { callStack: [...stack] });
    stack.pop();
    return v;
  }
  const r = yield* f(0);
  const total = calls.reduce((s, c) => s + c, 0);
  yield frame(6, { result: r, 'tổng số lần gọi': total }, viz(), `Kết quả ${r} nhưng tốn ${total} lời gọi cho chỉ ${n + 1} bài con khác nhau – đó là lý do cần memo.`);
  return r;
}
