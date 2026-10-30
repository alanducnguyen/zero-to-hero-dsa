/** Gỡ lặp ngây thơ: mỗi vòng tính lại in-degree từ đầu, gỡ một môn có in-degree 0. O(V·(V + E)). */
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const removed = new Array<boolean>(numCourses).fill(false);
  for (let round = 0; round < numCourses; round++) {
    const indeg = new Array<number>(numCourses).fill(0);
    for (const [a, b] of prerequisites) if (!removed[b]) indeg[a]++; // quét lại MỌI cạnh
    const pick = indeg.findIndex((d, u) => d === 0 && !removed[u]);
    if (pick < 0) return false; // còn môn nhưng môn nào cũng bị chặn ⇒ chu trình
    removed[pick] = true;
  }
  return true;
}
