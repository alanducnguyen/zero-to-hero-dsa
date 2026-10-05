/**
 * Union-Find (Disjoint Set Union) với path compression và union by rank.
 * Trả lời "a và b cùng nhóm?" và gộp nhóm gần như O(1) mỗi thao tác.
 */
export class UnionFind {
  readonly parent: number[];
  readonly rank: number[];
  count: number; // số nhóm hiện tại

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i); // mỗi phần tử tự là gốc
    this.rank = new Array(n).fill(0);
    this.count = n;
  }

  /** Tìm gốc của x, đồng thời nối thẳng mọi node trên đường về gốc. */
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  /** Gộp nhóm chứa a và b. Trả về false nếu đã cùng nhóm. */
  union(a: number, b: number): boolean {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return false; // đã cùng nhóm ⇒ cạnh (a,b) tạo chu trình
    if (this.rank[ra] < this.rank[rb]) [ra, rb] = [rb, ra]; // treo cây thấp dưới cây cao
    this.parent[rb] = ra;
    if (this.rank[ra] === this.rank[rb]) this.rank[ra]++; // bằng nhau ⇒ cây mới cao thêm 1
    this.count--;
    return true;
  }

  connected(a: number, b: number): boolean {
    return this.find(a) === this.find(b);
  }
}
