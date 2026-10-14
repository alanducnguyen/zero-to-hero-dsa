## Đề bài

Cho mảng `nums` độ dài n. Trả về **phần tử đa số**: phần tử xuất hiện nhiều hơn ⌊n/2⌋ lần. Đề đảm bảo phần tử đa số luôn tồn tại.

```
nums = [3, 2, 3]              →  3
nums = [2, 2, 1, 1, 1, 2, 2]  →  2
```

## Ràng buộc

- `1 ≤ n ≤ 5·10⁴`, giá trị trong `[−10⁹, 10⁹]`.
- Follow-up của đề: giải trong O(n) thời gian và **O(1) bộ nhớ**.

## Câu hỏi nên hỏi lại

- Đa số có chắc chắn tồn tại không? (Nếu không, Boyer-Moore cần thêm lượt xác minh.)
- Có được sắp xếp tại chỗ không?
- Dữ liệu là luồng hay mảng tĩnh?
