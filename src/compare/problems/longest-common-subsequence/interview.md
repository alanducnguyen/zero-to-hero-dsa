## Kịch bản trình bày

1. **Làm rõ** (30 giây): "Dãy con, không cần liên tiếp; chỉ trả độ dài hay cần chuỗi?" – câu trả lời quyết định có được bỏ bảng.
2. **Đệ quy** (1–2 phút): định nghĩa `lcs(i, j)` trên hai tiền tố. Khớp ⇒ `1 + lcs(i−1, j−1)`; không khớp ⇒ `max(lcs(i−1, j), lcs(i, j−1))`. Giải thích vì sao khớp thì ghép luôn là an toàn (lập luận đổi chỗ). Chỉ ra `(i−1, j−1)` bị gọi từ hai nhánh ⇒ chồng chéo ⇒ hàm mũ.
3. **Memo** (1 phút): "Chỉ có (m+1)(n+1) trạng thái ⇒ thêm cache, O(m·n)." Nhắc rủi ro stack sâu m + n.
4. **Bảng 2-D** (2 phút): hàng/cột 0 bằng 0, duyệt hàng rồi cột. Chạy tay `abcde` / `ace` để chứng minh. Nêu: bảng còn nguyên ⇒ truy vết được chuỗi.
5. **Hai hàng lăn** (1–2 phút): "Hàng i chỉ cần hàng i−1 ⇒ giữ hai hàng, cột theo chuỗi ngắn ⇒ O(min(m,n))." Chốt đánh đổi: mất khả năng dựng chuỗi.
6. **Chốt**: O(m·n) thời gian; O(min(m,n)) nếu chỉ độ dài, O(m·n) nếu cần chuỗi (hoặc Hirschberg).

## Follow-up thường gặp

- **In ra chính chuỗi LCS?** Dùng bảng đầy đủ, đi ngược từ (m, n): khớp ⇒ ghi ký tự, đi chéo; không ⇒ đi về ô lớn hơn giữa trên/trái. Đảo chuỗi kết quả.
- **Bộ nhớ O(n) mà vẫn in được chuỗi?** Hirschberg: chia đôi a ở giữa, tính hàng LCS xuôi cho nửa trên và ngược cho nửa dưới, chọn điểm cắt k trên b tối đa tổng, đệ quy. Thời gian vẫn O(m·n) (gấp ~2 lần).
- **Có thể dùng một hàng thay vì hai?** Có, nhưng phải giữ biến `prev` cho ô chéo trước khi ghi đè (giống Edit Distance) – nêu như điểm cộng.
- **Longest Common Substring khác gì?** Không khớp ⇒ dp = 0 (chuỗi liên tiếp bị đứt), đáp án là max toàn bảng chứ không phải dp[m][n].
- **Liên hệ Edit Distance?** Khi chỉ cho phép chèn/xoá: distance = m + n − 2·LCS (LC 583).
- **Có thể nhanh hơn O(m·n) không?** Trường hợp tổng quát có cận dưới có điều kiện (SETH) cho thấy khó dưới bậc hai; thực tế dùng Myers khi hai chuỗi gần giống nhau.

## Checklist nhận diện

- Hai chuỗi/dãy, hỏi "chung", "giữ thứ tự", "xoá ít nhất để giống nhau" ⇒ DP trên cặp tiền tố (i, j).
- Hàng chỉ phụ thuộc hàng trên ⇒ có thể lăn hàng nếu không cần truy vết.

## Bài luyện tập

- LC 1143 Longest Common Subsequence, LC 583 Delete Operation for Two Strings, LC 712 Minimum ASCII Delete Sum, LC 1035 Uncrossed Lines, LC 516 Longest Palindromic Subsequence (LCS của s và đảo s), LC 1092 Shortest Common Supersequence (cần truy vết bảng).
