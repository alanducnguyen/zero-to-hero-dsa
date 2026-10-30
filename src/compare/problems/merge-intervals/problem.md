## Đề bài

Cho mảng các khoảng `intervals[i] = [start, end]` (`start ≤ end`). Gộp mọi khoảng **chồng lấn** và trả về danh sách các khoảng rời nhau phủ đúng phần trục mà input phủ, sắp xếp theo `start`.

Hai khoảng **chạm đầu mút** (`[1,4]` và `[4,5]`) được coi là chồng lấn và gộp thành `[1,5]`. Hai khoảng nguyên liền kề nhưng không chạm (`[1,2]` và `[3,4]`) **không** gộp.

```
[[1,3],[2,6],[8,10],[15,18]]  →  [[1,6],[8,10],[15,18]]
[[1,4],[4,5]]                 →  [[1,5]]
[[1,10],[2,3],[4,5]]          →  [[1,10]]      (lồng nhau)
```

## Ràng buộc

- `1 ≤ n ≤ 10⁴`, `0 ≤ start ≤ end ≤ 10⁴` (LeetCode 56). Trong thực tế toạ độ có thể tới 10⁹ hoặc là số thực (timestamp).
- Input **chưa** sắp xếp.
- Trong demo này toạ độ được kẹp vào `[−100, 100]` để mảng đếm của lời giải line sweep luôn nhỏ.

## Câu hỏi nên hỏi lại người phỏng vấn

- Chạm đầu mút có tính là chồng lấn không? (Lịch họp `[9,10]` và `[10,11]` thường **không** xung đột.)
- Khoảng là đóng `[a, b]` hay nửa mở `[a, b)`?
- Toạ độ là số nguyên trong miền nhỏ hay có thể rất lớn / số thực? – câu này quyết định có dùng được mảng đếm.
- Được sửa input (sort tại chỗ) không?
