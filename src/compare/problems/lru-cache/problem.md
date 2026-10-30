## Đề bài

Thiết kế cấu trúc **LRU Cache** (Least Recently Used) với dung lượng `capacity`:

- `get(key)` – trả giá trị nếu key có trong cache, ngược lại trả `-1`. Một lần `get` thành công tính là **dùng** key đó.
- `put(key, value)` – thêm hoặc cập nhật key (cũng tính là dùng). Nếu số key vượt `capacity`, **loại key lâu nhất chưa được dùng**.

Yêu cầu của LeetCode: `get` và `put` đều chạy **O(1) trung bình**.

Ở trang này input là danh sách thao tác (`"put k v"`, `"get k"`); mỗi lời giải trả về mảng kết quả: `null` cho `put`, giá trị (hoặc `-1`) cho `get`.

```
capacity = 2
put 1 1, put 2 2, get 1, put 3 3, get 2, put 4 4, get 1, get 3, get 4
→ [null, null, 1, null, -1, null, -1, 3, 4]
```

`put 3 3` loại key 2 (vì `get 1` vừa làm 1 thành mới hơn); `put 4 4` loại key 1.

## Ràng buộc

- `1 ≤ capacity ≤ 3000`, tối đa `2·10⁵` lời gọi `get`/`put`.
- Key và value là số nguyên không âm (trang này cho phép cả số âm).

## Câu hỏi nên hỏi lại người phỏng vấn

- `put` một key đã có có tính là "dùng" không? (Có – nó phải thành mới nhất.)
- Cần thread-safe không? Có TTL (hết hạn theo thời gian) không?
- Được dùng thư viện có sẵn (`LinkedHashMap`, `OrderedDict`, `Map` của JS) hay phải tự cài cấu trúc?
