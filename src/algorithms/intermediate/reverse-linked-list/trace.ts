import { frame } from '@/engine/helpers';
import type { Frame, Highlight, LinkedListVisual } from '@/engine/types';
import { fromArray, toArray, type ListNode } from './impl';

export function* trace(input: { values: number[] }): Generator<Frame, number[]> {
  const head = fromArray(input.values);
  // gán id ổn định cho từng node theo thứ tự ban đầu
  const ids = new Map<ListNode, string>();
  const order: string[] = [];
  for (let n = head, i = 0; n; n = n.next, i++) {
    ids.set(n, `n${i}`);
    order.push(`n${i}`);
  }
  const allNodes = [...ids.keys()];
  const viz = (prev: ListNode | null, curr: ListNode | null, next: ListNode | null | undefined, highlights: Record<string, Highlight> = {}): LinkedListVisual => ({
    kind: 'linkedlist',
    nodes: allNodes.map((n) => ({ id: ids.get(n)!, value: n.val, next: n.next ? ids.get(n.next)! : null })),
    order,
    pointers: [
      { name: 'prev', id: prev ? ids.get(prev)! : null },
      { name: 'curr', id: curr ? ids.get(curr)! : null },
      ...(next !== undefined ? [{ name: 'next', id: next ? ids.get(next)! : null }] : []),
    ],
    highlights,
  });
  const id = (n: ListNode | null) => (n ? ids.get(n)! : null);
  const str = (n: ListNode | null) => (n ? String(n.val) : 'null');

  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  yield frame(13, { prev: null, curr: str(curr) }, viz(prev, curr, undefined), 'prev = null (đầu của danh sách đã đảo, hiện rỗng), curr = head (node đang xử lý).');
  while (curr !== null) {
    yield frame(14, { prev: str(prev), curr: str(curr) }, viz(prev, curr, undefined, { [id(curr)!]: 'active' }), `curr = ${curr.val} ≠ null ⇒ còn node để đảo.`);
    const next: ListNode | null = curr.next;
    yield frame(15, { prev: str(prev), curr: str(curr), next: str(next) }, viz(prev, curr, next, { [id(curr)!]: 'active', ...(next ? { [id(next)!]: 'compare' } : {}) }), `Lưu next = curr.next = ${str(next)}. Nếu không lưu, sau khi đổi curr.next ta sẽ mất phần còn lại của danh sách.`);
    curr.next = prev;
    yield frame(16, { prev: str(prev), curr: str(curr), next: str(next) }, viz(prev, curr, next, { [id(curr)!]: 'swap' }), `curr.next = prev: mũi tên của ${curr.val} giờ quay ngược về ${str(prev)}.`);
    prev = curr;
    yield frame(17, { prev: str(prev), curr: str(curr), next: str(next) }, viz(prev, curr, next, { [id(curr)!]: 'done' }), `prev = curr: ${curr.val} trở thành đầu của phần đã đảo.`);
    curr = next;
    yield frame(18, { prev: str(prev), curr: str(curr) }, viz(prev, curr, undefined, prev ? { [id(prev)!]: 'done' } : {}), `curr = next: tiến tới node ${str(curr)}.`);
  }
  const result = toArray(prev);
  yield frame(20, { prev: str(prev), result }, viz(prev, curr, undefined, Object.fromEntries(allNodes.map((n) => [ids.get(n)!, 'done' as Highlight]))), `curr = null ⇒ dừng. prev = ${str(prev)} là head mới. Danh sách: ${result.join(' → ')}.`);
  return result;
}
