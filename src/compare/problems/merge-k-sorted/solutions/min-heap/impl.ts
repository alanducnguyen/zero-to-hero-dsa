/** Min-heap k phần tử: mỗi list một đại diện (đầu chưa lấy). Pop min, nạp phần tử kế của list đó. O(N log k), O(k). */
export function mergeK(lists: number[][]): number[] {
  type Item = [number, number, number]; // [value, listIdx, pos]
  const heap: Item[] = [];
  const less = (a: Item, b: Item) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
  const push = (it: Item) => { heap.push(it); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (!less(heap[i], heap[p])) break; [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } };
  const pop = (): Item => { const top = heap[0]; const last = heap.pop()!; if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && less(heap[l], heap[m])) m = l; if (r < heap.length && less(heap[r], heap[m])) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } } return top; };
  for (let i = 0; i < lists.length; i++) if (lists[i].length) push([lists[i][0], i, 0]);
  const out: number[] = [];
  while (heap.length) {
    const [v, li, pos] = pop();
    out.push(v);
    if (pos + 1 < lists[li].length) push([lists[li][pos + 1], li, pos + 1]);
  }
  return out;
}
