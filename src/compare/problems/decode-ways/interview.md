## Kịch bản trình bày (6–8 phút)

1. **Làm rõ đề** (30s): chuỗi rỗng trả gì? có '0' đứng đầu không? chỉ đếm hay liệt kê? Cần modulo không?
2. **Định nghĩa đệ quy** (1 phút): "f(i) = số cách giải mã s[i..]. Nếu s[i] = '0' thì 0; ngược lại f(i+1), cộng f(i+2) nếu s[i..i+1] ≤ 26." Chỉ ra cây có bài con trùng ⇒ O(2ⁿ).
3. **Memo** (30s): thêm cache theo `i` ⇒ O(n) thời gian, O(n) bộ nhớ.
4. **Lật sang bottom-up** (1 phút): dp[i] trên tiền tố, dp[0] = 1, giải thích vì sao là 1.
5. **Tối ưu bộ nhớ** (1 phút): chỉ dùng dp[i−1], dp[i−2] ⇒ hai biến, O(1). Code bản này.
6. **Chạy tay các ca '0'** (1 phút): `"10"` → 1, `"06"` → 0, `"100"` → 0, `"2101"` → 1, `"226"` → 3.

## Follow-up thường gặp

- **Có ký tự `'*'` đại diện 1..9** (LeetCode 639)? Cùng khung, đếm số cặp hợp lệ cho từng tổ hợp, lấy modulo 10⁹+7.
- **Liệt kê mọi chuỗi giải mã?** Backtracking; độ phức tạp tỉ lệ với số kết quả – không thể tốt hơn.
- **n rất lớn và chỉ toàn '1', '2'?** Đáp án là Fibonacci ⇒ luỹ thừa ma trận O(log n) – nhưng '0' phá vỡ hồi quy hằng nên hiếm khi dùng.
- **Bảng mã khác (vd 1..K với K nhiều chữ số)?** dp[i] cộng dp[i−len] cho mọi len hợp lệ ⇒ O(n·d).
- **Liên hệ bài khác:** Climbing Stairs (cùng hồi quy, không có ràng buộc), Restore The Array (LeetCode 1416).

## Lỗi hay gặp khi code trên bảng

- Coi `"06"` là 6 vì chỉ kiểm tra `two ≤ 26`.
- Đặt dp[0] = 0, hoặc trả 1 cho chuỗi bắt đầu bằng '0'.
- Lệch chỉ số giữa `dp[i]` (i ký tự đầu) và `s[i]` (ký tự thứ i+1).
