import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight } from '@/engine/types';
import { normalize, type MKInput } from './node';

type Item = [number, number, number];

export function* trace(input: MKInput): Generator<Frame, number[]> {
  const lists = normalize(input);
  const heap: Item[] = [];
  const pos: number[] = lists.map(() => 0); // số phần tử đã lấy của mỗi danh sách
  const result: number[] = [];
  const less = (a: Item, b: Item) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
  const swap = (i: number, j: number) => ([heap[i], heap[j]] = [heap[j], heap[i]]);
  const push = (it: Item) => {
    heap.push(it);
    for (let i = heap.length - 1; i > 0; ) {
      const p = (i - 1) >> 1;
      if (!less(heap[i], heap[p])) break;
      swap(i, p);
      i = p;
    }
  };
  const pop = (): Item => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = last;
      for (let i = 0; ; ) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < heap.length && less(heap[l], heap[m])) m = l;
        if (r < heap.length && less(heap[r], heap[m])) m = r;
        if (m === i) break;
        swap(i, m);
        i = m;
      }
    }
    return top;
  };
  const viz = (active?: { li: number; p: number; color: Highlight }, heapHl: Record<number, Highlight> = {}) => {
    const rows = lists.map((l, li) => {
      const hl: Record<number, Highlight> = {};
      l.forEach((_, p) => { if (p < pos[li]) hl[p] = 'visited'; });
      const inHeap = heap.find((it) => it[1] === li);
      if (inHeap) hl[inHeap[2]] = 'compare';
      if (active && active.li === li) hl[active.p] = active.color;
      return arr(l.length ? l : ['∅'], { title: `list ${li}`, highlights: hl, pointers: pos[li] < l.length ? [{ name: 'đầu', index: pos[li] }] : [] });
    });
    const heapViz: HeapVisual = { kind: 'heap', title: `Min-heap ${heap.length} phần tử (vàng = đang ở đầu danh sách, trong heap)`, items: heap.map((it) => it[0]), highlights: heapHl };
    return composite([composite(rows, 'column'), heapViz, arr(result.length ? result : ['—'], { title: 'Kết quả', highlights: Object.fromEntries(result.map((_, i) => [i, 'done' as Highlight])) })]);
  };

  for (let i = 0; i < lists.length; i++) {
    if (lists[i].length > 0) {
      push([lists[i][0], i, 0]);
      yield frame(37, { i, 'lists[i][0]': lists[i][0], heapSize: heap.length }, viz({ li: i, p: 0, color: 'active' }), `Đẩy phần tử đầu của list ${i} (= ${lists[i][0]}) vào heap. Heap chỉ giữ tối đa k = ${lists.length} phần tử – một đại diện cho mỗi danh sách.`);
    } else {
      yield frame(37, { i, heapSize: heap.length }, viz(), `list ${i} rỗng ⇒ bỏ qua.`);
    }
  }
  while (heap.length > 0) {
    const [value, li, p] = heap[0];
    yield frame(40, { 'đỉnh': value, list: li, pos: p, heapSize: heap.length }, viz({ li, p, color: 'swap' }, { 0: 'swap' }), `Đỉnh heap = ${value} (list ${li}) là nhỏ nhất trong ${heap.length} đầu danh sách ⇒ chắc chắn là phần tử nhỏ nhất còn lại toàn cục.`);
    pop();
    result.push(value);
    pos[li] = p + 1;
    if (p + 1 < lists[li].length) {
      push([lists[li][p + 1], li, p + 1]);
      yield frame(42, { value, list: li, 'kế tiếp': lists[li][p + 1], heapSize: heap.length }, viz({ li, p: p + 1, color: 'active' }), `Ghi ${value} vào kết quả; nạp phần tử kế tiếp của list ${li} (= ${lists[li][p + 1]}) vào heap để list đó vẫn có đại diện.`);
    } else {
      yield frame(42, { value, list: li, heapSize: heap.length }, viz(), `Ghi ${value} vào kết quả; list ${li} đã hết, không nạp thêm – heap nhỏ dần.`);
    }
  }
  yield frame(44, { result: [...result] }, viz(), `Heap rỗng ⇒ xong. ${result.length} phần tử, mỗi phần tử qua heap một lần: O(N log k).`);
  return result;
}
