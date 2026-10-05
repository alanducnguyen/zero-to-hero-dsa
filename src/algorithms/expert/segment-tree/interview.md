## Cách trình bày trong phỏng vấn

1. Nêu tradeoff prefix sum (O(1)/O(n)) vs mảng (O(n)/O(1)) ⇒ cần cấu trúc O(log n)/O(log n). Nhắc BIT và segment tree, chọn segment tree nếu cần min/max hoặc lazy.
2. Vẽ cây cho mảng 4–8 phần tử với nhãn đoạn.
3. Viết build / update / query đệ quy với 3 trường hợp của query nêu rõ.
4. Chứng minh O(log n) cho query bằng lập luận "≤ 2 node giao một phần mỗi tầng".
5. Nêu mở rộng: lazy propagation, bản lặp, Fenwick.

## Fenwick tree (nên viết được trong 2 phút)

```ts
class Fenwick {
  private t: number[];
  constructor(private n: number) { this.t = new Array(n + 1).fill(0); }
  add(i: number, delta: number): void {            // 0-based
    for (i++; i <= this.n; i += i & -i) this.t[i] += delta;
  }
  prefix(i: number): number {                       // tổng [0..i]
    let s = 0;
    for (i++; i > 0; i -= i & -i) s += this.t[i];
    return s;
  }
  range(l: number, r: number): number { return this.prefix(r) - (l ? this.prefix(l - 1) : 0); }
}
```

## Câu hỏi follow-up thường gặp

- **Tại sao mảng 4n?** Với n không phải luỹ thừa 2, chỉ số node lớn nhất có thể gần 4n; 2·(luỹ thừa 2 nhỏ nhất ≥ n) là chặt hơn.
- **Range update (cộng v lên [l, r])?** Lazy propagation: lưu `lazy[node]`, chỉ đẩy xuống con khi cần đi qua node đó; O(log n).
- **Range min thay vì sum?** Đổi `+` thành `Math.min`, phần tử trung hoà +∞.
- **Fenwick khi nào không đủ?** Min/max (không có nghịch đảo để tính range từ prefix), range update + range query phức tạp, tìm kiếm "vị trí đầu tiên có tổng ≥ k" (BIT làm được bằng binary lifting), lazy.
- **Bản lặp 2n?** Lá ở `[n, 2n)`, cha `i >> 1`; update đi lên; query với hai con trỏ `l += n, r += n + 1` và gom lẻ/chẵn. Không đệ quy, nhanh.
- **Số phần tử nhỏ hơn bên phải (315)?** Duyệt từ phải, segment tree/BIT trên giá trị nén: query [0, v−1], rồi add v.
- **Skyline (218)?** Sweep + segment tree range max với lazy, hoặc heap với lazy deletion.
- **n = 10⁹ nhưng chỉ 10⁵ truy vấn?** Nén toạ độ hoặc segment tree động (node tạo khi cần), O(q log n) bộ nhớ.
- **Persistent để làm gì?** Giữ mọi phiên bản sau mỗi update với O(log n) node mới ⇒ truy vấn "trạng thái tại thời điểm t", k-th smallest trên đoạn.

## Checklist nhận diện pattern

- "Nhiều truy vấn đoạn **xen kẽ** cập nhật" ⇒ segment tree / BIT.
- Chỉ query, không update ⇒ prefix sum (tổng) hoặc sparse table (min/max).
- Chỉ update, query cuối ⇒ difference array.
- "Đếm phần tử nhỏ hơn / lớn hơn bên trái/phải" ⇒ BIT trên giá trị nén.
- "Cộng lên đoạn nhiều lần rồi hỏi đoạn" ⇒ lazy segment tree (hoặc hai BIT).

## Bài luyện tập liên quan

- 307 Range Sum Query Mutable → 315 Count of Smaller Numbers After Self → 493 Reverse Pairs.
- 218 The Skyline Problem (Hard), 699 Falling Squares (lazy), 732 My Calendar III.
- 2407 LIS II (segment tree max trên giá trị), 1157 Online Majority Element (segment tree + binary search).
