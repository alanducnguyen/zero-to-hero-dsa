import { solveNQueens } from './impl';
export const run = (input: { n: number }) => {
  const n = Math.max(1, Math.min(8, Math.floor(input.n)));
  const sols = solveNQueens(n);
  return { count: sols.length, first: sols[0] ?? null };
};
