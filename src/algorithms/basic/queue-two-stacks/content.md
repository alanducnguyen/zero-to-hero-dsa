## Bài toán

Cài đặt queue (FIFO) chỉ bằng các thao tác stack chuẩn: `push`, `pop`, `peek`, `isEmpty`. Yêu cầu mỗi thao tác queue **amortized O(1)** (LeetCode 232).

Bài này nhỏ nhưng là câu hỏi "design" đầu tiên trong nhiều vòng phỏng vấn ở Amazon và Microsoft. Mục tiêu của người hỏi: bạn có hiểu **amortized analysis** không, và bạn có biết sự khác nhau giữa "mỗi thao tác O(1)" và "trung bình O(1) trên dãy thao tác" không.

## Ý tưởng / Trực giác

Stack đảo thứ tự: đẩy 1, 2, 3 vào rồi lấy ra được 3, 2, 1. Đảo **hai lần** thì về thứ tự cũ – đó là queue.

Dùng hai stack:
- `inbox`: mọi `push` vào đây.
- `outbox`: khi cần `pop`/`peek` mà `outbox` rỗng, đổ toàn bộ `inbox` sang (đảo thứ tự), rồi lấy từ đỉnh `outbox`.

Mẹo quan trọng: **chỉ đổ khi `outbox` rỗng**. Nếu `outbox` còn phần tử, chúng đã đúng thứ tự FIFO và cũ hơn mọi thứ trong `inbox` – lấy tiếp từ đó là đúng. Nhờ vậy mỗi phần tử được chuyển tối đa một lần trong đời.

## Thuật toán từng bước

- `push(x)`: `inbox.push(x)`.
- `shift()`: nếu `outbox` rỗng, `while inbox: outbox.push(inbox.pop())`.
- `pop()`: `shift()`; `outbox.pop()`.
- `peek()`: `shift()`; đỉnh `outbox`.

Tab **Debug**: hai stack cạnh nhau; khi `pop` gặp `outbox` rỗng, xem từng phần tử chuyển sang và thứ tự đảo. Preset "Xen kẽ" cho thấy `outbox` không rỗng thì không chuyển gì dù `inbox` có phần tử mới.

## Chứng minh đúng

**Bất biến:** dãy FIFO hiện tại (cũ → mới) = `outbox` đọc từ đỉnh xuống đáy, nối với `inbox` đọc từ đáy lên đỉnh.

- `push` thêm vào đỉnh `inbox` = cuối dãy – đúng.
- Khi `outbox` rỗng, đổ `inbox` sang: đáy `inbox` (cũ nhất) lên đỉnh `outbox` ⇒ `outbox` từ đỉnh xuống đáy đúng thứ tự cũ → mới, `inbox` rỗng – bất biến giữ.
- `pop` lấy đỉnh `outbox` = phần tử cũ nhất của dãy – đúng FIFO. Khi `outbox` không rỗng, mọi phần tử trong nó cũ hơn mọi phần tử trong `inbox` nên không cần đổ.

**Amortized O(1):** mỗi phần tử trải qua tối đa: 1 push vào `inbox`, 1 pop khỏi `inbox`, 1 push vào `outbox`, 1 pop khỏi `outbox` = 4 thao tác stack O(1). Dãy n thao tác queue tốn ≤ 4n ⇒ trung bình O(1), dù một `pop` lẻ có thể O(n).

## Độ phức tạp

| Thao tác | Worst case | Amortized |
|---|---|---|
| push | O(1) | O(1) |
| pop / peek | O(n) (khi phải đổ) | O(1) |
| Bộ nhớ | O(n) | |

## Tradeoff

- **Hai stack (amortized) ↔ Đổ qua lại mỗi lần (O(n) mỗi pop):** cách ngây thơ đổ `inbox` → `outbox` rồi đổ ngược lại sau mỗi `pop` là O(n) thật sự mỗi thao tác. Giữ phần tử ở `outbox` là toàn bộ bí quyết.
- **Amortized ↔ Worst-case đảm bảo:** hệ thống thời gian thực không chấp nhận một `pop` O(n) đột ngột. Có cách phức tạp hơn (real-time queue với lazy reversal) đạt worst-case O(1), nhưng hiếm cần.
- **Queue bằng hai stack ↔ Stack bằng hai queue (225):** chiều ngược lại tốn O(n) cho push hoặc pop, không có cách amortized O(1) tương tự – một câu hỏi so sánh thú vị.
- **Mảng vòng (circular buffer):** nếu được dùng mảng, circular queue O(1) worst-case và tiết kiệm bộ nhớ hơn; bài này cố tình giới hạn công cụ để kiểm tra tư duy.

## Lợi / Hại

**Lợi**
- Chỉ cần stack – hữu ích khi ngôn ngữ/thư viện/phần cứng chỉ cung cấp stack (hoặc stack là bất biến như trong lập trình hàm).
- Amortized O(1), code ngắn.
- Ví dụ giảng dạy chuẩn cho amortized analysis.

**Hại**
- Một `pop` lẻ có thể O(n).
- Gấp đôi bộ nhớ con trỏ so với circular buffer (thực tế không đáng kể).

## Use case thực tế

- **Lập trình hàm / cấu trúc bất biến:** "banker's queue" trong Okasaki – queue bằng hai list bất biến, dùng trong Clojure, Scala, Haskell.
- **Undo/redo hai chiều:** hai stack (undo, redo) – cùng họ hàng.
- **Message broker / batching:** gom message vào `inbox`, xử lý theo lô khi tiêu thụ.
- **Giới hạn phần cứng:** vi điều khiển có stack phần cứng, phần mềm cần hàng đợi sự kiện.
- **Phỏng vấn:** pattern "lazy evaluation – trì hoãn công việc tới khi cần" xuất hiện trong lazy deletion của heap, lazy propagation của segment tree.

## Lỗi thường gặp

1. Đổ `inbox` sang `outbox` mỗi lần `pop` kể cả khi `outbox` không rỗng ⇒ sai thứ tự (phần tử mới chèn lên trước phần tử cũ).
2. Đổ ngược `outbox` về `inbox` sau mỗi `pop` ⇒ đúng nhưng O(n) mỗi thao tác.
3. `peek` quên gọi `shift` ⇒ trả undefined dù queue không rỗng.
4. `isEmpty` chỉ kiểm tra một stack.
5. Nhầm "amortized O(1)" với "O(1) mỗi thao tác" khi trả lời người phỏng vấn.

## Biến thể

- **Stack bằng hai queue (225)** hoặc một queue (xoay sau mỗi push).
- **Min Stack (155):** stack phụ lưu min hiện tại – cùng tinh thần "cấu trúc phụ trợ".
- **Queue với max O(1):** hai stack, mỗi stack lưu kèm max tiền tố ⇒ Sliding Window Maximum bằng "max queue".
- **Circular Queue (622):** mảng vòng với head/tail.
- **Real-time queue (Hood–Melville):** worst-case O(1) bằng đảo dần từng bước.
