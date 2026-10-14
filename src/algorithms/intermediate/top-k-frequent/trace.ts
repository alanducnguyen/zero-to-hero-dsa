import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number[]> {
  const nums = input.nums;
  const k = Math.max(1, Math.floor(input.k));
  const freq = new Map<number, number>();
  const heap: [number, number][] = [];
  const less = (a: [number, number], b: [number, number]) => a[1] < b[1] || (a[1] === b[1] && a[0] > b[0]);
  const heapViz = (hl: Record<number, Highlight> = {}): HeapVisual => ({ kind: 'heap', title: `Min-heap theo tần suất (hiển thị count), tối đa k = ${k}`, items: heap.map(([, c]) => c), highlights: hl });
  const viz = (numsHl: Record<number, Highlight> = {}, mapHl: Record<string, Highlight> = {}, heapHl: Record<number, Highlight> = {}) =>
    composite([
      arr(nums, { title: 'nums', highlights: numsHl }),
      mapViz(Object.fromEntries([...freq].map(([v, c]) => [String(v), c])), mapHl, 'freq: giá trị → số lần'),
      composite([heapViz(heapHl), arr(heap.length ? heap.map(([v, c]) => `${v}×${c}`) : ['rỗng'], { title: 'heap (giá trị×count) theo thứ tự mảng' })], 'row'),
    ]);

  for (let i = 0; i < nums.length; i++) {
    freq.set(nums[i], (freq.get(nums[i]) ?? 0) + 1);
    yield frame(9, { i, x: nums[i], 'freq[x]': freq.get(nums[i]) }, viz({ [i]: 'active' }, { [String(nums[i])]: 'active' }), `Đếm: freq[${nums[i]}] = ${freq.get(nums[i])}. Bước này O(n) với HashMap.`);
  }
  yield frame(10, { 'số giá trị khác nhau': freq.size, k }, viz(), `Có ${freq.size} giá trị khác nhau. Giờ chọn k = ${k} giá trị có count lớn nhất bằng min-heap kích thước k: đỉnh heap là "ứng viên yếu nhất".`);
  for (const [value, count] of freq) {
    heap.push([value, count]);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(heap[i], heap[p])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
    yield frame(34, { value, count, heapSize: heap.length }, viz({}, { [String(value)]: 'compare' }, { [i]: 'swap' }), `Đẩy (${value}, ×${count}) vào heap và siftUp về đúng chỗ theo count.`);
    if (heap.length > k) {
      const [ev, ec] = heap[0];
      yield frame(35, { heapSize: heap.length, k, 'đỉnh': `${ev}×${ec}` }, viz({}, { [String(ev)]: 'swap' }, { 0: 'swap' }), `heap.size = ${heap.length} > k ⇒ pop đỉnh (${ev}, ×${ec}) – tần suất nhỏ nhất trong heap nên chắc chắn không thuộc top-k.`);
      heap[0] = heap[heap.length - 1];
      heap.pop();
      let j = 0;
      for (;;) {
        const l = 2 * j + 1;
        const r = l + 1;
        let m = j;
        if (l < heap.length && less(heap[l], heap[m])) m = l;
        if (r < heap.length && less(heap[r], heap[m])) m = r;
        if (m === j) break;
        [heap[j], heap[m]] = [heap[m], heap[j]];
        j = m;
      }
      yield frame(38, { heapSize: heap.length, 'đỉnh mới': `${heap[0][0]}×${heap[0][1]}` }, viz({}, {}, { 0: 'active' }), `siftDown xong: đỉnh mới là (${heap[0][0]}, ×${heap[0][1]}).`);
    }
  }
  const result = heap.map(([value]) => value).sort((a, b) => (freq.get(b)! - freq.get(a)!) || a - b);
  yield frame(41, { result }, viz({}, Object.fromEntries(result.map((v) => [String(v), 'done' as Highlight])), Object.fromEntries(heap.map((_, i) => [i, 'done' as Highlight]))), `Heap chứa đúng k giá trị phổ biến nhất: [${result.join(', ')}] (sắp theo count giảm dần để dễ đọc).`);
  return result;
}
