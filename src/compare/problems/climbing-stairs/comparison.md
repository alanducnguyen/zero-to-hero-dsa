## Phân tích

**Đệ quy thuần** dịch thẳng công thức "bước cuối từ đâu tới". Mỗi lời gọi sinh hai lời gọi và `ways(n−2)` bị tính cả ở nhánh trực tiếp lẫn bên trong `ways(n−1)` ⇒ số lời gọi tăng như Fibonacci, O(φⁿ) ≈ O(1.618ⁿ). n = 45 cần hơn một tỷ lời gọi.

**Memo** lưu mỗi `ways(i)` vào `Map` ⇒ O(n). Vẫn đệ quy nên stack sâu n tầng; với n = 45 không sao, nhưng là thói quen xấu nếu n lên 10⁵.

**Bottom-up hai biến** tính từ bậc 1 lên, chỉ giữ hai giá trị cuối ⇒ O(n) thời gian, O(1) bộ nhớ, không đệ quy, không cấp phát. Với ràng buộc n ≤ 45 đây là lời giải tốt nhất về mọi mặt thực tế.

**Luỹ thừa ma trận** dùng `Qⁿ = [[F(n+1), F(n)], [F(n), F(n−1)]]` và bình phương liên tiếp ⇒ O(log n) phép nhân ma trận 2×2.

## Vì sao ma trận chỉ xếp hạng 2

Về Big-O, O(log n) thắng O(n). Nhưng với n ≤ 45:
- Vòng lặp chạy tối đa 43 phép cộng; ma trận chạy ~6 vòng, mỗi vòng tới 2 phép nhân ma trận × 8 phép nhân số ⇒ **hằng số lớn hơn**, chênh lệch không đo được.
- Code dài gấp đôi, có hàm phụ, dễ nhầm chỉ số (`[0][0]` hay `[0][1]`, n hay n+1).
- Kết quả thật vượt 2⁵³ từ n ≈ 78 ⇒ ma trận chỉ có ý nghĩa khi đi kèm **modulo** (và cẩn thận tích hai số < 10⁹+7 đã vượt 2⁵³ ⇒ cần BigInt hoặc mulmod).

Ma trận **thắng tuyệt đối** khi đề là "n ≤ 10¹⁸, trả về mod 10⁹+7": O(n) không chạy nổi, còn O(log n) chỉ ~60 vòng.

## Xếp hạng

1. **Bottom-up 2 biến** – O(n)/O(1). Đáp án mặc định.
2. **Luỹ thừa ma trận** – O(log n)/O(1). Cho n khổng lồ kèm modulo.
3. **Memo** – O(n)/O(n). Bước trung gian; hữu ích khi tập bước phức tạp.
4. **Đệ quy thuần** – O(φⁿ). Chỉ để dẫn dắt.

## Tradeoff chi tiết

| Tiêu chí | Đệ quy | Memo | 2 biến | Ma trận |
|---|---|---|---|---|
| Thời gian | O(φⁿ) | O(n) | O(n) | O(log n) |
| Độ sâu stack | n | n | 1 | 1 |
| Số dòng | 3 | 6 | 8 | 12 |
| n = 10¹⁸ mod p | không | không | không | được |

## Khi nào thứ hạng đổi

- **Tập bước tuỳ ý `steps`** ⇒ DP mảng O(n·k) (`ways[i] = Σ ways[i−s]`); ma trận thành k×k, O(k³ log n).
- **Có bậc bị cấm** ⇒ bottom-up mảng, gán `ways[i] = 0` ở bậc cấm; ma trận không áp dụng trực tiếp.
- **Gọi nhiều lần với n khác nhau** ⇒ tiền tính mảng 46 giá trị một lần rồi tra O(1).
