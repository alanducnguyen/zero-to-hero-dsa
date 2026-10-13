## Kịch bản trình bày

1. **Làm rõ**: substring vs subsequence, hoa/thường, n lớn đến đâu.
2. **Brute force** (20s): O(n³), nói miệng.
3. **Nhận xét** (30s): "Palindrome có tâm đối xứng. Có 2n−1 tâm (n ký tự + n−1 khe). Mở rộng từ mỗi tâm."
4. **Code expand center** (3 phút): hàm `expand(l, r)` trả về độ dài; gọi với (c, c) và (c, c+1). Chạy tay "babad".
5. **Phân tích** (30s): O(n²) worst case, O(1) bộ nhớ.
6. **Nhắc DP và Manacher** (30s): DP khi cần bảng; Manacher O(n) nếu n lớn.

## Follow-up thường gặp

- **Vì sao 2n−1 tâm?** Palindrome lẻ có tâm tại một ký tự (n), chẵn có tâm giữa hai ký tự (n−1).
- **Worst case của expand center?** Chuỗi toàn một ký tự: mỗi tâm mở rộng O(n) ⇒ O(n²) thật.
- **DP 2D điền theo thứ tự nào?** Theo độ dài tăng dần (hoặc i giảm, j tăng) để dp[i+1][j−1] có trước.
- **Giảm bộ nhớ DP?** Khó vì cần ô chéo dưới; expand center đã là O(1).
- **Manacher là gì?** Chuỗi chèn '#' để thống nhất tâm; mảng bán kính P[i]; dùng gương qua tâm hiện tại để khởi tạo P[i] ⇒ tổng mở rộng O(n).
- **Đếm số palindrome con?** Cùng expand center, cộng số bước mở rộng thành công tại mỗi tâm.
- **Longest Palindromic Subsequence?** LCS(s, reverse(s)) hoặc DP khoảng – khác bài.
