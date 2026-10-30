## Đề bài

Cho mảng số nguyên dương `nums`. Hỏi có thể chia mảng thành **hai tập con có tổng bằng nhau** không (mỗi phần tử thuộc đúng một tập)?

```
nums = [1, 5, 11, 5]  →  true    ([1, 5, 5] và [11], mỗi tập tổng 11)
nums = [1, 2, 3, 5]   →  false   (tổng 11 lẻ)
nums = [1, 2, 3, 4]   →  true    ([1, 4] và [2, 3])
```

## Nhận xét quy bài

Hai tập bằng nhau ⇔ mỗi tập có tổng `total / 2`. Vậy chỉ cần hỏi: **có tập con nào tổng đúng S = total / 2?** – đây là subset sum, dạng boolean của 0/1 knapsack. Tổng lẻ ⇒ trả `false` ngay.

## Ràng buộc

- `1 ≤ n ≤ 200`, `1 ≤ nums[i] ≤ 100` ⇒ S ≤ 10⁴, nên DP theo tổng (n·S ≤ 2·10⁶) rất rẻ.
- Trên trang này giới hạn 8 số, mỗi số ≤ 20 để cây đệ quy còn xem được.

## Câu hỏi nên hỏi lại người phỏng vấn

- Số có thể âm hoặc bằng 0 không? (Âm phá vỡ DP theo chỉ số tổng.)
- Giới hạn giá trị? (Nếu giá trị tới 10⁹ mà n nhỏ, DP theo tổng vô dụng ⇒ meet-in-the-middle.)
- Chỉ cần true/false hay phải in ra hai tập?
