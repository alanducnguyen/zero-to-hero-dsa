## Phân tích

**Brute force** liệt kê n(n+1)/2 đoạn với cộng dồn O(1) mỗi bước ⇒ O(n²). Dùng để kiểm chứng và làm rõ đề, không hơn.

**Prefix sum + min prefix** biến bài thành "với mỗi j, tìm i ≤ j sao cho P[j+1] − P[i] lớn nhất" ⇒ chỉ cần nhớ min P. Đây là cách nhìn **tổng quát nhất**: cùng khung giải được "đoạn có tổng = k", "đoạn dài nhất tổng ≤ k", và ma trận 2D (Maximum Sum Rectangle).

**Chia để trị** không phải cách tốt nhất về thời gian (O(n log n)) nhưng là cấu trúc **song song hoá** được và là nền của Segment Tree cho truy vấn "max subarray trong đoạn [l, r]" với cập nhật. Phỏng vấn hỏi để kiểm tra bạn có tách được "đoạn vắt qua giữa" không.

**Kadane** là DP 1D: `cur[i] = max(nums[i], cur[i−1] + nums[i])`. O(n)/O(1), 4 dòng, và tư duy "kéo dài hay bắt đầu lại" tái dùng ở Best Time to Buy and Sell Stock, Maximum Product Subarray.

## Xếp hạng

1. **Kadane** – O(n)/O(1). Mặc định.
2. **Prefix sum** – O(n)/O(1). Ngang Kadane, chọn khi bài biến thể cần prefix (tổng = k, 2D).
3. **Chia để trị** – O(n log n)/O(log n). Chọn khi cần song song, hoặc truy vấn đoạn với Segment Tree.
4. **Brute force** – O(n²)/O(1). Chỉ để kiểm chứng.

## Khi nào thứ hạng đổi

- Hỏi "max subarray trong đoạn [l, r] bất kỳ, có cập nhật" ⇒ Segment Tree lưu (sum, prefixBest, suffixBest, best) – chính là chia để trị, lên hạng 1.
- Mảng vòng tròn ⇒ Kadane 2 lần (max thường và tổng − min subarray).
- Dữ liệu phân tán trên nhiều máy ⇒ chia để trị / gộp 4 giá trị mỗi khối.
