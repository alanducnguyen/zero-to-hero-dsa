## Đề bài

Cho mảng `height` – độ cao các cột rộng 1 đơn vị. Tính tổng lượng nước đọng lại sau mưa.

```
height = [0,1,0,2,1,0,1,3,2,1,2,1]  →  6
height = [4,2,0,3,2,5]              →  9
```

## Ràng buộc

- `1 ≤ n ≤ 2·10⁴`, `0 ≤ height[i] ≤ 10⁵`.

Bài Hard được hỏi nhiều nhất vì có **bốn lời giải** với tư duy khác nhau, và người phỏng vấn muốn xem bạn leo được tới đâu.

## Câu hỏi nên hỏi lại

- Cột có độ rộng khác nhau không?
- Dữ liệu có sẵn toàn bộ hay đến dần (ảnh hưởng chọn stack hay two pointers)?
- Cần tổng hay cần nước tại từng cột?
