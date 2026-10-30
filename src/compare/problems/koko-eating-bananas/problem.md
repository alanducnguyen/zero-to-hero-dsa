## Đề bài

Có `n` đống chuối `piles[i]` và người gác quay lại sau `h` giờ. Mỗi giờ Koko chọn **một** đống và ăn tối đa `k` quả; nếu đống còn ít hơn `k` thì ăn hết đống đó và **nghỉ hết giờ** (không chuyển sang đống khác). Tìm **tốc độ nguyên nhỏ nhất** `k` để ăn hết mọi đống trong ≤ `h` giờ.

```
piles = [3, 6, 7, 11],        h = 8  →  4
piles = [30, 11, 23, 4, 20],  h = 5  →  30
piles = [30, 11, 23, 4, 20],  h = 6  →  23
```

Số giờ với tốc độ k: `hours(k) = Σ ⌈piles[i] / k⌉`.

## Ràng buộc

- `1 ≤ n ≤ 10⁴`, `n ≤ h ≤ 10⁹`, `1 ≤ piles[i] ≤ 10⁹`.
- Vì h ≥ n nên luôn có đáp án: tốc độ max(piles) ăn mỗi đống trong 1 giờ.
- Trên trang này giới hạn 8 đống, mỗi đống ≤ 30 để hiển thị toàn bộ khoảng tốc độ.

## Câu hỏi nên hỏi lại người phỏng vấn

- h có luôn ≥ n không? (Nếu không, phải trả -1.)
- Giá trị có thể tới 10⁹? (Quyết định quét tuyến tính có bị loại không, và có cần lo tràn số khi cộng giờ.)
- Tốc độ phải là số nguyên?
