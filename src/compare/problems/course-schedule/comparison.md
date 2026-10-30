## Phân tích

Cả ba cách đều dựa trên cùng một sự thật: **đồ thị có hướng có thứ tự topo ⇔ không có chu trình**. Khác nhau ở cách chứng minh điều đó nhanh tới đâu.

**Gỡ lặp ngây thơ** là cách con người làm bằng tay: tìm môn chưa bị ràng buộc, học nó, gạch đi, lặp lại. Đúng, nhưng mỗi vòng ta *tính lại* in-degree bằng cách quét mọi cạnh (O(E)) và quét mọi đỉnh để tìm một đỉnh in-degree 0 (O(V)). Có V vòng ⇒ O(V·(V + E)). Với V = 2000, E = 5000 vẫn chạy, nhưng với V = E = 10⁵ là cỡ 10¹⁰ – quá chậm. Điểm lãng phí rất rõ: gỡ một đỉnh chỉ làm thay đổi in-degree của *hàng xóm* của nó, vậy mà ta tính lại tất cả.

**Kahn** chính là bản tối ưu của ý tưởng đó: giữ in-degree *tăng dần cập nhật* và một queue chứa các đỉnh đã về 0. Mỗi đỉnh vào/ra queue một lần, mỗi cạnh bị trừ đúng một lần ⇒ O(V + E). Đếm số đỉnh lấy ra: bằng V ⇔ không có vòng (các đỉnh trên một vòng chờ nhau, in-degree không bao giờ về 0). Hoàn toàn lặp nên không có rủi ro tràn stack, và thứ tự lấy ra chính là một lịch học hợp lệ.

**DFS 3 màu** đi theo hướng khác: một chu trình tồn tại ⇔ DFS gặp **back-edge** – cạnh trỏ vào một đỉnh đang nằm trên stack đệ quy (GRAY). Màu BLACK ghi nhớ "từ đỉnh này không có vòng" để không duyệt lại ⇒ cũng O(V + E). Ưu điểm riêng: khi gặp back-edge, stack đệ quy *chính là* chu trình – in ra được ngay. Nhược điểm: độ sâu đệ quy có thể bằng V; chuỗi phụ thuộc dài 10⁵ sẽ làm tràn stack trong JS/Python nếu không chuyển sang stack tường minh. Lỗi kinh điển là chỉ dùng `visited` 2 trạng thái: khi đó đỉnh đã xong ở nhánh khác (BLACK) bị nhầm là chu trình.

## Xếp hạng

1. **Kahn (BFS in-degree)** – O(V + E)/O(V + E). Lặp, an toàn với đồ thị sâu, cho luôn thứ tự học (LeetCode 210), dễ mở rộng sang "số học kỳ tối thiểu" (BFS theo tầng).
2. **DFS 3 màu** – O(V + E)/O(V + E). Ngang Kahn về độ phức tạp; chọn khi cần *chỉ ra* chu trình hoặc tìm các đỉnh an toàn (LeetCode 802).
3. **Gỡ lặp ngây thơ** – O(V·(V + E))/O(V). Chỉ dùng để giải thích ý tưởng trước khi tối ưu.

## Khi nào thứ hạng đổi

- **Cần in ra chu trình** hoặc phân loại cạnh (tree/back/cross) ⇒ DFS lên hạng 1.
- **"Eventual safe states"** (đỉnh không dẫn tới vòng) ⇒ DFS 3 màu tự nhiên hơn; Kahn phải chạy trên đồ thị ngược.
- **Đồ thị thay đổi liên tục** (thêm cạnh online, hỏi còn DAG không) ⇒ cả hai đều phải chạy lại; cần thuật toán topo động (ngoài phạm vi phỏng vấn).
- **Ngôn ngữ có stack sâu / V nhỏ** ⇒ DFS và Kahn gần như tương đương, chọn cái bạn code nhanh và chắc nhất.
