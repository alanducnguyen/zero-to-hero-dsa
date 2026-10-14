import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const count = new Map<number, number>();
  const half = nums.length / 2;
  const viz = (i: number, hl: Record<string, Highlight> = {}) =>
    composite([arr(nums, { highlights: { ...Object.fromEntries(nums.slice(0, i).map((_, k) => [k, 'visited' as Highlight])), ...(i < nums.length ? { [i]: 'active' as Highlight } : {}) } }), mapViz(Object.fromEntries([...count].map(([k, v]) => [String(k), v])), hl, `count (cần > n/2 = ${half})`)]);
  for (let i = 0; i < nums.length; i++) {
    const c = (count.get(nums[i]) ?? 0) + 1;
    if (c > half) {
      yield frame(6, { x: nums[i], count: c, 'n/2': half }, viz(i, { [String(nums[i])]: 'done' }), `count[${nums[i]}] = ${c} > ${half} ⇒ đa số, dừng sớm sau ${i + 1} phần tử. Bộ nhớ đã dùng: ${count.size} khoá.`);
      return nums[i];
    }
    count.set(nums[i], c);
    yield frame(7, { x: nums[i], count: c }, viz(i + 1, { [String(nums[i])]: 'compare' }), `count[${nums[i]}] = ${c}. Map lớn dần theo số giá trị phân biệt – đây là chi phí O(n) bộ nhớ.`);
  }
  return nums[0];
}
