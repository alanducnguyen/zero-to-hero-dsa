import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { array: number[] }): Generator<Frame, number[]> {
  const a = [...input.array];
  const n = a.length;
  const sorted = (i: number): Record<number, Highlight> => (i > 0 ? hlRange(0, i - 1, 'done') : {});
  const viz = (i: number, extra: Record<number, Highlight>, pointers: { name: string; index: number }[]) =>
    arr(a, { mode: 'bars', highlights: { ...sorted(i), ...extra }, pointers, ranges: i > 0 ? [{ from: 0, to: i - 1, label: 'đã sắp xếp', color: 'done' }] : [] });
  yield frame(8, { n }, arr(a, { mode: 'bars', highlights: n ? { 0: 'done' } : {} }), 'Phần tử đầu tiên tự nó là một dãy đã sắp xếp. Bất biến: a[0..i) luôn sắp xếp (nhưng chưa chắc là i phần tử nhỏ nhất – khác Selection Sort).');
  for (let i = 1; i < n; i++) {
    const key = a[i];
    yield frame(10, { i, key }, viz(i, { [i]: 'active' }, [{ name: 'i', index: i }]), `Lấy key = a[${i}] = ${key}. Cần chèn nó vào đúng chỗ trong a[0..${i - 1}] đã sắp xếp.`);
    let j = i - 1;
    yield frame(11, { i, key, j }, viz(i, { [i]: 'active', [j]: 'compare' }, [{ name: 'i', index: i }, { name: 'j', index: j }]), `j = ${j}: bắt đầu so sánh key với các phần tử bên trái, từ phải sang.`);
    while (j >= 0 && a[j] > key) {
      yield frame(12, { i, key, j, 'a[j]': a[j] }, viz(i, { [j]: 'compare', [j + 1]: 'active' }, [{ name: 'j', index: j }, { name: 'j+1', index: j + 1 }]), `a[${j}] = ${a[j]} > key ${key} ⇒ ${a[j]} phải đứng sau key: dịch nó sang phải một ô.`);
      a[j + 1] = a[j];
      yield frame(13, { i, key, j }, viz(i, { [j]: 'swap', [j + 1]: 'swap' }, [{ name: 'j', index: j }, { name: 'j+1', index: j + 1 }]), `Dịch: a[${j + 1}] = ${a[j]}. Ô a[${j}] tạm "trống" (còn giữ giá trị cũ, sẽ bị ghi đè). Chỉ 1 phép gán, không phải 3 như hoán đổi.`);
      j--;
    }
    if (j >= 0) yield frame(12, { i, key, j, 'a[j]': a[j] }, viz(i, { [j]: 'compare', [j + 1]: 'active' }, [{ name: 'j', index: j }]), `a[${j}] = ${a[j]} ≤ key ${key} ⇒ dừng dịch. Vị trí chèn là ${j + 1}.`);
    else yield frame(12, { i, key, j }, viz(i, { 0: 'active' }, [{ name: 'j+1', index: 0 }]), `j = -1: key nhỏ hơn mọi phần tử bên trái ⇒ chèn vào đầu mảng.`);
    a[j + 1] = key;
    yield frame(16, { i, key, 'j+1': j + 1 }, viz(i + 1, { [j + 1]: 'swap' }, [{ name: 'j+1', index: j + 1 }]), `a[${j + 1}] = ${key}. Phần đã sắp xếp giờ dài ${i + 1}.`);
  }
  yield frame(18, { result: a }, arr(a, { mode: 'bars', highlights: hlRange(0, n - 1, 'done') }), 'Hoàn tất. Với mảng gần sắp xếp, vòng while hầu như không chạy ⇒ gần O(n).');
  return a;
}
