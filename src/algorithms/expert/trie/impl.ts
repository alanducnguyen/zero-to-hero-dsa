/** Một node của Trie: con theo ký tự + cờ kết thúc từ. */
export class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

/**
 * Trie (cây tiền tố) – lưu tập từ, tra cứu theo tiền tố trong O(L).
 */
export class Trie {
  readonly root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      let next = node.children.get(ch);
      if (!next) {
        next = new TrieNode();
        node.children.set(ch, next); // tạo nhánh mới
      }
      node = next;
    }
    node.isEnd = true; // đánh dấu kết thúc một từ
  }

  /** Trả về node ứng với prefix, hoặc null nếu không có đường đi. */
  private walk(prefix: string): TrieNode | null {
    let node = this.root;
    for (const ch of prefix) {
      const next = node.children.get(ch);
      if (!next) return null; // đứt đường ⇒ không có tiền tố này
      node = next;
    }
    return node;
  }

  search(word: string): boolean {
    const node = this.walk(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null;
  }
}
