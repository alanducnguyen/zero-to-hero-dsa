## Đề bài

Cho mảng `heights` – chiều cao các cột rộng 1 đơn vị đứng sát nhau. Tìm diện tích **hình chữ nhật lớn nhất** nằm trọn trong histogram.

```
heights = [2,1,5,6,2,3]  →  10   (cột 5 và 6, cao 5 × rộng 2)
heights = [2,4]          →  4
```

## Ràng buộc

- `1 ≤ n ≤ 10⁵`, `0 ≤ heights[i] ≤ 10⁴`.

Ràng buộc n = 10⁵ loại ngay O(n²). Đây là bài Hard kinh điển của **monotonic stack**: người phỏng vấn muốn xem bạn đi từ quan sát "hình tối ưu có chiều cao bằng một cột nào đó" tới cấu trúc dữ liệu đúng, và có xử lý được cột bằng nhau, cột 0, mảng tăng dần hay không.

## Quan sát then chốt

Hình chữ nhật tối ưu luôn có chiều cao **bằng đúng chiều cao của cột thấp nhất** mà nó phủ (nếu thấp hơn, nâng lên được). Vậy với mỗi cột i, hỏi: "hình cao đúng h[i] kéo dài được bao xa?" – tới khi gặp cột **thấp hơn** ở hai phía.

## Câu hỏi nên hỏi lại

- Có cột cao 0 không? (Có – chúng cắt histogram thành nhiều phần.)
- Kết quả có thể vượt 32-bit không? (10⁵ × 10⁴ = 10⁹ – vừa int32, nhưng nên lưu ý.)
- Có phiên bản 2D (ma trận 0/1) cần làm tiếp không?
