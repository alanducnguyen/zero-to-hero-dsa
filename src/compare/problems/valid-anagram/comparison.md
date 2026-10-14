## Phân tích

Ba cách cùng trả lời một câu hỏi: hai chuỗi có cùng **multiset** ký tự không?

**Sort** biến multiset thành dạng chuẩn (chuỗi đã sắp xếp) rồi so sánh. Ngắn, nhưng O(n log n) và tạo thêm hai chuỗi. Giá trị thật của nó là ý tưởng "khoá chuẩn hoá" – ý tưởng này sẽ cần đến khi phải **nhóm** nhiều anagram (Group Anagrams), nơi khoá sort là lựa chọn tự nhiên.

**HashMap đếm** tổng quát cho mọi bảng chữ cái, O(n) thời gian, bộ nhớ theo số ký tự phân biệt. Mẹo "cộng theo s, trừ theo t, dừng khi âm" tránh lượt so sánh cuối và cho phép dừng sớm.

**Mảng đếm 26** là phiên bản đặc biệt hoá: thay hash bằng chỉ số `c − 'a'`, O(1) bộ nhớ thật sự, không có chi phí hash, cache-friendly. Chỉ đúng khi bảng chữ cái cố định và nhỏ.

## Xếp hạng

1. **Mảng đếm 26** – O(n)/O(1). Chọn khi đề nói rõ chỉ a–z.
2. **HashMap đếm** – O(n)/O(k). Chọn khi Unicode hoặc bảng chữ cái không biết trước.
3. **Sort** – O(n log n)/O(n). Chọn khi cần "khoá" để nhóm, hoặc chuỗi rất ngắn và muốn code 1 dòng.

## Khi nào thứ hạng đổi

- Unicode ⇒ mảng 26 không dùng được, HashMap lên hạng 1 (lưu ý: `[...s]` để tách đúng code point, không dùng `charCodeAt`).
- Cần nhóm hàng nghìn từ theo anagram ⇒ cần khoá hash được: sort (`"aet"`) hoặc chuỗi đếm (`"1a0b…1e…1t"`); lúc này sort lại hợp lý vì từ ngắn.
- Gọi `isAnagram(s, t)` nhiều lần với cùng s ⇒ tiền tính count của s một lần.
