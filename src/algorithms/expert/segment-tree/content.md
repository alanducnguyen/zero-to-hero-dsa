## Bài toán

Cho mảng `nums`. Hỗ trợ xen kẽ nhiều lần hai thao tác:
- `update(i, v)`: gán `nums[i] = v`.
- `query(l, r)`: tổng `nums[l..r]`.

Prefix sum trả lời query O(1) nhưng mỗi update phải tính lại O(n). Mảng thường thì ngược lại. **Segment tree** cho cả hai O(log n). Bài LeetCode 307 là cổng vào; từ đó mở ra range min/max, đếm, lazy propagation – chủ đề "cuối cùng" trong phỏng vấn thuật toán ở Google và các quỹ định lượng.

## Ý tưởng / Trực giác

Chia để trị trên đoạn: gốc quản lý `[0, n−1]`, hai con quản lý hai nửa, đệ quy tới lá là từng phần tử. Mỗi node lưu **tổng đoạn của nó** = tổng hai con.

- **Update** một phần tử chỉ ảnh hưởng các node trên đường từ lá tới gốc: O(log n) node.
- **Query** đoạn `[l, r]`: đi từ gốc; node nằm **trọn** trong `[l, r]` thì lấy tổng ngay, không xuống nữa; node không giao thì bỏ; node giao một phần thì hỏi hai con. Mỗi tầng chỉ có tối đa 2 node "giao một phần" ⇒ O(log n).

Giống như hỏi dân số một vùng: nếu vùng chứa trọn một tỉnh, lấy số của tỉnh; chỉ những tỉnh bị cắt dở mới phải xuống huyện.

## Thuật toán từng bước

- `build(node, lo, hi)`: lá ⇒ `tree[node] = nums[lo]`; ngược lại build hai con, `tree[node] = tổng hai con`.
- `update(node, lo, hi, idx, val)`: lá ⇒ gán; ngược lại đệ quy vào nhánh chứa idx, rồi tính lại `tree[node]`.
- `query(node, lo, hi, l, r)`: không giao ⇒ 0; nằm trọn ⇒ `tree[node]`; giao một phần ⇒ tổng của query hai con.

Tab **Debug**: cây với nhãn đoạn `[lo..hi]` dưới mỗi node; khi query, node xanh lá là "nằm trọn – lấy ngay", xám là "không giao", vàng là "giao một phần – xuống tiếp". Khi update, đường đi từ gốc tới lá tô đỏ khi tính lại.

## Chứng minh đúng

**Bất biến:** `tree[node]` = tổng `nums[lo..hi]` của đoạn node quản lý.

- **Build:** quy nạp từ lá lên.
- **Update:** chỉ các node có đoạn chứa `idx` thay đổi tổng; chúng nằm trên một đường gốc→lá; ta cập nhật lá rồi tính lại từng node trên đường về từ hai con (đã đúng) ⇒ bất biến giữ.
- **Query:** tập node "nằm trọn" được trả về tạo thành **phân hoạch** của `[l, r]` (mỗi phần tử của `[l, r]` thuộc đúng một node trả về, vì ta chỉ dừng ở node nằm trọn và đệ quy đủ hai con cho node giao một phần) ⇒ tổng của chúng = tổng `[l, r]`.

**O(log n) cho query:** tại mỗi tầng, các node giao một phần với `[l, r]` chỉ có thể là node chứa `l` hoặc node chứa `r` (tối đa 2); mỗi node giao một phần sinh ≤ 2 con được thăm ⇒ ≤ 4 node/tầng ⇒ ≤ 4 log n.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Build | O(n) | Mỗi node một lần, ~2n node |
| Query / Update | O(log n) | Chiều cao cây |
| Bộ nhớ | O(n) | Mảng 4n (an toàn) hoặc 2n với cây lặp |
| Prefix sum | O(1) query, O(n) update | |
| Fenwick tree | O(log n) cả hai, O(n) bộ nhớ, hằng số nhỏ hơn | Chỉ cho phép toán có nghịch đảo (tổng) hoặc prefix |

## Tradeoff

- **Segment tree ↔ Fenwick (BIT):** BIT ngắn hơn (10 dòng), nhanh hơn 2–3×, ít bộ nhớ; nhưng chỉ tự nhiên cho prefix sum / phép có nghịch đảo. Segment tree tổng quát: min/max/gcd, range update (lazy), tìm kiếm trên cây, merge thông tin phức tạp. Phỏng vấn: biết cả hai; dùng BIT cho tổng/đếm, segment tree cho min/max và lazy.
- **Đệ quy ↔ Lặp (bottom-up, 2n):** bản lặp nhanh, gọn, không tràn stack; đệ quy dễ đọc, dễ thêm lazy propagation.
- **Range update:** cập nhật cả đoạn O(log n) cần **lazy propagation** (hoãn việc đẩy xuống con) – phức tạp hơn, nhưng là bước mở rộng chuẩn.
- **Tĩnh và chỉ query:** sparse table cho min/max O(1) truy vấn; prefix sum cho tổng.
- **Giá trị lớn / thưa:** segment tree động (tạo node khi cần) hoặc nén toạ độ.
- **Persistent:** giữ phiên bản cũ O(log n) bộ nhớ/thao tác – truy vấn lịch sử, k-th smallest trên đoạn.

## Lợi / Hại

**Lợi**
- Query và update đều O(log n); tổng quát cho mọi phép kết hợp (associative).
- Mở rộng mạnh: lazy, persistent, 2D, merge sort tree, segment tree beats.
- Chia để trị rõ ràng, chứng minh đẹp.

**Hại**
- Code dài hơn BIT; dễ sai chỉ số (`2i+1`/`2i+2`, mid).
- 4n bộ nhớ với bản đệ quy; cache kém hơn mảng phẳng.
- Với bài chỉ cần prefix sum, là "dùng dao mổ trâu".

## Use case thực tế

- **Database / analytics:** aggregate trên khoảng thời gian với cập nhật liên tục (tổng doanh thu theo ngày, max latency theo phút).
- **Hệ thống tài chính:** order book – tổng khối lượng trong khoảng giá, cập nhật khi lệnh thay đổi; Skyline.
- **Đồ hoạ / GIS:** range query trên toạ độ, phát hiện va chạm theo trục (sweep + segment tree).
- **Text editor / rope:** đếm ký tự/dòng trong khoảng với chèn xoá.
- **Lập lịch:** tìm khoảng thời gian trống đầu tiên đủ dài (segment tree lưu max khoảng trống).
- **Thi đấu lập trình:** công cụ chuẩn cho mọi bài "truy vấn đoạn + cập nhật".
- **Mạng / monitoring:** percentile, max trong cửa sổ với cập nhật ngẫu nhiên.

## Lỗi thường gặp

1. Kích thước mảng `2n` thay vì `4n` cho bản đệ quy ⇒ tràn khi n không phải luỹ thừa 2.
2. Điều kiện "nằm trọn" viết thành `lo <= l && r <= hi` (ngược).
3. Quên tính lại `tree[node]` sau khi update con.
4. `mid` sai nửa (con phải phải bắt đầu từ `mid + 1`).
5. Phần tử trung hoà sai cho phép toán (0 cho tổng, +∞ cho min, −∞ cho max).
6. Dùng segment tree cho bài chỉ cần prefix sum / không có update.

## Biến thể

- **Range min/max/gcd:** đổi phép `+` và phần tử trung hoà.
- **Lazy propagation:** range add / range assign O(log n).
- **Fenwick tree:** prefix sum với `i & −i`.
- **Segment tree lặp (bottom-up):** mảng 2n, không đệ quy.
- **Merge sort tree / wavelet:** đếm số phần tử ≤ x trong đoạn.
- **Persistent segment tree:** k-th smallest trên đoạn bất kỳ.
- **Segment tree trên giá trị (nén):** Count of Smaller Numbers After Self, LIS II.
- **2D segment tree / BIT 2D:** truy vấn hình chữ nhật.
