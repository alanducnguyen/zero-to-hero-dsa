import { frame } from '@/engine/helpers';
import type { Frame, Highlight, LinkedListVisual } from '@/engine/types';

export function* trace(input: { values: number[] }): Generator<Frame, number | null> {
  const vals = [...input.values];
  const n = vals.length;
  const id = (i: number | null) => (i !== null && i < n ? `n${i}` : null);
  const str = (i: number | null) => (i !== null && i < n ? `${vals[i]} (#${i})` : 'null');
  const viz = (slow: number | null, fast: number | null, hl: Record<string, Highlight> = {}, built = n): LinkedListVisual => {
    const nodes = [];
    for (let k = n - built; k < n; k++) nodes.push({ id: `n${k}`, value: vals[k], next: id(k + 1) });
    const pointers: { name: string; id: string | null }[] = [];
    if (slow !== null) pointers.push({ name: 'slow', id: id(slow) });
    if (fast !== null) pointers.push({ name: 'fast', id: id(fast) });
    return { kind: 'linkedlist', title: `Danh sách ${n} node`, nodes, order: nodes.map((x) => x.id), pointers, highlights: hl };
  };

  // Dựng danh sách từ cuối lên đầu
  for (let i = n - 1; i >= 0; i--) {
    yield frame(12, { i, 'values[i]': vals[i], head: str(i) }, viz(null, null, { [`n${i}`]: 'active' }, n - i),
      `Tạo node ${vals[i]} và cho nó trỏ tới head cũ. Dựng ngược từ cuối lên giúp mỗi node mới thành head mà không cần con trỏ tail.`);
  }
  if (n === 0) {
    yield frame(14, { head: 'null' }, viz(null, null), 'Mảng rỗng ⇒ head = null. slow và fast đều bắt đầu ở null.');
  }

  let slow: number | null = n > 0 ? 0 : null;
  let fast: number | null = n > 0 ? 0 : null;
  yield frame(15, { slow: str(slow), fast: str(fast) }, viz(slow, fast),
    'Cả slow và fast cùng xuất phát từ head. Ý tưởng: fast đi nhanh gấp đôi, nên khi fast tới cuối thì slow vừa đi được nửa đường.');
  for (;;) {
    const cont = fast !== null && fast < n && fast + 1 < n;
    yield frame(16, { slow: str(slow), fast: str(fast), 'fast.next': fast !== null && fast < n ? str(fast + 1) : '—' },
      viz(slow, fast, fast !== null && fast < n ? { [`n${fast}`]: 'compare' } : {}),
      cont
        ? 'fast và fast.next đều khác null ⇒ fast còn đủ chỗ để nhảy 2 bước, tiếp tục vòng lặp.'
        : fast === null || fast >= n
          ? 'fast đã là null (số node chẵn) ⇒ dừng. slow đang ở node giữa THỨ HAI, đúng yêu cầu đề.'
          : 'fast đang ở node cuối (fast.next = null, số node lẻ) ⇒ dừng. slow đang ở chính giữa.');
    if (!cont) break;
    slow = (slow as number) + 1;
    yield frame(17, { slow: str(slow), fast: str(fast) }, viz(slow, fast, { [`n${slow}`]: 'pointer' }),
      `slow tiến 1 bước tới ${str(slow)}. Sau k vòng, slow ở vị trí k còn fast ở 2k – bất biến này là chìa khoá.`);
    fast = (fast as number) + 2;
    yield frame(18, { slow: str(slow), fast: str(fast) }, viz(slow, fast, { [`n${slow}`]: 'pointer', ...(fast < n ? { [`n${fast}`]: 'active' } : {}) }),
      `fast nhảy 2 bước tới ${str(fast)}. Kiểm tra fast.next ở điều kiện vòng lặp trước đó đảm bảo bước nhảy này không truy cập null.next.`);
  }
  const result = slow !== null ? vals[slow] : null;
  yield frame(20, { result }, viz(slow, fast, slow !== null ? { [`n${slow}`]: 'done' } : {}),
    result === null ? 'Danh sách rỗng ⇒ trả về null.' : `Trả về ${result}. Chỉ một lần duyệt, O(1) bộ nhớ – không cần đếm độ dài trước.`);
  return result;
}
