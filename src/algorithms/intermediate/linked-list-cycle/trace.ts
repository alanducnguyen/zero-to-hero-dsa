import { frame } from '@/engine/helpers';
import type { Frame, Highlight, LinkedListVisual } from '@/engine/types';
import { buildList, type ListNode } from './impl';
import type { CycleInput } from './node';

export function* trace(input: CycleInput): Generator<Frame, number> {
  const head = buildList(input.values, input.pos);
  const ids = new Map<ListNode, string>();
  const order: string[] = [];
  const idx = new Map<ListNode, number>();
  for (let n = head, i = 0; n && !ids.has(n); n = n.next, i++) {
    ids.set(n, `n${i}`);
    idx.set(n, i);
    order.push(`n${i}`);
  }
  const nodes = [...ids.keys()];
  const id = (n: ListNode | null) => (n ? ids.get(n)! : null);
  const str = (n: ListNode | null) => (n ? `${n.val} (#${idx.get(n)})` : 'null');
  const viz = (ptrs: { name: string; id: string | null }[], hl: Record<string, Highlight> = {}): LinkedListVisual => ({
    kind: 'linkedlist',
    title: input.pos >= 0 && input.pos < nodes.length ? `Danh sách có vòng: node cuối trỏ về #${input.pos}` : 'Danh sách không có vòng',
    nodes: nodes.map((n) => ({ id: ids.get(n)!, value: n.val, next: id(n.next) })),
    order,
    pointers: ptrs,
    highlights: hl,
  });

  let slow = head;
  let fast = head;
  let step = 0;
  yield frame(13, { slow: str(slow), fast: str(fast) }, viz([{ name: 'slow', id: id(slow) }, { name: 'fast', id: id(fast) }]), 'Cả hai con trỏ xuất phát từ head. slow đi 1 bước, fast đi 2 bước mỗi vòng lặp.');
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    step++;
    yield frame(16, { step, slow: str(slow), fast: str(fast) }, viz([{ name: 'slow', id: id(slow) }, { name: 'fast', id: id(fast) }], { ...(slow ? { [id(slow)!]: 'compare' as Highlight } : {}), ...(fast ? { [id(fast)!]: 'active' as Highlight } : {}) }), `Bước ${step}: slow → ${str(slow)}, fast → ${str(fast)}. Khoảng cách fast–slow tăng 1 mỗi bước; trong vòng độ dài L, fast "đuổi kịp" slow sau ≤ L bước.`);
    if (slow === fast) {
      yield frame(17, { step, meet: str(slow) }, viz([{ name: 'slow', id: id(slow) }, { name: 'fast', id: id(fast) }], { [id(slow)!]: 'swap' }), `slow === fast tại ${str(slow)} ⇒ CÓ VÒNG. Nhưng điểm gặp chưa chắc là đầu vòng.`);
      let p = head;
      yield frame(19, { p: str(p), slow: str(slow) }, viz([{ name: 'p', id: id(p) }, { name: 'slow', id: id(slow) }], { [id(slow)!]: 'swap' }), 'Giai đoạn 2: đặt p = head. Toán học: khoảng cách head→đầu vòng = khoảng cách điểm gặp→đầu vòng (mod L). Cho p và slow cùng đi 1 bước.');
      while (p !== slow) {
        p = p!.next;
        slow = slow!.next;
        yield frame(22, { p: str(p), slow: str(slow) }, viz([{ name: 'p', id: id(p) }, { name: 'slow', id: id(slow) }], { [id(p)!]: 'compare', [id(slow)!]: 'compare' }), `p → ${str(p)}, slow → ${str(slow)}.`);
      }
      const result = idx.get(p!)!;
      yield frame(24, { result, node: str(p) }, viz([{ name: 'p', id: id(p) }, { name: 'slow', id: id(slow) }], { [id(p)!]: 'done' }), `p === slow tại ${str(p)} ⇒ đây là đầu vòng (chỉ số ${result}).`);
      return result;
    }
  }
  yield frame(27, { fast: str(fast), result: -1 }, viz([{ name: 'slow', id: id(slow) }, { name: 'fast', id: id(fast) }]), 'fast chạm null ⇒ danh sách có điểm kết thúc ⇒ không có vòng. Trả về null.');
  return -1;
}
