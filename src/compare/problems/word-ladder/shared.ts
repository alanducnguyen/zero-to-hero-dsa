import type { GraphVisual, Highlight } from '@/engine/types';

export interface WLInput { beginWord: string; endWord: string; wordList: string[] }

export const norm = (input: WLInput): WLInput => ({
  beginWord: String(input.beginWord ?? ''),
  endWord: String(input.endWord ?? ''),
  wordList: (input.wordList ?? []).map(String),
});

export const adj = (a: string, b: string) => a.length === b.length && [...a].filter((c, i) => c !== b[i]).length === 1;

/** Dựng đồ thị ngầm (cạnh = khác đúng 1 ký tự) chỉ để vẽ; đỉnh xếp cột theo khoảng cách BFS từ beginWord. */
export function makeGraph({ beginWord, wordList }: WLInput) {
  const all = [...new Set([beginWord, ...wordList])];
  const edges: { from: string; to: string }[] = [];
  for (let a = 0; a < all.length; a++)
    for (let b = a + 1; b < all.length; b++) if (adj(all[a], all[b])) edges.push({ from: all[a], to: all[b] });
  const level = new Map<string, number>([[beginWord, 0]]);
  const q = [beginWord];
  for (let h = 0; h < q.length; h++)
    for (const e of edges) {
      const o = e.from === q[h] ? e.to : e.to === q[h] ? e.from : null;
      if (o !== null && !level.has(o)) { level.set(o, (level.get(q[h]) ?? 0) + 1); q.push(o); }
    }
  const maxLv = Math.max(0, ...level.values());
  const perLv = new Map<number, number>();
  const nodes = all.map((w) => {
    const lv = level.get(w) ?? maxLv + 1;
    const k = perLv.get(lv) ?? 0;
    perLv.set(lv, k + 1);
    return { id: w, label: w, x: 60 + lv * 110, y: 50 + k * 75 };
  });
  return (title: string, highlights: Record<string, Highlight>, edgeHighlights: Record<string, Highlight> = {}, marks: Record<string, string> = {}): GraphVisual =>
    ({ kind: 'graph', title, nodes, edges, highlights, edgeHighlights, marks });
}

