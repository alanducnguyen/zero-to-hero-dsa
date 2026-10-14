## Đề bài

Dãy Fibonacci: `F(0) = 0`, `F(1) = 1`, `F(n) = F(n−1) + F(n−2)`. Cho `n`, tính `F(n)`.

```
n = 2  →  1
n = 10 →  55
n = 30 →  832040
```

Đây là bài "nhập môn DP" được dùng để kiểm tra bạn có thấy **overlapping subproblems** và biết các mức tối ưu: hàm mũ → tuyến tính → hằng số bộ nhớ → logarit.

## Ràng buộc

- `0 ≤ n ≤ 30` (LeetCode 509). Follow-up: n = 10⁹ với modulo; n = 10⁵ với BigInt.

## Câu hỏi nên hỏi lại

- n lớn đến đâu? Có cần modulo không? (Quyết định O(n) hay O(log n).)
- Gọi một lần hay nhiều lần với n khác nhau? (Memo giữ giữa các lần gọi.)
- Kết quả có vượt 2⁵³ không? (n ≥ 79 cần BigInt.)
