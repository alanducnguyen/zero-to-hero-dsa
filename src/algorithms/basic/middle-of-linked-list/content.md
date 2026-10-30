## Bài toán

Cho `head` của một danh sách liên kết đơn (singly linked list), trả về **node ở giữa**. Nếu số node là chẵn thì có hai node giữa – đề LeetCode 876 yêu cầu trả về **node giữa thứ hai**. Ví dụ: `1→2→3→4→5` trả về `3`; `1→2→3→4→5→6` trả về `4`.

Trong bài học này, đầu vào là một mảng số; hàm dựng danh sách liên kết từ mảng rồi trả về giá trị của node giữa (hoặc `null` nếu danh sách rỗng).

## Ý tưởng / Trực giác

Cách "ngây thơ": duyệt một lần để đếm độ dài `n`, rồi duyệt thêm `⌊n/2⌋` bước. Đúng, nhưng phải đi hai lượt. Có cách chỉ cần **một lượt**:

Hãy tưởng tượng hai người chạy trên cùng một đường đua: **rùa (slow)** đi 1 bước mỗi nhịp, **thỏ (fast)** đi 2 bước. Khi thỏ về đích, rùa mới đi được đúng **một nửa** quãng đường – tức là đang đứng ở giữa. Đây chính là kỹ thuật **fast/slow pointers** (còn gọi là tortoise and hare), nền tảng của nhiều bài linked list khác như phát hiện vòng (Floyd), tìm điểm bắt đầu vòng, kiểm tra palindrome.

Điểm mấu chốt: ta không cần biết `n`. Chênh lệch tốc độ tự "đo" độ dài giúp ta.

## Thuật toán từng bước

1. Đặt `slow = head`, `fast = head`.
2. Trong khi `fast != null` **và** `fast.next != null`:
   - `slow = slow.next` (1 bước)
   - `fast = fast.next.next` (2 bước)
3. Khi vòng lặp dừng, `slow` là node giữa. Trả về `slow` (ở đây là `slow.val`).

Điều kiện vòng lặp kiểm tra cả `fast` và `fast.next` vì `fast` nhảy 2 bước: nếu `fast.next` là `null` thì `fast.next.next` sẽ gây lỗi truy cập null.

## Chứng minh đúng

Đánh số các node từ 0 đến `n − 1`. **Bất biến**: sau `k` vòng lặp, `slow` ở vị trí `k` và `fast` ở vị trí `2k` (nếu `2k ≥ n` thì `fast` là `null`).

Vòng lặp chạy khi cả vị trí `2k` và `2k + 1` đều tồn tại, tức `2k + 1 ≤ n − 1`, hay `k ≤ (n − 2) / 2`. Vòng lặp dừng tại `k` nhỏ nhất thoả `2k + 1 ≥ n`, tức `k = ⌊n/2⌋`.

- `n` lẻ, `n = 2m + 1`: dừng tại `k = m`, `fast` ở node cuối `2m`. `slow` ở vị trí `m` – chính giữa.
- `n` chẵn, `n = 2m`: dừng tại `k = m`, `fast` là `null`. `slow` ở vị trí `m` – node giữa **thứ hai** (hai node giữa là `m − 1` và `m`).

Vậy `slow` luôn ở chỉ số `⌊n/2⌋`, đúng yêu cầu đề.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ |
|---|---|---|
| Tốt nhất | O(n) | O(1) |
| Trung bình | O(n) | O(1) |
| Xấu nhất | O(n) | O(1) |

Số vòng lặp là `⌊n/2⌋`, mỗi vòng đọc 3 con trỏ ⇒ tổng số lần truy cập node ≈ 1.5n, tương đương cách đếm hai lượt. Lợi ích không nằm ở số phép toán mà ở chỗ **một lượt duyệt** – quan trọng khi dữ liệu là stream hoặc khi bài toán đòi hỏi làm thêm việc trên đường đi. (Phần dựng danh sách từ mảng trong bài học tốn thêm O(n) bộ nhớ cho chính danh sách, không tính vào thuật toán.)

## Tradeoff

- **Đếm hai lượt** dễ hiểu, dễ điều chỉnh để lấy node giữa thứ nhất hay thứ hai, nhưng phải duyệt lại từ đầu.
- **Chuyển sang mảng** (`nodes.push(...)` rồi lấy `nodes[n/2]`) cho truy cập ngẫu nhiên nhưng tốn O(n) bộ nhớ.
- **Fast/slow** dùng O(1) bộ nhớ, một lượt, nhưng cần cẩn thận điều kiện dừng để chọn đúng node giữa.

## Lợi / Hại

**Lợi:**
- O(1) bộ nhớ, không sửa danh sách.
- Một lượt duyệt, dễ kết hợp với các bước khác (vd. đảo nửa sau khi kiểm tra palindrome).
- Code ngắn, ít chỗ sai nếu nhớ đúng điều kiện.

**Hại:**
- Lệch một (off-by-one) giữa node giữa thứ nhất và thứ hai rất dễ nhầm.
- Không áp dụng trực tiếp cho danh sách có vòng (fast sẽ không bao giờ gặp null).

## Use case thực tế

- **Merge Sort trên linked list** (LeetCode 148): cần tách danh sách làm đôi – fast/slow là cách chuẩn để tìm điểm cắt.
- **Kiểm tra palindrome** (LeetCode 234): tìm giữa, đảo nửa sau, so sánh hai nửa.
- **Reorder List** (LeetCode 143): tìm giữa, đảo nửa sau, đan xen.
- Xử lý dữ liệu dạng stream/iterator chỉ đọc một chiều, nơi không thể biết trước độ dài.

## Lỗi thường gặp

- Chỉ kiểm tra `fast.next != null` mà quên `fast != null` ⇒ lỗi khi số node chẵn (fast thành null).
- Dùng điều kiện `fast.next != null && fast.next.next != null` ⇒ trả về node giữa **thứ nhất**, sai yêu cầu LeetCode 876 (nhưng lại đúng khi cần cắt danh sách cho Merge Sort).
- Quên xử lý danh sách rỗng (`head = null`).
- Di chuyển `fast` trước rồi mới kiểm tra, dẫn đến truy cập `null.next`.

## Biến thể

- **Node giữa thứ nhất**: khởi tạo `fast = head.next` hoặc đổi điều kiện vòng lặp thành `fast.next && fast.next.next`.
- **Delete the Middle Node** (LeetCode 2095): cần giữ `prev` của slow để xoá.
- **Phát hiện vòng** (LeetCode 141/142): cùng cặp con trỏ, nhưng dừng khi `slow === fast`.
- **Node thứ k từ cuối**: hai con trỏ cùng tốc độ nhưng lệch nhau k bước – họ hàng gần của kỹ thuật này.
