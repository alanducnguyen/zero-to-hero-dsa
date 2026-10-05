## Bài toán

Cho `head` của danh sách liên kết đơn, đảo ngược và trả về `head` mới. `1 → 2 → 3 → 4 → 5` thành `5 → 4 → 3 → 2 → 1`.

Bài LeetCode #206 – "Easy" trên giấy nhưng là bài **kiểm tra tư duy con trỏ** được dùng ở Microsoft, Apple, Amazon nhiều năm. Người phỏng vấn nhìn xem bạn có **vẽ hình** trước khi code không, và có xử lý đúng thứ tự gán con trỏ không. Nó cũng là khối xây dựng cho hàng loạt bài Medium/Hard (đảo từng k node, kiểm tra palindrome O(1) bộ nhớ, reorder list).

## Ý tưởng / Trực giác

Hãy tưởng tượng bạn đi dọc danh sách, và tại mỗi node bạn **quay ngược mũi tên** của nó về node trước. Vấn đề duy nhất: ngay khi quay mũi tên, bạn mất đường đi tiếp. Vì vậy cần **ba con trỏ**:

- `prev`: node trước (đầu của phần đã đảo).
- `curr`: node đang xử lý.
- `next`: node kế tiếp, **phải lưu trước** khi cắt liên kết.

Mỗi bước: lưu `next`, quay mũi tên `curr.next = prev`, rồi dịch cả `prev` và `curr` sang phải một bước. Khi `curr` chạm `null`, `prev` là head mới.

## Thuật toán từng bước

1. `prev = null`, `curr = head`.
2. Khi `curr !== null`:
   1. `next = curr.next`
   2. `curr.next = prev`
   3. `prev = curr`
   4. `curr = next`
3. Trả `prev`.

Thứ tự 4 phép gán này là **cố định**. Mở tab **Debug** và quan sát: ở bước 2 mũi tên của `curr` quay ngược (node đỏ), phần màu xanh lá bên trái là danh sách đã đảo lớn dần.

## Chứng minh đúng

**Bất biến:** sau mỗi vòng lặp, `prev` là head của danh sách gồm các node đã duyệt **theo thứ tự đảo ngược**, và `curr` là head của phần chưa duyệt **theo thứ tự gốc**. Hai danh sách này không chia sẻ node.

- **Khởi tạo:** `prev = null` (rỗng), `curr = head` (toàn bộ) – đúng.
- **Duy trì:** lấy node `curr` ra khỏi phần chưa duyệt (nhờ `next` đã lưu), gắn nó vào đầu phần đã đảo (`curr.next = prev`), cập nhật hai head. Node vừa gắn nằm trước mọi node đã đảo ⇒ thứ tự vẫn đảo ngược đúng.
- **Kết thúc:** `curr = null` ⇒ phần chưa duyệt rỗng ⇒ `prev` là toàn bộ danh sách đã đảo.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | Mỗi node xử lý đúng 1 lần, 4 phép gán |
| Bộ nhớ | O(1) | Chỉ 3 con trỏ. Phiên bản đệ quy tốn O(n) stack |

## Tradeoff

- **Lặp ↔ Đệ quy:** đệ quy đẹp (5 dòng) nhưng O(n) stack, tràn với 10⁵ node trong JS (giới hạn ~10⁴ frame). Phỏng vấn: viết lặp, nói được đệ quy.
- **Tại chỗ ↔ Tạo mới:** tạo danh sách mới O(n) bộ nhớ nhưng không phá huỷ input (quan trọng nếu input là immutable/shared).
- **Danh sách đơn ↔ đôi:** với doubly linked list chỉ cần hoán đổi `prev`/`next` mỗi node – đơn giản hơn nhưng tốn gấp đôi bộ nhớ con trỏ.

## Lợi / Hại

**Lợi**
- O(n) thời gian, O(1) bộ nhớ, không cấp phát.
- Pattern 3 con trỏ dùng lại cho mọi bài "cắt – nối lại" linked list.

**Hại**
- Phá huỷ cấu trúc gốc (mutating).
- Dễ sai thứ tự gán ⇒ mất phần còn lại của danh sách hoặc tạo vòng.
- Không có truy cập ngẫu nhiên nên nhiều bài phải duyệt 2 lần (ví dụ tìm giữa rồi đảo nửa sau).

## Use case thực tế

- **Undo stack / lịch sử:** đảo thứ tự danh sách thao tác để replay.
- **Cấp phát bộ nhớ (free list):** kernel và allocator (như jemalloc) dùng singly linked list cho block trống; đảo/ghép danh sách là thao tác thường xuyên.
- **Kiểm tra palindrome O(1) bộ nhớ:** tìm giữa bằng slow/fast, đảo nửa sau, so sánh.
- **Xử lý stream theo lô (batch):** đảo từng nhóm k phần tử (LeetCode 25) trong pipeline xử lý gói tin.
- **Blockchain / git:** chuỗi commit là linked list ngược; duyệt lịch sử theo thứ tự thời gian cần đảo.

## Lỗi thường gặp

1. Gán `curr.next = prev` **trước** khi lưu `next` ⇒ mất phần còn lại, vòng lặp dừng sớm.
2. Trả về `curr` (luôn là `null`) thay vì `prev`.
3. Quên trường hợp danh sách rỗng hoặc 1 node (code đúng tự xử lý, nhưng hãy **nói** ra khi phỏng vấn).
4. Tạo vòng: `head.next` vẫn trỏ về node thứ hai sau khi đảo (xảy ra khi đảo một phần danh sách mà không nối lại đúng).
5. Trong TypeScript: quên kiểu `ListNode | null` cho `next` ⇒ lỗi strict null.

## Biến thể

- **Đệ quy:** `reverse(head)`: nếu `!head || !head.next` trả `head`; `newHead = reverse(head.next)`; `head.next.next = head`; `head.next = null`.
- **Reverse Linked List II (92):** đảo đoạn `[left, right]`, cần dummy node và nối lại 2 đầu.
- **Reverse Nodes in k-Group (25):** đảo từng k node, giữ nguyên phần dư.
- **Palindrome Linked List (234):** đảo nửa sau rồi so sánh.
- **Reorder List (143):** tìm giữa, đảo nửa sau, trộn xen kẽ.
