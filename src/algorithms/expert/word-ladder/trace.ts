import { composite, frame, mapViz, queue as queueViz } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';

export interface LadderInput {
  beginWord: string;
  endWord: string;
  wordList: string[];
}

const diffOne = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++;
  return diff === 1;
};

export function* trace(input: LadderInput): Generator<Frame, number> {
  const beginWord = String(input.beginWord ?? '');
  const endWord = String(input.endWord ?? '');
  const wordList = (input.wordList ?? []).map(String);
  const words = new Set(wordList);

  // ---- dựng đồ thị chỉ để vẽ (thuật toán thật không cần danh sách cạnh) ----
  const all = [...new Set([beginWord, ...wordList])];
  const edges: { from: string; to: string }[] = [];
  for (let a = 0; a < all.length; a++)
    for (let b = a + 1; b < all.length; b++) if (diffOne(all[a], all[b])) edges.push({ from: all[a], to: all[b] });
  const level = new Map<string, number>([[beginWord, 0]]);
  const q0 = [beginWord];
  for (let h = 0; h < q0.length; h++)
    for (const e of edges) {
      const o = e.from === q0[h] ? e.to : e.to === q0[h] ? e.from : null;
      if (o !== null && !level.has(o)) { level.set(o, (level.get(q0[h]) ?? 0) + 1); q0.push(o); }
    }
  const maxLv = Math.max(0, ...level.values());
  const perLv = new Map<number, number>();
  const nodes = all.map((w) => {
    const lv = level.get(w) ?? maxLv + 1;
    const k = perLv.get(lv) ?? 0;
    perLv.set(lv, k + 1);
    return { id: w, label: w, x: 60 + lv * 120, y: 50 + k * 80 };
  });

  const dist = new Map<string, number>();
  const queue: string[] = [];
  let head = 0;
  const viz = (cur: string | null, extra: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, side?: ReturnType<typeof mapViz>) => {
    const highlights: Record<string, Highlight> = {};
    for (let i = 0; i < head; i++) highlights[queue[i]] = 'visited';
    for (let i = head; i < queue.length; i++) highlights[queue[i]] = 'active';
    if (words.has(endWord) && !(endWord in highlights)) highlights[endWord] = 'done';
    if (cur !== null) highlights[cur] = cur === endWord ? 'done' : 'compare';
    Object.assign(highlights, extra);
    const g: GraphVisual = {
      kind: 'graph',
      title: `Đồ thị ngầm: cạnh = khác đúng 1 ký tự (tím = trong queue, xám = đã xử lý, xanh = ${endWord || 'đích'})`,
      nodes,
      edges,
      highlights,
      edgeHighlights: edgeHl,
      marks: Object.fromEntries([...dist].map(([w, d]) => [w, `d=${d}`])),
    };
    return composite([
      g,
      composite([
        queueViz(queue.slice(head), undefined, 'queue (BFS)'),
        side ?? mapViz(dist, cur !== null ? { [cur]: 'compare' } : undefined, 'dist: từ → độ dài chuỗi'),
      ], 'row'),
    ]);
  };

  if (!words.has(endWord)) {
    yield frame(13, { endWord }, viz(null), `"${endWord}" không có trong wordList ⇒ không bao giờ tới được (mọi từ trung gian và từ cuối phải thuộc wordList). Trả về 0 ngay.`);
    return 0;
  }
  const L = beginWord.length;
  const buckets = new Map<string, string[]>();
  for (const w of words) {
    const ps: string[] = [];
    for (let i = 0; i < L; i++) {
      const p = w.slice(0, i) + '*' + w.slice(i + 1);
      const list = buckets.get(p) ?? [];
      list.push(w);
      buckets.set(p, list);
      ps.push(p);
    }
    const bview = mapViz(Object.fromEntries([...buckets].map(([k, v]) => [k, v.join(', ')])), Object.fromEntries(ps.map((p) => [p, 'active'])), 'buckets: pattern → từ');
    yield frame(21, { w, patterns: ps }, viz(null, { [w]: 'pointer' }, {}, bview),
      `Thêm "${w}" vào ${L} bucket ${ps.join(', ')}. Hai từ chung một pattern thì khác nhau đúng ở vị trí '*' ⇒ là hàng xóm. Tiền xử lý O(n·L²) thay vì so mọi cặp O(n²·L).`);
  }

  dist.set(beginWord, 1);
  queue.push(beginWord);
  yield frame(25, { beginWord, L }, viz(null, { [beginWord]: 'active' }),
    `Bắt đầu BFS từ "${beginWord}" với dist = 1 (đếm số TỪ, không phải số bước). BFS vì mọi cạnh có trọng số 1 ⇒ lần đầu chạm tới một từ chính là đường ngắn nhất.`);

  while (head < queue.length) {
    const word = queue[head++];
    const d = dist.get(word) ?? 1;
    yield frame(28, { word, d, head }, viz(word),
      `Lấy "${word}" ra khỏi đầu queue (dist = ${d}). Queue FIFO nên các từ được xử lý theo từng tầng khoảng cách tăng dần.`);
    if (word === endWord) {
      yield frame(30, { word, result: d }, viz(word),
        `Đã tới đích "${endWord}"! Vì BFS xử lý theo tầng, đây là chuỗi ngắn nhất: ${d} từ.`);
      return d;
    }
    for (let i = 0; i < L; i++) {
      const p = word.slice(0, i) + '*' + word.slice(i + 1);
      const bucket = buckets.get(p) ?? [];
      const fresh = bucket.filter((nx) => !dist.has(nx));
      const seen = bucket.filter((nx) => dist.has(nx));
      yield frame(33, { word, i, pattern: p, bucket }, viz(word, Object.fromEntries(fresh.map((x) => [x, 'range']))),
        bucket.length === 0
          ? `Pattern "${p}": bucket rỗng hoặc đã bị xoá (đã có từ khác duyệt nó rồi) ⇒ bỏ qua, không tốn công.`
          : `Pattern "${p}" → [${bucket.join(', ')}]. ${seen.length ? `${seen.join(', ')} đã có dist ⇒ bỏ qua (đã thăm với khoảng cách ≤). ` : ''}${fresh.length ? `Từ mới: ${fresh.join(', ')}.` : 'Không có từ mới.'}`);
      for (const next of bucket) {
        if (dist.has(next)) continue;
        dist.set(next, d + 1);
        queue.push(next);
        yield frame(36, { word, next, 'dist[next]': d + 1 }, viz(word, { [next]: 'swap' }, { [`${word}->${next}`]: 'swap' }, mapViz(dist, { [next]: 'swap' }, 'dist: từ → độ dài chuỗi')),
          `Gặp "${next}" lần đầu ⇒ dist = ${d} + 1 = ${d + 1}, đẩy vào cuối queue. Đánh dấu NGAY khi đẩy (không đợi lúc lấy ra) để không đẩy trùng một từ nhiều lần.`);
      }
      buckets.delete(p);
    }
  }
  yield frame(41, { result: 0 }, viz(null),
    `Queue rỗng mà chưa chạm "${endWord}" ⇒ đích nằm ở thành phần liên thông khác với "${beginWord}". Trả về 0.`);
  return 0;
}
