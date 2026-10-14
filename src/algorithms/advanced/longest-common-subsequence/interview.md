## Cách trình bày trong phỏng vấn

1. Nói rõ subsequence ≠ substring, rồi định nghĩa trạng thái: "`dp[i][j]` = LCS của i ký tự đầu của a và j ký tự đầu của b".
2. Suy công thức từ ký tự cuối: khớp ⇒ chéo + 1; không khớp ⇒ max(trên, trái). Vẽ bảng 3×3 để minh hoạ.
3. Code bottom-up, chạy tay `abcde / ace` vài ô.
4. Nêu O(m·n)/O(m·n), chủ động đề xuất 2 hàng O(min(m,n)) nếu chỉ cần độ dài.
5. Nếu được hỏi dựng chuỗi: truy vết ngược từ `(m, n)`.

## Câu hỏi follow-up thường gặp

- **Tối ưu bộ nhớ?** Mỗi ô chỉ cần hàng trên và ô bên trái ⇒ giữ 2 hàng (hoặc 1 hàng + biến `prevDiag`).
- **In ra LCS với bộ nhớ O(m+n)?** Hirschberg: tìm điểm giữa bằng LCS xuôi + ngược rồi đệ quy hai nửa.
- **Nhiều LCS khác nhau, in tất cả?** Backtrack trên bảng theo mọi hướng có giá trị bằng nhau; số lượng có thể hàm mũ.
- **Liên hệ Edit Distance?** Nếu chỉ cho phép chèn/xoá: `dist = m + n − 2·LCS`.
- **Chuỗi dài, khác nhau ít?** Myers diff O((m+n)·d), d là số dòng khác nhau – đây là cách `git diff` làm.
- **Dãy số tăng chung dài nhất (LCIS)?** DP O(m·n) nhưng trạng thái kết thúc tại `b[j]`.

## Checklist nhận diện pattern

- Hai chuỗi/mảng, "chung", "giống nhau", "căn chỉnh", "số thao tác xoá tối thiểu" ⇒ nghĩ ngay LCS.
- Một chuỗi và "palindrome subsequence" ⇒ LCS với chuỗi đảo.
- Hai mảng số với "nối cặp bằng nhau không cắt nhau" ⇒ LCS.

## Bài luyện tập

- 1143 Longest Common Subsequence → 583 Delete Operation → 1092 Shortest Common Supersequence.
- 516 Longest Palindromic Subsequence, 1035 Uncrossed Lines.
- 72 Edit Distance (so sánh công thức), 718 Maximum Length of Repeated Subarray (phiên bản substring).
