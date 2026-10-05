## Cách trình bày trong phỏng vấn

1. Nêu brute force O(nm) và chỉ ra lãng phí: lùi text và quên thông tin đã khớp.
2. Định nghĩa LPS bằng lời chính xác: "độ dài prefix **proper** dài nhất cũng là suffix của pattern[0..i]".
3. Vẽ ví dụ `ababca`: lps = [0,0,1,2,0,1]; chỉ ra khi lệch tại j = 4 nhảy về lps[3] = 2.
4. Viết `buildLPS` trước (khó hơn), rồi `search` (cùng cấu trúc). Nhấn mạnh `len = lps[len−1]` trong while.
5. Phân tích amortized O(n + m). Nêu Rabin–Karp và Boyer–Moore để so sánh.

## Câu hỏi follow-up thường gặp

- **Tại sao `len = lps[len−1]` chứ không phải `len−1`?** Các prefix-suffix của `p[0..len)` theo thứ tự giảm là `lps[len−1]`, `lps[lps[len−1]−1]`…; nhảy thẳng tới ứng viên hợp lệ kế tiếp, bỏ qua các độ dài không thể.
- **Tại sao O(n + m) dù có while lồng?** `j` chỉ tăng ≤ 1 mỗi i và không âm ⇒ tổng số lần giảm ≤ n.
- **Chu kỳ nhỏ nhất của chuỗi?** `m − lps[m−1]`; là chu kỳ "đầy đủ" nếu chia hết m.
- **Shortest Palindrome?** Thêm prefix ngắn nhất để thành palindrome = `reverse(s[k..])` với k = lps cuối của `s + '#' + rev(s)`.
- **Nhiều pattern?** Aho–Corasick: Trie + failure link; O(n + Σm + số khớp).
- **Rabin–Karp khi nào tốt hơn?** Nhiều pattern cùng độ dài, tìm substring 2D, so sánh chuỗi dài bằng hash; chấp nhận xác suất va chạm.
- **Boyer–Moore nhanh hơn thế nào?** Bỏ qua tới m ký tự mỗi bước nhờ bad-character/good-suffix; sublinear thực tế; nhưng worst case và cài đặt phức tạp.
- **Z-algorithm khác gì?** Z[i] = độ dài khớp dài nhất của suffix tại i với prefix; tính O(n); nhiều bài dùng Z trực quan hơn lps.
- **KMP trên stream?** Chỉ cần lps và trạng thái j; mỗi ký tự đến xử lý O(1) amortized.

## Checklist nhận diện pattern

- "Tìm chuỗi con O(n + m) đảm bảo" ⇒ KMP.
- "Prefix cũng là suffix", "happy prefix", "chu kỳ", "lặp lại" ⇒ bảng LPS.
- "Thêm ít ký tự nhất để thành palindrome" ⇒ LPS trên `s#rev(s)`.
- "Nhiều từ khoá cùng lúc" ⇒ Aho–Corasick.
- "So sánh nhiều chuỗi con bằng nhau" ⇒ rolling hash.

## Bài luyện tập liên quan

- 28 Find Index of First Occurrence → 459 Repeated Substring Pattern → 1392 Longest Happy Prefix.
- 214 Shortest Palindrome (Hard), 686 Repeated String Match, 796 Rotate String.
- 1044 Longest Duplicate Substring (Rabin–Karp + binary search), 3008 Find Beautiful Indices (KMP ×2).
