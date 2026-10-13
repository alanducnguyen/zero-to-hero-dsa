## Đề bài

Cho mảng số nguyên `nums` và số `target`. Trả về **chỉ số** của hai phần tử có tổng bằng `target`. Mỗi input có đúng một đáp án (hoặc không có), không dùng cùng một phần tử hai lần.

```
nums = [2, 7, 11, 15], target = 9  →  [0, 1]   (2 + 7 = 9)
nums = [3, 2, 4],      target = 6  →  [1, 2]
nums = [3, 3],         target = 6  →  [0, 1]
```

## Ràng buộc

- `2 ≤ n ≤ 10⁴`, giá trị trong `[−10⁹, 10⁹]`.
- Mảng **không** sắp xếp (nếu đã sắp xếp thì bài thành Two Sum II và two pointers là tối ưu).

## Câu hỏi nên hỏi lại người phỏng vấn

- Có thể có nhiều đáp án không? Trả về cặp nào?
- Mảng có phần tử trùng? Có số âm?
- Yêu cầu chỉ số hay giá trị? (Quyết định có được sort tại chỗ hay không.)
- Bộ nhớ có bị giới hạn không? (Nếu O(1) bắt buộc, HashMap bị loại.)
