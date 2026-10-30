## Đề bài

Cho mảng `intervals` với `intervals[i] = [start, end]` là giờ bắt đầu và kết thúc của một cuộc họp. Trả về **số phòng họp tối thiểu** để mọi cuộc họp đều diễn ra.

Cuộc họp chiếm khoảng **nửa mở** `[start, end)`: cuộc họp kết thúc lúc 10 và cuộc họp bắt đầu lúc 10 **dùng chung được** một phòng.

```
[[0,30],[5,10],[15,20]]  →  2
[[7,10],[2,4]]           →  1
[[1,3],[3,5],[5,7]]      →  1   (chạm đầu mút, nối tiếp nhau)
[[1,5],[2,6],[3,7],[4,8]] → 4
```

## Ràng buộc

- `1 ≤ n ≤ 10⁴`, `0 ≤ start < end ≤ 10⁶`.
- Ở trang demo: nhập `"a-b"`, toạ độ kẹp vào `[0, 100]`, tối đa 20 cuộc họp, cuộc họp độ dài 0 bị bỏ qua.

## Nhận xét cốt lõi

Số phòng tối thiểu **bằng** số cuộc họp chồng lấn nhiều nhất tại một thời điểm: nhỏ hơn thì tại thời điểm đó thiếu phòng (cận dưới), và thuật toán tham lam "giao phòng trống sớm nhất" đạt đúng cận đó. Cả ba lời giải đều chỉ là ba cách khác nhau để đo độ chồng lấn lớn nhất.

## Câu hỏi nên hỏi lại người phỏng vấn

- Hai cuộc họp chạm nhau ở đầu mút có dùng chung phòng không?
- Giờ là số nguyên? Miền giá trị lớn cỡ nào? (Quyết định line sweep có khả thi không.)
- Chỉ cần số phòng hay cần gán phòng cụ thể?
