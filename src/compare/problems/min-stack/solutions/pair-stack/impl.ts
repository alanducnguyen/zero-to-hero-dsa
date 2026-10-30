import type { Op } from '../../ops';

/** Một stack các cặp [giá trị, min từ đáy tới đây]: mỗi mức tự mang theo đáp án getMin. Mỗi thao tác O(1). */
export function minStackPairs(ops: Op[]): (number | null)[] {
  const st: [number, number][] = [];
  const out: (number | null)[] = [];
  for (const o of ops) {
    if (o.op === 'push') {
      const m = st.length ? Math.min(o.val, st[st.length - 1][1]) : o.val; // min mới = min(x, min cũ)
      st.push([o.val, m]);
      out.push(null);
    } else if (!st.length) out.push(null); // stack rỗng
    else if (o.op === 'pop') out.push(st.pop()![0]); // bỏ cả cặp ⇒ min tự khôi phục
    else if (o.op === 'top') out.push(st[st.length - 1][0]);
    else out.push(st[st.length - 1][1]);
  }
  return out;
}
