## Kịch bản trình bày (4–6 phút)

1. **Làm rõ đề** (30s): ký tự khác ngoặc? chuỗi rỗng? cần vị trí lỗi không?
2. **Nhận xét** (30s): "Ngoặc mở sau cùng phải được đóng đầu tiên – đó là LIFO ⇒ stack." Nếu chưa thấy ngay, nêu cách xoá cặp: "Chuỗi hợp lệ luôn có cặp kề nhau, xoá dần đến rỗng – đúng nhưng O(n²) vì mỗi vòng chỉ bóc một tầng."
3. **Loại counter** (30s): "Một loại ngoặc thì counter đủ, nhưng ba loại thì `([)]` đánh lừa counter ⇒ cần nhớ thứ tự ⇒ stack."
4. **Code stack + map** (2 phút): nêu rõ **ba** điểm trả false – đóng khi stack rỗng, pop sai loại, kết thúc mà stack còn dư.
5. **Phân tích** (30s): O(n) thời gian, O(n) bộ nhớ tệ nhất (toàn ngoặc mở). Tối ưu nhỏ: n lẻ ⇒ false ngay.
6. **Nhắc recursive descent** (30s): "Cũng O(n), stack nằm ở call stack – hay khi cần parse nội dung, nhưng lồng 10⁵ tầng sẽ tràn."

## Follow-up thường gặp

- **Chỉ có `()` và cần O(1) bộ nhớ?** Counter; âm là sai, cuối bằng 0 là đúng.
- **Trả về vị trí lỗi đầu tiên?** Stack lưu *chỉ số* thay vì ký tự; lỗi là `i` hiện tại (đóng thừa/sai loại) hoặc chỉ số đáy stack còn dư (mở thừa).
- **Số ngoặc tối thiểu cần xoá/thêm cho hợp lệ?** (LeetCode 921, 1249) Counter hoặc stack chỉ số, đếm phần dư hai phía.
- **Độ dài chuỗi con hợp lệ dài nhất?** (LeetCode 32) Stack chỉ số với "đáy" sentinel −1, hoặc DP, hoặc hai lượt counter trái→phải, phải→trái.
- **Có `*` thay được `(`, `)` hoặc rỗng?** (LeetCode 678) Greedy giữ khoảng [lo, hi] số ngoặc mở có thể.
- **Sinh mọi chuỗi hợp lệ n cặp?** (LeetCode 22) Backtracking với điều kiện open ≤ n, close ≤ open.
- **Chuỗi có ký tự khác (code, HTML)?** Bỏ qua ký tự không phải ngoặc; với thẻ HTML, stack lưu tên thẻ.

## Lỗi hay gặp khi code

- Quên kiểm tra stack rỗng trước khi pop ⇒ `undefined` so với map và vô tình "khớp" nếu map trả `undefined`.
- Quên kiểm tra `stack.length === 0` ở cuối ⇒ `"(("` bị coi là hợp lệ.
- Dùng ba counter riêng cho ba loại ngoặc ⇒ sai với `"([)]"`.
