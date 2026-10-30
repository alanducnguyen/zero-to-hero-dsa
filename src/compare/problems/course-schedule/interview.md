## Kịch bản trình bày (6–8 phút)

1. **Làm rõ đề** (30s): `[a, b]` nghĩa là học b trước a; có tự vòng/cạnh trùng không; chỉ cần true/false hay cần thứ tự.
2. **Mô hình hoá** (1 phút): "Môn là đỉnh, điều kiện là cạnh b → a. Học hết được ⇔ đồ thị không có chu trình." Đây là câu then chốt người phỏng vấn muốn nghe.
3. **Ý tưởng ngây thơ** (30s): "Lặp: tìm môn không còn điều kiện, gỡ đi. Nếu tính lại in-degree mỗi vòng thì O(V·(V + E))." Không cần code.
4. **Tối ưu thành Kahn** (2–3 phút): "Gỡ một môn chỉ ảnh hưởng hàng xóm ⇒ giữ in-degree và queue các môn về 0." Code, nhấn mạnh điều kiện `taken === numCourses`.
5. **Phân tích** (30s): O(V + E) thời gian và bộ nhớ (danh sách kề + in-degree + queue).
6. **Nhắc DFS 3 màu** (1 phút): "Cách khác là DFS, gặp đỉnh GRAY là back-edge. Cùng O(V + E) nhưng đệ quy sâu tới V, và cho phép in ra chu trình."

## Follow-up thường gặp

- **Trả về thứ tự học (LeetCode 210)?** Kahn: thứ tự lấy ra khỏi queue. DFS: postorder đảo ngược.
- **Số học kỳ tối thiểu nếu học song song không giới hạn (LeetCode 1136)?** Kahn theo tầng: mỗi tầng queue là một học kỳ; đáp án = số tầng (= đường đi dài nhất trong DAG).
- **Mỗi học kỳ học tối đa k môn (LeetCode 1494)?** Không còn tham lam được – bitmask DP, NP-khó tổng quát.
- **In ra một chu trình?** DFS 3 màu: khi gặp cạnh u → v với v GRAY, chu trình là đoạn stack từ v tới u.
- **Truy vấn "x có phải điều kiện (gián tiếp) của y?" nhiều lần (LeetCode 1462)?** Tiền xử lý bao đóng bắc cầu theo thứ tự topo hoặc Floyd–Warshall boolean, O(V³) hoặc O(V·E).
- **V = 10⁵, chuỗi dài?** Tránh DFS đệ quy (tràn stack) – dùng Kahn hoặc DFS với stack tường minh.
- **Thứ tự topo nhỏ nhất theo từ điển?** Kahn với min-heap thay queue, O((V + E) log V).

## Lỗi hay gặp khi code

- Đảo chiều cạnh (`graph[a].push(b)`): với true/false vẫn đúng (đảo cạnh không đổi việc có vòng), nhưng thứ tự học ở bài 210 sẽ bị ngược.
- DFS chỉ dùng visited 2 trạng thái ⇒ báo vòng sai khi hai nhánh cùng đi tới một đỉnh đã xong.
- Quên duyệt từ mọi đỉnh (đồ thị không liên thông).
