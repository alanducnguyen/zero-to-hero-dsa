import { composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { adj, makeGraph, norm, type WLInput } from '../../shared';

export function* trace(input: WLInput): Generator<Frame, number> {
  const { beginWord, endWord, wordList } = norm(input);
  const g = makeGraph({ beginWord, endWord, wordList });
  const path: string[] = [beginWord];
  const onPath = new Set<string>([beginWord]);
  let best = Infinity;
  let calls = 0;
  const viz = (extra: Record<string, Highlight> = {}, eh: Record<string, Highlight> = {}): VisualState => {
    const h: Record<string, Highlight> = {};
    path.forEach((w) => { h[w] = 'visited'; });
    if (wordList.includes(endWord) && !(endWord in h)) h[endWord] = 'done';
    h[path[path.length - 1]] = 'active';
    for (let k = 1; k < path.length; k++) eh[`${path[k - 1]}->${path[k]}`] ??= 'active';
    return composite([
      g('Đường đi hiện tại (tím/xám) – DFS thử từng đường một', { ...h, ...extra }, eh),
      stack(path.map((w, k) => `dfs(${w}, ${k + 1})`), undefined, 'Stack đệ quy = đường đi hiện tại'),
    ], 'row');
  };
  const vars = (word: string, len: number) => ({ word, len, best: best === Infinity ? '∞' : best, calls });

  if (!wordList.includes(endWord)) {
    yield frame(3, { endWord }, viz(), `"${endWord}" không có trong wordList ⇒ không thể tới đích. Trả 0 ngay, khỏi duyệt.`);
    return 0;
  }

  function* dfs(word: string, len: number): Generator<Frame, void> {
    calls++;
    if (len >= best) {
      yield frame(8, vars(word, len), viz({ [word]: 'muted' }), `Đường hiện tại đã dài ${len} ≥ best = ${best} ⇒ cắt nhánh: đi tiếp chỉ dài hơn. Không có cắt nhánh này DFS còn bùng nổ nhanh hơn.`);
      return;
    }
    if (word === endWord) {
      best = len;
      yield frame(9, vars(word, len), viz({ [word]: 'done' }), `Tới đích qua ${path.join(' → ')} (${len} từ) ⇒ best = ${len}. Nhưng DFS KHÔNG biết đây có phải ngắn nhất – vẫn phải quay lui thử các đường còn lại.`);
      return;
    }
    yield frame(10, vars(word, len), viz(), `Đang ở "${word}" (đường dài ${len}). Duyệt mọi từ trong list để tìm từ khác đúng 1 ký tự và chưa nằm trên đường đi.`);
    for (const next of wordList) {
      if (onPath.has(next) || !adj(word, next)) continue;
      onPath.add(next);
      path.push(next);
      yield frame(12, vars(word, len), viz({ [next]: 'compare' }, { [`${word}->${next}`]: 'compare' }), `"${word}" → "${next}" khác đúng 1 ký tự ⇒ đặt "${next}" lên đường đi và đệ quy. onPath ngăn đi vòng, chứ KHÔNG ngăn thăm lại "${next}" từ đường khác ⇒ số đường có thể là hàm mũ.`);
      yield* dfs(next, len + 1);
      path.pop();
      onPath.delete(next);
      yield frame(14, vars(word, len), viz({ [next]: 'muted' }), `Quay lui: gỡ "${next}" khỏi đường đi để các nhánh khác còn dùng được nó. Đây là chỗ DFS lặp lại công việc mà BFS tránh được.`);
    }
  }

  yield* dfs(beginWord, 1);
  const res = best === Infinity ? 0 : best;
  yield frame(18, { result: res, calls }, viz(), res ? `Đã thử hết mọi đường: ngắn nhất ${res} từ, tốn ${calls} lời gọi dfs. Với n lớn số đường đi đơn tăng theo hàm mũ.` : `Thử hết mọi đường (${calls} lời gọi) mà không tới "${endWord}" ⇒ trả 0.`);
  return res;
}
