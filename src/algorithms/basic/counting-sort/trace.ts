import { arr, composite, frame, hl, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { array: number[] }): Generator<Frame, number[]> {
  const a = input.array.map((x) => Math.max(0, Math.min(9, Math.floor(x))));
  const n = a.length;
  if (n === 0) {
    yield frame(8, { n }, arr([]), 'Mảng rỗng ⇒ trả về [].');
    return [];
  }
  const k = Math.max(...a);
  const count = new Array<number>(k + 1).fill(0);
  const out: (number | string)[] = new Array(n).fill('·');
  const viz = (aHl: Record<number, Highlight> = {}, cHl: Record<number, Highlight> = {}, oHl: Record<number, Highlight> = {}, countTitle = 'count[v] = số lần v xuất hiện', pointers: { name: string; index: number }[] = []) =>
    composite([
      arr(a, { title: 'input', highlights: aHl, pointers }),
      arr(count, { title: countTitle, highlights: cHl, mode: 'bars' }),
      arr(out, { title: 'out', highlights: oHl }),
    ]);
  yield frame(10, { k }, viz(), `Giá trị lớn nhất k = ${k} ⇒ mảng đếm count[0..${k}] toàn 0. Chỉ số của count chính là GIÁ TRỊ, không phải vị trí.`);
  for (let i = 0; i < n; i++) {
    count[a[i]]++;
    yield frame(11, { i, x: a[i], 'count[x]': count[a[i]] }, viz({ ...hlRange(0, i - 1, 'visited'), [i]: 'active' }, hl([a[i], 'swap'])), `Đếm: count[${a[i]}]++ → ${count[a[i]]}.`);
  }
  yield frame(11, { count: [...count] }, viz({}, {}, {}, 'count – tần suất'), 'Đếm xong. Nếu chỉ cần giá trị (không cần stable), có thể ghi ra ngay: với mỗi v, xuất count[v] lần giá trị v.');
  for (let v = 1; v <= k; v++) {
    count[v] += count[v - 1];
    yield frame(12, { v, 'count[v]': count[v] }, viz({}, hl([v - 1, 'compare'], [v, 'swap']), {}, 'count[v] = số phần tử ≤ v (cộng dồn)'), `Cộng dồn: count[${v}] += count[${v - 1}] → ${count[v]}. Giờ count[v] = số phần tử ≤ v = vị trí (1-based) cuối cùng mà giá trị v sẽ chiếm trong out.`);
  }
  for (let i = n - 1; i >= 0; i--) {
    const x = a[i];
    count[x]--;
    out[count[x]] = x;
    yield frame(17, { i, x, 'count[x] (vị trí)': count[x] }, viz({ ...hlRange(i + 1, n - 1, 'visited'), [i]: 'active' }, hl([x, 'compare']), hl([count[x], 'swap']), 'count[v] = vị trí trống kế tiếp của v (từ phải)', [{ name: 'i', index: i }]), `Duyệt NGƯỢC: x = a[${i}] = ${x}; count[${x}]-- → ${count[x]} là vị trí của nó trong out. Duyệt ngược để phần tử bằng nhau giữ thứ tự ban đầu (stable).`);
  }
  yield frame(19, { result: [...out] }, viz({}, {}, hlRange(0, n - 1, 'done')), `Hoàn tất O(n + k) – không có phép so sánh nào giữa các phần tử.`);
  return out as number[];
}
