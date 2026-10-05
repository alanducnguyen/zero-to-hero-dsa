## Cách trình bày trong phỏng vấn

1. Nêu Quan sát 1: "Đáp án có chiều cao bằng một cột nào đó ⇒ với mỗi cột, mở rộng tối đa sang hai bên." Nêu O(n²) brute force để có baseline.
2. Đặt bài toán con: "tìm cột thấp hơn gần nhất bên trái/phải" ⇒ monotonic stack O(n).
3. Vẽ stack với ví dụ `[2,1,5,6,2,3]`, chỉ rõ bước pop 6 rồi 5 khi gặp 2.
4. Viết code với cột ảo; nhấn mạnh `left = -1` khi stack rỗng và `width = i − left − 1`.
5. Chứng minh amortized O(n): mỗi chỉ số push/pop 1 lần.

## Câu hỏi follow-up thường gặp

- **Ma trận nhị phân, hình chữ nhật toàn 1 lớn nhất (85)?** Với mỗi hàng, `h[j] = cell ? h[j]+1 : 0`, chạy bài này ⇒ O(m·n).
- **Tại sao stack tăng dần mà không phải giảm?** Vì ta cần biên là cột **thấp hơn**; cột cao hơn không giới hạn gì. Bài Next Greater thì ngược lại.
- **Xử lý chiều cao bằng nhau?** Với `>`: cột bằng nhau ở lại stack, cột bên trái sẽ được tính với width đầy đủ khi pop sau. Kết quả `best` vẫn đúng.
- **Có thể làm O(1) bộ nhớ không?** Không với stack; có thuật toán two-pass dùng mảng heights làm bộ nhớ nhưng phức tạp và phá input – nêu rằng O(n) là chấp nhận được.
- **Cột có chiều rộng khác nhau?** Lưu prefix sum của width; `width = pre[i] − pre[left+1]`.
- **Stream, cột đến liên tục, hỏi best hiện tại?** Thuật toán đã online cho đến cột hiện tại, nhưng best chỉ tính được khi biết biên phải; có thể tạm tính với biên phải = hiện tại.
- **Trapping Rain Water khác thế nào?** Stack giảm dần; khi pop `mid` vì gặp cột cao hơn, nước = `(min(left, right) − h[mid]) × (right − left − 1)`.
- **Divide & conquer với segment tree?** O(n log n), chỉ nên nhắc để so sánh.

## Checklist nhận diện pattern

- "Gần nhất bên trái/phải **lớn hơn / nhỏ hơn**" ⇒ monotonic stack.
- "Mở rộng tối đa khi bị chặn bởi giá trị nhỏ/lớn hơn" ⇒ monotonic stack.
- "Diện tích / tổng / số lượng subarray mà phần tử x là min/max" ⇒ `left[]`, `right[]` bằng monotonic stack.
- "Max/min trong cửa sổ trượt" ⇒ monotonic deque.

## Template "previous/next smaller"

```ts
const left = new Array(n).fill(-1), right = new Array(n).fill(n);
const st: number[] = [];
for (let i = 0; i < n; i++) {
  while (st.length && a[st[st.length - 1]] > a[i]) right[st.pop()!] = i; // next smaller
  left[i] = st.length ? st[st.length - 1] : -1;                          // previous smaller-or-equal
  st.push(i);
}
```

## Bài luyện tập liên quan

- 739 Daily Temperatures → 496/503 Next Greater Element → 901 Online Stock Span.
- 84 Largest Rectangle → 85 Maximal Rectangle → 42 Trapping Rain Water.
- 907 Sum of Subarray Minimums, 402 Remove K Digits, 456 132 Pattern, 239 Sliding Window Maximum.
