## Cách trình bày trong phỏng vấn

1. Hỏi: p, q chắc chắn tồn tại? Có con trỏ cha? Cây là BST?
2. Nêu ý tưởng "mỗi node báo cáo lên trên nó thấy gì" và ba trường hợp gộp.
3. Code 7 dòng, chạy tay với p là tổ tiên của q.
4. Nêu O(n)/O(h) và các biến thể (BST, parent pointer, không tồn tại).

## Câu hỏi follow-up thường gặp

- **p hoặc q không tồn tại?** Đếm số lần gặp p/q trong lượt duyệt; chỉ trả kết quả nếu đếm = 2; hoặc kiểm tra tồn tại trước.
- **Có con trỏ cha?** Đi lên từ hai node như bài giao hai linked list: khi chạm null, nhảy sang node kia; gặp nhau tại LCA. O(h), O(1).
- **BST?** Từ gốc: cả hai < node ⇒ trái; cả hai > ⇒ phải; ngược lại node là LCA.
- **Nhiều truy vấn?** Binary lifting: `up[v][j]` = tổ tiên 2^j của v; đưa hai node về cùng độ sâu rồi nhảy. O(n log n) / O(log n).
- **Cây n-ary?** Cùng ý tưởng: đếm số con trả khác null; ≥ 2 ⇒ node là LCA.
- **Khoảng cách giữa hai node?** depth(p) + depth(q) − 2·depth(LCA).
- **Cây rất sâu, tràn stack?** Postorder lặp với stack tường minh và map node→kết quả.

## Checklist nhận diện pattern

- "Tổ tiên chung", "khoảng cách giữa hai node", "đường đi giữa hai node trong cây" ⇒ LCA.
- Thông tin cần gộp từ hai con ⇒ postorder trả giá trị có nhiều nghĩa.

## Bài luyện tập liên quan

- 236 LCA of Binary Tree → 235 LCA of BST → 1650 LCA III → 1644 LCA II → 1676 LCA IV.
- 543 Diameter, 124 Max Path Sum (cùng kiểu postorder gộp hai con).
