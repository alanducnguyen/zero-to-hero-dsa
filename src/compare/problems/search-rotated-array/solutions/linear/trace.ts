import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; target: number }): Generator<Frame, number> {
  const { nums, target } = input;
  const viz = (i: number, h: Highlight) => {
    const hls: Record<number, Highlight> = {};
    for (let x = 0; x < i; x++) hls[x] = 'visited';
    if (i < nums.length) hls[i] = h;
    return arr(nums, { highlights: hls, pointers: i < nums.length ? [{ name: 'i', index: i }] : [] });
  };
  for (let i = 0; i < nums.length; i++) {
    const ok = nums[i] === target;
    yield frame(4, { i, 'nums[i]': nums[i], target, 'số ô đã xem': i + 1 }, viz(i, ok ? 'done' : 'compare'),
      ok ? `nums[${i}] = ${target} ⇒ tìm thấy sau ${i + 1} lần so sánh.` : `${nums[i]} ≠ ${target}. Quét tuyến tính không tận dụng việc mảng gần như đã sắp xếp – worst case xem đủ n = ${nums.length} ô.`);
    if (ok) return i;
  }
  yield frame(6, { 'số ô đã xem': nums.length }, viz(nums.length, 'visited'), `Đã xem hết ${nums.length} ô, không có ${target} ⇒ −1. Đây chính là worst case O(n).`);
  return -1;
}
