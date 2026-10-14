## Bài toán

Cho mảng `nums`. Hỗ trợ hai thao tác xen kẽ, mỗi thao tác phải nhanh hơn O(n):
- `add(i, delta)`: cộng `delta` vào `nums[i]`.
- `rangeSum(l, r)`: tổng `nums[l..r]`.

Prefix sum trả lời truy vấn O(1) nhưng cập nhật O(n). Segment Tree làm cả hai O(log n) nhưng code dài. **Fenwick Tree** (Binary Indexed Tree, Peter Fenwick 1994) cũng O(log n) cho cả hai, chỉ với **một mảng và hai vòng `for`**.

## Ý tưởng / Trực giác

Đánh chỉ số 1-based. Gọi `lowbit(i) = i & -i` là bit 1 thấp nhất của `i` (`6 = 110₂ ⇒ lowbit = 2`). Quy ước:

`tree[i]` = tổng đoạn `(i − lowbit(i), i]`, tức `lowbit(i)` phần tử kết thúc tại `i`.

- `i` lẻ ⇒ phủ 1 phần tử. `i = 4, 8` ⇒ phủ 4, 8 phần tử. Mỗi tiền tố `[1..i]` được ghép từ ≤ log n đoạn rời nhau: `i = 13 = 1101₂` ⇒ `tree[13] + tree[12] + tree[8]` (mỗi bước xoá bit thấp nhất).
- Khi `nums[i]` đổi, chỉ các `tree[j]` có đoạn chứa `i` đổi theo; từ `i` đi lên bằng `j += lowbit(j)` là đi qua đúng các đoạn đó.

Bản chất là phân rã mỗi tiền tố theo biểu diễn nhị phân của độ dài.

## Thuật toán từng bước

1. `tree` kích thước `n + 1`, toàn 0. Build bằng `add(i, nums[i])` cho mỗi i (O(n log n); có cách O(n)).
2. `add(idx, delta)`: `i = idx + 1`; lặp `tree[i] += delta; i += i & -i` khi `i ≤ n`.
3. `prefixSum(idx)`: `i = idx + 1; sum = 0`; lặp `sum += tree[i]; i -= i & -i` khi `i > 0`.
4. `rangeSum(l, r) = prefixSum(r) − prefixSum(l − 1)`.

Ở tab **Debug**, ô đỏ trên `tree` là node đang cập nhật, dải cyan trên `nums` là đoạn mà node đó phủ; khi truy vấn, các ô xanh lá là những đoạn đã gom. Biến `bin(i)` cho thấy bit nào bị xoá/thêm ở mỗi bước.

## Chứng minh đúng

**Truy vấn:** đặt `i₀ = idx + 1`, `i₁ = i₀ − lowbit(i₀)`, … cho đến 0. Đoạn của `tree[i_k]` là `(i_{k+1}, i_k]`, nên các đoạn nối tiếp nhau và phủ đúng `(0, i₀]` không chồng lấn ⇒ tổng của chúng là tổng tiền tố. Mỗi bước xoá một bit 1 ⇒ ≤ ⌊log₂ n⌋ + 1 bước.

**Cập nhật:** cần chứng minh `j` chứa `idx + 1` trong đoạn `(j − lowbit(j), j]` ⟺ `j` nằm trên dãy `i, i + lowbit(i), …`. Cả hai mệnh đề tương đương với "`j ≥ i` và `j` thu được từ `i` bằng cách cộng dồn các lowbit", chứng minh bằng quy nạp trên bit. Mỗi bước thêm lowbit làm bit thấp nhất dịch lên ⇒ ≤ log n bước.

## Độ phức tạp

| Thao tác | Fenwick | Segment Tree | Prefix sum | Mảng thường |
|---|---|---|---|---|
| Cập nhật điểm | O(log n) | O(log n) | O(n) | O(1) |
| Tổng đoạn | O(log n) | O(log n) | O(1) | O(n) |
| Bộ nhớ | n + 1 | 2n – 4n | n + 1 | n |
| Build | O(n log n) / O(n) | O(n) | O(n) | – |

## Tradeoff

- Fenwick nhỏ gọn, cache-friendly, nhanh hơn Segment Tree về hằng số (2–3×).
- Chỉ dùng cho phép toán **có nghịch đảo** (cộng, XOR, đếm): `rangeSum` cần phép trừ. Min/max cần Segment Tree (hoặc Fenwick đặc biệt chỉ cập nhật tăng).
- Không hỗ trợ lazy propagation tự nhiên; cập nhật đoạn + truy vấn đoạn cần 2 BIT, vẫn khó mở rộng hơn Segment Tree.

## Lợi / Hại

**Lợi:** 15 dòng code, khó sai, mở rộng 2D dễ (`tree[i][j]`), rất hợp để đếm nghịch thế / "số phần tử nhỏ hơn bên phải" sau nén toạ độ. **Hại:** 1-indexed dễ lệch; ý nghĩa `tree[i]` không trực quan như Segment Tree; giới hạn loại phép toán.

## Use case thực tế

- Đếm số phần tử nhỏ hơn x đã xuất hiện (rank query) trong xử lý dòng dữ liệu: leaderboard, order book.
- Đếm nghịch thế / Kendall tau, "Count of Smaller Numbers After Self".
- Thống kê thời gian thực theo bucket (số request mỗi giây, tổng trong cửa sổ bất kỳ) với cập nhật liên tục.
- Chọn ngẫu nhiên theo trọng số động (weighted sampling với cập nhật) bằng tìm kiếm nhị phân trên BIT.

## Lỗi thường gặp

- Dùng 0-indexed trực tiếp: `lowbit(0) = 0` ⇒ vòng lặp vô hạn. Luôn `i = idx + 1`.
- `rangeSum(l, r)` quên trường hợp `l = 0` (gọi `prefixSum(-1)`).
- Build bằng cách gán `tree[i] = nums[i-1]` rồi quên gộp lên cha.
- Dùng cho min/max rồi trừ hai tiền tố – vô nghĩa.
- Tràn số với tổng lớn – dùng `BigInt` hoặc modulo.

## Biến thể

- **Build O(n):** `tree[i] = nums[i-1]`, rồi với mỗi `i`, `j = i + lowbit(i) ≤ n ⇒ tree[j] += tree[i]`.
- **Cập nhật đoạn, truy vấn điểm:** BIT trên mảng sai phân.
- **Cập nhật đoạn, truy vấn đoạn:** hai BIT (`B1`, `B2`) theo công thức `sum(i) = i·B1(i) − B2(i)`.
- **Tìm k-th nhỏ nhất:** nhị phân theo bit từ cao xuống trên BIT đếm, O(log n).
- **BIT 2D:** `O(log² n)` cho tổng hình chữ nhật.
