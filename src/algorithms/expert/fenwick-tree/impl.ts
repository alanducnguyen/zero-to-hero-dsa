/**
 * Fenwick Tree (Binary Indexed Tree) – tổng tiền tố và cập nhật điểm cùng O(log n).
 * tree[i] (1-indexed) lưu tổng của đoạn (i - lowbit(i), i], lowbit(i) = i & -i.
 */
export class FenwickTree {
  readonly tree: number[];
  readonly n: number;

  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array<number>(this.n + 1).fill(0);
    for (let i = 0; i < nums.length; i++) this.add(i, nums[i]);
  }

  /** Cộng delta vào vị trí idx (0-indexed): đi lên các node cha bằng i += i & -i. */
  add(idx: number, delta: number): void {
    for (let i = idx + 1; i <= this.n; i += i & -i) this.tree[i] += delta;
  }

  /** Tổng nums[0..idx] (0-indexed): đi xuống bằng i -= i & -i, gom các đoạn rời nhau. */
  prefixSum(idx: number): number {
    let sum = 0;
    for (let i = idx + 1; i > 0; i -= i & -i) sum += this.tree[i];
    return sum;
  }

  /** Tổng đoạn [l, r] = prefix(r) - prefix(l - 1). */
  rangeSum(l: number, r: number): number {
    return this.prefixSum(r) - (l > 0 ? this.prefixSum(l - 1) : 0);
  }
}
