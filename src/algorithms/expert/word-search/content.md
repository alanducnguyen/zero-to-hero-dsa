## Bài toán

Cho lưới ký tự `board` kích thước m × n và một chuỗi `word`. Hỏi `word` có thể được ghép từ các ô **kề cạnh** (lên, xuống, trái, phải – không tính chéo) hay không, với điều kiện **mỗi ô chỉ được dùng tối đa một lần** trong cùng một đường đi.

Ví dụ với lưới `ABCE / SFCS / ADEE`: `"ABCCED"` → `true`, `"SEE"` → `true`, `"ABCB"` → `false` (muốn quay lại chữ `B` thì phải dùng lại ô đã đi qua).

## Ý tưởng / Trực giác

Đây là bài tìm **một đường đi đơn** (simple path) trong đồ thị lưới thoả mãn chuỗi nhãn. Không có cấu trúc tối ưu con nào để DP – trạng thái "những ô đã dùng" phụ thuộc toàn bộ đường đi – nên cách tự nhiên nhất là **thử – sai – quay lui**:

- Chọn một ô làm điểm xuất phát. Nếu ký tự khớp `word[0]`, đứng ở đó và thử đi tiếp sang 4 hàng xóm để khớp `word[1]`, cứ thế đi sâu.
- Nếu một nhánh tắc (sai ký tự, ra ngoài lưới, đụng ô đã dùng), **quay lui** về ô trước và thử hướng khác.
- Để biết "ô đã dùng trên đường đi hiện tại", thay vì cấp phát mảng `visited`, ta **ghi đè ô bằng `'#'`** rồi **khôi phục** khi rời khỏi nó. Đây là điểm mấu chốt: đánh dấu chỉ có hiệu lực cho đường đi đang xét, không phải toàn cục như flood fill.

Khác biệt quan trọng với Number of Islands: ở đó một ô đã thăm thì thăm vĩnh viễn; ở đây một ô có thể bị dùng bởi nhiều đường đi khác nhau, nên **bắt buộc phải gỡ dấu** khi quay lui.

## Thuật toán từng bước

1. Chép `board` thành lưới ký tự có thể sửa. Nếu `word` rỗng ⇒ `true`.
2. Với mỗi ô `(r, c)`: gọi `dfs(r, c, 0)`; nếu `true` thì trả về `true` ngay.
3. `dfs(r, c, i)` – "ô (r,c) có thể là ký tự thứ i của word không, và phần còn lại có ghép tiếp được không?":
   - Nếu `i === word.length` ⇒ đã khớp hết ⇒ `true`.
   - Nếu `(r, c)` ngoài lưới ⇒ `false`.
   - Nếu `grid[r][c] !== word[i]` ⇒ `false` (bao gồm cả trường hợp ô đang là `'#'`).
   - Lưu ký tự, ghi `'#'`, đệ quy 4 hướng với `i + 1`, nối bằng `||` để **dừng sớm** khi một hướng thành công.
   - Khôi phục ký tự, trả kết quả.
4. Hết mọi điểm xuất phát ⇒ `false`.

## Chứng minh đúng

**Bất biến:** khi đang ở trong `dfs(r, c, i)` sau bước đánh dấu, các ô mang `'#'` chính xác là các ô trên đường đi hiện tại `word[0..i]`, theo đúng thứ tự gọi đệ quy. Bất biến giữ vì mỗi lần đánh dấu luôn đi cặp với một lần khôi phục trước khi hàm trả về (cấu trúc LIFO của call stack).

- **Sound (trả `true` thì đúng):** `true` chỉ xuất phát từ `i === word.length`, lúc đó chuỗi các ô trên call stack kề nhau từng cặp, khớp từng ký tự và đôi một phân biệt (một ô `'#'` không bao giờ khớp chữ cái) ⇒ là một đường đi hợp lệ.
- **Complete (có đường đi thì tìm ra):** giả sử tồn tại đường đi `p0, p1, …, pL-1`. Vòng ngoài sẽ thử `p0`. Bằng quy nạp theo i: nếu đang ở `p_i` với các ô `p0..p_i` đã đánh dấu, thì `p_{i+1}` là một trong 4 hàng xóm, chưa bị đánh dấu (đường đi đơn) và khớp ký tự ⇒ DFS sẽ đi vào nó, trừ khi một hướng trước đó đã trả `true` sớm hơn. Vì DFS liệt kê mọi đường đi đơn khớp tiền tố, không đường hợp lệ nào bị bỏ sót.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Tốt nhất | O(m·n) – mọi ô sai ngay ký tự đầu | O(1) đệ quy |
| Trung bình/thực tế | nhỏ hơn nhiều nhờ cắt nhánh sớm | O(L) |
| Xấu nhất | O(m·n·3^L) | O(L) call stack |

Mỗi điểm xuất phát mở tối đa 4 nhánh ở bước đầu, sau đó tối đa **3** (không quay về ô vừa đến vì nó đang là `'#'`), độ sâu L = `word.length`. Bộ nhớ chỉ là độ sâu đệ quy vì đánh dấu tại chỗ – không có mảng `visited` O(m·n).

## Tradeoff

- **Đánh dấu tại chỗ vs mảng `visited`:** tại chỗ tiết kiệm O(m·n) bộ nhớ và thân thiện cache, nhưng **tạm thời làm bẩn input**; không an toàn nếu nhiều luồng đọc chung lưới. Mảng `visited` (hoặc bitmask khi lưới nhỏ) sạch hơn nhưng tốn bộ nhớ.
- **Đệ quy vs stack tường minh:** đệ quy dễ viết, độ sâu chỉ L (thường nhỏ) nên ít rủi ro tràn stack – khác với flood fill có độ sâu m·n.
- **Một từ vs nhiều từ:** với một từ, backtracking thuần là đủ. Với hàng nghìn từ (LC 212) phải gộp từ vào **Trie** để mọi từ chia sẻ cùng một lần DFS.

## Lợi/Hại

**Lợi:** code ngắn, bộ nhớ O(L), dễ thêm cắt nhánh; là khuôn mẫu chuẩn "chọn – đệ quy – bỏ chọn" áp dụng cho mọi bài backtracking.

**Hại:** độ phức tạp hàm mũ theo L; với lưới toàn chữ `A` và word `AAAA…B` thời gian bùng nổ. Sửa input tạm thời có thể gây bug khó thấy nếu quên khôi phục ở một nhánh `return` sớm.

## Use case thực tế

- Trò chơi giải ô chữ: Boggle, Word Hunt, Wordament – sinh và kiểm tra từ trên lưới chữ.
- Tìm đường đi đơn có ràng buộc trên bản đồ ô (robot không đi lại ô cũ, mê cung có khoá theo thứ tự).
- Nhận diện mẫu (pattern) theo chuỗi trên ảnh nhị phân hoặc lưới cảm biến.
- Là khối nền của bộ giải Sudoku/N-Queens: cùng nhịp đánh dấu – thử – gỡ dấu.

## Lỗi thường gặp

- **Quên khôi phục ô** (hoặc `return true` trước khi khôi phục) ⇒ lần gọi từ điểm xuất phát sau thấy ô vẫn là `'#'` và trả sai `false`.
- **Dùng `visited` toàn cục không gỡ** như flood fill ⇒ chặn mất đường đi hợp lệ khác.
- Kiểm tra biên **sau** khi đọc `grid[r][c]` ⇒ truy cập ngoài mảng.
- Kiểm tra `i === word.length` **sau** kiểm tra biên ⇒ trả sai khi ký tự cuối nằm ở mép lưới (bước kế tiếp ra ngoài).
- Đi chéo, hoặc cho phép quay về ô vừa đi.

## Biến thể

- **Word Search II (LC 212):** nhiều từ ⇒ Trie + DFS, xoá lá Trie khi đã tìm thấy để cắt nhánh.
- **Cắt nhánh đếm tần suất:** nếu số lần xuất hiện của một ký tự trong word lớn hơn trong lưới ⇒ `false` ngay; đảo ngược word nếu ký tự cuối hiếm hơn ký tự đầu để giảm số điểm xuất phát.
- **Path with Maximum Gold (LC 1219):** cùng khung backtracking nhưng tối đa hoá tổng thay vì khớp chuỗi.
- **Cho phép đi chéo / 8 hướng:** chỉ đổi danh sách hướng; nhánh tối đa thành 7^L.
