import { fromLevelOrder, lowestCommonAncestor } from './impl';
export interface LCAInput { tree: string[]; p: number; q: number }
export const parseTree = (tokens: string[]) => tokens.map((t) => (t === 'null' || t === '#' ? null : Number(t))).map((x) => (x === null || Number.isNaN(x) ? null : x));
export const run = (input: LCAInput) => lowestCommonAncestor(fromLevelOrder(parseTree(input.tree)), input.p, input.q)?.val ?? null;
