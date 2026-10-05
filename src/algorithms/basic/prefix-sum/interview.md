## Cách trình bày trong phỏng vấn

1. Thấy "nhiều truy vấn tổng đoạn" hoặc "subarray có tổng …" ⇒ nói ngay prefix sum.
2. Viết `prefix` với n+1 phần tử, giải thích `prefix[0] = 0`.
3. Với bài đếm tổng k: nêu biến đổi `prefix[l] = prefix[r+1] − k` rồi "đây là Two Sum trên prefix" – người phỏng vấn sẽ gật đầu.
4. Chạy tay `[1,1,1]`, k = 2 ⇒ 2. Nhấn mạnh thứ tự: đếm trước, ghi sau; `seen[0] = 1`.
5. Nêu giới hạn (tĩnh) và cách mở rộng (Fenwick).

## Câu hỏi follow-up thường gặp

- **Mảng thay đổi giữa các truy vấn?** Fenwick tree (BIT) hoặc segment tree: O(log n) cập nhật và truy vấn.
- **Tại sao không dùng sliding window cho tổng k?** Có số âm thì cửa sổ không đơn điệu; prefix + Map đúng với mọi dấu.
- **Subarray dài nhất có tổng k?** Map prefix → chỉ số **đầu tiên** (không ghi đè), độ dài = i − seen[run − k].
- **Tổng chia hết cho k?** Map theo `((run % k) + k) % k`; hai prefix cùng dư ⇒ đoạn giữa chia hết.
- **Tổng hình chữ nhật trong ma trận?** Prefix 2D: `P[i][j] = a + P[i−1][j] + P[i][j−1] − P[i−1][j−1]`; truy vấn bằng bao hàm – loại trừ.
- **Cộng v lên đoạn [l, r] cho 10⁵ truy vấn rồi in mảng?** Difference array: `d[l] += v`, `d[r+1] −= v`, prefix một lần.
- **Max tổng đoạn thay vì tổng?** Prefix không đủ; dùng sparse table (tĩnh) hoặc segment tree.
- **Bộ nhớ O(1) cho đếm tổng k?** Không với số âm (Map cần thiết); với số không âm dùng sliding window.

## Checklist nhận diện pattern

- "Tổng đoạn [l, r]", "nhiều truy vấn", "tích luỹ" ⇒ prefix sum.
- "Subarray có tổng = k / chia hết k / XOR = k", đặc biệt có **số âm** ⇒ prefix + HashMap.
- "Cộng lên một đoạn nhiều lần" ⇒ difference array.
- "Tổng hình chữ nhật" ⇒ prefix 2D.
- Cần cập nhật ⇒ Fenwick / segment tree.

## Bài luyện tập liên quan

- 303 Range Sum Query → 304 Range Sum Query 2D → 724 Find Pivot Index.
- 560 Subarray Sum Equals K → 974 Subarray Sums Divisible by K → 525 Contiguous Array → 325 Max Size Subarray Sum Equals k.
- 1109 Corporate Flight Bookings (difference array), 1442 Count Triplets with XOR (prefix XOR), 307 Range Sum Query Mutable (Fenwick).
