## Cách trình bày trong phỏng vấn

1. Định nghĩa trạng thái rõ ràng trước khi code: "`dp[i][j]` là edit distance giữa i ký tự đầu của a và j ký tự đầu của b." Người phỏng vấn chấm điểm chính ở câu này.
2. Suy luận 4 trường hợp từ ký tự cuối, vẽ bảng 3×3 nhỏ để minh hoạ.
3. Viết bottom-up với hàng/cột 0; chạy tay `horse/ros` 2–3 ô.
4. Nêu O(m·n) / O(m·n), rồi chủ động tối ưu xuống O(min(m,n)) với 2 hàng.
5. Nếu được hỏi truy vết: đi ngược từ `dp[m][n]` chọn ô tạo ra giá trị hiện tại.

## Phiên bản tối ưu bộ nhớ (hay được yêu cầu)

```ts
function editDistance(a: string, b: string): number {
  if (a.length < b.length) [a, b] = [b, a];      // b ngắn hơn ⇒ hàng ngắn
  const n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = new Array<number>(n + 1);
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] : 1 + Math.min(prev[j - 1], prev[j], cur[j - 1]);
    }
    prev = cur;
  }
  return prev[n];
}
```

## Câu hỏi follow-up thường gặp

- **In ra dãy thao tác?** Giữ bảng đầy đủ, từ (m,n) đi ngược: nếu khớp ⇒ chéo; nếu `dp[i][j] = dp[i-1][j-1]+1` ⇒ thay; `= dp[i-1][j]+1` ⇒ xoá; `= dp[i][j-1]+1` ⇒ chèn.
- **Chi phí thao tác khác nhau?** Thay hằng số 1 bằng `costReplace`, `costDelete`, `costInsert`. Công thức không đổi.
- **Top-down hay bottom-up?** Cả hai O(m·n). Top-down với memo dễ viết từ công thức; bottom-up không đệ quy, dễ tối ưu bộ nhớ.
- **Chuỗi rất dài, distance nhỏ?** Banded DP: chỉ tính các ô có |i−j| ≤ d, O(n·d). Hoặc bit-parallel Myers O(n·m/w).
- **Liên hệ với LCS?** Nếu không cho thay: `dist = m + n − 2·LCS(a,b)`. Với thay: `dist ≥ max(m,n) − LCS`.
- **Kiểm tra "cách nhau đúng 1 thao tác" nhanh?** O(n) hai con trỏ, không cần DP (LeetCode 161).
- **Áp dụng cho mảng từ thay vì ký tự?** Hoàn toàn tương tự (WER trong speech recognition).
- **Tại sao khi khớp không cần xét 3 lựa chọn còn lại?** Vì `dp[i-1][j-1] ≤ dp[i-1][j] + 1` và `≤ dp[i][j-1] + 1` (tính chất Lipschitz của edit distance), nên lấy thẳng là tối ưu.

## Checklist nhận diện pattern

- Hai chuỗi/mảng, hỏi "tối thiểu/tối đa … để biến A thành B / khớp A với B" ⇒ DP 2 tiền tố `dp[i][j]`.
- Quyết định ở mỗi bước chỉ phụ thuộc ký tự cuối ⇒ công thức từ `(i-1,j-1)`, `(i-1,j)`, `(i,j-1)`.
- Có pattern đặc biệt (`*`, `?`, `.`) ⇒ cùng khung, thêm nhánh theo ký tự đặc biệt.

## Bài luyện tập liên quan

- 72 Edit Distance → 1143 LCS → 583 Delete Operation → 712 Minimum ASCII Delete Sum.
- 115 Distinct Subsequences, 97 Interleaving String.
- 10 Regular Expression Matching, 44 Wildcard Matching (Hard).
- 161 One Edit Distance, 1312 Minimum Insertions to Make Palindrome.
