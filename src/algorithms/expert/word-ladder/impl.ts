/**
 * Word Ladder (LeetCode 127) – BFS trên đồ thị ngầm giữa các từ.
 * Hai từ kề nhau nếu khác đúng 1 ký tự; thay vì so từng cặp (O(n²·L)),
 * gom từ theo "pattern" wildcard: "hot" → "*ot", "h*t", "ho*".
 * Các từ chung một pattern là hàng xóm của nhau.
 * @param beginWord từ bắt đầu (không cần nằm trong wordList)
 * @param endWord từ đích (phải nằm trong wordList)
 * @param wordList danh sách từ hợp lệ
 * @returns số từ trong chuỗi biến đổi ngắn nhất (tính cả beginWord), 0 nếu không có
 */
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  const L = beginWord.length;
  const buckets = new Map<string, string[]>();
  for (const w of words) {
    for (let i = 0; i < L; i++) {
      const p = w.slice(0, i) + '*' + w.slice(i + 1);
      const list = buckets.get(p) ?? [];
      list.push(w);
      buckets.set(p, list);
    }
  }
  const dist = new Map<string, number>([[beginWord, 1]]);
  const queue: string[] = [beginWord];
  let head = 0;
  while (head < queue.length) {
    const word = queue[head++];
    const d = dist.get(word) ?? 1;
    if (word === endWord) return d;
    for (let i = 0; i < L; i++) {
      const p = word.slice(0, i) + '*' + word.slice(i + 1);
      for (const next of buckets.get(p) ?? []) {
        if (dist.has(next)) continue; // đã thăm: BFS gặp lần đầu là ngắn nhất
        dist.set(next, d + 1);
        queue.push(next);
      }
      buckets.delete(p); // mỗi bucket chỉ cần duyệt một lần
    }
  }
  return 0;
}
