import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number[][]> {
  const a = [...input.nums].sort((x, y) => x - y);
  const n = a.length;
  const result: number[][] = [];

  const viz = (i: number, l: number, r: number, extra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let x = 0; x < i && x < n; x++) h[x] = 'muted';
    if (i >= 0 && i < n) h[i] = 'active';
    const ps: Pointer[] = [];
    if (i >= 0 && i < n) ps.push({ name: 'i', index: i });
    if (l >= 0 && l < n) ps.push({ name: 'l', index: l });
    if (r >= 0 && r < n) ps.push({ name: 'r', index: r });
    return arr(a, {
      title: `nums (đã sắp xếp) – tìm được ${result.length} bộ ba`,
      highlights: { ...h, ...extra },
      pointers: ps,
      ranges: l >= 0 && l < r ? [{ from: l, to: r, label: 'vùng two pointers', color: 'range' }] : [],
    });
  };
  const res = () => result.map((t) => `[${t.join(',')}]`).join(' ');

  yield frame(8, { n }, viz(-1, -1, -1), 'Sắp xếp trước: (1) để dùng two pointers – tổng tăng khi l tiến, giảm khi r lùi; (2) các giá trị trùng đứng cạnh nhau nên bỏ trùng chỉ cần so với phần tử kề.');
  yield frame(10, { n, result: res() }, viz(-1, -1, -1), 'result rỗng. Ý tưởng: cố định phần tử nhỏ nhất a[i], bài toán còn lại là Two Sum II với target = −a[i] trên đoạn (i, n−1].');
  for (let i = 0; i < n - 2; i++) {
    yield frame(11, { i, 'a[i]': a[i], result: res() }, viz(i, -1, -1), `Cố định i = ${i}, a[i] = ${a[i]}. Chỉ cần i < n − 2 vì còn phải chừa chỗ cho l và r.`);
    if (a[i] > 0) {
      yield frame(12, { i, 'a[i]': a[i] }, viz(i, -1, -1, { [i]: 'swap' }), `a[i] = ${a[i]} > 0: mảng đã sắp xếp nên mọi phần tử sau cũng > 0 ⇒ tổng ba số luôn dương ⇒ dừng sớm.`);
      break;
    }
    if (i > 0 && a[i] === a[i - 1]) {
      yield frame(13, { i, 'a[i]': a[i], 'a[i-1]': a[i - 1] }, viz(i, -1, -1, { [i]: 'visited', [i - 1]: 'compare' }), `a[i] = a[i−1] = ${a[i]}: mọi bộ ba bắt đầu bằng ${a[i]} đã được tìm ở vòng trước (vòng trước còn có vùng tìm kiếm rộng hơn) ⇒ bỏ qua để không sinh bộ trùng.`);
      continue;
    }
    let l = i + 1;
    let r = n - 1;
    yield frame(15, { i, l, r, 'a[i]': a[i], target: -a[i] }, viz(i, l, r), `l = ${l}, r = ${r}: hai đầu của phần còn lại. Cần a[l] + a[r] = ${-a[i]}.`);
    while (l < r) {
      const sum = a[i] + a[l] + a[r];
      yield frame(17, { i, l, r, 'a[i]': a[i], 'a[l]': a[l], 'a[r]': a[r], sum }, viz(i, l, r, { [l]: 'compare', [r]: 'compare' }), `sum = ${a[i]} + ${a[l]} + ${a[r]} = ${sum}.`);
      if (sum === 0) {
        result.push([a[i], a[l], a[r]]);
        yield frame(19, { i, l, r, sum, result: res() }, viz(i, l, r, { [i]: 'done', [l]: 'done', [r]: 'done' }), `Tổng = 0 ⇒ ghi nhận [${a[i]}, ${a[l]}, ${a[r]}].`);
        while (l < r && a[l] === a[l + 1]) {
          l++;
          yield frame(20, { i, l, r, 'a[l]': a[l] }, viz(i, l, r, { [l]: 'visited' }), `a[l] trùng giá trị vừa dùng (${a[l]}) ⇒ tiến l; nếu không sẽ sinh lại đúng bộ ba vừa tìm.`);
        }
        while (l < r && a[r] === a[r - 1]) {
          r--;
          yield frame(21, { i, l, r, 'a[r]': a[r] }, viz(i, l, r, { [r]: 'visited' }), `a[r] trùng giá trị vừa dùng (${a[r]}) ⇒ lùi r vì cùng lý do.`);
        }
        l++;
        r--;
        yield frame(23, { i, l, r, result: res() }, viz(i, l, r), 'Thu hẹp cả hai đầu: giữ a[l] mà đổi a[r] (hoặc ngược lại) không thể vẫn cho tổng 0 vì giá trị đã khác.');
      } else if (sum < 0) {
        l++;
        yield frame(25, { i, l, r, sum }, viz(i, l, r, { [l - 1]: 'swap' }), `sum < 0: với a[l] cũ, kể cả cặp với a[r] lớn nhất vẫn quá nhỏ ⇒ a[l] cũ không thuộc bộ nào ⇒ loại, l++.`);
      } else {
        r--;
        yield frame(27, { i, l, r, sum }, viz(i, l, r, { [r + 1]: 'swap' }), `sum > 0: với a[r] cũ, kể cả cặp với a[l] nhỏ nhất vẫn quá lớn ⇒ loại a[r] cũ, r--.`);
      }
    }
  }
  yield frame(31, { result: res() }, viz(-1, -1, -1, Object.fromEntries(a.map((_, x) => [x, 'done' as Highlight]))), `Xong: ${result.length} bộ ba. O(n log n) sắp xếp + O(n²) cho n vòng two pointers ⇒ O(n²).`);
  return result;
}
