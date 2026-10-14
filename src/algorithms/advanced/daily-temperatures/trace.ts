import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { temps: number[] }): Generator<Frame, number[]> {
  const temps = input.temps;
  const n = temps.length;
  const answer: (number | string)[] = new Array<number | string>(n).fill('·');
  const st: number[] = [];
  const viz = (i: number | undefined, hl: Record<number, Highlight> = {}, ansHl: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (const j of st) h[j] = 'compare';
    return composite([
      arr(temps, { title: 'temps (vàng = đang chờ trong stack)', highlights: { ...h, ...hl }, pointers: i !== undefined && i < n ? [{ name: 'i', index: i }] : [] }),
      stack(st.length ? st.map((j) => `${j}:${temps[j]}`) : ['rỗng'], {}, 'stack chỉ số (nhiệt độ giảm dần từ đáy lên)'),
      arr(answer, { title: 'answer[j] = số ngày chờ', highlights: ansHl }),
    ]);
  };
  yield frame(9, { n }, viz(undefined), 'Stack lưu chỉ số các ngày chưa tìm được ngày ấm hơn; nhiệt độ của chúng giảm dần từ đáy lên đỉnh (nếu không thì đã bị pop).');
  for (let i = 0; i < n; i++) {
    yield frame(10, { i, 'temps[i]': temps[i], stack: [...st] }, viz(i, { [i]: 'active' }), `Ngày ${i} (${temps[i]}°): so với đỉnh stack${st.length ? ` = ngày ${st[st.length - 1]} (${temps[st[st.length - 1]]}°)` : ' (rỗng)'}.`);
    while (st.length > 0 && temps[i] > temps[st[st.length - 1]]) {
      const j = st.pop()!;
      answer[j] = i - j;
      yield frame(13, { i, j, 'temps[j]': temps[j], 'temps[i]': temps[i], 'answer[j]': i - j }, viz(i, { [i]: 'active', [j]: 'done' }, { [j]: 'done' }), `${temps[i]}° > ${temps[j]}° ⇒ ngày ${i} là ngày ấm hơn ĐẦU TIÊN sau ngày ${j} (các ngày giữa đều ≤ ${temps[j]}°, nếu không ${j} đã bị pop sớm hơn). answer[${j}] = ${i} − ${j} = ${i - j}.`);
    }
    st.push(i);
    yield frame(15, { i, stack: [...st] }, viz(i + 1 < n ? i + 1 : undefined, { [i]: 'compare' }), `Đẩy ${i} vào stack để chờ ngày ấm hơn. Stack vẫn giảm dần vì mọi đỉnh nhỏ hơn ${temps[i]}° đã bị pop.`);
  }
  for (const j of st) answer[j] = 0;
  yield frame(17, { 'còn trong stack': [...st], answer: [...answer] }, viz(undefined, {}, Object.fromEntries(st.map((j) => [j, 'swap' as Highlight]))), `Hết mảng: ${st.length} ngày còn trong stack không có ngày ấm hơn ⇒ answer = 0. Mỗi chỉ số push/pop đúng một lần ⇒ O(n).`);
  return answer as number[];
}
