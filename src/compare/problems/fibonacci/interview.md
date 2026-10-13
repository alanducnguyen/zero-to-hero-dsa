## Kịch bản trình bày

1. **Đệ quy** (30s): viết 2 dòng, nói ngay "hàm mũ vì fib(n−2) bị tính hai lần, lặp lại ở mọi tầng".
2. **Memo** (1 phút): thêm Map ⇒ O(n). "Mỗi i tính một lần."
3. **Bottom-up** (1 phút): "Tính từ dưới lên, chỉ cần 2 giá trị trước ⇒ O(1) bộ nhớ, không tràn stack." Code 6 dòng.
4. **Nâng cao** (1 phút, nếu được hỏi n lớn): "Q = [[1,1],[1,0]], Qⁿ chứa F(n); bình phương liên tiếp ⇒ O(log n)."
5. **Chốt**: bottom-up cho n thường; ma trận/fast doubling cho n cực lớn với modulo.

## Follow-up thường gặp

- **Vì sao đệ quy là O(φⁿ)?** Số lời gọi T(n) = T(n−1) + T(n−2) + 1 – chính nó là dãy Fibonacci.
- **Memo vs bottom-up?** Memo chỉ tính bài con cần thiết và dễ viết; bottom-up không đệ quy, O(1) bộ nhớ khi chỉ phụ thuộc vài giá trị trước.
- **n = 10⁹ mod 10⁹+7?** Luỹ thừa ma trận hoặc fast doubling: O(log n); cẩn thận tràn số khi nhân (dùng BigInt hoặc mulmod).
- **Fast doubling là gì?** F(2k) = F(k)·(2F(k+1) − F(k)), F(2k+1) = F(k)² + F(k+1)²; đệ quy theo bit của n.
- **Công thức Binet?** O(1) nhưng sai số dấu phẩy động từ n ≈ 70; không dùng khi cần chính xác.
- **Tổng quát hoá?** Climbing Stairs, Tribonacci, Decode Ways – cùng khung "bước cuối từ đâu tới".
