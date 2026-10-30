## Bài toán

Có `n` ngôi nhà xếp thành **vòng tròn**, nhà thứ `i` có `nums[i]` tiền. Không được lấy hai nhà kề nhau – và vì là vòng tròn, **nhà 0 kề nhà n−1**. Tìm tổng tiền lớn nhất (LeetCode 213).

Ví dụ: `[2, 3, 2]` ⇒ `3` (không thể lấy cả hai số 2 ở đầu và cuối). `[2, 7, 9, 3, 1]` ⇒ `11` (2 + 9; còn 2 + 9 + 1 = 12 của bài thẳng bị cấm vì nhà 0 kề nhà 4).

Bài này xây trên bài [House Robber (DP 1D)](/algo/house-robber) – hãy học bài đó trước nếu chưa quen công thức `dp[i] = max(dp[i−1], dp[i−2] + nums[i])`.

## Ý tưởng / Trực giác

Vòng tròn làm hỏng DP tuyến tính: quyết định ở nhà cuối phụ thuộc vào quyết định ở nhà đầu, nên không có "điểm bắt đầu" tự nhiên. Kỹ thuật chuẩn là **phá vòng bằng cách chia trường hợp** trên chính ràng buộc gây vòng.

Ràng buộc mới duy nhất là "không lấy cả nhà 0 lẫn nhà n−1". Vậy mọi nghiệm hợp lệ rơi vào ít nhất một trong hai nhóm:

- **Không lấy nhà n−1** ⇒ bài toán thẳng trên `nums[0..n−2]`.
- **Không lấy nhà 0** ⇒ bài toán thẳng trên `nums[1..n−1]`.

Mỗi nhóm là House Robber thường, nên đáp án là `max(rob(0..n−2), rob(1..n−1))`. Hai nhóm có thể giao nhau (nghiệm không lấy cả hai nhà) – không sao, vì ta lấy max chứ không cộng.

## Thuật toán từng bước

1. `n = 0` ⇒ 0. `n = 1` ⇒ `nums[0]` (xử lý riêng vì cả hai đoạn sẽ rỗng).
2. Viết hàm `robLine(lo, hi)` – House Robber tuyến tính với hai biến:
   - `prev2 = 0` (tốt nhất tới nhà i−2), `prev1 = 0` (tốt nhất tới nhà i−1).
   - Với `i` từ `lo` tới `hi`: `cur = max(prev1, prev2 + nums[i])`; rồi `prev2 = prev1`, `prev1 = cur`.
   - Trả `prev1`.
3. **Pha 1:** `skipLast = robLine(0, n−2)`.
4. **Pha 2:** `skipFirst = robLine(1, n−1)`.
5. Trả `max(skipLast, skipFirst)`.

## Chứng minh đúng

**Đầy đủ:** gọi `S` là một tập nhà tối ưu của bài vòng tròn. Vì nhà 0 và n−1 kề nhau, `S` không chứa cả hai. Nếu `n−1 ∉ S` thì `S` là tập hợp lệ của bài thẳng trên `[0..n−2]` (mọi cặp kề trong đoạn thẳng cũng là cặp kề trong vòng) ⇒ `skipLast ≥ sum(S)`. Tương tự nếu `0 ∉ S` ⇒ `skipFirst ≥ sum(S)`.

**Hợp lệ:** mọi nghiệm của bài thẳng trên `[0..n−2]` không chứa nhà n−1 nên không vi phạm cặp (0, n−1); các cặp kề khác giống bài thẳng ⇒ cũng hợp lệ trên vòng. Tương tự với `[1..n−1]`.

Vậy `max(skipLast, skipFirst) = sum(S)`. Tính đúng của `robLine` kế thừa từ chứng minh House Robber: tại nhà i, nghiệm tối ưu hoặc bỏ i (giá trị prev1) hoặc lấy i và buộc bỏ i−1 (giá trị prev2 + nums[i]).

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Brute force (mọi tập con) | O(2ⁿ · n) | O(n) |
| Hai lần DP mảng `dp[]` | O(n) | O(n) |
| Hai lần DP hai biến (bài này) | **O(n)** | **O(1)** |

Hai lần quét, mỗi lần n−1 phần tử ⇒ khoảng 2n phép tính.

## Tradeoff

- Truyền chỉ số `lo, hi` thay vì `nums.slice(...)` tiết kiệm O(n) bộ nhớ sao chép; `slice` thì code ngắn và dễ đọc hơn.
- Cách chia 2 trường hợp đơn giản nhưng chạy 2 lần. Có thể làm một lần với DP 2 trạng thái ("đã lấy nhà 0 hay chưa") – cùng O(n), khó đọc hơn, chỉ đáng khi bài tổng quát hơn.
- Bản hai biến không truy vết được tập nhà; nếu cần, giữ mảng dp cho pha thắng.

## Lợi / Hại

**Lợi:** tái sử dụng nguyên lời giải bài thẳng; chứng minh ngắn; O(1) bộ nhớ.

**Hại:** dễ quên trường hợp `n = 1`; kỹ thuật "chia trường hợp" chỉ gọn khi ràng buộc vòng chạm ít phần tử – vòng có nhiều điều kiện chéo cần DP trạng thái phức tạp hơn.

## Use case thực tế

- Lập lịch tuần hoàn: chọn các ca trong một chu kỳ 24h/7 ngày sao cho không có hai ca liên tiếp (ca cuối kề ca đầu chu kỳ sau).
- Bố trí thiết bị trên vòng (anten, cảm biến quanh một chu vi) tránh nhiễu giữa hai vị trí kề nhau.
- Mẫu chung "phá vòng bằng cố định một phần tử" xuất hiện trong mọi bài DP trên dãy vòng: tô màu nhà vòng, max circular subarray.

## Lỗi thường gặp

- Gọi `robLine(0, n−1)` một lần rồi quên ràng buộc vòng ⇒ trả 12 thay vì 11 với `[2, 7, 9, 3, 1]`.
- Quên `n = 1`: cả hai đoạn rỗng ⇒ trả 0 thay vì `nums[0]`.
- Dùng `slice(1)` và `slice(0, -1)` với `n = 1` cũng ra mảng rỗng – cùng lỗi trên.
- Cập nhật `prev2`, `prev1` sai thứ tự (ghi đè `prev1` trước khi gán cho `prev2`).
- Nghĩ phải **cộng** hai pha hoặc trừ phần giao – thực ra chỉ cần `max`.

## Biến thể

- **198 House Robber:** bản thẳng – xem bài [House Robber](/algo/house-robber).
- **337 House Robber III:** nhà trên cây nhị phân, DFS trả cặp `[lấy, không lấy]`.
- **918 Maximum Sum Circular Subarray:** cũng phá vòng bằng 2 trường hợp (không vòng / vòng = tổng − min subarray).
- **1388 Pizza With 3n Slices:** vòng tròn + chọn đúng n/3 phần tử không kề ⇒ chia 2 trường hợp + DP 2 chiều.
- **Paint House trên vòng:** cố định màu nhà đầu, chạy DP, kiểm tra nhà cuối.
