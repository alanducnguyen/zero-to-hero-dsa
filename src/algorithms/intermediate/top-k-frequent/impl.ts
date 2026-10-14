/**
 * Top K Frequent Elements – k phần tử xuất hiện nhiều nhất.
 * Bước 1: HashMap đếm tần suất. Bước 2: min-heap kích thước k theo tần suất:
 * đẩy từng (giá trị, tần suất) vào, vượt k thì pop phần tử ít gặp nhất.
 * O(n log k) – tốt hơn sort O(n log n) khi k ≪ n.
 */
export function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
  const heap: [number, number][] = []; // [value, count], min-heap theo count
  const less = (a: [number, number], b: [number, number]) => a[1] < b[1] || (a[1] === b[1] && a[0] > b[0]);
  const siftUp = (i: number) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(heap[i], heap[p])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  };
  const siftDown = (i: number) => {
    for (;;) {
      const l = 2 * i + 1;
      const r = l + 1;
      let m = i;
      if (l < heap.length && less(heap[l], heap[m])) m = l;
      if (r < heap.length && less(heap[r], heap[m])) m = r;
      if (m === i) break;
      [heap[i], heap[m]] = [heap[m], heap[i]];
      i = m;
    }
  };
  for (const [value, count] of freq) {
    heap.push([value, count]);
    siftUp(heap.length - 1);
    if (heap.length > k) {
      heap[0] = heap[heap.length - 1]; // pop đỉnh = phần tử ít gặp nhất trong heap
      heap.pop();
      siftDown(0);
    }
  }
  return heap.map(([value]) => value).sort((a, b) => (freq.get(b)! - freq.get(a)!) || a - b);
}
