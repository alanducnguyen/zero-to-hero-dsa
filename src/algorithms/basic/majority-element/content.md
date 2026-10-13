## Bài toán

Cho mảng `nums` có `n` phần tử. Biết rằng có một phần tử xuất hiện **nhiều hơn n/2 lần** (phần tử đa số). Tìm phần tử đó.

`[2, 2, 1, 1, 1, 2, 2]` → `2` (4/7 lần).

Cách hiển nhiên là HashMap đếm tần suất O(n) thời gian, O(n) bộ nhớ, hoặc sắp xếp rồi lấy `nums[n/2]` O(n log n). Người phỏng vấn muốn nghe **Boyer-Moore Voting**: O(n) thời gian, **O(1) bộ nhớ**.

## Ý tưởng / Trực giác

Tưởng tượng một cuộc "đấu tay đôi": mỗi phần tử khác ứng viên hiện tại triệt tiêu một phiếu của ứng viên. Nếu phiếu về 0, ứng viên bị loại và phần tử tiếp theo lên thay.

Phần tử đa số có **hơn một nửa** số phiếu, tức nhiều hơn tổng tất cả phần tử khác cộng lại. Dù mọi phần tử khác đều dồn vào triệt tiêu nó, nó vẫn còn dư ít nhất một phiếu ở cuối ⇒ ứng viên cuối cùng phải là nó.

## Thuật toán từng bước

1. `candidate = nums[0]`, `count = 0`.
2. Với mỗi `x`: nếu `count === 0` thì `candidate = x`. Sau đó `count += (x === candidate ? 1 : −1)`.
3. Trả về `candidate`.

Ở tab **Debug**, ô xanh lá là phần tử trùng ứng viên (cộng phiếu), ô đỏ là phần tử triệt tiêu (trừ phiếu), ô tím là lúc đổi ứng viên. Chọn preset "Đổi ứng viên nhiều lần" để thấy ứng viên sai bị loại dần.

## Chứng minh đúng

Chia mảng thành các đoạn tại các vị trí `count` về 0. Trong mỗi đoạn (trừ đoạn cuối), ứng viên của đoạn xuất hiện đúng một nửa số phần tử (mỗi phiếu + bị một phiếu − triệt tiêu). Vậy trong các đoạn đã đóng, **không phần tử nào chiếm quá một nửa**. Gọi `M` là phần tử đa số với `> n/2` lần toàn mảng. Nếu `M` không phải ứng viên cuối, thì trong đoạn cuối `M` xuất hiện ≤ một nửa (vì không phải ứng viên mà count > 0) và trong các đoạn trước cũng ≤ một nửa ⇒ `M` ≤ n/2 toàn mảng, mâu thuẫn. Vậy ứng viên cuối là `M`.

Lưu ý: thuật toán **giả định** phần tử đa số tồn tại. Nếu không chắc, cần một lượt đếm thứ hai để xác minh.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| Boyer-Moore Voting | O(n) | O(1) |
| HashMap đếm | O(n) | O(n) |
| Sắp xếp, lấy nums[n/2] | O(n log n) | O(1)–O(n) |
| Chia để trị | O(n log n) | O(log n) |
| Bit counting (mỗi bit đếm số 1) | O(32·n) | O(1) |

## Tradeoff

- Boyer-Moore tối ưu nhưng chỉ đúng khi đa số tồn tại; thêm O(n) xác minh nếu không chắc.
- HashMap tổng quát hơn (tìm mọi phần tử > n/k, không cần giả định) nhưng tốn bộ nhớ.
- Sắp xếp đơn giản khi mảng đã sắp sẵn (lúc đó O(1): lấy phần tử giữa).

## Lợi / Hại

**Lợi:** một lượt, không bộ nhớ phụ, chạy được trên luồng dữ liệu (streaming), mở rộng sang `> n/k` với `k−1` ứng viên. **Hại:** dễ dùng sai khi đề không đảm bảo đa số; chứng minh không hiển nhiên nên cần giải thích rõ trong phỏng vấn.

## Use case thực tế

- Phát hiện giá trị trội trong luồng sự kiện (heavy hitter) khi không thể lưu bảng đếm: log, telemetry, mạng (Misra-Gries là tổng quát hoá).
- Đồng thuận phân tán: tìm giá trị được đa số replica trả về trong một lượt đọc.
- Nén/loại nhiễu: lấy "màu nền" chiếm đa số của một vùng ảnh.
- Tính "mode" nhanh trong tiền xử lý dữ liệu khi biết có giá trị áp đảo.

## Lỗi thường gặp

- Quên giả định: dùng cho mảng không có đa số rồi tin kết quả ⇒ trả về giá trị vô nghĩa.
- Khởi tạo `count = 1` và bắt đầu từ `i = 1` nhưng vẫn xét `nums[0]` ⇒ lệch một phiếu.
- Trong biến thể `> n/3`, chỉ giữ một ứng viên.
- Nhầm "nhiều nhất" (mode) với "nhiều hơn n/2": mode không có bảo đảm, Boyer-Moore sai.

## Biến thể

- **Majority Element II (229):** phần tử `> n/3` – tối đa 2 ứng viên, 2 bộ đếm, sau đó xác minh.
- **Tổng quát `> n/k`:** `k−1` ứng viên (Misra-Gries), một lượt xác minh.
- **Mảng đã sắp xếp (1150):** nhị phân tìm vị trí đầu của `target`, kiểm tra `nums[pos + n/2] === target`.
- **Luồng dữ liệu:** cùng thuật toán, chỉ cần O(1) trạng thái.
