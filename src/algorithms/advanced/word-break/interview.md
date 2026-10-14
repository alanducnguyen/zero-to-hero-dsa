## Cách trình bày trong phỏng vấn

1. Ví dụ brute force: thử mọi điểm cắt – hàm mũ. Nhận xét "trạng thái chỉ là vị trí hiện tại" ⇒ có overlapping subproblems.
2. Định nghĩa `dp[i]` = tiền tố i ký tự cắt được; công thức "tồn tại từ cuối".
3. Code bottom-up với Set, nêu tối ưu giới hạn `j` bằng `maxLen`.
4. Phân tích O(n · L²) / O(n), đề cập Trie nếu từ điển lớn.
5. Chuẩn bị sẵn Word Break II (liệt kê) vì đó là follow-up phổ biến nhất.

## Câu hỏi follow-up thường gặp

- **Top-down hay bottom-up?** Cả hai O(n · L²). Top-down `canBreak(start)` với memo dễ chuyển sang bài II.
- **Liệt kê tất cả cách cắt (bài II)?** DFS từ `start`, memo `Map<start, string[]>`; chạy bài I trước, nếu `false` trả về `[]` ngay.
- **Từ điển rất lớn, chuỗi ngắn?** Duyệt `j` lùi với giới hạn `maxLen` hoặc đi theo Trie từ `j` – không duyệt từ điển.
- **Tại sao không greedy lấy từ dài nhất?** `abcd` với `[abc, ab, cd]`: greedy lấy `abc` rồi kẹt `d`, đúng là `ab + cd`.
- **Giới hạn bộ nhớ?** `dp` đã O(n); với Set thay bằng Trie nếu tổng ký tự từ điển lớn.
- **Cần số cách thay vì có/không?** `dp[i] += dp[j]` – có thể tràn số, dùng modulo.

## Checklist nhận diện pattern

- "Có thể cắt/ghép/phân tích chuỗi thành các phần hợp lệ?" ⇒ DP theo vị trí cắt.
- Đáp án của tiền tố chỉ phụ thuộc các tiền tố ngắn hơn ⇒ DP 1D.
- Yêu cầu liệt kê mọi cách ⇒ DFS + memo, dùng DP có/không để cắt tỉa.

## Bài luyện tập

- 139 Word Break → 140 Word Break II → 472 Concatenated Words.
- 91 Decode Ways, 639 Decode Ways II (cùng khung).
- 132 Palindrome Partitioning II (cắt chuỗi với chi phí), 1043 Partition Array for Maximum Sum.
