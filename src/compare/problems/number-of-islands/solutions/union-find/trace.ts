import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { grid: number[][] }): Generator<Frame, number> {
  const { grid } = input;
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const parent = Array.from({ length: m * n }, (_, i) => i);
  const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const root = (x: number): number => { let y = x; while (parent[y] !== y) y = parent[y]; return y; }; // chỉ để vẽ, không nén
  let count = 0;
  const viz = (extra: Record<string, Highlight> = {}, arrHl: Record<number, Highlight> = {}) => {
    const h: Record<string, Highlight> = {};
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (!grid[r][c]) h[`${r},${c}`] = 'muted';
    const cells = grid.map((row, r) => row.map((v, c) => (v ? `g${root(r * n + c)}` : null)));
    return composite([
      matrix(cells, { title: `Lưới (không sửa): gK = gốc của tập chứa ô · count = ${count}`, highlights: { ...h, ...extra } }),
      arr(parent, { title: 'parent[] (id ô = r·n + c)', highlights: arrHl }),
    ]);
  };
  for (const row of grid) for (const v of row) if (v) count++;
  yield frame(8, { 'số ô đất': count }, viz(), `Ban đầu coi mỗi ô đất là một đảo riêng: count = ${count}. Mỗi lần hợp hai tập khác nhau, số đảo giảm đúng 1.`);
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (!grid[r][c]) continue;
      for (const [nr, nc] of [[r + 1, c], [r, c + 1]]) {
        if (nr >= m || nc >= n || !grid[nr][nc]) continue;
        const a = find(r * n + c);
        const b = find(nr * n + nc);
        const cells = { [`${r},${c}`]: 'active' as Highlight, [`${nr},${nc}`]: 'compare' as Highlight };
        if (a !== b) {
          parent[a] = b;
          count--;
          yield frame(17, { r, c, nr, nc, 'find(ô)': a, 'find(hàng xóm)': b, count }, viz(cells, { [a]: 'swap', [b]: 'done' }),
            `(${r},${c}) và (${nr},${nc}) kề nhau nhưng gốc khác (${a} ≠ ${b}) ⇒ parent[${a}] = ${b}, gộp hai đảo, count = ${count}.`);
        } else {
          yield frame(16, { r, c, nr, nc, 'find(ô)': a, 'find(hàng xóm)': b, count }, viz(cells, { [a]: 'done' }),
            `(${r},${c}) và (${nr},${nc}) đã cùng gốc ${a} (nối vòng qua đường khác) ⇒ không giảm count, tránh đếm trừ hai lần.`);
        }
      }
    }
  }
  yield frame(23, { count }, viz(), `Kết quả: ${count} đảo. Ưu điểm thật của Union-Find: thêm ô đất mới (Islands II) chỉ cần vài union, không phải quét lại cả lưới.`);
  return count;
}
