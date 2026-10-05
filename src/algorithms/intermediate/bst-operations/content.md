## Bài toán

Cài ba thao tác trên **cây tìm kiếm nhị phân (BST)**: `insert`, `search`, `delete`. BST là cây nhị phân mà với mọi node, cây con trái chỉ chứa giá trị nhỏ hơn và cây con phải chỉ chứa giá trị lớn hơn.

BST là cấu trúc "cầu nối" giữa Binary Search (nhanh nhưng tĩnh) và HashMap (nhanh nhưng không có thứ tự). Phỏng vấn hỏi BST để kiểm tra đệ quy trên cây, xử lý **xoá node 2 con** (phần hay sai nhất), và hiểu **tại sao** thư viện dùng cây cân bằng (Red-Black, AVL) thay vì BST thường.

## Ý tưởng / Trực giác

BST là Binary Search được "vật chất hoá": thay vì chia đôi mảng, mỗi node là một điểm chia. Tìm `x`: so với gốc, nhỏ hơn đi trái, lớn hơn đi phải – mỗi bước loại một cây con. Nếu cây cân bằng, mỗi bước loại ~một nửa ⇒ O(log n).

- **Insert:** đi như tìm kiếm tới khi gặp null, đặt node mới ở đó. Vị trí này là duy nhất giữ tính chất BST mà không phải dời node khác.
- **Delete:** 0 con ⇒ bỏ; 1 con ⇒ "nối tắt" con lên; 2 con ⇒ không thể bỏ trống, thay giá trị bằng **successor** (nhỏ nhất của cây phải – nó lớn hơn mọi node trái và nhỏ hơn mọi node phải còn lại) rồi xoá successor (chắc chắn ≤ 1 con).

## Thuật toán từng bước

- `insert(root, v)`: null ⇒ node mới; `v < root.val` ⇒ `root.left = insert(root.left, v)`; `>` ⇒ phải; `=` ⇒ bỏ qua.
- `search(root, v)`: lặp đi trái/phải tới khi gặp hoặc null.
- `remove(root, v)`: tìm; 0/1 con ⇒ trả con còn lại; 2 con ⇒ `succ = min(root.right)`, `root.val = succ.val`, `root.right = remove(root.right, succ.val)`.

Tab **Debug**: node tím đang so sánh, node vàng trên đường tìm kiếm, node đỏ là node bị xoá/ghi đè, successor màu xanh. Preset "Cây lệch" cho thấy chèn dãy tăng dần tạo "danh sách liên kết" với h = n.

## Chứng minh đúng

**Insert giữ BST:** node mới được đặt tại null ở cuối đường đi mà mọi rẽ trái/phải đều đúng so sánh với tổ tiên ⇒ node mới thoả ràng buộc với mọi tổ tiên; không node nào khác thay đổi.

**Search đúng:** bất biến: nếu `v` có trong cây thì nó nằm trong cây con tại `node`. Rẽ theo so sánh loại bỏ cây con không thể chứa `v` (do tính chất BST).

**Delete giữ BST:**
- 0/1 con: thay node bằng con duy nhất; mọi giá trị trong cây con đó vẫn nằm đúng phía so với tổ tiên.
- 2 con: successor `s` = min cây phải ⇒ `left < s` (vì `s` ở cây phải nên lớn hơn mọi node trái) và `s < mọi node khác ở cây phải` (vì là min). Thay `root.val = s` giữ thứ tự; xoá `s` khỏi cây phải (s không có con trái) rơi về trường hợp 0/1 con.

## Độ phức tạp

| | Cây cân bằng | Cây lệch | Giải thích |
|---|---|---|---|
| insert / search / delete | O(log n) | O(n) | Chi phí = chiều cao h |
| Bộ nhớ đệ quy | O(log n) | O(n) | Phiên bản lặp O(1) |
| Inorder (duyệt có thứ tự) | O(n) | O(n) | |

Chèn ngẫu nhiên cho h ≈ 2.99 log₂ n kỳ vọng; chèn dữ liệu đã sắp xếp cho h = n – đó là lý do cần tự cân bằng.

## Tradeoff

- **BST ↔ HashMap:** HashMap O(1) trung bình cho get/put nhưng **không có thứ tự**: không min/max, không range query, không successor/predecessor, không duyệt có thứ tự. BST cho tất cả trong O(log n).
- **BST thường ↔ Cây tự cân bằng (AVL, Red-Black, Treap):** BST thường đơn giản nhưng suy biến O(n); cây cân bằng đảm bảo O(log n) với chi phí code phức tạp (xoay). Trong phỏng vấn: cài BST thường, **nêu** tên và ý tưởng cây cân bằng.
- **BST ↔ Mảng sắp xếp:** mảng: search O(log n), insert/delete O(n), cache tốt; BST: tất cả O(log n) nhưng con trỏ phân tán, cache kém. B-tree gộp nhiều key một node để tận dụng cache/đĩa.
- **Successor ↔ Predecessor khi xoá:** đều đúng; luân phiên giúp cây cân bằng hơn một chút.
- **Trùng lặp:** bỏ qua (set), hoặc đếm `count` tại node, hoặc quy ước "≥ đi phải" (nhưng xoá phức tạp hơn).

## Lợi / Hại

**Lợi**
- Dữ liệu động có thứ tự: min/max, k-th, range, floor/ceiling đều O(h).
- Inorder cho dãy sắp xếp miễn phí.
- Nền tảng của TreeMap/TreeSet, B-tree (database index), interval tree, segment tree.

**Hại**
- Không tự cân bằng ⇒ worst case O(n).
- Tốn bộ nhớ con trỏ, cache kém hơn mảng.
- Xoá 2 con dễ viết sai.

## Use case thực tế

- **TreeMap / TreeSet / `std::map`:** Red-Black tree – sắp xếp động, floor/ceiling, range.
- **Database index:** B-tree/B+tree là BST "béo" tối ưu cho đĩa; range scan nhờ thứ tự.
- **Scheduler của Linux (CFS):** Red-Black tree theo vruntime để lấy task "đói" nhất O(log n).
- **Hệ thống file (ext4, Btrfs), bộ nhớ ảo (vm_area):** cây cân bằng cho tra cứu khoảng.
- **Autocomplete có thứ tự, bảng xếp hạng động, order book trong sàn giao dịch** (cần min/max và chèn/xoá liên tục).
- **Interval tree, kd-tree:** mở rộng của BST cho khoảng và không gian.

## Lỗi thường gặp

1. Xoá node 2 con bằng cách "nối" cây con trái vào cây con phải sai chỗ ⇒ phá BST.
2. Sau khi chép successor lên, quên xoá successor khỏi cây phải (hoặc xoá bằng giá trị cũ).
3. Insert không gán lại `root.left = insert(...)` ⇒ node mới bị mất (JS truyền tham chiếu object nhưng null không "nối" được).
4. Validate BST chỉ so sánh với cha trực tiếp thay vì khoảng `(min, max)` của tổ tiên.
5. Dùng đệ quy với cây lệch 10⁵ node ⇒ tràn stack; search nên viết lặp.
6. Nhầm successor (min cây phải) với "con phải".

## Biến thể

- **Validate BST (98):** inorder tăng ngặt hoặc truyền khoảng `(lo, hi)`.
- **Kth Smallest (230):** inorder đếm tới k; hoặc lưu `size` mỗi node cho O(h).
- **Lowest Common Ancestor của BST (235):** đi từ gốc, rẽ theo so sánh với cả hai giá trị.
- **Floor / Ceiling, Successor / Predecessor:** đi xuống và ghi nhớ ứng viên tốt nhất.
- **AVL (xoay khi lệch > 1), Red-Black (màu + xoay), Treap (ưu tiên ngẫu nhiên), Splay (đưa node truy cập lên gốc).**
- **Convert Sorted Array to BST (108):** chọn giữa làm gốc, đệ quy ⇒ cây cân bằng.
