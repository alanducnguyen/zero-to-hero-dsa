## Phân tích

**Gộp + sort** là lời giải một dòng, O(N log N). Nó bỏ phí thông tin "từng list đã sắp xếp" – nhưng trong thực tế với N nhỏ, sort thư viện rất nhanh và đây là cách ít bug nhất.

**Trộn lần lượt** dùng `mergeTwo` k−1 lần. Vấn đề: kết quả tích luỹ bị duyệt lại ở mỗi lần trộn, phần tử của list đầu bị chép k lần ⇒ O(N·k). Với k nhỏ (2–3) thì không sao; với k = 10⁴ thì tệ hơn cả sort.

**Min-heap** giữ đúng k đại diện; mỗi phần tử ra/vào heap một lần ⇒ O(N log k). Ưu điểm quyết định: hoạt động với **iterator/luồng** (chỉ cần `next()` của mỗi nguồn) và bộ nhớ phụ O(k). Đây là cách external sort và LSM compaction dùng.

**Chia để trị** cũng O(N log k): trộn cặp đôi, mỗi tầng O(N), log k tầng. Không cần heap (JS không có sẵn), tái dùng `mergeTwo` của bài Merge Two Sorted Lists, và song song hoá được. Nhược: cần toàn bộ dữ liệu, bộ nhớ trung gian O(N) nếu dùng mảng (O(1) với linked list).

## Xếp hạng

1. **Min-heap** – O(N log k), O(k). Mặc định, đặc biệt khi k lớn hoặc dữ liệu luồng.
2. **Chia để trị** – O(N log k), O(log k) stack (linked list). Ngang heap; chọn khi không có heap sẵn hoặc muốn tái dùng mergeTwo.
3. **Gộp + sort** – O(N log N), O(N). Chọn khi N nhỏ và muốn chắc chắn.
4. **Trộn lần lượt** – O(N·k). Chỉ khi k ≤ 3.

## Khi nào thứ hạng đổi

- k = 2 ⇒ mergeTwo trực tiếp, mọi cách khác là thừa.
- Linked list và cấm tạo node mới ⇒ chia để trị với mergeTwo nối lại tại chỗ, O(1) bộ nhớ phụ ngoài stack.
- Dữ liệu trên đĩa, chỉ có k con trỏ đọc ⇒ heap (hoặc tournament tree) là lựa chọn duy nhất.
- N rất nhỏ (< 100) ⇒ sort thư viện nhanh nhất trên thực tế.
