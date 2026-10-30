## Bài toán

Cho danh sách task, mỗi task là một chữ cái `A–Z` và chạy mất đúng 1 đơn vị thời gian. Hai task **cùng loại** phải cách nhau ít nhất `n` đơn vị (cooldown). Trong mỗi đơn vị, CPU chạy một task hoặc **idle**. Thứ tự task tuỳ ý. Tìm tổng thời gian nhỏ nhất để chạy hết (LeetCode 621).

Ví dụ `tasks = "AAABBB"`, `n = 2` ⇒ `A B idle A B idle A B` = **8**. Với `n = 0` thì không cần nghỉ ⇒ 6.

Bài này rất phổ biến ở Meta/Amazon vì có hai lời giải: mô phỏng bằng heap (dễ nghĩ ra) và **công thức greedy O(N)** (đẹp, nhưng cần lập luận chặt). Người phỏng vấn thường muốn thấy bạn giải thích được vì sao công thức đúng.

## Ý tưởng / Trực giác

Hãy nhìn vào task xuất hiện nhiều nhất, gọi số lần là `maxFreq`. Giữa hai lần chạy liên tiếp của nó phải có ít nhất `n` đơn vị khác ⇒ lịch dài tối thiểu `(maxFreq − 1)·(n + 1) + 1`. Task này là **nút cổ chai**.

**Hình ảnh khung (frame/slots):** vẽ một bảng `maxFreq` hàng × `(n + 1)` cột. Mỗi hàng là một chu kỳ. Đặt task nhiều nhất ở cột 0 của mọi hàng. Đọc bảng theo từng hàng từ trái sang phải sẽ được lịch: hai ô cùng cột ở hai hàng liên tiếp cách nhau đúng `n + 1` đơn vị ⇒ luôn thoả cooldown.

- Hàng cuối không cần đầy: lịch kết thúc ngay sau các task cũng đạt `maxFreq` lần. Nếu có `countMax` loại cùng đạt `maxFreq`, hàng cuối dài `countMax`.
- Các task còn lại (tần suất `≤ maxFreq − 1`) điền vào các ô trống **theo cột**, từ trên xuống, chỉ trong `maxFreq − 1` hàng đầu. Vì mỗi loại có ít hơn `maxFreq` bản sao, các bản sao rơi vào các hàng khác nhau ⇒ vẫn cách nhau ≥ n.
- Ô còn trống chính là **idle**.

Vậy độ dài lịch là `(maxFreq − 1)·(n + 1) + countMax`. Nhưng nếu có quá nhiều task, khung bị **tràn**: ta nới thêm cột cho mọi hàng – hàng dài hơn chỉ làm khoảng cách lớn hơn, vẫn hợp lệ, và không còn idle ⇒ đáp án là `tasks.length`. Kết hợp: `max((maxFreq − 1)·(n + 1) + countMax, tasks.length)`.

## Thuật toán từng bước

1. Đếm `freq` của từng loại task (tối đa 26 loại).
2. `maxFreq = max(freq)`.
3. `countMax` = số loại có `freq = maxFreq`.
4. `frameSlots = (maxFreq − 1)·(n + 1) + countMax`.
5. Trả `max(frameSlots, tasks.length)`.

Chạy tay `"AAABBC"`, `n = 2`: `maxFreq = 3` (A), `countMax = 1` ⇒ `2·3 + 1 = 7`. Khung: `A B C | A B idle | A` ⇒ 7, đúng một idle.

## Chứng minh đúng

**Cận dưới.** Mọi lịch phải chạy đủ `N = tasks.length` task ⇒ độ dài `≥ N`. Ngoài ra, xét `countMax` loại cùng đạt `maxFreq`. Mỗi loại `Y` trong số đó có `maxFreq − 1` khoảng giữa các lần chạy, mỗi khoảng ≥ `n + 1` ⇒ lần chạy cuối của `Y` ở vị trí ≥ `first(Y) + (maxFreq − 1)·(n + 1)`. Các lần chạy đầu `first(Y)` của `countMax` loại là các vị trí phân biệt ≥ 0, nên lớn nhất trong chúng ≥ `countMax − 1`. Vậy lịch kết thúc ở vị trí ≥ `(countMax − 1) + (maxFreq − 1)·(n + 1)`, tức độ dài ≥ `(maxFreq − 1)·(n + 1) + countMax`.

**Đạt được.** Cách điền khung ở trên tạo ra một lịch hợp lệ có độ dài đúng bằng `frameSlots` khi không tràn, hoặc `N` khi tràn. Vậy giá trị lớn hơn trong hai cận là tối ưu.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(N) | Một lượt đếm + duyệt ≤ 26 tần suất |
| Bộ nhớ | O(1) | Bảng đếm cố định 26 phần tử (Map nhỏ) |
| Mô phỏng heap | O(N log 26) ≈ O(N) | Nhưng hằng số lớn hơn, và tốn thêm số bước idle |

## Tradeoff

- **Công thức ↔ mô phỏng heap + hàng đợi cooldown:** công thức nhanh và ngắn, nhưng chỉ trả **độ dài**; mô phỏng (max-heap theo số lần còn lại, queue chứa task đang nghỉ) trả được **lịch cụ thể** và mở rộng được cho ràng buộc khác (thời gian chạy khác nhau, thứ tự cố định).
- **Dễ trình bày ↔ dễ chứng minh:** heap dễ thuyết phục là đúng bằng trực giác "chạy task còn nhiều nhất trước"; công thức cần hình ảnh khung để giải thích.
- **Chữ cái ↔ ID tuỳ ý:** với nhiều loại task, Map thay mảng 26 – vẫn O(N) thời gian, O(K) bộ nhớ.

## Lợi / Hại

**Lợi:**
- O(N), O(1) bộ nhớ, 5 dòng code.
- Hình ảnh khung giúp suy luận nhanh nhiều bài "sắp xếp cách nhau k" khác.

**Hại:**
- Không sinh lịch thực tế; muốn lịch phải dựng khung hoặc mô phỏng.
- Dễ quên `countMax` hoặc quên `max(…, tasks.length)` ⇒ sai im lặng ở một số test.

## Use case thực tế

- **Rate limiting / cooldown:** API cùng endpoint phải cách nhau ít nhất `n` giây; tính thời gian tối thiểu để hoàn tất batch.
- **CPU scheduling với cache/thermal cooldown:** tránh chạy liên tiếp cùng loại job nặng trên một core.
- **Lịch quảng cáo/nội dung:** cùng một quảng cáo không được hiển thị liên tục trong `n` lượt.
- **Sắp xếp xen kẽ:** sinh chuỗi không có hai ký tự giống nhau cạnh nhau (Reorganize String).

## Lỗi thường gặp

- Chỉ cộng 1 thay vì `countMax` ⇒ `"AAABBB"`, `n = 2` ra 7 thay vì 8.
- Quên `max(..., tasks.length)` ⇒ `"AAABCDEFG"`, `n = 2` ra 7 thay vì 9 (khung tràn).
- Nhầm khung dài `n` thay vì `n + 1` cột.
- Mô phỏng heap nhưng quên đưa task đang cooldown về heap đúng thời điểm, hoặc đếm idle ở cuối lịch.

## Biến thể

- **Reorganize String (767):** `n = 1`, cần trả chuỗi; khả thi khi `maxFreq ≤ ⌈N/2⌉`.
- **Rearrange String k Distance Apart (358):** trả lịch cụ thể, không được idle ⇒ heap + queue.
- **Task Scheduler II (2365):** thứ tự task **cố định** ⇒ hash map lưu thời điểm sớm nhất được chạy lại.
- **Tasks có thời gian chạy khác nhau / nhiều CPU:** chuyển sang mô phỏng sự kiện với heap.
