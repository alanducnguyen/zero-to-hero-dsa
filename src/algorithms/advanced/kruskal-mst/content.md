## Bài toán

Cho đồ thị vô hướng liên thông có trọng số. Tìm **cây khung nhỏ nhất (MST)**: tập cạnh nối tất cả đỉnh, không chu trình, tổng trọng số nhỏ nhất.

MST là bài tham lam trên đồ thị quan trọng nhất, và Kruskal là cách đẹp nhất để kết hợp hai thứ bạn đã học: **tham lam có chứng minh** và **Union-Find**. Google và Amazon hỏi nó dưới dạng "nối các điểm với chi phí nhỏ nhất" (1584) hay "nối thành phố".

## Ý tưởng / Trực giác

Muốn nối mọi thứ rẻ nhất, hãy lấy cạnh **rẻ nhất** trước – miễn là nó không tạo **chu trình** (chu trình nghĩa là có cạnh thừa). Lặp lại cho tới khi có đúng `V − 1` cạnh.

Tại sao tham lam đúng? **Cut property:** với bất kỳ cách chia đỉnh thành hai phần, cạnh nhẹ nhất bắc qua hai phần luôn thuộc một MST nào đó. Khi Kruskal xét cạnh `(u, v)` với `u`, `v` ở hai thành phần khác nhau, nó chính là cạnh nhẹ nhất bắc qua cut "thành phần của u" và "phần còn lại" (mọi cạnh nhẹ hơn đã xét và nằm trong một thành phần). Vậy chọn nó là an toàn.

Kiểm tra "cùng thành phần?" chính là `find` của Union-Find – O(α) mỗi lần.

## Thuật toán từng bước

1. Sắp xếp cạnh theo trọng số tăng dần.
2. Union-Find với mỗi đỉnh một tập.
3. Với mỗi cạnh `(u, v, w)`: nếu `find(u) ≠ find(v)` ⇒ chọn, `union`, cộng `w`. Dừng khi đủ `V − 1` cạnh.
4. Nếu không đủ `V − 1` cạnh ⇒ đồ thị không liên thông.

Tab **Debug**: cạnh vàng đang xét, xanh lá đã chọn, xám bị loại (tạo chu trình); bảng `find(v)` cho thấy các thành phần gộp dần. Preset "Không liên thông" trả về null.

## Chứng minh đúng

**Bất biến:** tập cạnh đã chọn `T` là tập con của một MST nào đó.

- Ban đầu `T = ∅` – đúng.
- Khi chọn cạnh `e = (u, v)` nhẹ nhất với `u`, `v` khác thành phần: gọi `S` = thành phần chứa `u`. `e` là cạnh nhẹ nhất bắc qua cut `(S, V∖S)` (mọi cạnh nhẹ hơn đã bị loại vì nằm trong một thành phần, tức không bắc qua cut này). Gọi `M` là MST chứa `T`. Nếu `e ∉ M`, thêm `e` vào `M` tạo chu trình; chu trình phải chứa một cạnh `f ≠ e` bắc qua cut, với `w(f) ≥ w(e)`. Thay `f` bằng `e` được cây khung `M'` với `w(M') ≤ w(M)` ⇒ `M'` cũng là MST và chứa `T ∪ {e}`.
- Cạnh bị bỏ (cùng thành phần) tạo chu trình với `T` ⇒ không thể cùng thuộc cây với `T` ⇒ bỏ là đúng.
- Kết thúc: `V − 1` cạnh không chu trình = cây khung, và nằm trong một MST ⇒ chính là MST.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Sắp xếp cạnh | O(E log E) | Chi phí chính |
| Union-Find | O(E · α(V)) | Gần tuyến tính |
| Tổng | O(E log E) = O(E log V) | Vì E ≤ V² ⇒ log E ≤ 2 log V |
| Bộ nhớ | O(V + E) | |

## Tradeoff

- **Kruskal ↔ Prim:** Kruskal O(E log E), xử lý cạnh toàn cục, tốt cho **đồ thị thưa** và khi cạnh đã sắp xếp hoặc đến dần. Prim O(E log V) với heap, mở rộng từ một đỉnh, tốt cho **đồ thị dày** (O(V²) với mảng) và khi đồ thị cho dạng ma trận kề. Cùng kết quả (nếu trọng số phân biệt, MST duy nhất).
- **Kruskal ↔ Borůvka:** Borůvka song song hoá tốt (mỗi thành phần chọn cạnh nhẹ nhất đồng thời), O(E log V).
- **Dừng sớm:** khi đủ V − 1 cạnh, bỏ qua phần còn lại – tiết kiệm nhiều nếu cạnh nhẹ tập trung.
- **Đồ thị không liên thông:** Kruskal tự nhiên cho **rừng khung nhỏ nhất**; Prim cần chạy lại từ mỗi thành phần.
- **Trọng số âm:** MST vẫn đúng (khác Dijkstra), vì chỉ so sánh thứ tự cạnh.
- **Cạnh thay đổi:** thêm cạnh mới có thể cập nhật MST bằng cách tìm cạnh nặng nhất trên đường đi trong cây (LCA); xoá cạnh phức tạp hơn.

## Lợi / Hại

**Lợi**
- Đơn giản, chứng minh rõ ràng, dùng Union-Find có sẵn.
- Tự xử lý đồ thị không liên thông, trọng số âm.
- Dễ mở rộng: cạnh bắt buộc (thêm trước), cạnh cấm (bỏ), critical edges, "k cụm" (dừng sớm khi còn k thành phần = single-linkage clustering).

**Hại**
- Cần sắp xếp toàn bộ cạnh (không streaming tốt bằng Prim khi E rất lớn và chỉ cần một phần).
- Trên đồ thị dày, Prim với mảng O(V²) nhanh hơn.

## Use case thực tế

- **Thiết kế mạng:** nối văn phòng/thành phố/trạm với tổng chi phí cáp nhỏ nhất; mạng điện, đường ống.
- **Clustering:** single-linkage hierarchical clustering = Kruskal dừng khi còn k thành phần; phát hiện cụm ảnh/điểm.
- **Xấp xỉ TSP:** MST cho chặn dưới và thuật toán xấp xỉ 2 (duyệt MST).
- **Phân đoạn ảnh (Felzenszwalb):** gộp pixel theo cạnh nhẹ nhất với ngưỡng.
- **Mê cung ngẫu nhiên:** Kruskal với trọng số ngẫu nhiên sinh mê cung hoàn hảo.
- **Mạng chip / PCB routing:** ước lượng dây nối (Steiner tree xấp xỉ qua MST).
- **Broadcast / multicast tree** trong mạng.

## Lỗi thường gặp

1. Quên sắp xếp cạnh, hoặc sắp xếp giảm dần.
2. So sánh `u === v` thay vì `find(u) === find(v)`.
3. Union sai (gán `parent[v] = u` thay vì gán cho gốc).
4. Không kiểm tra đủ V − 1 cạnh ⇒ trả MST cho đồ thị không liên thông như thể đúng.
5. Đếm cạnh trùng/cạnh tự nối (self-loop) – cần loại hoặc để Union-Find tự bỏ (self-loop luôn cùng thành phần).
6. Nhầm MST với shortest path tree (Dijkstra): MST tối ưu tổng cạnh, không tối ưu khoảng cách từ nguồn.

## Biến thể

- **Prim:** heap các cạnh từ cây hiện tại; O(E log V).
- **Borůvka:** mỗi thành phần chọn cạnh nhẹ nhất ra ngoài, gộp đồng thời.
- **Maximum spanning tree:** sắp xếp giảm dần.
- **Minimum bottleneck spanning tree:** MST cũng là MBST.
- **Critical / pseudo-critical edges (1489):** chạy Kruskal loại/bắt buộc từng cạnh.
- **k-clustering:** dừng khi còn k thành phần; khoảng cách giữa cụm = cạnh tiếp theo.
- **Second-best MST:** với mỗi cạnh ngoài cây, thay cạnh nặng nhất trên đường đi trong cây.
