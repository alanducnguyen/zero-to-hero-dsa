## Bảng so sánh

| Lời giải | Thời gian | Bộ nhớ | Dựng lại chuỗi LCS? | Ghi chú |
|---|---|---|---|---|
| Đệ quy thuần | O(2^(m+n)) | O(m+n) stack | Có (chậm) | Chỉ để rút ra công thức |
| Đệ quy + memo | O(m·n) | O(m·n) + stack | Có | Ít code nhất từ công thức; tràn stack khi chuỗi dài |
| Bảng 2-D | O(m·n) | O(m·n) | **Có, dễ** | Không đệ quy; truy vết ngược từ (m, n) |
| Hai hàng lăn ★ | O(m·n) | **O(min(m,n))** | Không | Đáp án tối ưu khi chỉ hỏi độ dài |

## Phân tích

**Đệ quy thuần** đến thẳng từ quan sát về ký tự cuối: nếu `a[i-1] = b[j-1]` thì luôn an toàn khi ghép chúng (lập luận đổi chỗ), ngược lại ít nhất một trong hai không thuộc LCS nên lấy max của hai nhánh. Vấn đề: hai nhánh `(i−1, j)` và `(i, j−1)` đều đi tới `(i−1, j−1)` ⇒ cây chồng chéo, tệ nhất C(m+n, m) lá. Ma trận "số lần gọi" trong tab Debug cho thấy các ô giữa bị gọi hàng chục lần.

**Memo** chỉ thêm một Map: có (m+1)(n+1) trạng thái, mỗi trạng thái O(1) công ⇒ O(m·n). Điểm yếu là hằng số (hash, lời gọi hàm) và stack đệ quy sâu tới m + n – với chuỗi 10⁴ ký tự là tràn stack trong JS.

**Bảng 2-D** đảo chiều thành vòng lặp: duyệt hàng rồi cột thì ô trên, trái, chéo luôn đã có. Nó tốn O(m·n) bộ nhớ, nhưng đây là **cái giá có chủ đích**: bảng còn nguyên thì đi ngược từ (m, n) – khớp thì đi chéo và ghi ký tự, không khớp thì đi về phía ô lớn hơn – để in ra chính chuỗi LCS. Đây là thứ `diff`, `git merge` cần.

**Hai hàng lăn** nhận ra dp[i][·] chỉ phụ thuộc dp[i−1][·] ⇒ giữ `prev` và `cur`, và chọn chuỗi ngắn hơn làm cột để còn O(min(m,n)). Cùng độ phức tạp thời gian, thường nhanh hơn thực tế vì toàn bộ dữ liệu nằm trong cache. Nhưng các hàng cũ đã bị vứt nên **không truy vết được**.

## Xếp hạng

1. **Hai hàng lăn** – O(m·n)/O(min(m,n)). Mặc định cho LC 1143 (chỉ hỏi độ dài).
2. **Bảng 2-D** – cần khi phải dựng lại chuỗi; cũng là bản nên viết đầu tiên trên bảng trắng vì dễ kiểm chứng.
3. **Memo** – đúng và nhanh để viết, nhưng thua bảng về hằng số và rủi ro stack.
4. **Đệ quy thuần** – chỉ để mở đầu.

## Khi nào thứ hạng đổi

- **Cần in chuỗi LCS / diff** ⇒ bảng 2-D lên hạng 1. Nếu vừa cần chuỗi vừa bị giới hạn bộ nhớ (chuỗi 10⁵) ⇒ **Hirschberg**: chia đôi a, chạy hai hàng lăn xuôi và ngược để tìm điểm cắt tối ưu trên b, đệ quy hai nửa ⇒ O(m·n) thời gian, O(min(m,n)) bộ nhớ, vẫn in được chuỗi.
- **Hai chuỗi rất giống nhau** (diff phiên bản code) ⇒ Myers O((m+n)·D) với D là số khác biệt, nhanh hơn O(m·n) rất nhiều; memo top-down cũng hưởng lợi vì chỉ đi qua dải gần đường chéo.
- **Bảng chữ cái lớn, ít ký tự trùng** ⇒ Hunt–Szymanski chuyển về LIS trên các cặp khớp, O((r + n) log n) với r là số cặp khớp.
