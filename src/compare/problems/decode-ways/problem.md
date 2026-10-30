## Đề bài

Chữ cái được mã hoá thành số: `'A' → "1"`, `'B' → "2"`, …, `'Z' → "26"`. Cho chuỗi chữ số `s`, đếm số cách **giải mã** `s` thành chuỗi chữ cái (mỗi nhóm 1 hoặc 2 chữ số phải ứng với một chữ cái).

```
s = "12"    →  2   ("AB" = 1|2, "L" = 12)
s = "226"   →  3   (2|2|6, 22|6, 2|26)
s = "2263"  →  3   (63 > 26 nên '3' luôn đứng một mình)
s = "06"    →  0   ("06" không phải "6")
s = "2101"  →  1   (2|10|1 – '0' bắt buộc ghép với '1' phía trước)
```

## Những cái bẫy số 0

- `'0'` **không bao giờ đứng một mình** – không có chữ cái nào mã là 0.
- Cặp hợp lệ phải nằm trong **[10, 26]**: `"05"` không phải 5, `"30"` vượt 26.
- `'0'` chỉ sống được khi đi sau `'1'` hoặc `'2'`; `"100"`, `"1001"`, `"30"` đều cho 0.
- Một khi `dp[i] = 0` thì cả chuỗi vô nghiệm – nhưng code đúng vẫn tự xử lý mà không cần nhánh đặc biệt.

## Ràng buộc

- `1 ≤ s.length ≤ 100`, `s` chỉ gồm chữ số, có thể có số 0 đứng đầu (LeetCode 91). Đáp án vừa int 32 bit.
- Trong trang này giới hạn 12 chữ số để cây đệ quy thuần (O(2ⁿ)) không vượt giới hạn frame.
