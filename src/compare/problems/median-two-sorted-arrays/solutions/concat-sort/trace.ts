import { arr, frame, hl } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums1: number[]; nums2: number[] }): Generator<Frame, number> {
  const { nums1, nums2 } = input;
  const all = [...nums1, ...nums2].sort((x, y) => x - y);
  yield frame(3, { 'm + n': all.length }, arr(all, { title: 'nums1 + nums2 sau khi sort' }), `Nối ${nums1.length} + ${nums2.length} phần tử rồi sort: O((m+n) log(m+n)). Lãng phí thông tin "đã sắp xếp" – nhưng là lời giải đúng nhanh nhất để viết.`);
  const mid = all.length >> 1;
  const odd = all.length % 2 === 1;
  const res = odd ? all[mid] : (all[mid - 1] + all[mid]) / 2;
  yield frame(5, { mid, odd, median: res }, arr(all, { highlights: odd ? hl([mid, 'done']) : hl([mid - 1, 'done'], [mid, 'done']) }), odd ? `Tổng lẻ ⇒ trung vị là phần tử #${mid} = ${res}.` : `Tổng chẵn ⇒ trung bình hai phần tử giữa #${mid - 1}, #${mid}: (${all[mid - 1]} + ${all[mid]}) / 2 = ${res}.`);
  return res;
}
