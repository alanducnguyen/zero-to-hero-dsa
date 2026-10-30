## Đề bài

Cho mảng số nguyên `nums` độ dài `n`. Trả về mảng `answer` với `answer[i]` là **tích mọi phần tử của `nums` trừ `nums[i]`**.

Yêu cầu: thời gian **O(n)** và **không được dùng phép chia**. Follow-up: chỉ dùng O(1) bộ nhớ phụ (mảng output không tính).

```
nums = [1, 2, 3, 4]        →  [24, 12, 8, 6]
nums = [-1, 1, 0, -3, 3]   →  [0, 0, 9, 0, 0]
nums = [0, 4, 0]           →  [0, 0, 0]
```

## Ràng buộc

- `2 ≤ n ≤ 10⁵`, `−30 ≤ nums[i] ≤ 30`.
- Đảm bảo tích của mọi prefix/suffix vừa số nguyên 32-bit.

## Câu hỏi nên hỏi lại người phỏng vấn

- Có số 0 không? Bao nhiêu số 0? (Phá vỡ lời giải chia ngây thơ.)
- Có được dùng phép chia không? (Đề gốc cấm – vì vậy lời giải chia chỉ để thảo luận.)
- Mảng output có tính vào bộ nhớ phụ không? (Quyết định lời giải O(1) có hợp lệ.)
- Có lo tràn số không? (Ràng buộc đảm bảo không, nhưng nên hỏi.)
