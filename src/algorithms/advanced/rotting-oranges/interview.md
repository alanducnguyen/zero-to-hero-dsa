## Cách trình bày trong phỏng vấn

1. Diễn đạt lại: "Thời điểm một cam bị thối = khoảng cách ngắn nhất tới cam thối gần nhất; đáp án = max các khoảng cách đó."
2. Nhận diện: nhiều nguồn lan song song, mỗi bước cùng chi phí ⇒ **multi-source BFS**, đẩy mọi nguồn vào queue từ đầu.
3. Nói rõ cách đếm phút: BFS theo tầng bằng `size` chụp trước vòng lặp.
4. Đếm `fresh` để (a) dừng sớm, (b) phát hiện `-1` mà không cần quét lại lưới.
5. Nêu edge case trước khi code: không có cam tươi ⇒ 0; có cam tươi nhưng không có cam thối ⇒ -1; lưới rỗng.
6. Phân tích O(m·n) thời gian và bộ nhớ, nhắc tránh `shift()` trong JS.

## Câu hỏi follow-up thường gặp

- **Tại sao không BFS từ từng cam thối?** O(k·m·n) và phải lấy min khoảng cách – multi-source gộp thành một lần O(m·n) vì tương đương thêm một siêu nguồn ảo.
- **Không được sửa input?** Dùng bản sao hoặc mảng `visited` riêng.
- **Muốn biết mỗi cam thối lúc nào?** Lưu `time[r][c] = time[cur] + 1` khi đẩy vào queue.
- **Cam lan 8 hướng?** Thêm 4 hướng chéo vào `dirs`.
- **Một số ô làm chậm lây lan (mất 2 phút)?** Không còn đồng trọng số ⇒ 0-1 BFS / Dijkstra đa nguồn.
- **Lưới cực lớn, chỉ có vài cam tươi?** Có thể BFS ngược từ cam tươi, hoặc dừng sớm ngay khi `fresh = 0` (code đã làm).
- **Tại sao điều kiện vòng lặp có `fresh > 0`?** Tránh đếm thêm tầng cuối không lây được ai.

## Checklist nhận diện pattern

- "Sau bao nhiêu phút/ngày/bước", "lan ra", "lây nhiễm", "đồng thời" ⇒ BFS theo tầng.
- Nhiều điểm xuất phát cùng lúc, cần khoảng cách tới điểm **gần nhất** ⇒ multi-source BFS.
- Cần phát hiện phần tử "không bao giờ chạm tới" ⇒ đếm trước số phần tử mục tiêu, giảm dần.
- Lưới + mỗi bước chi phí 1 ⇒ BFS; chi phí khác nhau ⇒ Dijkstra.

## Template multi-source BFS theo tầng

```ts
const queue = allSources();
let steps = 0, head = 0;
while (head < queue.length && remaining > 0) {
  for (let size = queue.length - head; size > 0; size--) {
    const cur = queue[head++];
    for (const nb of neighbors(cur)) if (isTarget(nb)) { mark(nb); remaining--; queue.push(nb); }
  }
  steps++;
}
return remaining === 0 ? steps : -1;
```

## Bài luyện tập liên quan

- 994 Rotting Oranges, 542 01 Matrix, 286 Walls and Gates.
- 1162 As Far from Land as Possible, 934 Shortest Bridge.
- 1765 Map of Highest Peak, 2684 Maximum Number of Moves in a Grid.
- 815 Bus Routes (BFS trên trạng thái), 317 Shortest Distance from All Buildings (Hard).
