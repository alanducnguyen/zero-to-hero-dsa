## Đề bài

Cho chuỗi `s` chỉ gồm các ký tự `(`, `)`, `[`, `]`, `{`, `}`. Chuỗi **hợp lệ** khi:

1. Mỗi ngoặc mở được đóng bởi ngoặc đóng **cùng loại**.
2. Ngoặc mở được đóng **đúng thứ tự** – ngoặc mở sau phải đóng trước (lồng nhau, không đan chéo).
3. Mỗi ngoặc đóng đều có ngoặc mở tương ứng phía trước.

```
"()"        →  true
"()[]{}"    →  true
"{[()]}"    →  true
"(]"        →  false   (sai loại)
"([)]"      →  false   (đan chéo – đủ số lượng nhưng sai thứ tự)
"(("        →  false   (mở thừa)
```

Trên trang này chuỗi rỗng được coi là hợp lệ.

## Ràng buộc

- `1 ≤ s.length ≤ 10⁴` (biến thể thực tế: tới 10⁵–10⁶ ký tự, ví dụ file JSON/HTML lớn).
- Chỉ chứa ba loại ngoặc. Vì có **nhiều loại**, mẹo "đếm số ngoặc mở" (counter) – vốn đúng khi chỉ có `()` – **không** còn đúng: `"([)]"` có bộ đếm từng loại cân bằng nhưng vẫn sai.

## Câu hỏi nên hỏi lại người phỏng vấn

- Chuỗi có ký tự khác ngoài ngoặc không? Bỏ qua hay coi là lỗi?
- Chuỗi rỗng là hợp lệ?
- Chỉ cần true/false hay cần **vị trí** lỗi đầu tiên?
- Độ dài và độ lồng tối đa? (Quyết định đệ quy có an toàn.)
