## Cách trình bày trong phỏng vấn

1. Nêu brute force O(n·m), rồi ý tưởng: "so hash trước, chỉ so ký tự khi hash trùng".
2. Giải thích chuỗi như số cơ số B, công thức trượt bỏ-đầu-thêm-cuối trong O(1).
3. Nhấn mạnh bước xác minh khi hash trùng (va chạm giả) – đây là điểm người phỏng vấn muốn nghe.
4. Phân tích: kỳ vọng O(n + m), xấu nhất O(n·m); so với KMP.
5. Nêu chi tiết hiện thực: `high = B^(m−1) mod M`, chỉnh số âm, chọn M nguyên tố lớn.

## Câu hỏi follow-up thường gặp

- **Khi nào chọn Rabin-Karp thay vì KMP?** Nhiều pattern cùng độ dài, cần so sánh chuỗi con bất kỳ (prefix hash), hoặc muốn code ngắn; cần đảm bảo tuyến tính ⇒ KMP.
- **Va chạm giả có làm sai không?** Không, chỉ chậm – vì luôn so trực tiếp trước khi kết luận.
- **Chọn B, M thế nào?** B > |bảng chữ cái| (vd 256 hoặc 31), M nguyên tố lớn; B ngẫu nhiên để chống anti-hash.
- **Tìm chuỗi con lặp dài nhất?** Nhị phân độ dài L; với mỗi L dùng rolling hash + Set để kiểm tra trùng: O(n log n).
- **Số lớn trong JS?** `ht * base` vượt 2⁵³ nếu M ≈ 10⁹ ⇒ dùng `BigInt` hoặc M < 2²⁶, hoặc hash kép với M nhỏ.
- **Mở rộng 2D?** Hash từng hàng theo cột rồi hash dọc – tìm ma trận con.
- **Hash tiền tố để so hai đoạn O(1)?** `h[r] − h[l]·B^(r−l)` mod M – nền của nhiều bài string nâng cao.

## Checklist nhận diện pattern

- "Tìm pattern trong text", "nhiều từ khoá cùng độ dài", "có chuỗi con nào lặp lại độ dài k" ⇒ rolling hash.
- "So sánh hai đoạn con nhiều lần" ⇒ prefix hash.
- Cần đảm bảo O(n) tuyệt đối hoặc có test đối kháng ⇒ KMP / Z-algorithm.

## Bài luyện tập

- 28 Find the Index of the First Occurrence (so với KMP).
- 187 Repeated DNA Sequences, 1044 Longest Duplicate Substring, 1062 Longest Repeating Substring.
- 1392 Longest Happy Prefix (prefix hash), 214 Shortest Palindrome.
- 686 Repeated String Match, 3008 Find Beautiful Indices.
