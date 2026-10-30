/** Sort theo giờ bắt đầu + min-heap giờ kết thúc: đỉnh heap = phòng trống sớm nhất. O(n log n) thời gian, O(n) bộ nhớ. */
export function minMeetingRooms(intervals: [number, number][]): number {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const heap: number[] = []; // giờ kết thúc của mỗi phòng đã mở
  for (const [start, end] of sorted) {
    if (heap.length > 0 && heap[0] <= start) pop(heap); // phòng trống sớm nhất đã rảnh ⇒ giao lại
    push(heap, end);
  }
  return heap.length; // mỗi vòng size +1 hoặc giữ nguyên ⇒ size cuối = số phòng tối đa
}
function push(h: number[], x: number) {
  h.push(x);
  for (let i = h.length - 1; i > 0 && h[(i - 1) >> 1] > h[i]; i = (i - 1) >> 1) [h[i], h[(i - 1) >> 1]] = [h[(i - 1) >> 1], h[i]];
}
function pop(h: number[]) {
  const last = h.pop()!;
  if (h.length === 0) return;
  h[0] = last;
  for (let i = 0; ;) {
    let m = i;
    for (const c of [2 * i + 1, 2 * i + 2]) if (c < h.length && h[c] < h[m]) m = c;
    if (m === i) return;
    [h[i], h[m]] = [h[m], h[i]];
    i = m;
  }
}
