/**
 * Course Schedule II (LeetCode 207/210) – DFS 3 màu tìm thứ tự học hợp lệ.
 * WHITE = chưa thăm, GRAY = đang nằm trên stack đệ quy, BLACK = đã xong (mọi môn phụ thuộc đã xử lý).
 * Gặp cạnh trỏ tới đỉnh GRAY ⇒ back-edge ⇒ có chu trình ⇒ không tồn tại thứ tự.
 * @param numCourses số môn học, đánh số 0..numCourses-1
 * @param prerequisites các cặp [a, b]: phải học b trước a (cạnh b → a)
 * @returns một thứ tự học hợp lệ, hoặc [] nếu có chu trình
 */
export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) graph[b].push(a); // b → a
  const WHITE = 0;
  const GRAY = 1;
  const BLACK = 2;
  const color: number[] = new Array<number>(numCourses).fill(WHITE);
  const postorder: number[] = [];

  function dfs(u: number): boolean {
    color[u] = GRAY; // u đang trên stack đệ quy
    for (const v of graph[u]) {
      if (color[v] === GRAY) return false; // back-edge ⇒ chu trình
      if (color[v] === WHITE && !dfs(v)) return false;
    }
    color[u] = BLACK; // mọi môn phụ thuộc u đã xử lý xong
    postorder.push(u);
    return true;
  }

  for (let u = 0; u < numCourses; u++) {
    if (color[u] === WHITE && !dfs(u)) return [];
  }
  return postorder.reverse(); // u xong SAU mọi hậu duệ ⇒ đảo lại để u đứng trước
}
