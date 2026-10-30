import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = [...input.nums];
  const n = nums.length;
  const R = 110;
  const nodes = nums.map((_, i) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { id: String(i), label: String(i), x: Math.round(140 + R * Math.cos(ang)), y: Math.round(130 + R * Math.sin(ang)) };
  });
  const edges = nums.map((v, i) => ({ from: String(i), to: String(v), directed: true }));
  const visited = new Set<number>([0]);

  const viz = (slow: number, fast: number, opts: { done?: number; moved?: [number, number][] } = {}) => {
    const highlights: Record<string, Highlight> = {};
    for (const v of visited) highlights[String(v)] = 'visited';
    highlights[String(fast)] = 'active';
    highlights[String(slow)] = slow === fast ? 'compare' : 'pointer';
    if (opts.done !== undefined) highlights[String(opts.done)] = 'done';
    const edgeHighlights: Record<string, Highlight> = {};
    for (const [a, b] of opts.moved ?? []) edgeHighlights[`${a}->${b}`] = 'range';
    const g: GraphVisual = {
      kind: 'graph',
      title: 'Đồ thị i → nums[i] (xanh dương = slow, tím = fast, vàng = trùng vị trí, xám = đã đi qua)',
      nodes,
      edges,
      highlights,
      edgeHighlights,
    };
    const arrHl: Record<number, Highlight> = { [fast]: 'active', [slow]: slow === fast ? 'compare' : 'pointer' };
    if (opts.done !== undefined) arrHl[opts.done] = 'done';
    return composite([
      arr(nums, { title: 'nums (chỉ số = node, giá trị = node kế tiếp)', mode: 'cells', highlights: arrHl, pointers: [{ name: 'slow', index: slow }, { name: 'fast', index: fast }] }),
      g,
    ]);
  };

  let slow = nums[0];
  yield frame(12, { slow }, viz(slow, slow),
    `Coi mảng là "danh sách liên kết ngầm": node i trỏ tới nums[i]. Có ${n} chỉ số nhưng giá trị chỉ nằm trong [1, ${n - 1}] ⇒ theo nguyên lý chuồng bồ câu, đi từ node 0 chắc chắn lặp lại node ⇒ có chu trình. slow bắt đầu tại nums[0] = ${slow}.`);
  let fast = nums[0];
  visited.add(slow);
  yield frame(13, { slow, fast }, viz(slow, fast),
    'fast cũng bắt đầu tại nums[0]. Không có node nào trỏ về 0 (giá trị ≥ 1) nên 0 nằm ngoài chu trình – đó là "đuôi" dẫn vào chu trình.');
  let steps = 0;
  do {
    const s0 = slow, f0 = fast, f1 = nums[fast];
    slow = nums[slow];
    visited.add(slow);
    yield frame(15, { slow, fast, steps: steps + 1 }, viz(slow, fast, { moved: [[s0, slow]] }),
      `slow (rùa) đi 1 bước: ${s0} → ${slow}.`);
    fast = nums[nums[fast]];
    visited.add(f1);
    visited.add(fast);
    steps++;
    yield frame(16, { slow, fast, steps }, viz(slow, fast, { moved: [[f0, f1], [f1, fast]] }),
      `fast (thỏ) đi 2 bước: ${f0} → ${f1} → ${fast}. Mỗi vòng khoảng cách thỏ "đuổi" rùa trong chu trình giảm 1 ⇒ không thể nhảy qua nhau, chắc chắn gặp.`);
    yield frame(17, { slow, fast, steps }, viz(slow, fast),
      slow === fast
        ? `slow = fast = ${slow} sau ${steps} vòng ⇒ đã gặp trong chu trình. Điểm gặp KHÔNG nhất thiết là số trùng – cần giai đoạn 2.`
        : `slow = ${slow} ≠ fast = ${fast} ⇒ tiếp tục.`);
  } while (slow !== fast);

  const meet = fast;
  slow = nums[0];
  yield frame(20, { slow, fast, meet }, viz(slow, fast),
    `Giai đoạn 2: đưa slow về đầu (nums[0] = ${slow}), fast ở điểm gặp ${meet}. Gọi a = độ dài đuôi tới điểm vào, b = từ điểm vào tới điểm gặp, c = độ dài chu trình. Khi gặp: fast đã đi gấp đôi slow ⇒ 2(a+b) = a+b+k·c ⇒ a = k·c − b. Nghĩa là đi thêm a bước từ điểm gặp cũng đến đúng điểm vào chu trình.`);
  while (slow !== fast) {
    yield frame(21, { slow, fast }, viz(slow, fast), `slow = ${slow} ≠ fast = ${fast} ⇒ chưa tới điểm vào, cùng đi 1 bước.`);
    const s0 = slow, f0 = fast;
    slow = nums[slow];
    yield frame(22, { slow, fast }, viz(slow, fast, { moved: [[s0, slow]] }), `slow: ${s0} → ${slow} (đi dọc đuôi).`);
    fast = nums[fast];
    yield frame(23, { slow, fast }, viz(slow, fast, { moved: [[f0, fast]] }),
      `fast: ${f0} → ${fast} (đi vòng trong chu trình). Cùng tốc độ nên cả hai sẽ tới điểm vào cùng lúc, sau đúng a bước.`);
  }
  yield frame(21, { slow, fast }, viz(slow, fast), `slow = fast = ${slow} ⇒ dừng vòng lặp.`);
  yield frame(25, { result: slow }, viz(slow, fast, { done: slow }),
    `Điểm vào chu trình là ${slow}: node có HAI mũi tên trỏ vào (một từ đuôi, một từ trong chu trình) ⇒ có hai chỉ số i với nums[i] = ${slow} ⇒ ${slow} là số trùng. O(n) thời gian, O(1) bộ nhớ, mảng không bị sửa.`);
  return slow;
}
