/** DFS 3 màu: GRAY = đang nằm trên stack đệ quy; gặp lại một đỉnh GRAY ⇒ có chu trình. O(V + E). */
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) graph[b].push(a); // học b trước a ⇒ cạnh b → a
  const color = new Array<number>(numCourses).fill(0); // 0 WHITE, 1 GRAY, 2 BLACK
  const dfs = (u: number): boolean => {
    color[u] = 1;
    for (const v of graph[u]) {
      if (color[v] === 1) return false; // back-edge ⇒ chu trình
      if (color[v] === 0 && !dfs(v)) return false;
    }
    color[u] = 2;
    return true;
  };
  for (let u = 0; u < numCourses; u++) {
    if (color[u] === 0 && !dfs(u)) return false;
  }
  return true;
}
