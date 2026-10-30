import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const taken: number[] = [];
  const stack: string[] = [];
  let calls = 0;
  const viz = (i: number) => {
    const h: Record<number, Highlight> = {};
    for (const k of taken) h[k] = 'done';
    if (i < nums.length) h[i] = 'active';
    return arr(nums, { title: 'xanh lá = đã lấy trên nhánh hiện tại', highlights: h, pointers: i < nums.length ? [{ name: 'i', index: i }] : [] });
  };
  function* go(i: number, prev: number): Generator<Frame, number> {
    calls++;
    if (i === nums.length) return 0;
    stack.push(`go(${i},${prev})`);
    const canTake = prev < 0 || nums[i] > nums[prev];
    yield frame(6, { i, prev, 'nums[i]': nums[i], canTake }, viz(i), canTake
      ? `Nhánh 1: bỏ ${nums[i]}. Nhánh 2: lấy ${nums[i]} (${prev < 0 ? 'chưa lấy gì' : `${nums[i]} > ${nums[prev]}`}). Mỗi phần tử tách đôi ⇒ tới 2ⁿ nhánh.`
      : `${nums[i]} ≤ ${nums[prev]} (phần tử lấy trước) ⇒ chỉ được bỏ, nhánh này không phình.`, { callStack: [...stack] });
    let best = yield* go(i + 1, prev);
    if (canTake) {
      taken.push(i);
      best = Math.max(best, 1 + (yield* go(i + 1, i)));
      taken.pop();
    }
    yield frame(8, { i, prev, best }, viz(i), `go(${i}, ${prev}) = ${best}: tốt nhất giữa bỏ và lấy. Cùng (i, prev) có thể bị gọi lại từ nhánh khác – không ai nhớ.`, { callStack: [...stack] });
    stack.pop();
    return best;
  }
  const r = yield* go(0, -1);
  yield frame(10, { result: r, 'tổng số lời gọi': calls }, viz(nums.length), `LIS = ${r} nhưng tốn ${calls} lời gọi cho n = ${nums.length}. Chỉ có O(n²) cặp (i, prev) khác nhau ⇒ memo/DP sẽ cắt về đa thức.`);
  return r;
}
