/** Bidirectional BFS: mở rộng phía có frontier nhỏ hơn, sinh hàng xóm bằng cách đổi từng ký tự; dừng khi hai phía chạm nhau. */
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  if (beginWord === endWord) return 1;
  const letters = [...new Set(wordList.join(''))];
  let front = new Set([beginWord]), back = new Set([endWord]);
  words.delete(beginWord); words.delete(endWord);
  for (let len = 1; front.size > 0; len++) {
    if (front.size > back.size) [front, back] = [back, front]; // luôn mở rộng phía nhỏ hơn
    const next = new Set<string>();
    for (const w of front) {
      for (let i = 0; i < w.length; i++) {
        for (const c of letters) {
          const cand = w.slice(0, i) + c + w.slice(i + 1);
          if (back.has(cand)) return len + 1; // hai phía gặp nhau
          if (words.has(cand)) { words.delete(cand); next.add(cand); }
        }
      }
    }
    front = next;
  }
  return 0;
}
