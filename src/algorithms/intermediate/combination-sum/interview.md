## Cách trình bày trong phỏng vấn

1. **Làm rõ đề:** candidates có dương và khác nhau không? Có số 0 không (gây vòng lặp vô hạn)? Thứ tự output có quan trọng không? Chỉ cần đếm hay phải liệt kê?
2. **Vẽ cây quyết định** cho `[2, 3, 6, 7]`, `target = 7`: mỗi nhánh trừ một số khỏi `remain`, lá `remain = 0` là đáp án.
3. **Chỉ ra vấn đề trùng lặp** (`[2,2,3]` vs `[3,2,2]`) và giải bằng chỉ số `start` – nhấn mạnh truyền `i` vì được dùng lại.
4. **Thêm cắt tỉa:** sort rồi `break` khi `nums[i] > remain`, giải thích vì sao `break` chứ không phải `continue`.
5. **Code**, nhấn mạnh sao chép `path` khi ghi nhận và `pop` khi quay lui.
6. **Độ phức tạp:** cận trên `O(n^(T/m + 1))`, độ sâu `O(T/m)`; nêu rằng output có thể lớn theo cấp số mũ.

## Câu hỏi follow-up thường gặp

- *Mỗi số chỉ dùng một lần và có trùng?* (LC 40) Truyền `i + 1`, skip `nums[i] == nums[i−1]` khi `i > start`.
- *Chỉ cần đếm số tổ hợp?* DP coin change: `dp[0] = 1`, duyệt từng coin ở vòng ngoài, `dp[s] += dp[s − c]` – `O(n · T)`.
- *Đếm số dãy có thứ tự?* (LC 377) Đảo vòng lặp: `target` ở ngoài, coin ở trong.
- *Có số âm thì sao?* Không còn hữu hạn (cộng rồi trừ mãi) – phải giới hạn độ dài tổ hợp.
- *Tổ hợp có ít phần tử nhất?* BFS theo số phần tử hoặc DP min (Coin Change LC 322).

## Checklist nhận diện pattern

- Đề yêu cầu **liệt kê tất cả** tổ hợp thoả một tổng / ràng buộc ⇒ backtracking.
- **Thứ tự không quan trọng** ⇒ dùng chỉ số `start` để chống trùng.
- **Được dùng lại** ⇒ đệ quy với `i`; **dùng một lần** ⇒ `i + 1`.
- Ràng buộc đơn điệu (số dương, tổng tăng dần) ⇒ sort + `break` để cắt tỉa.
- Chỉ hỏi **đếm** hoặc **min/max** ⇒ cân nhắc DP thay vì liệt kê.

## Bài luyện tập

- LC 39 – Combination Sum (Medium)
- LC 40 – Combination Sum II (Medium)
- LC 216 – Combination Sum III (Medium)
- LC 77 – Combinations (Medium)
- LC 377 – Combination Sum IV (Medium)
- LC 518 – Coin Change II (Medium)
