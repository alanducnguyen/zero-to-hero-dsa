import { arr, composite, frame, hl, mapViz } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums1: number[]; nums2: number[] }): Generator<Frame, number> {
  const { nums1, nums2 } = input;
  const total = nums1.length + nums2.length;
  let i = 0, j = 0, prev = 0, cur = 0;
  const viz = (fromA: boolean) => composite([
    arr(nums1, { title: 'nums1', highlights: { ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'visited'])), ...(fromA ? hl([i - 1, 'active']) : {}) }, pointers: i < nums1.length ? [{ name: 'i', index: i }] : [] }),
    arr(nums2, { title: 'nums2', highlights: { ...Object.fromEntries(Array.from({ length: j }, (_, k) => [k, 'visited'])), ...(!fromA ? hl([j - 1, 'active']) : {}) }, pointers: j < nums2.length ? [{ name: 'j', index: j }] : [] }),
    mapViz({ prev, cur, 'bước': `${i + j}/${(total >> 1) + 1}` }, { cur: 'active' }, 'Chỉ 2 biến thay cho mảng gộp'),
  ]);
  for (let step = 0; step <= total >> 1; step++) {
    prev = cur;
    const fromA = j >= nums2.length || (i < nums1.length && nums1[i] <= nums2[j]);
    if (fromA) cur = nums1[i++];
    else cur = nums2[j++];
    yield frame(fromA ? 7 : 8, { step, i, j, prev, cur }, viz(fromA), `Bước ${step}: phần tử nhỏ thứ ${step} của mảng gộp là ${cur} (từ ${fromA ? 'nums1' : 'nums2'}). Chỉ cần đi tới vị trí ⌊(m+n)/2⌋ = ${total >> 1}, giữ phần tử trước đó trong prev cho trường hợp tổng chẵn.`);
  }
  const res = total % 2 ? cur : (prev + cur) / 2;
  yield frame(10, { total, prev, cur, median: res }, viz(true), total % 2 ? `Tổng lẻ ⇒ trung vị = cur = ${res}.` : `Tổng chẵn ⇒ (prev + cur) / 2 = (${prev} + ${cur}) / 2 = ${res}. O(m+n) thời gian, O(1) bộ nhớ – vẫn tuyến tính.`);
  return res;
}
