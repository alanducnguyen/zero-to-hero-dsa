## Cách trình bày trong phỏng vấn

1. Hỏi làm rõ: chuỗi chỉ gồm ngoặc? Chuỗi rỗng có hợp lệ không (thường là có)?
2. Nêu ý tưởng: "Ngoặc đóng phải khớp với ngoặc mở gần nhất chưa đóng – đó là LIFO nên tôi dùng stack."
3. Viết code 10 dòng với map `pair`, nhấn mạnh 3 điểm kiểm tra: stack rỗng khi đóng, sai loại, stack không rỗng khi kết thúc.
4. Chạy tay: `()[]{}` (đúng), `([)]` (sai loại), `(` (còn dư).
5. O(n) thời gian, O(n) bộ nhớ, nêu tối ưu độ dài lẻ.

Bài này thường chỉ mất 5–10 phút; người phỏng vấn dùng nó để **chuyển sang follow-up** khó hơn – hãy chuẩn bị sẵn.

## Câu hỏi follow-up thường gặp

- **Chỉ có một loại ngoặc, làm O(1) bộ nhớ?** Bộ đếm `balance`: +1 khi mở, −1 khi đóng; nếu âm ⇒ sai; cuối cùng phải bằng 0.
- **Chuỗi có thêm ký tự khác (chữ, số)?** Bỏ qua ký tự không phải ngoặc. Nếu có ngoặc trong string literal `"("`, cần tokenize trước.
- **Trả về vị trí lỗi đầu tiên?** Stack lưu `{ch, index}`; khi phát hiện lỗi trả về index hiện tại; nếu còn dư, trả index của phần tử đáy stack.
- **Số ngoặc tối thiểu cần thêm để hợp lệ (LeetCode 921)?** Hai bộ đếm: `open` (mở chưa khớp) và `need` (đóng thiếu mở). Kết quả `open + need`.
- **Chuỗi dài hàng GB, stream?** Vẫn O(n) một lần duyệt, nhưng stack có thể lớn; nếu một loại ngoặc dùng bộ đếm.
- **Dùng đệ quy được không?** Được nhưng dễ tràn stack với chuỗi dài; stack tường minh an toàn hơn.
- **Sinh tất cả chuỗi ngoặc hợp lệ độ dài 2n?** Backtracking với điều kiện `open < n` và `close < open`. Số kết quả = Catalan(n).

## Checklist nhận diện pattern

- "Khớp cặp", "lồng nhau", "mở – đóng", "gần nhất" ⇒ Stack.
- Cần xử lý phần tử theo thứ tự ngược với lúc gặp ⇒ Stack.
- Cần "tìm phần tử gần nhất bên trái/phải thoả điều kiện" ⇒ Monotonic Stack (xem bài cấp Siêu cấp).

## Bài luyện tập liên quan

- 20 Valid Parentheses → 1021 Remove Outermost Parentheses → 921 Minimum Add to Make Parentheses Valid.
- 150 Evaluate RPN, 224 Basic Calculator (stack cho biểu thức).
- 22 Generate Parentheses (backtracking), 32 Longest Valid Parentheses (Hard).
- 394 Decode String, 71 Simplify Path (stack cho xử lý chuỗi).
