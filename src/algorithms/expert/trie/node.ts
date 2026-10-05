import { Trie } from './impl';

export interface TrieInput {
  words: string[];
  search: string;
  prefix: string;
}

export function run(input: TrieInput): { search: boolean; startsWith: boolean } {
  const t = new Trie();
  for (const w of input.words) t.insert(w);
  return { search: t.search(input.search), startsWith: t.startsWith(input.prefix) };
}
