import { composite, frame, mapViz, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { tasks: string; n: number }): Generator<Frame, number> {
  const tasks = String(input.tasks ?? '');
  const n = Math.max(0, Math.floor(Number(input.n) || 0));
  const freq = new Map<string, number>();
  let grid: (string | null)[][] = [];
  const colLabels = () => (grid[0] ?? []).map((_, c) => (c <= n ? `c${c}` : `+${c - n}`));
  const viz = (mapHl: Record<string, Highlight> = {}, gridHl: Record<string, Highlight> = {}) =>
    composite([
      mapViz(freq, mapHl, 'freq – số lần xuất hiện mỗi task'),
      matrix(grid, {
        title: grid.length ? `Khung: ${grid.length} hàng (maxFreq) × ${n + 1} cột (n + 1)` : 'Khung (chưa dựng)',
        rowLabels: grid.map((_, r) => `hàng ${r}`),
        colLabels: colLabels(),
        highlights: gridHl,
      }),
    ]);

  // 1) đếm tần suất
  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    freq.set(t, (freq.get(t) ?? 0) + 1);
    yield frame(12, { i, t, [`freq[${t}]`]: freq.get(t) }, viz({ [t]: 'swap' }), `Đếm task '${t}' ⇒ freq[${t}] = ${freq.get(t)}. Thứ tự task trong input không quan trọng: chỉ tần suất quyết định lịch, vì ta được tự do sắp xếp lại.`);
  }
  if (tasks.length === 0) {
    yield frame(18, { result: 0 }, viz(), 'Không có task ⇒ 0 đơn vị thời gian.');
    return 0;
  }

  // 2) maxFreq, countMax
  let maxFreq = 0;
  for (const f of freq.values()) maxFreq = Math.max(maxFreq, f);
  const maxKeys = [...freq.keys()].filter((k) => freq.get(k) === maxFreq);
  const mapMaxHl = Object.fromEntries(maxKeys.map((k) => [k, 'active' as Highlight]));
  yield frame(14, { maxFreq }, viz(mapMaxHl), `maxFreq = ${maxFreq} (task ${maxKeys.join(', ')}). Task này là "nút cổ chai": ${maxFreq} lần chạy của nó cần ${maxFreq - 1} khoảng nghỉ, mỗi khoảng ≥ n = ${n} ⇒ lịch dài ít nhất (maxFreq − 1)·(n + 1) + 1.`);
  const countMax = maxKeys.length;
  yield frame(16, { maxFreq, countMax }, viz(mapMaxHl), `countMax = ${countMax}: có ${countMax} loại task cùng đạt ${maxFreq} lần. Mỗi loại đó đều chiếm một ô ở hàng cuối của khung ⇒ hàng cuối dài countMax ô.`);

  // 3) dựng khung maxFreq × (n+1) và điền
  grid = Array.from({ length: maxFreq }, () => new Array<string | null>(n + 1).fill(null));
  yield frame(17, { rows: maxFreq, cols: n + 1 }, viz(), `Dựng khung ${maxFreq} hàng × ${n + 1} cột. Mỗi hàng là một "chu kỳ" dài n + 1: task ở cột c của hàng r và hàng r+1 cách nhau đúng n + 1 > n đơn vị ⇒ tự động thoả cooldown. Hàng cuối chỉ cần đến cột countMax − 1.`);

  const order = [...freq.keys()].sort((a, b) => freq.get(b)! - freq.get(a)!);
  // điền theo cột: loại maxFreq phủ cả cột (kể cả hàng cuối); loại khác chỉ điền maxFreq−1 hàng đầu
  let col = 0;
  let row = 0;
  const h = maxFreq - 1;
  for (const t of order) {
    const f = freq.get(t)!;
    for (let k = 0; k < f; k++) {
      let r: number, c: number;
      if (f === maxFreq) {
        r = k;
        c = col;
      } else {
        if (row >= h) { row = 0; col++; }
        if (col >= grid[0].length) for (const line of grid) line.push(null); // khung đã đầy ⇒ nới rộng
        r = row++;
        c = col;
      }
      grid[r][c] = t;
      const extra = c > n;
      yield frame(17, { task: t, row: r, col: c }, viz({ [t]: 'active' }, { [`${r},${c}`]: extra ? 'range' : 'swap' }),
        f === maxFreq
          ? `Đặt '${t}' (lần ${k + 1}/${f}) vào hàng ${r}, cột ${c}. Task đạt maxFreq chiếm trọn một cột, kể cả hàng cuối – đó là lý do cộng countMax.`
          : extra
            ? `Khung đã kín hết ô ⇒ nới thêm cột ${c} cho '${t}'. Hàng dài hơn n + 1 chỉ làm khoảng cách giữa hai lần cùng loại lớn hơn, vẫn hợp lệ, và không còn ô idle nào ⇒ đáp án = số task.`
            : `Đặt '${t}' (lần ${k + 1}/${f}) vào hàng ${r}, cột ${c}. Điền theo cột từ trên xuống: vì freq[${t}] ≤ maxFreq − 1 = ${h}, các bản sao rơi vào các hàng khác nhau ⇒ hai lần '${t}' luôn cách nhau ≥ n.`,
      );
    }
    if (f === maxFreq) col++; // loại max dùng hết một cột, loại tiếp theo sang cột mới
  }

  // 4) tô idle và kết quả
  const frameSlots = (maxFreq - 1) * (n + 1) + countMax;
  const result = Math.max(frameSlots, tasks.length);
  const finalHl: Record<string, Highlight> = {};
  let idle = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const lastRowTail = r === maxFreq - 1 && c >= countMax;
      if (grid[r][c] === null) {
        if (lastRowTail) {
          grid[r][c] = '—';
          finalHl[`${r},${c}`] = 'muted';
        } else if (c <= n) {
          grid[r][c] = 'idle';
          finalHl[`${r},${c}`] = 'visited';
          idle++;
        } else {
          grid[r][c] = '—';
          finalHl[`${r},${c}`] = 'muted';
        }
      } else finalHl[`${r},${c}`] = 'done';
    }
  }
  yield frame(17, { maxFreq, n, countMax, frameSlots, idle }, viz(mapMaxHl, finalHl), `frameSlots = (maxFreq − 1)·(n + 1) + countMax = (${maxFreq} − 1)·${n + 1} + ${countMax} = ${frameSlots}. Đọc khung theo từng hàng, ô trống là idle (${idle} ô xám); phần sau countMax ở hàng cuối không tính vì lịch kết thúc ở đó.`);
  yield frame(18, { frameSlots, 'tasks.length': tasks.length, result }, viz(mapMaxHl, finalHl),
    frameSlots >= tasks.length
      ? `Kết quả = max(${frameSlots}, ${tasks.length}) = ${result}. Khung còn ô trống ⇒ phải chèn idle, độ dài bị chặn bởi task nhiều nhất.`
      : `Kết quả = max(${frameSlots}, ${tasks.length}) = ${result}. Số task vượt quá số ô của khung ⇒ xếp được không cần idle nào, đáp án đúng bằng số task (cận dưới tầm thường).`,
  );
  return result;
}
