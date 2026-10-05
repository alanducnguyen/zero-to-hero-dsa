import { arr, composite, frame, hl, stack as stackViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, boolean> {
  const s = input.s;
  const chars = [...s];
  const pair: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack: string[] = [];
  const viz = (i: number, h: Highlight = 'active', stackHl?: Record<number, Highlight>) =>
    composite([
      arr(chars, { title: 'Chuỗi s', highlights: i >= 0 ? hl([i, h]) : {}, pointers: i >= 0 ? [{ name: 'ch', index: i }] : [] }),
      stackViz(stack, stackHl, 'Stack ngoặc mở'),
    ], 'column');
  yield frame(9, { s, stack }, viz(-1), 'Khởi tạo stack rỗng. Stack lưu các ngoặc mở chưa được đóng, đỉnh stack là ngoặc mở gần nhất.');
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    yield frame(10, { i, ch, stack }, viz(i), `Xét ký tự thứ ${i}: '${ch}'.`);
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
      yield frame(12, { i, ch, stack }, viz(i, 'pointer', hl([stack.length - 1, 'swap'])), `'${ch}' là ngoặc mở ⇒ push vào stack. Nó đang "chờ" một ngoặc đóng cùng loại.`);
    } else {
      if (stack.length === 0) {
        yield frame(14, { i, ch, stack, result: false }, viz(i, 'swap'), `Gặp ngoặc đóng '${ch}' nhưng stack rỗng ⇒ không có ngoặc mở nào để khớp ⇒ chuỗi không hợp lệ.`);
        return false;
      }
      const top = stack.pop();
      yield frame(15, { i, ch, top, stack }, viz(i, 'compare'), `Pop đỉnh stack: top = '${top}'. Ngoặc đóng phải khớp với ngoặc mở GẦN NHẤT (LIFO).`);
      if (top !== pair[ch]) {
        yield frame(16, { i, ch, top, expected: pair[ch], result: false }, viz(i, 'swap'), `'${ch}' cần ngoặc mở '${pair[ch]}' nhưng đỉnh stack là '${top}' ⇒ sai loại ⇒ không hợp lệ.`);
        return false;
      }
      yield frame(16, { i, ch, top, stack }, viz(i, 'done'), `'${top}' và '${ch}' khớp nhau ⇒ cặp này hợp lệ, tiếp tục.`);
    }
  }
  const ok = stack.length === 0;
  yield frame(19, { stack, result: ok }, viz(-1, 'active', ok ? {} : Object.fromEntries(stack.map((_, k) => [k, 'swap' as Highlight]))),
    ok ? 'Duyệt hết chuỗi và stack rỗng ⇒ mọi ngoặc mở đều đã được đóng ⇒ hợp lệ.' : `Duyệt hết chuỗi nhưng stack còn ${stack.length} ngoặc mở chưa đóng ⇒ không hợp lệ.`);
  return ok;
}
