import { arr, composite, frame, hlRange, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { words: string[] }): Generator<Frame, string[][]> {
  const words = input.words;
  const groups = new Map<string, string[]>();
  const viz = (i: number, extra: Record<number, Highlight> = {}, mHl?: Record<string, Highlight>) =>
    composite([arr(words.length ? words : ['∅'], { title: 'words', highlights: { ...hlRange(0, i - 1, 'visited'), ...extra } }), mapViz(Object.fromEntries([...groups].map(([k, v]) => [k, v.join(', ')])), mHl, 'groups: khoá (chuỗi sắp xếp) → nhóm')]);
  yield frame(6, {}, viz(0), 'Map rỗng. Khoá chuẩn: sắp xếp ký tự của từ – hai từ là anagram ⇔ cùng khoá.');
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const key = [...w].sort().join('');
    yield frame(8, { w, key }, viz(i, { [i]: 'active' }, groups.has(key) ? { [key]: 'compare' } : undefined), `"${w}" → khoá "${key}" (O(L log L)). ${groups.has(key) ? 'Khoá đã có ⇒ thêm vào nhóm.' : 'Khoá mới ⇒ tạo nhóm.'}`);
    const list = groups.get(key);
    if (list) list.push(w); else groups.set(key, [w]);
    yield frame(list ? 10 : 11, { w, key, 'nhóm': groups.get(key) }, viz(i + 1, {}, { [key]: 'swap' }), `groups["${key}"] = [${groups.get(key)!.join(', ')}].`);
  }
  const result = [...groups.values()];
  yield frame(13, { groups: result.length }, viz(words.length, {}, Object.fromEntries([...groups.keys()].map((k) => [k, 'done' as Highlight]))), `${result.length} nhóm. Tổng O(N · L log L); dùng khoá đếm 26 ký tự thì O(N · L).`);
  return result;
}
