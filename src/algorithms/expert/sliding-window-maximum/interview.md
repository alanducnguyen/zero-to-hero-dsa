## Cách trình bày trong phỏng vấn

1. Nêu O(nk) brute force và O(n log k) với heap trong 2 câu – rồi "tôi làm O(n) bằng deque đơn điệu".
2. Giải thích **tại sao** loại phần tử cũ hơn và nhỏ hơn: nó rời cửa sổ trước và không bao giờ thắng.
3. Viết 4 bước; dùng mảng + `head`; nhấn mạnh lưu **chỉ số**.
4. Phân tích amortized O(n): mỗi chỉ số vào/ra một lần.
5. Nêu mở rộng: min, cửa sổ co giãn, DP với cửa sổ.

## Câu hỏi follow-up thường gặp

- **Tại sao O(n) dù có while bên trong?** Tổng số pop ≤ tổng số push = n.
- **Heap làm thế nào, tại sao chậm hơn?** Max-heap (value, index); khi lấy max, pop tới khi index trong cửa sổ (lazy deletion). O(n log n) vì heap có thể chứa n phần tử cũ.
- **Cả max và min cùng lúc?** Hai deque độc lập.
- **Cửa sổ không cố định, co giãn theo điều kiện (1438)?** Mở rộng right, cập nhật hai deque; khi `max − min > limit` thì tăng left và bỏ đầu deque có chỉ số < left.
- **Dùng deque cho DP?** `dp[i] = nums[i] + max(dp[j])` với `i−k ≤ j < i` ⇒ deque trên dp theo chỉ số; O(n) thay vì O(nk).
- **Truy vấn max trên đoạn bất kỳ nhiều lần?** Sparse table O(1)/truy vấn, hoặc segment tree nếu có cập nhật.
- **Phân biệt với monotonic stack?** Stack: "phần tử gần nhất lớn hơn/nhỏ hơn" (bỏ đầu không cần). Deque: thêm bước bỏ đầu khi rời cửa sổ.
- **Stream vô hạn, bộ nhớ O(k)?** Deque tối đa k phần tử; mảng dùng circular buffer hoặc dọn phần đầu định kỳ.

## Checklist nhận diện pattern

- "Max/min của mỗi cửa sổ độ dài k" ⇒ monotonic deque.
- "DP với chuyển trạng thái từ k phần tử trước, lấy max/min" ⇒ deque.
- "Subarray ngắn nhất/dài nhất với điều kiện trên prefix sum có số âm" ⇒ deque trên prefix.
- "Phần tử gần nhất lớn hơn" (không có cửa sổ) ⇒ monotonic stack.
- "Top-k", "median trượt" ⇒ heap / hai heap / multiset, không phải deque.

## Bài luyện tập liên quan

- 239 Sliding Window Maximum → 1438 Absolute Diff ≤ Limit → 862 Shortest Subarray Sum ≥ K (Hard).
- 1696 Jump Game VI, 1425 Constrained Subsequence Sum, 1499 Max Value of Equation.
- 739 Daily Temperatures (stack, để so sánh), 480 Sliding Window Median (hai heap).
