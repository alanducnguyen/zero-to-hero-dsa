/** Đệ quy + memo (top-down): mỗi cặp (i, j) giải đúng một lần ⇒ O(m·n) thời gian và bộ nhớ. */
export function longestCommonSubsequence(a: string, b: string): number {
  const n = b.length;
  const memo = new Map<number, number>(); // khoá i·(n+1) + j
  const lcs = (i: number, j: number): number => {
    if (i === 0 || j === 0) return 0;
    const key = i * (n + 1) + j;
    if (memo.has(key)) return memo.get(key)!; // đã giải ⇒ trả ngay
    const r = a[i - 1] === b[j - 1] ? lcs(i - 1, j - 1) + 1 : Math.max(lcs(i - 1, j), lcs(i, j - 1));
    memo.set(key, r);
    return r;
  };
  return lcs(a.length, b.length);
}
