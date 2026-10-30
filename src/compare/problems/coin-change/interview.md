## Kịch bản trình bày

1. **Làm rõ & phản ví dụ tham lam** (1 phút): "Lấy đồng lớn nhất trước có đúng không? Với [1, 3, 4], 6: tham lam ra 4+1+1 = 3, tối ưu 3+3 = 2 ⇒ không, phải thử mọi khả năng."
2. **Đệ quy** (1 phút): "Đồng cuối cùng là c nào đó ⇒ best(rem) = 1 + min best(rem − c)." Viết 8 dòng, chỉ ra best(2) bị tính nhiều lần ⇒ hàm mũ.
3. **Memo** (1 phút): "Chỉ có amount + 1 trạng thái ⇒ thêm Map, O(amount·k)." Nhắc rủi ro stack sâu.
4. **Bottom-up** (2 phút): `dp[0] = 0`, `dp[a] = min(dp[a − c] + 1)`. Dùng `Infinity` làm "không tạo được" rồi đổi thành −1 ở cuối. Chạy tay với [1, 3, 4], 6.
5. **Góc nhìn BFS** (1 phút, điểm cộng): "Mỗi đồng là cạnh trọng số 1 ⇒ shortest path ⇒ BFS dừng ngay tầng đầu chạm amount."
6. **Chốt**: bottom-up là mặc định; BFS khi đáp án nhỏ; nêu O(amount·k) thời gian, O(amount) bộ nhớ.

## Follow-up thường gặp

- **Vì sao tham lam sai? Khi nào đúng?** Đúng với hệ canonical (tiền thật); sai với [1, 3, 4]. Kiểm tra canonical: có thuật toán O(k³) (Pearson) nhưng phỏng vấn chỉ cần phản ví dụ.
- **In ra các đồng đã dùng?** Lưu `from[a] = c` khi cập nhật dp[a]; lần ngược `a -= from[a]` tới 0.
- **Đếm số cách đổi (LC 518)?** `ways[0] = 1`, vòng ngoài theo coin, vòng trong a tăng dần ⇒ mỗi tổ hợp đếm đúng một lần (đảo vòng thì đếm hoán vị – LC 377).
- **Mỗi đồng chỉ dùng một lần?** 0/1 knapsack: vòng a chạy **giảm dần** để dp[a − c] vẫn là giá trị "chưa dùng c".
- **Vì sao dùng Infinity thay vì −1 trong dp?** −1 phá phép `min`; Infinity + 1 vẫn là Infinity nên công thức giữ nguyên.
- **BFS có cần visited không?** Có – không có Set thì cùng tổng bị đẩy vào queue theo mọi thứ tự đồng ⇒ nổ lại hàm mũ.
- **Độ phức tạp đệ quy thuần?** Khoảng O(k^(amount / min coin)): độ sâu tối đa amount / min coin, mỗi tầng phân nhánh k.
