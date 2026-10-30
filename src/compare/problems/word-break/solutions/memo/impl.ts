/** Đệ quy + memo: can(start) chỉ tính một lần cho mỗi start. O(n³) thời gian (n² cặp × slice), O(n) bộ nhớ. */
export function wordBreak(s: string, wordDict: string[]): boolean {
  const dict = new Set(wordDict);
  const memo = new Map<number, boolean>(); // start → s[start..) cắt được?
  const can = (start: number): boolean => {
    if (start === s.length) return true;
    if (memo.has(start)) return memo.get(start)!; // bài con đã giải
    let ok = false;
    for (let end = start + 1; end <= s.length && !ok; end++) {
      ok = dict.has(s.slice(start, end)) && can(end);
    }
    memo.set(start, ok);
    return ok;
  };
  return can(0);
}
