/** Tách giờ bắt đầu và giờ kết thúc, sort riêng rồi quét bằng hai con trỏ. O(n log n) thời gian, không cần heap. */
export function minMeetingRooms(intervals: [number, number][]): number {
  const starts = intervals.map((iv) => iv[0]).sort((a, b) => a - b);
  const ends = intervals.map((iv) => iv[1]).sort((a, b) => a - b);
  let rooms = 0;
  let e = 0; // ends[e] = giờ trả phòng sớm nhất chưa được dùng lại
  for (const start of starts) {
    if (start < ends[e]) rooms++; // chưa ai trả phòng trước start ⇒ mở thêm
    else e++; // có cuộc họp đã kết thúc (ends[e] ≤ start) ⇒ dùng lại phòng đó
  }
  return rooms;
}
