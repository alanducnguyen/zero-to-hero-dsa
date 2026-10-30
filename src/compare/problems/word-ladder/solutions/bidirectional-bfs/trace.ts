import { composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { makeGraph, norm, type WLInput } from '../../shared';

export function* trace(input: WLInput): Generator<Frame, number> {
  const { beginWord, endWord, wordList } = norm(input);
  const g = makeGraph({ beginWord, endWord, wordList });
  const words = new Set(wordList);
  const fromBegin = new Set<string>([beginWord]);
  const fromEnd = new Set<string>([endWord]);
  let front = new Set([beginWord]), back = new Set([endWord]);
  let generated = 0;
  const viz = (extra: Record<string, Highlight> = {}, eh: Record<string, Highlight> = {}): VisualState => {
    const h: Record<string, Highlight> = {};
    fromBegin.forEach((w) => { h[w] = 'visited'; });
    fromEnd.forEach((w) => { h[w] = 'range'; });
    front.forEach((w) => { h[w] = 'active'; });
    back.forEach((w) => { h[w] = 'pointer'; });
    const side = (s: Set<string>) => (s.has(beginWord) || [...s].some((w) => fromBegin.has(w)) ? 'phía begin' : 'phía end');
    return composite([
      g('Hai phía BFS: tím = frontier đang mở rộng, xanh dương = frontier bên kia (xám/cyan = đã thăm phía begin/end)', { ...h, ...extra }, eh),
      mapViz({ [`front (${side(front)})`]: [...front].join(', ') || '—', [`back (${side(back)})`]: [...back].join(', ') || '—' }, undefined, 'Hai frontier'),
    ], 'row');
  };

  if (!words.has(endWord)) {
    yield frame(4, { endWord }, viz(), `"${endWord}" không có trong wordList ⇒ không thể tới đích, trả 0.`);
    return 0;
  }
  if (beginWord === endWord) {
    yield frame(5, { beginWord }, viz(), 'Từ đầu trùng từ đích ⇒ chuỗi chỉ gồm 1 từ.');
    return 1;
  }
  const letters = [...new Set(wordList.join(''))];
  words.delete(beginWord); words.delete(endWord);
  yield frame(8, { front: [...front], back: [...back], letters: letters.join('') }, viz(),
    `Hai frontier: {${beginWord}} và {${endWord}}. BFS một phía với hệ số nhánh b, độ sâu d thăm ~b^d đỉnh; hai phía mỗi bên chỉ cần ~b^(d/2). Gỡ hai từ này khỏi words = đánh dấu đã thăm.`);
  for (let len = 1; front.size > 0; len++) {
    const swap = front.size > back.size;
    if (swap) [front, back] = [back, front];
    yield frame(10, { len, front: [...front], back: [...back] }, viz(),
      swap ? `Frontier kia nhỏ hơn ⇒ đổi vai: mở rộng phía ít đỉnh hơn để số từ sinh ra là nhỏ nhất.` : `Mở rộng frontier {${[...front].join(', ')}} (nhỏ hơn hoặc bằng phía kia). len = ${len} là số từ của đường tốt nhất đang ghép.`);
    const next = new Set<string>();
    for (const w of front) {
      const found: string[] = [];
      for (let i = 0; i < w.length; i++) {
        for (const c of letters) {
          const cand = w.slice(0, i) + c + w.slice(i + 1);
          generated++;
          if (back.has(cand)) {
            yield frame(16, { w, cand, result: len + 1, generated }, viz({ [w]: 'done', [cand]: 'done' }, { [`${w}->${cand}`]: 'done' }),
              `Đổi 1 ký tự của "${w}" được "${cand}" – nằm trong frontier bên kia ⇒ hai phía gặp nhau! Mỗi vòng chỉ tăng độ dài 1 nên lần gặp đầu tiên là ngắn nhất: ${len + 1} từ.`);
            return len + 1;
          }
          if (words.has(cand)) {
            words.delete(cand); next.add(cand); found.push(cand);
            (fromBegin.has(w) ? fromBegin : fromEnd).add(cand);
          }
        }
      }
      yield frame(17, { w, found, generated }, viz({ [w]: 'compare', ...Object.fromEntries(found.map((x) => [x, 'swap' as const])) }, Object.fromEntries(found.map((x) => [`${w}->${x}`, 'swap' as const]))),
        `Sinh ${w.length}·${letters.length} biến thể của "${w}" (đổi từng vị trí sang mỗi chữ cái), tra Set O(1)${found.length ? ` ⇒ từ mới: ${found.join(', ')}` : ' ⇒ không có từ mới'}. Chi phí phụ thuộc L·|Σ| chứ không phụ thuộc n như cách so từng cặp.`);
    }
    front = next;
    yield frame(21, { len, front: [...front] }, viz(), next.size ? `Frontier mới {${[...next].join(', ')}}.` : 'Frontier mới rỗng ⇒ phía này đã cạn, hai phía không bao giờ gặp.');
  }
  yield frame(23, { result: 0, generated }, viz(), `Một phía cạn mà chưa gặp ⇒ begin và end khác thành phần liên thông, trả 0.`);
  return 0;
}
