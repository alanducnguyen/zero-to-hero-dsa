## Cách trình bày trong phỏng vấn

1. Mô hình hoá ngay: "môn = đỉnh, điều kiện = cạnh b → a; học được hết ⇔ đồ thị không có chu trình; thứ tự học = thứ tự topo".
2. Nói có hai cách: Kahn (BFS bậc vào) và DFS 3 màu. Chọn một và nêu lý do (ví dụ: "em dùng DFS vì nó chỉ ra luôn cạnh gây chu trình").
3. Giải thích tại sao cần 3 màu chứ không phải visited true/false – đây là điểm interviewer muốn nghe.
4. Viết code; chạy tay trên đồ thị kim cương (không chu trình) và một chu trình 3 đỉnh.
5. Kết luận O(V + E) thời gian và bộ nhớ; nhắc rủi ro tràn stack và cách chuyển sang lặp.

## Câu hỏi follow-up thường gặp

- **Tại sao không dùng visited 2 trạng thái?** Vì đỉnh đã xong ở nhánh khác (BLACK) không tạo chu trình; chỉ đỉnh đang trên đường đi (GRAY) mới tạo. Đồ thị kim cương là phản ví dụ kinh điển.
- **Tại sao postorder đảo ngược là thứ tự topo?** Với mọi cạnh u → v, v luôn hoàn tất trước u (v là WHITE thì xong trong lời gọi con; là BLACK thì đã xong). Đảo lại ⇒ u trước v.
- **In ra chu trình cụ thể?** Khi gặp back-edge u → v, lấy đoạn stack từ v tới u, thêm v.
- **Đồ thị có 10⁵ đỉnh dạng chuỗi?** Đệ quy sẽ tràn stack ⇒ dùng Kahn hoặc DFS lặp với stack tường minh.
- **Muốn thứ tự nhỏ nhất theo từ điển?** Dùng Kahn với min-heap thay queue.
- **Học tối thiểu bao nhiêu học kỳ (LeetCode 1136)?** Kahn theo tầng; số tầng là đáp án = đường đi dài nhất trong DAG.
- **So sánh với Kahn?** Cùng O(V + E). Kahn lặp, dễ chia tầng; DFS ngắn, chỉ ra chu trình cụ thể.

## Checklist nhận diện pattern

- Có quan hệ "phải làm X trước Y", "phụ thuộc", "tiên quyết" ⇒ đồ thị có hướng + topo sort.
- Hỏi "có thể hoàn thành không / có deadlock không / có vòng không" ⇒ phát hiện chu trình trong đồ thị có hướng ⇒ DFS 3 màu hoặc Kahn.
- Đồ thị **vô hướng** thì khác: chỉ cần visited + bỏ qua cạnh về cha, hoặc Union-Find.
- Thấy "thứ tự" + "chu trình thì trả rỗng" ⇒ LeetCode 210 semantics.

## Bài luyện tập liên quan

- LeetCode 207 – Course Schedule.
- LeetCode 210 – Course Schedule II.
- LeetCode 802 – Find Eventual Safe States.
- LeetCode 269 – Alien Dictionary.
- LeetCode 1136 – Parallel Courses.
- LeetCode 1462 – Course Schedule IV.
- LeetCode 2115 – Find All Possible Recipes from Given Supplies.
