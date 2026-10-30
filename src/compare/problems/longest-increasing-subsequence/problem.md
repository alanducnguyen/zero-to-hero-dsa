## Đề bài

Cho mảng số nguyên `nums`, trả về **độ dài** dãy con **tăng ngặt** dài nhất. Dãy con giữ nguyên thứ tự nhưng có thể bỏ bớt phần tử (không cần liên tiếp).

```
nums = [10, 9, 2, 5, 3, 7, 101, 18]  →  4   (2, 3, 7, 18)
nums = [0, 1, 0, 3, 2, 3]            →  4   (0, 1, 2, 3)
nums = [7, 7, 7, 7]                  →  1   (tăng ngặt, bằng nhau không tính)
```

Bài này là thước đo kinh điển: brute force hàm mũ, DP O(n²) mà ai học DP cũng phải viết được, và follow-up **O(n log n)** bằng patience sorting – câu hỏi phân loại ứng viên ở big tech.

## Ràng buộc

- `1 ≤ nums.length ≤ 2500`, `−10⁴ ≤ nums[i] ≤ 10⁴` (LeetCode 300). Follow-up: làm trong O(n log n).
- Trên trang này: tối đa 9 phần tử để cây đệ quy O(2ⁿ) còn xem được trong tab Debug.

## Câu hỏi nên hỏi lại

- Tăng **ngặt** hay **không giảm**? (Đổi `<` thành `≤`, và lower_bound thành upper_bound.)
- Cần độ dài hay **dãy thật**? (Patience sorting cần thêm mảng cha để khôi phục.)
- n lớn đến đâu? (n ≤ 2500 thì O(n²) đủ; n = 10⁵ bắt buộc O(n log n).)
- Có cần đếm số dãy LIS không? (LC 673 – DP O(n²) mở rộng tự nhiên.)
