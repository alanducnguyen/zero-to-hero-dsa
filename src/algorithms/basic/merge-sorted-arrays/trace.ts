import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { prepare, type MergeInput } from './node';

export function* trace(input: MergeInput): Generator<Frame, number[]> {
  const { nums1, m, nums2, n } = prepare(input);
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  const viz = (hl1: Record<number, Highlight> = {}, hl2: Record<number, Highlight> = {}) => {
    const doneHl: Record<number, Highlight> = {};
    for (let t = k + 1; t < m + n; t++) doneHl[t] = 'done';
    const p1 = [];
    if (i >= 0) p1.push({ name: 'i', index: i });
    if (k >= 0) p1.push({ name: 'k', index: k });
    return composite([
      arr(nums1, { title: `nums1 (m = ${m} phần tử thật + ${n} ô trống)`, highlights: { ...doneHl, ...hl1 }, pointers: p1, ranges: m > 0 && i >= 0 ? [{ from: 0, to: i, label: 'chưa xét', color: 'range' }] : [] }),
      arr(nums2.length ? nums2 : ['∅'], { title: 'nums2', highlights: hl2, pointers: j >= 0 ? [{ name: 'j', index: j }] : [] }),
    ]);
  };
  yield frame(8, { i, j, k, m, n }, viz(), `Ba con trỏ từ cuối: i = ${i} (phần tử thật cuối của nums1), j = ${j} (cuối nums2), k = ${k} (ô ghi). Đi từ cuối để ô ghi luôn là ô trống hoặc ô đã xét.`);
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      yield frame(10, { i, j, k, 'nums1[i]': nums1[i], 'nums2[j]': nums2[j] }, viz({ [i]: 'compare' }, { [j]: 'compare' }), `So sánh nums1[${i}] = ${nums1[i]} với nums2[${j}] = ${nums2[j]}: nums1 lớn hơn ⇒ nó là phần tử lớn nhất còn lại, đặt vào ô k = ${k}.`);
      nums1[k] = nums1[i];
      i--;
      yield frame(12, { i, j, k, 'nums1[k]': nums1[k] }, viz({ [k]: 'swap' }), `Ghi ${nums1[k]} vào nums1[${k}], i lùi về ${i}. Không mất dữ liệu vì k ≥ i + 1 luôn đúng.`);
    } else {
      yield frame(10, { i, j, k, 'nums1[i]': i >= 0 ? nums1[i] : '–', 'nums2[j]': nums2[j] }, viz(i >= 0 ? { [i]: 'compare' } : {}, { [j]: 'compare' }), i >= 0 ? `nums1[${i}] = ${nums1[i]} ≤ nums2[${j}] = ${nums2[j]} ⇒ lấy nums2 (≤ giữ ổn định).` : `nums1 đã hết (i < 0) ⇒ chép nốt nums2[${j}] = ${nums2[j]}.`);
      nums1[k] = nums2[j];
      j--;
      yield frame(15, { i, j, k, 'nums1[k]': nums1[k] }, viz({ [k]: 'swap' }, {}), `Ghi ${nums1[k]} vào nums1[${k}], j lùi về ${j}.`);
    }
    k--;
  }
  yield frame(19, { i, j, k, nums1: [...nums1] }, viz(Object.fromEntries(nums1.map((_, t) => [t, 'done' as Highlight]))), j < 0 && i >= 0 ? `nums2 đã hết; ${i + 1} phần tử đầu của nums1 đã đúng chỗ, không cần chép. Xong.` : 'Trộn xong tại chỗ, O(m + n), không bộ nhớ phụ.');
  return nums1;
}
