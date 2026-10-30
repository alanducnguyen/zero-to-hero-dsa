## Kịch bản trình bày (6–8 phút)

1. **Làm rõ đề** (30s): phần tử phân biệt? có thể không xoay? mảng rỗng? Câu đầu quyết định bài có O(log n) được không.
2. **Brute force** (15s): "Quét tuyến tính O(n) – đúng nhưng không dùng tới việc mảng gần như sắp xếp. Đề yêu cầu O(log n) nên phải binary search."
3. **Cách hai lượt** (1 phút): "Mảng là hai đoạn tăng dần. Nếu biết pivot, tôi chỉ cần binary search đúng đoạn. Pivot tìm được bằng binary search so nums[mid] với nums[hi]." Nói được cách này là đã đạt yêu cầu O(log n).
4. **Nhận xét then chốt** (1 phút): "Thật ra không cần pivot. Tại mọi mid, ít nhất một nửa đã tăng dần – so nums[lo] với nums[mid] là biết. Với nửa tăng dần, kiểm tra target có nằm trong khoảng của nó; có thì vào, không thì sang nửa kia."
5. **Code một lượt** (2–3 phút): viết bốn nhánh cẩn thận, nói to vì sao dùng `nums[lo] <= nums[mid]` (dấu `=` cho trường hợp `lo == mid` khi còn 1–2 phần tử) và vì sao khoảng là nửa mở `[nums[lo], nums[mid])` (mid đã kiểm tra rồi).
6. **Chạy tay** (1 phút): `[4,5,6,7,0,1,2]`, target 0 và target 3; thêm mảng không xoay `[1,3,5]` để chứng tỏ code tổng quát.
7. **Phân tích** (30s): O(log n) thời gian, O(1) bộ nhớ.

## Lỗi hay gặp

- Viết `nums[lo] < nums[mid]` (thiếu `=`) ⇒ sai khi `lo == mid`, ví dụ `[3, 1]`, target 1.
- Kiểm tra khoảng ở nửa **không** sắp xếp – khoảng giá trị của nửa có vách xoay không liên tục nên phép kiểm tra vô nghĩa.
- Ở cách hai lượt: dùng `hi = mid − 1` khi tìm pivot ⇒ có thể nhảy qua mất min.
- Tính `mid = (lo + hi) / 2` trong ngôn ngữ có tràn số – dùng `lo + (hi − lo) / 2`.

## Follow-up thường gặp

- **Có phần tử trùng (LC 81)?** Khi `nums[lo] == nums[mid] == nums[hi]` không biết nửa nào sắp xếp ⇒ `lo++`, `hi--`. Worst case O(n) và nên nói rõ không thể tốt hơn (vd `[1,1,1,0,1]`).
- **Tìm min (LC 153 / 154)?** Chính là lượt 1 của cách pivot.
- **Trả về số lần bị xoay?** Bằng chỉ số pivot.
- **Nhiều truy vấn?** Tìm pivot một lần, mỗi truy vấn binary search trên mảng "ảo" với chỉ số `(i + pivot) % n`.
- **Mảng xoay 2 chiều / tìm trong ma trận xoay?** Nguyên lý "một nửa luôn có cấu trúc" vẫn áp dụng – nêu ý tưởng, không cần code.
