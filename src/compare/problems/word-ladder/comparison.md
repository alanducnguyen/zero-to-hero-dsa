## Phân tích

Mấu chốt của bài nằm ở hai câu hỏi: **duyệt theo thứ tự nào** (DFS hay BFS) và **tìm hàng xóm bằng cách nào** (so từng cặp hay sinh biến thể).

**DFS / backtracking** thử mọi đường đi đơn. Vấn đề là DFS tìm được *một* đường thì không biết nó có ngắn nhất không, nên phải quay lui và thử tiếp; một từ có thể bị thăm lại qua vô số đường khác nhau. Số đường đi đơn là hàm mũ theo n. Cắt nhánh `len ≥ best` giúp một chút, nhưng không đổi bản chất. Với vài chục từ đã TLE.

**BFS so từng cặp** sửa lỗi thứ tự duyệt: BFS xử lý theo tầng khoảng cách, nên lần đầu chạm một từ là qua đường ngắn nhất ⇒ mỗi từ vào queue đúng một lần. Nhưng để tìm hàng xóm, nó so từ hiện tại với *mọi* từ chưa thăm, mỗi lần O(L) ⇒ O(n²·L). Với n = 5000, L = 5 là ~1,25·10⁸ phép so ký tự – sát giới hạn.

**Sinh biến thể** đảo ngược câu hỏi: thay vì hỏi "từ nào trong list khác tôi 1 ký tự?", hỏi "đổi 1 ký tự của tôi thì được những từ nào, có trong Set không?". Mỗi từ sinh L·26 biến thể, mỗi biến thể tạo chuỗi O(L) ⇒ O(n·L²·26), **không còn n²**. Một cách tương đương là **wildcard bucket** (`h*t → [hot, hit]`): tiền xử lý O(n·L²), hai từ cùng bucket là hàng xóm – không phụ thuộc bảng chữ cái (xem bài Word Ladder ở mục thuật toán).

**Bidirectional BFS** cộng thêm một cải tiến nữa: chạy BFS từ cả hai đầu và luôn mở rộng phía có frontier nhỏ hơn. Nếu mỗi đỉnh có ~b hàng xóm và khoảng cách là d, BFS một phía thăm ~b^d đỉnh, hai phía chỉ ~2·b^(d/2). Worst case vẫn như BFS thường, nhưng trên dữ liệu thật nhanh hơn nhiều lần.

## Xếp hạng

1. **Bidirectional BFS + sinh biến thể** – O(n·L²·|Σ|) worst case, thực tế thăm ít đỉnh nhất. Đáp án mạnh nhất cho LeetCode 127.
2. **BFS so từng cặp** – O(n²·L). Đúng, dễ code, nhưng phụ thuộc n² khi tìm hàng xóm.
3. **DFS / backtracking** – hàm mũ. Chỉ để giải thích vì sao bài đường ngắn nhất không trọng số cần BFS.

Ở giữa hạng 1 và 2 là **BFS một phía + wildcard bucket / sinh biến thể**: đã bỏ n², chỉ thiếu tối ưu "gặp nhau ở giữa". Trong phỏng vấn, code được BFS + bucket là đủ đạt; bidirectional là điểm cộng.

## Khi nào thứ hạng đổi

- **Bảng chữ cái rất lớn** (Unicode, |Σ| ≫ n) ⇒ sinh biến thể đắt; dùng wildcard bucket (không phụ thuộc |Σ|) hoặc so từng cặp khi n nhỏ.
- **Cần khoảng cách từ begin tới mọi từ** ⇒ bidirectional vô nghĩa (không có đích cụ thể), dùng BFS một phía.
- **Cần in mọi đường ngắn nhất** (Word Ladder II) ⇒ BFS ghi cha theo tầng rồi DFS ngược từ đích – DFS chỉ có ích *sau* khi BFS đã giới hạn đồ thị.
- **n rất nhỏ** (≤ 50) ⇒ mọi BFS đều tức thì; chọn cách bạn code chắc chắn nhất.
