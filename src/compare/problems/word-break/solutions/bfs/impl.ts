/** BFS trên chỉ số bắt đầu: cạnh start → end khi s[start..end) là từ. Mỗi chỉ số vào hàng đợi tối đa một lần. O(n³), O(n). */
export function wordBreak(s: string, wordDict: string[]): boolean {
  const dict = new Set(wordDict);
  const seen = new Array<boolean>(s.length + 1).fill(false);
  const queue = [0];
  seen[0] = true;
  for (let h = 0; h < queue.length; h++) {
    const start = queue[h];
    if (start === s.length) return true; // tới được cuối chuỗi
    for (let end = start + 1; end <= s.length; end++) {
      if (!seen[end] && dict.has(s.slice(start, end))) {
        seen[end] = true; // đánh dấu ngay khi đẩy để không vào hàng đợi hai lần
        queue.push(end);
      }
    }
  }
  return false;
}
