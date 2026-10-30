import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const tails: number[] = [];
  const viz = (k: number, tHl: Record<number, Highlight> = {}, ptr: { name: string; index: number }[] = []) =>
    composite([
      arr(nums, { title: 'nums', highlights: Object.fromEntries(nums.map((_, idx) => [idx, idx < k ? 'visited' : idx === k ? 'active' : undefined]).filter(([, v]) => v)) as Record<number, Highlight>, pointers: k < nums.length ? [{ name: 'x', index: k }] : [] }),
      arr(tails.length ? tails : ['∅'], { title: 'tails[k] = đuôi nhỏ nhất của dãy tăng dài k+1', highlights: tHl, pointers: ptr }),
    ]);
  yield frame(3, {}, viz(nums.length), 'tails rỗng. Bất biến: tails tăng ngặt ⇒ tìm nhị phân được. Giữ đuôi càng nhỏ càng dễ nối thêm về sau.');
  for (let k = 0; k < nums.length; k++) {
    const x = nums[k];
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      const less = tails[mid] < x;
      yield frame(10, { x, lo, hi, mid, 'tails[mid]': tails[mid] }, viz(k, { [mid]: 'compare' }, [{ name: 'lo', index: lo }, { name: 'mid', index: mid }]),
        less ? `tails[${mid}] = ${tails[mid]} < ${x} ⇒ ${x} nối được sau dãy dài ${mid + 1}, tìm vị trí bên phải.` : `tails[${mid}] = ${tails[mid]} ≥ ${x} ⇒ vị trí cần thay nằm ở ${mid} hoặc bên trái.`);
      if (less) lo = mid + 1;
      else hi = mid;
    }
    const append = lo === tails.length;
    const old = tails[lo];
    tails[lo] = x;
    yield frame(13, { x, lo, 'tails.length': tails.length }, viz(k, { [lo]: append ? 'done' : 'swap' }, [{ name: 'lo', index: lo }]),
      append ? `${x} lớn hơn mọi đuôi ⇒ nối dài: có dãy tăng dài ${tails.length}.` : `Thay tails[${lo}] = ${old} bằng ${x} nhỏ hơn: dãy dài ${lo + 1} giờ có đuôi nhỏ hơn, dễ nối hơn. Độ dài không đổi.`);
  }
  yield frame(15, { result: tails.length }, viz(nums.length, Object.fromEntries(tails.map((_, i) => [i, 'done'])) as Record<number, Highlight>), `LIS = ${tails.length}. Lưu ý: tails không nhất thiết là một dãy con thật – chỉ độ dài là đúng.`);
  return tails.length;
}
