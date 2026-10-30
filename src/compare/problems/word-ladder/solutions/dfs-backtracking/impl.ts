/** DFS/backtracking: thử MỌI đường đi đơn từ beginWord, giữ độ dài ngắn nhất. Hàm mũ – chỉ cho input rất nhỏ. */
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if (!wordList.includes(endWord)) return 0;
  const adj = (a: string, b: string) => a.length === b.length && [...a].filter((c, i) => c !== b[i]).length === 1;
  const onPath = new Set<string>([beginWord]);
  let best = Infinity;
  const dfs = (word: string, len: number): void => {
    if (len >= best) return; // cắt nhánh: không thể ngắn hơn đáp án đã có
    if (word === endWord) { best = len; return; }
    for (const next of wordList) {
      if (onPath.has(next) || !adj(word, next)) continue;
      onPath.add(next);
      dfs(next, len + 1);
      onPath.delete(next); // backtrack: next có thể nằm trên một đường khác
    }
  };
  dfs(beginWord, 1);
  return best === Infinity ? 0 : best;
}
