## Đề bài

Cho mảng `coins` các mệnh giá (mỗi loại dùng **không giới hạn** số lần) và số tiền `amount`. Trả về **số đồng ít nhất** để tạo đúng `amount`; nếu không thể, trả `-1`.

```
coins = [1, 2, 5], amount = 11  →  3   (5 + 5 + 1)
coins = [2],       amount = 3   →  -1
coins = [1],       amount = 0   →  0
coins = [1, 3, 4], amount = 6   →  2   (3 + 3) – tham lam chọn 4 + 1 + 1 = 3 đồng ⇒ sai
```

Đây là bài **unbounded knapsack dạng min** kinh điển. Người phỏng vấn muốn thấy bạn nhận ra tham lam không đúng với mệnh giá tuỳ ý, viết được công thức truy hồi, rồi tối ưu thành DP O(amount·k).

## Ràng buộc

- `1 ≤ coins.length ≤ 12`, `1 ≤ coins[i] ≤ 2³¹ − 1`, `0 ≤ amount ≤ 10⁴` (LeetCode 322).
- Trên trang này: tối đa 5 mệnh giá 1–10 và `amount ≤ 10` để cây đệ quy hàm mũ còn xem được trong tab Debug.

## Câu hỏi nên hỏi lại

- Mỗi đồng dùng được bao nhiêu lần? (Không giới hạn ⇒ unbounded; một lần ⇒ 0/1 knapsack, vòng lặp ngược.)
- Cần số đồng ít nhất, số **cách** đổi, hay danh sách đồng cụ thể? (Mỗi câu một biến thể DP khác.)
- `amount` lớn đến đâu? (Quyết định mảng dp O(amount) có vừa bộ nhớ không.)
- Mệnh giá có phải hệ "chuẩn" như tiền thật (1, 2, 5, 10…) không? (Nếu có, tham lam đúng – nhưng phải chứng minh.)
