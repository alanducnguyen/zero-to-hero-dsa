## Bảng tradeoff

| Lời giải | Thời gian | Bộ nhớ | Ý tưởng then chốt | Điểm yếu |
|---|---|---|---|---|
| Đệ quy thuần | O(2ⁿ) worst | O(n) stack | Thử mọi tiền tố là từ, giải phần còn lại | Cùng `start` bị giải lại theo cấp số nhân |
| Đệ quy + memo | O(n²·L) ≈ O(n³) | O(n) memo + O(n) stack | `can(start)` chỉ phụ thuộc `start` ⇒ nhớ kết quả | Stack sâu tới n, overhead lời gọi hàm |
| Bottom-up DP | O(n·L·L) với L = độ dài từ dài nhất | O(n) | `dp[i]` = tiền tố `s[0..i)` cắt được | Duyệt mọi `i` kể cả khi không cần |
| BFS trên chỉ số | O(n²·L) ≈ O(n³) | O(n) | Đỉnh = chỉ số, cạnh = một từ; hỏi đường 0 → n | Bản chất là memo đổi tên, code dài hơn |

(L là chi phí `slice` + hash một chuỗi con; với `maxLen` thì chỉ cần thử tối đa `maxLen` độ dài mỗi vị trí.)

## Phân tích

**Đệ quy thuần** là cách diễn đạt tự nhiên nhất: "s cắt được nếu có một tiền tố là từ và phần còn lại cắt được". Nhưng câu trả lời của `can(start)` **chỉ phụ thuộc `start`**, trong khi có thể tới cùng một `start` bằng rất nhiều cách cắt khác nhau (vd `"a"+"aa"` và `"aa"+"a"` cùng tới start = 3). Với `s = "aaa…ab"` và `dict = {a, aa, aaa, …}` số lời gọi tăng như Fibonacci tổng quát – hàm mũ. Hãy chạy preset "Bùng nổ" và nhìn mảng số lần gọi.

**Memo** là bước sửa tối thiểu: thêm một `Map<start, boolean>`. Mỗi `start` được giải đúng một lần, mỗi lần thử O(n) tiền tố ⇒ O(n²) cặp (start, end), nhân chi phí `slice`/hash. Đây là chỗ đa số ứng viên dừng lại và đủ để pass. Nhược điểm: đệ quy sâu tới n (n = 300 vẫn ổn, n = 10⁵ thì tràn stack).

**Bottom-up DP** đảo chiều: `dp[i]` = `s[0..i)` cắt được, `dp[i] = OR(dp[j] && s[j..i) ∈ dict)`. Không đệ quy, vòng lặp đơn giản, và giới hạn `j ≥ i − maxLen` cắt vòng trong từ O(n) xuống O(L) – cải tiến quan trọng nhất khi từ điển toàn từ ngắn. Nhược điểm nhỏ: luôn tính mọi `dp[i]`, kể cả những vị trí không bao giờ tới được (memo/BFS chỉ thăm vị trí *tới được*).

**BFS** nhìn bài toán như đồ thị: đỉnh 0..n, cạnh `start → end` khi `s[start..end)` là từ, hỏi có đường 0 → n. Mảng `seen` đóng vai memo. Độ phức tạp giống memo, không cần đệ quy, và dừng sớm ngay khi chạm n. Đổi BFS thành DFS lặp với stack cũng đúng.

## Xếp hạng

1. **Bottom-up DP** (+ `maxLen`) – O(n·L²)/O(n). Không đệ quy, dễ chứng minh, đáp án chuẩn.
2. **Đệ quy + memo** – O(n³)/O(n). Bước tiến tự nhiên từ brute force, chấp nhận được trong phỏng vấn.
3. **BFS trên chỉ số** – O(n³)/O(n). Tương đương memo, hay khi người phỏng vấn thích góc nhìn đồ thị.
4. **Đệ quy thuần** – O(2ⁿ). Chỉ để mở đầu.

## Tối ưu bằng Trie

Khi từ điển rất lớn hoặc từ dài, thay `Set` + `slice` bằng **Trie**: từ mỗi vị trí `start` (đã tới được), đi dọc Trie theo `s[start], s[start+1], …`; mỗi khi gặp nút kết thúc từ tại `end` thì đánh dấu `dp[end]`; dừng ngay khi Trie không có nhánh tương ứng. Mỗi bước O(1) thay vì băm cả chuỗi con ⇒ O(n·L) tổng, và tự cắt tỉa các tiền tố không thể là từ. Đây là câu trả lời cho follow-up "từ điển có 10⁶ từ".

## Khi nào thứ hạng đổi

- **Word Break II (LC 140) – liệt kê mọi cách cắt**: đầu ra có thể hàm mũ, nên DP bool không đủ; dùng **đệ quy + memo trả về danh sách câu** (hoặc chạy DP bool trước để cắt nhánh chết rồi backtrack). Memo lên hạng 1.
- **Đếm số cách cắt**: DP bottom-up đổi `OR` thành `+` – vẫn hạng 1.
- **Từ điển khổng lồ / từ dài**: DP hoặc BFS duyệt bằng Trie thắng Set + slice.
- **n rất lớn (10⁵+)**: đệ quy + memo có nguy cơ tràn stack ⇒ DP hoặc BFS.
- **Chuỗi gần như chắc chắn cắt được sớm**: BFS/memo có thể dừng sớm, DP vẫn phải đi tới `dp[n]`.
