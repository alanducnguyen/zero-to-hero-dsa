import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const seen = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    const hit = seen.has(nums[i]);
    yield frame(5, { i, x: nums[i], 'seen.has(x)': hit, 'seen.size': seen.size }, composite([arr(nums, { highlights: { ...Object.fromEntries(nums.slice(0, i).map((_, k) => [k, 'visited' as Highlight])), [i]: hit ? 'done' : 'active' } }), mapViz(Object.fromEntries([...seen].map((v) => [String(v), '✓'])), hit ? { [String(nums[i])]: 'done' } : {}, 'seen (O(n) bộ nhớ – vi phạm ràng buộc đề)')]), hit ? `${nums[i]} đã có trong set ⇒ đáp án.` : `Thêm ${nums[i]} vào set.`);
    if (hit) return nums[i];
    seen.add(nums[i]);
  }
  return -1;
}
