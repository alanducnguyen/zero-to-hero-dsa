/**
 * Insert Interval (LeetCode 57) – chèn một khoảng mới vào danh sách khoảng đã sắp xếp, rời nhau.
 * Ba pha: (1) khoảng nằm hẳn bên trái ⇒ giữ nguyên, (2) khoảng chồng lấn ⇒ gộp vào khoảng mới,
 * (3) khoảng nằm hẳn bên phải ⇒ giữ nguyên.
 * @param intervals các khoảng [start, end] đã sắp xếp theo start và không chồng lấn
 * @param newInterval khoảng cần chèn [start, end]
 * @returns danh sách khoảng sau khi chèn, vẫn sắp xếp và rời nhau
 */
export function insertInterval(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  let [start, end] = newInterval;
  const n = intervals.length;
  let i = 0;
  // Pha 1: kết thúc trước khi khoảng mới bắt đầu ⇒ nằm hẳn bên trái
  while (i < n && intervals[i][1] < start) {
    result.push([...intervals[i]]);
    i++;
  }
  // Pha 2: bắt đầu trước (hoặc đúng lúc) khoảng mới kết thúc ⇒ chồng lấn, gộp lại
  while (i < n && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  result.push([start, end]);
  // Pha 3: phần còn lại nằm hẳn bên phải
  while (i < n) {
    result.push([...intervals[i]]);
    i++;
  }
  return result;
}
