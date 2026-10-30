import { composite, frame, mapViz, queue as queueViz } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { adj, makeGraph, norm, type WLInput } from '../../shared';

export function* trace(input: WLInput): Generator<Frame, number> {
  const { beginWord, endWord, wordList } = norm(input);
  const g = makeGraph({ beginWord, endWord, wordList });
  const dist = new Map<string, number>();
  const queue: string[] = [];
  let head = 0;
  let compares = 0;
  const viz = (cur: string | null, extra: Record<string, Highlight> = {}, eh: Record<string, Highlight> = {}): VisualState => {
    const h: Record<string, Highlight> = {};
    for (let i = 0; i < head; i++) h[queue[i]] = 'visited';
    for (let i = head; i < queue.length; i++) h[queue[i]] = 'active';
    if (wordList.includes(endWord) && !(endWord in h)) h[endWord] = 'done';
    if (cur !== null) h[cur] = 'pointer';
    return composite([
      g('BFS theo tầng (tím = trong queue, xám = đã xử lý)', { ...h, ...extra }, eh, Object.fromEntries([...dist].map(([w, d]) => [w, `d=${d}`]))),
      composite([queueViz(queue.slice(head), undefined, 'queue'), mapViz(dist, undefined, 'dist: từ → độ dài chuỗi')], 'column'),
    ], 'row');
  };

  if (!wordList.includes(endWord)) {
    yield frame(3, { endWord }, viz(null), `"${endWord}" không có trong wordList ⇒ không thể tới đích, trả 0.`);
    return 0;
  }
  dist.set(beginWord, 1);
  queue.push(beginWord);
  yield frame(6, { beginWord }, viz(null), `BFS từ "${beginWord}" với dist = 1 (đếm số TỪ). Mọi cạnh trọng số 1 ⇒ lần đầu chạm một từ là qua đường ngắn nhất – khác hẳn DFS phải thử hết.`);
  while (head < queue.length) {
    const word = queue[head++];
    const d = dist.get(word)!;
    if (word === endWord) {
      yield frame(9, { word, result: d, compares }, viz(word, { [word]: 'done' }), `Lấy ra "${endWord}" ⇒ dừng: BFS xử lý theo tầng nên ${d} là ngắn nhất. Đã so ${compares} cặp từ.`);
      return d;
    }
    yield frame(8, { word, d, compares }, viz(word), `Lấy "${word}" (dist = ${d}) khỏi đầu queue. Để tìm hàng xóm, cách này so "${word}" với cả ${wordList.length} từ trong list.`);
    const found: string[] = [];
    for (const next of wordList) {
      if (dist.has(next)) continue;
      compares++;
      if (!adj(word, next)) continue;
      dist.set(next, d + 1);
      queue.push(next);
      found.push(next);
      yield frame(12, { word, next, 'dist[next]': d + 1, compares }, viz(word, { [next]: 'swap' }, { [`${word}->${next}`]: 'swap' }),
        `"${next}" khác "${word}" đúng 1 ký tự và chưa thăm ⇒ dist = ${d + 1}, vào cuối queue. Đánh dấu ngay khi đẩy để không đẩy trùng.`);
    }
    if (!found.length)
      yield frame(11, { word, compares }, viz(word), `So xong "${word}" với các từ chưa thăm, không có hàng xóm mới. Mỗi lần so tốn O(L) ⇒ cả thuật toán O(n²·L): n = 5000 là ~25 triệu cặp.`);
  }
  yield frame(16, { result: 0, compares }, viz(null), `Queue rỗng mà chưa gặp "${endWord}" ⇒ khác thành phần liên thông, trả 0.`);
  return 0;
}
