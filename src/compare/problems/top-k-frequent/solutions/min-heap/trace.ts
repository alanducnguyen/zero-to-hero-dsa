import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight } from '@/engine/types';
import { countPhase, freqViz, type TkInput } from '../../count';

export function* trace(input: TkInput): Generator<Frame, number[]> {
  const { nums, k } = input;
  const freq = new Map<number, number>();
  yield* countPhase(nums, freq);
  const heap: [number, number][] = [];
  const c = (i: number) => heap[i][1];
  const up = (i: number) => { while (i > 0) { const p = (i - 1) >> 1; if (c(p) <= c(i)) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } return i; };
  const down = (i: number) => { for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && c(l) < c(m)) m = l; if (r < heap.length && c(r) < c(m)) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } };
  const viz = (mapHl: Record<string, Highlight> = {}, heapHl: Record<number, Highlight> = {}) => {
    const h: HeapVisual = { kind: 'heap', title: `Min-heap theo count (hiển thị count), tối đa k = ${k}`, items: heap.map(([, cnt]) => cnt), highlights: heapHl };
    return composite([freqViz(freq, mapHl), composite([h, arr(heap.length ? heap.map(([v, cnt]) => `${v}×${cnt}`) : ['rỗng'], { title: 'heap (giá trị×count)' })], 'row')]);
  };
  for (const [value, count] of freq) {
    heap.push([value, count]);
    const at = up(heap.length - 1);
    yield frame(11, { value, count, heapSize: heap.length, k }, viz({ [String(value)]: 'compare' }, { [at]: 'swap' }), `Đẩy (${value}, ×${count}) vào heap, siftUp O(log k). Heap là min theo count để đỉnh luôn là ứng viên YẾU nhất – thứ cần bị loại đầu tiên.`);
    if (heap.length > k) {
      const [ev, ec] = heap[0];
      heap[0] = heap[heap.length - 1];
      heap.pop();
      down(0);
      yield frame(15, { 'loại': `${ev}×${ec}`, heapSize: heap.length }, viz({ [String(ev)]: 'muted' }, { 0: 'active' }), `Heap có ${k + 1} phần tử ⇒ pop đỉnh (${ev}, ×${ec}): đã có k giá trị khác gặp ít nhất ${ec} lần nên nó chắc chắn không thuộc top-k.`);
    }
  }
  const result = heap.map(([value]) => value);
  yield frame(18, { result }, viz(Object.fromEntries(result.map((v) => [String(v), 'done' as Highlight])), Object.fromEntries(heap.map((_, i) => [i, 'done' as Highlight]))), `Heap còn đúng k giá trị phổ biến nhất: [${result.join(', ')}]. Bộ nhớ heap chỉ O(k) – hợp với luồng dữ liệu.`);
  return result;
}
