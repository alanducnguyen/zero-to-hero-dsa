/**
 * Topological Sort – thuật toán Kahn (BFS theo bậc vào).
 * Sắp xếp các đỉnh của đồ thị có hướng sao cho mọi cạnh u→v có u đứng trước v.
 * @param graph danh sách kề: đỉnh → các đỉnh nó trỏ tới
 * @returns thứ tự topo, hoặc null nếu đồ thị có chu trình
 */
export function topologicalSort(graph: Record<string, string[]>): string[] | null {
  const indegree: Record<string, number> = {};
  for (const u of Object.keys(graph)) indegree[u] ??= 0;
  for (const u of Object.keys(graph)) {
    for (const v of graph[u]) indegree[v] = (indegree[v] ?? 0) + 1;
  }
  const queue = Object.keys(indegree).filter((v) => indegree[v] === 0); // đỉnh không phụ thuộc ai
  const order: string[] = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of graph[u] ?? []) {
      indegree[v]--; // "cắt" cạnh u→v
      if (indegree[v] === 0) queue.push(v); // v đã hết phụ thuộc
    }
  }
  if (order.length !== Object.keys(indegree).length) return null; // còn đỉnh chưa ra ⇒ chu trình
  return order;
}
