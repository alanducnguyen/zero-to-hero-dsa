## Kịch bản trình bày

1. **Làm rõ đề** (30s): số phân biệt, trong `[0, n]`, đúng một số thiếu; có được sửa input không.
2. **Brute force có cấu trúc** (1 phút): "Sort xong thì `sorted[i]` phải bằng `i`, chỗ lệch đầu tiên là đáp án – O(n log n)." Nhắc case thiếu chính `n`.
3. **Bỏ sort bằng HashSet** (1 phút): O(n) thời gian nhưng O(n) bộ nhớ. Hỏi: "Có cần O(1) bộ nhớ không?" – gần như chắc chắn có.
4. **Dùng cấu trúc toán học** (2 phút): tập đầy đủ là `0..n` nên biết trước tổng ⇒ Gauss. Chủ động nói về tràn số và cách sửa `sum += i − nums[i]`.
5. **Chốt bằng XOR**: "Cùng ý tưởng 'kỳ vọng trừ thực tế' nhưng dùng XOR thay phép trừ – mỗi số có mặt xuất hiện hai lần và tự hủy, không tràn."
6. **Dry run** với `[3, 0, 1]`: xor = 3 ^ (0^3) ^ (1^0) ^ (2^1) = 2.

## Câu hỏi follow-up

- *Mảng đã sắp xếp?* → binary search, O(log n).
- *Thiếu 2 số?* → XOR ra `a ^ b`, tách theo một bit khác 0 thành hai nhóm (giống Single Number III); hoặc giải hệ tổng + tổng bình phương.
- *Có một số trùng và một số thiếu?* → bài 645 Set Mismatch, cùng kỹ thuật.
- *Dữ liệu là stream rất lớn?* → XOR/Gauss chạy được một lượt, không lưu gì.

## Checklist nhận diện

- Tập giá trị "đáng lẽ có" biết trước (`0..n`, `1..n`) ⇒ nghĩ ngay tới tổng hoặc XOR.
- "Mọi số xuất hiện 2 lần trừ một" ⇒ XOR.
- Yêu cầu O(1) bộ nhớ + không sửa input ⇒ loại HashSet và sort.

## Bài luyện tập

LeetCode 136 Single Number, 260 Single Number III, 287 Find the Duplicate Number, 448 Find All Numbers Disappeared, 645 Set Mismatch.
