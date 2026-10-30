## Đề bài

Bạn là kẻ trộm đi dọc một dãy nhà, nhà thứ `i` có `nums[i]` tiền. Nếu cướp **hai nhà liền kề** trong cùng một đêm, hệ thống báo động sẽ kích hoạt. Trả về số tiền **lớn nhất** có thể cướp mà không làm báo động kêu.

```
nums = [1, 2, 3, 1]        →  4   (nhà 0 + nhà 2 = 1 + 3)
nums = [2, 7, 9, 3, 1]     →  12  (nhà 0 + nhà 2 + nhà 4 = 2 + 9 + 1)
nums = [5, 1, 1, 5]        →  10  (nhà 0 + nhà 3 – bỏ 2 nhà liền là hợp lệ)
```

Bài này là ví dụ chuẩn của DP **"lấy hoặc bỏ"**: ở mỗi phần tử có đúng hai lựa chọn, và lựa chọn "lấy" cấm phần tử kế tiếp. Ví dụ thứ ba cho thấy vì sao **tham lam chẵn/lẻ** (lấy mọi nhà chỉ số chẵn hoặc mọi nhà chỉ số lẻ) là sai.

## Ràng buộc

- `1 ≤ nums.length ≤ 100`, `0 ≤ nums[i] ≤ 400` (LeetCode 198).
- Trong trang này giới hạn tối đa 10 nhà để cây đệ quy thuần còn hiển thị được.

## Câu hỏi nên hỏi lại

- Tiền có thể âm không? (Nếu có, "bỏ hết" = 0 vẫn là lựa chọn hợp lệ – công thức vẫn đúng.)
- Dãy nhà thẳng hay vòng tròn? (Vòng tròn là House Robber II: chạy 2 lần, bỏ nhà đầu hoặc bỏ nhà cuối.)
- Chỉ cần tổng hay cần cả danh sách nhà được chọn? (Cần danh sách ⇒ giữ mảng dp để truy vết.)
