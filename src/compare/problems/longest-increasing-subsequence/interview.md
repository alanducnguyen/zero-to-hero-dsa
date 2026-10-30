## Kịch bản trình bày

1. **Làm rõ** (30s): tăng ngặt hay không giảm? cần độ dài hay dãy? n bao nhiêu?
2. **Brute force** (1 phút): "Mỗi phần tử lấy hoặc bỏ, chỉ lấy khi lớn hơn phần tử trước ⇒ O(2ⁿ). Trạng thái là (i, prev) – chỉ O(n²) cặp, nên có overlapping subproblems."
3. **DP O(n²)** (2 phút): "dp[i] = LIS kết thúc tại i. Kết thúc tại i để biết phần tử cuối mà so sánh." Viết hai vòng lặp, nhấn mạnh đáp án là `max dp`, không phải `dp[n−1]`.
4. **Tối ưu O(n log n)** (3 phút): "Với mỗi độ dài, chỉ cần đuôi nhỏ nhất – đuôi nhỏ hơn luôn dễ nối hơn. Mảng tails tăng ngặt ⇒ tìm nhị phân." Chạy tay `[10, 9, 2, 5, 3, 7, 101, 18]`: tails đi qua `[10] → [9] → [2] → [2,5] → [2,3] → [2,3,7] → [2,3,7,101] → [2,3,7,18]`.
5. **Cảnh báo chủ động**: "tails không phải dãy LIS thật, chỉ độ dài đúng." Câu này ghi điểm vì cho thấy hiểu bản chất.
6. **Chốt**: O(n log n) thời gian, O(n) bộ nhớ.

## Follow-up thường gặp

- **Chứng minh tails tăng ngặt?** Nếu tails[k] ≥ tails[k+1], bỏ phần tử cuối của dãy dài k+2 cho dãy dài k+1 có đuôi < tails[k+1] ≤ tails[k] – trái định nghĩa "nhỏ nhất".
- **In ra một LIS?** DP: mảng `parent`. Patience: lưu chỉ số trong tails, `parent[i] = tailsIdx[lo − 1]`, lần ngược từ `tailsIdx[last]`.
- **Không giảm thay vì tăng ngặt?** DP đổi `<` thành `≤`; patience dùng upper_bound.
- **Đếm số LIS (LC 673)?** DP O(n²) thêm `cnt[i]`: khi dp[j]+1 > dp[i] thì gán, bằng thì cộng dồn.
- **Russian Doll Envelopes (LC 354)?** Sắp (w tăng, h giảm) để hai phong bì cùng w không lồng nhau, rồi LIS trên h.
- **Tại sao memo brute force là O(n²) bộ nhớ còn DP chỉ O(n)?** Memo nhớ cả cặp (i, prev); DP gộp prev vào định nghĩa "kết thúc tại i".
- **Liên hệ LCS?** LIS(nums) = LCS(nums, sorted(unique(nums))) – nhưng O(n²), chỉ là góc nhìn.
