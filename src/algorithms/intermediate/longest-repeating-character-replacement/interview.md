## Cách trình bày trong phỏng vấn

1. Diễn đạt lại: "tìm cửa sổ dài nhất mà số ký tự *không phải* ký tự trội ≤ k".
2. Nêu công thức chi phí của một cửa sổ: `len − maxFreq`. Đây là bước quan trọng nhất – biến bài "chọn vị trí đổi" thành bài kiểm tra điều kiện.
3. Chỉ ra tính đơn điệu (cửa sổ con của cửa sổ hợp lệ cũng hợp lệ) ⇒ sliding window.
4. Viết bản an toàn trước: tính maxFreq thật bằng quét 26 ô, O(26n).
5. Tối ưu: giải thích vì sao maxFreq không cần giảm và cửa sổ chỉ cần trượt (`if` thay `while`) ⇒ O(n).

## Câu hỏi follow-up thường gặp

- **Tại sao không giảm maxFreq khi bỏ ký tự ở left?** Đáp án chỉ tăng khi tìm được cửa sổ dài hơn, điều đó đòi hỏi tần suất trội lớn hơn maxFreq cũ. maxFreq lỗi thời chỉ làm cửa sổ trượt ở độ dài = best, không bao giờ đẩy best lên sai.
- **Nếu phải trả về chính substring?** Lưu `bestStart = left` mỗi khi best tăng – tại thời điểm đó cửa sổ hợp lệ thật.
- **Bảng chữ cái lớn (Unicode)?** Dùng `Map`; maxFreq không giảm vẫn O(n), còn bản quét lại sẽ O(σ·n).
- **Với `while` thay `if` thì sao?** Vẫn đúng; với maxFreq không giảm vòng `while` chạy tối đa 1 lần nên tương đương.
- **k = 0?** Thành bài "chuỗi con dài nhất gồm một ký tự lặp lại".
- **Mảng nhị phân, lật ≤ k số 0?** Max Consecutive Ones III – đếm số 0 trong cửa sổ.

## Checklist nhận diện pattern

- "Substring/subarray **dài nhất** thỏa điều kiện có **ngân sách k** (đổi, lật, xóa)" ⇒ sliding window.
- Điều kiện đơn điệu theo việc thu hẹp cửa sổ ⇒ hai con trỏ cùng chiều.
- Chi phí cửa sổ biểu diễn được qua bảng đếm (`len − maxFreq`, `số 0`, `số khóa`) ⇒ cập nhật O(1) khi thêm/bỏ.
- Chỉ cần độ dài lớn nhất (không cần mọi cửa sổ) ⇒ có thể dùng mẹo "cửa sổ không co".

## Bài luyện tập liên quan

- 424 Longest Repeating Character Replacement → 1004 Max Consecutive Ones III → 2024 Maximize the Confusion of an Exam.
- 3 Longest Substring Without Repeating Characters, 340 Longest Substring with At Most K Distinct Characters.
- 1493 Longest Subarray of 1's After Deleting One Element, 76 Minimum Window Substring.
