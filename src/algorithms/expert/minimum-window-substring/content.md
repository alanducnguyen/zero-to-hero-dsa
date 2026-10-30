## Bài toán

Cho hai chuỗi `s` (dài m) và `t` (dài n). Tìm **substring liên tiếp ngắn nhất** của `s` chứa mọi ký tự của `t`, **tính cả số lần lặp** (t = `"AAB"` thì cửa sổ phải có ít nhất hai `A` và một `B`). Không tồn tại thì trả `""`. Đây là LeetCode 76 (Hard) – bài "trùm cuối" của sliding window, rất hay gặp ở Meta, Google, Amazon.

Ví dụ: `s = "ADOBECODEBANC"`, `t = "ABC"` ⇒ `"BANC"`.

## Ý tưởng / Trực giác

Brute force: xét mọi cặp `(i, j)` – O(m²) cửa sổ, mỗi cửa sổ kiểm tra O(k) ⇒ quá chậm.

Quan sát then chốt là **tính đơn điệu**: nếu cửa sổ `[l, r]` đã chứa đủ `t` thì mọi cửa sổ rộng hơn `[l, r']` (r' > r) cũng chứa đủ. Ngược lại, nếu `[l, r]` thiếu thì mọi cửa sổ con của nó cũng thiếu. Vì vậy:

- **Giãn phải** cho tới khi cửa sổ vừa hợp lệ.
- **Co trái** chừng nào còn hợp lệ – mỗi lần co là một ứng viên ngắn hơn.
- Khi co làm mất hợp lệ, quay lại giãn phải.

Với mỗi `right`, `left` cuối cùng là vị trí xa nhất mà cửa sổ còn hợp lệ ⇒ ta đã xét cửa sổ ngắn nhất kết thúc tại `right`. Duyệt hết `right` ⇒ có đáp án toàn cục.

Mẹo thứ hai là **need/have**: thay vì so sánh hai bảng tần suất (O(k) mỗi bước), giữ `need[c]` = số ký tự `c` còn thiếu và `have` = số ký tự khác nhau đã đủ. Cửa sổ hợp lệ ⇔ `have === required`, kiểm tra O(1).

## Thuật toán từng bước

1. Nếu `t` rỗng hoặc `s` ngắn hơn `t` ⇒ trả `""`.
2. Đếm tần suất `t` vào `need`; `required = need.size`; `have = 0`, `left = 0`, `bestLen = ∞`.
3. Với mỗi `right` từ 0 tới m−1, gọi `ch = s[right]`:
   - Nếu `ch` thuộc `t`: `need[ch]--`; nếu `need[ch]` vừa **chạm đúng 0** ⇒ `have++`.
4. Trong khi `have === required`:
   - Nếu `right − left + 1 < bestLen` ⇒ lưu `bestStart = left`, `bestLen`.
   - Bỏ `out = s[left]`: nếu thuộc `t` thì `need[out]++`; nếu `need[out]` thành **dương** ⇒ `have--` (cửa sổ vừa thiếu).
   - `left++`.
5. Trả `s.slice(bestStart, bestStart + bestLen)` hoặc `""` nếu `bestLen` vẫn là ∞.

## Chứng minh đúng

**Bất biến:** sau bước 3, `need[c] = cnt_t(c) − cnt_window(c)` và `have` = số `c` có `need[c] ≤ 0`. Bất biến giữ vì `have` chỉ đổi đúng khi `need[c]` đi qua ranh giới 0 (từ 1 xuống 0 khi thêm, từ 0 lên 1 khi bỏ). Ký tự dư làm `need` âm nhưng không làm `have` tăng lần nữa.

**Không bỏ sót:** giả sử đáp án tối ưu là `[L, R]`. Khi `right = R`, nếu `left ≤ L` thì cửa sổ `[left, R]` ⊇ `[L, R]` nên hợp lệ ⇒ vòng while co tiếp tới ít nhất `L` và ghi nhận độ dài `R − L + 1`. `left` không thể đã vượt `L` trước đó: để `left` vượt `L` thì phải có `right' < R` với `[L, right']` hợp lệ – ngắn hơn đáp án, mâu thuẫn.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Brute force | O(m² · k) | O(k) |
| Sliding window need/have | **O(m + n)** | O(k) |
| Bản lọc trước (filtered s) | O(m + n), nhanh hơn khi t nhỏ | O(m) |

Mỗi chỉ số được `right` thêm vào đúng 1 lần và `left` bỏ ra tối đa 1 lần ⇒ tổng 2m thao tác O(1). `k` là số ký tự khác nhau (≤ 52 với chữ cái, ≤ 128 với ASCII).

## Tradeoff

- **Map vs mảng 128:** mảng `Int32Array(128)` nhanh hơn rõ rệt (không hash), nhưng chỉ đúng với ASCII; Map tổng quát cho Unicode.
- **need/have vs so sánh bảng:** need/have phải cập nhật cẩn thận ở ranh giới 0 nhưng đổi lại O(1) mỗi bước.
- **Lọc trước:** tạo danh sách `(index, char)` chỉ gồm ký tự thuộc `t`, chạy cửa sổ trên đó. Có lợi khi `s` rất dài mà ít ký tự thuộc `t`, tốn thêm O(m) bộ nhớ.

## Lợi / Hại

**Lợi**
- Tuyến tính, một lượt, chạy online được trên stream (nếu chỉ cần độ dài).
- Template "giãn phải – co trái" tái sử dụng cho hàng chục bài.

**Hại**
- Dễ sai off-by-one và điều kiện `have` (đặc biệt khi `t` có ký tự lặp).
- Chỉ áp dụng khi điều kiện đơn điệu; với ràng buộc kiểu "đúng bằng k" phải biến đổi (atMost(k) − atMost(k−1)).

## Use case thực tế

- **Tìm kiếm văn bản:** đoạn trích ngắn nhất chứa mọi từ khoá truy vấn (snippet generation của search engine).
- **Bioinformatics:** đoạn DNA ngắn nhất chứa đủ một tập motif/base với số lượng yêu cầu.
- **Log analysis:** khoảng thời gian ngắn nhất mà mọi loại sự kiện cần thiết đều xảy ra (ví dụ đủ các bước của một giao dịch).
- **Giám sát mạng:** cửa sổ gói tin nhỏ nhất chứa đủ chữ ký tấn công.

## Lỗi thường gặp

- Tăng `have` mỗi khi gặp ký tự thuộc `t` thay vì chỉ khi `need` **chạm đúng 0** ⇒ đếm trùng khi `t` có ký tự lặp.
- Giảm `have` mỗi khi bỏ ký tự thuộc `t` thay vì chỉ khi `need` **vượt lên dương** ⇒ co quá sớm, bỏ lỡ đáp án.
- Dùng `if` thay vì `while` để co ⇒ cửa sổ không ngắn nhất.
- Cập nhật best **sau** khi đã bỏ `s[left]` ⇒ ghi nhận cửa sổ không hợp lệ.
- Lưu cả substring mỗi lần cập nhật ⇒ O(m²) do copy chuỗi; chỉ lưu `bestStart`, `bestLen`.

## Biến thể

- **567 Permutation in String / 438 Find All Anagrams:** cửa sổ **cố định** dài |t|, cùng bộ đếm need/have.
- **30 Substring with Concatenation of All Words:** need đếm theo từ, trượt theo bước bằng độ dài từ.
- **727 Minimum Window Subsequence:** yêu cầu đúng thứ tự ⇒ không còn đơn điệu kiểu tập hợp, dùng DP hoặc hai con trỏ quét xuôi-ngược.
- **Smallest range covering K lists (632):** gộp các list thành mảng `(value, listId)` đã sắp xếp rồi chạy chính template này với "need" = mọi listId.
