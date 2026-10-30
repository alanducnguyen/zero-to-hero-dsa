## Bài toán

Robot đứng ở ô trên-trái `(0, 0)` của lưới `m × n` và muốn tới ô dưới-phải `(m − 1, n − 1)`. Mỗi bước chỉ được đi **sang phải** hoặc **xuống dưới**. Một số ô là vật cản (`1`), robot không được đi vào. Đếm số đường đi khác nhau (LeetCode 63 – Unique Paths II). Phiên bản không có vật cản là LeetCode 62.

Ví dụ: `[[0,0,0],[0,1,0],[0,0,0]]` ⇒ `2` (vòng trên-phải hoặc vòng trái-dưới quanh vật cản ở giữa).

## Ý tưởng / Trực giác

Hãy nhìn vào **bước cuối cùng** của một đường đi tới ô `(r, c)`: nó chỉ có thể đến từ ô trên `(r − 1, c)` (đi xuống) hoặc ô trái `(r, c − 1)` (đi phải). Hai nhóm đường này **rời nhau** (bước cuối khác nhau) và **phủ hết** mọi khả năng. Vậy:

`số đường tới (r, c) = số đường tới (r − 1, c) + số đường tới (r, c − 1)`

Đây là quy tắc cộng của tổ hợp, cũng chính là cách dựng tam giác Pascal. Vật cản chỉ đơn giản là ô có giá trị 0: không đường nào kết thúc ở đó, nên cũng không đóng góp cho ô bên phải hay bên dưới.

Đệ quy thuần `f(r, c) = f(r−1, c) + f(r, c−1)` có rất nhiều bài toán con trùng lặp (số lời gọi tăng theo hàm mũ). Lưu kết quả vào bảng `dp` ⇒ mỗi ô tính đúng một lần.

## Thuật toán từng bước

1. Nếu lưới rỗng ⇒ trả về `0`.
2. Tạo `dp` kích thước `m × n` toàn 0.
3. Duyệt `r` từ trên xuống, `c` từ trái sang phải:
   - Nếu `grid[r][c] = 1`: `dp[r][c] = 0`.
   - Ngược lại nếu là ô xuất phát: `dp[0][0] = 1`.
   - Ngược lại: `dp[r][c] = (r > 0 ? dp[r−1][c] : 0) + (c > 0 ? dp[r][c−1] : 0)`.
4. Trả về `dp[m−1][n−1]`.

Thứ tự duyệt theo hàng đảm bảo khi tính `(r, c)` thì ô trên và ô trái đã có giá trị.

## Chứng minh đúng

Quy nạp theo thứ tự duyệt. **Cơ sở:** `dp[0][0] = 1` nếu ô trống (đường rỗng), `0` nếu là vật cản. **Bước quy nạp:** giả sử mọi ô đứng trước `(r, c)` trong thứ tự duyệt đã đúng. Nếu `(r, c)` là vật cản, không đường hợp lệ nào kết thúc ở đó ⇒ 0. Nếu không, mỗi đường hợp lệ tới `(r, c)` có duy nhất một bước cuối, đến từ ô trên hoặc ô trái; bỏ bước cuối ta được một đường hợp lệ tới ô đó, và ngược lại mỗi đường tới ô trên/trái nối thêm một bước cho đúng một đường tới `(r, c)`. Song ánh này cho `dp[r][c] = dp[r−1][c] + dp[r][c−1]`; ô nằm ngoài lưới đóng góp 0.

## Độ phức tạp

| Phiên bản | Thời gian | Bộ nhớ |
|---|---|---|
| Đệ quy thuần | O(2^(m+n)) | O(m + n) |
| Memo / bảng 2D | O(m·n) | O(m·n) |
| Mảng lăn 1D | O(m·n) | O(n) |
| Tổ hợp (không vật cản) | O(min(m, n)) | O(1) |

**Mảng lăn 1D:** vì hàng `r` chỉ cần hàng `r − 1`, giữ một mảng `row` độ dài `n`; với mỗi ô: nếu vật cản thì `row[c] = 0`, ngược lại `row[c] += row[c − 1]` (`row[c]` cũ chính là "ô trên", `row[c−1]` vừa cập nhật là "ô trái").

**Công thức tổ hợp (LeetCode 62, không vật cản):** mọi đường đều gồm đúng `m − 1` bước xuống và `n − 1` bước phải, tổng `m + n − 2` bước; chỉ cần chọn vị trí các bước xuống ⇒ `C(m + n − 2, m − 1)`. Ví dụ 3 × 7 ⇒ `C(8, 2) = 28`. Có vật cản thì công thức này không còn áp dụng trực tiếp (phải dùng bao hàm–loại trừ, phức tạp hơn DP nhiều).

## Tradeoff

- **Bảng 2D vs mảng 1D:** 2D dễ debug và truy vết đường đi; 1D tiết kiệm bộ nhớ nhưng mất thông tin các hàng trước.
- **DP vs tổ hợp:** tổ hợp nhanh nhất nhưng chỉ dùng được khi không có vật cản; cần cẩn thận tràn số khi tính giai thừa – nhân/chia xen kẽ.
- **Top-down memo vs bottom-up:** memo tự nhiên khi suy nghĩ, nhưng đệ quy sâu `m + n` tầng và tốn overhead hàm; bottom-up không lo stack overflow.

## Lợi / Hại

**Lợi:** công thức chuyển trạng thái rất trực quan, là "bài nhập môn" chuẩn của DP lưới; mở rộng dễ sang chi phí, vật cản, số bước đi khác.

**Hại:** số đường tăng rất nhanh (lưới 17 × 17 đã vượt `2^31`) – cần `BigInt` hoặc modulo khi lưới lớn; chỉ đúng khi hướng đi tạo thành DAG (chỉ phải/xuống). Nếu được đi 4 hướng, bài toán thành đếm đường đơn trên đồ thị – NP-khó nói chung.

## Use case thực tế

- **Đếm tuyến đường trên lưới phố Manhattan** có đoạn đường bị chặn (logistics, robot kho hàng).
- **Mạch số / lưới chip:** đếm đường dẫn tín hiệu không đi qua vùng hỏng.
- **Xác suất:** số đường chia tổng số đường cho xác suất random walk đơn điệu tới đích.
- **Nền tảng cho Minimum Path Sum, Dungeon Game, Cherry Pickup.**

## Lỗi thường gặp

- Khởi tạo cả hàng 0 và cột 0 bằng 1 như bài 62, quên rằng sau một vật cản thì các ô phía sau trên cùng hàng/cột phải là 0.
- Quên trường hợp ô xuất phát hoặc ô đích là vật cản ⇒ kết quả phải là 0.
- Truy cập `dp[r−1]` khi `r = 0` (out of bounds) – luôn kiểm tra biên.
- Dùng mảng 1D nhưng quên đặt `row[c] = 0` tại vật cản (giá trị cũ của hàng trên còn sót lại).
- Tính `C(m+n−2, m−1)` bằng giai thừa đầy đủ ⇒ tràn số.

## Biến thể

- **LeetCode 62:** không vật cản – DP hoặc tổ hợp.
- **LeetCode 64 – Minimum Path Sum:** thay `+` bằng `min` cộng chi phí ô.
- **LeetCode 980 – Unique Paths III:** đi 4 hướng, phải qua mọi ô trống ⇒ backtracking.
- **LeetCode 174 – Dungeon Game:** DP ngược từ đích.
- **Đếm đường modulo 10⁹+7** trên lưới lớn, hoặc thêm bước đi chéo (Delannoy numbers).
