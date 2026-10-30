## Đề bài

Bạn leo cầu thang có `n` bậc. Mỗi lần được bước **1 bậc hoặc 2 bậc**. Có bao nhiêu cách **khác nhau** để lên tới đỉnh?

```
n = 2  →  2   (1+1, 2)
n = 3  →  3   (1+1+1, 1+2, 2+1)
n = 5  →  8
```

Nhìn vào **bước cuối cùng**: muốn đứng ở bậc `n`, bước trước đó bạn đứng ở bậc `n−1` (rồi bước 1) hoặc bậc `n−2` (rồi bước 2). Hai nhóm này rời nhau và phủ hết mọi cách ⇒ `ways(n) = ways(n−1) + ways(n−2)`, với `ways(1) = 1`, `ways(2) = 2`. Đây chính là dãy Fibonacci lệch một chỉ số: `ways(n) = F(n+1)`.

## Ràng buộc

- `1 ≤ n ≤ 45` (LeetCode 70) – đáp án vừa trong số nguyên 32 bit.
- Trong trang này giới hạn `n ≤ 15` để cây đệ quy thuần còn hiển thị được.

## Câu hỏi nên hỏi lại

- Tập bước có cố định {1, 2} không, hay là một mảng `steps` tuỳ ý? (Tổng quát ⇒ DP O(n·k).)
- n lớn tới đâu? Có lấy modulo không? (n = 10⁹ ⇒ cần O(log n).)
- Thứ tự bước có quan trọng không? (1+2 và 2+1 tính là 2 cách – khác với bài đếm tổ hợp Coin Change II.)
