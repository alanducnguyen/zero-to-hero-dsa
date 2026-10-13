/** Min-heap kích thước k: giữ k phần tử lớn nhất đã gặp; đỉnh heap chính là phần tử lớn thứ k. O(n log k), O(k). */
export function kthLargest(nums: number[], k: number): number {
  const heap: number[] = [];
  const up = (i: number) => { while (i > 0) { const p = (i - 1) >> 1; if (heap[p] <= heap[i]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const down = (i: number) => { for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && heap[l] < heap[m]) m = l; if (r < heap.length && heap[r] < heap[m]) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } };
  for (const x of nums) {
    heap.push(x);
    up(heap.length - 1);
    if (heap.length > k) { // vượt k ⇒ bỏ phần tử nhỏ nhất, nó không thể là top-k
      heap[0] = heap[heap.length - 1];
      heap.pop();
      down(0);
    }
  }
  return heap[0];
}
