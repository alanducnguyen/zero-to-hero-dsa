## Cách trả lời câu "in ra thứ tự gì"

1. Gạch chân mọi lệnh **đồng bộ** – chúng chạy trước hết, theo thứ tự xuất hiện.
2. Gom **nextTick** (chạy trước) và **promise/await** (chạy sau) – tất cả trước bất kỳ timer/I/O nào. Nhớ: microtask sinh trong lúc drain cũng chạy luôn.
3. Còn lại là macrotask: timers (theo hết hạn) → poll (I/O) → check (immediate). Nếu callback nằm **trong** callback khác, áp dụng lại từ bước 1 tại thời điểm callback đó chạy.
4. Nêu rõ điểm không xác định (timeout 0 vs immediate ở top-level) – người phỏng vấn muốn nghe câu này.

## Câu hỏi thường gặp

- **Node có đơn luồng không?** JavaScript chạy một thread; nhưng libuv có thread pool (mặc định 4) cho file I/O, DNS, crypto, zlib; network I/O dùng OS async (epoll/kqueue/IOCP) không cần thread. `UV_THREADPOOL_SIZE` tăng tới 1024.
- **Khác nhau nextTick và setImmediate?** Tên ngược với ý nghĩa: `nextTick` chạy *ngay* sau callback hiện tại (trước loop); `setImmediate` chạy ở phase check của vòng hiện tại. Dùng `setImmediate` để nhường loop, `nextTick` để chạy trước I/O (hiếm khi cần).
- **Khi nào dùng nextTick?** Đảm bảo callback chạy bất đồng bộ nhưng trước mọi I/O – ví dụ emit event sau khi constructor xong để listener kịp gắn. Lạm dụng ⇒ bỏ đói I/O.
- **await chạy ở đâu?** Phần sau `await` được lên lịch như `.then` ⇒ microtask. `await` giá trị không phải promise vẫn tốn một microtask tick.
- **Tại sao setTimeout không chính xác?** Timer chỉ được kiểm tra ở phase timers; nếu loop bận ở callback khác, timer trễ. Độ trễ này là "event loop lag".
- **Làm sao không chặn loop với CPU-bound?** `worker_threads`, child process, chia nhỏ bằng `setImmediate` giữa các lô, hoặc native addon async.
- **Thứ tự timer cùng delay?** Theo thứ tự đăng ký. Timer khác delay: theo thời điểm hết hạn.
- **setImmediate vs setTimeout(0) trong I/O callback?** Immediate luôn trước: đang ở poll, phase tiếp theo là check; timer phải chờ vòng sau.
- **Promise.resolve().then vs process.nextTick – ai trước?** nextTick, kể cả khi then đăng ký trước.
- **Browser vs Node?** Browser: macrotask (task sources), microtask, render pipeline (rAF); không nextTick/setImmediate. Semantics microtask tương tự.
- **Điều gì xảy ra khi throw trong callback?** Lỗi lan lên `process.on('uncaughtException')`; với promise là `unhandledRejection`. Mặc định Node ≥ 15 crash với unhandled rejection.
- **Event loop có kết thúc khi nào?** Khi không còn handle/request pending (timer, socket, I/O) – `server.listen` giữ loop sống; `timer.unref()` cho phép thoát dù timer còn.

## Bài tập tự kiểm tra (dự đoán rồi chạy preset)

1. Preset "Thứ tự kinh điển" – nếu bỏ `setImmediate`, thứ tự thay đổi thế nào? (không đổi phần đầu)
2. Preset "nextTick vs promise lồng nhau" – vì sao `promise trong t1` chạy trước `tick trong p1`? (nextTick trong p1 được đăng ký ở lượt microtask; Node quay lại drain nextTick sau khi microtask queue cạn)
3. Preset "Code chặn" – đổi `block 200ms` thành `block 50ms`, timer chạy lúc nào? (event loop ngủ tới 100ms rồi chạy)
4. Viết đoạn code có `await` và `setTimeout(0)` trong `async function` gọi từ top-level, dự đoán thứ tự.
