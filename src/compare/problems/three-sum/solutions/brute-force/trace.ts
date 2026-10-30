import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const fmt = (t: number[]) => `[${t.join(',')}]`;

export function* trace(input: { nums: number[] }): Generator<Frame, number[][]> {
  const { nums } = input;
  const seen = new Set<string>();
  const res: number[][] = [];
  let checks = 0;
  const total = (nums.length * (nums.length - 1) * (nums.length - 2)) / 6;
  const viz = (i: number, j: number, k: number, h: Highlight, resHl: Record<number, Highlight> = {}) =>
    composite([
      arr(nums, { highlights: { [i]: h, [j]: h, [k]: h }, pointers: [{ name: 'i', index: i }, { name: 'j', index: j }, { name: 'k', index: k }] }),
      arr(res.map(fmt), { title: 'res (đã khử trùng bằng Set)', highlights: resHl }),
    ]);
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        checks++;
        const sum = nums[i] + nums[j] + nums[k];
        const vars = { i, j, k, sum, 'bộ ba đã thử': `${checks}/${total}` };
        if (sum !== 0) {
          yield frame(8, vars, viz(i, j, k, 'compare'), `${nums[i]} + ${nums[j]} + ${nums[k]} = ${sum} ≠ 0. Brute force không học được gì từ lần thử này – vẫn phải thử hết C(n,3) = ${total} bộ ba.`);
          continue;
        }
        const t = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
        const key = t.join(',');
        if (!seen.has(key)) {
          seen.add(key);
          res.push(t);
          yield frame(11, { ...vars, key }, viz(i, j, k, 'done', { [res.length - 1]: 'done' }), `Tổng = 0. Sắp xếp bộ ba thành khoá "${key}" để hai bộ ba cùng giá trị (khác chỉ số) có cùng khoá ⇒ khoá mới, thêm vào res.`);
        } else {
          yield frame(11, { ...vars, key }, viz(i, j, k, 'swap', { [res.findIndex((x) => x.join(',') === key)]: 'swap' }), `Tổng = 0 nhưng khoá "${key}" đã có trong Set ⇒ bộ ba trùng giá trị, bỏ qua. Đây là lý do cần Set: đề cấm trả trùng.`);
        }
      }
    }
  }
  yield frame(15, { 'bộ ba đã thử': checks, 'số đáp án': res.length }, composite([arr(nums), arr(res.map(fmt), { title: 'res' })]), `Đã thử đủ ${checks} bộ ba – O(n³). Với n = 3000 là ~4.5·10⁹ phép thử: quá chậm.`);
  return res;
}
