import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string; wordDict: string[] }): Generator<Frame, boolean> {
  const s = input.s;
  const wordDict = input.wordDict;
  const dict = new Set(wordDict);
  const maxLen = Math.max(0, ...wordDict.map((w) => w.length));
  const n = s.length;
  const dp: boolean[] = new Array<boolean>(n + 1).fill(false);
  const chars = s.split('');
  const dictViz = (hl: Record<string, Highlight> = {}) => mapViz(Object.fromEntries(wordDict.map((w, k) => [w, k])), hl, 'dict (Set) – từ → thứ tự');
  const dpViz = (hl: Record<number, Highlight> = {}) => {
    const base: Record<number, Highlight> = {};
    dp.forEach((v, k) => { if (v) base[k] = 'done'; });
    return arr(dp.map((v) => (v ? 'T' : 'F')), { title: 'dp[i]: s[0..i) cắt được? (xanh = true)', highlights: { ...base, ...hl } });
  };
  const viz = (j?: number, i?: number, dpHl: Record<number, Highlight> = {}, dictHl: Record<string, Highlight> = {}) =>
    composite([
      arr(chars, {
        title: 's',
        ranges: j !== undefined && i !== undefined ? [{ from: j, to: i - 1, label: `s[${j}..${i})`, color: 'range' }] : [],
        pointers: i !== undefined ? [{ name: 'i', index: Math.min(i, n - 1) }] : [],
      }),
      dpViz(dpHl),
      dictViz(dictHl),
    ]);

  yield frame(6, { dict: [...dict], maxLen }, viz(), `Đưa từ điển vào Set để kiểm tra O(1). Từ dài nhất ${maxLen} ký tự ⇒ chỉ cần nhìn lại tối đa ${maxLen} vị trí.`);
  dp[0] = true;
  yield frame(10, { 'dp[0]': true, n }, viz(undefined, undefined, { 0: 'active' }), 'Cơ sở: chuỗi rỗng luôn cắt được (không cần từ nào).');
  for (let i = 1; i <= n; i++) {
    yield frame(11, { i, 'dp[i]': dp[i] }, viz(undefined, i, { [i]: 'active' }), `Xét tiền tố s[0..${i}) = "${s.slice(0, i)}": có cách cắt nào kết thúc đúng tại ${i} không?`);
    for (let j = i - 1; j >= Math.max(0, i - maxLen); j--) {
      const piece = s.slice(j, i);
      const inDict = dict.has(piece);
      yield frame(13, { i, j, 'dp[j]': dp[j], 'piece': piece, inDict }, viz(j, i, { [i]: 'active', [j]: dp[j] ? 'compare' : 'swap' }, inDict ? { [piece]: 'compare' } : {}),
        `Thử từ cuối s[${j}..${i}) = "${piece}": dp[${j}] = ${dp[j]}, trong dict = ${inDict}.` + (!dp[j] ? ' Tiền tố trước không cắt được ⇒ bỏ.' : inDict ? ' Cả hai đúng!' : ' Không phải từ ⇒ thử j nhỏ hơn.'));
      if (dp[j] && inDict) {
        dp[i] = true;
        yield frame(14, { i, j, piece, 'dp[i]': true }, viz(j, i, { [i]: 'done', [j]: 'done' }, { [piece]: 'done' }), `dp[${i}] = true: "${s.slice(0, j)}" cắt được + từ "${piece}". Break – chỉ cần một cách.`);
        break;
      }
    }
    if (!dp[i]) yield frame(17, { i, 'dp[i]': false }, viz(undefined, i, { [i]: 'swap' }), `Không có j nào thoả ⇒ dp[${i}] = false: không cách nào cắt "${s.slice(0, i)}".`);
  }
  yield frame(19, { 'dp[n]': dp[n] }, viz(undefined, undefined, { [n]: dp[n] ? 'done' : 'swap' }), dp[n] ? `dp[${n}] = true ⇒ "${s}" cắt được thành các từ trong dict.` : `dp[${n}] = false ⇒ "${s}" không cắt được.`);
  return dp[n];
}
