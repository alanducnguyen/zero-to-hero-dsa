## Cách trình bày trong phỏng vấn

1. Làm rõ đề: đi theo một chiều, bình rỗng lúc đầu, không giới hạn dung tích, nghiệm (nếu có) là duy nhất.
2. Chuyển về `diff[i] = gas[i] − cost[i]`; nêu brute force O(n²) thử từng trạm làm mốc.
3. Nêu hai quan sát: `Σ diff < 0` ⇒ `-1`; hụt xăng ở `i` khi xuất phát từ `start` ⇒ loại cả `[start, i]`.
4. Chứng minh ngắn quan sát 2: tới trạm `k` ở giữa với bình ≥ 0, xuất phát thẳng từ `k` chỉ có bình ít hơn.
5. Viết code một lượt, chạy tay với `[1,2,3,4,5] / [3,4,5,1,2]` ⇒ 3; nêu O(n) / O(1).

## Câu hỏi follow-up thường gặp

- **Tại sao `total ≥ 0` thì chắc chắn có nghiệm?** Các đoạn bị reset có tổng âm; phần dư từ `start` tới cuối ≥ |tổng các đoạn đó| nên đủ bù khi quay vòng.
- **Tại sao không cần quay lại kiểm tra vòng?** Vì chứng minh trên; nếu muốn chắc, có thể mô phỏng thêm một lần O(n).
- **Nếu nhiều nghiệm và muốn tất cả?** Tiền tố trên mảng nhân đôi + min trong cửa sổ trượt (monotonic deque).
- **Nếu bình giới hạn dung tích C?** Bổ đề hỏng (đổ tràn bị mất), phải mô phỏng.
- **Liên hệ Kadane?** Cùng ý "tổng chạy âm ⇒ vứt tiền tố, bắt đầu lại".

## Checklist nhận diện pattern

- Mảng **vòng tròn**, cần chọn điểm bắt đầu để tổng chạy luôn ≥ 0.
- Có thể chứng minh "thất bại ở i ⇒ mọi điểm bắt đầu trước i cũng thất bại" ⇒ nhảy cóc ứng viên, greedy một lượt.
- Điều kiện tồn tại toàn cục đơn giản (tổng ≥ 0) tách rời khỏi việc tìm vị trí.

## Bài luyện tập liên quan

- LeetCode 134 – Gas Station.
- LeetCode 53 – Maximum Subarray.
- LeetCode 871 – Minimum Number of Refueling Stops.
- LeetCode 918 – Maximum Sum Circular Subarray.
- LeetCode 55 – Jump Game.
