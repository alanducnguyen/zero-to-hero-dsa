## Bài toán

Cho chuỗi `s` chỉ chứa các ký tự `(`, `)`, `[`, `]`, `{`, `}`. Xác định chuỗi có hợp lệ không: mỗi ngoặc mở phải được đóng bởi ngoặc **cùng loại** và **đúng thứ tự** (ngoặc mở sau phải đóng trước).

Đây là bài LeetCode #20 – bài "cửa ngõ" của cấu trúc Stack, xuất hiện trong vòng screening của hầu hết công ty. Nó cũng là nền tảng của parser, compiler, và kiểm tra cú pháp trong mọi IDE bạn dùng.

## Ý tưởng / Trực giác

Hãy tưởng tượng bạn mở các hộp lồng nhau: hộp mở **sau cùng** phải được đóng **đầu tiên**. Đó chính xác là nguyên tắc **LIFO (Last In, First Out)** của Stack.

- Gặp ngoặc mở ⇒ "ghi nhớ" nó bằng cách push vào stack.
- Gặp ngoặc đóng ⇒ nó phải khớp với ngoặc mở gần nhất chưa đóng, tức là đỉnh stack. Pop ra và so sánh.
- Kết thúc chuỗi, stack phải rỗng (không còn ngoặc mở "mồ côi").

Tại sao không chỉ đếm số ngoặc? Vì `([)]` có số lượng cân bằng nhưng sai thứ tự. Stack giữ **thứ tự**, bộ đếm thì không.

## Thuật toán từng bước

1. Tạo map `pair` ánh xạ ngoặc đóng → ngoặc mở tương ứng.
2. Duyệt từng ký tự `ch`:
   - Nếu `ch` là ngoặc mở: push.
   - Nếu là ngoặc đóng: stack rỗng ⇒ trả `false`; pop đỉnh, nếu khác `pair[ch]` ⇒ `false`.
3. Trả về `stack.length === 0`.

Ở tab **Debug**, thử preset "Sai loại" `([)]`: khi gặp `)`, đỉnh stack là `[` ⇒ phát hiện lỗi ngay, dù số lượng ngoặc cân bằng.

## Chứng minh đúng

**Bất biến:** sau khi xử lý `i` ký tự đầu, stack chứa đúng các ngoặc mở trong `s[0..i)` **chưa được khớp**, theo thứ tự xuất hiện (đỉnh = gần nhất).

- Push ngoặc mở giữ bất biến hiển nhiên.
- Ngoặc đóng hợp lệ chỉ có thể khớp với ngoặc mở chưa khớp gần nhất (định nghĩa "đúng thứ tự"), tức đỉnh stack. Nếu đỉnh khác loại hoặc stack rỗng, không tồn tại cách khớp nào ⇒ trả `false` là đúng.
- Kết thúc: stack rỗng ⇔ mọi ngoặc mở đã khớp ⇔ chuỗi hợp lệ.

**Tối ưu nhỏ:** nếu `s.length` lẻ, trả `false` ngay – không thể ghép cặp hết.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | Mỗi ký tự được push/pop tối đa 1 lần |
| Bộ nhớ | O(n) | Xấu nhất chuỗi toàn ngoặc mở `((((` |
| Tốt nhất | O(1) | Ký tự đầu là ngoặc đóng ⇒ dừng ngay |

## Tradeoff

- **Stack ↔ Đếm:** với **một loại** ngoặc duy nhất, chỉ cần bộ đếm O(1) bộ nhớ (tăng khi mở, giảm khi đóng, không bao giờ âm, kết thúc bằng 0). Nhiều loại ngoặc bắt buộc dùng stack.
- **Dừng sớm ↔ Báo cáo đầy đủ:** trả `false` ngay khi gặp lỗi là nhanh nhất; nhưng một linter/compiler cần tiếp tục để báo **tất cả** lỗi và vị trí – khi đó không return sớm mà ghi nhận lỗi vào danh sách.
- **Đệ quy ↔ Stack tường minh:** có thể viết đệ quy (mỗi ngoặc mở gọi đệ quy), nhưng stack tường minh tránh tràn call stack với chuỗi dài.

## Lợi / Hại

**Lợi**
- Tuyến tính, một lần duyệt, code ngắn.
- Mở rộng dễ dàng: thêm loại ngoặc chỉ cần thêm vào `pair`.
- Pattern tổng quát cho mọi bài "khớp cặp theo thứ tự lồng nhau".

**Hại**
- O(n) bộ nhớ phụ – với stream cực dài chỉ một loại ngoặc, dùng bộ đếm tốt hơn.
- Không xử lý được ngữ pháp phức tạp hơn (vd. ngoặc trong chuỗi ký tự `"("`) nếu không có bước tokenize.

## Use case thực tế

- **Compiler / Parser:** kiểm tra cân bằng `{}` `()` trong code, khớp thẻ HTML/XML mở–đóng (stack chứa tên thẻ).
- **IDE & Editor:** highlight ngoặc tương ứng, auto-indent, phát hiện lỗi cú pháp theo thời gian thực.
- **Đánh giá biểu thức:** chuyển trung tố → hậu tố (Shunting-yard), tính toán máy tính bỏ túi (LeetCode 224, 227).
- **Undo/Redo, Back/Forward trình duyệt:** cùng nguyên lý LIFO.
- **JSON/YAML validator:** kiểm tra `{}` và `[]` lồng nhau đúng.

## Lỗi thường gặp

1. Pop khi stack rỗng ⇒ `undefined` và so sánh sai (JS không ném lỗi!). Luôn kiểm tra rỗng trước.
2. Quên kiểm tra stack rỗng ở cuối ⇒ `((` được coi là hợp lệ.
3. So sánh `top === ch` thay vì `top === pair[ch]`.
4. Dùng `s.length % 2` làm điều kiện **đủ** – nó chỉ là điều kiện **cần**.
5. Dùng `Array.shift()` thay vì `pop()` ⇒ biến stack thành queue, sai logic và O(n) mỗi thao tác.

## Biến thể

- **Minimum Add to Make Valid (921):** đếm số ngoặc cần thêm – dùng 2 bộ đếm.
- **Longest Valid Parentheses (32):** stack lưu chỉ số, hoặc DP.
- **Remove Invalid Parentheses (301):** BFS/backtracking, bài Hard.
- **Generate Parentheses (22):** backtracking sinh tất cả chuỗi hợp lệ – số lượng là số Catalan.
- **Khớp thẻ HTML:** stack chứa chuỗi tên thẻ thay vì ký tự.
