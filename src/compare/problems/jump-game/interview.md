## Kịch bản trình bày

1. **Làm rõ đề** (30s): `nums[i]` là bước *tối đa*; nhảy quá ô cuối có tính không (có); `nums = [0]` ⇒ true.
2. **Backtracking** (1 phút): "Từ ô i thử mọi bước, chỉ cần một nhánh thành công." Nói ngay: hàm mũ vì cùng một ô bị thử từ nhiều đường.
3. **Memo** (30s): "go(i) không phụ thuộc đường đi ⇒ lưu lại", còn O(n²) vì mỗi ô quét cả tầm nhảy.
4. **Bottom-up** (1 phút): bỏ đệ quy, tính `good[]` từ cuối. Chạy tay `[3, 2, 1, 0, 4]` ⇒ chỉ ô 4 tốt, ô 0..3 đều không vươn tới 4.
5. **Nhận xét then chốt** (30s): "Chỉ cần ô tốt gần nhất" ⇒ một biến. Hoặc trái → phải: vùng tới được là đoạn liền `[0, farthest]`.
6. **Greedy** (1 phút): viết 5 dòng, nêu bất biến và hai điều kiện thoát sớm (`i > farthest` ⇒ false, `farthest ≥ n−1` ⇒ true).
7. **Chốt**: O(n) thời gian, O(1) bộ nhớ; nêu test biên `[0]`, `[0, 1]`, `[1, 0, 1]`.

## Follow-up thường gặp

- **Jump Game II (LC 45) – số bước ít nhất?** Greedy theo tầng: giữ `end` (biên tầng hiện tại) và `farthest`; khi `i == end` thì `jumps++`, `end = farthest`. Đây là BFS ngầm, O(n).
- **Jump Game III (LC 1306) – nhảy `i ± arr[i]`, tới ô có giá trị 0?** Vùng tới được không liền ⇒ BFS/DFS với visited, O(n).
- **Jump Game VII / có ràng buộc bước tối thiểu?** Sliding window đếm số ô tới được trong cửa sổ, hoặc prefix sum.
- **Trapping Rain Water (LC 42)** thường được hỏi cùng buổi như một bài "quét tích luỹ": prefix max / hai con trỏ – cùng tinh thần "chỉ giữ một biên tốt nhất thay vì cả bảng".
- **Vì sao greedy đúng?** Chứng minh bằng bất biến đoạn liền + quy nạp theo i; phản ví dụ khi bất biến vỡ là Jump Game III.
- **In ra một đường đi?** Lưu `from[j] = i` khi farthest được nới bởi i, hoặc dùng DP/backtracking có memo.

## Checklist nhận diện

- Câu hỏi có/không về khả năng tới được + bước chỉ đi tới ⇒ nghĩ ngay "tầm với xa nhất".
- Trạng thái DP chỉ dùng "có tồn tại ô tốt trong khoảng" ⇒ thường nén được thành một biên.
- Đi hai chiều hoặc có chu trình ⇒ quay về BFS/DFS.

## Bài luyện tập

- LC 55 Jump Game, LC 45 Jump Game II, LC 1306 Jump Game III, LC 1871 Jump Game VII, LC 1024 Video Stitching, LC 1326 Minimum Number of Taps.
