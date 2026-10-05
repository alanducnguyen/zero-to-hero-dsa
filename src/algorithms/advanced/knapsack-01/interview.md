## Cách trình bày trong phỏng vấn

1. Nhận diện: "chọn tập con, mỗi món 0 hoặc 1 lần, ràng buộc tổng ≤ W, tối ưu tổng khác" ⇒ 0/1 knapsack.
2. Chỉ ra tham lam sai bằng phản ví dụ nhỏ.
3. Định nghĩa `dp[i][w]` bằng lời, công thức "lấy / không lấy", cơ sở hàng 0.
4. Viết bản 2D rõ ràng; rồi **chủ động** nêu bản 1 hàng với `w` giảm dần và giải thích vì sao phải giảm dần.
5. O(n·W) giả đa thức; nêu khi nào không khả thi và lựa chọn thay thế.

## Bản 1 hàng (hay được yêu cầu)

```ts
function knapsack1D(items: { weight: number; value: number }[], W: number): number {
  const dp = new Array<number>(W + 1).fill(0);
  for (const { weight, value } of items) {
    for (let w = W; w >= weight; w--) {          // GIẢM dần: dp[w - weight] vẫn là "hàng trước"
      dp[w] = Math.max(dp[w], dp[w - weight] + value);
    }
  }
  return dp[W];
}
```

## Câu hỏi follow-up thường gặp

- **Tại sao bản 1 hàng duyệt w giảm dần?** Để khi tính `dp[w]`, `dp[w − weight]` chưa bị cập nhật bởi món hiện tại ⇒ mỗi món dùng tối đa một lần. Tăng dần ⇒ unbounded.
- **Mỗi món có k bản?** Bounded knapsack: tách thành 1, 2, 4, …, phần dư (binary splitting) rồi 0/1; O(n·log k·W).
- **W = 10⁹ nhưng tổng giá trị ≤ 10⁴?** Đổi trạng thái: `minWeight[v]` = trọng lượng nhỏ nhất đạt giá trị v; đáp án = v lớn nhất có `minWeight ≤ W`.
- **n = 40, W = 10¹²?** Meet-in-the-middle: liệt kê 2²⁰ tập con mỗi nửa, sắp xếp, two pointers/binary search.
- **Có thể chia tập thành hai nửa bằng nhau không (416)?** Subset sum với target = S/2, `dp[w]` boolean, bitset tăng tốc.
- **In ra tập món?** Cần bảng 2D (hoặc lưu bitmask/parent); truy vết so sánh `dp[i][w]` với `dp[i−1][w]`.
- **Fractional knapsack?** Tham lam theo tỉ lệ v/w, O(n log n); là LP relaxation của 0/1 ⇒ dùng làm chặn trên cho branch and bound.
- **Knapsack là NP-hard, sao DP lại đa thức?** Đa thức theo **giá trị** W, không theo **số bit** của W ⇒ giả đa thức; với W mã hoá nhị phân vẫn là hàm mũ.

## Checklist nhận diện pattern

- "Chọn tập con", "mỗi phần tử tối đa một lần", "tổng ≤ / = X", "tối đa/tối thiểu" ⇒ 0/1 knapsack (vòng w giảm dần).
- "Chia thành hai nhóm bằng nhau / chênh lệch nhỏ nhất" ⇒ subset sum.
- "Gán dấu +/− để đạt target" ⇒ subset sum sau biến đổi.
- Hai ràng buộc (số 0 và số 1) ⇒ dp hai chiều ràng buộc, duyệt cả hai giảm dần.
- "Dùng không giới hạn" ⇒ unbounded (vòng w tăng dần).

## Bài luyện tập liên quan

- 416 Partition Equal Subset Sum → 494 Target Sum → 1049 Last Stone Weight II.
- 474 Ones and Zeroes, 879 Profitable Schemes (Hard), 956 Tallest Billboard (Hard).
- 322 Coin Change / 518 (unbounded để so sánh), 1155 Number of Dice Rolls (bounded).
