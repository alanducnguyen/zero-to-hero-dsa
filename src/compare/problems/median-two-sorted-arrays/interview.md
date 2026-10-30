## Kịch bản trình bày

1. **Làm rõ** (30s): định nghĩa trung vị chẵn/lẻ, mảng rỗng, yêu cầu O(log(m+n)).
2. **Tuyến tính** (1 phút): "Merge như merge sort là O(m+n); thậm chí chỉ cần đi tới giữa với 2 biến, O(1) bộ nhớ." Nói miệng, không code – rồi chỉ ra nó chưa đạt O(log).
3. **Đổi góc nhìn** (2 phút): "Thay vì tìm phần tử, tìm đường cắt chia mảng gộp làm hai nửa bằng nhau. Chọn i phần tử từ a thì j = half − i từ b. Đường cắt đúng khi aL ≤ bR và bL ≤ aR." Vẽ hai mảng với vạch cắt.
4. **Đơn điệu** (30s): aL > bR ⇒ i quá lớn; bL > aR ⇒ i quá nhỏ ⇒ binary search i ∈ [0, m].
5. **Code** (4 phút): đổi để a là mảng ngắn, half = (m+n+1) >> 1, dùng ±∞ cho biên.
6. **Dry run** `[1,2]`, `[3,4]`: half = 2; i = 1, j = 1 ⇒ aL=1, aR=2, bL=3, bR=4 ⇒ bL > aR ⇒ lo = 2; i = 2, j = 0 ⇒ aL=2, aR=+∞, bL=−∞, bR=3 ⇒ hợp lệ, (2+3)/2 = 2.5.

## Follow-up thường gặp

- **Vì sao binary search trên mảng ngắn?** Đảm bảo j = half − i không âm và không vượt n với mọi i ∈ [0, m]; đồng thời O(log min(m,n)).
- **Vì sao half = (m+n+1) >> 1?** Khi tổng lẻ, nửa trái nhiều hơn một phần tử ⇒ trung vị = max(aL, bL), không cần xét nửa phải.
- **Vòng while có thể kết thúc mà không return?** Chỉ khi đầu vào chưa sắp xếp – với đầu vào hợp lệ luôn tồn tại đường cắt.
- **Tìm phần tử thứ k?** Đệ quy so sánh a[k/2−1] và b[k/2−1], loại k/2 phần tử nhỏ hơn mỗi bước: O(log k).
- **Ba mảng trở lên?** Binary search trên giá trị (đếm số phần tử ≤ x bằng upper bound mỗi mảng): O(k · log V · log n).
- **Stream?** Hai heap: max-heap nửa dưới, min-heap nửa trên, cân bằng kích thước.

## Lỗi thường gặp

- Không đổi a/b ⇒ j âm, truy cập ngoài mảng.
- Dùng 0 thay vì −∞ làm biên ⇒ sai khi có số âm.
- Nhầm điều kiện lẻ/chẵn khi dùng half = (m+n) >> 1.
