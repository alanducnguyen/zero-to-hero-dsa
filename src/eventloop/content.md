## Event loop là gì

Node.js chạy JavaScript trên **một thread** (main thread với V8). Nhưng server Node vẫn phục vụ hàng nghìn kết nối đồng thời – nhờ **event loop** của libuv: thread chính không bao giờ chờ I/O, nó chỉ *đăng ký* việc và *callback* khi việc xong. Event loop là vòng lặp quyết định **callback nào chạy tiếp theo**.

Câu hỏi "đoạn code này in ra thứ tự gì?" xuất hiện ở hầu hết vòng phỏng vấn backend Node. Trả lời đúng cần hiểu ba tầng ưu tiên: **call stack → nextTick/microtask → các phase của libuv**.

## Ba tầng ưu tiên

1. **Call stack (đồng bộ):** code đang chạy. Event loop chỉ được chạy khi stack rỗng. Code chặn (vòng lặp bận, JSON.parse 50 MB, crypto đồng bộ) làm **mọi thứ** phải chờ.
2. **Hàng đợi ưu tiên** – chạy ngay sau mỗi callback xong, *trước khi* quay lại loop:
   - `process.nextTick` queue – drain **trước**.
   - Microtask queue (promise `.then/.catch/.finally`, `queueMicrotask`, `await`) – drain sau.
   - Node lặp: drain nextTick → drain microtask → nếu nextTick lại có thì lặp. Microtask sinh microtask chạy **ngay trong lượt** ⇒ có thể "bỏ đói" event loop.
3. **Các phase của event loop (macrotask):** mỗi vòng đi qua 6 phase theo thứ tự cố định.

## Sáu phase của libuv

| Phase | Chạy gì | Ghi chú |
|---|---|---|
| **timers** | callback `setTimeout` / `setInterval` đã **hết hạn** | Thứ tự: theo thời điểm hết hạn, rồi theo thứ tự đăng ký. `setTimeout(0)` thực ra là 1ms |
| **pending callbacks** | I/O callback bị hoãn từ vòng trước (vd lỗi TCP `ECONNREFUSED`) | Hiếm gặp trong code ứng dụng |
| **idle, prepare** | nội bộ libuv | bỏ qua |
| **poll** | lấy I/O **mới** hoàn tất (file, socket, DNS) và chạy callback. Nếu không có gì và không có `setImmediate` ⇒ **ngủ** chờ sự kiện hoặc timer sớm nhất | Đây là nơi Node "idle" không tốn CPU |
| **check** | `setImmediate` | Ngay sau poll ⇒ trong I/O callback, `setImmediate` luôn chạy trước `setTimeout(0)` |
| **close callbacks** | `socket.on('close')`, `process.on('exit')`-ish | |

Sau **mỗi** callback trong bất kỳ phase nào (từ Node 11), nextTick và microtask queue được drain. Trước Node 11, chúng chỉ drain giữa các phase – nguồn gốc của nhiều câu trả lời cũ trên mạng.

## Vì sao `setTimeout(0)` vs `setImmediate` không xác định ở script chính

Timer 0ms được Node ép thành 1ms. Khi script chính kết thúc và loop bắt đầu ở phase timers, nếu máy đã mất ≥ 1ms (thường vậy) timer đã hết hạn ⇒ `timeout` trước. Nếu máy quá nhanh (< 1ms), timer chưa hết hạn ⇒ poll → check chạy `immediate` trước, timer chạy vòng sau. Trong **I/O callback** thì xác định: đang ở poll ⇒ check đến trước timers.

Preset "Thứ tự kinh điển" mô phỏng trường hợp thường gặp (timeout trước) và ghi chú rõ điều này.

## Mô phỏng trên trang này

- Mỗi preset là một đoạn code Node thật (bạn có thể copy chạy bằng `node file.js`); trình mô phỏng đi từng dòng và hiển thị call stack, nextTick/microtask queue, các hàng đợi timers / I/O / immediate, phase đang chạy và đồng hồ ảo `now`.
- Test của repo **chạy chính đoạn code đó bằng Node thật** và so sánh output với mô phỏng, nên thứ tự bạn thấy là thứ tự Node in ra (trừ điểm không xác định đã nói).
- Dùng phím `→` để đi từng bước; đọc ghi chú "tại sao" dưới visual.

## Lỗi thường gặp

- **Dùng `process.nextTick` đệ quy** để "đợi" ⇒ event loop không bao giờ tới I/O; dùng `setImmediate` cho việc lặp lại.
- **Chặn thread chính**: `fs.readFileSync` trong request handler, `JSON.parse` lớn, regex thảm hoạ, vòng lặp tính toán nặng ⇒ mọi request khác bị treo. Đưa sang `worker_threads` hoặc chia nhỏ bằng `setImmediate`.
- **Tin `setTimeout(fn, 100)` chạy đúng 100ms**: nó chạy *không sớm hơn* 100ms, và chỉ khi loop tới phase timers.
- **Nhầm microtask với macrotask**: `await` tương đương `.then` ⇒ phần sau `await` là microtask, chạy trước mọi timer.
- **`setInterval` dồn đống** khi callback chậm hơn chu kỳ; dùng `setTimeout` đệ quy.
- **Unhandled rejection** chạy ở microtask ⇒ lỗi "biến mất" nếu không `catch`.

## Ví dụ thực tế

- **HTTP server:** mỗi request là I/O callback ở poll; handler chạy đồng bộ ngắn rồi `await` DB ⇒ loop phục vụ request khác trong lúc chờ. Một handler chặn 200ms = mọi client chờ 200ms.
- **Stream / pipe:** dữ liệu đến theo chunk ở poll; backpressure dựa trên việc callback trả về kịp.
- **DB driver (pg, mysql2):** socket I/O ở poll; promise resolve ở microtask ⇒ code sau `await query()` chạy trước bất kỳ timer nào.
- **Cron / job scheduler:** `setTimeout` dài bị trễ nếu loop bận; dùng `worker_threads` cho CPU-bound.
- **Benchmark / profiling:** `--prof`, `clinic doctor` đo "event loop lag" – chính là độ trễ của phase timers so với dự kiến.
- **Browser khác Node:** browser có task queue + microtask + rendering (requestAnimationFrame); không có nextTick, không có setImmediate (trừ IE), có nhiều task source.
