## Đề bài

Cho mảng số nguyên `nums` (có thể âm). Tìm **tổng lớn nhất** của một mảng con liên tiếp (subarray) có ít nhất một phần tử.

```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]  →  6   (đoạn [4, -1, 2, 1])
nums = [-3, -1, -2]                     →  -1  (đoạn [-1])
```

## Ràng buộc

- `1 ≤ n ≤ 10⁵`, giá trị trong `[−10⁴, 10⁴]`.
- Đề gốc gợi ý: "nếu đã giải O(n), thử chia để trị" – người phỏng vấn muốn thấy bạn biết cả hai.

## Câu hỏi nên hỏi lại

- Mảng có thể toàn số âm? (Ảnh hưởng khởi tạo: `best = nums[0]`, không phải 0.)
- Cần trả về chỉ số đoạn hay chỉ tổng?
- Mảng vòng tròn? Có giới hạn độ dài đoạn?
