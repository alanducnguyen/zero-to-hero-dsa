## Cách trình bày trong phỏng vấn

1. Hỏi rõ: "Có số âm không? Có số 0 không? Cần đếm hay trả về đoạn? Mảng con là liên tiếp?" – câu trả lời "có số âm" loại ngay sliding window.
2. Nêu brute force O(n²) với tổng chạy, rồi nói: "tổng đoạn = hiệu hai prefix, nên tôi biến bài thành Two Sum trên prefix".
3. Viết công thức `P[j] − P[i] = k ⇔ P[i] = P[j] − k`, giải thích vì sao cần **đếm tần suất** (prefix lặp lại).
4. Nhấn mạnh hai chi tiết ghi điểm: `seen[0] = 1` và tra trước – ghi sau.
5. Chạy tay `[1,1,1], k = 2` (đáp án 2) và `[0,0,0], k = 0` (đáp án 6).

## Câu hỏi follow-up thường gặp

- **Nếu mọi số đều dương?** Dùng sliding window O(1) bộ nhớ: mở rộng phải, co trái khi tổng > k.
- **Tìm đoạn dài nhất có tổng k?** Map lưu chỉ số **đầu tiên** của mỗi prefix, không cập nhật lại.
- **Tổng chia hết cho k?** Dùng `prefix mod k` (chuẩn hoá về không âm) làm key.
- **Trên ma trận 2D?** Cố định cặp hàng trên/dưới, cộng dồn cột thành mảng 1D ⇒ O(R²·C).
- **Trên cây (đường đi xuống)?** DFS mang theo prefix, thêm vào map khi vào nút, bớt khi rời nút.
- **Đếm đoạn có tổng ≤ k (có số âm)?** Cần cấu trúc có thứ tự (BIT / merge sort đếm) ⇒ O(n log n).
- **Stream vô hạn?** Thuật toán vốn online; map có thể phình – thảo luận giới hạn bộ nhớ.

## Checklist nhận diện pattern

- "Số mảng con **liên tiếp** có tổng / số lượng / độ lệch = X" ⇒ prefix sum + HashMap.
- Có **số âm** hoặc yêu cầu "bằng đúng" ⇒ nghĩ prefix + map trước sliding window.
- "Bằng nhau số 0 và 1", "số lẻ đúng k lần" ⇒ biến đổi phần tử (±1, 0/1) rồi prefix.
- Cần **đếm** ⇒ map tần suất; cần **dài nhất** ⇒ map chỉ số đầu tiên.

## Bài luyện tập liên quan

- LeetCode 560 – Subarray Sum Equals K
- LeetCode 974 – Subarray Sums Divisible by K
- LeetCode 523 – Continuous Subarray Sum
- LeetCode 525 – Contiguous Array
- LeetCode 1248 – Count Number of Nice Subarrays
- LeetCode 437 – Path Sum III
- LeetCode 1074 – Number of Submatrices That Sum to Target
