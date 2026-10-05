## Bài toán

Đặt `n` quân hậu lên bàn cờ `n×n` sao cho không hai quân nào cùng hàng, cùng cột hoặc cùng đường chéo. Liệt kê tất cả cách đặt (LeetCode 51) hoặc đếm số cách (52).

N-Queens là bài **chuẩn mực để dạy backtracking**: cấu trúc "chọn – đệ quy – bỏ chọn" ở đây hiện rõ hơn bất kỳ bài nào khác, và kỹ thuật cắt tỉa bằng tập cột/đường chéo là thứ người phỏng vấn muốn thấy thay vì kiểm tra O(n) mỗi lần đặt.

## Ý tưởng / Trực giác

Mỗi hàng có đúng một hậu ⇒ bài toán thành **chọn một cột cho mỗi hàng**, từ trên xuống. Tại hàng `row`, thử từng cột: nếu cột đó hoặc hai đường chéo qua ô đó đã có hậu thì bỏ; nếu an toàn, đặt hậu, chuyển sang hàng tiếp. Nếu một hàng không còn cột nào an toàn ⇒ quay lại hàng trước, gỡ hậu, thử cột khác.

Ba quan sát làm kiểm tra "an toàn" thành O(1):
- Cùng cột: `col` trùng.
- Đường chéo `\`: `row − col` bằng nhau.
- Đường chéo `/`: `row + col` bằng nhau.

Ba `Set` lưu các giá trị đã chiếm. Đó là toàn bộ "trạng thái" cần thiết.

## Thuật toán từng bước

```
backtrack(row):
  nếu row == n: ghi nhận nghiệm, return
  với col từ 0..n-1:
    nếu col ∈ cols hoặc row−col ∈ diag1 hoặc row+col ∈ diag2: bỏ qua
    đặt hậu (thêm vào 3 set, push col)
    backtrack(row + 1)
    gỡ hậu (xoá khỏi 3 set, pop)
```

Tab **Debug**: ô xám bị khống chế, ô vàng đang thử, ô đỏ bị loại hoặc vừa gỡ, hậu đặt thành công màu xanh. Call stack bên phải cho thấy độ sâu = số hàng đã đặt. Preset "n = 3" cho thấy thuật toán quay lui toàn bộ mà không tìm được nghiệm.

## Chứng minh đúng

**Đầy đủ (không bỏ sót):** mọi nghiệm là một dãy `(c₀, c₁, …, cₙ₋₁)` với hậu ở `(row, c_row)`. Thuật toán duyệt theo cây: nhánh ở độ sâu `row` ứng với lựa chọn `c_row`. Chỉ cắt nhánh khi ô bị ăn bởi hậu **đã đặt** – nhánh đó không thể dẫn tới nghiệm vì hai hậu đó sẽ ăn nhau trong mọi dãy mở rộng. Vậy mọi nghiệm đều được chạm tới.

**Đúng (không thừa):** chỉ ghi nhận khi `row = n`, nghĩa là n hậu đã đặt và mỗi lần đặt đều đã kiểm tra không xung đột với mọi hậu trước ⇒ cấu hình hợp lệ.

**Bất biến trạng thái:** sau khi `backtrack(row+1)` trả về, ta gỡ đúng những gì đã thêm ⇒ ba set và `placement` trở lại y như trước ⇒ các nhánh anh em không ảnh hưởng nhau.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n!) | Hàng 0 có n lựa chọn, hàng 1 tối đa n−2, … Thực tế cắt tỉa mạnh hơn nhiều |
| Bộ nhớ | O(n) | Ba set + placement + stack đệ quy độ sâu n |
| Số nghiệm | 1, 0, 0, 2, 10, 4, 40, 92, 352, 724… | n = 1..10 (OEIS A000170) |

Không có công thức đóng cho số nghiệm; n = 27 là giá trị lớn nhất đã tính được (2016).

## Tradeoff

- **Ba Set O(1) ↔ Kiểm tra lại bàn cờ O(n):** kiểm tra quét lại dễ hiểu nhưng chậm n lần; ba set là chuẩn phỏng vấn. Với n ≤ 32, dùng **bitmask** thay set nhanh hơn nữa (N-Queens II tối ưu).
- **Liệt kê ↔ Đếm:** đếm chỉ cần `count++`, không cần copy `placement` – nhanh hơn và O(1) bộ nhớ cho kết quả.
- **Backtracking ↔ Heuristic:** để tìm **một** nghiệm cho n lớn (10⁶), backtracking quá chậm; dùng min-conflicts (local search) hoặc công thức xây trực tiếp. Backtracking là để liệt kê/đếm hoặc n nhỏ.
- **Đối xứng:** nghiệm có đối xứng gương/xoay; chỉ thử nửa đầu cột ở hàng 0 rồi nhân đôi (chú ý n lẻ) giảm một nửa thời gian.
- **Đệ quy ↔ Lặp với stack:** đệ quy sâu n – không vấn đề vì n nhỏ; backtracking lặp phức tạp hơn nhiều.

## Lợi / Hại

**Lợi**
- Khung backtracking tổng quát: áp dụng cho permutations, subsets, combination sum, sudoku, word search, graph coloring.
- Cắt tỉa sớm làm không gian tìm kiếm nhỏ hơn n! rất nhiều.
- Bộ nhớ O(n).

**Hại**
- Hàm mũ/giai thừa – không dùng cho n lớn.
- Dễ quên "bỏ chọn" ⇒ trạng thái rò rỉ sang nhánh khác (lỗi phổ biến nhất).
- Thứ tự thử ảnh hưởng mạnh tới thời gian tìm nghiệm đầu tiên.

## Use case thực tế

- **Constraint satisfaction (CSP):** xếp thời khoá biểu, phân ca, xếp phòng thi – backtracking với cắt tỉa (và forward checking).
- **Sudoku / puzzle solver, trình sinh test.**
- **Register allocation / graph coloring** trong compiler (backtracking cho đồ thị nhỏ).
- **Định tuyến mạch (VLSI), xếp hàng hoá (bin packing)** khi cần nghiệm chính xác cho instance nhỏ.
- **SAT solver** cơ bản (DPLL) là backtracking với cắt tỉa thông minh.
- **Sinh test case tổ hợp**, liệt kê cấu hình hợp lệ.

## Lỗi thường gặp

1. Quên gỡ khỏi set / pop sau đệ quy ⇒ nhánh sau bị chặn sai.
2. Dùng `row + col` cho cả hai đường chéo (phải một `+`, một `−`).
3. `solutions.push(placement)` không copy ⇒ mọi nghiệm trỏ tới cùng mảng (rỗng cuối cùng).
4. Kiểm tra cùng **hàng** – thừa, vì mỗi hàng chỉ đặt 1 hậu theo thiết kế.
5. Dừng ở nghiệm đầu tiên khi đề yêu cầu tất cả (hoặc ngược lại, không dừng khi chỉ cần một).
6. Đệ quy từ `row = 1` hoặc kiểm tra `row === n − 1` ⇒ lệch 1.

## Biến thể

- **N-Queens II (52):** chỉ đếm; dùng bitmask: `cols`, `d1 << 1`, `d2 >> 1`.
- **Permutations (46):** chọn phần tử chưa dùng cho mỗi vị trí – cùng khung, set `used`.
- **Subsets (78) / Combination Sum (39):** chọn hoặc không chọn từng phần tử.
- **Sudoku Solver (37):** ô trống thay hàng; 3 set theo hàng/cột/khối.
- **Word Search (79):** backtracking trên lưới với visited.
- **Min-conflicts:** local search cho n hàng triệu.
