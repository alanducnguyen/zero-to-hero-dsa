/**
 * Network Delay Time (LeetCode 743) – Dijkstra trên đồ thị CÓ HƯỚNG với binary min-heap.
 * @param times danh sách cạnh [u, v, w]: tín hiệu đi từ u tới v mất w (w ≥ 0)
 * @param n số node, đánh số 1..n
 * @param k node phát tín hiệu
 * @returns thời gian để MỌI node nhận được tín hiệu, hoặc -1 nếu có node không tới được
 */
export function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]); // chỉ một chiều u → v
  const dist = new Array<number>(n + 1).fill(Infinity);
  dist[k] = 0;
  const heap: [number, number][] = []; // phần tử [d, node], heap[0] có d nhỏ nhất
  const swap = (i: number, j: number) => ([heap[i], heap[j]] = [heap[j], heap[i]]);
  const push = (item: [number, number]) => {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0 && heap[(i - 1) >> 1][0] > heap[i][0]) {
      swap(i, (i - 1) >> 1); // sift-up: đổi chỗ với cha khi nhỏ hơn cha
      i = (i - 1) >> 1;
    }
  };
  const pop = (): [number, number] => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === i) break;
        swap(i, m); // sift-down: đổi chỗ với con nhỏ hơn
        i = m;
      }
    }
    return top;
  };
  push([0, k]);
  while (heap.length > 0) {
    const [d, u] = pop();
    if (d > dist[u]) continue; // bản ghi cũ (lazy deletion)
    for (const [v, w] of adj[u]) {
      if (d + w < dist[v]) {
        dist[v] = d + w; // relax cạnh u → v
        push([d + w, v]);
      }
    }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) ans = Math.max(ans, dist[i]); // node nhận tín hiệu muộn nhất
  return ans === Infinity ? -1 : ans;
}
