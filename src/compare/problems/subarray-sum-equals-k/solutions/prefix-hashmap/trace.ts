import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const { nums, k } = input;
  const freq = new Map<number, number>([[0, 1]]);
  let sum = 0;
  let count = 0;
  const viz = (j: number, hl: Record<number, Highlight> = {}, mapHl: Record<string, Highlight> = {}) =>
    composite([
      arr(nums, { highlights: { ...Object.fromEntries(nums.slice(0, j).map((_, t) => [t, 'visited' as const])), ...hl }, pointers: j < nums.length ? [{ name: 'j', index: j }] : [] }),
      mapViz(freq, mapHl, 'freq: tổng tiền tố → số lần gặp'),
    ]);
  yield frame(3, { sum, count }, viz(0, {}, { '0': 'active' }), 'Khởi tạo freq = {0: 1}: tiền tố rỗng. Thiếu dòng này sẽ bỏ sót mọi mảng con bắt đầu từ chỉ số 0.');
  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];
    const need = sum - k;
    const hit = freq.get(need) ?? 0;
    count += hit;
    yield frame(8, { j, 'nums[j]': nums[j], sum, need, 'freq[need]': hit, count }, viz(j, { [j]: hit ? 'done' : 'compare' }, hit ? { [String(need)]: 'done' } : {}),
      hit ? `sum = ${sum}, cần tiền tố ${need} (vì ${sum} − ${need} = ${k}). Đã gặp ${hit} lần ⇒ có ${hit} mảng con kết thúc tại ${j} có tổng k, count = ${count}.` : `sum = ${sum}, cần tiền tố ${need} nhưng chưa từng gặp ⇒ không mảng con nào kết thúc tại ${j} có tổng k.`);
    freq.set(sum, (freq.get(sum) ?? 0) + 1);
    yield frame(9, { sum, 'freq[sum]': freq.get(sum) }, viz(j + 1, {}, { [String(sum)]: 'swap' }), `Ghi nhận tiền tố ${sum} (lần thứ ${freq.get(sum)}). Ghi sau khi tra: nếu ghi trước, k = 0 sẽ đếm nhầm mảng con rỗng.`);
  }
  yield frame(11, { count }, viz(nums.length), `Kết quả ${count} sau đúng một lượt O(n). Không cần giả định số dương – khác hẳn sliding window.`);
  return count;
}
