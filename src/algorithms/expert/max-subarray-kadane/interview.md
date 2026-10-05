## Cách trình bày trong phỏng vấn

1. Hỏi: "Subarray rỗng có được phép không? Mảng có thể toàn âm không?" – quyết định cách khởi tạo.
2. Nêu O(n²) với prefix sum như baseline, rồi: "tôi định nghĩa dp[i] là max tổng kết thúc tại i".
3. Suy công thức, chỉ ra chỉ cần dp[i−1] ⇒ O(1) bộ nhớ.
4. Code 5 dòng, chạy tay ví dụ chuẩn `[-2,1,-3,4,-1,2,1,-5,4]`.
5. Chủ động nêu liên hệ prefix sum và biến thể tích/vòng tròn – đó là nơi câu hỏi sẽ đi tới.

## Câu hỏi follow-up thường gặp

- **Trả về subarray chứ không chỉ tổng?** Lưu `curStart`; khi `current` reset đặt `curStart = i`; khi `best` tăng lưu `[curStart, i]`.
- **Tích lớn nhất?** Giữ cả max và min kết thúc tại i vì âm × âm = dương; khi `nums[i] < 0` hoán đổi max/min trước khi cập nhật.
- **Mảng vòng tròn?** Đáp án là `max(kadane)` hoặc `total − min subarray` (phần "bọc" qua hai đầu); nếu toàn âm, chỉ dùng kadane.
- **Tại sao bắt đầu lại khi current < 0?** Một tiền tố âm chỉ làm giảm mọi subarray chứa nó; bỏ nó luôn không tệ hơn.
- **Kadane có phải greedy không?** Có thể nhìn là greedy, nhưng đúng vì nó chính là DP với công thức đã chứng minh.
- **Chia để trị O(n log n) làm thế nào?** Max của: trái, phải, và subarray băng qua giữa (max suffix trái + max prefix phải). Cơ sở cho segment tree.
- **Subarray có độ dài ít nhất k?** Prefix sum; với mỗi r ≥ k−1, trừ min prefix trong `[0, r−k+1]`.
- **Subarray có tổng đúng bằng k?** Không phải Kadane; prefix sum + HashMap đếm `P[r] − k`.
- **Ma trận 2D?** Cố định hàng trên/dưới, cộng dồn theo cột thành mảng 1D, Kadane – O(m²·n).
- **Stream dữ liệu?** Kadane là online, O(1) mỗi phần tử.

## Checklist nhận diện pattern

- "Subarray **liên tiếp** có tổng/tích **lớn nhất**" ⇒ Kadane.
- "Lợi nhuận lớn nhất mua một lần bán một lần" ⇒ Kadane trên chênh lệch.
- "Tổng bằng k / chia hết / số lượng subarray" ⇒ prefix sum + HashMap, không phải Kadane.
- "Max trong mọi cửa sổ cố định" ⇒ deque đơn điệu.
- "Truy vấn đoạn + cập nhật" ⇒ segment tree lưu (sum, maxPrefix, maxSuffix, maxSub).

## Bài luyện tập liên quan

- 53 Maximum Subarray → 121 Best Time to Buy and Sell Stock → 152 Maximum Product Subarray.
- 918 Maximum Sum Circular Subarray, 1186 Maximum Subarray Sum with One Deletion.
- 560 Subarray Sum Equals K, 974 Subarray Sums Divisible by K, 325 Maximum Size Subarray Sum Equals k (prefix sum).
- 363 Max Sum of Rectangle No Larger Than K (Hard, 2D + Kadane + sorted set).
