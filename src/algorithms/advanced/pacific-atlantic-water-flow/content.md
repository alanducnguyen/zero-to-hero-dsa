## Bài toán

Cho lưới `heights` kích thước m × n, mỗi ô là độ cao của một mảnh đất trên đảo. **Thái Bình Dương (Pacific)** chạm mép trên và mép trái; **Đại Tây Dương (Atlantic)** chạm mép dưới và mép phải. Mưa rơi xuống một ô, nước chảy sang ô kề 4 hướng nếu ô đó có độ cao **nhỏ hơn hoặc bằng**. Ô sát mép chảy thẳng ra đại dương tương ứng. Tìm mọi ô mà nước từ đó chảy được ra **cả hai** đại dương.

Ví dụ: lưới mẫu 5 × 5 của LeetCode cho đáp án `[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]`.

## Ý tưởng / Trực giác

Cách ngây thơ: với **từng ô**, chạy DFS xuống dốc để xem có chạm cả hai mép không. Mỗi lần DFS tốn O(m·n), tổng O((m·n)²) – quá chậm với lưới 200 × 200.

Mấu chốt là **đảo chiều câu hỏi**. Thay vì hỏi "ô X chảy tới đâu?", ta hỏi "từ biển, nước có thể *đến từ* những ô nào?". Nếu nước chảy từ A xuống B (h[A] ≥ h[B]) thì đi ngược từ B ta được phép **leo lên** A. Vậy:

- Bắt đầu từ mọi ô sát Pacific, BFS chỉ đi sang ô kề có độ cao **≥** ô hiện tại ⇒ được tập `pac` các ô chảy ra Pacific.
- Làm tương tự với Atlantic ⇒ tập `atl`.
- Đáp án = `pac ∩ atl`.

Đây là **multi-source BFS** (giống Rotting Oranges): mọi ô mép được đẩy vào queue cùng lúc, mỗi ô chỉ thăm một lần cho mỗi đại dương.

## Thuật toán từng bước

1. Nếu lưới rỗng ⇒ trả về `[]`.
2. Lập danh sách ô mép: Pacific = cột 0 và hàng 0; Atlantic = cột n−1 và hàng m−1.
3. Hàm `bfs(starts)`: tạo `seen` toàn `false`; đánh dấu và đẩy các ô `starts` vào queue (bỏ qua góc trùng).
4. Lặp: lấy `(r, c)` ra; với mỗi hàng xóm `(nr, nc)` trong lưới, chưa `seen`, và `heights[nr][nc] ≥ heights[r][c]` ⇒ đánh dấu và đẩy vào.
5. Chạy `bfs` cho Pacific được `pac`, cho Atlantic được `atl`.
6. Duyệt lưới theo hàng rồi cột, ô nào `pac && atl` thì đưa vào kết quả – tự động đã sắp xếp.

## Chứng minh đúng

**Bổ đề:** ô X nằm trong `pac` ⇔ tồn tại đường từ X tới một ô mép Pacific mà độ cao không tăng dọc đường.

- (⇐) Giả sử đường X = v₀ → v₁ → … → vₖ (vₖ sát Pacific) với h(vᵢ) ≥ h(vᵢ₊₁). Đọc ngược vₖ → … → v₀ là dãy không giảm. vₖ là nguồn BFS; quy nạp lùi: nếu vᵢ₊₁ được thăm thì khi BFS xét hàng xóm vᵢ, điều kiện `h(vᵢ) ≥ h(vᵢ₊₁)` thoả nên vᵢ được thăm (hoặc đã được thăm từ trước bằng đường khác). Vậy X ∈ `pac`.
- (⇒) Mỗi ô được đẩy vào chỉ khi cao ≥ ô cha đã được thăm; truy ngược chuỗi cha tới một nguồn cho ta đường xuống dốc từ X ra biển.

Hai tập độc lập, nên giao đúng là các ô chảy ra cả hai đại dương. BFS không cần thứ tự gì đặc biệt – chỉ cần tính **khả năng tới được**, nên DFS cũng đúng.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Brute force (DFS từ mỗi ô) | O((m·n)²) | O(m·n) |
| BFS ngược từ hai đại dương | O(m·n) | O(m·n) |
| DFS đệ quy ngược | O(m·n) | O(m·n) (stack đệ quy) |

Mỗi ô vào queue tối đa một lần cho mỗi đại dương, mỗi lần xét 4 hàng xóm ⇒ khoảng 8·m·n phép so sánh.

## Tradeoff

- **BFS vs DFS:** cùng O(m·n). DFS đệ quy ngắn gọn hơn khi code trên bảng, nhưng lưới 200 × 200 dạng "rắn" có thể tạo độ sâu 40 000 ⇒ tràn stack trong JS/Python. BFS với queue tường minh an toàn hơn.
- **Hai mảng `seen` vs một mảng bitmask:** dùng một mảng số với bit 1 = Pacific, bit 2 = Atlantic tiết kiệm bộ nhớ, đáp án là các ô có giá trị 3. Đổi lại code khó đọc hơn.
- **Không sửa input:** ta không ghi đè `heights`, nên cần `seen` riêng.

## Lợi / Hại

**Lợi**
- Tuyến tính theo kích thước lưới, tối ưu về mặt tiệm cận.
- Kỹ thuật "đi ngược từ đích" tái sử dụng được cho rất nhiều bài lưới.

**Hại**
- Dễ nhầm chiều so sánh (`≥` khi đi ngược, `≤` khi đi xuôi).
- Phải giữ hai mảng `seen` cùng kích thước lưới.

## Use case thực tế

- **Thuỷ văn / GIS:** tính lưu vực (watershed) – vùng đất nào đổ nước về con sông nào, dựa trên mô hình độ cao số (DEM).
- **Quy hoạch đô thị:** xác định khu vực có thể thoát nước ra hai hệ thống cống khác nhau.
- **Game:** mô phỏng dòng chảy, tính vùng "an toàn" có lối thoát ra hai phía bản đồ.
- **Phân tích phụ thuộc ngược:** tìm mọi module có thể ảnh hưởng tới cả hai service – đi ngược cạnh phụ thuộc từ hai đích rồi lấy giao.

## Lỗi thường gặp

- Đi ngược nhưng vẫn dùng điều kiện "xuống dốc" `<`, kết quả sai hoàn toàn.
- Quên dấu `=`: nước chảy được sang ô **cùng độ cao**.
- Chạy DFS từ từng ô (brute force) và bị TLE.
- Đánh dấu `seen` khi lấy ra khỏi queue thay vì khi đẩy vào ⇒ một ô bị đẩy nhiều lần.
- Nhầm mép: Pacific là trên + trái, Atlantic là dưới + phải.
- Dùng `queue.shift()` trong JS ⇒ O(n) mỗi lần; dùng chỉ số `head`.

## Biến thể

- **Surrounded Regions (130), Number of Enclaves (1020):** cũng đi từ mép vào trong để đánh dấu ô "thoát được", phần còn lại là ô bị kẹt.
- **Swim in Rising Water (778):** cần thời điểm nhỏ nhất ⇒ Dijkstra / binary search + BFS thay vì chỉ "tới được".
- **K đại dương:** chạy K lần BFS, giao K tập (hoặc dùng bitmask K bit).
- **Nước chảy 8 hướng / chỉ chảy khi thấp hơn hẳn:** chỉ đổi `dirs` hoặc bỏ dấu `=`.
