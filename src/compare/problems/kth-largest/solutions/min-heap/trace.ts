import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const { nums } = input;
  const k = Math.max(1, Math.min(input.k, nums.length));
  const heap: number[] = [];
  const up = (i: number) => { while (i > 0) { const p = (i - 1) >> 1; if (heap[p] <= heap[i]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const down = (i: number) => { for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && heap[l] < heap[m]) m = l; if (r < heap.length && heap[r] < heap[m]) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } };
  const viz = (idx: number, hl: Record<number, Highlight> = {}) => {
    const h: HeapVisual = { kind: 'heap', title: `Min-heap ≤ k = ${k} phần tử (đỉnh = lớn thứ k tạm thời)`, items: [...heap], highlights: hl };
    return composite([arr(nums, { highlights: { ...Object.fromEntries(nums.slice(0, idx).map((_, i) => [i, 'visited' as Highlight])), ...(idx < nums.length ? { [idx]: 'active' as Highlight } : {}) } }), h]);
  };
  for (let i = 0; i < nums.length; i++) {
    heap.push(nums[i]);
    up(heap.length - 1);
    yield frame(8, { x: nums[i], heapSize: heap.length, k }, viz(i, { [heap.indexOf(nums[i])]: 'swap' }), `Đẩy ${nums[i]} vào heap (siftUp). Heap luôn chứa các phần tử lớn nhất đã gặp.`);
    if (heap.length > k) {
      const dropped = heap[0];
      heap[0] = heap[heap.length - 1];
      heap.pop();
      down(0);
      yield frame(11, { dropped, 'đỉnh mới': heap[0], heapSize: heap.length }, viz(i + 1, { 0: 'compare' }), `Heap có ${k + 1} phần tử ⇒ pop đỉnh ${dropped}: nó nhỏ hơn ${k} phần tử khác nên chắc chắn không phải lớn thứ ${k}.`);
    }
  }
  yield frame(15, { 'heap[0]': heap[0] }, viz(nums.length, { 0: 'done' }), `Xong: đỉnh heap = ${heap[0]} là phần tử lớn thứ ${k}. Mỗi phần tử chỉ tốn O(log k).`);
  return heap[0];
}
