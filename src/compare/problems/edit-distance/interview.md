## Kịch bản trình bày

1. **Làm rõ** (30 giây): ba thao tác cùng chi phí 1? cần con số hay dãy thao tác? chuỗi rỗng hợp lệ?
2. **Đệ quy** (1–2 phút): `d(i, j)` = khoảng cách giữa a[0..i) và b[0..j). Base: `d(0, j) = j`, `d(i, 0) = i`. Khớp ⇒ `d(i−1, j−1)`; không ⇒ `1 + min(thay, xoá, chèn)`. Giải thích từng nhánh bằng ví dụ `horse → ros`. Chỉ ra chồng chéo ⇒ hàm mũ (phân nhánh 3).
3. **Memo** (1 phút): (m+1)(n+1) trạng thái ⇒ O(m·n). Nêu rủi ro stack.
4. **Bảng 2-D** (2 phút): điền hàng 0, cột 0, rồi theo hàng. Vẽ 3 ô phụ thuộc: chéo, trên, trái. Chạy tay vài ô.
5. **Một hàng + biến chéo** (2 phút): "Chỉ cần hàng trên ⇒ một mảng; nhưng ô chéo bị ghi đè ⇒ giữ trong `prev`." Viết cẩn thận thứ tự `up = row[j]; row[j] = …; prev = up`. Cột theo chuỗi ngắn hơn (bài đối xứng).
6. **Chốt**: O(m·n) thời gian, O(min(m,n)) bộ nhớ; muốn alignment thì bảng, hoặc Hirschberg nếu bộ nhớ chặt.

## Follow-up thường gặp

- **In dãy thao tác?** Lần ngược bảng từ (m, n): chéo khi khớp (giữ) hoặc khi chọn thay; lên = xoá a[i−1]; trái = chèn b[j−1].
- **Bộ nhớ O(n) nhưng vẫn in alignment?** Hirschberg (chia để trị), thời gian gấp ~2.
- **Chi phí thao tác khác nhau?** Thay `1 +` bằng `cost_ins`, `cost_del`, `cost_sub` tương ứng – cấu trúc DP giữ nguyên.
- **Chỉ kiểm tra khoảng cách ≤ 1 (LC 161 One Edit Distance)?** Không cần DP: duyệt hai con trỏ O(n).
- **Damerau (cho đổi chỗ kề nhau)?** Thêm nhánh `dp[i−2][j−2] + 1` khi `a[i−1] = b[j−2]` và `a[i−2] = b[j−1]`.
- **Liên hệ LCS?** Chỉ cho chèn/xoá: distance = m + n − 2·LCS. `git diff` dùng thuật toán Myers cho bài này, O((m+n)·D).
- **Vì sao memo dùng key `i·(n+1)+j`?** Tránh tạo chuỗi `"i,j"` mỗi lần (chậm, rác GC); hoặc dùng mảng 2-D khởi tạo −1.

## Checklist nhận diện

- Biến chuỗi này thành chuỗi kia với số thao tác ít nhất ⇒ DP (i, j) trên tiền tố.
- Mỗi ô phụ thuộc chéo/trên/trái ⇒ lăn một hàng + biến giữ ô chéo.

## Bài luyện tập

- LC 72 Edit Distance, LC 583 Delete Operation for Two Strings, LC 161 One Edit Distance, LC 712 Minimum ASCII Delete Sum, LC 44 Wildcard Matching, LC 10 Regular Expression Matching, LC 115 Distinct Subsequences.
