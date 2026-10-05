import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = input.nums.length ? input.nums : [0];
  const n = nums.length;
  let current = nums[0];
  let best = nums[0];
  let curStart = 0;
  let bestRange: [number, number] = [0, 0];
  const viz = (i: number, extra: Record<number, Highlight> = {}) =>
    arr(nums, {
      mode: 'bars',
      highlights: { ...hlRange(curStart, i, 'range'), ...extra },
      pointers: [{ name: 'i', index: Math.min(i, n - 1) }],
      ranges: [
        { from: curStart, to: i, label: `current = ${current}` },
        { from: bestRange[0], to: bestRange[1], label: `best = ${best}`, color: 'done' },
      ],
    });
  yield frame(9, { current, best }, viz(0, { 0: 'active' }), `Khởi tạo current = best = nums[0] = ${nums[0]}. current = tổng subarray lớn nhất KẾT THÚC tại i; best = lớn nhất toàn cục. Khởi tạo bằng nums[0] (không phải 0) để mảng toàn số âm vẫn đúng.`);
  for (let i = 1; i < n; i++) {
    const extend = current + nums[i];
    yield frame(11, { i, 'nums[i]': nums[i], current, 'current + nums[i]': extend }, viz(i, { [i]: 'compare' }), `Tại i = ${i}: nối tiếp subarray cũ cho ${current} + ${nums[i]} = ${extend}; bắt đầu lại từ nums[i] cho ${nums[i]}. ${extend >= nums[i] ? 'Nối tiếp tốt hơn (current cũ ≥ 0 nên "có ích").' : 'Bắt đầu lại tốt hơn (current cũ < 0 chỉ kéo tổng xuống).'}`);
    if (extend >= nums[i]) current = extend;
    else {
      current = nums[i];
      curStart = i;
    }
    yield frame(11, { i, current, curStart }, viz(i, { [i]: 'active' }), `current = ${current} (subarray [${curStart}..${i}]).`);
    if (current > best) {
      best = current;
      bestRange = [curStart, i];
      yield frame(12, { i, current, best }, viz(i, { ...hlRange(curStart, i, 'done') }), `current > best ⇒ best = ${best}, subarray tốt nhất là [${curStart}..${i}].`);
    } else {
      yield frame(12, { i, current, best }, viz(i), `best = max(${best}, ${current}) = ${best}, giữ nguyên.`);
    }
  }
  yield frame(14, { result: best, range: bestRange }, arr(nums, { mode: 'bars', highlights: hlRange(bestRange[0], bestRange[1], 'done'), ranges: [{ from: bestRange[0], to: bestRange[1], label: `best = ${best}`, color: 'done' }] }), `Kết quả: ${best}, subarray [${bestRange[0]}..${bestRange[1]}] = [${nums.slice(bestRange[0], bestRange[1] + 1).join(', ')}]. Một lượt duyệt, O(1) bộ nhớ.`);
  return best;
}
