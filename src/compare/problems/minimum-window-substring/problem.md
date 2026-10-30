## Đề bài

Cho hai chuỗi `s` và `t`. Tìm **substring ngắn nhất** của `s` chứa mọi ký tự của `t` **kể cả số lần lặp** (t = "AAB" cần ít nhất hai 'A' và một 'B'). Không có thì trả `""`.

```
s = "ADOBECODEBANC", t = "ABC"  →  "BANC"
s = "a",             t = "a"    →  "a"
s = "a",             t = "aa"   →  ""      (thiếu một 'a')
```

**Quy ước hoà (dùng thống nhất cho mọi lời giải trên trang này):** nếu nhiều cửa sổ cùng độ dài ngắn nhất, trả cửa sổ **bắt đầu sớm nhất** (trái nhất). LeetCode đảm bảo đáp án duy nhất nên không cần, nhưng để so sánh các lời giải ta phải chốt một quy tắc – cả ba đều chỉ cập nhật kỷ lục khi *ngắn hơn hẳn*, nên cửa sổ tìm thấy trước (trái hơn) được giữ.

## Ràng buộc

- `1 ≤ |s|, |t| ≤ 10⁵`, chữ cái tiếng Anh hoa/thường (σ ≤ 52).
- Phân biệt hoa thường. Ở trang demo, `s` bị cắt còn 20 ký tự, `t` còn 8 để brute force không quá dài.

## Câu hỏi nên hỏi lại người phỏng vấn

- t có ký tự lặp không? (Có ⇒ phải đếm tần suất, không chỉ dùng Set.)
- Nhiều đáp án cùng độ dài thì trả cái nào?
- Bảng chữ cái là gì – có thể dùng mảng 128 thay HashMap?
- Follow-up: có cần chạy O(|s| + |t|) không?
