## Cách trình bày trong phỏng vấn

1. Nêu bài toán "cập nhật điểm + tổng đoạn xen kẽ", chỉ ra prefix sum và mảng thường đều có một thao tác O(n).
2. Nói "tôi dùng Fenwick Tree: mỗi `tree[i]` là tổng `lowbit(i)` phần tử kết thúc tại i" rồi vẽ mảng 8 phần tử minh hoạ đoạn của từng ô.
3. Viết `add` và `prefixSum` (mỗi hàm 1 vòng for), giải thích `i & -i`.
4. Phân tích O(log n), nêu giới hạn: cần phép toán có nghịch đảo.
5. Nếu bài gốc là đếm (nghịch thế, smaller-after-self): thêm bước nén toạ độ rồi duyệt từ phải qua trái.

## Câu hỏi follow-up thường gặp

- **Vì sao `i & -i` là bit thấp nhất?** `-i` là bù hai: đảo bit rồi cộng 1 ⇒ mọi bit dưới bit 1 thấp nhất thành 0, bit đó giữ nguyên, trên nó đảo ⇒ AND chỉ còn bit đó.
- **Fenwick vs Segment Tree?** Fenwick ngắn, nhanh, ít bộ nhớ; Segment Tree tổng quát hơn (min/max/gcd, lazy, truy vấn trên cây đệ quy).
- **Tìm min đoạn bằng Fenwick?** Không trực tiếp (không có "trừ"). Chỉ khi cập nhật chỉ làm giảm min và truy vấn tiền tố.
- **Build O(n)?** Đẩy `tree[i]` lên cha `i + lowbit(i)` một lượt.
- **Cập nhật đoạn?** Mảng sai phân + BIT; hoặc hai BIT cho cả cập nhật và truy vấn đoạn.
- **Đếm số phần tử nhỏ hơn x trong dòng dữ liệu?** Nén giá trị về 1..k, BIT đếm; `prefixSum(rank(x) − 1)`.
- **k-th phần tử nhỏ nhất?** Nhị phân theo luỹ thừa 2 từ cao xuống trên BIT đếm – O(log n), không cần tìm kiếm nhị phân ngoài.

## Checklist nhận diện pattern

- "Cập nhật phần tử" và "tổng/đếm đoạn" xen kẽ, n và q đều lớn ⇒ BIT.
- Đếm cặp `(i < j)` với điều kiện so sánh giá trị ⇒ nén toạ độ + BIT.
- Truy vấn theo thời gian thực trên dữ liệu thay đổi (leaderboard, histogram động).
- Cần min/max hoặc lazy ⇒ chuyển sang Segment Tree.

## Bài luyện tập

- 307 Range Sum Query – Mutable (bài gốc).
- 315 Count of Smaller Numbers After Self, 493 Reverse Pairs, 327 Count of Range Sum.
- 1395 Count Number of Teams, 2179 Count Good Triplets in an Array.
- 308 Range Sum Query 2D – Mutable (BIT 2D).
