## Kịch bản trình bày (8–10 phút)

1. **Làm rõ đề** (30s): `1 ≤ k ≤ n`? giá trị âm? có phải stream không?
2. **Brute force** (30s): "Mỗi cửa sổ quét k phần tử ⇒ O(n·k). Với n = 10⁵, k = 5·10⁴ quá chậm." Chỉ cần nói, không cần code.
3. **Bước trung gian – heap** (1–2 phút): "Cần cấu trúc trả về max nhanh khi thêm/bớt ⇒ max-heap. Xoá phần tử bất kỳ khó, nên lưu `[giá trị, chỉ số]` và chỉ pop khi đỉnh đã ra khỏi cửa sổ ⇒ O(n log n)."
4. **Nhận xét then chốt** (1 phút): "Nếu một số nhỏ hơn lại đến *trước* một số lớn hơn, nó không bao giờ là max nữa. Vậy chỉ cần giữ một dãy *giảm dần* các ứng viên ⇒ deque."
5. **Code deque** (3 phút), nói rõ ba bước mỗi vòng: bỏ đầu nếu hết hạn → pop đuôi bị đè → push i → ghi kết quả khi `i ≥ k − 1`. Lưu **chỉ số** chứ không lưu giá trị, vì cần biết khi nào hết hạn.
6. **Phân tích** (1 phút): amortized O(n) – mỗi chỉ số vào một lần, ra tối đa một lần; bộ nhớ O(k).
7. **Chạy tay** ví dụ `[1,3,-1,-3,5,3,6,7], k = 3` vài bước để chứng minh deque luôn giảm dần.

## Follow-up thường gặp

- **Vì sao pop đuôi với `<=` chứ không phải `<`?** Cả hai đều đúng cho giá trị max; `<=` giữ deque *giảm nghiêm ngặt*, nhỏ hơn và phần tử mới hơn sống lâu hơn – luôn an toàn.
- **Tìm min thay vì max?** Đảo dấu so sánh – deque tăng dần.
- **Cả max và min cùng lúc?** Hai deque song song (dùng ở LC 1438).
- **Dữ liệu là stream vô hạn?** Deque chỉ giữ ≤ k chỉ số ⇒ O(k) bộ nhớ, xử lý online được; heap thì phình không giới hạn nếu không xoá chủ động.
- **Median cửa sổ (LC 480)?** Hai heap + lazy removal bằng hash map đếm "chờ xoá".
- **Không được dùng deque?** Chia khối kích thước k, tính prefix-max và suffix-max từng khối ⇒ `max(suffix[i], prefix[i+k−1])`, cũng O(n).
- **Vì sao không dùng `Array.shift()` trong JS?** Nó dịch cả mảng – O(k) mỗi lần, phá vỡ O(n). Dùng con trỏ `head`.

## Checklist nhận diện

- "max/min của **mọi** cửa sổ/đoạn con liên tiếp kích thước cố định" ⇒ monotonic deque.
- "phần tử cũ bị vô hiệu bởi phần tử mới tốt hơn" ⇒ cấu trúc đơn điệu (stack hoặc deque).
- DP dạng `dp[i] = max(dp[j]) + x` với `j ∈ [i−k, i)` (LC 1696 Jump Game VI) ⇒ deque tối ưu chuyển trạng thái.
