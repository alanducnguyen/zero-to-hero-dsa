import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export interface WordSearchInput {
  board: string[];
  word: string;
}

export function* trace(input: WordSearchInput): Generator<Frame, boolean> {
  const word = input.word;
  const grid = input.board.map((row) => row.split(''));
  const orig = grid.map((row) => [...row]);
  const m = grid.length;
  const width = Math.max(0, ...grid.map((row) => row.length));
  const path: [number, number][] = [];
  const backtracked = new Set<string>();
  let found: [number, number][] | null = null;
  const cs: string[] = ['exist'];
  const key = (r: number, c: number) => `${r},${c}`;

  const viz = (test?: [number, number], i = path.length) => {
    const cells = orig.map((row) => Array.from({ length: width }, (_, c) => (c < row.length ? row[c] : null)));
    const h: Record<string, Highlight> = {};
    for (const k of backtracked) h[k] = 'swap';
    const onPath = found ?? path;
    onPath.forEach(([r, c], idx) => {
      h[key(r, c)] = found ? 'done' : 'active';
      cells[r][c] = `${orig[r][c]}${idx + 1}`;
    });
    if (test && test[0] >= 0 && test[0] < m && test[1] >= 0 && test[1] < grid[test[0]].length) h[key(test[0], test[1])] = 'compare';
    const wh: Record<number, Highlight> = {};
    for (let k = 0; k < word.length; k++) wh[k] = k < i ? (found ? 'done' : 'active') : k === i ? 'compare' : 'muted';
    return composite([
      matrix(cells, { title: 'Lưới (tím = đường đi + thứ tự, vàng = ô đang thử, đỏ = vừa quay lui, xanh lá = tìm thấy)', highlights: h }),
      arr(word.length ? word.split('') : ['∅'], { title: `word = "${word}" (vàng = ký tự cần khớp)`, highlights: wh, mode: 'cells' }),
    ]);
  };
  const extra = () => ({ callStack: [...cs] });
  const vars = (r: number, c: number, i: number) => ({ r, c, i, need: word[i] ?? '', path: path.map(([a, b]) => `(${a},${b})`).join('→') });

  function* dfs(r: number, c: number, i: number): Generator<Frame, boolean> {
    cs.push(`dfs(${r},${c},i=${i})`);
    if (i === word.length) {
      found = [...path];
      yield frame(13, vars(r, c, i), viz(undefined, i), `i = ${i} = độ dài word ⇒ mọi ký tự đã khớp theo một đường đi liền kề, không ô nào dùng lại ⇒ true. Không cần kiểm tra (${r},${c}) vì nó chỉ là bước "thừa" sau ký tự cuối.`, extra());
      cs.pop();
      return true;
    }
    if (r < 0 || r >= m || c < 0 || c >= grid[r].length) {
      yield frame(14, vars(r, c, i), viz(undefined, i), `(${r},${c}) nằm ngoài lưới ⇒ false. Kiểm tra biên TRƯỚC khi đọc grid[r][c] để không truy cập ngoài mảng.`, extra());
      cs.pop();
      return false;
    }
    if (grid[r][c] !== word[i]) {
      const cell = grid[r][c];
      yield frame(15, { ...vars(r, c, i), cell }, viz([r, c], i),
        cell === '#'
          ? `(${r},${c}) đang là '#' – ô đã nằm trên đường đi hiện tại ⇒ false. Nhờ đánh dấu tại chỗ, một phép so sánh ký tự vừa loại sai ký tự vừa chặn dùng lại ô.`
          : `grid[${r}][${c}] = '${cell}' ≠ word[${i}] = '${word[i]}' ⇒ cắt nhánh ngay, không mở rộng thêm.`, extra());
      cs.pop();
      return false;
    }
    const saved = grid[r][c];
    grid[r][c] = '#';
    path.push([r, c]);
    backtracked.delete(key(r, c));
    yield frame(17, { ...vars(r, c, i), saved }, viz(undefined, i + 1),
      `'${saved}' khớp word[${i}] ⇒ thêm (${r},${c}) vào đường đi và ghi '#' lên lưới, để các bước sâu hơn không quay lại dùng ô này lần nữa. Tiếp theo thử 4 hướng: xuống, lên, phải, trái.`, extra());
    const dirs: [number, number, number][] = [[r + 1, c, 19], [r - 1, c, 20], [r, c + 1, 21], [r, c - 1, 22]];
    let res = false;
    for (const [nr, nc, line] of dirs) {
      yield frame(line, vars(nr, nc, i + 1), viz([nr, nc], i + 1), `Thử bước tới (${nr},${nc}) để khớp word[${i + 1}] = '${word[i + 1] ?? '(hết)'}'.`, extra());
      res = yield* dfs(nr, nc, i + 1);
      if (res) break;
    }
    grid[r][c] = saved;
    path.pop();
    if (!res) backtracked.add(key(r, c));
    yield frame(23, { ...vars(r, c, i), found: res }, viz(undefined, i),
      res
        ? `Đã tìm thấy ở nhánh con ⇒ toán tử || dừng sớm, các hướng còn lại không cần thử. Vẫn khôi phục '${saved}' để lưới đầu vào không bị thay đổi.`
        : `Cả 4 hướng từ (${r},${c}) đều thất bại ⇒ quay lui: khôi phục '${saved}' (đỏ) để những đường đi khác, xuất phát từ ô khác, vẫn được dùng ô này.`, extra());
    yield frame(24, { ...vars(r, c, i), found: res }, viz(undefined, i), `dfs(${r},${c},${i}) trả về ${res}.`, extra());
    cs.pop();
    return res;
  }

  yield frame(8, { m, word }, viz(), `Chép board thành lưới ký tự có thể sửa tại chỗ (${m} hàng). Ý tưởng: thử mọi ô làm điểm bắt đầu, từ đó DFS khớp word từng ký tự một.`, extra());
  if (word.length === 0) {
    yield frame(10, { word }, viz(), 'word rỗng ⇒ luôn tìm thấy (đường đi rỗng).', extra());
    return true;
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      backtracked.clear();
      yield frame(29, { r, c }, viz([r, c], 0), `Xuất phát từ (${r},${c}): gọi dfs(${r},${c},0). Mỗi lần bắt đầu mới, lưới đã sạch '#' nhờ các bước quay lui trước đó.`, extra());
      if (yield* dfs(r, c, 0)) {
        yield frame(29, { r, c, result: true }, viz(), `Tìm thấy "${word}" với điểm bắt đầu (${r},${c}) ⇒ trả về true ngay, không thử các ô còn lại.`, extra());
        return true;
      }
    }
  }
  yield frame(32, { result: false }, viz(), `Đã thử mọi điểm xuất phát mà không có đường đi nào ghép được "${word}" ⇒ false.`, extra());
  return false;
}
