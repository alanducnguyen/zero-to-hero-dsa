## Cách trình bày trong phỏng vấn

1. Chỉ ra greedy sai bằng phản ví dụ nhỏ – thể hiện bạn không nhảy vào code bừa.
2. Định nghĩa trạng thái bằng lời: "dp[i] là tối đa từ i nhà đầu tiên".
3. Suy công thức từ quyết định ở nhà cuối: bỏ hoặc lấy.
4. Viết bottom-up O(n), rồi **chủ động** rút xuống O(1) với 2 biến.
5. Nếu còn thời gian: vòng tròn (II), cây (III).

## Phiên bản O(1) bộ nhớ

```ts
function rob(nums: number[]): number {
  let prev2 = 0, prev1 = 0;           // dp[i-2], dp[i-1]
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
```

## Câu hỏi follow-up thường gặp

- **Nhà xếp vòng tròn?** Nhà 0 và n−1 kề nhau ⇒ không thể lấy cả hai ⇒ `max(rob(nums.slice(1)), rob(nums.slice(0, -1)))`.
- **Nhà là cây (mỗi node có con)?** Postorder, mỗi node trả `[lấy, không lấy]`: lấy = val + Σ không lấy(con); không lấy = Σ max(con).
- **Trả về danh sách nhà đã chọn?** Giữ mảng dp, truy vết từ cuối: nếu `dp[i] == dp[i−1]` thì bỏ nhà i−1, ngược lại lấy và nhảy i−2.
- **Số tiền có thể âm?** Cho phép "không lấy gì": `dp[1] = max(0, nums[0])`, công thức giữ nguyên với `max(…, 0)` ở cơ sở.
- **Ràng buộc "cách nhau ít nhất k nhà"?** `dp[i] = max(dp[i−1], dp[i−k−1] + nums[i−1])`.
- **Tối đa m nhà?** `dp[i][j]` với j = số nhà đã lấy, O(n·m).
- **Top-down hay bottom-up?** Cùng O(n); bottom-up không đệ quy, O(1) bộ nhớ dễ hơn.
- **Tại sao đây là DP chứ không phải greedy?** Vì lựa chọn tốt cục bộ (nhà to nhất) không dẫn tới tối ưu toàn cục; cần so sánh các bài con.

## Checklist nhận diện pattern

- "Chọn tập con với ràng buộc **không kề nhau** / **cách nhau** / **không chồng lấn**", tối ưu tổng ⇒ DP 1D kiểu House Robber.
- "Số cách / tổng lớn nhất khi đi từng bước 1 hoặc 2" ⇒ cùng công thức dạng `dp[i−1]`, `dp[i−2]`.
- Ràng buộc chỉ phụ thuộc vài phần tử liền trước ⇒ DP 1D với O(1) bộ nhớ.

## Bài luyện tập liên quan

- 198 House Robber → 213 House Robber II → 337 House Robber III.
- 70 Climbing Stairs, 746 Min Cost Climbing Stairs, 91 Decode Ways.
- 740 Delete and Earn, 309 Stock with Cooldown, 256 Paint House.
