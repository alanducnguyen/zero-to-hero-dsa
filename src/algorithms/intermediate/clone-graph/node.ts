import { cloneGraph, GraphNode } from './impl';

export interface CGInput { edges: string[] }

const MAX_VAL = 20;

/**
 * Dựng đồ thị vô hướng từ các chuỗi "a-b" (một chuỗi "a" đứng riêng = node cô lập).
 * Giá trị node 1..20 như LeetCode; bỏ qua chuỗi sai định dạng, tự vòng và cạnh trùng.
 * Thứ tự neighbors theo thứ tự cạnh xuất hiện trong input.
 * @returns node bắt đầu (giá trị 1 nếu có, không thì nhỏ nhất) và danh sách node theo giá trị tăng dần
 */
export function build(input: CGInput): { start: GraphNode | null; nodes: GraphNode[] } {
  const byVal = new Map<number, GraphNode>();
  const get = (v: number) => {
    if (!byVal.has(v)) byVal.set(v, new GraphNode(v));
    return byVal.get(v)!;
  };
  const ok = (v: number) => Number.isInteger(v) && v >= 1 && v <= MAX_VAL;
  for (const raw of input.edges ?? []) {
    const m = /^\s*(\d+)\s*(?:-\s*(\d+)\s*)?$/.exec(String(raw));
    if (!m) continue;
    const a = Number(m[1]);
    if (!ok(a)) continue;
    if (m[2] === undefined) {
      get(a);
      continue;
    }
    const b = Number(m[2]);
    if (!ok(b) || a === b) continue;
    const na = get(a);
    const nb = get(b);
    if (na.neighbors.includes(nb)) continue;
    na.neighbors.push(nb);
    nb.neighbors.push(na);
  }
  const nodes = [...byVal.values()].sort((x, y) => x.val - y.val);
  return { start: byVal.get(1) ?? nodes[0] ?? null, nodes };
}

/**
 * Chuyển đồ thị (đi được từ node) thành danh sách kề kiểu LeetCode:
 * out[v − 1] = các giá trị láng giềng của node v (sắp tăng dần). null ⇒ [].
 */
export function toAdjacency(node: GraphNode | null): number[][] {
  if (node === null) return [];
  const seen = new Set<GraphNode>([node]);
  const stackNodes = [node];
  while (stackNodes.length) {
    const u = stackNodes.pop()!;
    for (const v of u.neighbors) if (!seen.has(v)) { seen.add(v); stackNodes.push(v); }
  }
  const maxVal = Math.max(...[...seen].map((u) => u.val));
  const out: number[][] = Array.from({ length: maxVal }, () => []);
  for (const u of seen) out[u.val - 1] = u.neighbors.map((v) => v.val).sort((a, b) => a - b);
  return out;
}

export const run = (input: CGInput) => toAdjacency(cloneGraph(build(input).start));
