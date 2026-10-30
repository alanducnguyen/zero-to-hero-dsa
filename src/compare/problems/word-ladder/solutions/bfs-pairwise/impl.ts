/** BFS, tìm hàng xóm bằng cách so từ hiện tại với MỌI từ trong list. O(n²·L). */
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if (!wordList.includes(endWord)) return 0;
  const adj = (a: string, b: string) => a.length === b.length && [...a].filter((c, i) => c !== b[i]).length === 1;
  const dist = new Map<string, number>([[beginWord, 1]]);
  const queue = [beginWord];
  for (let head = 0; head < queue.length; head++) {
    const word = queue[head];
    if (word === endWord) return dist.get(word)!; // BFS: lần đầu chạm đích là ngắn nhất
    for (const next of wordList) {
      if (dist.has(next) || !adj(word, next)) continue; // O(L) cho mỗi cặp
      dist.set(next, dist.get(word)! + 1);
      queue.push(next);
    }
  }
  return 0;
}
