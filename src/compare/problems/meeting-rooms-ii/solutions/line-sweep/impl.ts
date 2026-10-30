/** Line sweep trên trục thời gian: +1 tại start, −1 tại end, cộng dồn = số cuộc họp đang diễn ra; lấy max. O(n + R). */
export function minMeetingRooms(intervals: [number, number][]): number {
  if (intervals.length === 0) return 0;
  const lo = Math.min(...intervals.map((iv) => iv[0]));
  const hi = Math.max(...intervals.map((iv) => iv[1]));
  const diff = new Array<number>(hi - lo + 1).fill(0); // R = hi − lo + 1 ô, không cần sort
  for (const [s, e] of intervals) {
    diff[s - lo]++;
    diff[e - lo]--; // nửa mở [s, e): tại e phòng đã trả ⇒ cuộc họp bắt đầu lúc e dùng lại được
  }
  let cur = 0;
  let rooms = 0;
  for (let x = 0; x < diff.length; x++) {
    cur += diff[x];
    rooms = Math.max(rooms, cur);
  }
  return rooms;
}
