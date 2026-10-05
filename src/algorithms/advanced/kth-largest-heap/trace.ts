import { arr, composite, frame, hl } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const nums = input.nums;
  const k = Math.max(1, Math.min(input.k, nums.length || 1));
  const data: number[] = [];
  const heap = (highlights?: Record<number, Highlight>, title?: string): HeapVisual => ({ kind: 'heap', items: [...data], highlights, title: title ?? `Min-heap (giữ tối đa k = ${k} phần tử)` });
  const viz = (idx: number, heapHl?: Record<number, Highlight>, title?: string) =>
    composite([arr(nums, { title: 'nums', highlights: { ...Object.fromEntries(nums.map((_, i) => [i, i < idx ? 'visited' : 'muted'])), ...(idx < nums.length ? hl([idx, 'active']) : {}) } }), heap(heapHl, title)], 'column');
  const cs = (fn: string) => ['findKthLargest()', fn];

  yield frame(57, { k }, viz(0), `Tạo min-heap rỗng. Ý tưởng: heap luôn chứa k phần tử lớn nhất đã gặp; đỉnh (nhỏ nhất trong heap) chính là phần tử lớn thứ k.`);
  for (let idx = 0; idx < nums.length; idx++) {
    const x = nums[idx];
    yield frame(58, { idx, x, heapSize: data.length }, viz(idx), `Xét x = ${x}.`);
    // push
    data.push(x);
    let i = data.length - 1;
    yield frame(14, { x, i }, viz(idx, hl([i, 'swap'])), `push: thêm ${x} vào cuối mảng heap (vị trí ${i}) – lá mới ở tầng dưới cùng.`, { callStack: cs('push') });
    while (i > 0) {
      const parent = (i - 1) >> 1;
      yield frame(31, { i, parent, 'data[parent]': data[parent], 'data[i]': data[i] }, viz(idx, hl([i, 'compare'], [parent, 'compare'])), `siftUp: so sánh với cha (vị trí ${parent} = ${data[parent]}). ${data[parent] <= data[i] ? 'Cha ≤ con ⇒ đúng thứ tự heap, dừng.' : 'Cha > con ⇒ vi phạm min-heap, hoán đổi.'}`, { callStack: cs('siftUp') });
      if (data[parent] <= data[i]) break;
      [data[parent], data[i]] = [data[i], data[parent]];
      yield frame(32, { i, parent }, viz(idx, hl([i, 'swap'], [parent, 'swap'])), `Hoán đổi ⇒ ${data[parent]} nổi lên vị trí ${parent}.`, { callStack: cs('siftUp') });
      i = parent;
    }
    yield frame(60, { x, heapSize: data.length, k }, viz(idx, undefined), `heap.size = ${data.length}${data.length > k ? ` > k ⇒ pop phần tử nhỏ nhất (đỉnh = ${data[0]}) vì nó chắc chắn không phải top-k.` : ' ≤ k ⇒ giữ nguyên.'}`);
    if (data.length > k) {
      const last = data.pop()!;
      yield frame(20, { top: data[0] ?? last, last }, viz(idx, data.length ? hl([0, 'swap']) : undefined), `pop: lấy đỉnh ra, đưa phần tử cuối (${last}) lên gốc để giữ cây hoàn chỉnh, rồi siftDown.`, { callStack: cs('pop') });
      if (data.length > 0) {
        data[0] = last;
        let j = 0;
        const n = data.length;
        for (;;) {
          const l = 2 * j + 1, r = 2 * j + 2;
          let smallest = j;
          if (l < n && data[l] < data[smallest]) smallest = l;
          if (r < n && data[r] < data[smallest]) smallest = r;
          yield frame(45, { i: j, l: l < n ? data[l] : '—', r: r < n ? data[r] : '—', smallest }, viz(idx, { [j]: 'compare', ...(l < n ? { [l]: 'compare' as Highlight } : {}), ...(r < n ? { [r]: 'compare' as Highlight } : {}) }), smallest === j ? `siftDown: ${data[j]} nhỏ hơn hoặc bằng cả hai con ⇒ đúng vị trí, dừng.` : `siftDown: con nhỏ nhất là ${data[smallest]} < ${data[j]} ⇒ hoán đổi để giữ tính chất min-heap.`, { callStack: cs('siftDown') });
          if (smallest === j) break;
          [data[smallest], data[j]] = [data[j], data[smallest]];
          yield frame(46, { i: j, smallest }, viz(idx, hl([j, 'swap'], [smallest, 'swap'])), `Hoán đổi, tiếp tục chìm xuống vị trí ${smallest}.`, { callStack: cs('siftDown') });
          j = smallest;
        }
      }
    }
  }
  const result = data[0];
  yield frame(62, { result, heap: [...data] }, viz(nums.length, hl([0, 'done'])), `Đã xét hết. Heap chứa đúng ${data.length} phần tử lớn nhất; đỉnh = ${result} là phần tử lớn thứ ${k}.`);
  return result;
}
