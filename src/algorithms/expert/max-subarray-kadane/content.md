## Bài toán

Cho mảng số nguyên (có âm), tìm **subarray liên tiếp** có tổng lớn nhất. `[-2,1,-3,4,-1,2,1,-5,4]` → `6` (`[4,-1,2,1]`).

LeetCode 53 là bài "Easy" được hỏi ở mọi công ty, nhưng Amazon và Microsoft dùng nó để đi sâu: tại sao Kadane đúng, liên hệ với DP và prefix sum, mở rộng sang tích, vòng tròn, 2D. Nắm bài này là nắm được cách **nén một mảng DP thành một biến**.

## Ý tưởng / Trực giác

Đi từ trái sang phải, tại mỗi vị trí `i` hỏi: "subarray tốt nhất **kết thúc tại i** là gì?" Chỉ có hai lựa chọn: nối tiếp subarray tốt nhất kết thúc tại `i−1`, hoặc bắt đầu mới từ `nums[i]`. Nối tiếp chỉ có lợi khi tổng cũ **≥ 0**; nếu âm thì nó chỉ kéo ta xuống – bỏ đi và bắt đầu lại.

`current = max(nums[i], current + nums[i])`, `best = max(best, current)`.

Đó là DP với `dp[i] = max(nums[i], dp[i−1] + nums[i])`, nhưng vì `dp[i]` chỉ cần `dp[i−1]`, ta giữ một biến. Đáp án là `max(dp)`, không phải `dp[n−1]` – vì subarray tốt nhất có thể kết thúc ở giữa.

**Góc nhìn prefix sum:** tổng `[l..r] = P[r+1] − P[l]`. Tối đa hoá ⇔ với mỗi `r`, trừ đi `P[l]` **nhỏ nhất** phía trước. Kadane chính là việc theo dõi "min prefix" ngầm: bắt đầu lại ⇔ prefix hiện tại là min mới.

## Thuật toán từng bước

1. `current = best = nums[0]`.
2. Với `i = 1..n−1`: `current = max(nums[i], current + nums[i])`; `best = max(best, current)`.
3. Trả `best`.

Tab **Debug**: vùng cyan là subarray hiện tại (kết thúc tại `i`), vùng xanh lá là best. Preset "Toàn số âm" cho thấy vì sao phải khởi tạo bằng `nums[0]` chứ không phải 0.

## Chứng minh đúng

**Định nghĩa:** `dp[i]` = tổng lớn nhất của subarray kết thúc đúng tại `i`.

**Công thức:** subarray kết thúc tại `i` hoặc chỉ gồm `nums[i]`, hoặc gồm `nums[i]` nối sau một subarray kết thúc tại `i−1`; trong trường hợp sau, chọn subarray tốt nhất kết thúc tại `i−1` (optimal substructure) ⇒ `dp[i] = max(nums[i], dp[i−1] + nums[i])`.

**Đáp án:** mọi subarray kết thúc ở đâu đó ⇒ `max_i dp[i]` là tối ưu toàn cục.

**Tại sao khởi tạo bằng `nums[0]`:** nếu khởi tạo `best = 0`, mảng toàn âm sẽ trả 0 – ứng với subarray rỗng, không hợp lệ.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Kadane | O(n) / O(1) | Một lượt, hai biến |
| Brute force | O(n²) | Mọi cặp (l, r) với prefix sum; O(n³) nếu không có prefix |
| Chia để trị | O(n log n) | Max của trái, phải, và băng qua giữa – LeetCode gợi ý làm thêm |
| Prefix sum + min | O(n) / O(n) | Tương đương Kadane nhưng tốn mảng |

## Tradeoff

- **Kadane ↔ Chia để trị:** D&C chậm hơn nhưng song song hoá được và mở rộng cho segment tree (truy vấn max subarray trên đoạn bất kỳ với cập nhật điểm).
- **O(1) ↔ Truy vết:** để trả về chính subarray, giữ thêm `curStart` và `bestRange` (vẫn O(1)).
- **Kadane ↔ Prefix sum:** Kadane gọn cho "max tổng"; prefix sum + HashMap tổng quát hơn: "tổng = k", "tổng chia hết cho k", "dài nhất có tổng 0" – những bài Kadane không giải được.
- **Tổng ↔ Tích:** tích có số âm làm "nhỏ nhất" thành "lớn nhất" khi nhân âm ⇒ giữ cả `maxEnd` và `minEnd` (Maximum Product Subarray).
- **Subarray rỗng có được phép không?** Nếu được, khởi tạo `best = 0`; nếu không, `nums[0]`. Hỏi người phỏng vấn.

## Lợi / Hại

**Lợi**
- Tuyến tính, O(1) bộ nhớ, 5 dòng code.
- Online: xử lý stream, luôn có đáp án cho tiền tố hiện tại.
- Khung mở rộng: tích, vòng tròn, 2D, k phần tử, với ràng buộc độ dài.

**Hại**
- Chỉ cho "max tổng liên tiếp"; ràng buộc độ dài tối thiểu/tối đa hoặc "tổng = k" cần prefix sum / deque.
- Không hỗ trợ cập nhật và truy vấn đoạn (cần segment tree).

## Use case thực tế

- **Tài chính:** lợi nhuận lớn nhất mua–bán một lần = Kadane trên mảng chênh lệch giá ngày (Best Time to Buy and Sell Stock).
- **Xử lý tín hiệu / sinh học:** tìm đoạn gen có "điểm" cao nhất (maximum scoring segment), phát hiện vùng bất thường trong chuỗi thời gian.
- **Đồ hoạ / thị giác máy tính:** maximum sum rectangle 2D (Kadane trên từng cặp hàng) tìm vùng sáng nhất.
- **Hệ thống:** cửa sổ thời gian có throughput/độ trễ bất thường nhất trong log.
- **Game / thể thao:** chuỗi trận "phong độ" tốt nhất.

## Lỗi thường gặp

1. Khởi tạo `best = 0` ⇒ sai với mảng toàn âm.
2. `current = max(0, current + nums[i])` – biến thể cho phép subarray rỗng; sai nếu đề không cho phép.
3. Trả `current` thay vì `best`.
4. Cập nhật `best` trước `current`.
5. Mảng rỗng không xử lý (`nums[0]` undefined).
6. Mở rộng sang tích mà chỉ giữ max ⇒ sai với số âm.

## Biến thể

- **Trả subarray:** theo dõi `curStart`, cập nhật `bestRange` khi `best` tăng.
- **Maximum Product Subarray (152):** giữ `maxEnd`, `minEnd`; khi `nums[i] < 0` hoán đổi.
- **Circular (918):** `max(kadane, total − minSubarray)`; cẩn thận khi toàn âm.
- **Max sum rectangle 2D:** với mỗi cặp hàng (top, bottom), nén cột thành mảng 1D, Kadane ⇒ O(m²·n).
- **Độ dài ≥ k / ≤ k:** prefix sum + min prefix cách k / deque đơn điệu.
- **Subarray Sum Equals K (560):** prefix sum + HashMap đếm.
- **Best Time to Buy and Sell Stock (121):** Kadane trên `price[i] − price[i−1]`, hoặc min-so-far.
