## Cách trình bày trong phỏng vấn

1. Nêu cả 3 cách (sort, heap, quickselect) với độ phức tạp trong 30 giây; hỏi "dữ liệu là stream hay mảng? k nhỏ so với n?" để chọn.
2. Nếu heap: nói rõ "min-heap kích thước k, đỉnh là phần tử lớn thứ k". Giải thích tại sao min chứ không phải max.
3. Hỏi "tôi có được dùng thư viện heap không?" – trong JS câu trả lời thường là không ⇒ viết `MinHeap` với push/pop/siftUp/siftDown. Luyện viết trong 5 phút.
4. Nêu O(n log k) / O(k); so sánh với quickselect O(n) trung bình.

## Câu hỏi follow-up thường gặp

- **Tại sao heapify O(n) chứ không O(n log n)?** Sift down từ node cuối không lá về gốc: node ở độ cao h tốn O(h), số node ở độ cao h ≈ n/2^(h+1) ⇒ tổng Σ h·n/2^(h+1) = O(n).
- **Làm quickselect, worst case?** Random pivot ⇒ kỳ vọng O(n); median-of-medians ⇒ O(n) đảm bảo nhưng chậm thực tế.
- **Stream vô hạn, bộ nhớ O(k)?** Chính là cách heap trong bài; quickselect không áp dụng.
- **Phần tử lớn thứ k trong BST?** Duyệt in-order ngược (phải–gốc–trái), đếm tới k – O(h + k).
- **Phần tử lớn thứ k trong ma trận sắp xếp hàng và cột?** Min-heap với hàng đầu, O(k log n); hoặc binary search trên giá trị, O(n log(max−min)).
- **Max-heap trong JS?** Đảo dấu khi push/pop, hoặc truyền comparator.
- **Heap vs BST (TreeMap)?** Heap: O(1) peek, O(log n) push/pop, không tìm kiếm. BST cân bằng: O(log n) mọi thao tác kể cả tìm/xoá bất kỳ, duyệt có thứ tự, nhưng hằng số lớn và tốn bộ nhớ con trỏ.
- **Xoá phần tử bất kỳ khỏi heap?** Lazy deletion (đánh dấu, bỏ qua khi pop) hoặc indexed heap (map value→index, O(log n)).

## Checklist nhận diện pattern

- "Top k", "k lớn nhất / nhỏ nhất / gần nhất / thường xuyên nhất" ⇒ heap kích thước k (hoặc quickselect nếu offline).
- "Stream", "liên tục", "online" ⇒ heap.
- "Merge k …" ⇒ min-heap chứa k đầu.
- "Median động" ⇒ hai heap.
- "Lấy nhỏ nhất/lớn nhất lặp đi lặp lại với dữ liệu thay đổi" ⇒ priority queue.

## Bài luyện tập liên quan

- 215 Kth Largest → 703 Kth Largest in a Stream → 347 Top K Frequent → 973 K Closest Points.
- 23 Merge k Sorted Lists, 378 Kth Smallest in Sorted Matrix, 373 K Pairs with Smallest Sums.
- 295 Find Median from Data Stream (Hard), 621 Task Scheduler, 1046 Last Stone Weight.
