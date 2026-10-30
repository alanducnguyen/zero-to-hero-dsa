## Cách trình bày trong phỏng vấn

1. Diễn đạt lại: "Tìm ô có đường không tăng độ cao tới cả mép trên/trái và mép dưới/phải."
2. Nêu brute force: DFS từ mỗi ô ⇒ O((m·n)²), và chỉ ra chỗ lặp lại: nhiều ô đi chung một đường ra biển.
3. Đề xuất **tư duy ngược**: từ biển leo lên dốc (điều kiện `≥`), mỗi đại dương một lần multi-source BFS.
4. Đáp án = giao hai tập `pac` và `atl`.
5. Nói edge case: lưới rỗng, lưới 1 ô (luôn chạm cả hai biển), lưới một hàng/một cột (mọi ô đều đúng).
6. Phân tích O(m·n) thời gian và bộ nhớ; nhắc vì sao chọn BFS thay vì DFS đệ quy (độ sâu stack).

## Câu hỏi follow-up thường gặp

- **Vì sao không thể dùng một BFS duy nhất?** Hai điều kiện độc lập; cần biết riêng từng đại dương rồi mới giao.
- **Bỏ `=` thì sao?** Nước chỉ chảy khi thấp hơn hẳn ⇒ đổi điều kiện thành `>` khi đi ngược.
- **Có thể tiết kiệm bộ nhớ?** Dùng một mảng bitmask (1 = Pacific, 2 = Atlantic), đáp án là ô có giá trị 3.
- **Lưới rất lớn, không vừa RAM?** Xử lý theo khối, hoặc union-find các ô cùng "lưu vực" rồi xét các vùng chạm biển.
- **DFS hay BFS?** Cùng độ phức tạp; BFS tránh tràn stack, DFS ngắn hơn để viết nhanh.
- **Nếu hỏi số ô chỉ chảy ra đúng một đại dương?** `pac XOR atl`.

## Checklist nhận diện pattern

- "Từ ô nào có thể tới được biên / đích" mà đích **ít** còn nguồn **nhiều** ⇒ đi ngược từ đích.
- Có nhiều đích cùng loại ⇒ multi-source BFS/DFS từ tất cả chúng.
- "Thoả cả hai điều kiện tới được" ⇒ chạy hai lần, lấy giao.
- Lưới + chỉ hỏi khả năng tới được (không hỏi khoảng cách) ⇒ BFS hoặc DFS đều được.

## Bài luyện tập

- [LeetCode 417 – Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)
- [LeetCode 130 – Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)
- [LeetCode 1020 – Number of Enclaves](https://leetcode.com/problems/number-of-enclaves/)
- [LeetCode 994 – Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- [LeetCode 778 – Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/)
