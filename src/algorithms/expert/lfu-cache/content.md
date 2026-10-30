## Bài toán

Thiết kế cache dung lượng `capacity` với `get(key)` và `put(key, value)` đều **O(1)** (LeetCode 460, Hard). Khi đầy, cache loại key **ít được dùng nhất** (Least Frequently Used). Nếu nhiều key cùng tần suất thấp nhất, loại key **lâu không dùng nhất** trong nhóm đó (LRU để phá hoà). Cả `get` trúng lẫn `put` (thêm mới hoặc ghi đè) đều tính là một lần dùng.

Ví dụ capacity 2: `put 1, put 2, get 1, put 3` loại key 2 (freq 1 < freq 2 của key 1). Tiếp theo `get 3, put 4`: key 1 và 3 cùng freq 2, key 1 được dùng lâu hơn nên bị loại.

## Ý tưởng / Trực giác

**So với LRU:** LRU chỉ cần một trục là "dùng gần đây". Một danh sách (hoặc `Map` giữ thứ tự) là đủ: cuối danh sách là nạn nhân. LFU có **hai trục**: tần suất trước, thời gian sau. Không thể xếp mọi key vào một danh sách duy nhất rồi "đẩy lên" trong O(1) như LRU, vì khi freq tăng 1, key phải nhảy qua cả nhóm key cùng freq mới.

Lời giải là **phân nhóm theo tần suất**:
- `entries: Map<key, {value, freq}>` để tra cứu O(1).
- `buckets: Map<freq, Set<key>>`: mỗi tần suất là một nhóm. `Set` của JS **giữ thứ tự chèn**, nên phần tử đầu Set là key lâu không dùng nhất trong nhóm. Mỗi bucket chính là một LRU thu nhỏ.
- `minFreq`: tần suất nhỏ nhất hiện có, chỉ thẳng tới bucket chứa nạn nhân mà không cần quét.

Khi một key được dùng, ta xoá nó khỏi bucket `f` và thêm vào **cuối** bucket `f+1`. Thao tác này O(1) vì `Set.delete`/`Set.add` là O(1).

## Thuật toán từng bước

- `touch(key)`: lấy `f = entry.freq`; xoá key khỏi `buckets[f]`. Nếu bucket rỗng thì xoá bucket, và nếu `minFreq == f` thì `minFreq++`. Sau đó `freq++`, rồi thêm key vào cuối `buckets[f+1]`.
- `get(key)`: không có thì trả −1 (miss không đổi tần suất của ai). Có thì `touch`, trả value.
- `put(key, value)`:
  1. Key đã có: cập nhật value, `touch`, xong. Không loại ai vì số key không đổi.
  2. Key mới và cache đầy: `victim =` phần tử đầu của `buckets[minFreq]`; xoá khỏi bucket (bucket rỗng thì xoá luôn) và khỏi `entries`.
  3. Thêm `{value, freq: 1}` vào cuối `buckets[1]`; đặt `minFreq = 1`.

Tab **Debug** hiển thị `entries` (value và freq) và `buckets` theo thứ tự tần suất; trong mỗi bucket, key bên trái là key bị loại trước.

## Chứng minh đúng

**Bất biến:**
1. Mỗi key trong `entries` nằm đúng trong `buckets[entry.freq]` và không có bucket rỗng.
2. Trong mỗi bucket, thứ tự Set là thứ tự lần dùng gần nhất tăng dần.
3. Khi cache khác rỗng, `minFreq` là tần suất nhỏ nhất trong các bucket.

- `touch` chuyển key sang `f+1` và thêm vào cuối, nên giữ (1) và (2) (key vừa dùng là mới nhất trong nhóm mới). Với (3): chỉ khi bucket `minFreq` biến mất thì `minFreq` mới phải đổi, và giá trị mới đúng bằng `f+1` vì key vừa được đặt vào đó.
- Loại nạn nhân: theo (3) bucket `minFreq` chứa các key ít dùng nhất; theo (2) phần tử đầu là key lâu không dùng nhất trong nhóm. Đây đúng là định nghĩa LFU kèm phá hoà bằng LRU.
- Thêm key mới với freq 1: không key nào có freq < 1, nên `minFreq = 1` đúng (3), kể cả ngay sau khi loại nạn nhân. Vì thế ta không cần tìm lại `minFreq` sau khi loại.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| get / put | O(1) | Vài thao tác Map/Set, `minFreq` chỉ tăng 1 hoặc gán 1 |
| Bộ nhớ | O(capacity) | Mỗi key nằm trong 1 entry và 1 bucket |
| Dùng heap theo (freq, time) | O(log n) | Cách "dễ nghĩ" nhưng không đạt O(1) |
| Quét tìm min khi loại | O(n) | Sai yêu cầu |

## Tradeoff

- **LFU ↔ LRU:** LRU phản ứng nhanh với thay đổi xu hướng nhưng bị một lần **quét** (scan) đẩy sạch dữ liệu nóng. LFU giữ được key "nóng lâu dài" và chống scan, nhưng mắc **cache pollution**: key từng rất hot giờ không ai dùng vẫn chiếm chỗ vì freq cao. Key mới (freq 1) thì luôn là ứng viên bị loại đầu tiên.
- **Set có thứ tự ↔ doubly linked list mỗi bucket:** ngôn ngữ không có ordered set (C++, Java cũ) phải dùng `Map<freq, DLL>` cộng `Map<key, node>`, nên code dài gấp đôi. Java có `LinkedHashSet`, Python có `OrderedDict`.
- **O(1) chính xác ↔ xấp xỉ:** Redis `allkeys-lfu` dùng bộ đếm logarit 8-bit và giảm dần theo thời gian (decay), lấy mẫu thay vì cấu trúc chính xác. Rẻ hơn nhiều và chống pollution.
- **Window-TinyLFU (Caffeine):** bộ lọc tần suất Count-Min Sketch + một LRU nhỏ làm cửa sổ cho key mới. Đây là thực tiễn tốt nhất hiện nay.

## Lợi / Hại

**Lợi**
- O(1) thật sự cho cả hai thao tác.
- Hit rate cao với workload có tập key nóng ổn định (phân bố Zipf).
- Chống scan tốt hơn LRU.

**Hại**
- Phức tạp hơn LRU: ba cấu trúc phải đồng bộ.
- Không có cơ chế "quên" nên key cũ có freq cao chiếm chỗ mãi.
- Key mới dễ bị loại ngay trước khi kịp tích tần suất.

## Use case thực tế

- **Redis** `maxmemory-policy allkeys-lfu` / `volatile-lfu` (LFU xấp xỉ, có decay).
- **Caffeine (Java), Ristretto (Go):** TinyLFU làm admission policy.
- **CDN:** giữ nội dung phổ biến bền vững (video viral, asset tĩnh).
- **Cache truy vấn database, cache mô hình ML** với tập request lặp lại nhiều.

## Lỗi thường gặp

1. `put` key đã có nhưng không tăng freq, hoặc lại kiểm tra đầy rồi loại nhầm một key khác.
2. Quên tăng `minFreq` khi bucket `minFreq` rỗng sau `touch`, khiến lần loại sau tra bucket không tồn tại.
3. Quên đặt `minFreq = 1` khi thêm key mới.
4. Không xoá bucket rỗng, làm rò bộ nhớ và `minFreq` trỏ vào bucket trống.
5. Phá hoà sai: lấy phần tử cuối Set (mới nhất) thay vì đầu.
6. `capacity = 0`: `put` phải không làm gì, nếu không sẽ truy cập bucket không tồn tại.

## Biến thể

- **LRU Cache (146):** chỉ một trục thời gian.
- **LFU với decay / TTL:** chia đôi bộ đếm định kỳ để key cũ "nguội" dần.
- **All O`one (432):** bucket theo đếm với danh sách đôi các bucket, lấy được cả min lẫn max key.
- **Maximum Frequency Stack (895):** `Map<freq, stack>` + `maxFreq`, là đối xứng của `minFreq`.
- **ARC, 2Q, LIRS:** kết hợp tín hiệu recency và frequency.
