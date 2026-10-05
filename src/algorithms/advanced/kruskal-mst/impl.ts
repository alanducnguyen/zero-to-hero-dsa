export interface Edge {
  from: string;
  to: string;
  weight: number;
}

/**
 * Kruskal – cây khung nhỏ nhất: sắp cạnh tăng dần, thêm cạnh nếu không tạo chu trình (Union-Find).
 * @returns các cạnh của MST và tổng trọng số (null nếu đồ thị không liên thông)
 */
export function kruskal(nodes: string[], edges: Edge[]): { edges: Edge[]; total: number } | null {
  const parent = new Map<string, string>(nodes.map((v) => [v, v]));
  const find = (x: string): string => {
    const p = parent.get(x)!;
    if (p === x) return x;
    const root = find(p);
    parent.set(x, root); // path compression
    return root;
  };
  const sorted = [...edges].sort((a, b) => a.weight - b.weight); // tham lam: rẻ nhất trước
  const chosen: Edge[] = [];
  let total = 0;
  for (const e of sorted) {
    const ra = find(e.from);
    const rb = find(e.to);
    if (ra === rb) continue; // hai đầu đã liên thông ⇒ cạnh này tạo chu trình
    parent.set(rb, ra); // gộp hai thành phần
    chosen.push(e);
    total += e.weight;
    if (chosen.length === nodes.length - 1) break; // đủ V-1 cạnh ⇒ xong
  }
  return chosen.length === nodes.length - 1 ? { edges: chosen, total } : null;
}
