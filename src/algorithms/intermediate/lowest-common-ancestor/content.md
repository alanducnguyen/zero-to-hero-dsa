## Bài toán

Cho cây nhị phân (không phải BST) và hai node `p`, `q` (có trong cây), tìm **tổ tiên chung thấp nhất**: node sâu nhất có cả `p` và `q` trong cây con của nó (một node được coi là tổ tiên của chính nó).

LeetCode 236 là bài cây được Meta hỏi rất nhiều. Nó kiểm tra bạn có hiểu **postorder** (thông tin đi từ con lên cha) và có thiết kế được **giá trị trả về mang nhiều nghĩa** hay không.

## Ý tưởng / Trực giác

Hỏi mỗi node: "cây con của bạn có chứa p hoặc q không?" Trả lời bằng cách trả về node tìm thấy:
- Node là `p` hoặc `q` ⇒ trả chính nó (không cần xuống thêm: nếu node kia nằm bên dưới, node này vẫn là LCA).
- Hỏi hai con. Nếu **cả hai** trả khác null ⇒ p, q ở hai bên ⇒ node hiện tại là LCA.
- Nếu chỉ một bên ⇒ chuyển tiếp kết quả lên.

Kết quả ở gốc chính là LCA. Một lượt, không cần lưu đường đi.

## Thuật toán từng bước

```
lca(node):
  null ⇒ null
  node = p hoặc q ⇒ node
  L = lca(left), R = lca(right)
  L và R đều khác null ⇒ node
  ngược lại ⇒ L ?? R
```

Tab **Debug**: p, q tô cyan; node trả "↑ x" nghĩa là đang chuyển x lên; node đỏ là nơi hai bên gặp nhau. Preset "p là tổ tiên của q" cho thấy dừng sớm tại p.

## Chứng minh đúng

**Mệnh đề:** `lca(node)` trả về: LCA(p, q) nếu cả hai trong cây con `node`; p (hoặc q) nếu chỉ một trong hai nằm trong cây con; null nếu không có gì.

Quy nạp theo chiều cao: lá đúng hiển nhiên. Tại node bất kỳ: nếu node là p/q, trả node – đúng với cả hai trường hợp (nếu node kia bên dưới, LCA là node; nếu không, "chỉ một" là node). Ngược lại, kết hợp từ hai con: hai bên đều có ⇒ p, q ở hai cây con khác nhau ⇒ node là LCA; một bên có ⇒ kết quả bên đó đúng theo giả thiết (LCA hoặc node đơn); không bên nào ⇒ null.

Đề đảm bảo p, q có trong cây nên kết quả ở gốc là LCA.

## Độ phức tạp

| | Giá trị |
|---|---|
| Thời gian | O(n) – mỗi node thăm tối đa một lần |
| Bộ nhớ | O(h) stack đệ quy |

## Tradeoff

- **Một lượt postorder ↔ Hai đường đi:** tìm đường gốc→p và gốc→q (O(n) mỗi cái), so sánh tiền tố chung. Dễ hiểu hơn, O(n) bộ nhớ, và dễ mở rộng khi p/q có thể không tồn tại.
- **Có con trỏ cha (1650):** đi lên từ p và q như "giao hai linked list" O(h), không cần gốc.
- **BST (235):** rẽ theo so sánh giá trị, O(h), không cần duyệt hết.
- **Nhiều truy vấn trên cây tĩnh:** binary lifting O(n log n) tiền xử lý, O(log n) mỗi truy vấn; hoặc Euler tour + RMQ.
- **p hoặc q không tồn tại:** thuật toán một lượt trả node còn lại (sai); cần đếm số node tìm thấy hoặc kiểm tra trước.

## Lợi / Hại

**Lợi:** một lượt, không bộ nhớ phụ ngoài stack, code 7 dòng.
**Hại:** giả định p, q tồn tại; đệ quy sâu với cây lệch; không tối ưu cho nhiều truy vấn.

## Use case thực tế

- **Hệ thống file / cây tổ chức:** thư mục chung thấp nhất của hai file; cấp quản lý chung gần nhất.
- **Git:** `git merge-base` tìm commit tổ tiên chung (trên DAG, tổng quát hơn).
- **Phân loại / ontology:** khái niệm chung gần nhất của hai lớp (WordNet, taxonomy sinh học).
- **Mạng / routing tree:** điểm hội tụ của hai đường trong cây multicast.
- **Compiler:** kiểu chung gần nhất của hai kiểu trong cây kế thừa.

## Lỗi thường gặp

1. Tiếp tục xuống dưới khi đã gặp p/q (không sai nhưng thừa và dễ rối).
2. Trả `left || right` nhưng quên trường hợp cả hai ⇒ trả p thay vì LCA.
3. So sánh theo giá trị khi cây có giá trị trùng – LeetCode đảm bảo duy nhất; thực tế so sánh tham chiếu.
4. Không xử lý p/q không tồn tại khi đề không đảm bảo.

## Biến thể

- **LCA của BST (235):** O(h) rẽ theo giá trị.
- **LCA với parent pointer (1650):** hai con trỏ đi lên, đổi gốc khi chạm null.
- **LCA của nhiều node (1676):** trả node nếu thuộc tập; đếm.
- **LCA không đảm bảo tồn tại (1644):** đếm số node tìm thấy == 2.
- **Binary lifting / Euler tour:** nhiều truy vấn.
