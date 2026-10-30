import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const CLOSE: Record<string, string> = { '(': ')', '[': ']', '{': '}' };

export function* trace(input: { s: string }): Generator<Frame, boolean> {
  const s = input.s;
  const chars = [...s];
  let i = 0;
  const calls: string[] = ['parseSeq()'];
  const viz = (h: Highlight = 'active') => composite([
    arr(chars.length ? chars : ['∅'], { title: 'Chuỗi s', highlights: Object.fromEntries([...Array(Math.min(i, chars.length)).keys()].map((k) => [k, 'visited' as Highlight]).concat(i < chars.length ? [[i, h]] : [])), pointers: i < chars.length ? [{ name: 'i', index: i }] : [] }),
    stack(calls, {}, `call stack (độ sâu ${calls.length})`),
  ]);
  const ex = () => ({ callStack: [...calls] });

  yield frame(5, { i }, viz(), 'Coi chuỗi ngoặc là một văn phạm: S → (mở S đóng)*. Con trỏ i dùng chung cho mọi tầng đệ quy; mỗi tầng đọc một dãy nhóm cân bằng.', ex());
  function* parseSeq(): Generator<Frame, boolean> {
    for (;;) {
      const isOpen = i < s.length && '([{'.includes(s[i]);
      yield frame(7, { i, 's[i]': s[i] ?? null }, viz(), isOpen ? `s[${i}] = '${s[i]}' là ngoặc mở ⇒ bắt đầu một nhóm mới ở tầng này.` : i < s.length ? `s[${i}] = '${s[i]}' không phải ngoặc mở ⇒ dãy nhóm của tầng này kết thúc, để tầng gọi kiểm tra ngoặc đóng.` : 'Hết chuỗi ⇒ dãy nhóm của tầng này kết thúc.', ex());
      if (!isOpen) break;
      const want = CLOSE[s[i]];
      yield frame(8, { i, want }, viz('pointer'), `Ghi nhớ ngoặc đóng cần gặp: '${want}'. Biến cục bộ want của mỗi tầng đóng vai trò một ô stack.`, ex());
      i++;
      calls.push(`parseSeq() chờ '${want}'`);
      yield frame(10, { i, want }, viz(), 'Đệ quy đọc phần bên trong nhóm: nó phải tự cân bằng trước khi tới ngoặc đóng của ta.', ex());
      const inner = yield* parseSeq();
      calls.pop();
      if (!inner) {
        yield frame(10, { i, want, result: false }, viz('swap'), 'Tầng con báo lỗi ⇒ lan false lên, không cần đọc tiếp.', ex());
        return false;
      }
      if (s[i] !== want) {
        yield frame(11, { i, want, 's[i]': s[i] ?? null, result: false }, viz('swap'), s[i] === undefined ? `Hết chuỗi mà vẫn chờ '${want}' ⇒ ngoặc mở thừa.` : `Cần '${want}' nhưng gặp '${s[i]}' ⇒ sai loại ngoặc.`, ex());
        return false;
      }
      yield frame(11, { i, want }, viz('done'), `s[${i}] = '${want}' khớp ⇒ nhóm đóng đúng loại.`, ex());
      i++;
      yield frame(12, { i }, viz(), 'Ăn ngoặc đóng, quay lại thử đọc nhóm kế tiếp cùng tầng (vd "()[]").', ex());
    }
    yield frame(14, { i }, viz(), `Tầng này đọc xong, trả true; vị trí i = ${i} sẽ được tầng gọi kiểm tra.`, ex());
    return true;
  }
  const okSeq = yield* parseSeq();
  const ok = okSeq && i === s.length;
  yield frame(16, { i, n: s.length, result: ok }, viz(ok ? 'done' : 'swap'),
    ok ? `Tầng ngoài cùng đọc hết chuỗi ⇒ hợp lệ. Độ sâu đệ quy = độ sâu lồng nhau, tệ nhất n/2.` : !okSeq ? 'Có lỗi ở tầng trong ⇒ không hợp lệ.' : `Tầng ngoài dừng ở i = ${i} < ${s.length} vì gặp ngoặc đóng không có ngoặc mở ⇒ không hợp lệ.`, ex());
  return ok;
}
