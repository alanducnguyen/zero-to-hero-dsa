import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const fmt = (t: number[]) => `[${t.join(',')}]`;

export function* trace(input: { nums: number[] }): Generator<Frame, number[][]> {
  const a = [...input.nums].sort((x, y) => x - y);
  const res: number[][] = [];
  const viz = (i: number, l: number, r: number, h: Highlight = 'compare', resHl: Record<number, Highlight> = {}) => {
    const hls: Record<number, Highlight> = {};
    for (let x = 0; x < i; x++) hls[x] = 'muted';
    hls[i] = 'active';
    if (l < r) { hls[l] = h; hls[r] = h; }
    return composite([
      arr(a, { title: 'a (đã sắp xếp)', highlights: hls, pointers: [{ name: 'i', index: i }, ...(l < r ? [{ name: 'l', index: l }, { name: 'r', index: r }] : [])], ranges: l < r ? [{ from: l, to: r, color: 'range' }] : [] }),
      arr(res.map(fmt), { title: 'res', highlights: resHl }),
    ]);
  };
  yield frame(3, { a }, composite([arr(a, { title: 'a (đã sắp xếp)' }), arr([], { title: 'res' })]), 'Sắp xếp O(n log n) – rẻ so với O(n²) phía sau. Thứ tự tăng dần cho phép biết tiến/lùi con trỏ nào, và đưa giá trị trùng về cạnh nhau để khử trùng không cần Set.');
  for (let i = 0; i < a.length - 2; i++) {
    if (a[i] > 0) {
      yield frame(6, { i, 'a[i]': a[i] }, viz(i, a.length, a.length), `a[i] = ${a[i]} > 0 ⇒ cả ba số đều dương, tổng không thể bằng 0. Dừng sớm.`);
      break;
    }
    if (i > 0 && a[i] === a[i - 1]) {
      yield frame(7, { i, 'a[i]': a[i] }, viz(i, a.length, a.length), `a[i] = ${a[i]} giống a[i−1] ⇒ mọi bộ ba bắt đầu bằng ${a[i]} đã được tìm ở vòng trước. Bỏ qua để không trùng.`);
      continue;
    }
    let l = i + 1;
    let r = a.length - 1;
    while (l < r) {
      const sum = a[i] + a[l] + a[r];
      const vars = { i, l, r, 'a[i]': a[i], 'a[l]': a[l], 'a[r]': a[r], sum };
      if (sum < 0) {
        yield frame(12, vars, viz(i, l, r), `${sum} < 0 ⇒ a[l] quá nhỏ: ghép với bất kỳ phần tử nào ≤ a[r] cũng < 0. Loại hẳn l, tiến l.`);
        l++;
      } else if (sum > 0) {
        yield frame(13, vars, viz(i, l, r), `${sum} > 0 ⇒ a[r] quá lớn: ghép với bất kỳ phần tử nào ≥ a[l] cũng > 0. Loại hẳn r, lùi r.`);
        r--;
      } else {
        res.push([a[i], a[l], a[r]]);
        yield frame(15, vars, viz(i, l, r, 'done', { [res.length - 1]: 'done' }), `Tổng 0 ⇒ thêm ${fmt(res[res.length - 1])}. Sau đó nhảy qua mọi bản sao của a[l], a[r] để không sinh lại bộ ba này.`);
        while (l < r && a[l] === a[l + 1]) l++;
        while (l < r && a[r] === a[r - 1]) r--;
        l++;
        r--;
      }
    }
  }
  yield frame(23, { 'số đáp án': res.length }, composite([arr(a, { title: 'a (đã sắp xếp)' }), arr(res.map(fmt), { title: 'res' })]), 'n lần cố định i × O(n) hai con trỏ = O(n²), không Set/Map. Kết quả tự nhiên đã sắp xếp và không trùng.');
  return res;
}
