export interface Edge {
  to: string;
  weight: number;
}

/**
 * Dijkstra – đường đi ngắn nhất một nguồn trên đồ thị trọng số không âm.
 * Dùng priority queue (ở đây là mảng + tìm min để dễ đọc; thực tế dùng heap).
 * @param graph danh sách kề: node → các cạnh đi ra
 * @param source đỉnh xuất phát
 * @returns khoảng cách ngắn nhất tới mọi đỉnh (Infinity nếu không tới được)
 */
export function dijkstra(graph: Record<string, Edge[]>, source: string): Record<string, number> {
  const dist: Record<string, number> = {};
  for (const node of Object.keys(graph)) dist[node] = Infinity;
  dist[source] = 0;
  const visited = new Set<string>();
  const pq: { node: string; d: number }[] = [{ node: source, d: 0 }];
  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d); // lấy đỉnh có khoảng cách tạm nhỏ nhất
    const { node: u, d } = pq.shift()!;
    if (visited.has(u)) continue; // bản ghi cũ (stale) trong hàng đợi
    visited.add(u);
    for (const { to: v, weight } of graph[u] ?? []) {
      const candidate = d + weight;
      if (candidate < dist[v]) {
        dist[v] = candidate; // relax cạnh (u, v)
        pq.push({ node: v, d: candidate });
      }
    }
  }
  return dist;
}
