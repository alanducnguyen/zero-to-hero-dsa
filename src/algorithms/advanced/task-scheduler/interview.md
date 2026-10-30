## Cách trình bày trong phỏng vấn

1. Làm rõ: thứ tự task có được đổi không? `n = 0`? Có trả về lịch cụ thể không?
2. Bắt đầu bằng nhận xét nút cổ chai: task nhiều nhất cần `maxFreq − 1` khoảng nghỉ.
3. Vẽ khung `maxFreq × (n + 1)` lên bảng, điền ví dụ `"AAABBB"`, `n = 2`, chỉ ra hàng cuối dài `countMax`.
4. Nêu trường hợp tràn khung ⇒ `max(..., tasks.length)`.
5. Viết 5 dòng code, test `"AAABBB"/2 → 8`, `"AAABCDEFG"/2 → 9`, `"AAA"/0 → 3`.
6. Nếu được hỏi lịch cụ thể, chuyển sang lời giải heap:

```ts
function leastIntervalHeap(tasks: string, n: number): number {
  const freq = new Map<string, number>();
  for (const t of tasks) freq.set(t, (freq.get(t) ?? 0) + 1);
  let heap = [...freq.values()]; // max-heap thu gọn: ≤ 26 phần tử nên sort đủ dùng
  const cooling: [number, number][] = []; // [count còn lại, thời điểm được chạy lại]
  let time = 0;
  while (heap.length || cooling.length) {
    time++;
    heap.sort((a, b) => b - a);
    const top = heap.shift();
    if (top !== undefined && top > 1) cooling.push([top - 1, time + n]);
    if (cooling.length && cooling[0][1] === time) heap.push(cooling.shift()![0]);
  }
  return time;
}
```

## Câu hỏi follow-up thường gặp

- **Tại sao điền theo cột không vi phạm cooldown?** Mỗi loại không-max có ≤ `maxFreq − 1` bản sao ⇒ nằm ở các hàng khác nhau; hai hàng liên tiếp cách nhau ≥ `n + 1`.
- **Khi nào không có idle?** Khi `tasks.length ≥ frameSlots` – khung tràn, nới cột.
- **Trả lịch cụ thể?** Heap + queue cooldown, hoặc dựng khung rồi đọc theo hàng.
- **Thứ tự cố định (Task Scheduler II)?** Không còn greedy sắp xếp; dùng Map `lastTime[t]` và nhảy thời gian.
- **Nhiều CPU / task có độ dài khác nhau?** Mô phỏng sự kiện với heap theo thời điểm rảnh.

## Checklist nhận diện pattern

- "Cùng loại phải cách nhau ≥ k", được tự do sắp xếp ⇒ nghĩ ngay tới **phần tử nhiều nhất** và khung `(maxFreq − 1)·(k + 1)`.
- Chỉ hỏi độ dài/khả thi ⇒ công thức đếm; hỏi chuỗi cụ thể ⇒ heap greedy.
- Bảng chữ cái nhỏ (26) ⇒ bộ nhớ O(1), duyệt tần suất là hằng số.

## Bài luyện tập liên quan

- 621 Task Scheduler → 767 Reorganize String → 358 Rearrange String k Distance Apart.
- 1054 Distant Barcodes, 2365 Task Scheduler II, 1405 Longest Happy String.
