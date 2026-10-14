## Đề bài

Cho chuỗi `s`, tìm **chuỗi con liên tiếp dài nhất là palindrome** (đọc xuôi ngược như nhau). Nếu có nhiều đáp án cùng độ dài, trả về bất kỳ.

```
s = "babad"  →  "bab" (hoặc "aba")
s = "cbbd"   →  "bb"
s = "a"      →  "a"
```

## Ràng buộc

- `1 ≤ n ≤ 1000`, chỉ chữ cái và chữ số.
- n ≤ 1000 là gợi ý: O(n²) chạy thoải mái, O(n³) có thể TLE.

## Câu hỏi nên hỏi lại

- Substring (liên tiếp) hay subsequence? (Subsequence là bài DP khác – LCS với chuỗi đảo.)
- Phân biệt hoa/thường? Bỏ qua ký tự không phải chữ?
- Cần tất cả đáp án hay một?
- Có yêu cầu O(n) không? (Manacher – hiếm khi được yêu cầu code.)
