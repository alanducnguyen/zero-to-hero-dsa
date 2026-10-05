## Cách trình bày trong phỏng vấn

1. Nêu tính chất BST và hệ quả: mọi thao tác O(h); nói ngay h có thể là n nếu không cân bằng – và cây cân bằng khắc phục.
2. Insert/search: viết nhanh, đệ quy hoặc lặp.
3. Delete: liệt kê 3 trường hợp **trước khi code**, vẽ hình trường hợp 2 con với successor.
4. Chạy tay xoá gốc có 2 con.
5. Nêu tradeoff với HashMap (thứ tự) và với mảng sắp xếp (cập nhật).

## Câu hỏi follow-up thường gặp

- **Tại sao successor có tối đa 1 con?** Nó là min của cây phải ⇒ không có con trái.
- **Dùng predecessor thay successor được không?** Được (max cây trái); đối xứng.
- **Validate BST?** Truyền khoảng `(lo, hi)` xuống: node phải thoả `lo < val < hi`; con trái `(lo, val)`, con phải `(val, hi)`. Hoặc inorder tăng ngặt.
- **Cây lệch – làm sao tránh?** Cây tự cân bằng (AVL: cân bằng chặt, nhiều xoay, tốt cho đọc; Red-Black: ít xoay hơn, tốt cho ghi), hoặc xáo trộn input trước khi chèn, hoặc dựng cân bằng từ mảng sắp xếp.
- **Phần tử nhỏ thứ k?** Inorder dừng ở k, O(h + k); hoặc lưu kích thước cây con để O(h).
- **Floor(x) – giá trị lớn nhất ≤ x?** Đi xuống: nếu `node.val ≤ x` ghi nhận và đi phải, ngược lại đi trái.
- **BST vs B-tree?** B-tree mỗi node nhiều key, cao thấp, tối ưu đọc theo block (đĩa, cache); BST mỗi node 1 key.
- **Iterator inorder O(h) bộ nhớ (173)?** Stack các node bên trái; `next()` pop và đẩy nhánh trái của con phải.
- **Xoá trong cây cân bằng?** Như BST rồi xoay để phục hồi bất biến (AVL) hoặc tô màu lại (Red-Black).

## Checklist nhận diện pattern

- Dữ liệu **động** cần **thứ tự** (min/max/k-th/range/floor) ⇒ BST (thực tế: TreeMap).
- "Tìm trong cây đã sắp xếp" ⇒ rẽ theo so sánh, O(h).
- Chỉ cần get/put theo key ⇒ HashMap, không cần BST.
- Cần chèn/xoá nhiều và O(log n) đảm bảo ⇒ nhắc cây cân bằng.

## Bài luyện tập liên quan

- 700 Search → 701 Insert → 450 Delete Node in a BST.
- 98 Validate BST, 230 Kth Smallest, 235 LCA of a BST, 173 BST Iterator.
- 108 Sorted Array to BST, 1382 Balance a BST, 538 BST to Greater Tree, 703 Kth Largest in Stream (so sánh với heap).
