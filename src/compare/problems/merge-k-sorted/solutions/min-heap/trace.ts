import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight } from '@/engine/types';

type Item = [number, number, number];

export function* trace(input: { lists: number[][] }): Generator<Frame, number[]> {
  const lists = input.lists;
  const heap: Item[] = [];
  const pos = lists.map(() => 0);
  const out: number[] = [];
  const less = (a: Item, b: Item) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
  const push = (it: Item) => { heap.push(it); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (!less(heap[i], heap[p])) break; [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } };
  const pop = (): Item => { const top = heap[0]; const last = heap.pop()!; if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && less(heap[l], heap[m])) m = l; if (r < heap.length && less(heap[r], heap[m])) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } } return top; };
  const viz = (active?: { li: number; p: number; color: Highlight }) => {
    const rows = lists.map((l, li) => {
      const hl: Record<number, Highlight> = {};
      l.forEach((_, p) => { if (p < pos[li]) hl[p] = 'visited'; });
      const inHeap = heap.find((it) => it[1] === li);
      if (inHeap) hl[inHeap[2]] = 'compare';
      if (active && active.li === li) hl[active.p] = active.color;
      return arr(l.length ? l : ['∅'], { title: `list ${li}`, highlights: hl });
    });
    const h: HeapVisual = { kind: 'heap', title: `min-heap ≤ k = ${lists.length} phần tử (một đại diện mỗi list)`, items: heap.map((it) => it[0]) };
    return composite([...rows, h, arr(out.length ? out : ['—'], { title: 'kết quả', highlights: Object.fromEntries(out.map((_, k) => [k, 'done' as Highlight])) })]);
  };
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].length) { push([lists[i][0], i, 0]); yield frame(8, { i, 'lists[i][0]': lists[i][0], heapSize: heap.length }, viz({ li: i, p: 0, color: 'active' }), `Đẩy đầu list ${i} vào heap. Heap không bao giờ vượt k phần tử.`); }
  }
  while (heap.length) {
    const [v, li, p] = heap[0];
    yield frame(11, { 'đỉnh': v, list: li, heapSize: heap.length }, viz({ li, p, color: 'swap' }), `Đỉnh = ${v} (list ${li}) là nhỏ nhất trong ${heap.length} đầu list ⇒ nhỏ nhất toàn cục còn lại. Pop O(log k).`);
    pop();
    out.push(v);
    pos[li] = p + 1;
    if (p + 1 < lists[li].length) { push([lists[li][p + 1], li, p + 1]); yield frame(13, { v, list: li, 'nạp': lists[li][p + 1] }, viz({ li, p: p + 1, color: 'active' }), `Ghi ${v}; nạp phần tử kế của list ${li} (${lists[li][p + 1]}) để list đó vẫn có đại diện.`); }
    else yield frame(13, { v, list: li }, viz(), `Ghi ${v}; list ${li} đã cạn.`);
  }
  yield frame(15, { N: out.length }, viz(), `Xong: ${out.length} phần tử × O(log k) = O(N log k).`);
  return out;
}
