## Đề bài

Cho mảng số nguyên `nums` và số `k`. Trả về **k giá trị xuất hiện nhiều nhất**, theo thứ tự bất kỳ. Đề đảm bảo đáp án là **duy nhất** (không có hoà count tại ranh giới thứ k).

```
nums = [1,1,1,2,2,3], k = 2         →  [1, 2]
nums = [1], k = 1                   →  [1]
nums = [4,1,-1,2,-1,2,3], k = 2     →  [-1, 2]
```

## Ràng buộc

- `1 ≤ n ≤ 10⁵`, giá trị trong `[−10⁴, 10⁴]`.
- `1 ≤ k ≤ số giá trị khác nhau`.
- **Follow-up của LeetCode:** độ phức tạp thời gian phải tốt hơn `O(n log n)`.

Trong demo, kết quả được sắp tăng dần để so sánh các lời giải, và `k` được kẹp vào `[1, số giá trị khác nhau]`. Nếu bạn tự nhập input có hoà count tại ranh giới, các lời giải có thể chọn khác nhau – đều hợp lệ.

## Câu hỏi nên hỏi lại người phỏng vấn

- Có hoà count tại vị trí thứ k không? Nếu có, phá hoà thế nào (giá trị nhỏ hơn? xuất hiện trước?)
- Thứ tự output có quan trọng không? (Nếu phải giảm dần theo count, bucket vẫn cho thứ tự đó miễn phí.)
- Dữ liệu nằm hết trong bộ nhớ, hay đến dạng luồng / quá lớn cho một máy?
- k so với số giá trị khác nhau: k rất nhỏ hay gần bằng?
