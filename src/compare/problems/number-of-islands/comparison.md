## Phân tích

Cả ba lời giải đều đếm **thành phần liên thông** trên đồ thị ngầm: mỗi ô đất là một đỉnh, hai ô kề nhau có cạnh. Khác nhau ở *cách* duyệt một thành phần.

**DFS đệ quy (flood fill)** là cách ngắn và tự nhiên nhất: gặp ô đất ⇒ tăng `count` rồi "nhấn chìm" cả đảo bằng đệ quy 4 hướng. Mỗi ô bị chạm O(1) lần ⇒ O(m·n). Điểm yếu duy nhất nhưng nghiêm trọng: **độ sâu đệ quy có thể bằng số ô của đảo**. Lưới 300×300 toàn đất ⇒ độ sâu 9·10⁴; call stack mặc định của Node/V8 (~10⁴ frame) hay Java (~10⁴–10⁵ tuỳ `-Xss`) sẽ **stack overflow**. Python còn tệ hơn (giới hạn 1000).

**BFS với queue** cùng độ phức tạp O(m·n), nhưng biên duyệt nằm trong một mảng trên **heap** ⇒ không bao giờ tràn call stack. Queue tại một thời điểm chỉ chứa "lớp sóng" hiện tại, thường cỡ O(min(m, n)). Hai chi tiết hay sai: (1) phải đánh dấu ô **khi enqueue**, không phải khi dequeue, nếu không một ô bị nhiều hàng xóm đưa vào queue; (2) trong JavaScript không dùng `Array.shift()` (O(n)) mà dùng con trỏ `head`. Code dài hơn DFS một chút. Một biến thể tương đương là DFS **lặp** với stack tường minh.

**Union-Find** coi mỗi ô đất là một tập, hợp với hàng xóm dưới/phải; mỗi lần hợp hai tập khác nhau thì số đảo giảm 1. Không cần sửa lưới, không đệ quy sâu (find có nén đường đi). Nhưng cần mảng `parent` m·n phần tử ngay từ đầu, hằng số lớn hơn, và code dài nhất – với lưới **tĩnh** nó không có lợi gì so với DFS/BFS. Nó tỏa sáng khi lưới **động**: ở *Number of Islands II* (thêm từng ô đất, sau mỗi lần thêm hỏi số đảo), DFS/BFS phải quét lại O(m·n) mỗi truy vấn, còn Union-Find chỉ cần ≤ 4 union ⇒ gần O(1) mỗi truy vấn.

| | DFS đệ quy | BFS queue | Union-Find |
|---|---|---|---|
| Thời gian | O(m·n) | O(m·n) | ≈ O(m·n) (nén đường đi; thêm union by rank ⇒ O(m·n·α)) |
| Bộ nhớ phụ | call stack tới O(m·n) | queue O(min(m,n)) điển hình | parent O(m·n) |
| Rủi ro | stack overflow với đảo lớn | không | không |
| Lưới động (thêm đất) | quét lại O(m·n) | quét lại O(m·n) | ≈ O(1) mỗi lần thêm |

## Xếp hạng

1. **DFS đệ quy** – ngắn nhất, dễ trình bày không lỗi trong 10 phút; là đáp án được kỳ vọng với ràng buộc LeetCode. Nói rõ rủi ro stack overflow.
2. **BFS queue** – cùng độ phức tạp, an toàn với lưới lớn; chọn trong code production hoặc khi người phỏng vấn hỏi "nếu lưới 10⁴ × 10⁴ thì sao?".
3. **Union-Find** – nặng nhất cho lưới tĩnh, nhưng là lời giải đúng cho bài lưới động.

## Khi nào thứ hạng đổi

- Lưới rất lớn / có thể toàn đất / ngôn ngữ có call stack nhỏ (Python) ⇒ **BFS (hoặc DFS lặp) lên hạng 1**.
- Ô đất được thêm theo thời gian, hỏi số đảo sau mỗi lần thêm ⇒ **Union-Find lên hạng 1**.
- Cần thêm thông tin về hình dạng (diện tích lớn nhất, khoảng cách ngắn nhất tới đảo khác) ⇒ DFS cho diện tích, **BFS cho khoảng cách** (Shortest Bridge, 01 Matrix).
