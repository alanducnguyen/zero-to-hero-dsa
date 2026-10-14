## Cách trình bày trong phỏng vấn

1. Nêu kích thước đáp án 2ⁿ ⇒ thuật toán tối thiểu O(2ⁿ), không có cách "thông minh" hơn về bậc.
2. Vẽ cây đệ quy cho `[1,2,3]`: mỗi nút là một tập con; nhấn mạnh quy ước `start` để tránh trùng.
3. Viết khung chọn / đệ quy / bỏ chọn, chỉ ra vị trí `result.push([...path])` và vì sao cần chép.
4. Phân tích O(n·2ⁿ); nêu bitmask như cách thay thế.
5. Chủ động nói cách đổi khung cho Subsets II / Combinations / Combination Sum.

## Câu hỏi follow-up thường gặp

- **Mảng có phần tử trùng?** Sort; tại cùng tầng bỏ qua `nums[i] === nums[i−1]` với `i > start`.
- **Chỉ tập con có đúng k phần tử?** Ghi nhận khi `path.length === k`; cắt tỉa `n − i < k − path.length`.
- **Không dùng đệ quy?** Bitmask, hoặc cascading: với mỗi phần tử, thêm bản sao của mọi tập hiện có kèm phần tử đó.
- **Vì sao không trùng lặp?** Chỉ số chọn tăng nghiêm ngặt ⇒ mỗi tập ứng với đúng một dãy chỉ số.
- **Bộ nhớ ngoài output?** O(n) cho `path` và stack đệ quy sâu tối đa n.
- **n = 30 và cần tập con có tổng = T?** Meet-in-the-middle O(2^(n/2)) thay vì liệt kê toàn bộ.

## Checklist nhận diện pattern

- "Tất cả tổ hợp / tập con / cách chọn" với n nhỏ (≤ 20) ⇒ backtracking hoặc bitmask.
- Có ràng buộc (tổng, độ dài, không trùng) ⇒ backtracking để cắt tỉa sớm.
- Thứ tự quan trọng (dãy) ⇒ Permutations (mảng `used`), không dùng `start`.

## Bài luyện tập

- 78 Subsets → 90 Subsets II → 77 Combinations.
- 39 Combination Sum, 40 Combination Sum II, 216 Combination Sum III.
- 46 Permutations, 131 Palindrome Partitioning, 17 Letter Combinations of a Phone Number.
