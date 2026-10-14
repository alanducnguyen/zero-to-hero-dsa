## Đề bài

Cho mảng số nguyên `nums` và số `k`. Trả về **phần tử lớn thứ k** theo thứ tự sắp xếp (không phải phần tử phân biệt thứ k).

```
nums = [3, 2, 1, 5, 6, 4], k = 2  →  5
nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4  →  4
```

## Ràng buộc

- `1 ≤ k ≤ n ≤ 10⁵`, giá trị trong `[−10⁴, 10⁴]`.
- Đề gốc hỏi "có thể giải mà không sắp xếp không?" – đó là gợi ý cho heap hoặc quickselect.

## Câu hỏi nên hỏi lại

- k nhỏ so với n hay cỡ n/2? (Quyết định heap hay quickselect.)
- Mảng có được sửa tại chỗ không? (Quickselect làm xáo trộn mảng.)
- Dữ liệu đến dạng luồng hay có sẵn toàn bộ? (Luồng ⇒ heap.)
- Miền giá trị nhỏ? (⇒ counting sort O(n + range).)
