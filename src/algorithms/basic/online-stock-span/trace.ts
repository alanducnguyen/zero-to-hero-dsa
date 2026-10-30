import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { prices: number[] }): Generator<Frame, number[]> {
  const prices = input.prices;
  const n = prices.length;
  // mỗi phần tử stack: [giá, span, chỉ số ngày] – chỉ số chỉ để vẽ, impl không cần
  const st: [number, number, number][] = [];
  const spans: number[] = [];
  const stackItems = () => (st.length ? st.map(([p, s, d]) => `ngày ${d}: ${p} (span ${s})`) : ['rỗng']);
  const viz = (i: number | undefined, hl: Record<number, Highlight> = {}, range?: { from: number; to: number; label: string }, stHl: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (const [, , d] of st) h[d] = 'compare';
    return composite([
      arr(prices, {
        title: 'prices (vàng = đại diện còn trong stack)',
        highlights: { ...h, ...hl },
        pointers: i !== undefined && i < n ? [{ name: 'i', index: i }] : [],
        ranges: range ? [{ ...range, color: 'range' as Highlight }] : [],
      }),
      stack(stackItems(), stHl, 'stack [giá, span] – giá giảm nghiêm ngặt từ đáy lên'),
      arr(spans.length ? spans : ['·'], { title: 'spans', highlights: spans.length ? { [spans.length - 1]: 'done' } : {} }),
    ]);
  };

  yield frame(9, { n }, viz(undefined), 'Stack lưu cặp [giá, span]: mỗi phần tử đại diện cho một KHỐI ngày liền nhau có giá ≤ giá của nó. Nhờ vậy không cần lùi từng ngày.');
  for (let i = 0; i < n; i++) {
    const price = prices[i];
    let span = 1;
    const top = st[st.length - 1];
    yield frame(12, { i, price, span, 'đỉnh stack': top ? [top[0], top[1]] : null }, viz(i, { [i]: 'active' }, undefined, top ? { [st.length - 1]: 'active' } : {}),
      `Ngày ${i}, giá ${price}: span bắt đầu = 1 (chính hôm nay). ${top ? `So với đỉnh stack giá ${top[0]}.` : 'Stack rỗng ⇒ không có ngày nào trước để gộp.'}`);
    while (st.length > 0 && st[st.length - 1][0] <= price) {
      const [p, s] = st.pop()!;
      span += s;
      yield frame(14, { i, price, 'pop [giá, span]': [p, s], span }, viz(i, { [i]: 'active' }, { from: i - span + 1, to: i, label: `span ${span}` }),
        `${p} ≤ ${price} ⇒ pop và cộng span ${s} của nó: cả khối ${s} ngày đó đều ≤ ${p} ≤ ${price}. Từ nay chúng không bao giờ là "chặn" cho ngày tương lai vì ngày ${i} cao hơn và gần hơn.`);
    }
    st.push([price, span, i]);
    const below = st.length > 1 ? st[st.length - 2] : undefined;
    yield frame(16, { i, price, span, stack: st.map(([p, s]) => [p, s]) }, viz(i, { [i]: 'active' }, span > 1 ? { from: i - span + 1, to: i, label: `span ${span}` } : undefined, { [st.length - 1]: 'swap' }),
      `Push [${price}, ${span}]. ${below ? `Đỉnh dưới có giá ${below[0]} > ${price} nên dừng: đó là ngày đầu tiên đắt hơn khi nhìn lùi.` : 'Không còn ngày nào đắt hơn phía trước ⇒ span kéo về tận đầu.'} Stack vẫn giảm nghiêm ngặt.`);
    spans.push(span);
    yield frame(17, { i, span, spans: [...spans] }, viz(i + 1 < n ? i + 1 : undefined, {}, undefined),
      `Trả span = ${span} cho ngày ${i} ngay lập tức (online) – không cần biết giá tương lai.`);
  }
  yield frame(19, { spans: [...spans] }, viz(undefined), `Xong ${n} ngày. Mỗi ngày được push đúng 1 lần và pop tối đa 1 lần ⇒ tổng O(n), mỗi lần next O(1) amortized.`);
  return spans;
}
