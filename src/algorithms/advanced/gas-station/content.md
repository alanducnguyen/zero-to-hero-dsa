## Bài toán

Có `n` trạm xăng xếp trên một **đường tròn**. Trạm `i` cho bạn `gas[i]` lít; đi từ trạm `i` sang trạm `i + 1` (trạm `n − 1` quay về trạm `0`) tốn `cost[i]` lít. Xe có bình xăng không giới hạn, bắt đầu với bình **rỗng** ở một trạm nào đó. Tìm chỉ số trạm xuất phát để đi trọn một vòng theo chiều kim đồng hồ; nếu không có, trả về `-1` (LeetCode 134). Đề đảm bảo nếu có nghiệm thì nghiệm là duy nhất.

Ví dụ: `gas = [1,2,3,4,5]`, `cost = [3,4,5,1,2]` ⇒ `3`. Xuất phát ở trạm 3: bình lần lượt là 3, 6, 4, 2, 0 – không lúc nào âm.

## Ý tưởng / Trực giác

Đặt `diff[i] = gas[i] − cost[i]` – lượng xăng "lời" hoặc "lỗ" khi đi qua trạm `i`. Bài toán trở thành: tìm điểm bắt đầu trên vòng sao cho **mọi tổng tiền tố** (đi vòng từ điểm đó) đều không âm.

Cách ngây thơ: thử từng trạm làm điểm xuất phát rồi mô phỏng – O(n²). Hai quan sát giúp xuống O(n):

1. **Điều kiện tồn tại:** nếu `Σ diff < 0` thì tổng xăng ít hơn tổng chi phí, không trạm nào cứu được ⇒ `-1`. Ngược lại (`Σ diff ≥ 0`) thì **luôn có** nghiệm.
2. **Bỏ cả đoạn khi hụt:** nếu xuất phát từ `start` mà tới trạm `i` thì bình âm (không đi nổi sang `i + 1`), thì **không trạm nào** trong `[start, i]` là nghiệm. Ta nhảy thẳng `start = i + 1`, không cần thử lại từng trạm ở giữa.

Nhờ quan sát 2, mỗi trạm được duyệt đúng một lần ⇒ một lượt (one-pass) là đủ.

## Thuật toán từng bước

1. `total = 0`, `tank = 0`, `start = 0`.
2. Với `i` từ `0` đến `n − 1`:
   - `diff = gas[i] − cost[i]`; `total += diff`; `tank += diff`.
   - Nếu `tank < 0`: `start = i + 1`, `tank = 0`.
3. Trả về `total < 0 ? -1 : start`.

## Chứng minh đúng

**Bổ đề (bỏ cả đoạn).** Giả sử xuất phát từ `s` với bình rỗng, tới được mọi trạm `s+1, …, i` (bình ≥ 0 ở mỗi lần đến), nhưng sau khi đổ xăng ở `i` và trả `cost[i]` thì bình âm. Xét trạm `k` bất kỳ với `s < k ≤ i`. Khi đi từ `s`, lúc *đến* `k` bình có `t_k ≥ 0` lít. Nếu xuất phát thẳng từ `k`, ta bắt đầu với 0 ≤ `t_k` lít, còn mọi đoạn đường sau đó giống hệt. Vậy bình khi xuất phát từ `k` luôn **ít hơn hoặc bằng** khi xuất phát từ `s` – mà từ `s` đã hụt ở `i`, nên từ `k` cũng hụt ở `i` (hoặc sớm hơn). Chính `s` cũng bị loại. ⇒ Mọi trạm trong `[s, i]` đều không phải nghiệm.

**Tồn tại khi `total ≥ 0`.** Sau vòng lặp, `start` là trạm cuối cùng được chọn; từ `start` tới `n − 1` bình không bao giờ âm và kết thúc với `tank ≥ 0`. Phần trước `[0, start)` được chia thành các đoạn đã bị reset, mỗi đoạn có tổng **âm**. Vì `total = tank + (tổng các đoạn âm) ≥ 0`, ta có `tank ≥ |tổng đoạn [0, start)|`. Khi vòng tiếp tục qua `0, 1, …, start − 1`, lượng dư `tank` đủ bù: tại mọi điểm trung gian, tiền tố của đoạn `[0, start)` lớn hơn hoặc bằng tổng cả đoạn (vì phần còn lại là tổng của các đoạn âm hoàn chỉnh và một hậu tố không âm theo bổ đề), nên bình không âm. Hơn nữa mọi trạm khác đều bị loại bởi bổ đề ⇒ `start` là nghiệm duy nhất.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ |
|---|---|---|
| Tốt nhất | O(n) | O(1) |
| Trung bình | O(n) | O(1) |
| Xấu nhất | O(n) | O(1) |

So sánh: brute force thử từng trạm O(n²); cách "nhân đôi mảng + sliding window" O(n) nhưng tốn O(n) bộ nhớ.

## Tradeoff

- **Greedy một lượt vs brute force:** greedy nhanh và gọn nhưng *phụ thuộc chứng minh*; nếu đề đổi (ví dụ bình có dung tích giới hạn) thì bổ đề "bỏ cả đoạn" có thể không còn đúng.
- **Một lượt vs hai lượt:** có thể tính `total` ở lượt riêng cho dễ đọc; gộp vào một vòng tiết kiệm một lần duyệt nhưng code hơi dày hơn.
- **Cách nhìn min prefix sum:** nghiệm cũng là `(argmin tiền tố) + 1`. Cùng O(n), nhưng khó giải thích trực giác hơn.

## Lợi / Hại

**Lợi:** O(n) thời gian, O(1) bộ nhớ; code chưa tới 15 dòng; minh hoạ rất rõ kỹ thuật "loại cả vùng ứng viên bằng một lập luận" – thứ phỏng vấn viên thích hỏi.

**Hại:** dễ nhớ code mà không hiểu tại sao đúng; chỉ áp dụng khi bình không giới hạn và đi một chiều. Nếu đề không đảm bảo nghiệm duy nhất, thuật toán chỉ trả về *một* nghiệm.

## Use case thực tế

- **Lập lộ trình xe điện / drone** trên tuyến vòng: chọn điểm xuất phát để không bao giờ cạn pin.
- **Dòng tiền vòng (circular cash flow):** chọn tháng bắt đầu chu kỳ ngân sách sao cho số dư không âm.
- **Buffer/stream:** nhà sản xuất – tiêu thụ trên vòng lặp, tìm pha bắt đầu để buffer không underflow.

## Lỗi thường gặp

- Quên kiểm tra `total < 0` và trả về `start` – khi vô nghiệm `start` có thể bằng `n` hoặc một trạm sai.
- Đặt `start = i` thay vì `i + 1`: trạm `i` cũng đã bị loại theo bổ đề.
- Quên reset `tank = 0` sau khi đổi `start`.
- So sánh `tank <= 0` thay vì `< 0`: tới trạm kế với bình rỗng vẫn hợp lệ.
- Mô phỏng lại vòng tròn bằng `% n` sau khi tìm `start` – không cần, chứng minh đã đảm bảo.

## Biến thể

- **Kiểm tra mọi trạm xuất phát hợp lệ:** dùng tiền tố trên mảng nhân đôi + monotonic deque lấy min trong cửa sổ độ dài `n`.
- **Bình có dung tích giới hạn:** greedy không còn đúng nguyên vẹn, cần mô phỏng hoặc DP.
- **Minimum number of refueling stops (LeetCode 871):** đường thẳng, chọn ít trạm nhất ⇒ max-heap greedy.
- **Maximum Subarray / Kadane:** cùng tinh thần "tổng chạy âm thì bỏ hết và bắt đầu lại".
