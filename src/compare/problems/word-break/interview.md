## Kịch bản trình bày (8–10 phút)

1. **Làm rõ đề** (30s): dùng lại từ được không? chỉ cần true/false? kích thước từ điển?
2. **Đệ quy thuần** (1 phút): "Thử mọi tiền tố là từ, đệ quy phần còn lại." Viết 5 dòng hoặc chỉ nói. Chỉ ra ngay worst case `"aaaa…ab"` với `{a, aa, aaa}` là hàm mũ.
3. **Nhận xét then chốt** (1 phút): "Kết quả của phần còn lại chỉ phụ thuộc vị trí bắt đầu ⇒ chỉ có n+1 bài con ⇒ memo." Đây là câu chuyển từ brute force sang DP mà người phỏng vấn muốn nghe.
4. **Memo** (1 phút): thêm `Map<start, boolean>` – O(n²) cặp, mỗi cặp tốn slice + hash.
5. **Chuyển sang bottom-up** (3 phút): `dp[0] = true`, `dp[i] = ∃ j: dp[j] && s[j..i) ∈ dict`. Code, nêu `break` khi tìm được một j, và giới hạn `j ≥ i − maxLen`.
6. **Phân tích** (1 phút): O(n·L²) thời gian (L = maxLen, slice + hash tốn L), O(n + tổng độ dài từ) bộ nhớ.
7. **Nhắc BFS** (30s): "Cũng có thể xem là đồ thị chỉ số 0..n và BFS tìm đường 0 → n; `seen` chính là memo."

## Follow-up thường gặp

- **Trả về mọi cách cắt (Word Break II, LC 140)?** Đệ quy + memo `start → string[]`; đầu ra có thể hàm mũ nên không tránh được – nhưng chạy DP bool trước để bỏ nhánh không tới đích.
- **Đếm số cách cắt?** DP đổi `||` thành `+` (cẩn thận tràn số – dùng modulo hoặc BigInt).
- **Từ điển 10⁶ từ, mỗi từ dài?** Trie: từ mỗi vị trí đi dọc Trie, dừng khi hết nhánh – không còn chi phí slice/hash.
- **Cắt với số từ ít nhất?** `dp[i] = min(dp[j] + 1)` – hoặc BFS (BFS theo tầng cho ngay số từ ít nhất).
- **Concatenated Words (LC 472)?** Chạy Word Break cho từng từ với từ điển là các từ ngắn hơn (sort theo độ dài).
- **Vì sao không greedy (lấy từ dài nhất trước)?** Phản ví dụ: `s = "aaaab"`… hoặc `"catsandog"`-kiểu: chọn "cats" hay "cat" đều phải thử – greedy không có tính chất lựa chọn tham lam.

## Checklist nhận diện

- "Chuỗi có thể **phân đoạn** thành các mảnh hợp lệ không / bao nhiêu cách" ⇒ DP trên tiền tố (giống Decode Ways, LC 91).
- Đệ quy mà tham số chỉ là **một chỉ số** ⇒ tối đa n bài con ⇒ memo hoặc DP 1D.
- Tập mảnh hợp lệ cho dưới dạng **từ điển** ⇒ Set (nhỏ) hoặc Trie (lớn, chung tiền tố).
