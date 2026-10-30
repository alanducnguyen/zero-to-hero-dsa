import { arr, composite, frame, hl, stack as stackViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, boolean> {
  const chars = [...input.s];
  const pair: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack: string[] = [];
  const viz = (i: number, h: Highlight = 'active', stackHl?: Record<number, Highlight>) =>
    composite([
      arr(chars.length ? chars : ['∅'], { title: 'Chuỗi s', highlights: i >= 0 ? hl([i, h]) : {}, pointers: i >= 0 ? [{ name: 'ch', index: i }] : [] }),
      stackViz(stack, stackHl, 'Stack ngoặc mở'),
    ]);
  yield frame(3, { pair }, viz(-1), 'Map ngoặc đóng → ngoặc mở tương ứng: tra O(1) và thêm loại ngoặc mới chỉ cần thêm một dòng.');
  yield frame(4, { stack }, viz(-1), 'Stack lưu các ngoặc mở chưa đóng; đỉnh là ngoặc mở GẦN NHẤT – chính là ngoặc mà ngoặc đóng tiếp theo phải khớp.');
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    yield frame(5, { i, ch, stack }, viz(i), `Xét '${ch}'. Mỗi ký tự chỉ được xử lý đúng một lần ⇒ O(n).`);
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
      yield frame(7, { i, ch, stack }, viz(i, 'pointer', hl([stack.length - 1, 'swap'])), `'${ch}' là ngoặc mở ⇒ push, chờ ngoặc đóng cùng loại.`);
    } else {
      if (stack.length === 0) {
        yield frame(9, { i, ch, stack, result: false }, viz(i, 'swap'), `Ngoặc đóng '${ch}' mà stack rỗng ⇒ không có gì để khớp ⇒ sai ngay, không cần đọc tiếp.`);
        return false;
      }
      const top = stack.pop();
      if (top !== pair[ch]) {
        yield frame(10, { i, ch, top, expected: pair[ch], result: false }, viz(i, 'swap'), `'${ch}' cần '${pair[ch]}' nhưng ngoặc mở gần nhất là '${top}' ⇒ lồng sai kiểu "([)]" ⇒ không hợp lệ.`);
        return false;
      }
      yield frame(10, { i, ch, top, stack }, viz(i, 'done'), `Pop '${top}' khớp với '${ch}' ⇒ cặp này đóng xong, đỉnh mới là ngoặc mở bao ngoài.`);
    }
  }
  const ok = stack.length === 0;
  yield frame(13, { stack, result: ok }, viz(-1, 'active', ok ? {} : Object.fromEntries(stack.map((_, k) => [k, 'swap' as Highlight]))),
    ok ? 'Hết chuỗi và stack rỗng ⇒ mọi ngoặc mở đều đã đóng ⇒ hợp lệ.' : `Hết chuỗi nhưng còn ${stack.length} ngoặc mở chưa đóng ⇒ không hợp lệ.`);
  return ok;
}
