## Bài toán

Cho mảng `nums` và số `k`, tìm phần tử **lớn thứ k** (theo thứ tự sắp xếp, không phải thứ k phân biệt). `[3,2,1,5,6,4], k=2` → `5`.

Bài này (LeetCode 215) nằm trong top 5 câu hỏi của Meta và Amazon vì nó mở ra 3 hướng giải với tradeoff rõ ràng: sắp xếp O(n log n), heap O(n log k), quickselect O(n) trung bình. Và quan trọng hơn: nó là cái cớ để hỏi "hãy cài đặt heap" – JavaScript không có sẵn PriorityQueue nên bạn phải viết được trong 5 phút.

## Ý tưởng / Trực giác

**Heap** là cây nhị phân hoàn chỉnh lưu trong mảng, với tính chất **mỗi cha ≤ mỗi con** (min-heap). Đỉnh luôn là min. Vì cây hoàn chỉnh, không cần con trỏ: con của `i` là `2i+1`, `2i+2`; cha của `i` là `⌊(i-1)/2⌋`.

- **push**: thêm vào cuối (giữ hoàn chỉnh), rồi "nổi" lên (sift up) tới khi cha ≤ nó.
- **pop**: lấy gốc, đưa phần tử cuối lên gốc, rồi "chìm" xuống (sift down) tới khi nhỏ hơn cả hai con.

Mỗi thao tác O(log n) vì cây cao log n.

**Top-k với min-heap kích thước k:** duyệt từng số, push vào heap; nếu heap > k phần tử thì pop min. Sau khi duyệt hết, heap chứa đúng k phần tử lớn nhất, và đỉnh (nhỏ nhất trong số đó) là phần tử lớn thứ k. Trực giác: dùng **min**-heap để tìm **max**-k, vì ta cần nhanh chóng biết "phần tử yếu nhất trong top-k hiện tại" để loại bỏ.

## Thuật toán từng bước

1. `heap = MinHeap()`.
2. Với mỗi `x`: `heap.push(x)`; nếu `heap.size > k` thì `heap.pop()`.
3. Trả `heap.peek()`.

Tab **Debug** hiển thị heap dưới cả hai dạng: cây (để thấy quan hệ cha–con) và mảng (để thấy chỉ số `2i+1`). Theo dõi call stack `push → siftUp` và `pop → siftDown`.

## Chứng minh đúng

**Bất biến heap:** sau mỗi push/pop, `data[parent(i)] ≤ data[i]` ∀i > 0.
- siftUp chỉ hoán đổi khi cha > con; sau hoán đổi, phần tử cũ của cha (nhỏ hơn con kia của nó? – đúng vì cha cũ ≤ con kia theo bất biến) vẫn ≤ cả hai con mới ⇒ chỉ có thể vi phạm ở phía trên, tiếp tục lên.
- siftDown hoán đổi với con nhỏ nhất ⇒ node mới ≤ con còn lại; chỉ có thể vi phạm phía dưới, tiếp tục xuống.

**Bất biến top-k:** sau khi xử lý `i` phần tử, heap chứa `min(i, k)` phần tử lớn nhất trong `nums[0..i)`. Khi thêm `x` rồi pop min: phần tử bị loại là nhỏ nhất trong `k+1` ứng viên ⇒ không thể thuộc top-k ⇒ bất biến giữ. Kết thúc: đỉnh heap = min của top-k = phần tử lớn thứ k.

## Độ phức tạp

| Thao tác | Thời gian | |
|---|---|---|
| push / pop | O(log n) | Chiều cao cây |
| peek | O(1) | |
| heapify từ mảng | O(n) | Sift down từ dưới lên (không phải n log n!) |
| Kth largest | O(n log k) | n lần push/pop trên heap ≤ k+1 phần tử |
| Bộ nhớ | O(k) | Chỉ giữ k phần tử – quan trọng với stream |

## Tradeoff

| Cách | Thời gian | Bộ nhớ | Ưu | Nhược |
|---|---|---|---|---|
| Sort | O(n log n) | O(1)–O(n) | 1 dòng code | Thừa công khi k ≪ n |
| Min-heap k | O(n log k) | O(k) | **Stream**, k nhỏ, ổn định | Chậm hơn quickselect khi có toàn bộ dữ liệu |
| Quickselect | O(n) trung bình, O(n²) xấu nhất | O(1) | Nhanh nhất khi dữ liệu trong RAM | Phá huỷ mảng, worst case, không stream |
| Counting / bucket | O(n + range) | O(range) | Giá trị nguyên nhỏ | Phụ thuộc miền giá trị |

- **Lazy deletion ↔ indexed heap:** heap chuẩn không xoá được phần tử bất kỳ; Dijkstra dùng lazy deletion, hoặc dùng indexed heap/`TreeMap` nếu cần.
- **Binary heap ↔ d-ary / Fibonacci:** d-ary heap (d=4) cache tốt hơn; Fibonacci heap O(1) decrease-key lý thuyết nhưng hằng số lớn, hiếm dùng.

## Lợi / Hại

**Lợi**
- O(k) bộ nhớ, xử lý stream vô hạn ("top 10 từ khoá hot trong 1 giờ qua").
- Heap là nền tảng của Dijkstra, Prim, Huffman, event-driven simulation, scheduler.
- Cài đặt gọn (~40 dòng), mảng liên tục ⇒ cache tốt.

**Hại**
- Không tìm/xoá phần tử bất kỳ trong O(log n) nếu không có index phụ.
- Không duyệt theo thứ tự (phải pop hết).
- Với toàn bộ dữ liệu trong RAM, quickselect nhanh hơn.

## Use case thực tế

- **Scheduler hệ điều hành:** Linux CFS dùng red-black tree, nhưng nhiều RTOS/timer wheel dùng heap cho timer sắp hết hạn gần nhất.
- **Merge k luồng sắp xếp:** external sort, log aggregation (merge k file log theo timestamp).
- **Dijkstra / A\*:** priority queue theo khoảng cách.
- **Top-k trending:** Twitter trending topics, "sản phẩm bán chạy" theo cửa sổ thời gian.
- **Median động:** hai heap (max-heap nửa dưới, min-heap nửa trên) cho median của stream (LeetCode 295).
- **Nén Huffman:** luôn gộp 2 cây có tần suất nhỏ nhất.
- **Event simulation:** sự kiện tiếp theo theo thời gian.

## Lỗi thường gặp

1. Dùng max-heap kích thước n rồi pop k lần: đúng nhưng O(n + k log n) bộ nhớ O(n) – chấp nhận được nhưng không tối ưu cho stream.
2. Sai công thức cha/con khi index 1-based vs 0-based.
3. siftDown chọn con trái mà không so với con phải.
4. pop khi heap rỗng ⇒ `undefined`.
5. Quên trường hợp `k > n`.
6. Nhầm "lớn thứ k" với "lớn thứ k **phân biệt**".

## Biến thể

- **Top K Frequent (347):** đếm tần suất rồi heap theo count; hoặc bucket sort O(n).
- **K Closest Points (973):** max-heap theo khoảng cách, kích thước k.
- **Merge k Sorted Lists (23):** min-heap chứa đầu mỗi list, O(N log k).
- **Find Median from Data Stream (295):** hai heap cân bằng.
- **Heap Sort:** heapify O(n) + n lần pop ⇒ O(n log n), in-place, không stable.
- **Quickselect:** xem bài Quick Sort.
