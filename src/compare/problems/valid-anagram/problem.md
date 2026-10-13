## Đề bài

Cho hai chuỗi `s` và `t`. Trả về `true` nếu `t` là **anagram** của `s`: cùng các ký tự với cùng số lần xuất hiện, chỉ khác thứ tự.

```
s = "anagram", t = "nagaram"  →  true
s = "rat",     t = "car"      →  false
```

## Ràng buộc

- `1 ≤ n ≤ 5·10⁴`, chỉ gồm chữ thường a–z (đề gốc). Follow-up: Unicode.

## Câu hỏi nên hỏi lại

- Bảng chữ cái cố định (a–z) hay Unicode? (Quyết định mảng 26 hay HashMap.)
- Phân biệt hoa/thường? Có bỏ qua khoảng trắng không?
- Gọi nhiều lần với cùng `s` (vd lọc danh sách từ)? (Tiền tính chữ ký của s.)
