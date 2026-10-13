## Phân tích

**Sort** O(n log n) và **HashSet** O(n)/O(n) đều đúng và nhanh viết, nhưng mỗi cách vi phạm một ràng buộc: sort sửa mảng (hoặc tốn O(n) sao chép), HashSet tốn O(n) bộ nhớ. Nêu chúng trong 30 giây để cho thấy bạn hiểu bài, rồi đi tiếp.

**Nhị phân trên giá trị** dùng Dirichlet ở dạng đếm: nếu có nhiều hơn `mid` phần tử ≤ `mid`, số trùng nằm trong `[1, mid]`. Không sửa mảng, O(1) bộ nhớ, O(n log n). Đây là kỹ thuật tổng quát "binary search on answer" – đáng nhớ vì áp dụng được cho nhiều bài khác.

**Floyd (tortoise & hare)** là lời giải đẹp nhất: coi `i → nums[i]` là linked list; vì có hai chỉ số trỏ tới cùng giá trị nên có chu trình, và điểm vào chu trình chính là số trùng. O(n), O(1), không sửa. Cái giá: phải nhận ra phép biến đổi sang đồ thị – không hiển nhiên nếu chưa từng thấy.

## Xếp hạng

1. **Floyd** – O(n)/O(1), không sửa mảng. Thoả mọi ràng buộc.
2. **Nhị phân trên giá trị** – O(n log n)/O(1), không sửa. Chọn khi không nhớ Floyd hoặc cần kỹ thuật tổng quát hơn.
3. **HashSet** – O(n)/O(n). Chọn khi bộ nhớ không bị giới hạn.
4. **Sort** – O(n log n), sửa mảng. Chọn khi được sửa và muốn code ngắn.

## Khi nào thứ hạng đổi

- Giá trị không nằm trong [1, n] ⇒ Floyd không áp dụng được; nhị phân cũng không ⇒ HashSet là lựa chọn.
- Nhiều số trùng, cần tất cả ⇒ HashSet, hoặc đánh dấu âm tại chỉ số (nếu được sửa mảng).
- Được sửa mảng ⇒ "đánh dấu âm" O(n)/O(1) đơn giản hơn Floyd.
