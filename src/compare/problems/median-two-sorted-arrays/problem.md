## Đề bài

Cho hai mảng **đã sắp xếp tăng dần** `nums1` (độ dài m) và `nums2` (độ dài n). Trả về **trung vị** của mảng gộp. Yêu cầu độ phức tạp **O(log(m+n))**.

```
nums1 = [1,3],   nums2 = [2]    →  2.0
nums1 = [1,2],   nums2 = [3,4]  →  2.5
```

## Ràng buộc

- `0 ≤ m, n ≤ 1000`, `1 ≤ m + n ≤ 2000`, `−10⁶ ≤ nums[i] ≤ 10⁶`.

Bài số 4 trên LeetCode, nổi tiếng vì lời giải tuyến tính rất dễ nhưng **yêu cầu O(log)** buộc phải đổi hẳn góc nhìn: không tìm *phần tử*, mà tìm *vị trí cắt*. Người phỏng vấn đánh giá cả việc bạn leo thang có chủ đích lẫn sự cẩn thận ở các trường hợp biên: một mảng rỗng, cắt ở đầu/cuối, tổng chẵn/lẻ, giá trị trùng.

## Định nghĩa trung vị

- m + n lẻ: phần tử ở vị trí ⌊(m+n)/2⌋ của mảng gộp (chỉ số từ 0).
- m + n chẵn: trung bình hai phần tử ở vị trí (m+n)/2 − 1 và (m+n)/2.

## Câu hỏi nên hỏi lại

- Một trong hai mảng có thể rỗng không? (Có.)
- Có giá trị trùng không? (Có – không ảnh hưởng nếu so sánh dùng ≤.)
- Trả về số thực hay làm tròn?
