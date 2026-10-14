import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  let candidate = nums[0];
  let count = 0;
  const viz = (i: number, hl: Record<number, Highlight> = {}) => composite([arr(nums, { highlights: hl, pointers: i < nums.length ? [{ name: 'x', index: i }] : [] }), mapViz({ candidate, count }, { count: count === 0 ? 'swap' : 'done' }, 'Chỉ 2 biến – O(1) bộ nhớ')]);
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (count === 0) {
      candidate = x;
      yield frame(6, { i, x, candidate, count }, viz(i, { [i]: 'active' }), `count = 0 ⇒ ứng viên cũ đã bị triệt tiêu hết, chọn ${x}. Phần đã qua gồm các cặp triệt tiêu nhau nên bỏ qua được.`);
    }
    count += x === candidate ? 1 : -1;
    yield frame(7, { i, x, candidate, count }, viz(i, { [i]: x === candidate ? 'done' : 'swap' }), x === candidate ? `${x} = ứng viên ⇒ count = ${count}.` : `${x} ≠ ${candidate} ⇒ triệt tiêu một phiếu, count = ${count}.`);
  }
  yield frame(9, { candidate }, viz(nums.length, Object.fromEntries(nums.map((v, k) => [k, (v === candidate ? 'done' : 'muted') as Highlight]))), `Ứng viên cuối = ${candidate}. Đa số có > n/2 phiếu, nhiều hơn mọi phần tử khác cộng lại nên không thể bị triệt tiêu hết.`);
  return candidate;
}
