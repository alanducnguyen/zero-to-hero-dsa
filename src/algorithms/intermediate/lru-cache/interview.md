## Cách trình bày trong phỏng vấn

1. Nêu yêu cầu O(1) cho cả tìm và sắp thứ tự ⇒ "HashMap + doubly linked list" ngay trong 30 giây đầu.
2. Vẽ hình: head ↔ n1 ↔ n2 ↔ tail, map trỏ vào từng node.
3. Viết hai hàm phụ `unlink`, `pushFront` trước, rồi `get`, `put` – code sạch, ít lặp.
4. Chạy tay test chuẩn capacity 2: put 1, put 2, get 1, put 3 (loại 2), get 2 → −1.
5. Nêu biến thể JS `Map` giữ thứ tự chèn như cách ngắn hơn, và LFU như follow-up.

## Phiên bản ngắn với Map của JS (nên biết)

```ts
class LRU {
  private m = new Map<number, number>();
  constructor(private cap: number) {}
  get(k: number): number {
    if (!this.m.has(k)) return -1;
    const v = this.m.get(k)!;
    this.m.delete(k); this.m.set(k, v);          // làm mới: đưa về cuối (mới nhất)
    return v;
  }
  put(k: number, v: number): void {
    if (this.m.has(k)) this.m.delete(k);
    else if (this.m.size === this.cap) this.m.delete(this.m.keys().next().value!); // đầu = cũ nhất
    this.m.set(k, v);
  }
}
```

## Câu hỏi follow-up thường gặp

- **Tại sao cần doubly linked list?** Để tháo một node ở giữa trong O(1) khi có con trỏ tới nó; singly cần biết node trước ⇒ O(n).
- **Tại sao không dùng mảng?** Chuyển phần tử lên đầu là O(n).
- **Sentinel để làm gì?** Loại bỏ kiểm tra null cho head/tail; `unlink` và `pushFront` luôn hợp lệ.
- **LFU khác gì?** Loại key ít dùng nhất; cần Map tần suất → danh sách, và `minFreq`; O(1) nhưng phức tạp gấp đôi.
- **Thread-safe?** Mutex toàn cục đơn giản; tốt hơn: shard theo hash của key, hoặc ghi log truy cập và cập nhật thứ tự theo lô (Caffeine).
- **Phân tán?** Mỗi node một LRU cục bộ + consistent hashing để định tuyến key; hoặc Redis với `maxmemory-policy allkeys-lru` (Redis dùng LRU xấp xỉ bằng lấy mẫu).
- **Khi nào LRU tệ?** Workload quét tuần tự lớn hơn cache: mọi entry bị đẩy ra, hit rate ≈ 0. Dùng LFU/ARC/2Q.
- **TTL?** Lưu thời điểm hết hạn; kiểm tra lazily khi get; dọn định kỳ bằng heap theo expireAt nếu cần.
- **Thống kê hit/miss?** Hai bộ đếm; hit rate để điều chỉnh capacity.

## Checklist nhận diện pattern

- "O(1) cho get và put với eviction theo thứ tự sử dụng" ⇒ Map + doubly linked list.
- "O(1) cho thêm/xoá/lấy ngẫu nhiên" ⇒ Map + mảng với swap-remove (380).
- "O(1) cho tăng/giảm đếm và lấy max/min key" ⇒ Map + danh sách bucket (432).
- "Giữ thứ tự chèn + tra cứu nhanh" ⇒ ordered map (JS Map, Python dict, LinkedHashMap).

## Bài luyện tập liên quan

- 146 LRU Cache → 460 LFU Cache (Hard) → 432 All O`one Data Structure (Hard).
- 380 Insert Delete GetRandom O(1), 381 với trùng lặp.
- 705/706 Design HashSet/HashMap, 1797 Design Authentication Manager (TTL).
