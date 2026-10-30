import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const { nums, k } = input;
  let count = 0;
  let ops = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      let sum = 0;
      for (let t = i; t <= j; t++) sum += nums[t];
      ops += j - i + 1;
      const ok = sum === k;
      if (ok) count++;
      yield frame(8, { i, j, sum, k, count, 'phép cộng đã làm': ops }, arr(nums, { highlights: hlRange(i, j, ok ? 'done' : 'range'), pointers: [{ name: 'i', index: i }, { name: 'j', index: j }] }),
        ok ? `Tổng nums[${i}..${j}] = ${k} ⇒ count = ${count}. Đã tốn ${j - i + 1} phép cộng chỉ để tính lại tổng này.` : `Tổng nums[${i}..${j}] = ${sum} ≠ ${k}. Lãng phí: tổng nums[${i}..${j - 1}] vừa tính ở bước trước đã bị vứt đi, giờ cộng lại ${j - i + 1} số từ đầu.`);
    }
  }
  yield frame(11, { count, 'phép cộng đã làm': ops }, arr(nums), `Kết quả ${count}. Tổng số phép cộng ≈ n³/6 = ${ops} – tăng bậc ba theo n.`);
  return count;
}
