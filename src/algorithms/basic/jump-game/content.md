## Bài toán

Cho mảng số nguyên không âm `nums`. Bạn đứng ở chỉ số `0`; `nums[i]` là **số bước nhảy tối đa** từ vị trí `i` (được nhảy 1, 2, …, `nums[i]` bước). Hỏi có thể tới **chỉ số cuối** hay không (LeetCode 55).

Ví dụ: `[2,3,1,1,4]` ⇒ `true` (0 → 1 → 4). `[3,2,1,0,4]` ⇒ `false`: mọi đường đều dừng ở chỉ số 3 vì `nums[3] = 0`.

## Ý tưởng / Trực giác

Cách nghĩ đầu tiên thường là thử mọi cách nhảy (backtracking, O(2ⁿ)) hoặc quy hoạch động: `good[i] = true` nếu từ `i` tới được đích – O(n²). Nhưng hãy để ý một tính chất quan trọng: vì `nums[i]` là bước nhảy **tối đa**, nếu tới được ô `x` thì cũng tới được **mọi ô trước `x`**. Vậy tập các ô tới được luôn là một **đoạn liên tục** `[0, farthest]`.

Thay vì nhớ từng ô, ta chỉ cần nhớ **biên phải** `farthest`. Duyệt từ trái sang phải; mỗi ô `i` còn nằm trong vùng tới được thì "đứng lên" ô đó và mở rộng biên tới `i + nums[i]`. Nếu gặp ô `i > farthest` thì có một "khoảng trống" không ai vượt qua được ⇒ thất bại. Đây là **greedy**: luôn giữ lựa chọn tốt nhất (tầm với xa nhất) mà không cần biết đường đi cụ thể.

## Thuật toán từng bước

1. `farthest = 0`.
2. Với `i` từ `0` đến `n − 1`:
   - Nếu `i > farthest`: trả về `false` (kẹt).
   - `farthest = max(farthest, i + nums[i])`.
   - Nếu `farthest ≥ n − 1`: trả về `true` (dừng sớm).
3. Trả về `true` (chỉ xảy ra khi mảng rỗng).

## Chứng minh đúng

**Bất biến:** trước khi xét ô `i` (khi `i ≤ farthest`), tập ô tới được bằng cách chỉ dùng các ô `0..i−1` làm bàn đạp chính xác là đoạn `[0, farthest]`.

- *Khởi tạo:* chưa dùng ô nào, chỉ đứng ở 0 ⇒ `[0, 0]`.
- *Duy trì:* ô `i` nằm trong đoạn nên tới được; từ `i` tới được `[i, i + nums[i]]`. Hợp hai đoạn liên tục có giao nhau là `[0, max(farthest, i + nums[i])]`.
- *Kết thúc:* nếu gặp `i > farthest` thì không ô nào trong `0..i−1` nhảy được tới `i`, và vì các ô từ `i` trở đi không tới được nên cũng không thể làm bàn đạp ⇒ đích (≥ i) không tới được. Nếu `farthest ≥ n − 1` thì đích nằm trong đoạn ⇒ tới được.

Tính chất "tới được `x` ⇒ tới được mọi ô trước `x`" chính là lý do greedy an toàn: không có lựa chọn nào bị bỏ lỡ khi chỉ nhớ biên.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ |
|---|---|---|
| Tốt nhất | O(1) – `nums[0] ≥ n − 1` | O(1) |
| Trung bình | O(n) | O(1) |
| Xấu nhất | O(n) | O(1) |

So sánh: backtracking O(2ⁿ), DP top-down/bottom-up O(n²) thời gian và O(n) bộ nhớ.

## Tradeoff

- **DP** tổng quát hơn: dễ mở rộng khi mỗi bước có chi phí hoặc ràng buộc khác, nhưng O(n²).
- **Greedy** O(n)/O(1) nhưng dựa vào cấu trúc đặc biệt (vùng tới được liên tục). Nếu đề đổi thành "nhảy **đúng** `nums[i]` bước" thì tính liên tục mất, greedy sai – phải dùng BFS/DFS (Jump Game III).
- **Duyệt ngược** (giữ `goal`, nếu `i + nums[i] ≥ goal` thì `goal = i`) cũng O(n), tương đương nhưng không dừng sớm được.

## Lợi / Hại

**Lợi:**
- Tối ưu cả thời gian lẫn bộ nhớ, code 5 dòng.
- Dừng sớm ngay khi chạm đích hoặc kẹt.
- Là bước đệm tự nhiên cho Jump Game II (BFS theo tầng dùng cùng ý tưởng biên).

**Hại:**
- Chỉ trả lời có/không, không cho đường đi hay số bước tối thiểu.
- Khó "nghĩ ra" nếu chưa nhận ra tính liên tục – người phỏng vấn sẽ hỏi bạn chứng minh.

## Use case thực tế

- Kiểm tra khả năng liên thông trên tuyến một chiều: trạm sạc xe điện/trạm xăng với tầm hoạt động, chuỗi relay mạng có bán kính phủ sóng.
- Phân tích "vùng phủ" (coverage) của các khoảng `[i, i + r_i]` – cùng họ với bài Video Stitching, Minimum Taps to Water a Garden.
- Kiểm tra nhanh trong game/level design: người chơi có thể vượt qua chuỗi nền tảng với tầm nhảy cho trước không.

## Lỗi thường gặp

- Quên kiểm tra `i > farthest` ⇒ "nhảy qua" ô 0 không tới được và trả `true` sai.
- So sánh `farthest ≥ n` thay vì `≥ n − 1` (lệch một).
- Nghĩ rằng phải nhảy **xa nhất** tại mỗi bước – greedy ở đây là nhớ *tầm với*, không phải chọn bước dài nhất (với `[2,5,0,0]`, nhảy xa nhất từ 0 sẽ rơi vào ô 2 có giá trị 0 và kẹt, trong khi nhảy ngắn tới ô 1 mới tới đích).
- Dùng DP O(n²) khi n tới 10⁴–10⁵ ⇒ TLE.

## Biến thể

- **Jump Game II** (LeetCode 45): số bước tối thiểu – greedy theo tầng (BFS ngầm) với `currentEnd` và `farthest`.
- **Jump Game III** (LeetCode 1306): nhảy đúng ±`arr[i]` ⇒ BFS/DFS.
- **Jump Game VI/VII** (LeetCode 1696, 1871): DP + monotonic deque / sliding window.
- **Video Stitching** (1024), **Minimum Taps** (1326): phủ đoạn bằng greedy tầm với.
