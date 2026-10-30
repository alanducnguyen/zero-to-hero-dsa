import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { buildBST, treeViz, type KthInput, type TreeNode } from '../../shared';

export function* trace(input: KthInput): Generator<Frame, number> {
  const root = buildBST(input.values);
  const k = input.k;
  const sorted: number[] = [];
  const calls: string[] = [];
  const viz = (cur: TreeNode | null, arrHl: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (const v of sorted) h[v] = 'done';
    if (cur) h[cur.val] = 'active';
    const marks: Record<number, string> = {};
    sorted.forEach((v, i) => { marks[v] = `#${i + 1}`; });
    return composite([
      treeViz(root, h, marks, 'BST (tím = đang xét, xanh lá = đã đưa vào mảng)'),
      arr(sorted.length ? sorted : ['∅'], { title: `sorted (${sorted.length} phần tử)`, highlights: arrHl }),
    ]);
  };
  const ex = () => ({ callStack: [...calls] });

  yield frame(5, { k, sorted }, viz(null), `Dựng BST từ [${input.values.join(', ')}]. Chiến lược: duyệt inorder HẾT cây vào mảng – inorder của BST luôn tăng dần nên mảng tự sắp xếp, không cần sort.`, ex());
  function* inorder(node: TreeNode | null): Generator<Frame, void> {
    calls.push(`inorder(${node ? node.val : 'null'})`);
    if (node === null) {
      yield frame(7, { node: null, sorted }, viz(null), 'Gặp null ⇒ quay về: cây rỗng không có gì để thêm.', ex());
      calls.pop();
      return;
    }
    yield frame(8, { node: node.val, sorted }, viz(node), `Tại ${node.val}: chưa thêm vội, vì mọi giá trị trong cây con trái đều nhỏ hơn ${node.val} và phải đứng trước nó.`, ex());
    yield* inorder(node.left);
    sorted.push(node.val);
    yield frame(9, { node: node.val, sorted }, viz(node, { [sorted.length - 1]: 'swap' }), `Cây con trái xong ⇒ thêm ${node.val} vào cuối mảng (vị trí ${sorted.length - 1}). Lưu ý: dù đã đủ k phần tử, cách này vẫn đi tiếp – đó là chỗ lãng phí.`, ex());
    yield frame(10, { node: node.val, sorted }, viz(node), `Sang cây con phải của ${node.val}: các giá trị ở đó lớn hơn ${node.val}.`, ex());
    yield* inorder(node.right);
    calls.pop();
  }
  yield frame(12, { k, sorted }, viz(root), 'Gọi inorder từ gốc: sẽ thăm toàn bộ n node bất kể k nhỏ hay lớn.', ex());
  yield* inorder(root);
  const ok = k >= 1 && k <= sorted.length;
  const result = ok ? sorted[k - 1] : -1;
  yield frame(13, { k, sorted, result }, viz(null, ok ? { [k - 1]: 'done' } : {}),
    ok ? `Mảng đã tăng dần ⇒ phần tử nhỏ thứ ${k} là sorted[${k - 1}] = ${result}. Tốn O(n) thời gian và O(n) bộ nhớ cho mảng, dù chỉ cần ${k} phần tử đầu.` : `k = ${k} nằm ngoài [1, ${sorted.length}] ⇒ trả về -1.`, ex());
  return result;
}
