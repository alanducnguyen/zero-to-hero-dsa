## Bài toán

Cho mảng `nums` gồm **n + 1** số nguyên, mỗi số nằm trong đoạn **[1, n]**. Theo nguyên lý chuồng bồ câu, chắc chắn có ít nhất một số xuất hiện từ hai lần trở lên; đề bảo đảm chỉ có **đúng một giá trị** bị lặp (nhưng nó có thể lặp nhiều lần). Hãy trả về giá trị đó với ràng buộc khắt khe:

- **Không được sửa mảng** (không sort, không đánh dấu âm).
- Chỉ dùng **O(1) bộ nhớ phụ** (không HashSet).
- Thời gian tốt hơn O(n²).

Ví dụ: `[1, 3, 4, 2, 2]` → `2`; `[3, 1, 3, 4, 2]` → `3`.

> Trang **"Nhiều lời giải"** (mục So sánh) của bài này đặt cạnh nhau HashSet, Sort, Binary Search trên giá trị và Floyd – giúp bạn thấy vì sao chỉ Floyd thoả cả ba ràng buộc.

## Ý tưởng / Trực giác

Mẹo then chốt: **coi mảng là một danh sách liên kết ngầm**. Mỗi chỉ số `i` là một node, và có cạnh `i → nums[i]`. Vì mọi giá trị nằm trong [1, n] nên mỗi cạnh luôn trỏ tới một chỉ số hợp lệ – đi mãi không bao giờ "rơi khỏi mảng".

- Có n + 1 node nhưng chỉ n đích khác nhau ⇒ đi từ node 0 chắc chắn sẽ lặp lại một node ⇒ đường đi có dạng chữ **ρ (rho)**: một đoạn "đuôi" rồi vào một chu trình.
- Không giá trị nào bằng 0 ⇒ không ai trỏ về node 0 ⇒ node 0 luôn nằm ở đuôi, không nằm trong chu trình.
- Node **điểm vào chu trình** có hai mũi tên trỏ tới: một từ node cuối của đuôi, một từ node cuối của chu trình. Hai mũi tên = hai chỉ số khác nhau có cùng giá trị ⇒ **điểm vào chu trình chính là số trùng**.

Vậy bài toán trở thành *Linked List Cycle II* (LeetCode 142): tìm điểm vào chu trình bằng thuật toán rùa – thỏ của Floyd.

## Thuật toán từng bước

1. **Giai đoạn 1 – tìm điểm gặp.** `slow = fast = nums[0]`. Lặp: `slow = nums[slow]` (1 bước), `fast = nums[nums[fast]]` (2 bước) cho đến khi `slow === fast`.
2. **Giai đoạn 2 – tìm điểm vào.** Đưa `slow` về đầu (`nums[0]`), giữ `fast` ở điểm gặp. Cả hai cùng đi 1 bước một lần cho đến khi gặp nhau.
3. Node gặp nhau ở giai đoạn 2 là điểm vào chu trình ⇒ trả về nó.

Dùng `do…while` ở giai đoạn 1 vì lúc đầu `slow === fast`; vòng `while` thường sẽ thoát ngay.

## Chứng minh đúng

**Giai đoạn 1 chắc chắn dừng.** Khi cả hai đã ở trong chu trình độ dài `c`, mỗi vòng fast tiến thêm 2, slow tiến 1 ⇒ khoảng cách (đo theo chiều đi) từ fast tới slow giảm đúng 1. Khoảng cách giảm từng đơn vị nên không thể "nhảy qua" – sau tối đa `c` vòng sẽ về 0.

**Giai đoạn 2 – lập luận khoảng cách.** Đặt:

- `a` = số bước từ điểm xuất phát tới điểm vào chu trình,
- `b` = số bước từ điểm vào tới điểm gặp (đi theo chiều chu trình),
- `c` = độ dài chu trình.

Khi gặp, slow đã đi `a + b` bước, fast đi `a + b + k·c` bước (đã quay thêm k vòng). Vì fast nhanh gấp đôi:

`2(a + b) = a + b + k·c` ⇒ `a + b = k·c` ⇒ **`a = k·c − b = (k − 1)·c + (c − b)`**.

Diễn giải: từ điểm gặp, đi thêm `c − b` bước là về điểm vào, rồi quay thêm `k − 1` vòng trọn vẫn ở điểm vào. Tức là **đi `a` bước từ điểm gặp cũng dừng đúng ở điểm vào**. Trong khi đó con trỏ được đưa về đầu cũng cần đúng `a` bước để tới điểm vào. Hai con trỏ cùng tốc độ ⇒ chúng gặp nhau lần đầu tiên chính tại điểm vào (trước đó con trỏ từ đầu còn ở trên đuôi, không thể trùng node trong chu trình).

(Ở code, "điểm xuất phát" là `nums[0]` chứ không phải node 0 – cả hai con trỏ đều dịch đi một bước nên lập luận không đổi.)

## Độ phức tạp

| Thước đo | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | Giai đoạn 1 ≤ a + c vòng, giai đoạn 2 = a vòng, a + c ≤ n + 1 |
| Bộ nhớ | O(1) | Chỉ hai biến slow, fast |
| Sửa mảng | Không | Chỉ đọc `nums[i]` |

## Tradeoff

- **HashSet**: O(n) thời gian nhưng O(n) bộ nhớ – vi phạm ràng buộc.
- **Sort**: O(n log n) và phải sửa mảng (hoặc copy O(n)).
- **Binary search trên giá trị** (đếm số phần tử ≤ mid): O(1) bộ nhớ, không sửa mảng nhưng O(n log n).
- **Floyd**: tối ưu cả ba, đổi lại khó nghĩ ra và khó giải thích – chỉ áp dụng được nhờ ràng buộc "giá trị trong [1, n]".

## Lợi / Hại

**Lợi:** O(n)/O(1), chỉ đọc; code ngắn (~10 dòng); kỹ thuật tái sử dụng được cho mọi "hàm lặp" `x → f(x)` trên tập hữu hạn.

**Hại:** phụ thuộc hoàn toàn vào ràng buộc miền giá trị – nếu có số 0 hoặc số > n thì đồ thị không còn hợp lệ. Không tìm được *tất cả* số trùng nếu có nhiều giá trị lặp. Ít trực quan, dễ sai thứ tự khởi tạo.

## Use case thực tế

- **Pollard's rho** phân tích thừa số nguyên tố dùng đúng phát hiện chu trình Floyd trên dãy `x → x² + c mod n`.
- Phát hiện chu kỳ của bộ sinh số ngẫu nhiên giả (PRNG) hoặc hàm băm lặp, với bộ nhớ hằng.
- Phát hiện vòng lặp trong danh sách liên kết, chuỗi con trỏ (ví dụ chuỗi symlink, chuỗi redirect) khi không muốn lưu tập đã thăm.

## Lỗi thường gặp

- Khởi tạo `slow = 0, fast = 0` rồi dùng `while (slow !== fast)` ⇒ vòng lặp không chạy lần nào. Hãy dùng `do…while` hoặc khởi tạo lệch.
- Giai đoạn 2 đưa slow về `0` nhưng giai đoạn 1 lại xuất phát từ `nums[0]` (hoặc ngược lại) ⇒ lệch một bước, trả sai. Hai giai đoạn phải dùng **cùng điểm xuất phát**.
- Trả về điểm gặp của giai đoạn 1 – đó chỉ là một node bất kỳ trong chu trình, chưa chắc là số trùng.
- Ở giai đoạn 2 vẫn cho fast đi 2 bước.

## Biến thể

- **LeetCode 142 – Linked List Cycle II**: cùng thuật toán trên danh sách liên kết thật.
- **LeetCode 202 – Happy Number**: phát hiện chu trình của hàm "tổng bình phương chữ số".
- **LeetCode 41/448/442**: các bài "số trong [1, n]" khác – khi *được phép* sửa mảng, dùng đánh dấu âm hoặc cyclic sort.
- **Brent's algorithm**: thay rùa–thỏ bằng lũy thừa của 2, ít lần gọi `f` hơn trung bình.
