/** Đếm tần suất, rồi giữ min-heap theo count kích thước k: đỉnh là ứng viên yếu nhất trong top-k. O(n + m log k). */
export function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
  const heap: [number, number][] = []; // [giá trị, count], min theo count
  const c = (i: number) => heap[i][1];
  const up = (i: number) => { while (i > 0) { const p = (i - 1) >> 1; if (c(p) <= c(i)) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const down = (i: number) => { for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && c(l) < c(m)) m = l; if (r < heap.length && c(r) < c(m)) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } };
  for (const entry of freq) {
    heap.push(entry);
    up(heap.length - 1);
    if (heap.length > k) { // vượt k ⇒ bỏ giá trị ít gặp nhất, nó không thể thuộc top-k
      heap[0] = heap[heap.length - 1];
      heap.pop();
      down(0);
    }
  }
  return heap.map(([value]) => value);
}
