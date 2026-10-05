import { arr, composite, frame, hl, hlRange, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; target: number }): Generator<Frame, [number, number] | null> {
  const nums = input.nums;
  const target = input.target;
  const seen = new Map<number, number>();
  const viz = (i: number, extra: Record<number, Highlight> = {}, mapHl?: Record<string, Highlight>) =>
    composite([
      arr(nums, { title: `nums, target = ${target}`, highlights: { ...(i > 0 ? hlRange(0, i - 1, 'visited') : {}), ...extra }, pointers: i < nums.length ? [{ name: 'i', index: i }] : [] }),
      mapViz(seen, mapHl, 'seen: giá trị → chỉ số'),
    ]);
  yield frame(7, { target }, viz(0), 'Map rỗng. Ý tưởng: thay vì tìm cặp (O(n²)), với mỗi phần tử hỏi "phần bù của nó đã xuất hiện chưa?" – tra Map O(1).');
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    yield frame(9, { i, 'nums[i]': nums[i], need }, viz(i, hl([i, 'active'])), `Tại i = ${i}: nums[i] = ${nums[i]}, cần phần bù need = ${target} − ${nums[i]} = ${need}.`);
    const j = seen.get(need);
    yield frame(10, { i, need, j: j ?? 'undefined' }, viz(i, hl([i, 'active'], ...(j !== undefined ? [[j, 'compare'] as [number, 'compare']] : [])), j !== undefined ? { [String(need)]: 'compare' } : undefined), j !== undefined ? `seen có ${need} tại chỉ số ${j} ⇒ tìm thấy cặp!` : `seen chưa có ${need} ⇒ chưa ghép được.`);
    if (j !== undefined) {
      yield frame(12, { result: [j, i] }, viz(i, hl([j, 'done'], [i, 'done']), { [String(need)]: 'done' }), `Trả về [${j}, ${i}]: nums[${j}] + nums[${i}] = ${nums[j]} + ${nums[i]} = ${target}.`);
      return [j, i];
    }
    seen.set(nums[i], i);
    yield frame(14, { i, seen: Object.fromEntries(seen) }, viz(i + 1, {}, { [String(nums[i])]: 'swap' }), `Ghi seen[${nums[i]}] = ${i}. Ghi SAU khi kiểm tra để một phần tử không ghép với chính nó (vd target = 2·nums[i]).`);
  }
  yield frame(16, { result: null }, viz(nums.length), 'Duyệt hết không gặp phần bù ⇒ không có cặp. Mỗi phần tử tra và ghi Map O(1) ⇒ tổng O(n).');
  return null;
}
