## Kịch bản trình bày

1. **Làm rõ đề** (30s): bước 1 hoặc 2, thứ tự khác nhau là cách khác nhau, n ≤ 45.
2. **Tìm công thức** (1 phút): "Nhìn bước cuối: tới bậc n từ n−1 hoặc n−2, hai nhóm rời nhau ⇒ ways(n) = ways(n−1) + ways(n−2)." Kiểm tra n = 3 ⇒ 3.
3. **Đệ quy** (30s): viết 3 dòng, nói ngay "hàm mũ vì ways(n−2) bị tính lại ở cả hai nhánh".
4. **Memo** (30s): thêm Map ⇒ O(n), mỗi bậc tính một lần.
5. **Bottom-up 2 biến** (1 phút): "Chỉ cần hai giá trị trước ⇒ O(1) bộ nhớ, không đệ quy." Chạy tay n = 5 ⇒ 1, 2, 3, 5, 8.
6. **Nhận diện Fibonacci** (30s): ways(n) = F(n+1) ⇒ mở đường cho follow-up n lớn.
7. **Chốt**: hai biến là đáp án; nếu được hỏi n = 10⁹ thì trình bày luỹ thừa ma trận O(log n).

## Follow-up thường gặp

- **Được bước 1, 2 hoặc 3?** `ways(n) = ways(n−1) + ways(n−2) + ways(n−3)` (Tribonacci) – giữ 3 biến.
- **Tập bước tuỳ ý `steps`?** Mảng dp O(n·k): `dp[i] = Σ dp[i−s]` với s ∈ steps, s ≤ i.
- **n = 10⁹, trả về mod 10⁹+7?** Luỹ thừa ma trận O(log n); nhân bằng BigInt hoặc tách số để tránh vượt 2⁵³.
- **Vì sao không dùng công thức Binet?** O(1) nhưng sai số dấu phẩy động từ n ≈ 70, và không dùng được với modulo.
- **Mỗi bậc có chi phí, tìm chi phí nhỏ nhất (LC 746)?** Cùng khung, thay `+` bằng `min` và cộng chi phí.
- **Không được bước 2 bậc hai lần liên tiếp?** Thêm trạng thái "bước trước là 2" ⇒ DP 2 chiều nhỏ, vẫn nén được O(1).

## Checklist nhận diện

- "Có bao nhiêu cách" + mỗi bước chọn trong tập nhỏ ⇒ đếm theo bước cuối.
- Công thức chỉ phụ thuộc k giá trị trước ⇒ k biến, O(1) bộ nhớ.
- Hồi quy tuyến tính + n khổng lồ ⇒ luỹ thừa ma trận.
- Bài cùng khuôn: Fibonacci, Min Cost Climbing Stairs, Decode Ways, House Robber.
