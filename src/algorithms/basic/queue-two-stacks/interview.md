## Cách trình bày trong phỏng vấn

1. Nêu quan sát "stack đảo thứ tự, đảo hai lần = FIFO".
2. Vẽ hai stack, chạy ví dụ push 1,2,3 – pop – push 4 – pop để chỉ ra **không** đổ lại khi `outbox` còn phần tử.
3. Code ~20 dòng với hàm `shift` dùng chung cho `pop` và `peek`.
4. Phân tích amortized: mỗi phần tử tối đa 4 thao tác stack ⇒ O(1) trung bình; nêu rõ worst case O(n) cho một `pop`.
5. Nếu được hỏi ngược (stack bằng queue): giải thích tại sao không có cách amortized O(1) đẹp tương tự.

## Câu hỏi follow-up thường gặp

- **Amortized O(1) nghĩa là gì? Chứng minh?** Tổng chi phí n thao tác ≤ c·n. Phương pháp đếm: mỗi phần tử vào/ra mỗi stack 1 lần.
- **Tại sao không đổ lại inbox sau khi pop?** Vì phần tử trong `outbox` đã đúng thứ tự FIFO và cũ hơn mọi phần tử sẽ push sau; giữ chúng ở đó là đúng và rẻ.
- **Worst-case O(1) được không?** Có, với kỹ thuật đảo dần (real-time queue) nhưng phức tạp; thực tế dùng circular buffer hoặc linked list.
- **Stack bằng queue?** Push O(1), pop O(n) (xoay n−1 phần tử); hoặc push O(n) để pop O(1). Không có amortized O(1) cho cả hai.
- **Queue hỗ trợ max/min O(1)?** Mỗi stack lưu cặp (giá trị, max của phần dưới); max queue = max của hai đỉnh.
- **Thread-safe?** Khoá riêng cho `inbox` và `outbox` (two-lock queue của Michael–Scott dựa trên ý tưởng tương tự với linked list).
- **Bộ nhớ khi queue rất dài và pop ít?** `inbox` tích luỹ; không khác circular buffer về O(n). Nếu cần giới hạn, chặn push khi đầy.
- **Áp dụng cho cấu trúc bất biến?** Banker's queue: front list + rear list; đảo rear khi front rỗng; có thể làm persistent.

## Checklist nhận diện pattern

- "Cài X chỉ bằng Y" ⇒ nghĩ về cách Y đảo/giữ thứ tự và chi phí amortized.
- "Trì hoãn công việc đến khi cần, mỗi phần tử xử lý một lần" ⇒ amortized O(1).
- Cần max/min của queue ⇒ hai stack với max tiền tố hoặc monotonic deque.

## Bài luyện tập liên quan

- 232 Implement Queue using Stacks → 225 Implement Stack using Queues → 155 Min Stack.
- 622 Design Circular Queue, 641 Design Circular Deque.
- 239 Sliding Window Maximum (max queue / deque), 346 Moving Average from Data Stream.
