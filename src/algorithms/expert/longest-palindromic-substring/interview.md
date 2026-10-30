## Cách trình bày trong phỏng vấn

1. Làm rõ: substring (liên tiếp) hay subsequence? Có nhiều đáp án thì trả cái nào? Chuỗi rỗng?
2. Nêu brute force O(n³) để có baseline, rồi chỉ ra lãng phí: kiểm tra lại các đoạn bên trong nhiều lần.
3. Ý chính: "palindrome đối xứng quanh tâm; có 2n − 1 tâm; mở rộng từ mỗi tâm" ⇒ O(n²) thời gian, O(1) bộ nhớ.
4. Viết code, nhấn mạnh tâm chẵn và công thức `r − l − 1`.
5. Chạy tay `"cbbd"` để chứng minh tâm chẵn hoạt động.
6. Chủ động nhắc DP (O(n²) bộ nhớ) và Manacher (O(n)) như các hướng khác.

## Câu hỏi follow-up thường gặp

- **Tại sao 2n − 1 tâm?** n ký tự cho palindrome lẻ + n − 1 khe cho palindrome chẵn.
- **Vì sao tốt hơn DP?** Cùng O(n²) thời gian nhưng O(1) bộ nhớ và dừng sớm khi không khớp.
- **Có O(n) không?** Manacher: tận dụng đối xứng gương trong palindrome bao ngoài để khởi tạo bán kính, biên phải chỉ tăng ⇒ O(n). Hoặc hashing + binary search O(n log n).
- **Đếm số palindrome con?** Cùng khung, mỗi lần mở rộng thành công là +1 (LeetCode 647).
- **Subsequence thay vì substring?** Không còn tính liên tiếp ⇒ DP `LCS(s, reverse(s))` hoặc dp khoảng O(n²).
- **Chuỗi Unicode / emoji?** Index theo code unit có thể cắt đôi surrogate pair; chuyển sang mảng code point trước.

## Checklist nhận diện pattern

- "Palindrome" + "substring liên tiếp" ⇒ mở rộng từ tâm (hoặc Manacher).
- Cần trả lời nhiều truy vấn "s[i..j] có palindrome?" ⇒ bảng DP.
- Hai con trỏ đi **ngược chiều từ giữa ra** thay vì từ hai đầu vào ⇒ dạng expand-around-center.

## Bài luyện tập liên quan

- LeetCode 5 – Longest Palindromic Substring.
- LeetCode 647 – Palindromic Substrings.
- LeetCode 516 – Longest Palindromic Subsequence.
- LeetCode 131 – Palindrome Partitioning.
- LeetCode 214 – Shortest Palindrome.
