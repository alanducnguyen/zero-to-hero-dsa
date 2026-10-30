import { accountsMerge } from './impl';

export interface AccountsInput {
  /** mỗi dòng: "Tên:email1,email2,..." */
  accounts: string[];
}

/** "John:a@x,b@x" → ["John", "a@x", "b@x"]; bỏ dòng sai định dạng hoặc không có email. */
export function parseAccounts(lines: string[]): string[][] {
  const out: string[][] = [];
  for (const raw of lines ?? []) {
    const idx = String(raw).indexOf(':');
    if (idx <= 0) continue;
    const name = raw.slice(0, idx).trim();
    const emails = raw.slice(idx + 1).split(',').map((e) => e.trim()).filter(Boolean);
    if (!name || emails.length === 0) continue;
    out.push([name, ...emails]);
  }
  return out;
}

export function run(input: AccountsInput): string[][] {
  return accountsMerge(parseAccounts(input.accounts));
}
