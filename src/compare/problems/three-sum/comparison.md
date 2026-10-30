## Phân tích

**Brute force + Set** thử đủ C(n, 3) bộ ba. Mỗi bộ ba tổng 0 được sắp xếp rồi nối thành chuỗi `"a,b,c"` làm khoá – hai bộ ba cùng giá trị nhưng khác chỉ số sẽ có cùng khoá nên Set loại được. Đúng hiển nhiên, nhưng O(n³): với n = 3000 là ~4.5·10⁹ phép thử. Giá trị duy nhất của nó là làm rõ định nghĩa "trùng" và làm oracle để test lời giải nhanh.

**HashSet mỗi i** nhận ra 3Sum = n lần Two Sum: cố định `nums[i]`, cần cặp `(x, y)` phía sau với `x + y = −nums[i]` – tra phần bù trong Set O(1). Vòng `k` biến mất ⇒ O(n²). Nhưng hai điểm yếu còn nguyên: (1) **khử trùng vẫn phải dựa vào Map khoá chuỗi** – sắp xếp 3 phần tử, nối chuỗi, hash chuỗi cho mỗi đáp án; (2) mỗi `i` tạo một Set mới ⇒ O(n) bộ nhớ và hằng số hash lớn. Trên mảng toàn số 0 hay nhiều bản trùng, nó vẫn sinh ra cùng một bộ ba rất nhiều lần rồi mới ghi đè.

**Sort + two pointers** cũng O(n²) nhưng thắng ở *mọi* chỗ khác. Sau khi sắp xếp:
- Với `a[i]` cố định, tổng `a[l] + a[r]` đơn điệu theo l, r ⇒ mỗi bước loại hẳn một phần tử (giống Two Sum II), O(n) mỗi i.
- Giá trị trùng nằm cạnh nhau ⇒ khử trùng chỉ cần `if (a[i] === a[i-1]) continue` và hai vòng `while` nhảy bản sao. Không Set, không chuỗi, không hash.
- `a[i] > 0` ⇒ dừng hẳn, vì mọi số phía sau đều ≥ a[i] > 0.
- Truy cập tuần tự trên mảng liên tục ⇒ thân thiện cache. Sort O(n log n) bị O(n²) nuốt mất.

## Bảng so sánh nhanh

| | Brute + Set | HashSet mỗi i | Sort + two pointers |
|---|---|---|---|
| Thời gian | O(n³) | O(n²) | O(n²) (+ O(n log n) sort) |
| Bộ nhớ phụ | O(k) | O(n) | O(1) (hoặc O(log n)–O(n) tuỳ thuật toán sort) |
| Khử trùng | Set khoá chuỗi | Map khoá chuỗi | Bỏ qua giá trị bằng nhau |
| Worst case | Luôn C(n,3) | Hash va chạm ⇒ chậm | Đảm bảo O(n²) |
| Độ khó code | Dễ | Trung bình | Trung bình – dễ sai ở vòng nhảy trùng |

## Xếp hạng

1. **Sort + two pointers** – O(n²)/O(1). Đáp án mong đợi.
2. **HashSet mỗi i** – O(n²)/O(n). Cùng bậc nhưng nặng hơn và khử trùng vụng về.
3. **Brute force** – O(n³). Chỉ để khởi động.

## Khi nào thứ hạng đổi

- Đề hỏi **chỉ số** gốc thay vì giá trị, hoặc **cấm thay đổi thứ tự** ⇒ HashSet lên hạng 1 (sort làm mất chỉ số, phải giữ thêm mảng chỉ số).
- **3Sum Closest / 3Sum Smaller** ⇒ chỉ two pointers dùng được: HashSet chỉ trả lời "có bằng không", không trả lời "gần nhất" hay "nhỏ hơn".
- **4Sum / kSum** ⇒ two pointers tổng quát hoá đệ quy O(n^(k−1)); HashSet kiểu meet-in-the-middle cũng được nhưng khử trùng rất rối.
- Giá trị trong miền nhỏ ⇒ có thể đếm tần suất theo giá trị và duyệt cặp giá trị phân biệt, nhanh hơn khi có cực nhiều phần tử trùng.
