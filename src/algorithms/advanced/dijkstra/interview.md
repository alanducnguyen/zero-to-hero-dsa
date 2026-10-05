## Cách trình bày trong phỏng vấn

1. Xác nhận: "Trọng số có âm không?" – nếu có, Dijkstra không dùng được. Hỏi đồ thị có hướng/vô hướng, dày/thưa.
2. Nêu ý tưởng tham lam và tại sao đúng (đỉnh có dist tạm nhỏ nhất đã là cuối cùng vì trọng số ≥ 0).
3. Viết code với **heap** và **lazy deletion**: "khi pop ra mà d > dist[u] thì bỏ qua".
4. Phân tích O((V+E) log V), nhắc đồ thị dày dùng O(V²).
5. Nêu biến thể phù hợp với câu hỏi gốc (min-max, xác suất, k bước).

## Phiên bản heap nên viết trong phỏng vấn

```ts
function dijkstra(adj: Record<string, { to: string; weight: number }[]>, s: string) {
  const dist: Record<string, number> = {};
  for (const v in adj) dist[v] = Infinity;
  dist[s] = 0;
  const heap = new MinHeap<[number, string]>((a, b) => a[0] - b[0]); // [d, node]
  heap.push([0, s]);
  while (heap.size) {
    const [d, u] = heap.pop();
    if (d > dist[u]) continue;            // bản ghi cũ – lazy deletion
    for (const { to: v, weight } of adj[u]) {
      if (d + weight < dist[v]) {
        dist[v] = d + weight;
        heap.push([dist[v], v]);
      }
    }
  }
  return dist;
}
```

## Câu hỏi follow-up thường gặp

- **Tại sao không dùng được với trọng số âm? Ví dụ?** A→B = 5, A→C = 2, C→B = −10. Dijkstra chốt B = 5 trước khi thấy đường A→C→B = −8. Dùng Bellman-Ford.
- **Khác BFS thế nào?** BFS = Dijkstra với mọi w = 1, queue thường thay heap, O(V+E).
- **Trả về đường đi?** Lưu `parent[v] = u` khi relax; lần ngược từ đích.
- **Đồ thị dày (E ≈ V²)?** O(V²) với mảng nhanh hơn heap O(V² log V).
- **Tìm đường tới 1 đích trên bản đồ lớn?** A* với heuristic Manhattan/Euclid, hoặc bidirectional Dijkstra.
- **Mọi cặp đỉnh?** Floyd-Warshall O(V³) nếu V ≤ ~400; Johnson (Bellman-Ford + V lần Dijkstra) cho đồ thị thưa có cạnh âm.
- **Tại sao "visited khi push" sai với Dijkstra nhưng đúng với BFS?** BFS: lần đầu thấy = ngắn nhất (mọi cạnh bằng nhau). Dijkstra: lần đầu thấy chỉ là một đường, có thể có đường ngắn hơn sau. Chỉ chốt khi pop.
- **Heap chứa bao nhiêu phần tử tối đa?** O(E) với lazy deletion; vẫn O(E log E) = O(E log V).

## Checklist nhận diện pattern

- "Chi phí / thời gian / khoảng cách **nhỏ nhất**" trên đồ thị có trọng số ≥ 0 ⇒ Dijkstra.
- Trọng số âm ⇒ Bellman-Ford. Cạnh bằng nhau ⇒ BFS. 0/1 ⇒ 0-1 BFS.
- Lưới với chi phí ô khác nhau ⇒ Dijkstra trên lưới (Path With Minimum Effort, Minimum Path Sum có thể DP vì chỉ đi xuống/phải).
- "Lớn nhất xác suất / nhỏ nhất của max" ⇒ Dijkstra với phép toán thay thế.

## Bài luyện tập liên quan

- 743 Network Delay Time (Dijkstra chuẩn), 1631 Path With Minimum Effort, 1514 Path with Maximum Probability.
- 787 Cheapest Flights Within K Stops (Bellman-Ford k vòng), 778 Swim in Rising Water.
- 1334 Find the City (Floyd-Warshall), 1976 Number of Ways to Arrive at Destination (Dijkstra + đếm).
