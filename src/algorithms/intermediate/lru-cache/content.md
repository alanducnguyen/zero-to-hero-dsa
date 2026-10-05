## Bài toán

Thiết kế cache có dung lượng `capacity` với hai thao tác **O(1)**:
- `get(key)`: trả giá trị nếu có, ngược lại −1; đánh dấu key vừa được dùng.
- `put(key, value)`: thêm/cập nhật; nếu vượt dung lượng, **loại key lâu không dùng nhất** (Least Recently Used).

LRU Cache (LeetCode 146) là bài design được hỏi nhiều nhất ở Amazon và Meta. Nó kiểm tra bạn có **ghép hai cấu trúc dữ liệu** để bù khuyết điểm của nhau không: HashMap tìm nhanh nhưng không có thứ tự; linked list giữ thứ tự nhưng tìm chậm.

## Ý tưởng / Trực giác

Cần hai thứ cùng lúc:
1. Tìm key ⇒ O(1): **HashMap**.
2. Biết key nào cũ nhất và "làm mới" một key ⇒ O(1): **doubly linked list** theo thứ tự sử dụng (đầu = mới nhất, cuối = cũ nhất). Cần **doubly** để tháo một node ở giữa trong O(1) khi đã có con trỏ tới nó.

Map lưu `key → node`. Mọi lần dùng: tháo node khỏi chỗ cũ, gắn lên đầu. Khi đầy: node ở cuối là nạn nhân.

Hai **sentinel** `head`, `tail` loại bỏ mọi kiểm tra null khi danh sách rỗng hoặc node ở biên.

## Thuật toán từng bước

- `get(key)`: tra map; không có ⇒ −1. Có ⇒ `unlink(node)`, `pushFront(node)`, trả `node.value`.
- `put(key, value)`: nếu có ⇒ cập nhật value, unlink + pushFront. Nếu không: nếu `size == capacity` ⇒ `lru = tail.prev`, unlink, xoá khỏi map. Tạo node, pushFront, ghi map.

Tab **Debug**: danh sách hiển thị MRU → LRU, Map bên dưới; node đỏ là node vừa bị loại hoặc vừa chuyển lên đầu. Ví dụ mặc định là test chuẩn LeetCode (kết quả 1, −1, −1, 3, 4).

## Chứng minh đúng

**Bất biến:** (1) `map` và danh sách chứa cùng tập key; (2) danh sách sắp theo thời điểm sử dụng gần nhất giảm dần từ head.

- `get` có key: chuyển node lên đầu ⇒ (2) giữ vì node vừa thành mới nhất; tập key không đổi ⇒ (1).
- `put` key cũ: tương tự + cập nhật value.
- `put` key mới khi đầy: `tail.prev` theo (2) là node cũ nhất ⇒ loại đúng nạn nhân LRU; xoá cả map và danh sách ⇒ (1). Thêm node mới lên đầu ⇒ (2).
- Mọi thao tác là số hữu hạn phép gán con trỏ và một thao tác Map ⇒ O(1).

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| get / put | O(1) | Map O(1) + ≤ 6 phép gán con trỏ |
| Bộ nhớ | O(capacity) | Mỗi entry: 1 node + 1 map entry |
| Nếu dùng mảng/`Array.splice` | O(n) | Sai yêu cầu |

## Tradeoff

- **JS `Map` giữ thứ tự chèn:** có thể cài LRU chỉ bằng `Map` (xoá rồi set lại để làm mới; `map.keys().next()` là cũ nhất) – gọn, O(1) amortized, nhưng người phỏng vấn thường muốn thấy linked list để chắc bạn hiểu cơ chế. Nêu cả hai.
- **LRU ↔ LFU ↔ FIFO ↔ Random:** LRU tốt với locality thời gian; LFU chống "quét một lần" (scan) nhưng phức tạp (O(1) cần bucket tần suất); FIFO đơn giản nhưng kém; ARC/2Q kết hợp. Chọn theo pattern truy cập.
- **Sentinel ↔ Kiểm tra null:** sentinel tốn 2 node nhưng loại bỏ 4–6 nhánh điều kiện – luôn đáng.
- **Thread-safety:** một khoá toàn cục đơn giản nhưng nghẽn; cache thực tế (Caffeine, Guava) dùng sharding hoặc ghi lại lịch sử truy cập theo lô để tránh cập nhật danh sách mỗi lần get.
- **Giá trị lớn:** lưu con trỏ/tham chiếu, không copy; TTL cần thêm timestamp và dọn dẹp.

## Lợi / Hại

**Lợi**
- Mọi thao tác O(1) thật sự.
- Heuristic LRU đơn giản và hiệu quả với hầu hết workload có locality.
- Mẫu "Map + linked list" tái dùng cho LFU, All O(1), ordered dict.

**Hại**
- Mỗi `get` phải sửa danh sách (ghi) – tốn hơn cache chỉ đọc, và là điểm nghẽn khi đa luồng.
- Bị "quét" phá: một lần duyệt dữ liệu lớn đẩy hết entry nóng ra ngoài.
- Tốn bộ nhớ con trỏ (2 con trỏ + map entry mỗi phần tử).

## Use case thực tế

- **Page cache của hệ điều hành, buffer pool của database** (InnoDB, PostgreSQL dùng biến thể LRU/clock).
- **CDN và HTTP cache, Redis `allkeys-lru`, Memcached:** eviction policy mặc định.
- **CPU cache:** pseudo-LRU bằng bit cây.
- **Trình duyệt:** cache ảnh, tab bị discard theo LRU.
- **Memoization có giới hạn:** `functools.lru_cache` của Python.
- **Cache kết quả truy vấn, session store, DNS resolver.**

## Lỗi thường gặp

1. Dùng singly linked list ⇒ không tháo node giữa trong O(1).
2. Quên cập nhật thứ tự khi `get` (chỉ cập nhật khi `put`) ⇒ không còn là LRU.
3. `put` key đã có nhưng vẫn kiểm tra đầy và loại node ⇒ loại nhầm.
4. Khi loại node, xoá khỏi danh sách nhưng quên xoá khỏi map (hoặc ngược lại) ⇒ rò rỉ hoặc trả giá trị ma.
5. Không có sentinel ⇒ lỗi null khi danh sách rỗng hoặc node ở đầu/cuối.
6. Cài bằng mảng + `indexOf`/`splice` ⇒ O(n).

## Biến thể

- **LFU Cache (460):** Map key → node, Map tần suất → danh sách đôi; theo dõi `minFreq`.
- **LRU với TTL:** thêm `expireAt`, kiểm tra khi get; dọn dẹp lazily.
- **LRU bằng `Map` của JS:** delete + set để làm mới; `keys().next().value` là LRU.
- **Clock / Second-chance:** xấp xỉ LRU với bit tham chiếu, dùng trong OS vì rẻ hơn.
- **2Q / ARC / LIRS:** chống scan, dùng trong database.
- **All O(1) (432), Insert Delete GetRandom O(1) (380):** cùng tư duy ghép cấu trúc.
