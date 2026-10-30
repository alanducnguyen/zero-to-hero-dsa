import { composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { buildBST, treeViz, type KthInput, type TreeNode } from '../../shared';

export function* trace(input: KthInput): Generator<Frame, number> {
  const root = buildBST(input.values);
  const k = input.k;
  let count = 0;
  let result = -1;
  const visited: number[] = [];
  const calls: string[] = [];
  const viz = (cur: TreeNode | null, curHl: Highlight = 'active') => {
    const h: Record<number, Highlight> = {};
    for (const v of visited) h[v] = 'done';
    if (cur) h[cur.val] = curHl;
    const marks: Record<number, string> = {};
    visited.forEach((v, i) => { marks[v] = `#${i + 1}`; });
    return composite([
      treeViz(root, h, marks, 'BST (tím = đang xét, xanh lá = đã đếm, #i = thứ tự inorder)'),
      stack(calls.length ? calls : ['∅'], {}, `call stack (độ sâu ${calls.length})`),
    ]);
  };
  const ex = () => ({ callStack: [...calls] });
  const v = (node: TreeNode | null) => ({ node: node ? node.val : null, count, k, result });

  yield frame(5, v(null), viz(null), `Dựng BST từ [${input.values.join(', ')}]. Vẫn inorder nhưng chỉ ĐẾM, không lưu mảng: bộ nhớ phụ chỉ còn call stack O(h).`, ex());
  yield frame(6, v(null), viz(null), 'result = -1 là giá trị mặc định nếu k vượt số node. Hàm đệ quy trả về boolean "đã tìm thấy chưa" để cắt nhánh.', ex());
  function* inorder(node: TreeNode | null): Generator<Frame, boolean> {
    calls.push(`inorder(${node ? node.val : 'null'})`);
    if (node === null) {
      yield frame(8, v(null), viz(null), 'null ⇒ trả false: chưa tìm thấy gì ở nhánh rỗng.', ex());
      calls.pop();
      return false;
    }
    yield frame(9, v(node), viz(node), `Tại ${node.val}: xuống cây con trái trước vì mọi giá trị nhỏ hơn ${node.val} nằm ở đó.`, ex());
    if (yield* inorder(node.left)) {
      yield frame(9, v(node), viz(node, 'visited'), `Cây con trái của ${node.val} đã tìm thấy đáp án ⇒ trả true ngay, không đếm ${node.val} và không đụng cây con phải.`, ex());
      calls.pop();
      return true;
    }
    count++;
    visited.push(node.val);
    yield frame(10, v(node), viz(node), `Cây con trái xong ⇒ thăm ${node.val}, count = ${count}: ${node.val} là phần tử nhỏ thứ ${count}.`, ex());
    if (count === k) {
      result = node.val;
      yield frame(11, v(node), viz(node, 'swap'), `count === k ⇒ result = ${node.val}, trả true để mọi tầng phía trên dừng ngay. Chỉ thăm ${count} node thay vì cả cây.`, ex());
      calls.pop();
      return true;
    }
    yield frame(12, v(node), viz(node), `count = ${count} < k = ${k} ⇒ tiếp tục ở cây con phải; kết quả của nhánh phải chính là kết quả của tầng này.`, ex());
    const found = yield* inorder(node.right);
    calls.pop();
    return found;
  }
  yield frame(14, v(root), viz(root), 'Gọi inorder từ gốc. Độ sâu call stack tối đa bằng chiều cao h – cây lệch có h = n, đó là rủi ro stack overflow.', ex());
  yield* inorder(root);
  yield frame(15, v(null), viz(null), result === -1 ? `Duyệt hết ${count} node mà chưa tới k = ${k} ⇒ trả về -1.` : `Trả về ${result}. Thời gian O(h + k): đi xuống h tầng tới min rồi thăm k node.`, ex());
  return result;
}
