/**
 * Accounts Merge – Union-Find trên email (path compression + union by size).
 * Hai account chung ít nhất một email thuộc cùng một người ⇒ gộp lại.
 * @param accounts mỗi phần tử [name, email1, email2, ...]
 * @returns account đã gộp: [name, ...emails tăng dần], sắp theo (name, email đầu)
 */
export function accountsMerge(accounts: string[][]): string[][] {
  const id = new Map<string, number>(); // email → chỉ số node
  const owner: string[] = []; // chỉ số node → tên chủ
  const parent: number[] = [];
  const size: number[] = [];
  const find = (x: number): number => {
    if (parent[x] !== x) parent[x] = find(parent[x]); // nén đường đi
    return parent[x];
  };
  const union = (a: number, b: number): void => {
    let ra = find(a);
    let rb = find(b);
    if (ra === rb) return;
    if (size[ra] < size[rb]) [ra, rb] = [rb, ra]; // gắn cây nhỏ vào cây lớn
    parent[rb] = ra;
    size[ra] += size[rb];
  };
  for (const [name, ...emails] of accounts) {
    for (const email of emails) {
      if (!id.has(email)) {
        id.set(email, parent.length);
        parent.push(parent.length);
        size.push(1);
        owner.push(name);
      }
      union(id.get(emails[0])!, id.get(email)!); // nối mọi email về email đầu
    }
  }
  const groups = new Map<number, string[]>(); // gốc → danh sách email
  for (const [email, i] of id) {
    const root = find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(email);
  }
  const result: string[][] = [];
  for (const [root, emails] of groups) result.push([owner[root], ...emails.sort()]);
  return result.sort((a, b) => (a[0] !== b[0] ? (a[0] < b[0] ? -1 : 1) : a[1] < b[1] ? -1 : 1));
}
