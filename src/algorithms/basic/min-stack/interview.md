## Cách trình bày trong phỏng vấn

1. Nêu bất biến "mins[i] = min của data[0..i]" trước khi code.
2. Viết 4 phương thức, nhấn mạnh pop cả hai stack.
3. Nêu tối ưu bộ nhớ (chỉ push khi ≤ min) và bẫy trùng lặp.
4. Nếu được hỏi O(1) bộ nhớ phụ: mẹo hiệu số, nói rõ rủi ro tràn.

## Câu hỏi follow-up thường gặp

- **Tiết kiệm bộ nhớ?** `mins` chỉ push khi `x ≤ mins.top`; khi pop, nếu `data.top === mins.top` thì pop `mins`.
- **Max Stack với popMax?** TreeMap (giá trị → danh sách node) + doubly linked list cho xoá O(log n).
- **Queue với min O(1)?** Hai min stack (inbox/outbox); min = min hai đỉnh.
- **O(1) bộ nhớ phụ?** Lưu `x − min`; nếu âm ⇒ x là min mới; khôi phục khi pop. Cẩn thận tràn số ở ngôn ngữ 32-bit.
- **Thread-safe?** Khoá một thao tác; hoặc immutable stack với persistent min.
- **Tại sao không dùng heap?** Heap không pop theo thứ tự LIFO; cần lazy deletion phức tạp và O(log n).

## Checklist nhận diện pattern

- "Stack/queue + truy vấn tổng hợp (min/max/sum) O(1)" ⇒ cấu trúc phụ lưu giá trị theo mức.
- "Xoá phần tử bất kỳ + max" ⇒ TreeMap/heap với lazy deletion.

## Bài luyện tập liên quan

- 155 Min Stack → 716 Max Stack → 895 Maximum Frequency Stack → 232 Queue via Stacks → 239 Sliding Window Maximum (max queue).
