import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = input.nums;
  const n = nums.length;
  const memo = new Map<number, number>();
  const stack: string[] = [];
  const viz = (hl: Record<number, Highlight> = {}) =>
    composite([
      arr(nums, { title: 'nums (nhãn = i)', highlights: Object.fromEntries(Object.keys(hl).map((k) => [k, 'pointer' as Highlight])) }),
      arr(Array.from({ length: n }, (_, i) => (memo.has(i) ? memo.get(i)! : '·')), { title: 'memo[i] = tiền tốt nhất từ nhà i trở đi', highlights: hl }),
    ]);
  yield frame(3, { n }, viz(), 'Tạo memo rỗng. best(i) chỉ phụ thuộc i ⇒ có đúng n trạng thái, mỗi cái tính một lần.');
  function* best(i: number): Generator<Frame, number> {
    if (i >= n) return 0; // cơ sở: không cần frame riêng
    stack.push(`best(${i})`);
    if (memo.has(i)) {
      yield frame(6, { i, 'memo[i]': memo.get(i) }, viz({ [i]: 'done' }), `best(${i}) đã có = ${memo.get(i)} ⇒ trả ngay. Chính chỗ này cắt bỏ cả cây con mà đệ quy thuần phải đi lại.`, { callStack: [...stack] });
      stack.pop();
      return memo.get(i)!;
    }
    yield frame(7, { i, 'nums[i]': nums[i] }, viz({ [i]: 'active' }), `best(${i}) chưa có ⇒ so sánh bỏ nhà ${i} (best(${i + 1})) với cướp nó (${nums[i]} + best(${i + 2})).`, { callStack: [...stack] });
    const skip = yield* best(i + 1);
    const take = nums[i] + (yield* best(i + 2));
    const v = Math.max(skip, take);
    memo.set(i, v);
    yield frame(8, { i, skip, take, 'memo[i]': v }, viz({ [i]: 'swap' }), `memo[${i}] = max(${skip}, ${take}) = ${v}. Lưu lại để mọi lần gọi sau là O(1).`, { callStack: [...stack] });
    stack.pop();
    return v;
  }
  const r = yield* best(0);
  yield frame(11, { result: r, 'số trạng thái đã tính': memo.size }, viz(n > 0 ? { 0: 'done' } : {}), `best(0) = ${r}: ${memo.size} trạng thái, mỗi trạng thái O(1) ⇒ O(n). Nhưng vẫn tốn O(n) stack đệ quy.`);
  return r;
}
