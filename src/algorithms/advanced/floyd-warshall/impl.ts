/**
 * Floyd–Warshall – đường đi ngắn nhất giữa MỌI cặp đỉnh (all-pairs) bằng DP trên đỉnh trung gian.
 * dist[i][j] sau vòng k = đường ngắn nhất i→j chỉ dùng đỉnh trung gian trong {0..k}.
 * Cho phép cạnh âm, không cho chu trình âm (phát hiện qua dist[i][i] < 0).
 */
export function floydWarshall(n: number, edges: [number, number, number][]): number[][] {
  const dist: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)),
  );
  for (const [u, v, w] of edges) dist[u][v] = Math.min(dist[u][v], w);
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]; // đi vòng qua k ngắn hơn
        }
      }
    }
  }
  return dist;
}
