## Cách trình bày trong phỏng vấn

1. Làm rõ: số âm? số 0? giới hạn n và giá trị (LC: n ≤ 200, nums[i] ≤ 100 ⇒ S ≤ 10 000)?
2. Quy đổi: hai tập bằng nhau ⇔ tồn tại tập con tổng `total / 2`. Tổng lẻ ⇒ `false` ngay.
3. Nhận ra **0/1 knapsack boolean**; viết công thức 2 chiều `dp[i][j] = dp[i-1][j] || dp[i-1][j-num]`.
4. Nén về 1 chiều và **giải thích rõ vì sao duyệt j ngược** (đọc giá trị của hàng cũ, mỗi số dùng 1 lần).
5. Phân tích O(n·S) thời gian, O(S) bộ nhớ; nhắc đây là giả đa thức.
6. Test: `[1,5,11,5]`, `[1,2,3,5]`, tổng lẻ, một phần tử, `[1,3]` (bắt lỗi duyệt xuôi).

## Câu hỏi follow-up thường gặp

- **Nếu duyệt j tăng dần thì sao?** Thành unbounded knapsack – một số được dùng nhiều lần; `[1,3]` sẽ trả sai `true`.
- **Trả về chính hai tập con?** Giữ bảng 2 chiều (hoặc mảng `from[j]` lưu số đã bật ô j) rồi truy vết từ `target`.
- **Tăng tốc?** Bitset: `bits |= bits << num`, kiểm tra bit `target`. Có thể sắp giảm dần và dừng sớm.
- **Có số âm?** Dịch offset theo tổng số âm, hoặc dùng `Set` các tổng đạt được.
- **Chia thành k tập?** NP-khó tổng quát; backtracking có cắt tỉa hoặc bitmask DP O(2ⁿ·n).
- **Giá trị cực lớn, n ≤ 40?** Meet-in-the-middle: liệt kê tổng hai nửa, sort + two pointers/binary search.

## Checklist nhận diện pattern

- "Chọn một tập con" + "tổng đúng bằng / không vượt quá" ⇒ knapsack.
- Mỗi phần tử dùng **tối đa một lần** ⇒ 0/1 ⇒ duyệt dung lượng **ngược**.
- Chỉ hỏi có/không ⇒ dp boolean; hỏi số cách ⇒ dp đếm; hỏi tối ưu ⇒ dp max/min.
- Ràng buộc tổng nhỏ (≤ ~10⁴–10⁵) là gợi ý DP theo tổng.

## Bài luyện tập liên quan

- LC 416 – Partition Equal Subset Sum
- LC 494 – Target Sum
- LC 1049 – Last Stone Weight II
- LC 474 – Ones and Zeroes
- LC 698 – Partition to K Equal Sum Subsets
- LC 518 – Coin Change II
