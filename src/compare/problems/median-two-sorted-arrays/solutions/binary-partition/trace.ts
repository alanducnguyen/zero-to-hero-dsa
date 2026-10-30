import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const fmt = (x: number) => (x === Infinity ? '+∞' : x === -Infinity ? '−∞' : x);

export function* trace(input: { nums1: number[]; nums2: number[] }): Generator<Frame, number> {
  const { nums1, nums2 } = input;
  const [a, b] = nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1];
  const m = a.length, n = b.length, half = (m + n + 1) >> 1;
  let lo = 0, hi = m;
  const side = (len: number, cut: number): Record<number, Highlight> => Object.fromEntries(Array.from({ length: len }, (_, k) => [k, (k < cut ? 'range' : 'visited') as Highlight]));
  const viz = (i: number, j: number, s: Record<string, string | number>, h: Record<string, Highlight>) => composite([
    arr(a, { title: `a (mảng ngắn) – lấy ${i} phần tử vào nửa trái`, highlights: side(m, i), pointers: m ? [{ name: 'lo', index: Math.min(lo, m - 1) }, { name: 'hi', index: Math.max(0, Math.min(hi, m - 1)) }] : [] }),
    arr(b, { title: `b – lấy ${j} phần tử vào nửa trái`, highlights: side(n, j) }),
    mapViz(s, h, `Nửa trái phải có ${half} phần tử`),
  ]);
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = half - i;
    const aL = i > 0 ? a[i - 1] : -Infinity, aR = i < m ? a[i] : Infinity;
    const bL = j > 0 ? b[j - 1] : -Infinity, bR = j < n ? b[j] : Infinity;
    const s = { lo, hi, i, j, aL: fmt(aL), aR: fmt(aR), bL: fmt(bL), bR: fmt(bR) };
    yield frame(10, s, viz(i, j, s, { aL: 'compare', bR: 'compare', bL: 'compare', aR: 'compare' }), `Thử cắt a sau ${i} phần tử ⇒ b phải góp ${half} − ${i} = ${j}. Hai mảng đã sắp xếp nên aL ≤ aR, bL ≤ bR có sẵn; chỉ cần kiểm tra chéo aL ≤ bR và bL ≤ aR.`);
    if (aL > bR) {
      hi = i - 1;
      yield frame(11, { ...s, hi }, viz(i, j, s, { aL: 'swap', bR: 'swap' }), `aL = ${fmt(aL)} > bR = ${fmt(bR)}: nửa trái chứa phần tử lớn hơn một phần tử nửa phải ⇒ lấy quá nhiều từ a, thu hẹp hi = ${hi}. Loại nửa không gian tìm kiếm.`);
    } else if (bL > aR) {
      lo = i + 1;
      yield frame(12, { ...s, lo }, viz(i, j, s, { bL: 'swap', aR: 'swap' }), `bL = ${fmt(bL)} > aR = ${fmt(aR)} ⇒ lấy quá ít từ a, tăng lo = ${lo}.`);
    } else {
      const res = (m + n) % 2 ? Math.max(aL, bL) : (Math.max(aL, bL) + Math.min(aR, bR)) / 2;
      yield frame(13, { ...s, median: res }, viz(i, j, { ...s, median: res }, { median: 'done' }), `Cắt hợp lệ: mọi phần tử nửa trái ≤ mọi phần tử nửa phải. ${(m + n) % 2 ? `Tổng lẻ ⇒ trung vị = max(aL, bL) = ${res}.` : `Tổng chẵn ⇒ (max(aL, bL) + min(aR, bR)) / 2 = ${res}.`} Chỉ binary search trên mảng ngắn: O(log min(m, n)).`);
      return res;
    }
  }
  throw new Error('Input chưa được sắp xếp');
}
