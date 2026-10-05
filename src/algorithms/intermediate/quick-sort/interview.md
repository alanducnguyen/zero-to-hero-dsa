## Cách trình bày trong phỏng vấn

1. Nêu ý tưởng partition trong 2 câu, vẽ mảng với 3 vùng `< pivot | ≥ pivot | chưa xét`.
2. Viết `partition` trước, nêu bất biến. Rồi `sort` đệ quy 4 dòng.
3. Chủ động nói: trung bình O(n log n), worst O(n²) khi pivot kém, **tôi sẽ random pivot** để kỳ vọng O(n log n) với mọi input.
4. Nói không stable, in-place; so sánh với Merge Sort.
5. Nếu còn thời gian: đề cập 3-way partition cho trùng lặp và introsort.

## Câu hỏi follow-up thường gặp

- **Khi nào Quick Sort O(n²)? Cách tránh?** Pivot luôn là min/max (mảng sắp xếp, pivot cuối). Tránh bằng random pivot, median-of-three, hoặc introsort.
- **Quick Sort có stable không? Làm sao cho stable?** Không. Có thể stable bằng cách sắp xếp theo cặp `(value, originalIndex)`, hoặc dùng Merge Sort.
- **Tại sao thực tế nhanh hơn Merge Sort?** In-place, tuần tự ⇒ cache tốt; không cấp phát bộ nhớ phụ; hằng số nhỏ.
- **Mảng nhiều phần tử trùng?** Lomuto O(n²). Dùng 3-way partition: vùng `<`, `=`, `>`; phần `=` không cần đệ quy.
- **Tìm phần tử lớn thứ k trong O(n)?** Quickselect: partition, chỉ đệ quy vào bên chứa k. Trung bình O(n), worst O(n²) (median-of-medians cho O(n) đảm bảo).
- **Giới hạn đệ quy với n = 10⁷?** Đệ quy vào nửa nhỏ, lặp (tail call) nửa lớn ⇒ stack O(log n) đảm bảo.
- **Sort linked list?** Merge Sort phù hợp hơn (không cần truy cập ngẫu nhiên, stable, O(1) phụ).
- **Sắp xếp 1TB dữ liệu trên đĩa?** External merge sort, không phải Quick Sort.

## Checklist nhận diện pattern

- "Sắp xếp in-place, bộ nhớ hạn chế" ⇒ Quick Sort / Heap Sort.
- "Phần tử lớn thứ k", "top k", "median" không cần sắp xếp hết ⇒ Quickselect (hoặc Heap nếu stream).
- "Phân loại thành 3 nhóm" (Sort Colors) ⇒ 3-way partition.

## Code Quickselect nên nhớ

```ts
function quickselect(a: number[], k: number): number { // phần tử nhỏ thứ k (0-based)
  let lo = 0, hi = a.length - 1;
  while (lo < hi) {
    const r = lo + Math.floor(Math.random() * (hi - lo + 1));
    [a[r], a[hi]] = [a[hi], a[r]];
    const p = partition(a, lo, hi);
    if (p === k) return a[p];
    if (p < k) lo = p + 1; else hi = p - 1;
  }
  return a[lo];
}
```

## Bài luyện tập liên quan

- 912 Sort an Array (phải random pivot mới AC), 75 Sort Colors (3-way).
- 215 Kth Largest Element, 973 K Closest Points, 347 Top K Frequent (Quickselect).
- 148 Sort List (Merge Sort cho linked list – để so sánh).
