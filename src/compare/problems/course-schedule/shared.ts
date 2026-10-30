import type { GraphVisual, Highlight } from '@/engine/types';

export interface CSInput { numCourses: number; prerequisites: string[] }

/**
 * Chuẩn hoá input: "b->a" (học b trước a) ⇒ cặp [a, b] theo định dạng LeetCode.
 * Bỏ qua chuỗi sai định dạng hoặc số môn ngoài phạm vi 0..numCourses-1.
 */
export function parse(input: CSInput): { numCourses: number; prerequisites: number[][] } {
  const numCourses = Math.max(0, Math.min(10, Math.floor(Number(input.numCourses) || 0)));
  const prerequisites: number[][] = [];
  for (const raw of input.prerequisites ?? []) {
    const m = /^\s*(\d+)\s*(?:->|-|,|>)\s*(\d+)\s*$/.exec(String(raw));
    if (!m) continue;
    const b = Number(m[1]), a = Number(m[2]);
    if (a >= numCourses || b >= numCourses) continue;
    prerequisites.push([a, b]);
  }
  return { numCourses, prerequisites };
}

/** Vẽ đồ thị b → a với các đỉnh xếp trên đường tròn. */
export function graphViz(
  n: number,
  prerequisites: number[][],
  highlights: Record<string, Highlight>,
  opts: { edgeHighlights?: Record<string, Highlight>; marks?: Record<string, string>; title?: string } = {},
): GraphVisual {
  const R = n <= 1 ? 0 : 120;
  const nodes = Array.from({ length: n }, (_, k) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * k) / Math.max(1, n);
    return { id: String(k), label: `Môn ${k}`, x: Math.round(260 + R * Math.cos(ang)), y: Math.round(150 + R * Math.sin(ang)) };
  });
  const edges = prerequisites.map(([a, b]) => ({ from: String(b), to: String(a), directed: true }));
  return { kind: 'graph', title: opts.title ?? 'Đồ thị b → a (học b trước a)', nodes, edges, highlights, edgeHighlights: opts.edgeHighlights, marks: opts.marks };
}
