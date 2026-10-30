## Đề bài

Cho hai chuỗi `text1` và `text2`, trả về **độ dài** của dãy con chung dài nhất (LCS). Dãy con giữ nguyên thứ tự tương đối nhưng **không cần liên tiếp**; nếu không có ký tự chung, trả `0`.

```
text1 = "abcde",  text2 = "ace"     →  3   ("ace")
text1 = "abc",    text2 = "abc"     →  3
text1 = "abc",    text2 = "def"     →  0
text1 = "AGGTAB", text2 = "GXTXAY"  →  3   ("GTA")
```

Đây là bài **DP hai chuỗi** gốc: trạng thái là cặp tiền tố `(i, j)`, và mọi bài như Edit Distance, Delete Operation (LC 583), Uncrossed Lines (LC 1035) đều là biến thể. Người phỏng vấn muốn thấy bạn đi từ đệ quy → memo → bảng → tối ưu bộ nhớ, và hiểu cái giá của việc bỏ bảng.

## Ràng buộc

- `1 ≤ text1.length, text2.length ≤ 1000`, chỉ chữ thường tiếng Anh (LeetCode 1143).
- Trên trang này: mỗi chuỗi tối đa 6 ký tự để cây đệ quy hàm mũ còn xem được trong tab Debug.

## Câu hỏi nên hỏi lại

- Chỉ cần **độ dài** hay cần **in ra chuỗi LCS**? (Quyết định có được bỏ bảng 2-D hay không.)
- Dãy con hay **xâu con liên tiếp** (Longest Common Substring – công thức khác: không khớp thì reset 0)?
- Có ràng buộc bộ nhớ không – chuỗi có thể dài tới 10⁵ (diff file)?
