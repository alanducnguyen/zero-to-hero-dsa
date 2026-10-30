## Cách trình bày trong phỏng vấn

1. Hỏi: "Có cần chỉ số không hay chỉ giá trị? Thứ tự kết quả có quan trọng? Được sửa mảng gốc không? n tối đa bao nhiêu?"
2. Nêu brute force O(n³) + Set để khử trùng, rồi nói: "cố định một số thì còn lại là Two Sum; sort để two pointers và để trùng lặp nằm cạnh nhau".
3. Viết code, **chỉ rõ ba chỗ bỏ trùng**: `i` so với `a[i−1]`, và `l`/`r` sau khi tìm thấy.
4. Giải thích vì sao bỏ trùng `i` phải so với phần tử **trước** (vòng trước đã xét vùng rộng hơn).
5. Chạy tay `[-1,0,1,2,-1,-4]` và `[0,0,0,0]`; nêu O(n²) thời gian, O(1) bộ nhớ phụ (ngoài sort).

## Câu hỏi follow-up thường gặp

- **Không được sort / cần chỉ số gốc?** Cố định `i`, dùng HashSet cho Two Sum trên `(i, n)`, khử trùng bằng Set chuỗi đã sort.
- **Tổng gần target nhất?** 3Sum Closest – cùng khung, cập nhật best.
- **Đếm số bộ có tổng < target?** Khi `sum < target`, mọi `r' ∈ (l, r]` đều hợp lệ ⇒ cộng `r − l`.
- **4Sum, kSum?** Viết `kSum(start, k, target)` đệ quy, đáy `k = 2` dùng two pointers.
- **Có thể nhanh hơn O(n²)?** Giả thuyết 3SUM cho rằng không (trừ cải tiến log); với giá trị nhỏ có thể dùng FFT.
- **Mảng rất nhiều phần tử trùng?** Nén thành (giá trị, tần suất), xét các trường hợp x = y, y = z.

## Checklist nhận diện pattern

- "Bộ ba / bộ bốn có tổng = / < / gần target" ⇒ sort + cố định + two pointers.
- "Không trùng lặp" + mảng chưa sort ⇒ sort để trùng đứng cạnh nhau.
- Có thể chứng minh "loại một đầu an toàn" nhờ tính đơn điệu sau khi sort ⇒ two pointers.
- Cần chỉ số gốc ⇒ cân nhắc HashMap thay vì sort.

## Bài luyện tập liên quan

- LeetCode 1 – Two Sum
- LeetCode 167 – Two Sum II
- LeetCode 15 – 3Sum
- LeetCode 16 – 3Sum Closest
- LeetCode 259 – 3Sum Smaller
- LeetCode 18 – 4Sum
- LeetCode 611 – Valid Triangle Number
- LeetCode 923 – 3Sum With Multiplicity
