/**
 * Merge Intervals – gộp các khoảng chồng lấn.
 * Sắp xếp theo điểm đầu, rồi quét: nếu khoảng mới bắt đầu trước khi khoảng cuối kết thúc ⇒ gộp.
 * @param intervals mảng [start, end]
 * @returns các khoảng đã gộp, sắp xếp theo start
 */
export function mergeIntervals(intervals: [number, number][]): [number, number][] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]); // theo start
  const merged: [number, number][] = [[sorted[0][0], sorted[0][1]]];
  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end); // chồng lấn ⇒ kéo dài khoảng cuối
    } else {
      merged.push([start, end]); // rời nhau ⇒ khoảng mới
    }
  }
  return merged;
}
