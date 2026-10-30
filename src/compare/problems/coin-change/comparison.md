## Phân tích

**Tham lam (không nằm trong danh sách vì sai)**: luôn lấy đồng lớn nhất còn vừa. Với `[1, 3, 4]` và `amount = 6`: tham lam chọn 4 + 1 + 1 = **3 đồng**, trong khi 3 + 3 = **2 đồng**. Lấy 4 trước "khoá" phần dư 2 vào đường xấu – lựa chọn cục bộ tốt nhất không dẫn tới tối ưu toàn cục. Tham lam chỉ đúng với hệ mệnh giá *canonical* (như tiền thật 1, 2, 5, 10…), và kiểm tra tính canonical không hiển nhiên. Vì vậy phải xét **mọi** đồng làm đồng cuối ⇒ DP.

**Đệ quy thuần** dịch thẳng truy hồi `best(rem) = 1 + min best(rem − c)`. Tab Debug với `[1, 3, 4]`, `amount = 6` cho thấy `best(1)` và `best(2)` bị gọi nhiều lần; số lời gọi tăng theo cấp số nhân với amount. Giá trị: chỉ ra **overlapping subproblems** – chỉ có `amount + 1` trạng thái khác nhau.

**Memo (top-down)** thêm `Map` ⇒ mỗi `rem` giải một lần, O(amount·k). Ưu điểm: viết ngay từ bản đệ quy, chỉ giải những `rem` chạm tới được (với mệnh giá lớn như `[7, 11]` thì nhiều `rem` bị bỏ qua). Nhược: stack sâu tới `amount` – `amount = 10⁴` với đồng 1 có thể tràn stack trong JS.

**Bottom-up DP** điền `dp[0..amount]` từ nhỏ lên: khi xét `dp[a]`, mọi `dp[a − c]` đã xong. Hai vòng lặp, không đệ quy, hằng số nhỏ. Muốn **khôi phục các đồng đã dùng**: lưu `from[a] = c` khi cập nhật, rồi lần ngược từ `amount`.

**BFS** coi mỗi tổng là một đỉnh, mỗi đồng là một cạnh trọng số 1 ⇒ "số đồng ít nhất" = đường đi ngắn nhất từ 0 tới `amount`. BFS theo tầng gặp `amount` ở tầng nhỏ nhất và **dừng sớm**: với `coins = [1, 5, 10]`, `amount = 30` chỉ cần 3 tầng. Nhưng khi không đổi được (−1) vẫn phải duyệt mọi tổng, và cần thêm Set + queue. Khôi phục đường đi cũng dễ (lưu cha của mỗi đỉnh).

## Xếp hạng

1. **Bottom-up DP** – O(amount·k) / O(amount). Đáp án chuẩn: đơn giản, không tràn stack, dễ mở rộng.
2. **BFS** – O(amount·k) / O(amount), thường nhanh hơn khi đáp án nhỏ. Góc nhìn shortest path rất được đánh giá cao.
3. **Memo** – cùng độ phức tạp nhưng rủi ro stack và overhead lời gọi hàm.
4. **Đệ quy thuần** – hàm mũ. Chỉ để mở đầu.

## Khi nào thứ hạng đổi

- **Đáp án nhỏ, amount lớn** (mệnh giá lớn): BFS hoặc memo chỉ chạm một phần nhỏ trạng thái ⇒ thắng bottom-up.
- **Đếm số cách đổi (LeetCode 518)**: chỉ bottom-up với vòng `coin` ở ngoài là tự nhiên; BFS không áp dụng được.
- **Mỗi đồng dùng một lần**: bottom-up với vòng `a` chạy ngược (0/1 knapsack); BFS phải mang thêm trạng thái "đã dùng đồng nào".
- **Hệ mệnh giá canonical đã biết**: tham lam O(k) đúng và nhanh nhất – nhưng phải nói rõ giả định.
- **amount cực lớn (10⁹)**: mọi cách trên đều O(amount) bộ nhớ ⇒ cần toán (Frobenius, tham lam + DP trên phần dư modulo đồng lớn nhất).
