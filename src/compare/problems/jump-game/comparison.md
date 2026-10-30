## Bảng tradeoff

| Lời giải | Thời gian | Bộ nhớ | Đệ quy | Ghi chú |
|---|---|---|---|---|
| Backtracking | O(2ⁿ) | O(n) stack | Có | Mỗi ô bị khám phá lại theo mọi đường tới nó |
| Top-down + memo | O(n²) | O(n) + stack | Có | Mỗi ô tính 1 lần, mỗi lần quét ≤ n bước |
| DP "ô tốt" từ cuối | O(n²) | O(n) | Không | Cho good[i] với mọi i |
| Greedy farthest | O(n) | O(1) | Không | Chỉ một số nguyên làm trạng thái |

## Phân tích

**Backtracking** cho thấy cấu trúc: `go(i)` = OR của `go(i + s)`. Vấn đề là `go(i)` chỉ phụ thuộc `i`, không phụ thuộc đường đi tới `i`, nhưng ta lại gọi nó một lần cho *mỗi* đường. Với `[6, 5, 4, 3, 2, 1, 0, 1]` số lời gọi tăng gấp đôi mỗi khi thêm một ô ⇒ hàm mũ.

**Memo** khai thác đúng nhận xét đó: n trạng thái, mỗi trạng thái quét tối đa `nums[i]` bước ⇒ O(n²). Nhưng đệ quy sâu n tầng là rủi ro thật trong JavaScript/Python với n = 10⁴.

**Bottom-up** đổi chiều để bỏ đệ quy: tính `good[i]` từ phải sang trái vì nó chỉ cần các ô sau i. Khi chạy tay, bạn sẽ thấy ta luôn dừng ở ô tốt *gần nhất* – nghĩa là chỉ cần nhớ `lastGood` (ô tốt trái nhất), và điều kiện thành `i + nums[i] ≥ lastGood`. Đó đã là greedy O(n) (duyệt phải → trái).

**Greedy farthest** (trái → phải) dựa trên bất biến: tập ô tới được luôn là **đoạn liền** `[0, farthest]` – nếu tới được ô k thì từ đường đi tới k, mọi ô nhỏ hơn k trên đường cũng tới được, và mỗi ô j ≤ farthest đã mở rộng vùng tới `j + nums[j]`. Khi gặp `i > farthest` thì có lỗ hổng không thể vượt.

## Xếp hạng

1. **Greedy** – O(n)/O(1). Đáp án mong đợi.
2. **DP từ cuối** – O(n²)/O(n), không đệ quy; là bậc thang tự nhiên dẫn tới greedy.
3. **Memo** – cùng độ phức tạp thời gian với #2 nhưng thêm rủi ro stack overflow và hằng số Map.
4. **Backtracking** – hàm mũ, chỉ dùng để mở đầu.

## Khi nào thứ hạng đổi

- **Cần đường đi cụ thể** hoặc liệt kê mọi đường ⇒ backtracking (có memo để cắt nhánh chết) trở nên cần thiết; greedy không cho đường.
- **Nhiều truy vấn điểm xuất phát khác nhau** ⇒ DP `good[]` tính một lần O(n) (dạng lastGood) rồi trả lời O(1) mỗi truy vấn.
- **Hỏi số bước ít nhất (Jump Game II)** ⇒ greedy theo "tầng" BFS vẫn O(n); DP O(n²) là phương án dự phòng.
- **Bước nhảy có thể âm / đi hai chiều (Jump Game III)** ⇒ vùng tới được không còn là đoạn liền, greedy sai – phải BFS/DFS với visited.
