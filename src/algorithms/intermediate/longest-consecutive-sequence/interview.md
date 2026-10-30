## Cách trình bày trong phỏng vấn

1. Làm rõ: "Liên tiếp về **giá trị**, không phải vị trí đúng không? Có số trùng, số âm không? Mảng rỗng trả 0?"
2. Nêu ngay lời giải sort + quét O(n log n) để có baseline, rồi nói: "đề yêu cầu O(n) nên tôi bỏ sắp xếp, chỉ cần tra cứu tồn tại ⇒ HashSet".
3. Trình bày bản ngây thơ (đếm từ mọi x) và chỉ ra vì sao O(n²) với `[1..n]`.
4. Đưa ra mẹo **chỉ đếm từ đầu dãy** (`x − 1` không có trong set) và **chứng minh O(n)**: mỗi giá trị bị vòng while đi qua tối đa một lần ⇒ tổng ≤ 2n lần tra.
5. Nhấn mạnh duyệt trên `set` chứ không phải `nums` (tránh lặp lại khi có trùng).
6. Chạy tay `[100, 4, 200, 1, 3, 2]` ⇒ 4, và các case biên `[]`, `[1,1,1]`.

## Câu hỏi follow-up thường gặp

- **Vòng while lồng trong for, sao lại O(n)?** Phân tích amortized: các dãy tối đại phân hoạch tập giá trị, while chỉ chạy từ đầu dãy.
- **Không được dùng thêm bộ nhớ?** Sort tại chỗ (heap sort) + quét ⇒ O(n log n), O(1).
- **Trả về chính dãy số?** Lưu `start` của dãy tốt nhất.
- **Số được thêm vào liên tục, hỏi đáp án sau mỗi lần thêm?** Union-Find, hoặc HashMap lưu độ dài ở hai biên đoạn: thêm x thì gộp đoạn trái `[x−L, x−1]` và đoạn phải `[x+1, x+R]`.
- **Dữ liệu khổng lồ, phân tán?** Sắp xếp ngoài / phân vùng theo khoảng giá trị, xử lý dãy vắt qua ranh giới phân vùng.
- **Hash bị tấn công va chạm?** Worst case O(n²); dùng sort để có đảm bảo cứng.

## Checklist nhận diện pattern

- "Dài nhất / liên tiếp về **giá trị**" trên mảng **chưa sắp xếp** + yêu cầu O(n) ⇒ HashSet + chỉ xử lý "điểm bắt đầu".
- Câu hỏi chỉ là "v có tồn tại không?" ⇒ HashSet thay cho sắp xếp.
- Vòng lặp lồng nhau nhưng mỗi phần tử chỉ bị "tiêu thụ" một lần ⇒ amortized O(n).
- Bài động (thêm phần tử, gộp khoảng) ⇒ cân nhắc Union-Find.

## Bài luyện tập liên quan

- LeetCode 128 – Longest Consecutive Sequence
- LeetCode 298 – Binary Tree Longest Consecutive Sequence
- LeetCode 549 – Binary Tree Longest Consecutive Sequence II
- LeetCode 2274 – Maximum Consecutive Floors Without Special Floors
- LeetCode 217 – Contains Duplicate
- LeetCode 1 – Two Sum
- LeetCode 352 – Data Stream as Disjoint Intervals
