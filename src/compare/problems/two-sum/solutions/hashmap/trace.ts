import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[]; target: number }): Generator<Frame, [number, number] | null> {
  const { nums, target } = input;
  const seen = new Map<number, number>();
  const viz = (i: number, hl: Record<number, 'compare' | 'done' | 'visited'> = {}, mapHl: Record<string, 'compare' | 'done'> = {}) =>
    composite([arr(nums, { highlights: { ...Object.fromEntries(nums.slice(0, i).map((_, k) => [k, 'visited' as const])), ...hl }, pointers: i < nums.length ? [{ name: 'i', index: i }] : [] }), mapViz(Object.fromEntries([...seen].map(([v, k]) => [String(v), k])), mapHl, 'seen: giá trị → chỉ số')]);
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    const hit = seen.has(need);
    yield frame(5, { i, 'nums[i]': nums[i], need, 'seen.has(need)': hit }, viz(i, { [i]: hit ? 'done' : 'compare' }, hit ? { [String(need)]: 'done' } : {}),
      hit ? `Cần ${need}, đã thấy ở chỉ số ${seen.get(need)} ⇒ đáp án [${seen.get(need)}, ${i}] chỉ sau ${i + 1} phần tử.` : `Cần ${need} nhưng chưa gặp. Lưu ${nums[i]} → ${i} để các phần tử sau tra O(1).`);
    if (hit) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }
  yield frame(8, {}, viz(nums.length), 'Duyệt hết, không có cặp.');
  return null;
}
