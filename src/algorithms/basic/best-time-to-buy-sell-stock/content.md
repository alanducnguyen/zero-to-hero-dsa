## Bài toán

Cho mảng `prices` với `prices[i]` là giá một cổ phiếu ở ngày `i`. Bạn được **mua đúng một lần** và **bán đúng một lần**, ngày bán phải **sau** ngày mua. Trả về lợi nhuận lớn nhất có thể; nếu không có cách nào lời thì trả về `0` (tức là không giao dịch).

Ví dụ: `prices = [7, 1, 5, 3, 6, 4]` ⇒ mua ngày 1 (giá 1), bán ngày 4 (giá 6), lời `5`. Với `[7, 6, 4, 3, 1]` giá chỉ giảm ⇒ đáp án `0`.

Về mặt toán học, ta cần `max(prices[j] − prices[i])` với `i < j`, và chặn dưới bởi 0.

## Ý tưởng / Trực giác

Brute force thử mọi cặp `(i, j)` – O(n²). Câu hỏi then chốt: **nếu tôi bán vào ngày `j`, tôi nên mua ngày nào?** Hiển nhiên là ngày có giá thấp nhất trong `prices[0..j−1]`. Vậy thay vì nhìn lại cả quá khứ ở mỗi ngày, ta chỉ cần **mang theo một con số**: `minPrice` – giá thấp nhất đã thấy cho tới giờ.

Đi từ trái sang phải, mỗi ngày làm hai việc:

1. Thử bán hôm nay: lời `prices[j] − minPrice`, cập nhật kỷ lục `best`.
2. Nếu giá hôm nay thấp hơn `minPrice`, nó trở thành "điểm mua tốt nhất" cho mọi ngày bán trong tương lai.

Đây là tư duy **greedy** (luôn giữ lựa chọn mua tốt nhất cục bộ) và cũng là **Kadane trá hình**: nếu đặt `diff[k] = prices[k] − prices[k−1]` thì lợi nhuận mua `i` bán `j` là tổng `diff[i+1..j]`, tức bài toán thành **Maximum Subarray** trên mảng chênh lệch. Việc "gặp đáy mới thì bắt đầu lại" chính là việc Kadane reset tổng khi nó âm.

## Thuật toán từng bước

1. `minPrice = ∞`, `best = 0`.
2. Với mỗi `i` từ `0` tới `n − 1`:
   - Nếu `prices[i] < minPrice`: gán `minPrice = prices[i]` (đáy mới; bán hôm nay lời 0 nên không cần xét `best`).
   - Ngược lại, nếu `prices[i] − minPrice > best`: gán `best = prices[i] − minPrice`.
3. Trả về `best`.

Chạy tay `[7, 1, 5, 3, 6, 4]`:

| i | giá | minPrice | lời nếu bán | best |
|---|-----|----------|-------------|------|
| 0 | 7 | 7 | – | 0 |
| 1 | 1 | 1 | – | 0 |
| 2 | 5 | 1 | 4 | 4 |
| 3 | 3 | 1 | 2 | 4 |
| 4 | 6 | 1 | 5 | 5 |
| 5 | 4 | 1 | 3 | 5 |

## Chứng minh đúng

**Bất biến:** sau khi xử lý ngày `j`, `minPrice = min(prices[0..j])` và `best = max(0, max_{i<k≤j}(prices[k] − prices[i]))`.

- Khởi tạo (trước ngày 0): không có cặp nào, `best = 0`, `minPrice = ∞` – đúng.
- Bước ngày `j`: mọi cặp mới là `(i, j)` với `i < j`. Cặp tốt nhất trong số đó là `prices[j] − min(prices[0..j−1])` – đây chính là giá trị `minPrice` **trước khi** cập nhật bằng `prices[j]`. Nếu `prices[j] < minPrice` thì lợi nhuận của mọi cặp kết thúc ở `j` là âm, nên bỏ qua không làm `best` sai. Sau đó cập nhật `minPrice` giữ bất biến thứ nhất.
- Kết thúc: `best` là max trên toàn bộ cặp, chặn dưới 0 – đúng đáp án.

Điểm mấu chốt của tính greedy: ta không bao giờ cần nhớ điểm mua cũ khi đã có đáy thấp hơn, vì với **mọi** ngày bán tương lai, mua ở đáy mới đều lời hơn hoặc bằng.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Brute force (mọi cặp) | O(n²) | O(1) |
| Prefix min (mảng phụ) | O(n) | O(n) |
| Một lượt + `minPrice` | **O(n)** | **O(1)** |

Mỗi phần tử chỉ được đọc một lần, không phụ thuộc dữ liệu – best = worst = O(n).

## Tradeoff

- So với mảng `prefixMin[]`: cùng O(n) nhưng một lượt + biến đơn tiết kiệm bộ nhớ và cache-friendly hơn; đổi lại khó trả lời truy vấn "đáy trước ngày k" cho k tùy ý.
- Muốn trả về **ngày mua/bán** thì phải lưu thêm `minIdx`, `buy`, `sell` – vẫn O(1).
- Phiên bản Kadane trên `diff[]` tổng quát hơn (dễ mở rộng sang DP trạng thái) nhưng kém trực quan khi trình bày lần đầu.

## Lợi / Hại

**Lợi:**
- Code 6 dòng, O(n)/O(1), xử lý được dữ liệu dạng **stream** (giá đến từng ngày) – không cần lưu lịch sử.
- Là cửa ngõ vào cả họ bài "Stock" dùng DP trạng thái.

**Hại:**
- Chỉ đúng cho **đúng một giao dịch**. Nhiều giao dịch, phí giao dịch, cooldown đều cần lời giải khác.
- Dễ mắc lỗi "mua sau khi bán" nếu lấy `max − min` toàn mảng.

## Use case thực tế

- Phân tích tài chính: **max drawup/drawdown** (mức tăng/giảm lớn nhất từ đáy tới đỉnh sau đó) – chính là bài này (hoặc bản đối xứng).
- Giám sát hệ thống: chênh lệch lớn nhất giữa một chỉ số và giá trị thấp nhất trước đó (ví dụ độ trễ tăng vọt so với baseline).
- Xử lý stream: bất kỳ chỉ số "giá trị hiện tại trừ min lịch sử" nào đều dùng đúng một biến chạy.

## Lỗi thường gặp

- Lấy `max(prices) − min(prices)` – sai khi đỉnh xuất hiện **trước** đáy (ví dụ `[9, 1]`).
- Khởi tạo `minPrice = prices[0]` mà không kiểm tra mảng rỗng.
- Trả về số âm khi giá giảm dần: đề yêu cầu `0` nếu không có lời, nên `best` phải bắt đầu từ `0`.
- Dùng `<=` thay vì `<` khi cập nhật `minPrice`: `best` vẫn đúng, nhưng nếu cần trả về ngày mua thì sẽ ra ngày muộn nhất trong các đáy bằng nhau – cần thống nhất với yêu cầu đề.

## Biến thể

- **LC 122 – Stock II** (giao dịch không giới hạn): cộng mọi `diff > 0`, greedy thuần.
- **LC 123 / 188 – tối đa k giao dịch:** DP trạng thái `buy[k]`, `sell[k]`.
- **LC 309 – cooldown**, **LC 714 – phí giao dịch:** máy trạng thái hold / not-hold / cooldown.
- **LC 53 – Maximum Subarray:** đúng Kadane, chính là bài này trên mảng chênh lệch.
- **Maximum difference `a[j] − a[i]` với `i < j`:** cùng lời giải, không chặn 0.
