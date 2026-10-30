import { arr, composite, frame, hl } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums1: number[]; nums2: number[] }): Generator<Frame, number> {
  const { nums1, nums2 } = input;
  const merged: number[] = [];
  let i = 0, j = 0;
  const viz = (fromA: boolean | null) => composite([
    arr(nums1, { title: 'nums1', highlights: fromA === true ? hl([i - 1, 'active']) : {}, pointers: i < nums1.length ? [{ name: 'i', index: i }] : [] }),
    arr(nums2, { title: 'nums2', highlights: fromA === false ? hl([j - 1, 'active']) : {}, pointers: j < nums2.length ? [{ name: 'j', index: j }] : [] }),
    arr(merged, { title: 'merged', highlights: merged.length ? hl([merged.length - 1, 'done']) : {} }),
  ]);
  while (i < nums1.length || j < nums2.length) {
    if (j >= nums2.length || (i < nums1.length && nums1[i] <= nums2[j])) {
      merged.push(nums1[i++]);
      yield frame(6, { i, j, 'lấy': nums1[i - 1] }, viz(true), j >= nums2.length ? `nums2 đã hết ⇒ lấy nốt nums1[${i - 1}] = ${nums1[i - 1]}.` : `nums1[${i - 1}] = ${nums1[i - 1]} ≤ nums2[${j}] = ${nums2[j]} ⇒ lấy từ nums1. Hai đầu mảng luôn là hai ứng viên nhỏ nhất còn lại.`);
    } else {
      merged.push(nums2[j++]);
      yield frame(7, { i, j, 'lấy': nums2[j - 1] }, viz(false), i >= nums1.length ? `nums1 đã hết ⇒ lấy nốt nums2[${j - 1}] = ${nums2[j - 1]}.` : `nums2[${j - 1}] = ${nums2[j - 1]} < nums1[${i}] = ${nums1[i]} ⇒ lấy từ nums2.`);
    }
  }
  const mid = merged.length >> 1;
  const odd = merged.length % 2 === 1;
  const res = odd ? merged[mid] : (merged[mid - 1] + merged[mid]) / 2;
  yield frame(10, { mid, median: res }, composite([arr(merged, { title: 'merged', highlights: odd ? hl([mid, 'done']) : hl([mid - 1, 'done'], [mid, 'done']) })]), `Trộn xong O(m+n). Trung vị = ${res}. Nhưng ta đã trộn cả nửa sau – phần đó không cần thiết.`);
  return res;
}
