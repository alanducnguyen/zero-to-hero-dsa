## Kịch bản trình bày (6–8 phút)

1. **Làm rõ đề** (30s): có số 0? output có tính vào bộ nhớ phụ? được chia không?
2. **Brute force** (30s): "Với mỗi i nhân mọi phần tử khác – O(n²)." Không cần code.
3. **Lời giải chia – và vì sao không dùng** (1 phút): "Tích toàn bộ chia cho nums[i] là O(n), nhưng đề cấm chia, và số 0 gây 0/0. Nếu được chia tôi phải đếm số 0 với ba trường hợp."
4. **Nhận xét then chốt** (1 phút): "answer[i] = tích bên trái × tích bên phải. Cả hai là tích luỹ, tính được trong một lượt mỗi chiều." Vẽ ví dụ `[1,2,3,4]`: prefix `[1,1,2,6]`, suffix `[24,12,4,1]`.
5. **Code prefix + suffix hai mảng** hoặc nói qua, rồi **tối ưu**: "prefix ghi vào answer, suffix chỉ là một biến" (2 phút).
6. **Phân tích** (30s): hai lượt O(n), bộ nhớ phụ O(1) không tính output; không chia nên số 0 tự đúng.
7. **Kiểm tra bằng tay** với một case có số 0 – thể hiện bạn đã nghĩ tới case biên.

## Follow-up thường gặp

- **Vì sao đề cấm chia?** Số 0 (0/0), sai số dấu phẩy động, và trong số học modulo phép chia cần nghịch đảo – không tồn tại khi phần tử chia hết cho modulo.
- **Nếu được chia, xử lý số 0 thế nào?** Đếm số 0: ≥ 2 ⇒ toàn 0; đúng 1 ⇒ chỉ vị trí số 0 nhận tích phần còn lại; 0 ⇒ chia bình thường.
- **Tràn số?** Dùng BigInt / long, hoặc nếu chỉ cần dấu/so sánh thì cộng logarit (mất chính xác) – hoặc trả kết quả mod p (khi đó lời giải prefix/suffix vẫn đúng, lời giải chia thì không).
- **Mảng cập nhật liên tục, truy vấn nhiều lần?** Segment tree lưu tích từng đoạn: `query(0, i−1) × query(i+1, n−1)` O(log n).
- **Bài cùng khuôn "trái × phải":** Trapping Rain Water (max trái/phải), Candy (ràng buộc hai chiều), Maximum Product Subarray (theo dõi cả min vì số âm).
- **Có cần lượt thứ ba không?** Không – tối ưu cuối gộp lượt suffix và lượt nhân thành một.

## Lỗi hay gặp khi code

- Nhân `suffix *= nums[i]` **trước** khi gán `answer[i] *= suffix` ⇒ answer chứa luôn nums[i].
- Khởi tạo prefix/answer bằng 0 thay vì 1.
- Lời giải chia: chia cho 0, hoặc nhân cả số 0 vào tích toàn bộ rồi không phân biệt được vị trí.
