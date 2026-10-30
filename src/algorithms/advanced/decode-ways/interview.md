## Cách trình bày trong phỏng vấn

1. Hỏi rõ: chuỗi rỗng trả gì? Có ký tự khác chữ số không? Kết quả có cần modulo?
2. Đưa ví dụ `"226"` và liệt kê 3 cách để chứng tỏ hiểu đề, rồi đưa `"06"` để nêu bẫy số 0.
3. Định nghĩa trạng thái bằng lời: "`dp[i]` là số cách giải mã `i` ký tự đầu".
4. Suy công thức từ **chữ cái cuối dùng 1 hay 2 ký tự**, nhấn mạnh hai trường hợp rời nhau nên được cộng.
5. Viết bottom-up, rồi chủ động rút về O(1):

```ts
function numDecodings(s: string): number {
  let prev2 = 0, prev1 = 1; // dp[i-2], dp[i-1] (dp[0] = 1)
  for (let i = 1; i <= s.length; i++) {
    let cur = s[i - 1] !== '0' ? prev1 : 0;
    const two = i >= 2 ? Number(s.slice(i - 2, i)) : 0;
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return s.length ? prev1 : 0;
}
```

6. Test nhanh: `"10"` → 1, `"27"` → 1, `"100"` → 0, `"111"` → 3.

## Câu hỏi follow-up thường gặp

- **Có ký tự `'*'` (1–9)?** Mỗi bước: đơn `'*'` cho 9 cách; cặp `"**"` cho 15 (11–19, 21–26); `"1*"` cho 9, `"2*"` cho 6, `"*d"` tuỳ d ≤ 6 hay không. Nhân với dp tương ứng, lấy modulo.
- **Liệt kê tất cả cách giải mã?** Backtracking theo cùng hai nhánh; độ phức tạp tỉ lệ số kết quả.
- **Bảng mã tuỳ ý (ví dụ `[1, k]`)?** `dp[i] = Σ dp[j]` với mọi `j` sao cho `s[j..i)` là số hợp lệ không có số 0 đứng đầu.
- **Tại sao không greedy?** Đây là bài đếm, không phải tối ưu – phải xét mọi cách tách.
- **Top-down có ổn không?** Có, với memo O(n); nhắc rủi ro độ sâu đệ quy khi n lớn.

## Checklist nhận diện pattern

- "Đếm số cách tách/giải mã chuỗi" mà mỗi mảnh có độ dài giới hạn ⇒ DP trên tiền tố, chia theo mảnh cuối.
- Chỉ phụ thuộc 1–2 trạng thái trước ⇒ dạng Fibonacci, tối ưu O(1).
- Có ký tự "vô hiệu khi đứng riêng" (như `'0'`) ⇒ cẩn thận điều kiện ở từng nhánh.

## Bài luyện tập liên quan

- 70 Climbing Stairs → 91 Decode Ways → 639 Decode Ways II.
- 139 Word Break, 140 Word Break II, 1416 Restore The Array.
- 746 Min Cost Climbing Stairs, 198 House Robber.
