## Bài toán

Cho `k` danh sách đã sắp xếp tăng dần, tổng cộng `N` phần tử. Trộn thành một danh sách sắp xếp.

`[[1,4,5], [1,3,4], [2,6]]` → `[1,1,2,3,4,4,5,6]`.

Merge k Sorted Lists (LeetCode 23, Hard) là bước k-way merge của external sort và là bài "nâng cấp" trực tiếp của Merge Two Sorted Lists. Điểm chấm nằm ở việc nhận ra **chỉ cần so sánh k phần tử đầu** và dùng heap để chọn min trong O(log k).

## Ý tưởng / Trực giác

Tại mỗi thời điểm, phần tử nhỏ nhất còn lại toàn cục chắc chắn là **đầu của một danh sách nào đó** (vì mỗi danh sách đã sắp xếp). Vậy chỉ cần giữ k "đại diện" – phần tử đầu chưa lấy của từng danh sách – trong một min-heap. Pop đỉnh, ghi ra kết quả, rồi nạp phần tử kế tiếp của danh sách đó vào heap. Heap không bao giờ vượt k phần tử.

So sánh: lấy min bằng duyệt k đầu danh sách tốn O(k) mỗi bước ⇒ O(N·k); heap giảm xuống O(log k).

## Thuật toán từng bước

1. Đẩy `(lists[i][0], i, 0)` vào min-heap với mọi danh sách không rỗng.
2. Khi heap chưa rỗng: pop `(value, i, pos)`; đẩy `value` vào kết quả; nếu `pos + 1 < lists[i].length` thì push `(lists[i][pos+1], i, pos+1)`.
3. Trả về kết quả.

Ở tab **Debug**, ô vàng là phần tử đang nằm trong heap (đầu mỗi danh sách), ô đỏ là phần tử vừa pop, ô tím là phần tử vừa nạp; ô xám đã lấy xong.

## Chứng minh đúng

Bất biến: heap chứa đúng phần tử đầu chưa lấy của mỗi danh sách chưa cạn, và kết quả là dãy sắp xếp gồm các phần tử đã lấy, tất cả ≤ mọi phần tử trong heap. Khi pop đỉnh `v`: `v` ≤ mọi đầu danh sách, và mọi phần tử chưa lấy khác đều ≥ đầu danh sách của nó ≥ `v`, nên `v` là min toàn cục còn lại ⇒ nối vào kết quả vẫn sắp xếp. Nạp phần tử kế tiếp giữ bất biến. Khi heap rỗng mọi danh sách đã cạn ⇒ kết quả đầy đủ.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ phụ |
|---|---|---|
| Min-heap k phần tử | O(N log k) | O(k) |
| Chia để trị (trộn cặp đôi) | O(N log k) | O(log k) stack |
| Trộn lần lượt list 1+2, rồi +3, … | O(N·k) | O(1) |
| Gộp tất cả rồi sort | O(N log N) | O(N) |

## Tradeoff

- Heap: một lượt, phù hợp với dữ liệu luồng / file ngoài (chỉ cần k con trỏ đọc); cần cài heap trong JS.
- Chia để trị: cùng độ phức tạp, không cần heap, dễ viết với linked list bằng cách tái dùng `mergeTwo`.
- Trộn lần lượt đơn giản nhưng O(N·k) – chậm khi k lớn.
- Sort toàn bộ ngắn nhất nhưng bỏ phí thông tin đã sắp xếp và cần O(N) bộ nhớ.

## Lợi / Hại

**Lợi:** mẫu k-way merge dùng trong external sort, LSM compaction, merge log; mở rộng tự nhiên sang "k phần tử nhỏ nhất của ma trận sắp xếp", "smallest range". **Hại:** so với trộn hai danh sách, phải quản lý thêm (chỉ số danh sách, vị trí) và tie-break; với k = 2 heap là thừa.

## Use case thực tế

- **External sort / MapReduce shuffle:** trộn các run đã sắp xếp trên đĩa với buffer k phần tử.
- **LSM-tree compaction** (RocksDB, Cassandra): gộp nhiều SSTable đã sắp xếp theo key.
- **Hợp nhất log/sự kiện** từ nhiều nguồn theo timestamp (distributed tracing, Kafka consumer nhiều partition).
- **Tìm kiếm:** gộp k danh sách posting đã sắp xếp theo doc id.

## Lỗi thường gặp

- Đẩy toàn bộ phần tử vào heap ⇒ O(N log N) và O(N) bộ nhớ, mất ưu điểm.
- Quên bỏ qua danh sách rỗng ⇒ đọc `lists[i][0]` undefined.
- Không nạp phần tử kế tiếp sau khi pop ⇒ mất dữ liệu.
- Với linked list: so sánh node thay vì giá trị, hoặc tạo node mới thay vì nối lại.
- Tie-break không ổn định khi cần giữ thứ tự danh sách (merge ổn định).

## Biến thể

- **Chia để trị:** `merge(lists[l..r]) = mergeTwo(merge(l..m), merge(m+1..r))`.
- **Kth Smallest in Sorted Matrix (378):** heap trên đầu mỗi hàng, pop k lần.
- **Smallest Range Covering k Lists (632):** heap + theo dõi max hiện tại.
- **Merge k luồng vô hạn:** cùng cấu trúc, mỗi luồng là iterator.
- **k lớn và dữ liệu ngoài bộ nhớ:** tournament tree (loser tree) để giảm hằng số so với heap.
