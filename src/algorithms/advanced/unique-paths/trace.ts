import { frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { grid: number[][] }): Generator<Frame, number> {
  const grid = input.grid.map((row) => [...row]);
  const m = grid.length;
  const n = m > 0 ? grid[0].length : 0;
  yield frame(8, { m, n }, matrix(grid, { title: 'grid (1 = vật cản)' }), `Lưới ${m}×${n}. Robot chỉ đi PHẢI hoặc XUỐNG nên mỗi ô chỉ có thể được tới từ ô trên hoặc ô trái.`);
  if (m === 0 || n === 0) {
    yield frame(10, { m, n, result: 0 }, matrix([], { title: 'grid rỗng' }), 'Lưới rỗng: không có ô xuất phát ⇒ 0 đường.');
    return 0;
  }
  const dp: number[][] = Array.from({ length: m }, () => new Array<number>(n).fill(0));
  // ô chưa tính hiển thị trống, vật cản hiển thị ■ (để tách bạch với giá trị 0 do bị chặn)
  const shown: (number | string | null)[][] = grid.map((row) => row.map((v) => (v === 1 ? '■' : null)));
  const rowLabels = Array.from({ length: m }, (_, r) => `r${r}`);
  const colLabels = Array.from({ length: n }, (_, c) => `c${c}`);
  const view = (h: Record<string, Highlight> = {}) => {
    const base: Record<string, Highlight> = {};
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (grid[r][c] === 1) base[`${r},${c}`] = 'muted';
    return matrix(shown, { title: 'dp[r][c] = số đường từ (0,0) tới (r,c)', rowLabels, colLabels, highlights: { ...base, ...h } });
  };

  yield frame(11, { m, n }, view(), 'Tạo bảng dp cùng kích thước lưới. dp[r][c] chỉ phụ thuộc ô trên và ô trái ⇒ duyệt theo hàng từ trên xuống, trái sang phải là đủ.');
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const cur = `${r},${c}`;
      if (grid[r][c] === 1) {
        dp[r][c] = 0;
        shown[r][c] = 0;
        yield frame(14, { r, c, 'grid[r][c]': 1, 'dp[r][c]': 0 }, view({ [cur]: 'swap' }),
          `(${r},${c}) là vật cản ⇒ dp = 0. Không đường nào đi QUA được ô này, nên nó cũng không "truyền" đường nào cho ô bên phải và bên dưới.`);
      } else if (r === 0 && c === 0) {
        dp[r][c] = 1;
        shown[r][c] = 1;
        yield frame(15, { r, c, 'dp[r][c]': 1 }, view({ [cur]: 'done' }),
          'Ô xuất phát: có đúng 1 cách "đứng yên tại chỗ". Đây là trường hợp cơ sở – mọi đường đi đều bắt nguồn từ con số 1 này.');
      } else {
        const top = r > 0 ? dp[r - 1][c] : 0;
        const left = c > 0 ? dp[r][c - 1] : 0;
        const h: Record<string, Highlight> = { [cur]: 'active' };
        if (r > 0) h[`${r - 1},${c}`] = 'compare';
        if (c > 0) h[`${r},${c - 1}`] = 'compare';
        yield frame(18, { r, c, top, left }, view(h),
          `Bước cuối cùng vào (${r},${c}) chỉ có thể là từ trên (${r > 0 ? `dp=${top}` : 'ngoài lưới ⇒ 0'}) hoặc từ trái (${c > 0 ? `dp=${left}` : 'ngoài lưới ⇒ 0'}). Hai tập đường này rời nhau nên cộng lại được.`);
        dp[r][c] = top + left;
        shown[r][c] = dp[r][c];
        yield frame(19, { r, c, top, left, 'dp[r][c]': dp[r][c] }, view({ ...h, [cur]: 'done' }),
          `dp[${r}][${c}] = ${top} + ${left} = ${dp[r][c]}.`);
      }
    }
  }
  const result = dp[m - 1][n - 1];
  yield frame(23, { result }, view({ [`${m - 1},${n - 1}`]: 'done' }),
    result === 0
      ? 'dp ở góc dưới-phải = 0: vật cản chặn hết mọi đường (hoặc chính đích/xuất phát là vật cản).'
      : `Kết quả = dp[${m - 1}][${n - 1}] = ${result} đường đi khác nhau.`);
  return result;
}
