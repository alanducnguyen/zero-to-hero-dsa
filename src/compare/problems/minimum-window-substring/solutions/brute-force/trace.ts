import { frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { count, view, type In } from '../../viz';

export function* trace({ s, t }: In): Generator<Frame, string> {
  if (t.length === 0) {
    yield frame(3, { t }, view(s, t, { map: {}, mapTitle: 'need' }), 't rỗng ⇒ quy ước trả "" (mọi chuỗi đều "phủ" t, đáp án ngắn nhất là chuỗi rỗng).');
    return '';
  }
  const need = count(t);
  let bestI = -1;
  let bestLen = 0;
  const best = (): [number, number] | null => (bestI < 0 ? null : [bestI, bestLen]);
  const table = (cnt: Map<string, number>) => Object.fromEntries([...need].map(([c, k]) => [c, `${cnt.get(c) ?? 0}/${k}`]));
  yield frame(5, { t }, view(s, t, { map: table(new Map()), mapTitle: 'c: đếm trong cửa sổ / cần' }),
    `need = tần suất của t. Một substring hợp lệ khi với MỌI ký tự c của t, số lần c xuất hiện ≥ need[c].`);
  for (let i = 0; i < s.length; i++) {
    const cnt = new Map<string, number>();
    yield frame(8, { i, best: bestI < 0 ? '""' : s.slice(bestI, bestI + bestLen) }, view(s, t, { lo: i, hi: i - 1, best: best(), pointers: [{ name: 'i', index: i }], map: table(cnt), mapTitle: 'c: đếm trong cửa sổ / cần' }),
      `Bắt đầu mới tại i = ${i}: bảng đếm làm lại từ đầu – công đã đếm cho i − 1 bị vứt bỏ, đây là chỗ lãng phí của brute force.`);
    for (let j = i; j < s.length; j++) {
      cnt.set(s[j], (cnt.get(s[j]) ?? 0) + 1);
      const missing = [...need].filter(([c, k]) => (cnt.get(c) ?? 0) < k).map(([c]) => c);
      const ok = missing.length === 0;
      const better = ok && (bestI < 0 || j - i + 1 < bestLen);
      if (better) [bestI, bestLen] = [i, j - i + 1];
      const mapHl: Record<string, Highlight> = Object.fromEntries([...need.keys()].map((c) => [c, missing.includes(c) ? 'swap' : 'done']));
      const pointers = [{ name: 'i', index: i }, { name: 'j', index: j }];
      yield frame(better ? 12 : 11, { i, j, window: s.slice(i, j + 1), ok }, view(s, t, { lo: i, hi: j, best: best(), hl: { [j]: 'active' }, pointers, map: table(cnt), mapHl, mapTitle: 'c: đếm trong cửa sổ / cần' }),
        better ? `"${s.slice(i, j + 1)}" phủ đủ t và ngắn hơn kỷ lục ⇒ best = "${s.slice(i, j + 1)}". Chỉ thay khi ngắn HƠN nên cửa sổ trái nhất được giữ khi hoà.`
          : ok ? `"${s.slice(i, j + 1)}" hợp lệ nhưng không ngắn hơn best (${bestLen}). Brute force vẫn kiểm tiếp các j lớn hơn dù chắc chắn chỉ dài hơn – phí công.`
            : `Thiếu ${missing.map((c) => `'${c}'`).join(', ')}. Mỗi lần kiểm phải so cả bảng ${need.size} ký tự (O(σ)) ⇒ tổng O(n²·σ).`);
    }
  }
  const res = bestI < 0 ? '' : s.slice(bestI, bestI + bestLen);
  yield frame(15, { result: res }, view(s, t, { best: best(), map: {}, mapTitle: 'Đã xét hết mọi substring' }),
    res ? `Đã thử đủ ${(s.length * (s.length + 1)) / 2} substring ⇒ "${res}" chắc chắn ngắn nhất (và trái nhất).` : 'Không substring nào phủ đủ t ⇒ trả "".');
  return res;
}
