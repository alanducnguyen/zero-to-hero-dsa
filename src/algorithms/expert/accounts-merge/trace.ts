import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';
import { parseAccounts, type AccountsInput } from './node';

export function* trace(input: AccountsInput): Generator<Frame, string[][]> {
  const accounts = parseAccounts(input.accounts);
  const id = new Map<string, number>();
  const emailOf: string[] = [];
  const owner: string[] = [];
  const parent: number[] = [];
  const size: number[] = [];
  const groups = new Map<number, string[]>();

  const cols = 4;
  const pos = (i: number) => ({ x: 60 + (i % cols) * 110, y: 40 + Math.floor(i / cols) * 85 });
  const viz = (nodeHl: Record<string, Highlight> = {}, arrHl: Record<number, Highlight> = {}, extraTitle = '') => {
    const g: GraphVisual = {
      kind: 'graph',
      title: 'Rừng Union-Find trên email: mũi tên con → cha (gốc không có mũi tên)',
      nodes: emailOf.map((e, i) => ({ id: String(i), label: e, ...pos(i) })),
      edges: parent.map((p, i) => [i, p]).filter(([i, p]) => i !== p).map(([i, p]) => ({ from: String(i), to: String(p), directed: true })),
      highlights: Object.fromEntries(Object.entries(nodeHl)),
      marks: Object.fromEntries(parent.map((p, i) => [String(i), p === i ? `gốc, size=${size[i]}` : `#${i}`])),
    };
    const parts = [
      g,
      composite([arr(parent, { title: 'parent[]', highlights: arrHl }), arr(size, { title: 'size[]' })], 'row'),
    ];
    if (groups.size > 0) {
      parts.push(mapViz(Object.fromEntries([...groups].map(([r, es]) => [`gốc #${r} (${owner[r]})`, es.join(', ')])), undefined, 'groups: gốc → email' + extraTitle));
    } else {
      parts.push(mapViz(Object.fromEntries(emailOf.map((e, i) => [e, `${owner[i]} (#${i})`])), undefined, 'email → chủ (chỉ số node)' + extraTitle));
    }
    return composite(parts);
  };

  /** find có nén đường; trả về gốc và danh sách node đã được trỏ thẳng lên gốc */
  const findRaw = (x: number, changed: number[]): number => {
    if (parent[x] !== x) {
      const r = findRaw(parent[x], changed);
      if (parent[x] !== r) changed.push(x);
      parent[x] = r;
    }
    return parent[x];
  };
  function* find(x: number): Generator<Frame, number> {
    const changed: number[] = [];
    const r = findRaw(x, changed);
    if (changed.length > 0) {
      yield frame(13, { x, root: r, compressed: changed.map((i) => emailOf[i]) },
        viz(Object.fromEntries([[String(r), 'done'], ...changed.map((i) => [String(i), 'swap'])]), Object.fromEntries(changed.map((i) => [i, 'swap']))),
        `find(${emailOf[x]}): đi lên tới gốc ${emailOf[r]}, rồi trỏ thẳng ${changed.map((i) => emailOf[i]).join(', ')} vào gốc. Nén đường giúp các lần find sau gần O(1).`);
    }
    return r;
  }

  yield frame(8, { accounts: accounts.length }, viz(), `Có ${accounts.length} account. Ý tưởng: mỗi EMAIL là một node; email cùng account thì cùng người ⇒ union. Không union theo tên vì hai người có thể trùng tên.`);

  for (const acc of accounts) {
    const [name, ...emails] = acc;
    yield frame(24, { name, emails }, viz(), `Xét account của ${name}: [${emails.join(', ')}]. Nối mọi email về email đầu ${emails[0]} là đủ – không cần nối từng cặp (k−1 cạnh thay vì k²).`);
    for (const email of emails) {
      if (!id.has(email)) {
        id.set(email, parent.length);
        emailOf.push(email);
        parent.push(parent.length);
        size.push(1);
        owner.push(name);
        const i = parent.length - 1;
        yield frame(30, { email, index: i, owner: name }, viz({ [String(i)]: 'active' }, { [i]: 'active' }),
          `Email mới ${email} ⇒ cấp chỉ số #${i}, là một tập riêng (parent[${i}] = ${i}, size = 1), ghi chủ là ${name}.`);
      }
      const a = id.get(emails[0])!;
      const b = id.get(email)!;
      if (a === b) continue; // union(x, x) vô nghĩa – trace bỏ qua cho gọn
      yield frame(32, { a: emails[0], b: email }, viz({ [String(a)]: 'pointer', [String(b)]: 'pointer' }), `union(${emails[0]}, ${email}): hai email cùng account ⇒ phải cùng nhóm.`);
      let ra = yield* find(a);
      let rb = yield* find(b);
      if (ra === rb) {
        yield frame(19, { ra: emailOf[ra], rb: emailOf[rb] }, viz({ [String(ra)]: 'done' }), `Cùng gốc ${emailOf[ra]} ⇒ đã thuộc một nhóm (do account trước nối rồi), không làm gì.`);
        continue;
      }
      const swapped = size[ra] < size[rb];
      if (swapped) [ra, rb] = [rb, ra];
      parent[rb] = ra;
      size[ra] += size[rb];
      yield frame(22, { ra: emailOf[ra], rb: emailOf[rb], [`size[${ra}]`]: size[ra] }, viz({ [String(ra)]: 'done', [String(rb)]: 'swap' }, { [rb]: 'swap', [ra]: 'done' }),
        `Gắn gốc ${emailOf[rb]} vào gốc ${emailOf[ra]}${swapped ? ' (đổi chỗ vì cây kia lớn hơn)' : ''}: cây nhỏ dưới cây lớn giữ chiều cao O(log n). size gốc mới = ${size[ra]}.`);
    }
  }

  for (const [email, i] of id) {
    const root = yield* find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(email);
    yield frame(39, { email, root: emailOf[root] }, viz({ [String(i)]: 'active', [String(root)]: 'done' }),
      `Gom ${email} vào nhóm của gốc ${emailOf[root]}. Mỗi gốc = một người thật.`);
  }
  const result: string[][] = [];
  for (const [root, emails] of groups) {
    result.push([owner[root], ...emails.sort()]);
    yield frame(42, { root: emailOf[root], account: result[result.length - 1] }, viz({ [String(root)]: 'done' }),
      `Nhóm gốc ${emailOf[root]} ⇒ [${owner[root]}, ${emails.join(', ')}]. Sắp email tăng dần theo yêu cầu đề.`);
  }
  result.sort((a, b) => (a[0] !== b[0] ? (a[0] < b[0] ? -1 : 1) : a[1] < b[1] ? -1 : 1));
  yield frame(43, { result: result.map((r) => r.join(' ')) }, viz({}, {}, ' – xong'),
    `Kết quả ${result.length} người. Sắp theo (tên, email đầu) để output ổn định.`);
  return result;
}
