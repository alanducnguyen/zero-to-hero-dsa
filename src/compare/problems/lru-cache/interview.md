## Kịch bản trình bày (10–15 phút)

1. **Làm rõ đề** (1 phút): `put` key cũ có làm mới không? Cần thread-safe? Được dùng `LinkedHashMap`/`OrderedDict`/`Map` không?
2. **Brute force** (1 phút): "Mảng + timestamp, evict bằng cách quét timestamp nhỏ nhất ⇒ O(n) mỗi thao tác." Không cần code.
3. **Tách hai nhu cầu** (2 phút): cần *tìm theo key* O(1) ⇒ HashMap; cần *đổi thứ tự và lấy phần tử cũ nhất* O(1) ⇒ danh sách liên kết **đôi** (tháo node giữa cần `prev`). HashMap trỏ thẳng vào node để nối hai cấu trúc.
4. **Code DLL + HashMap** (6–8 phút) với sentinel, tách helper `unlink` và `pushFront`. Nhấn mạnh: node lưu cả `key` để khi evict còn xoá khỏi map.
5. **Chạy tay** với capacity = 2 và đúng ví dụ của đề; kiểm tra ca `put` key đã tồn tại.
6. **Nhắc cách ngắn** (30s): "Trong JS/Java/Python có thể dùng Map giữ thứ tự chèn / `LinkedHashMap` / `OrderedDict` – cùng O(1), production tôi sẽ dùng nó." Hỏi người phỏng vấn có muốn bản đó không. Nhiều người sẽ nói rõ *muốn bản tự cài* – đó là lý do bản DLL là câu trả lời chính.

## Follow-up thường gặp

- **LFU Cache (LeetCode 460)?** Loại key dùng *ít lần nhất*, hoà thì LRU. HashMap key → node, HashMap tần suất → DLL các node cùng tần suất, giữ biến `minFreq`; mọi thao tác O(1).
- **Thread safety?** `get` cũng sửa danh sách nên `ReadWriteLock` không giúp – cần một mutex cho cả cache. Cải thiện: chia shard theo hash(key), mỗi shard một LRU + một khoá; hoặc ghi truy cập vào ring buffer và áp dụng theo lô (Caffeine, Guava).
- **TTL / hết hạn theo thời gian?** Lưu `expireAt` trong node, kiểm tra lười khi `get`, cộng thêm min-heap hoặc timing wheel để dọn chủ động.
- **Giới hạn theo dung lượng byte thay vì số key?** Giữ `totalBytes`, evict lặp từ cuối cho tới khi đủ chỗ.
- **Cache phân tán?** Consistent hashing để chia key cho node, mỗi node một LRU cục bộ; bàn về cache stampede, write-through/write-back.
- **Approximated LRU?** Redis lấy mẫu ngẫu nhiên vài key và loại key cũ nhất trong mẫu – đổi độ chính xác lấy bộ nhớ (không cần con trỏ cho mỗi key).

## Lỗi hay mắc

- Quên chuyển node lên đầu khi `get` thành công hoặc khi `put` key đã tồn tại.
- Evict trước khi kiểm tra key đã tồn tại ⇒ loại nhầm một key khi chỉ cần cập nhật.
- Node không lưu `key` ⇒ không biết xoá gì khỏi map khi evict.
- Với Map JS: chỉ `set` key đã có mà không `delete` trước ⇒ vị trí không đổi, key không thành MRU.
