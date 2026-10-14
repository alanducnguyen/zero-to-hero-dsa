## Bài toán

Đồ thị vô hướng là **bipartite** (hai phía) nếu tách được tập đỉnh thành hai nhóm sao cho mọi cạnh nối một đỉnh ở nhóm này với một đỉnh ở nhóm kia. Tương đương: tô được bằng 2 màu không có cạnh cùng màu. Kiểm tra một đồ thị cho trước có bipartite không.

Tam giác A–B–C không bipartite; hình vuông A–B–C–D thì có.

Bài này (LeetCode 785) là BFS/DFS có thêm **trạng thái màu**, và là bước kiểm tra đầu tiên trước khi dùng các thuật toán matching (Hopcroft–Karp, Hungarian).

## Ý tưởng / Trực giác

Chọn một đỉnh, tô màu 0. Mọi hàng xóm **bắt buộc** màu 1, hàng xóm của chúng bắt buộc màu 0, … Không có lựa chọn nào khác trong một thành phần liên thông (ngoài việc đổi vai hai màu). Vậy chỉ cần BFS lan màu xen kẽ; nếu gặp cạnh nối hai đỉnh đã cùng màu ⇒ mâu thuẫn ⇒ không bipartite. Nếu lan hết mà không mâu thuẫn ⇒ đã có cách tô hợp lệ.

Mâu thuẫn xảy ra khi và chỉ khi có **chu trình độ dài lẻ**: đi quanh chu trình lẻ, màu phải đổi mỗi bước nên không thể về màu ban đầu.

## Thuật toán từng bước

1. `color = {}`. Với mỗi đỉnh `s` chưa tô: `color[s] = 0`, đưa vào queue.
2. BFS: lấy `u`; với mỗi hàng xóm `v`: chưa tô ⇒ `color[v] = 1 − color[u]`, push; đã tô cùng màu `u` ⇒ trả về `false`.
3. Hết mọi thành phần ⇒ `true`.

Ở tab **Debug**, màu 0 là xanh dương, màu 1 là tím; cạnh xanh lá là cạnh đã kiểm tra hợp lệ, cạnh đỏ là cạnh gây mâu thuẫn. Preset "tam giác" cho thấy mâu thuẫn ở cạnh đóng chu trình.

## Chứng minh đúng

- Nếu thuật toán trả `true`: mọi cạnh `(u, v)` đều được xét từ một phía và có `color[u] ≠ color[v]` ⇒ phép tô hợp lệ ⇒ bipartite.
- Nếu đồ thị bipartite với phép tô `c*`: trong mỗi thành phần, BFS gán `color[s] = 0`; nếu `c*(s) = 0` thì bằng quy nạp theo tầng BFS `color = c*`, nếu `c*(s) = 1` thì `color = 1 − c*`. Cả hai trường hợp `color` là phép tô hợp lệ nên không có cạnh cùng màu ⇒ không bao giờ trả `false`.

Do đó trả `false` ⟺ không bipartite. Hơn nữa khi trả `false`, cạnh `(u, v)` cùng màu cộng với hai đường BFS từ gốc tới `u` và `v` (cùng tính chẵn lẻ độ dài) tạo thành chu trình lẻ.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| BFS tô màu | O(V + E) | O(V) |
| DFS tô màu | O(V + E) | O(V) stack |
| Union-Find (gộp các hàng xóm của mỗi đỉnh) | O((V + E) α) | O(V) |

## Tradeoff

- BFS tránh tràn stack với đồ thị sâu; DFS code ngắn hơn khi đồ thị nhỏ.
- Union-Find không cần duyệt theo thứ tự, hợp khi cạnh đến dần (online), nhưng không trả về phép tô trực tiếp.
- Với đồ thị có hướng, "bipartite" cần định nghĩa lại (thường bỏ hướng).

## Lợi / Hại

**Lợi:** O(V+E), code ngắn, trả về luôn phép chia 2 nhóm dùng cho bước sau (matching, lập lịch). **Hại:** chỉ trả lời có/không cho 2 màu; k ≥ 3 màu là NP-complete, không mở rộng được.

## Use case thực tế

- Chia người vào hai đội khi biết các cặp "không ưa nhau" (Possible Bipartition).
- Kiểm tra lưới/đồ thị trước khi chạy matching: ghép việc–nhân sự, sinh viên–dự án, quảng cáo–slot.
- Phát hiện mâu thuẫn trong ràng buộc "khác nhau" nhị phân (2-coloring của constraint graph).
- Mạch điện / mạng: kiểm tra đồ thị có chu trình lẻ (liên quan tới tính chất không có "frustration" trong mô hình Ising).

## Lỗi thường gặp

- Chỉ BFS từ đỉnh 0 ⇒ bỏ sót thành phần khác (đồ thị không liên thông).
- Khi `v` đã tô, quên kiểm tra `color[v] === color[u]` (chỉ kiểm tra khi chưa tô).
- Dùng `visited` boolean thay cho màu ⇒ không phân biệt được 2 nhóm.
- Đồ thị có self-loop `u–u`: luôn không bipartite, cần xử lý (thuật toán trên bắt được vì `color[u] === color[u]`).

## Biến thể

- **Possible Bipartition (886):** cùng bài, input là danh sách cặp xung đột.
- **Tìm chu trình lẻ cụ thể:** lưu `parent`, khi mâu thuẫn đi ngược hai đường tới tổ tiên chung.
- **k-coloring:** k = 2 tuyến tính; k ≥ 3 NP-complete ⇒ backtracking/heuristic.
- **Kiểm tra bipartite khi cạnh thêm dần:** Union-Find với "parity" (DSU có trọng số).
- **Bipartite matching:** sau khi chia hai phía, Hopcroft–Karp O(E√V).
