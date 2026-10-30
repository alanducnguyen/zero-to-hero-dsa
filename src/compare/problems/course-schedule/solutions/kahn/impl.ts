/** Kahn (BFS theo in-degree): lần lượt học môn không còn điều kiện; học đủ V môn ⇔ không có chu trình. O(V + E). */
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const indeg = new Array<number>(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    graph[b].push(a); // học b trước a ⇒ cạnh b → a
    indeg[a]++;
  }
  const queue: number[] = [];
  for (let u = 0; u < numCourses; u++) if (indeg[u] === 0) queue.push(u);
  let taken = 0;
  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    taken++;
    for (const v of graph[u]) {
      if (--indeg[v] === 0) queue.push(v); // điều kiện cuối cùng của v vừa được học
    }
  }
  return taken === numCourses;
}
