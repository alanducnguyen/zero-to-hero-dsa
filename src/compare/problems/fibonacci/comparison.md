## Phân tích

**Đệ quy thuần** là định nghĩa dịch thẳng thành code. Tab Debug cho thấy `fib(1)` bị gọi hàng chục lần với n = 7 – cây gọi có ~φⁿ nút. Giá trị duy nhất: minh hoạ *tại sao* cần DP.

**Memo (top-down)** thêm một `Map`: mỗi bài con tính một lần ⇒ O(n). Vẫn đệ quy nên tốn stack O(n) và có thể tràn với n ≈ 10⁴ trong JS. Ưu điểm: viết được ngay từ công thức đệ quy, và chỉ tính những bài con thực sự cần (quan trọng với DP có không gian trạng thái thưa).

**Bottom-up hai biến** lật thứ tự: tính từ nhỏ lên, chỉ giữ hai giá trị cuối ⇒ O(1) bộ nhớ, không đệ quy. Đây là đáp án chuẩn cho n ≤ 10⁶.

**Luỹ thừa ma trận** dùng `[[1,1],[1,0]]ⁿ` với bình phương liên tiếp ⇒ O(log n). Chỉ đáng khi n cực lớn (10⁹, 10¹⁸ với modulo) – lúc đó O(n) không chạy nổi. Cùng kỹ thuật giải mọi hồi quy tuyến tính bậc k.

## Xếp hạng

1. **Bottom-up 2 biến** – O(n)/O(1). Mặc định.
2. **Luỹ thừa ma trận** – O(log n)/O(1). Chọn khi n ≥ 10⁷ (thường kèm modulo).
3. **Memo** – O(n)/O(n). Chọn khi công thức đệ quy phức tạp hoặc trạng thái thưa; với Fibonacci chỉ là bước trung gian.
4. **Đệ quy thuần** – O(φⁿ). Không dùng, chỉ để minh hoạ.

## Khi nào thứ hạng đổi

- Gọi `fib` nhiều lần với n khác nhau ≤ N ⇒ tiền tính mảng O(N) một lần (memo toàn cục) rồi tra O(1).
- n ≈ 10¹⁸ với modulo ⇒ ma trận là lựa chọn duy nhất; fast doubling (F(2k), F(2k+1)) nhanh hơn ma trận về hằng số.
- Cần giá trị chính xác với n lớn ⇒ BigInt, chi phí mỗi phép cộng O(số chữ số).
