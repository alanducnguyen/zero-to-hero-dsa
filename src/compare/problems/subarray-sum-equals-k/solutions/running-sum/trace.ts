import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const { nums, k } = input;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      const ok = sum === k;
      if (ok) count++;
      yield frame(8, { i, j, sum, k, count }, arr(nums, { highlights: { ...hlRange(i, j - 1, 'range'), [j]: ok ? 'done' : 'active' }, pointers: [{ name: 'i', index: i }, { name: 'j', index: j }] }),
        ok ? `sum += ${nums[j]} ⇒ ${sum} = k ⇒ count = ${count}. Vẫn đi tiếp chứ không dừng: nếu phía sau có số âm/0, tổng có thể quay lại ${k}.` : `sum += ${nums[j]} ⇒ ${sum}. Chỉ 1 phép cộng nhờ giữ lại tổng [${i}..${j - 1}] – bỏ được một vòng lặp so với brute force.`);
    }
  }
  yield frame(11, { count }, arr(nums), `Kết quả ${count}. O(n²) cặp (i, j) vẫn bị liệt kê hết – muốn O(n) phải tránh liệt kê cặp.`);
  return count;
}
