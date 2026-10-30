## Cách trình bày trong phỏng vấn

1. Làm rõ đề: `nums[i]` là bước **tối đa**, phần tử không âm, n ≥ 1.
2. Nêu nhanh hướng DP O(n²) để có lời giải đúng làm mốc.
3. Chỉ ra quan sát then chốt: vùng tới được luôn là đoạn liên tục `[0, farthest]` ⇒ chỉ cần nhớ biên.
4. Viết greedy: duyệt i, nếu `i > farthest` thì false, cập nhật `farthest`, nếu chạm `n − 1` thì true.
5. Chạy tay với `[3,2,1,0,4]` (false) và `[2,3,1,1,4]` (true); nêu O(n) thời gian, O(1) bộ nhớ.

## Câu hỏi follow-up thường gặp

- **Chứng minh greedy đúng?** Bất biến "tập ô tới được là `[0, farthest]`"; tính liên tục đến từ việc được nhảy *bất kỳ* số bước ≤ `nums[i]`.
- **Trả về số bước nhảy tối thiểu?** Jump Game II: BFS theo tầng – mỗi tầng là đoạn `[start, currentEnd]`, tầng sau mở rộng tới `farthest`.
- **Nếu phải nhảy đúng `nums[i]` bước?** Mất tính liên tục ⇒ BFS/DFS trên đồ thị ngầm (Jump Game III).
- **Có thể duyệt ngược không?** Có: giữ `goal = n − 1`, đi từ phải sang trái, nếu `i + nums[i] ≥ goal` thì `goal = i`; cuối cùng kiểm tra `goal == 0`.
- **Phần tử âm thì sao?** Đề không cho phép; nếu có thì có thể nhảy lùi ⇒ thành bài đồ thị tổng quát.

## Checklist nhận diện pattern

- "Có tới được cuối không?", "tầm với tối đa", mỗi vị trí cho một khoảng `[i, i + k]` ⇒ greedy farthest-reach.
- Các khoảng phủ nối tiếp nhau, cần biết có phủ kín không / phủ tối thiểu bao nhiêu ⇒ cùng họ interval covering.
- DP O(n²) chạy được nhưng n lớn ⇒ tìm tính đơn điệu/liên tục để nén trạng thái thành một biến.

## Bài luyện tập liên quan

- LeetCode 55 – Jump Game.
- LeetCode 45 – Jump Game II.
- LeetCode 1306 – Jump Game III.
- LeetCode 1024 – Video Stitching.
- LeetCode 1326 – Minimum Number of Taps to Open to Water a Garden.
