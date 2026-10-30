/** Line sweep đếm: +1 tại start, −1 ngay SAU end trên trục toạ độ nhân đôi; vùng phủ > 0 liên tục là một khoảng gộp. O(n + R). */
export function mergeIntervals(intervals: [number, number][]): [number, number][] {
  if (intervals.length === 0) return [];
  const lo = Math.min(...intervals.map((iv) => iv[0]));
  const hi = Math.max(...intervals.map((iv) => iv[1]));
  const diff = new Array<number>(2 * (hi - lo) + 2).fill(0); // ô 2x = điểm x, ô 2x+1 = "ngay sau x"
  for (const [s, e] of intervals) {
    diff[2 * (s - lo)]++;
    diff[2 * (e - lo) + 1]--; // kết thúc SAU điểm e ⇒ [1,4] và [4,5] vẫn dính nhau
  }
  const merged: [number, number][] = [];
  let cover = 0;
  let start = 0;
  for (let p = 0; p < diff.length; p++) {
    const prev = cover;
    cover += diff[p];
    if (prev === 0 && cover > 0) start = p / 2 + lo; // chỉ ô chẵn có +1 ⇒ p chẵn
    if (prev > 0 && cover === 0) merged.push([start, (p - 1) / 2 + lo]); // chỉ ô lẻ có −1 ⇒ p lẻ
  }
  return merged;
}
