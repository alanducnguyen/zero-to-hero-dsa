import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const fmt = (t: number[]) => `[${t.join(',')}]`;

export function* trace(input: { nums: number[] }): Generator<Frame, number[][]> {
  const { nums } = input;
  const found = new Map<string, number[]>();
  const viz = (i: number, j: number, seen: Set<number>, hj: Highlight, seenHl: Record<number, Highlight> = {}, resHl: Record<number, Highlight> = {}) => {
    const hlNums: Record<number, Highlight> = {};
    for (let x = i + 1; x < j; x++) hlNums[x] = 'visited';
    hlNums[i] = 'active';
    if (j < nums.length) hlNums[j] = hj;
    return composite([
      arr(nums, { highlights: hlNums, pointers: [{ name: 'i', index: i }, ...(j < nums.length ? [{ name: 'j', index: j }] : [])] }),
      arr([...seen], { title: `seen (giá trị sau i = ${i})`, highlights: seenHl }),
      arr([...found.values()].map(fmt), { title: 'found (Map khoá → bộ ba)', highlights: resHl }),
    ]);
  };
  for (let i = 0; i < nums.length; i++) {
    const seen = new Set<number>();
    for (let j = i + 1; j < nums.length; j++) {
      const need = 0 - nums[i] - nums[j];
      const hit = seen.has(need);
      const vars = { i, j, 'nums[i]': nums[i], 'nums[j]': nums[j], need, 'seen.has(need)': hit };
      if (hit) {
        const t = [nums[i], nums[j], need].sort((a, b) => a - b);
        const key = t.join(',');
        const dup = found.has(key);
        found.set(key, t);
        const idx = [...found.keys()].indexOf(key);
        yield frame(10, { ...vars, key }, viz(i, j, seen, 'done', { [[...seen].indexOf(need)]: 'done' }, { [idx]: dup ? 'swap' : 'done' }),
          dup ? `Cần ${need} và đã thấy ⇒ bộ ba ${fmt(t)}, nhưng khoá "${key}" đã có trong Map ⇒ ghi đè, không sinh trùng.` : `Cần ${need} = −(${nums[i]}) − (${nums[j]}), đã nằm trong seen ⇒ bộ ba ${fmt(t)}. Tra O(1) thay cho vòng k của brute force.`);
      } else {
        yield frame(8, vars, viz(i, j, seen, 'compare'), `Cần ${need} để tổng 0 nhưng chưa gặp trong đoạn (i, j). Thêm ${nums[j]} vào seen để các j sau tra O(1).`);
      }
      seen.add(nums[j]);
    }
  }
  const res = [...found.values()];
  yield frame(15, { 'số đáp án': res.length }, composite([arr(nums), arr(res.map(fmt), { title: 'kết quả' })]), `Hai vòng lồng nhau ⇒ O(n²). Nhưng mỗi i tạo một Set mới và Map khử trùng tốn bộ nhớ, hằng số lớn hơn two pointers.`);
  return res;
}
