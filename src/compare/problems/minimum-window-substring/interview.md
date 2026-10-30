## Kịch bản trình bày (8–10 phút)

1. **Làm rõ đề** (1 phút): t có ký tự lặp ⇒ đếm tần suất; phân biệt hoa thường; nhiều đáp án thì lấy cái nào; không có thì "".
2. **Brute force** (1 phút): "Xét mọi substring, đếm và so với t: O(n²·σ). Đúng nhưng n = 10⁵ thì không chạy được." Không cần code.
3. **Cải tiến 1** (1 phút): "Với một left cố định, cửa sổ ngắn nhất là right đầu tiên làm nó hợp lệ ⇒ break. Thay việc so cả bảng bằng bộ đếm `missing` ⇒ O(n²)."
4. **Nhận xét then chốt** (1 phút): "Tính hợp lệ đơn điệu theo cả hai đầu. Khi left tiến, right không cần lùi ⇒ two pointers cùng chiều, cập nhật bảng đếm thay vì dựng lại."
5. **Code sliding window** (3–4 phút): `need` âm nghĩa là dư; `missing` giảm khi `need[c] > 0` trước khi trừ, tăng khi `need[c] > 0` sau khi cộng. Ghi kỷ lục *trong* vòng while trước khi co.
6. **Phân tích** (30s): mỗi chỉ số vào/ra cửa sổ tối đa 1 lần ⇒ O(|s| + |t|), bộ nhớ O(σ).
7. **Test bằng tay**: "ADOBECODEBANC"/"ABC", t dài hơn s, t có ký tự lặp ("AAB").

## Follow-up thường gặp

- **Dùng mảng 128 thay Map?** Được, nhanh hơn về hằng số; nói rõ giả định ASCII.
- **Chỉ cần độ dài, không cần chuỗi?** Giữ `bestLen`, bỏ `bestL`.
- **Thứ tự ký tự của t phải giữ nguyên (subsequence)?** Bài khác – Minimum Window Subsequence (LC 727), DP hoặc quét tiến + lùi O(n·m).
- **Có tồn tại hoán vị của t trong s không (LC 567)?** Cửa sổ cố định độ dài |t|, cùng bộ đếm.
- **Liệt kê mọi anagram (LC 438)?** Cửa sổ cố định, ghi mọi vị trí missing = 0.
- **Dữ liệu là stream?** Sliding window vẫn chạy được vì chỉ cần nhớ cửa sổ hiện tại – nhưng phải giữ buffer các ký tự trong cửa sổ.
- **Tại sao không binary search độ dài?** Được (kiểm tra "có cửa sổ độ dài L" bằng cửa sổ cố định O(n)) ⇒ O(n log n); kém sliding window nhưng là lời giải hợp lệ khi chưa nghĩ ra.

## Lỗi hay gặp khi code

- Tăng/giảm `missing` theo mọi ký tự thay vì chỉ khi bảng đếm vượt qua mốc 0.
- Ghi kỷ lục sau khi đã co left (lệch 1).
- Quên trường hợp không có đáp án (bestLen vẫn ∞).
