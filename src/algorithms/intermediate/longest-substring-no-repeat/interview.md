## Cách trình bày trong phỏng vấn

1. Nêu brute force O(n²) với Set trong 1 câu để thể hiện bạn thấy baseline, rồi nói "tôi sẽ tối ưu bằng sliding window vì tính chất không lặp là đơn điệu khi co cửa sổ."
2. Vẽ cửa sổ `[left, right]` và giải thích bất biến "không lặp".
3. Viết code với Map `lastIndex`, nhấn mạnh điều kiện `prev >= left`.
4. Chạy tay `abba` – đây là test người phỏng vấn hay đưa để bẫy.
5. O(n) thời gian, O(min(n,k)) bộ nhớ; nêu tối ưu mảng 128 phần tử.

## Câu hỏi follow-up thường gặp

- **Trả về chính substring thay vì độ dài?** Lưu `bestStart` khi cập nhật `best`, trả `s.slice(bestStart, bestStart + best)`.
- **Tại sao left không bao giờ lùi?** Vì `[left-1, right-1]` đã lặp, thêm ký tự chỉ làm lặp thêm. Đây là lý do O(n).
- **Chuỗi Unicode?** Duyệt bằng `for (const ch of s)` hoặc `Array.from(s)` để lấy code point; với ký tự tổ hợp (dấu tiếng Việt), normalize NFC trước.
- **Nếu cho phép tối đa 1 ký tự lặp?** Map đếm tần suất; co cửa sổ khi số ký tự có count ≥ 2 vượt quá 1 (hoặc tổng quát: khi vi phạm).
- **Stream vô hạn, chỉ cần best hiện tại?** Thuật toán đã là online: mỗi ký tự đến xử lý O(1), không cần nhìn lại.
- **Khi nào sliding window KHÔNG áp dụng được?** Khi điều kiện không đơn điệu, ví dụ "subarray có tổng = k" với số âm ⇒ dùng prefix sum + hashmap (LeetCode 560).
- **Sliding window maximum?** Dùng deque đơn điệu giảm, O(n).

## Checklist nhận diện pattern

- "Substring / subarray **liên tiếp**", "dài nhất / ngắn nhất", "thoả điều kiện" ⇒ nghĩ sliding window.
- Điều kiện đơn điệu: mở rộng làm "xấu đi", co lại làm "tốt lên" (hoặc ngược lại).
- Cần O(n) với dữ liệu không âm hoặc đếm tần suất ⇒ gần như chắc chắn.

## Template tổng quát (cửa sổ thay đổi)

```ts
let left = 0;
for (let right = 0; right < n; right++) {
  add(a[right]);                       // mở rộng
  while (!valid()) remove(a[left++]);  // co tới khi hợp lệ
  best = Math.max(best, right - left + 1);
}
```

## Bài luyện tập liên quan

- 3 Longest Substring Without Repeating → 159/340 At Most K Distinct → 424 Character Replacement.
- 209 Minimum Size Subarray Sum, 76 Minimum Window Substring (Hard).
- 239 Sliding Window Maximum (deque), 567 Permutation in String, 438 Find All Anagrams.
