## Đề bài

Cho hai chuỗi `word1` và `word2`, trả về **số thao tác ít nhất** để biến `word1` thành `word2`. Mỗi thao tác là một trong ba: **chèn** một ký tự, **xoá** một ký tự, **thay** một ký tự. Đây là khoảng cách **Levenshtein**.

```
word1 = "horse",     word2 = "ros"        →  3   (horse → rorse → rose → ros)
word1 = "intention", word2 = "execution"  →  5
word1 = "flaw",      word2 = "lawn"       →  2   (xoá f, chèn n)
word1 = "",          word2 = "abc"        →  3
```

Đây là bài DP hai chuỗi kinh điển với **ba** lựa chọn ở mỗi bước (so với hai của LCS). Người phỏng vấn muốn thấy bạn định nghĩa trạng thái `(i, j)` trên tiền tố, giải thích ba ô phụ thuộc (chéo = thay, trên = xoá, trái = chèn), rồi tối ưu bộ nhớ đúng cách.

## Ràng buộc

- `0 ≤ word1.length, word2.length ≤ 500`, chữ thường tiếng Anh (LeetCode 72).
- Trên trang này: mỗi chuỗi tối đa 5 ký tự vì đệ quy thuần phân nhánh 3 bùng nổ rất nhanh.

## Câu hỏi nên hỏi lại

- Chi phí các thao tác có bằng nhau không? (Weighted edit distance chỉ đổi hằng số trong công thức.)
- Có cho phép **đổi chỗ hai ký tự kề nhau** (Damerau–Levenshtein) không?
- Cần con số hay cần **dãy thao tác cụ thể** (alignment)?
