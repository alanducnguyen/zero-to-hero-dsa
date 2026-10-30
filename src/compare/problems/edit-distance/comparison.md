## Bảng so sánh

| Lời giải | Thời gian | Bộ nhớ | In được dãy thao tác? | Ghi chú |
|---|---|---|---|---|
| Đệ quy thuần | O(3^(m+n)) | O(m+n) stack | Có (chậm) | Phân nhánh 3, bùng nổ nhanh hơn LCS |
| Đệ quy + memo | O(m·n) | O(m·n) + stack | Có | Ít sửa nhất từ đệ quy |
| Bảng 2-D | O(m·n) | O(m·n) | **Có, dễ** | Lần ngược từ (m, n) ra alignment |
| Một hàng + biến chéo ★ | O(m·n) | **O(min(m,n))** | Không | Đáp án tối ưu cho LC 72 |

## Phân tích

**Đệ quy thuần** xét ký tự cuối: khớp thì miễn phí `d(i−1, j−1)`; không khớp thì 1 + min của **thay** `d(i−1, j−1)`, **xoá** `d(i−1, j)`, **chèn** `d(i, j−1)`. Ba nhánh chồng chéo dày đặc – với 5×5 không khớp đã ~2500 lời gọi cho 36 trạng thái (số Delannoy). Ma trận đếm lời gọi trong tab Debug cho thấy rõ.

**Memo** chặn việc tính lại: (m+1)(n+1) trạng thái × O(1) ⇒ O(m·n). Base case gộp gọn thành `i + j`. Vẫn còn hằng số Map và stack sâu m + n.

**Bảng 2-D**: hàng 0 = j (chèn), cột 0 = i (xoá), điền theo hàng. O(m·n) bộ nhớ đổi lấy khả năng **lần ngược** từ (m, n): đi chéo = giữ/thay, đi lên = xoá, đi trái = chèn ⇒ ra alignment – thứ mà spell-checker giải thích gợi ý hay tool so sánh văn bản cần.

**Một hàng + biến chéo** là tối ưu bộ nhớ "khó" hơn LCS một chút: ghi đè `row[j]` tại chỗ thì giá trị cũ (ô *trên*) mất, và ô *chéo* dp[i−1][j−1] đã bị ghi đè ở bước j−1. Lời giải: trước khi ghi `row[j]`, lưu giá trị cũ vào `up`, sau đó `prev = up` để làm ô chéo cho j+1. Chỉ một mảng min(m,n)+1 và một biến. Đây là bản nhanh nhất thực tế vì cache.

## Xếp hạng

1. **Một hàng + biến chéo** – O(m·n)/O(min(m,n)). Mặc định khi chỉ cần con số.
2. **Bảng 2-D** – cần khi phải in dãy thao tác; cũng nên viết trước để dễ giải thích.
3. **Memo** – đúng, nhanh để viết, nhưng hằng số và stack kém hơn.
4. **Đệ quy thuần** – chỉ để rút ra công thức.

## Khi nào thứ hạng đổi

- **Cần alignment nhưng chuỗi dài** (DNA, file lớn) ⇒ **Hirschberg**: chia đôi a, chạy bản một hàng xuôi cho nửa trên và ngược cho nửa dưới, tìm cột k làm tổng nhỏ nhất, đệ quy hai nửa ⇒ in được alignment với O(m·n) thời gian và chỉ O(min(m,n)) bộ nhớ.
- **Chỉ chèn/xoá, hai chuỗi gần giống nhau** (diff dòng code) ⇒ **thuật toán Myers** O((m+n)·D), D = số khác biệt – nền của `git diff`. Nhanh hơn hẳn O(m·n) khi D nhỏ.
- **Chỉ hỏi "khoảng cách ≤ k?"** ⇒ DP dải chéo (banded) O(k·min(m,n)): ô có |i − j| > k chắc chắn > k nên bỏ qua; memo top-down cũng tự cắt nhánh nếu dừng sớm.
- **Tra từ gần đúng trong từ điển lớn** ⇒ không chạy DP từng cặp mà dùng BK-tree hoặc Levenshtein automaton.
