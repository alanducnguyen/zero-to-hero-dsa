/**
 * Clone Graph (LeetCode 133) – sao chép sâu (deep copy) đồ thị vô hướng liên thông bằng BFS.
 * Map gốc → bản sao vừa là tập "đã thăm" vừa để tra bản sao khi nối cạnh.
 * Bản sao được tạo và ghi vào map NGAY KHI enqueue ⇒ mỗi node vào queue đúng 1 lần, chu trình không gây lặp vô hạn.
 * @param node một node bất kỳ của đồ thị (hoặc null)
 * @returns node tương ứng trong đồ thị bản sao (không chia sẻ object nào với bản gốc)
 */
export function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;
  const clones = new Map<GraphNode, GraphNode>();
  clones.set(node, new GraphNode(node.val)); // tạo bản sao khi enqueue
  const queue: GraphNode[] = [node];
  while (queue.length > 0) {
    const cur = queue.shift()!;
    for (const nb of cur.neighbors) {
      if (!clones.has(nb)) {
        clones.set(nb, new GraphNode(nb.val)); // đánh dấu NGAY, trước khi vào queue
        queue.push(nb);
      }
      clones.get(cur)!.neighbors.push(clones.get(nb)!); // nối cạnh cur → nb trong bản sao
    }
  }
  return clones.get(node)!;
}

/** Node đồ thị theo định nghĩa của LeetCode. */
export class GraphNode {
  val: number;
  neighbors: GraphNode[];
  constructor(val = 0, neighbors: GraphNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}
