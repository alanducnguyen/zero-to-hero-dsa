import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { pacificAtlantic } from './impl';
import { trace } from './trace';

/** Cắt các hàng về cùng độ rộng (hàng ngắn nhất) để lưới luôn chữ nhật. */
function normalize(input: Record<string, unknown>): { heights: number[][] } {
  const rows = ((input.heights as number[][]) ?? []).filter((r) => r.length > 0);
  const n = rows.length ? Math.min(...rows.map((r) => r.length)) : 0;
  return { heights: rows.map((r) => r.slice(0, n)) };
}

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => pacificAtlantic(normalize(input).heights),
  trace: (input) => trace(normalize(input)),
};
export default mod;
