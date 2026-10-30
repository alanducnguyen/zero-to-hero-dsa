## Kịch bản trình bày

1. **Làm rõ đề** (30s): dãy thẳng, tiền không âm, chỉ cần tổng. Nêu phản ví dụ `[5, 1, 1, 5]` để loại tham lam chẵn/lẻ.
2. **Đệ quy** (1 phút): "Ở nhà i có hai lựa chọn: bỏ ⇒ rob(i+1); cướp ⇒ nums[i] + rob(i+2)." Chỉ ra ngay: hai nhánh đều đi tới rob(i+2) ⇒ bài con chồng lấn ⇒ hàm mũ.
3. **Memo** (1 phút): "rob(i) chỉ phụ thuộc i ⇒ n trạng thái, mỗi cái O(1) ⇒ O(n)." Thêm Map.
4. **Bottom-up** (1–2 phút): định nghĩa `dp[i]` = tốt nhất với i nhà đầu, `dp[i] = max(dp[i−1], dp[i−2] + nums[i−1])`, `dp[0] = 0`, `dp[1] = nums[0]`. Chạy tay trên `[2, 7, 9, 3, 1]`.
5. **Tối ưu bộ nhớ** (30s): "Chỉ đọc 2 ô trước ⇒ hai biến prev, cur." Viết 5 dòng, nêu O(n)/O(1).
6. **Test**: mảng 1 phần tử, toàn số 0, `[5, 1, 1, 5]`, nhà to nằm giữa.

## Follow-up thường gặp

- **Vì sao tham lam sai?** Lấy nhà lớn nhất trước có thể chặn hai nhà kề vừa lớn: `[2, 3, 2]` tham lam lấy 3, tối ưu là 4.
- **In ra các nhà được chọn?** Giữ mảng dp, đi ngược từ i = n: nếu `dp[i] == dp[i−1]` thì nhà i−1 bị bỏ, ngược lại nhà i−1 được chọn và nhảy về i−2.
- **Nhà xếp vòng tròn (LC 213)?** Nhà đầu và cuối không thể cùng chọn ⇒ max(chạy trên bỏ nhà cuối, chạy trên bỏ nhà đầu).
- **Nhà trên cây nhị phân (LC 337)?** DFS trả về `[cướp nút này, không cướp]`; cướp ⇒ cộng "không cướp" của hai con.
- **Không được cướp k nhà liền nhau thay vì 2?** Trạng thái thêm "số nhà liền kề đã cướp" hoặc `dp[i] = max(dp[i−1], max_{j}(dp[i−j−1] + tổng đoạn))`.
- **Tiền có thể âm?** Công thức vẫn đúng vì "bỏ" luôn khả thi; đáp án ≥ 0.

## Checklist nhận diện

- Mỗi phần tử: lấy hoặc bỏ, và "lấy" ràng buộc phần tử lân cận ⇒ DP 1 chiều.
- Đáp án ở bước i chỉ phụ thuộc vài bước trước ⇒ nén còn O(1) biến.
- Bài cùng khuôn: Climbing Stairs, Min Cost Climbing Stairs, Delete and Earn, Paint Fence.
