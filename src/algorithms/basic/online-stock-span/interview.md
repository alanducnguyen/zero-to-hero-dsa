## Cách trình bày trong phỏng vấn

1. Làm rõ: "≤" hay "<"? Số lần gọi `next` tối đa? Có cần O(1) mỗi lần không hay chấp nhận amortized?
2. Nêu brute force: lưu lịch sử, lùi từng ngày ⇒ O(n²) với giá tăng dần.
3. Quan sát then chốt: ngày có giá ≤ hôm nay sẽ không bao giờ chặn span tương lai ⇒ có thể bỏ, nhưng phải **nhớ số ngày** nó gộp ⇒ lưu `[giá, span]`.
4. Viết code `while (top.price <= price) span += pop().span`, push `[price, span]`.
5. Chạy tay `[100, 80, 60, 70, 60, 75]`: ngày 75 pop [60,1], [70,2] ⇒ span 1+1+2 = 4.
6. Phân tích amortized: mỗi ngày push 1 lần, pop ≤ 1 lần ⇒ O(n) tổng.

## Câu hỏi follow-up thường gặp

- **Tại sao amortized O(1)?** Tổng số pop ≤ tổng số push = n; vòng while không thể chạy quá n lần trên toàn bộ chuỗi gọi.
- **Bộ nhớ xấu nhất?** O(n) khi giá giảm nghiêm ngặt – không pop được gì.
- **Nếu đề đổi thành "<" (giá nhỏ hơn hẳn)?** Đổi điều kiện pop thành `<`; stack thành giảm không nghiêm ngặt.
- **Cần span của ngày bất kỳ trong quá khứ?** Lưu thêm mảng span khi tính (đã có sẵn). Nếu giá lịch sử bị sửa ⇒ cần segment tree + binary search tìm "phần tử lớn hơn gần nhất bên trái".
- **Cần đảm bảo worst-case mỗi lần next?** Segment tree max trên lịch sử, descend để tìm vị trí gần nhất có giá > p: O(log n).
- **So với Daily Temperatures?** Cùng monotonic stack giảm; Daily Temperatures trả lời khi **pop** (nhìn tương lai), Stock Span trả lời khi **push** (nhìn quá khứ).

## Checklist nhận diện pattern

- "Bao nhiêu phần tử liên tiếp **trước** đó ≤ / < phần tử hiện tại" ⇒ previous greater element ⇒ monotonic stack.
- Dữ liệu đến dạng stream, mỗi lần cần trả lời ngay ⇒ trả lời lúc push.
- Có thể "gộp" một nhóm phần tử bị lấn át thành một phần tử đại diện kèm số đếm.
- Vòng while lồng trong for mà mỗi phần tử chỉ bị loại một lần ⇒ amortized O(n).

## Bài luyện tập liên quan

- 901 Online Stock Span → 739 Daily Temperatures → 496 Next Greater Element I → 503 Next Greater Element II.
- 84 Largest Rectangle in Histogram → 85 Maximal Rectangle → 907 Sum of Subarray Minimums.
- 1475 Final Prices With a Special Discount, 1019 Next Greater Node in Linked List, 1944 Number of Visible People in a Queue.
