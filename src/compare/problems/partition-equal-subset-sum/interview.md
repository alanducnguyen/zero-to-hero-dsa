## Kịch bản trình bày (6–8 phút)

1. **Quy bài** (30s): "Hai tập bằng nhau ⇔ tìm tập con tổng total/2. Tổng lẻ ⇒ false ngay." Câu này là nửa điểm của bài.
2. **Brute force** (30s): "Mỗi số lấy hoặc bỏ ⇒ 2ⁿ tập con. Với n = 200 là bất khả."
3. **Nhận ra trạng thái lặp** (1 phút): "Kết quả từ vị trí i chỉ phụ thuộc phần còn thiếu rem ⇒ trạng thái (i, rem), tối đa n·S cái ⇒ memo O(n·S)."
4. **Chuyển bottom-up** (1 phút): dp[i][j] = dp[i−1][j] || dp[i−1][j − num]. Nêu rõ trường hợp cơ sở dp[0][0] = true.
5. **Tối ưu bộ nhớ** (2 phút): code mảng 1 chiều, **giải thích vì sao duyệt j ngược** – đây là điểm người phỏng vấn chờ. Thêm dừng sớm khi dp[S] = true.
6. **Phân tích** (30s): O(n·S) thời gian, O(S) bộ nhớ, và nói rõ đó là giả đa thức.

## Follow-up thường gặp

- **Vì sao duyệt ngược? Duyệt xuôi thì sao?** Xuôi ⇒ dp[j − num] có thể đã bật bởi chính num ⇒ dùng num nhiều lần (unbounded). Thử với nums = [1], S = 2: duyệt xuôi bật cả dp[1] và dp[2].
- **In ra hai tập?** Giữ bảng 2 chiều, đi ngược từ (n, S): nếu dp[i−1][j] true thì bỏ số i, ngược lại lấy.
- **Nhanh hơn nữa?** Bitset: `bits |= bits << num`, O(n·S/64).
- **Giá trị rất lớn, n ≤ 40?** Meet-in-the-middle: liệt kê tổng hai nửa, sort một nửa rồi tìm phần bù.
- **Chia thành k tập bằng nhau (LeetCode 698)?** Không còn là knapsack một chiều; backtracking + bitmask DP O(2ⁿ·n).
- **Target Sum (494), Last Stone Weight II (1049)?** Cùng khung subset sum sau khi biến đổi đại số.

## Checklist tự kiểm

- Đã xử lý tổng lẻ trước khi cấp phát mảng?
- dp[0] = true?
- Vòng j dừng ở `j >= num` (không âm chỉ số)?
- Nói được sự khác nhau 0/1 vs unbounded knapsack chỉ nằm ở chiều duyệt?
