/**
 * Bipartite Check – kiểm tra đồ thị có tô được bằng 2 màu sao cho mọi cạnh nối 2 màu khác nhau.
 * BFS từ mỗi thành phần: tô nguồn màu 0, hàng xóm màu ngược lại; gặp cạnh nối cùng màu ⇒ có chu trình lẻ ⇒ không bipartite.
 */
export function isBipartite(adj: Record<string, string[]>): { bipartite: boolean; color: Record<string, number> } {
  const color: Record<string, number> = {};
  for (const s of Object.keys(adj)) {
    if (s in color) continue; // đã thuộc thành phần đã tô
    color[s] = 0;
    const queue: string[] = [s];
    while (queue.length > 0) {
      const u = queue.shift()!;
      for (const v of adj[u] ?? []) {
        if (!(v in color)) {
          color[v] = 1 - color[u]; // hàng xóm phải khác màu
          queue.push(v);
        } else if (color[v] === color[u]) {
          return { bipartite: false, color }; // hai đầu một cạnh cùng màu ⇒ chu trình lẻ
        }
      }
    }
  }
  return { bipartite: true, color };
}
