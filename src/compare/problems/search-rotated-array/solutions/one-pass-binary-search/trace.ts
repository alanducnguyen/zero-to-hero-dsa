import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; target: number }): Generator<Frame, number> {
  const { nums, target } = input;
  const n = nums.length;
  const viz = (lo: number, hi: number, mid: number, h: Highlight, sorted?: [number, number]) => {
    const hls: Record<number, Highlight> = {};
    for (let x = 0; x < n; x++) if (x < lo || x > hi) hls[x] = 'muted';
    if (mid >= 0 && mid < n) hls[mid] = h;
    return arr(nums, {
      highlights: hls,
      pointers: [{ name: 'lo', index: lo }, { name: 'hi', index: hi }, { name: 'mid', index: mid }].filter((p) => p.index >= 0 && p.index < n),
      ranges: sorted ? [{ from: sorted[0], to: sorted[1], label: 'tăng dần', color: 'range' }] : [],
    });
  };
  let lo = 0;
  let hi = n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const vars = { lo, hi, mid, 'nums[lo]': nums[lo], 'nums[mid]': nums[mid], 'nums[hi]': nums[hi], target };
    if (nums[mid] === target) {
      yield frame(7, vars, viz(lo, hi, mid, 'done'), `nums[mid] = ${target} ⇒ trả về ${mid}. Chỉ một lượt, không cần biết pivot ở đâu.`);
      return mid;
    }
    if (nums[lo] <= nums[mid]) {
      const inLeft = nums[lo] <= target && target < nums[mid];
      yield frame(inLeft ? 10 : 11, vars, viz(lo, hi, mid, 'compare', [lo, mid]),
        `nums[lo] = ${nums[lo]} ≤ nums[mid] = ${nums[mid]} ⇒ nửa trái [${lo}, ${mid}] tăng dần (vách xoay không nằm ở đây). ` +
          (inLeft ? `${target} ∈ [${nums[lo]}, ${nums[mid]}) ⇒ chắc chắn ở nửa trái, hi = mid − 1.` : `${target} ∉ [${nums[lo]}, ${nums[mid]}) – vì nửa trái tăng dần nên kiểm tra khoảng là đủ ⇒ chỉ có thể ở nửa phải, lo = mid + 1.`));
      if (inLeft) hi = mid - 1;
      else lo = mid + 1;
    } else {
      const inRight = nums[mid] < target && target <= nums[hi];
      yield frame(inRight ? 14 : 15, vars, viz(lo, hi, mid, 'compare', [mid, hi]),
        `nums[lo] = ${nums[lo]} > nums[mid] = ${nums[mid]} ⇒ vách xoay nằm trong nửa trái, nên nửa phải [${mid}, ${hi}] tăng dần. ` +
          (inRight ? `${target} ∈ (${nums[mid]}, ${nums[hi]}] ⇒ lo = mid + 1.` : `${target} ∉ (${nums[mid]}, ${nums[hi]}] ⇒ phải ở nửa trái, hi = mid − 1.`));
      if (inRight) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  yield frame(18, { lo, hi }, viz(lo, hi, -1, 'pointer'), `lo > hi ⇒ khoảng tìm kiếm rỗng, ${target} không có trong mảng ⇒ −1. Mỗi bước loại một nửa ⇒ O(log n).`);
  return -1;
}
