/** Đệ quy + memo (top-down): mỗi (i, j) giải một lần ⇒ O(m·n) thời gian và bộ nhớ, stack sâu m + n. */
export function minDistance(a: string, b: string): number {
  const n = b.length;
  const memo = new Map<number, number>(); // khoá i·(n+1) + j
  const d = (i: number, j: number): number => {
    if (i === 0 || j === 0) return i + j; // một chuỗi rỗng ⇒ chèn/xoá phần còn lại
    const key = i * (n + 1) + j;
    if (memo.has(key)) return memo.get(key)!; // đã giải ⇒ trả ngay
    const r = a[i - 1] === b[j - 1] ? d(i - 1, j - 1) : 1 + Math.min(d(i - 1, j - 1), d(i - 1, j), d(i, j - 1));
    memo.set(key, r);
    return r;
  };
  return d(a.length, b.length);
}
