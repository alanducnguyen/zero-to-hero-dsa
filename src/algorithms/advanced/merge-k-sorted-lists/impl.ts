/**
 * Merge k Sorted Lists – trộn k danh sách đã sắp xếp bằng min-heap kích thước k.
 * Heap giữ phần tử đầu (chưa lấy) của mỗi danh sách: [giá trị, chỉ số danh sách, vị trí].
 * Mỗi bước pop min, đẩy phần tử kế tiếp của cùng danh sách ⇒ O(N log k) với N = tổng phần tử.
 */
export function mergeKSortedLists(lists: number[][]): number[] {
  type Item = [number, number, number]; // [value, listIdx, pos]
  const heap: Item[] = [];
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
  for (let i = 0; i < lists.length; i++) if (lists[i].length > 0) push([lists[i][0], i, 0]);
  const result: number[] = [];
  while (heap.length > 0) {
    const [value, li, pos] = pop(); // nhỏ nhất trong k đầu danh sách
    result.push(value);
    if (pos + 1 < lists[li].length) push([lists[li][pos + 1], li, pos + 1]); // nạp phần tử kế tiếp của danh sách đó
  }
  return result;
}
