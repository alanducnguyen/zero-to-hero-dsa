/**
 * Bellman-Ford – đường đi ngắn nhất một nguồn, cho phép cạnh âm, phát hiện chu trình âm.
 * Lặp V-1 vòng, mỗi vòng relax mọi cạnh. Vòng thứ V còn relax được ⇒ có chu trình âm tới được từ nguồn.
 */
export interface Edge { from: string; to: string; weight: number }

export function bellmanFord(
  nodes: string[],
  edges: Edge[],
  source: string,
): { dist: Record<string, number>; negativeCycle: boolean } {
  const dist: Record<string, number> = {};
  for (const v of nodes) dist[v] = Infinity;
  dist[source] = 0;
  for (let round = 1; round < nodes.length; round++) {
    let changed = false;
    for (const { from, to, weight } of edges) {
      if (dist[from] + weight < dist[to]) {
        dist[to] = dist[from] + weight; // relax: đường qua from ngắn hơn
        changed = true;
      }
    }
    if (!changed) break; // không cạnh nào đổi ⇒ đã hội tụ sớm
  }
  // Vòng kiểm tra: nếu vẫn relax được thì tồn tại chu trình âm
  let negativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (dist[from] + weight < dist[to]) negativeCycle = true;
  }
  return { dist, negativeCycle };
}
