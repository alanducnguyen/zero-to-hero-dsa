/**
 * Segment Tree – tổng đoạn [l, r] và cập nhật điểm, đều O(log n).
 * Cây lưu trong mảng: node i quản lý một đoạn, con là 2i+1 và 2i+2.
 */
export class SegmentTree {
  readonly n: number;
  readonly tree: number[];

  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array<number>(4 * Math.max(1, this.n)).fill(0);
    if (this.n > 0) this.build(0, 0, this.n - 1, nums);
  }

  private build(node: number, lo: number, hi: number, nums: number[]): void {
    if (lo === hi) {
      this.tree[node] = nums[lo]; // lá
      return;
    }
    const mid = (lo + hi) >> 1;
    this.build(2 * node + 1, lo, mid, nums);
    this.build(2 * node + 2, mid + 1, hi, nums);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2]; // cha = tổng hai con
  }

  /** Gán nums[idx] = val. */
  update(idx: number, val: number): void {
    this.updateRec(0, 0, this.n - 1, idx, val);
  }

  private updateRec(node: number, lo: number, hi: number, idx: number, val: number): void {
    if (lo === hi) {
      this.tree[node] = val;
      return;
    }
    const mid = (lo + hi) >> 1;
    if (idx <= mid) this.updateRec(2 * node + 1, lo, mid, idx, val);
    else this.updateRec(2 * node + 2, mid + 1, hi, idx, val);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2]; // tính lại trên đường lên
  }

  /** Tổng nums[l..r]. */
  query(l: number, r: number): number {
    return this.queryRec(0, 0, this.n - 1, l, r);
  }

  private queryRec(node: number, lo: number, hi: number, l: number, r: number): number {
    if (r < lo || hi < l) return 0; // không giao
    if (l <= lo && hi <= r) return this.tree[node]; // nằm trọn ⇒ dùng ngay
    const mid = (lo + hi) >> 1;
    return this.queryRec(2 * node + 1, lo, mid, l, r) + this.queryRec(2 * node + 2, mid + 1, hi, l, r);
  }
}
