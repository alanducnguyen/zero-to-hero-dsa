## Bài toán

Cho hai danh sách liên kết đã sắp xếp, trộn thành một danh sách sắp xếp bằng cách **nối lại các node có sẵn** (không tạo node mới).

LeetCode 21 là bài linked list "Easy" nhưng là bước xây dựng của Merge k Sorted Lists, Sort List (merge sort trên linked list) và xuất hiện rất đều ở Amazon, Microsoft. Hai kỹ thuật cần thể hiện: **dummy node** và **tail pointer**.

## Ý tưởng / Trực giác

Giống bước merge của Merge Sort: so hai đầu, lấy nhỏ hơn, tiến con trỏ bên đó. Với linked list, "lấy" nghĩa là nối `tail.next` vào node đó. Khi một bên hết, phần còn lại của bên kia đã sắp xếp và lớn hơn mọi thứ đã lấy ⇒ nối thẳng.

**Dummy node** là mẹo quan trọng: nếu không có, bước đầu phải kiểm tra "danh sách kết quả rỗng?" – dummy cho `tail` luôn có chỗ để nối, kết quả là `dummy.next`.

## Thuật toán từng bước

1. `dummy`, `tail = dummy`.
2. Khi cả `a` và `b` khác null: nối `tail.next` vào node nhỏ hơn (ưu tiên `a` khi bằng), tiến con trỏ đó và `tail`.
3. `tail.next = a ?? b`.
4. Trả `dummy.next`.

Tab **Debug**: ba con trỏ `a`, `b`, `tail`; danh sách vẽ từ dummy; node vàng đang so, node đỏ vừa nối.

## Chứng minh đúng

**Bất biến:** danh sách từ `dummy.next` tới `tail` sắp xếp, chứa đúng các node đã lấy khỏi `a`, `b`, và `tail.val ≤` mọi node còn lại trong `a`, `b`. Mỗi bước nối node nhỏ nhất còn lại ⇒ bất biến giữ. Khi một bên hết, nối phần kia (sắp xếp, ≥ tail) giữ sắp xếp và đủ node.

**Stable:** `a.val <= b.val` lấy `a` trước ⇒ phần tử bằng nhau giữ thứ tự (a trước b).

## Độ phức tạp

| | Giá trị |
|---|---|
| Thời gian | O(n + m) – mỗi node xét một lần |
| Bộ nhớ | O(1) – chỉ dummy và con trỏ (đệ quy tốn O(n + m) stack) |

## Tradeoff

- **Lặp ↔ Đệ quy:** đệ quy 5 dòng rất đẹp nhưng O(n + m) stack; lặp O(1). Phỏng vấn: viết lặp, nêu đệ quy.
- **Nối node ↔ Tạo node mới:** nối node tiết kiệm bộ nhớ nhưng phá hai danh sách gốc; tạo mới giữ nguyên input.
- **Mảng ↔ Linked list:** merge mảng cần mảng phụ O(n + m) (hoặc merge từ cuối nếu có chỗ – LeetCode 88); linked list merge tại chỗ.

## Lợi / Hại

**Lợi:** O(1) bộ nhớ, stable, khối xây dựng cho Merge Sort O(1) bộ nhớ phụ trên linked list và k-way merge.
**Hại:** phá input; mỗi node một con trỏ nên cache kém hơn mảng.

## Use case thực tế

- **Merge log / stream theo timestamp:** hai luồng sự kiện sắp xếp gộp thành một.
- **Database merge join:** hai bảng sắp xếp theo khoá, hai con trỏ.
- **LSM-tree compaction:** gộp các SSTable sắp xếp (k-way merge với heap mở rộng từ bài này).
- **Git / diff3:** gộp hai danh sách thay đổi theo vị trí.

## Lỗi thường gặp

1. Không dùng dummy ⇒ xử lý case đầu danh sách sai hoặc dài dòng.
2. Quên tiến `tail` sau khi nối ⇒ ghi đè liên tục.
3. Quên nối phần còn lại ⇒ mất node.
4. Dùng `<` thay `<=` ⇒ mất stable.
5. Trả `dummy` thay vì `dummy.next`.

## Biến thể

- **Merge k Sorted Lists (23):** heap chứa đầu k danh sách, O(N log k); hoặc chia để trị gộp cặp.
- **Sort List (148):** tìm giữa bằng slow/fast, merge sort đệ quy, dùng hàm này để merge.
- **Merge Sorted Array (88):** merge từ cuối để tại chỗ.
- **Intersection / Union của hai danh sách sắp xếp:** cùng khung hai con trỏ.
