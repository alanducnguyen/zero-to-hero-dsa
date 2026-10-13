## Bài toán

Cho mảng `nums` và số `k`. Trả về `k` giá trị xuất hiện nhiều lần nhất. Đề đảm bảo đáp án duy nhất.

`[1,1,1,2,2,3]`, `k = 2` → `[1, 2]`.

Bài này (LeetCode 347) là đại diện cho mẫu **"đếm rồi lấy top-k"**: phần đếm là HashMap, phần chọn có ba cách (sort, heap, bucket) và người phỏng vấn muốn bạn so sánh chúng. Yêu cầu chuẩn: tốt hơn O(n log n).

## Ý tưởng / Trực giác

1. **Đếm:** `freq[x]` bằng HashMap, O(n).
2. **Chọn k lớn nhất theo tần suất:** không cần sắp xếp toàn bộ. Duy trì một **min-heap kích thước k** theo count: đẩy từng cặp `(giá trị, count)` vào; khi heap vượt k, bỏ đỉnh (count nhỏ nhất). Phần tử bị bỏ chắc chắn không thuộc top-k vì đã có ≥ k phần tử count lớn hơn nó. Kết thúc, heap chính là đáp án.

Min-heap (không phải max-heap) vì ta cần nhanh chóng biết "ứng viên yếu nhất" để loại.

## Thuật toán từng bước

1. `freq = Map`; với mỗi `x`: `freq[x]++`.
2. `heap = []` (min-heap theo count). Với mỗi `(value, count)` trong `freq`: push; nếu `heap.size > k` thì pop.
3. Trả về các `value` trong heap.

Ở tab **Debug**: bảng `freq` cập nhật theo từng phần tử; heap vẽ dạng cây với count ở mỗi nút; ô đỏ là đỉnh bị pop. Preset "Tần suất bằng nhau" cho thấy tie-break theo giá trị.

## Chứng minh đúng

Bất biến sau khi xử lý `t` cặp: heap chứa đúng `min(t, k)` cặp có count lớn nhất trong `t` cặp đã xét. Quy nạp: khi thêm cặp mới, heap tạm có `k+1` cặp; đỉnh là cặp có count nhỏ nhất trong đó, nên `k` cặp còn lại chính là top-k của `t+1` cặp. Sau khi xét hết `m` cặp (m = số giá trị khác nhau), heap = top-k của toàn bộ.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ | Ghi chú |
|---|---|---|---|
| Đếm + sort theo count | O(n log n) | O(n) | đơn giản nhất |
| Đếm + min-heap k | O(n log k) | O(n) | tốt khi k ≪ n, chạy streaming |
| Đếm + bucket sort theo count | O(n) | O(n) | count ∈ [1, n] nên bucket đủ |
| Đếm + quickselect | O(n) kỳ vọng | O(n) | khó code đúng trong phỏng vấn |

## Tradeoff

- Heap: O(n log k), code tự nhiên, mở rộng sang dữ liệu luồng (chỉ cần giữ k phần tử); nhưng cần heap tự cài trong JS.
- Bucket: O(n) tuyệt đối, cực ngắn, nhưng tốn O(n) bucket kể cả khi count phân bố thưa.
- Sort: dễ nhất, đủ dùng khi n nhỏ; không đạt yêu cầu "tốt hơn n log n".

## Lợi / Hại

**Lợi:** mẫu chung cho Top K Frequent Words, K Closest Points, Kth Largest; heap k phần tử chạy được khi dữ liệu không vừa bộ nhớ (chỉ cần giữ k). **Hại:** bước đếm vẫn O(n) bộ nhớ; với tie cần quy tắc rõ ràng (đề 692 yêu cầu theo thứ tự từ điển).

## Use case thực tế

- Trending topics / hashtag, top sản phẩm bán chạy, top lỗi trong log theo khoảng thời gian.
- Autocomplete: k gợi ý phổ biến nhất cho một tiền tố.
- Phân tích truy cập: top-k IP/endpoint (kết hợp Count-Min Sketch khi không đếm chính xác được).
- Hệ gợi ý đơn giản: k item được tương tác nhiều nhất.

## Lỗi thường gặp

- Dùng max-heap rồi pop k lần: đúng nhưng O(n log n) bộ nhớ O(n), không tận dụng được k nhỏ.
- Dùng min-heap nhưng không pop khi vượt k ⇒ heap chứa tất cả.
- So sánh theo giá trị thay vì theo count khi xây heap.
- Tie-break không nhất quán khi đề yêu cầu thứ tự xác định.
- JS không có PriorityQueue sẵn: dùng `sort` mỗi lần push là O(k log k) mỗi bước.

## Biến thể

- **Top K Frequent Words (692):** so sánh count rồi thứ tự từ điển; min-heap với comparator ngược.
- **Sort Characters By Frequency (451):** bucket theo count rồi dựng chuỗi.
- **K Closest Points (973):** max-heap theo khoảng cách, kích thước k.
- **Luồng dữ liệu vô hạn:** Count-Min Sketch + heap k (Space-Saving / Misra-Gries) khi không lưu được freq đầy đủ.
- **Top-k trong cửa sổ trượt:** HashMap + cấu trúc có thứ tự (TreeMap) để xoá khi phần tử rời cửa sổ.
