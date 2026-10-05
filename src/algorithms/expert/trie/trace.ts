import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, TreeVisual } from '@/engine/types';
import type { TrieInput } from './node';

interface VNode { id: string; label: string; children: Map<string, VNode>; isEnd: boolean }

export function* trace(input: TrieInput): Generator<Frame, { search: boolean; startsWith: boolean }> {
  let seq = 0;
  const root: VNode = { id: 'root', label: '•', children: new Map(), isEnd: false };
  const all: VNode[] = [root];
  const path = new Set<string>();
  const viz = (hl: Record<string, Highlight> = {}, top?: ReturnType<typeof arr>): ReturnType<typeof composite> => {
    const h: Record<string, Highlight> = {};
    for (const id of path) h[id] = 'visited';
    const tree: TreeVisual = {
      kind: 'tree',
      title: 'Trie (• = gốc, ✓ = kết thúc từ)',
      rootId: 'root',
      nodes: all.map((n) => ({ id: n.id, label: n.label, children: [...n.children.values()].map((c) => c.id) })),
      highlights: { ...h, ...hl },
      marks: Object.fromEntries(all.filter((n) => n.isEnd).map((n) => [n.id, '✓'])),
    };
    return composite(top ? [top, tree] : [tree]);
  };
  const cs = (f: string) => [f];

  // insert
  for (const word of input.words) {
    const chars = [...word];
    path.clear();
    let node = root;
    yield frame(14, { word }, viz({ root: 'active' }, arr(chars, { title: `insert("${word}")` })), `insert("${word}"): bắt đầu từ gốc.`, { callStack: cs('insert') });
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      let next = node.children.get(ch);
      yield frame(16, { word, ch, i, found: !!next }, viz({ [node.id]: 'active' }, arr(chars, { title: `insert("${word}")`, highlights: { [i]: 'active' }, pointers: [{ name: 'ch', index: i }] })), next ? `Nhánh '${ch}' đã tồn tại ⇒ đi theo, không tạo mới (tiền tố chung được dùng chung).` : `Chưa có nhánh '${ch}' ⇒ tạo node mới.`, { callStack: cs('insert') });
      if (!next) {
        next = { id: `n${seq++}`, label: ch, children: new Map(), isEnd: false };
        node.children.set(ch, next);
        all.push(next);
        yield frame(19, { word, ch, i }, viz({ [next.id]: 'swap' }, arr(chars, { title: `insert("${word}")`, highlights: { [i]: 'active' }, pointers: [{ name: 'ch', index: i }] })), `Tạo node '${ch}' làm con của '${node.label}'.`, { callStack: cs('insert') });
      }
      path.add(node.id);
      node = next;
    }
    node.isEnd = true;
    path.add(node.id);
    yield frame(23, { word }, viz({ [node.id]: 'done' }, arr(chars, { title: `insert("${word}")`, highlights: Object.fromEntries(chars.map((_, k) => [k, 'done'])) })), `Đánh dấu isEnd = true tại node '${node.label}': "${word}" là một từ hoàn chỉnh (không chỉ là tiền tố).`, { callStack: cs('insert') });
  }

  function* walk(prefix: string, fn: 'search' | 'startsWith'): Generator<Frame, VNode | null> {
    const chars = [...prefix];
    path.clear();
    let node = root;
    yield frame(28, { [fn === 'search' ? 'word' : 'prefix']: prefix }, viz({ root: 'active' }, arr(chars, { title: `${fn}("${prefix}")` })), `${fn}("${prefix}") → walk: đi từ gốc theo từng ký tự.`, { callStack: cs(`${fn} → walk`) });
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const next = node.children.get(ch);
      yield frame(30, { ch, i, found: !!next }, viz({ [node.id]: 'active' }, arr(chars, { title: `${fn}("${prefix}")`, highlights: { [i]: 'active' }, pointers: [{ name: 'ch', index: i }] })), next ? `Có nhánh '${ch}' ⇒ đi tiếp.` : `Không có nhánh '${ch}' từ node '${node.label}'.`, { callStack: cs(`${fn} → walk`) });
      if (!next) {
        yield frame(31, { ch, i }, viz({ [node.id]: 'swap' }, arr(chars, { title: `${fn}("${prefix}")`, highlights: { [i]: 'swap' } })), `Đứt đường ⇒ không từ nào có tiền tố "${prefix.slice(0, i + 1)}". Trả về null.`, { callStack: cs(`${fn} → walk`) });
        return null;
      }
      path.add(node.id);
      node = next;
    }
    path.add(node.id);
    yield frame(34, { node: node.label, isEnd: node.isEnd }, viz({ [node.id]: 'compare' }, arr(chars, { title: `${fn}("${prefix}")`, highlights: Object.fromEntries(chars.map((_, k) => [k, 'visited'])) })), `Đi hết "${prefix}", dừng ở node '${node.label}' (isEnd = ${node.isEnd}).`, { callStack: cs(`${fn} → walk`) });
    return node;
  }

  const s = yield* walk(input.search, 'search');
  const search = s !== null && s.isEnd;
  yield frame(39, { result: search }, viz(s ? { [s.id]: search ? 'done' : 'swap' } : {}, arr([...input.search], { title: `search("${input.search}") = ${search}` })), s === null ? `search = false: không có đường đi.` : search ? `search = true: tới được node và isEnd = true ⇒ "${input.search}" là một từ trong Trie.` : `search = false: tới được node nhưng isEnd = false ⇒ "${input.search}" chỉ là tiền tố của từ khác, không phải từ hoàn chỉnh.`, { callStack: cs('search') });

  const p = yield* walk(input.prefix, 'startsWith');
  const startsWith = p !== null;
  yield frame(43, { result: startsWith }, viz(p ? { [p.id]: 'done' } : {}, arr([...input.prefix], { title: `startsWith("${input.prefix}") = ${startsWith}` })), startsWith ? `startsWith = true: tồn tại đường đi ⇒ có từ bắt đầu bằng "${input.prefix}". Không cần quan tâm isEnd.` : `startsWith = false: không có đường đi.`, { callStack: cs('startsWith') });
  return { search, startsWith };
}
