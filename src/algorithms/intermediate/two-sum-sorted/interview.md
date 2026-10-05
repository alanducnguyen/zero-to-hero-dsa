## Cách trình bày trong phỏng vấn

1. Hỏi: "Mảng đã sắp xếp? Có đúng một đáp án? Cần chỉ số gốc không?"
2. Nêu HashMap O(n)/O(n) như baseline, rồi nói "vì mảng sắp xếp, tôi dùng two pointers để O(1) bộ nhớ".
3. **Giải thích tại sao loại được một đầu** – đây là phần ghi điểm; nhiều ứng viên chỉ nói "tổng nhỏ thì tăng left" mà không chứng minh.
4. Viết 10 dòng code, chạy tay một ví dụ.
5. Chủ động nêu 3Sum như mở rộng.

## Câu hỏi follow-up thường gặp

- **Mảng không sắp xếp?** HashMap O(n)/O(n), hoặc sắp xếp O(n log n) rồi two pointers nếu không cần chỉ số gốc.
- **Tìm tất cả cặp, không trùng?** Sau khi tìm thấy, tiến `left` qua các phần tử bằng `a[left]` và lùi `right` tương tự.
- **3Sum?** Sắp xếp; với mỗi `i` (bỏ qua trùng), two pointers trên `(i+1, n-1)` với target `-a[i]`. O(n²).
- **Đếm số cặp có tổng < target?** Khi `sum < target`, có `right − left` cặp hợp lệ với `left` cố định; cộng và `left++`.
- **Tại sao không binary search cho mỗi phần tử?** O(n log n), chậm hơn và không mở rộng đẹp cho 3Sum.
- **Mảng cực lớn trên đĩa?** Two pointers đọc tuần tự từ hai đầu – thân thiện với I/O hơn HashMap.
- **Two pointers có phải greedy không?** Có: mỗi bước quyết định loại một phần tử dựa trên lập luận cục bộ và không bao giờ quay lại.

## Checklist nhận diện pattern

- Mảng **sắp xếp** + "cặp / bộ có tổng bằng/nhỏ hơn/lớn hơn" ⇒ two pointers ngược chiều.
- "Palindrome", "đảo ngược", "so sánh hai đầu" ⇒ two pointers ngược chiều.
- "Merge hai dãy sắp xếp", "xoá trùng tại chỗ", "giữa linked list" ⇒ two pointers cùng chiều.
- Nếu không chứng minh được "loại một đầu là an toàn" ⇒ không phải two pointers, cân nhắc HashMap hoặc sliding window.

## Template 3Sum nên thuộc

```ts
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;        // bỏ i trùng
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const s = nums[i] + nums[l] + nums[r];
      if (s === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;        // bỏ l trùng
        while (l < r && nums[r] === nums[r - 1]) r--;        // bỏ r trùng
        l++; r--;
      } else if (s < 0) l++; else r--;
    }
  }
  return res;
}
```

## Bài luyện tập liên quan

- 167 Two Sum II → 15 3Sum → 18 4Sum → 16 3Sum Closest.
- 11 Container With Most Water, 42 Trapping Rain Water (two pointers).
- 125 Valid Palindrome, 344 Reverse String, 977 Squares of a Sorted Array, 881 Boats to Save People.
