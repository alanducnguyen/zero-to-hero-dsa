import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, LinkedListVisual } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const list = (slow: number, fast: number, hl: Record<string, Highlight> = {}): LinkedListVisual => ({
    kind: 'linkedlist',
    title: 'Đồ thị i → nums[i] (node = chỉ số, giá trị = nums[i]); số trùng là node được 2 mũi tên trỏ tới',
    nodes: nums.map((v, i) => ({ id: String(i), value: `${i}→${v}`, next: String(v) })),
    pointers: [{ name: 'slow', id: String(slow) }, { name: 'fast', id: String(fast) }],
    highlights: hl,
  });
  const viz = (slow: number, fast: number, hl: Record<string, Highlight> = {}) => composite([arr(nums, { title: 'nums', highlights: { [slow]: 'pointer', [fast]: 'active' } }), list(slow, fast, hl)]);
  let slow = nums[0], fast = nums[0];
  yield frame(3, { slow, fast }, viz(slow, fast), 'Xem mỗi chỉ số i là một node trỏ tới nums[i]. Vì có số trùng, hai chỉ số cùng trỏ tới một node ⇒ tồn tại chu trình, và số trùng chính là điểm vào chu trình.');
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
    yield frame(6, { slow, fast }, viz(slow, fast), slow === fast ? `slow = fast = ${slow}: gặp nhau trong chu trình (giai đoạn 1 xong).` : `slow đi 1 bước → ${slow}, fast đi 2 bước → ${fast}.`);
  } while (slow !== fast);
  slow = nums[0];
  yield frame(8, { slow, fast }, viz(slow, fast), 'Giai đoạn 2: đưa slow về đầu (nums[0]), cả hai đi cùng tốc độ. Chúng sẽ gặp nhau đúng tại điểm vào chu trình (chứng minh như Linked List Cycle II).');
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
    yield frame(11, { slow, fast }, viz(slow, fast), `slow → ${slow}, fast → ${fast}.`);
  }
  yield frame(13, { result: slow }, viz(slow, fast, { [String(slow)]: 'done' }), `Gặp nhau tại ${slow} = điểm vào chu trình = số trùng. O(n), O(1), không sửa mảng – thoả mọi ràng buộc đề.`);
  return slow;
}
