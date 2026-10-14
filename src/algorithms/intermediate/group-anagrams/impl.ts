/**
 * Group Anagrams – nhóm các từ là anagram của nhau.
 * Khoá chuẩn = chuỗi đã sắp xếp ký tự; Map khoá → danh sách từ.
 */
export function groupAnagrams(words: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const w of words) {
    const key = [...w].sort().join(''); // anagram ⇔ cùng khoá
    const list = groups.get(key);
    if (list) list.push(w);
    else groups.set(key, [w]);
  }
  return [...groups.values()];
}
