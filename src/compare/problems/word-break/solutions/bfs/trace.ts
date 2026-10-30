import { arr, composite, frame, queue as queueViz } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';

export function* trace(input: { s: string; wordDict: string[] }): Generator<Frame, boolean> {
  const { s, wordDict } = input;
  const dict = new Set(wordDict);
  const n = s.length;
  const seen = new Array<boolean>(n + 1).fill(false);
  const queue = [0];
  seen[0] = true;
  const viz = (h: number, start?: number, end?: number, extra: Record<number, Highlight> = {}): VisualState => {
    const sh: Record<number, Highlight> = {};
    seen.forEach((v, k) => { if (v) sh[k] = 'visited'; });
    if (start !== undefined) sh[start] = 'active';
    return composite([
      arr(s.split(''), { title: 's', ranges: start !== undefined && end !== undefined ? [{ from: start, to: end - 1, label: `s[${start}..${end})`, color: 'range' }] : [] }),
      arr(seen.map((v) => (v ? '✓' : '·')), { title: 'seen[i]: chỉ số i đã vào hàng đợi (đỉnh đồ thị 0..n)', highlights: { ...sh, ...extra } }),
      queueViz(queue.slice(h), {}, 'queue: các vị trí bắt đầu chờ xét'),
    ]);
  };
  yield frame(6, { queue: [0] }, viz(0), 'Coi mỗi chỉ số 0..n là một đỉnh, có cạnh start → end khi s[start..end) là từ. Hỏi: có đường từ 0 tới n không?');
  for (let h = 0; h < queue.length; h++) {
    const start = queue[h];
    const done = start === n;
    yield frame(9, { h, start, n }, viz(h + 1, start), done ? `Lấy ra ${start} = n ⇒ tới được cuối chuỗi, trả true.` : `Lấy ra start = ${start}: s[0..${start}) chắc chắn cắt được (vì có đường tới ${start}). Thử mọi từ bắt đầu tại đây.`);
    if (done) return true;
    for (let end = start + 1; end <= n; end++) {
      const piece = s.slice(start, end);
      if (seen[end]) {
        yield frame(11, { start, end, 'seen[end]': true }, viz(h + 1, start, end, { [end]: 'muted' }), `seen[${end}] = true ⇒ bỏ qua, thậm chí không cần tra "${piece}". Đây là vai trò của memo trong BFS.`);
        continue;
      }
      const inDict = dict.has(piece);
      yield frame(11, { start, end, piece, inDict }, viz(h + 1, start, end, { [end]: inDict ? 'done' : 'compare' }), inDict ? `"${piece}" là từ ⇒ đẩy ${end} vào hàng đợi và đánh dấu ngay.` : `"${piece}" không phải từ.`);
      if (inDict) {
        seen[end] = true;
        queue.push(end);
      }
    }
  }
  yield frame(17, { seen }, viz(queue.length), `Hàng đợi rỗng mà chưa chạm n = ${n} ⇒ không có đường 0 → n ⇒ false.`);
  return false;
}
