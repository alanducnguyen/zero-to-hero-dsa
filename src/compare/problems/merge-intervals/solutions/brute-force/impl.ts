/** Brute force: lặp tìm BẤT KỲ cặp chồng lấn nào, gộp lại, cho tới khi không còn cặp nào. O(n³). */
export function mergeIntervals(intervals: [number, number][]): [number, number][] {
  const list = intervals.map(([a, b]) => [a, b] as [number, number]);
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < list.length && !changed; i++) {
      for (let j = i + 1; j < list.length && !changed; j++) {
        const a = list[i];
        const b = list[j];
        if (a[0] <= b[1] && b[0] <= a[1]) { // chồng lấn (kể cả chạm đầu mút)
          list[i] = [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
          list.splice(j, 1); // một khoảng biến mất ⇒ quét lại từ đầu
          changed = true;
        }
      }
    }
  }
  return list.sort((x, y) => x[0] - y[0]);
}
