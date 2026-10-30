## Bài toán

Thiết kế lớp `StockSpanner` với hàm `next(price)`: giá cổ phiếu đến **từng ngày một**, mỗi lần trả về **span** của hôm nay – số ngày liên tiếp, đi lùi từ hôm nay (tính cả hôm nay), có giá **≤** giá hôm nay.

Ví dụ giá `[100, 80, 60, 70, 60, 75, 85]` ⇒ span `[1, 1, 1, 2, 1, 4, 6]`. Ngày giá 75: lùi qua 60, 70, 60 (đều ≤ 75) rồi gặp 80 > 75 ⇒ span 4.

Trong bài học này, input là mảng `prices` được "nạp" lần lượt; ta trả về mảng các span. Điểm mấu chốt: lời giải phải là **online** – trả lời ngày i chỉ dựa vào quá khứ, vì tương lai chưa tồn tại.

## Ý tưởng / Trực giác

Brute force: mỗi ngày lùi từng bước cho tới khi gặp giá lớn hơn ⇒ O(n) mỗi lần, O(n²) tổng (giá tăng dần là trường hợp xấu nhất).

Nhận xét: nếu hôm qua giá 70 có span 2 (tức 2 ngày gần nhất đều ≤ 70), và hôm nay giá 75 ≥ 70, thì cả 2 ngày đó chắc chắn ≤ 75 – **không cần kiểm tra lại từng ngày**, chỉ cần "nhảy" qua cả khối. Vậy lưu mỗi ngày dưới dạng cặp `[giá, span]` và gộp khối.

Hơn nữa, một ngày có giá ≤ giá hôm nay sẽ **không bao giờ** là ngày "chặn" span cho tương lai: ngày hôm nay vừa cao hơn vừa gần hơn. Vứt nó đi ⇒ những gì còn lại tạo thành **monotonic stack giảm nghiêm ngặt** – các "đỉnh núi" nhìn từ hiện tại về quá khứ.

Hình dung đứng trên một ngọn núi nhìn về phía sau: những đồi thấp hơn bị che khuất; chỉ ngọn núi đầu tiên cao hơn bạn mới chặn tầm nhìn.

## Thuật toán từng bước

1. `stack = []` chứa cặp `[giá, span]`.
2. Với mỗi `price`:
   - `span = 1`.
   - Trong khi đỉnh stack có giá `≤ price`: pop và `span += span của đỉnh`.
   - Push `[price, span]`, trả về `span`.

Tab **Debug**: hàng `prices` tô vàng các ngày còn làm đại diện trong stack; dải cyan là khối ngày mà span hôm nay bao phủ; stack hiển thị `[giá, span]` từng phần tử.

## Chứng minh đúng

**Bất biến:** sau khi xử lý ngày i, stack (từ đáy lên) chứa các ngày d₁ < d₂ < … < dₖ = i với giá giảm nghiêm ngặt, và span lưu cùng dⱼ bằng `dⱼ − dⱼ₋₁` (d₀ = −1): mọi ngày trong khoảng (dⱼ₋₁, dⱼ] có giá ≤ giá dⱼ.

**Ngày mới i+1 với giá p:** các đỉnh có giá ≤ p bị pop; khối của chúng đều ≤ giá đỉnh ≤ p nên thuộc span. Dừng khi đỉnh dⱼ có giá > p (hoặc stack rỗng): đó chính là ngày gần nhất có giá lớn hơn p, vì mọi ngày giữa dⱼ và i+1 nằm trong các khối vừa pop, đều ≤ p. Vậy span = (i+1) − dⱼ, đúng bằng 1 + tổng span đã pop. Push `[p, span]` giữ bất biến (giá dⱼ > p ⇒ vẫn giảm nghiêm ngặt).

**Độ phức tạp amortized:** mỗi ngày được push đúng 1 lần, pop tối đa 1 lần ⇒ tổng số thao tác ≤ 2n.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Brute force lùi từng ngày | O(n) mỗi next, O(n²) tổng | O(n) lưu lịch sử |
| **Monotonic stack [giá, span]** | **O(1) amortized**, O(n) tổng | O(n) xấu nhất (giá giảm dần) |
| Một lần next tệ nhất | O(n) (pop cả stack) | |

## Tradeoff

- **Lưu `[giá, span]` ↔ lưu chỉ số ngày:** lưu chỉ số (như Daily Temperatures) cần thêm biến đếm ngày và tính `i − chỉ số đỉnh`; lưu span thì tự chứa, không cần bộ đếm toàn cục. Cả hai đều O(n).
- **Amortized ↔ worst-case mỗi lần:** một lần `next` có thể pop cả stack (O(n)). Hệ thống real-time cần độ trễ ổn định có thể không chấp nhận; khi đó dùng sparse table/segment tree trên lịch sử (O(log n) mỗi lần) nhưng phức tạp hơn nhiều.
- **`≤` ↔ `<`:** đề dùng "≤" nên giá bằng nhau phải bị gộp; dùng `<` sẽ ra span sai với giá trùng.

## Lợi / Hại

**Lợi**
- Online thật sự: không cần biết tương lai.
- O(1) amortized, code chưa tới 10 dòng.
- Stack tự nén: các đồi thấp bị loại vĩnh viễn.

**Hại**
- O(n) bộ nhớ khi giá giảm liên tục.
- Không trả lời được truy vấn tuỳ ý về quá khứ (ví dụ span của ngày 5 tính lại sau khi có ngày 10).
- Độ trễ từng lần không ổn định (amortized).

## Use case thực tế

- **Phân tích kỹ thuật tài chính:** span là chỉ báo "giá hôm nay cao nhất trong bao nhiêu phiên", dùng cho breakout detection, chỉ báo Aroon.
- **Giám sát hệ thống (monitoring):** "CPU/latency hiện tại cao nhất trong bao nhiêu mẫu gần đây" – phát hiện đỉnh mới trên stream metric mà không lưu lại toàn bộ cửa sổ.
- **Đồ hoạ / skyline:** "toà nhà này nhìn thấy được bao nhiêu toà phía trước" (line-of-sight).
- **Streaming analytics:** tính "record high" trên luồng dữ liệu (nhiệt độ, doanh số) theo thời gian thực.

## Lỗi thường gặp

1. Dùng `<` thay vì `≤` khi so sánh đỉnh ⇒ sai khi có giá bằng nhau.
2. Chỉ lưu giá, không lưu span ⇒ mất thông tin số ngày bị gộp, phải lưu chỉ số và bộ đếm.
3. Quên bắt đầu `span = 1` (tính cả hôm nay).
4. Nghĩ rằng vòng `while` lồng trong `for` là O(n²) – phải lập luận amortized.
5. Lưu toàn bộ lịch sử và lùi từng ngày ⇒ TLE với 10⁴ lần gọi giá tăng dần.

## Biến thể

- **Daily Temperatures (739):** cùng monotonic stack nhưng nhìn về **tương lai** (offline), lưu chỉ số.
- **Next Greater Element I/II (496, 503):** phiên bản tổng quát, có bản mảng vòng.
- **Largest Rectangle in Histogram (84):** với mỗi cột, tìm phần tử nhỏ hơn gần nhất cả hai phía.
- **Sum of Subarray Minimums (907):** span trái/phải để đếm số subarray mà phần tử là min.
