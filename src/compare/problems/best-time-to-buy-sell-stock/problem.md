## Đề bài

Cho mảng `prices`, `prices[i]` là giá cổ phiếu ở ngày `i`. Chọn **một** ngày mua và **một** ngày bán **sau đó** để lợi nhuận lớn nhất. Nếu không có cách nào lời, trả về `0`.

```
prices = [7, 1, 5, 3, 6, 4]  →  5   (mua 1, bán 6)
prices = [7, 6, 4, 3, 1]     →  0   (giá chỉ giảm – không giao dịch)
prices = [2, 4, 1]           →  2   (đáy 1 đến sau đỉnh 4 nên vô dụng)
```

## Ràng buộc

- `1 ≤ n ≤ 10⁵`, `0 ≤ prices[i] ≤ 10⁴`.
- Chỉ một lần mua và một lần bán; bán phải sau mua (có thể cùng ngày ⇒ lời 0).

## Câu hỏi nên hỏi lại người phỏng vấn

- Có được giao dịch nhiều lần không? (Nếu có → bài 122, greedy cộng mọi đoạn tăng.)
- Có phí giao dịch / thời gian chờ (cooldown)? (→ bài 714 / 309, DP trạng thái.)
- Trả về lợi nhuận hay cả ngày mua/bán?
