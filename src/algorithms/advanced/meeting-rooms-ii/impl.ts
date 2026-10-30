/**
 * Meeting Rooms II (LeetCode 253) – số phòng họp tối thiểu.
 * Sắp xếp theo giờ bắt đầu; min-heap giữ giờ kết thúc của các phòng đang bận.
 * Đỉnh heap = phòng trống sớm nhất ⇒ nếu nó trống trước cuộc họp mới thì tái sử dụng.
 * @param intervals các cuộc họp [start, end) (end = start của cuộc khác thì không trùng)
 * @returns số phòng ít nhất để tổ chức mọi cuộc họp
 */
export function minMeetingRooms(intervals: number[][]): number {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const heap: number[] = []; // min-heap giờ kết thúc
  let rooms = 0;
  for (const [start, end] of sorted) {
    if (heap.length > 0 && heap[0] <= start) {
      popMin(heap); // phòng trống sớm nhất đã rảnh ⇒ dùng lại nó
    }
    push(heap, end);
    rooms = Math.max(rooms, heap.length);
  }
  return rooms;
}

function push(heap: number[], x: number): void {
  heap.push(x);
  let i = heap.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (heap[p] <= heap[i]) break;
    [heap[p], heap[i]] = [heap[i], heap[p]];
    i = p;
  }
}

function popMin(heap: number[]): number {
  const top = heap[0];
  const last = heap.pop()!;
  if (heap.length > 0) {
    heap[0] = last;
    let i = 0;
    for (;;) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let s = i;
      if (l < heap.length && heap[l] < heap[s]) s = l;
      if (r < heap.length && heap[r] < heap[s]) s = r;
      if (s === i) break;
      [heap[s], heap[i]] = [heap[i], heap[s]];
      i = s;
    }
  }
  return top;
}
