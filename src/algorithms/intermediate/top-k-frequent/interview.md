## Cách trình bày trong phỏng vấn

1. Nêu ngay hai bước: đếm bằng HashMap, rồi chọn top-k. Hỏi "k nhỏ hơn n nhiều không?" để chọn cách.
2. Trình bày sort O(n log n) làm baseline, rồi min-heap kích thước k O(n log k), giải thích vì sao là **min**-heap.
3. Nêu bucket sort O(n) như cách tối ưu và khi nào dùng.
4. Code heap (hoặc bucket nếu được chọn), chạy tay ví dụ nhỏ.
5. Nhắc tie-break và phiên bản luồng dữ liệu.

## Câu hỏi follow-up thường gặp

- **Vì sao min-heap chứ không max-heap?** Ta cần loại nhanh phần tử yếu nhất trong k ứng viên; max-heap k phần tử không cho biết phần tử yếu nhất.
- **Làm O(n) được không?** Bucket theo count (count ≤ n), duyệt bucket từ n về 1 lấy đủ k. Hoặc quickselect trên mảng cặp.
- **Dữ liệu là luồng, không lưu được freq?** Count-Min Sketch để ước lượng count + heap k; hoặc Space-Saving với k bộ đếm.
- **Cần thứ tự giảm dần trong đáp án?** Pop heap lần lượt rồi đảo, hoặc sort k phần tử O(k log k).
- **Top k từ với tie theo thứ tự từ điển?** Comparator: count tăng dần, với count bằng nhau thì từ **lớn hơn** ở đỉnh để bị loại trước.
- **k = n?** Heap vô ích; trả về mọi giá trị khác nhau.

## Checklist nhận diện pattern

- "k phần tử nhiều nhất / gần nhất / lớn nhất" ⇒ heap kích thước k (min-heap cho "lớn nhất", max-heap cho "nhỏ nhất").
- Tiêu chí là tần suất ⇒ bước đếm HashMap trước.
- Tiêu chí có miền giá trị nhỏ, nguyên ⇒ bucket sort O(n).
- Dữ liệu quá lớn ⇒ sketch + heap.

## Bài luyện tập

- 347 Top K Frequent Elements → 692 Top K Frequent Words → 451 Sort Characters By Frequency.
- 973 K Closest Points to Origin, 215 Kth Largest Element.
- 1046 Last Stone Weight (heap cơ bản), 295 Find Median from Data Stream (hai heap).
