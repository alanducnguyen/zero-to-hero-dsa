import { frame } from '@/engine/helpers';
import type { Frame, Highlight, LinkedListVisual } from '@/engine/types';
import { fromArray, toArray, type ListNode } from './impl';
import type { MInput } from './node';

export function* trace(input: MInput): Generator<Frame, number[]> {
  const sorted = (x: number[]) => [...x].sort((p, q) => p - q);
  const headA = fromArray(sorted(input.a)), headB = fromArray(sorted(input.b));
  const ids = new Map<ListNode, string>();
  const order: string[] = [];
  let k = 0;
  for (let n = headA; n; n = n.next) { ids.set(n, `a${k++}`); order.push(ids.get(n)!); }
  k = 0;
  for (let n = headB; n; n = n.next) { ids.set(n, `b${k++}`); order.push(ids.get(n)!); }
  const dummy: ListNode = { val: 0, next: null };
  ids.set(dummy, 'd');
  const all = [dummy, ...ids.keys()].filter((n, i, arr) => arr.indexOf(n) === i);
  const id = (n: ListNode | null) => (n ? ids.get(n)! : null);
  const str = (n: ListNode | null) => (n ? String(n.val) : 'null');
  const viz = (a: ListNode | null, b: ListNode | null, tail: ListNode, hl: Record<string, Highlight> = {}): LinkedListVisual => {
    // thứ tự hiển thị: chuỗi kết quả từ dummy, rồi phần còn lại của a, b
    const shown: string[] = [];
    for (let n: ListNode | null = dummy; n; n = n.next) shown.push(id(n)!);
    for (const oid of order) if (!shown.includes(oid)) shown.push(oid);
    return {
      kind: 'linkedlist',
      title: 'Danh sách: bắt đầu bằng dummy (d), node được nối lại chứ không tạo mới',
      nodes: all.map((n) => ({ id: id(n)!, value: n === dummy ? 'd' : n.val, next: id(n.next) })),
      order: shown,
      pointers: [{ name: 'a', id: id(a) }, { name: 'b', id: id(b) }, { name: 'tail', id: id(tail) }],
      highlights: hl,
    };
  };
  let a = headA, b = headB;
  let tail = dummy;
  yield frame(12, { a: str(a), b: str(b) }, viz(a, b, tail), 'Dummy node làm đầu giả: tail luôn có node để nối, không cần xử lý riêng "node đầu tiên".');
  while (a !== null && b !== null) {
    yield frame(14, { 'a.val': a.val, 'b.val': b.val }, viz(a, b, tail, { [id(a)!]: 'compare', [id(b)!]: 'compare' }), `So ${a.val} với ${b.val}: lấy ${a.val <= b.val ? 'a (≤ để giữ stable)' : 'b'}.`);
    if (a.val <= b.val) { tail.next = a; a = a.next; } else { tail.next = b; b = b.next; }
    yield frame(21, { tail: str(tail.next) }, viz(a, b, tail.next!, { [id(tail.next)!]: 'swap' }), `tail.next trỏ tới node đó, tiến tail.`);
    tail = tail.next!;
  }
  tail.next = a ?? b;
  yield frame(23, { 'còn lại': a ? `a từ ${a.val}` : b ? `b từ ${b.val}` : 'không' }, viz(a, b, tail, a ?? b ? { [id(a ?? b)!]: 'done' } : {}), `Một danh sách hết ⇒ nối thẳng phần còn lại của danh sách kia (đã sắp xếp, mọi phần tử ≥ tail).`);
  const result = toArray(dummy.next);
  yield frame(24, { result }, viz(null, null, tail, Object.fromEntries(all.filter((n) => n !== dummy).map((n) => [id(n)!, 'done' as Highlight]))), `Trả về dummy.next: ${result.join(' → ')}. O(n + m), O(1) bộ nhớ phụ.`);
  return result;
}
