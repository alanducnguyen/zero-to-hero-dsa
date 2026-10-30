import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; target: number }): Generator<Frame, number> {
  const { nums, target } = input;
  const n = nums.length;
  const viz = (lo: number, hi: number, mid: number, h: Highlight, extra: Record<number, Highlight> = {}) => {
    const hls: Record<number, Highlight> = {};
    for (let x = 0; x < n; x++) if (x < lo || x > hi) hls[x] = 'muted';
    if (mid >= 0 && mid < n) hls[mid] = h;
    return arr(nums, { highlights: { ...hls, ...extra }, pointers: [{ name: 'lo', index: lo }, { name: 'hi', index: hi }, ...(mid >= 0 && mid < n ? [{ name: 'mid', index: mid }] : [])].filter((p) => p.index >= 0 && p.index < n), ranges: lo <= hi && n > 0 ? [{ from: lo, to: hi, color: 'range' }] : [] });
  };
  let lo = 0;
  let hi = n - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) {
      yield frame(7, { lo, hi, mid, 'nums[mid]': nums[mid], 'nums[hi]': nums[hi] }, viz(lo, hi, mid, 'compare'), `Lượt 1 – tìm pivot. nums[mid] = ${nums[mid]} > nums[hi] = ${nums[hi]} ⇒ đoạn [mid, hi] không tăng dần, "vách" xoay nằm bên phải mid ⇒ lo = mid + 1.`);
      lo = mid + 1;
    } else {
      yield frame(8, { lo, hi, mid, 'nums[mid]': nums[mid], 'nums[hi]': nums[hi] }, viz(lo, hi, mid, 'compare'), `Lượt 1 – tìm pivot. nums[mid] = ${nums[mid]} ≤ nums[hi] = ${nums[hi]} ⇒ [mid, hi] tăng dần, min không thể ở sau mid; mid vẫn có thể là min ⇒ hi = mid (không trừ 1).`);
      hi = mid;
    }
  }
  const pivot = lo;
  const right = target >= nums[pivot] && target <= nums[n - 1];
  [lo, hi] = right ? [pivot, n - 1] : [0, pivot - 1];
  yield frame(12, { pivot, 'nums[pivot]': nums[pivot], target, 'nửa được chọn': right ? `[${pivot}, ${n - 1}]` : `[0, ${pivot - 1}]` }, viz(lo, hi, -1, 'pointer', n > 0 ? { [pivot]: 'active' } : {}),
    n === 0 ? 'Mảng rỗng ⇒ không có gì để tìm.' : `Pivot = ${pivot} (giá trị nhỏ nhất ${nums[pivot]}). Mảng gồm hai đoạn tăng dần: [0, ${pivot - 1}] và [${pivot}, ${n - 1}]. ${right ? `${target} nằm trong [${nums[pivot]}, ${nums[n - 1]}] ⇒ tìm ở đoạn phải.` : `${target} không thuộc [${nums[pivot]}, ${nums[n - 1]}] ⇒ chỉ có thể ở đoạn trái.`}`);
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const vars = { pivot, lo, hi, mid, 'nums[mid]': nums[mid], target };
    if (nums[mid] === target) {
      yield frame(15, vars, viz(lo, hi, mid, 'done'), `Lượt 2 – binary search thường. nums[mid] = ${target} ⇒ trả về ${mid}.`);
      return mid;
    }
    if (nums[mid] < target) {
      yield frame(16, vars, viz(lo, hi, mid, 'compare'), `Lượt 2. ${nums[mid]} < ${target} và đoạn này tăng dần ⇒ bỏ nửa trái, lo = mid + 1.`);
      lo = mid + 1;
    } else {
      yield frame(17, vars, viz(lo, hi, mid, 'compare'), `Lượt 2. ${nums[mid]} > ${target} ⇒ bỏ nửa phải, hi = mid − 1.`);
      hi = mid - 1;
    }
  }
  yield frame(19, { pivot, lo, hi }, viz(lo, hi, -1, 'pointer'), `Khoảng rỗng ⇒ ${target} không có trong mảng, trả −1. Tổng cộng hai lượt O(log n).`);
  return -1;
}
