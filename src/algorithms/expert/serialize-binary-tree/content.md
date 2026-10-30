## Bài toán

Thiết kế hai hàm `serialize(root): string` và `deserialize(data): TreeNode` cho **cây nhị phân bất kỳ** (không phải BST, giá trị có thể trùng, có thể âm) sao cho `deserialize(serialize(t))` dựng lại **đúng** cây `t` – cùng giá trị, cùng hình dạng. Định dạng chuỗi do ta tự chọn.

Ví dụ cây `1(2, 3(4, 5))` có thể được ghi thành `"1,2,#,#,3,4,#,#,5,#,#"`.

## Ý tưởng / Trực giác

Một dãy duyệt đơn lẻ (preorder, inorder…) **không** xác định duy nhất cây: preorder `1,2` có thể là 2 nằm bên trái hoặc bên phải của 1. Lý do là ta đã vứt bỏ thông tin "chỗ nào trống". Cách sửa đơn giản nhất: **ghi luôn các con rỗng** bằng một ký hiệu đặc biệt `#`.

Khi mọi node đều có đúng hai "con" (thật hoặc `#`), dãy preorder trở thành một **ngữ pháp tự định giới hạn**: `Tree := '#' | val Tree Tree`. Đọc lại chỉ cần làm đúng như ngữ pháp nói – đọc một token; nếu là `#` thì xong, nếu là số thì đệ quy đọc cây trái rồi cây phải. Đây chính là một bộ parser đệ quy xuống (recursive descent) với **một con trỏ chỉ tiến**.

## Thuật toán từng bước

**Serialize (preorder DFS):**
1. Nếu node rỗng ⇒ ghi `#` và quay về.
2. Ghi giá trị node (gốc trước).
3. Đệ quy cây con trái, rồi cây con phải.
4. Nối các token bằng dấu `,` (dấu phân cách bắt buộc vì giá trị có thể nhiều chữ số hoặc âm).

**Deserialize (con trỏ i):**
1. Tách chuỗi thành mảng token, đặt `i = 0`.
2. `build()`: đọc `tokens[i++]`. Nếu là `#` ⇒ trả về `null`.
3. Ngược lại tạo node, `node.left = build()`, `node.right = build()`, trả về node.

Con trỏ `i` dùng chung (closure) nên mỗi lời gọi tự động "ăn" đúng phần token thuộc cây con của nó – không cần biết trước kích thước cây con.

## Chứng minh đúng

Quy nạp theo chiều cao cây, chứng minh mệnh đề: *nếu `build()` bắt đầu tại vị trí đầu của đoạn token do `serialize(T)` sinh ra, thì nó trả về cây bằng `T` và để `i` dừng ngay sau đoạn đó.*

- **Cơ sở:** `T` rỗng ⇒ đoạn là `"#"`; `build()` đọc `#`, tăng i một bước, trả `null`. Đúng.
- **Bước quy nạp:** `T = (v, L, R)` ⇒ đoạn là `v · S(L) · S(R)`. `build()` đọc `v`, tạo node. Theo giả thiết quy nạp, lời gọi trái dựng đúng `L` và dừng đúng ở đầu `S(R)`; lời gọi phải dựng đúng `R` và dừng sau `S(R)`. Vậy kết quả bằng `T` và `i` đúng vị trí.

Tính duy nhất cũng suy ra từ đây: ngữ pháp `Tree := '#' | val Tree Tree` là **phi ngữ cảnh không nhập nhằng** – mỗi chuỗi hợp lệ có đúng một cây phân tích. Một hệ quả hay: cây n node luôn có đúng **n + 1** dấu `#`.

## Độ phức tạp

| Thao tác | Thời gian | Bộ nhớ phụ |
|---|---|---|
| serialize | O(n) – mỗi node và mỗi null ghi đúng 1 lần | O(h) call stack + O(n) chuỗi ra |
| deserialize | O(n) – mỗi token đọc đúng 1 lần | O(h) call stack + O(n) mảng token |
| Kích thước chuỗi | 2n + 1 token | |

h là chiều cao cây: O(log n) nếu cân bằng, O(n) nếu lệch (cây dạng danh sách).

## Tradeoff

- **Preorder + `#` (DFS) vs level-order (BFS):** Định dạng BFS kiểu LeetCode `"1,2,3,null,null,4,5"` duyệt bằng queue, deserialize bằng queue các node chờ gắn con. Ưu điểm: dễ đọc bằng mắt, có thể cắt bỏ các `null` ở đuôi, không đệ quy nên không tràn stack với cây lệch sâu. Nhược: code dài hơn, phải quản lý queue và chỉ số con trái/phải. DFS ngắn gọn, đệ quy tự nhiên, nhưng cây sâu 10⁵ có thể tràn call stack ⇒ cần bản lặp.
- **Ghi null vs ghi thêm dãy thứ hai:** có thể lưu preorder + inorder rồi dựng lại (LC 105), nhưng cách này **sai khi giá trị trùng** và tốn gấp đôi. Ghi `#` đơn giản và luôn đúng.
- **Text vs nhị phân:** chuỗi CSV dễ debug; định dạng nhị phân (bitmask "có con trái/phải" + varint giá trị) gọn hơn nhiều cho hệ thống thật.

## Lợi/Hại

**Lợi:** O(n) cả hai chiều, định dạng tự mô tả, hoạt động với giá trị trùng/âm, mở rộng tự nhiên sang cây N-ary (ghi thêm số con) và cây có thuộc tính.

**Hại:** chuỗi dài gấp ~2 lần số node vì các `#`; đệ quy sâu với cây lệch; định dạng text tốn chỗ so với nhị phân. Với BST còn có cách gọn hơn (bỏ hẳn `#`, xem Biến thể).

## Use case thực tế

- Lưu cây (cây quyết định của mô hình ML, AST, cây DOM, cây thư mục) xuống đĩa hoặc gửi qua mạng.
- Cache/hash cấu trúc cây: chuỗi serialize làm khoá để phát hiện **cây con trùng lặp** (LC 652) hoặc so sánh hai cây (Merkle tree, Git object).
- Giao thức RPC/JSON/Protocol Buffers thực chất là serialize đệ quy theo preorder.
- Test harness: LeetCode biểu diễn input cây bằng level-order chính vì cần serialize.

## Lỗi thường gặp

- **Không ghi null** ⇒ không dựng lại được hình dạng cây.
- **Không dùng dấu phân cách** ⇒ `"12"` không biết là 12 hay 1 và 2; số âm `-3` bị cắt sai.
- Dùng con trỏ `i` là biến cục bộ truyền theo giá trị ⇒ lời gọi con tăng i nhưng cha không thấy. Phải dùng closure, đối tượng chứa i, hoặc iterator/queue.
- Dùng `tokens.shift()` trong vòng lặp ⇒ mỗi lần O(n), tổng O(n²).
- Chuỗi rỗng `""` khi cây rỗng, rồi `"".split(",")` trả `[""]` ⇒ dễ tạo node `Number("") = 0`. Ghi `"#"` cho cây rỗng tránh được lỗi này.

## Biến thể

- **Level-order (BFS):** ghi theo tầng với `null`; deserialize dùng queue: lấy node đầu queue, đọc 2 token tiếp theo làm con trái/phải, đẩy con khác null vào queue.
- **Serialize BST (LC 449):** chỉ cần preorder **không** có `#`; khi dựng lại dùng khoảng `(lo, hi)` để biết token tiếp theo thuộc cây con nào ⇒ chuỗi ngắn hơn.
- **Cây N-ary (LC 428):** ghi `val, số con, …các con` hoặc dùng dấu mở/đóng ngoặc.
- **Verify Preorder Serialization (LC 331):** đếm "slot" trống: bắt đầu 1, mỗi token tiêu 1 slot, mỗi số sinh thêm 2; hợp lệ khi slot không bao giờ âm và kết thúc bằng 0.
- **Find Duplicate Subtrees (LC 652):** serialize từng cây con (postorder) vào HashMap.
