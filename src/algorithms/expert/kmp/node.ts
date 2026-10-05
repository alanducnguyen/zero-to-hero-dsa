import { buildLPS, kmpSearch } from './impl';
export interface KMPInput { text: string; pattern: string }
export const run = (input: KMPInput) => ({ lps: buildLPS(input.pattern), matches: kmpSearch(input.text, input.pattern) });
