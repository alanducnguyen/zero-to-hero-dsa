/** Sort theo start rồi quét một lượt: chỉ cần so với khoảng CUỐI của kết quả. O(n log n). */
export function mergeIntervals(intervals: [number, number][]): [number, number][] {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [start, end] of sorted) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end); // chồng lấn ⇒ kéo dài khoảng cuối
    } else {
      merged.push([start, end]); // rời nhau (hoặc chưa có gì) ⇒ mở khoảng mới
    }
  }
  return merged;
}
