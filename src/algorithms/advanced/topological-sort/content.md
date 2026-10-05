## Bài toán

Cho đồ thị có hướng gồm V đỉnh, E cạnh, mỗi cạnh `u → v` nghĩa là "u phải xong trước v". Tìm một thứ tự các đỉnh sao cho mọi cạnh đều đi từ trước ra sau. Nếu đồ thị có **chu trình** thì không tồn tại thứ tự như vậy – báo lỗi.

Đây là bài **Course Schedule** (LeetCode 207/210), câu hỏi đồ thị phổ biến nhất ở Google và Amazon, vì nó mô hình hoá chính xác bài toán kỹ sư gặp hằng ngày: build system, cài package, lập lịch task, resolve import.

## Ý tưởng / Trực giác

Hãy nghĩ về việc chọn môn học: môn không có tiên quyết thì học ngay. Học xong một môn, các môn phụ thuộc vào nó bớt đi một tiên quyết; môn nào hết tiên quyết thì học tiếp. Nếu đến lúc nào đó không còn môn nào "sẵn sàng" mà vẫn còn môn chưa học ⇒ các môn còn lại tiên quyết lẫn nhau ⇒ chu trình.

**Thuật toán Kahn** làm đúng như vậy với **bậc vào (indegree)** = số tiên quyết chưa giải quyết, và một **queue** chứa các đỉnh có indegree 0.

## Thuật toán từng bước

1. Tính `indegree[v]` cho mọi đỉnh.
2. Đưa mọi đỉnh có `indegree = 0` vào queue.
3. Khi queue không rỗng: lấy `u`, thêm vào `order`; với mỗi cạnh `u → v`: `indegree[v]--`; nếu về 0, đẩy `v` vào queue.
4. Nếu `order.length < V` ⇒ có chu trình ⇒ `null`. Ngược lại trả `order`.

Tab **Debug**: nhãn `in=` dưới mỗi đỉnh là indegree hiện tại; đỉnh cyan đang trong queue, xanh lá đã xếp; cạnh đỏ vừa bị "cắt". Preset "Có chu trình" cho thấy B và C kẹt với indegree > 0.

## Chứng minh đúng

**Mỗi đỉnh vào queue đúng khi indegree về 0** ⇒ khi `u` được lấy ra, mọi đỉnh `w` có cạnh `w → u` đã được lấy ra trước (vì chính việc lấy `w` ra mới giảm indegree của `u`). Vậy mọi cạnh đều đi từ trước ra sau trong `order`.

**Phát hiện chu trình:** nếu đồ thị là DAG, luôn tồn tại đỉnh có indegree 0 trong phần còn lại (DAG hữu hạn phải có "nguồn", nếu không đi ngược mãi sẽ lặp đỉnh ⇒ chu trình). Vậy thuật toán xếp được mọi đỉnh. Ngược lại, nếu có chu trình, các đỉnh trong chu trình không bao giờ có indegree 0 (mỗi đỉnh luôn còn cạnh từ đỉnh trước nó trong chu trình chưa bị cắt) ⇒ `order.length < V`.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(V + E) | Mỗi đỉnh vào/ra queue 1 lần, mỗi cạnh bị "cắt" 1 lần |
| Bộ nhớ | O(V) | indegree, queue, order (+ O(V + E) cho danh sách kề) |

## Tradeoff

- **Kahn (BFS) ↔ DFS postorder đảo ngược:** DFS cũng O(V + E), phát hiện chu trình bằng 3 màu (trắng/xám/đen), tự nhiên khi cần "cả cây phụ thuộc" của một đỉnh. Kahn không đệ quy, dễ mở rộng cho **song song** (mọi đỉnh trong queue cùng lúc có thể chạy đồng thời – chính là cách `make -j` và Bazel lập lịch) và cho **thứ tự ưu tiên** (thay queue bằng heap để chọn đỉnh nhỏ nhất).
- **Nhiều thứ tự hợp lệ:** DAG thường có nhiều topo order; Kahn cho một trong số đó tuỳ thứ tự duyệt. Cần thứ tự từ điển nhỏ nhất ⇒ priority queue.
- **Báo chu trình ↔ chỉ ra chu trình:** Kahn chỉ biết "có"; muốn in chu trình cụ thể, dùng DFS với stack đường đi.
- **Đồ thị động:** thêm cạnh sau khi đã sắp xếp cần tính lại; có thuật toán incremental nhưng phức tạp.

## Lợi / Hại

**Lợi**
- Tuyến tính, không đệ quy, phát hiện chu trình miễn phí.
- Mở rộng tự nhiên: song song, ưu tiên, đếm số "tầng" (longest path trong DAG).
- Trực giác rõ ràng, dễ giải thích cho người phỏng vấn.

**Hại**
- Chỉ dùng cho đồ thị **có hướng không chu trình**.
- Không cho biết chu trình nằm ở đâu.
- Cần xây danh sách kề và indegree trước (O(V + E) bộ nhớ).

## Use case thực tế

- **Build system:** Make, Bazel, Gradle xác định thứ tự biên dịch module; cạnh = dependency.
- **Package manager:** npm/pip/apt cài dependency trước package; phát hiện dependency vòng.
- **Lập lịch task / workflow:** Airflow DAG, CI pipeline, Kubernetes init order.
- **Bảng tính:** Excel tính lại các ô theo thứ tự topo của công thức; ô tham chiếu vòng báo lỗi.
- **Compiler:** thứ tự khởi tạo module, resolve import; phát hiện import vòng.
- **Cơ sở dữ liệu:** thứ tự tạo bảng theo foreign key; migration.
- **Học máy:** thứ tự tính toán trong computation graph (TensorFlow, PyTorch autograd).

## Lỗi thường gặp

1. Quên khởi tạo `indegree = 0` cho đỉnh không có cạnh vào (đỉnh "nguồn") ⇒ không vào queue.
2. Đỉnh chỉ xuất hiện ở đầu `to` (không có key trong `graph`) ⇒ `graph[u]` undefined; dùng `?? []`.
3. Đẩy `v` vào queue khi `indegree[v] > 0` hoặc đẩy nhiều lần.
4. Dùng `queue.shift()` O(n).
5. Quên kiểm tra `order.length === V` ⇒ chu trình bị bỏ qua, trả thứ tự thiếu đỉnh.
6. Nhầm hướng cạnh ("a cần b" là `b → a`, không phải `a → b`).

## Biến thể

- **Course Schedule II (210):** trả `order`; 207 chỉ cần `order.length === n`.
- **Alien Dictionary (269):** xây cạnh từ các cặp từ liên tiếp, rồi Kahn; nhiều bẫy ở bước xây đồ thị.
- **Minimum Height Trees (310):** Kahn trên đồ thị vô hướng, bóc dần lá (degree 1) từ ngoài vào.
- **Thứ tự từ điển nhỏ nhất:** thay queue bằng min-heap.
- **Số tầng / longest path trong DAG:** xử lý theo tầng (BFS theo size) hoặc DP theo topo order.
- **DFS topo sort:** postorder đảo ngược + 3 màu để phát hiện chu trình.
- **Parallel Course Schedule (1136):** số học kỳ tối thiểu = số tầng Kahn.
