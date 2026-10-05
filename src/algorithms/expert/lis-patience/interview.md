## Cách trình bày trong phỏng vấn

1. Nêu DP O(n²) trước: `dp[i] = 1 + max dp[j]` với `j < i, nums[j] < nums[i]` – viết nhanh, chạy đúng.
2. Khi được hỏi tối ưu: giới thiệu `tails` với định nghĩa chính xác ("tail nhỏ nhất của dãy độ dài len+1"), giải thích vì sao tail nhỏ hơn tốt hơn.
3. Chỉ ra `tails` tăng ngặt ⇒ binary search; viết lower bound cẩn thận.
4. **Chủ động** cảnh báo "`tails` không phải LIS thật" và nêu cách dựng dãy – điểm cộng lớn.
5. Nêu biến thể 2D (phong bì) và cách sắp xếp.

## Dựng LIS thật (O(n log n))

```ts
function lis(nums: number[]): number[] {
  const tailsIdx: number[] = [];                 // chỉ số của tail cho mỗi độ dài
  const parent = new Array<number>(nums.length).fill(-1);
  for (let i = 0; i < nums.length; i++) {
    let lo = 0, hi = tailsIdx.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (nums[tailsIdx[m]] < nums[i]) lo = m + 1; else hi = m; }
    if (lo > 0) parent[i] = tailsIdx[lo - 1];     // phần tử trước nó trong dãy
    if (lo === tailsIdx.length) tailsIdx.push(i); else tailsIdx[lo] = i;
  }
  const out: number[] = [];
  for (let k = tailsIdx[tailsIdx.length - 1]; k !== -1 && k !== undefined; k = parent[k]) out.push(nums[k]);
  return out.reverse();
}
```

## Câu hỏi follow-up thường gặp

- **Tại sao `tails` không phải LIS nhưng độ dài đúng?** Thay tail giữa chừng làm `tails` thành hỗn hợp của nhiều dãy; nhưng mỗi `tails[len]` vẫn chứng nhận tồn tại một dãy độ dài len+1 – đủ để đếm.
- **Không giảm thay vì tăng ngặt?** Đổi lower bound thành upper bound.
- **Đếm số LIS?** DP O(n²) với `cnt[i]`; hoặc O(n log n) với BIT/segment tree lưu cặp (độ dài, số cách) theo giá trị nén.
- **Phong bì lồng nhau (354)?** Sắp xếp w tăng, h **giảm** với w bằng nhau (để không lồng hai phong bì cùng w), LIS trên h.
- **LIS trên stream, truy vấn độ dài sau mỗi phần tử?** Chính thuật toán này: `tails.length` sau mỗi bước.
- **Tại sao gọi là patience sorting?** Mô phỏng trò bài patience: chồng bài = tails; số chồng = LIS. Kết hợp với heap merge các chồng cho ra thuật toán sắp xếp.
- **Liên hệ với LCS?** LIS(a) = LCS(a, sorted(unique(a))); nhưng LCS O(n²) nên không dùng để tính LIS.
- **Độ dài LIS kỳ vọng của hoán vị ngẫu nhiên?** ≈ 2√n (Vershik–Kerov, Baik–Deift–Johansson).

## Checklist nhận diện pattern

- "Dãy con (không liên tiếp) tăng/giảm dài nhất" ⇒ LIS; n ≤ 2500 thì DP O(n²) đủ, lớn hơn dùng tails.
- "Lồng nhau / xếp chồng theo hai chiều" ⇒ sắp xếp chiều 1, LIS chiều 2.
- "Ít thao tác xoá nhất để mảng sắp xếp" ⇒ n − LIS (hoặc n − longest non-decreasing).
- "Dãy con liên tiếp tăng" ⇒ không phải LIS, một lượt quét O(n).

## Bài luyện tập liên quan

- 300 LIS → 354 Russian Doll Envelopes → 1964 Longest Valid Obstacle Course.
- 673 Number of LIS, 646 Maximum Length of Pair Chain, 1626 Best Team With No Conflicts.
- 1143 LCS (để so sánh), 368 Largest Divisible Subset (DP O(n²) cùng kiểu).
