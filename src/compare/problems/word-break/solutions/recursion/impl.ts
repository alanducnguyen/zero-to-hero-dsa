/** Đệ quy thuần: thử mọi tiền tố là từ rồi giải phần còn lại. Worst case O(2ⁿ) vì bài con lặp lại. */
export function wordBreak(s: string, wordDict: string[]): boolean {
  const dict = new Set(wordDict);
  const can = (start: number): boolean => {
    if (start === s.length) return true; // đã cắt hết chuỗi
    for (let end = start + 1; end <= s.length; end++) {
      if (dict.has(s.slice(start, end)) && can(end)) return true;
    }
    return false;
  };
  return can(0);
}
