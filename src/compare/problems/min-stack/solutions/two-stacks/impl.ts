import type { Op } from '../../ops';

/** Hai stack: mins chỉ nhận x khi x ≤ min hiện tại ⇒ đỉnh mins luôn là min. Mỗi thao tác O(1). */
export function minStackTwo(ops: Op[]): (number | null)[] {
  const data: number[] = [];
  const mins: number[] = []; // dãy không tăng các "kỷ lục" min, đáy → đỉnh
  const out: (number | null)[] = [];
  for (const o of ops) {
    if (o.op === 'push') {
      data.push(o.val);
      if (!mins.length || o.val <= mins[mins.length - 1]) mins.push(o.val); // ≤ để giữ min trùng lặp
      out.push(null);
    } else if (!data.length) out.push(null); // stack rỗng
    else if (o.op === 'pop') {
      const x = data.pop()!;
      if (x === mins[mins.length - 1]) mins.pop(); // min hiện tại rời stack ⇒ lộ ra min cũ
      out.push(x);
    } else if (o.op === 'top') out.push(data[data.length - 1]);
    else out.push(mins[mins.length - 1]);
  }
  return out;
}
