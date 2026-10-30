import { exist } from './impl';
import type { WordSearchInput } from './trace';

export function run(input: WordSearchInput): boolean {
  return exist(input.board, input.word);
}
