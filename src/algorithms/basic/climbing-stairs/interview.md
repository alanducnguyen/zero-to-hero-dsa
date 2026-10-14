## Cách trình bày trong phỏng vấn

1. Liệt kê tay n = 1, 2, 3 (1, 2, 3 cách) để tìm quy luật.
2. Nói câu then chốt: "bước cuối là 1 hoặc 2 bậc, nên ways(n) = ways(n−1) + ways(n−2)" – đây là điểm chấm.
3. Nêu vì sao đệ quy thuần chậm (tính lại bài con), rồi viết bottom-up.
4. Tối ưu xuống hai biến O(1).
5. Nếu còn thời gian: nhắc luỹ thừa ma trận O(log n) và tràn số.

## Câu hỏi follow-up thường gặp

- **Tối ưu bộ nhớ?** Chỉ cần `prev`, `cur`.
- **Bước được 1..k bậc?** `dp[i] = Σ_{s=1..k} dp[i−s]`, dùng sliding sum để O(n).
- **Có bậc không được giẫm?** `dp[i] = 0` tại đó; vẫn O(n).
- **n = 10⁹?** Luỹ thừa ma trận `[[1,1],[1,0]]^n`, O(log n), kết quả modulo.
- **In ra tất cả cách?** Backtracking, số cách là hàm mũ nên chỉ khả thi với n nhỏ.
- **Khác gì Coin Change?** Climbing Stairs đếm **dãy có thứ tự** (1+2 ≠ 2+1); Coin Change II đếm tổ hợp không thứ tự (vòng lặp đổi thứ tự).

## Checklist nhận diện pattern

- "Số cách", "bao nhiêu cách" để đi tới trạng thái n, mỗi bước có vài lựa chọn ⇒ DP đếm.
- Kết quả tại i chỉ phụ thuộc vài i trước đó ⇒ DP 1D, có thể O(1) bộ nhớ.
- Đếm có thứ tự ⇒ vòng ngoài theo i; không thứ tự ⇒ vòng ngoài theo lựa chọn.

## Bài luyện tập

- 70 Climbing Stairs → 746 Min Cost Climbing Stairs → 509 Fibonacci Number.
- 91 Decode Ways, 1137 N-th Tribonacci Number.
- 198 House Robber (cùng khung "chọn/không chọn"), 62 Unique Paths (DP 2D đếm cách).
