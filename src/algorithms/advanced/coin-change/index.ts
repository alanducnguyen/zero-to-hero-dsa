import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { coinChange } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => coinChange([...new Set((input.coins as number[]).filter((c) => c > 0))], Math.max(0, Math.min(30, Math.floor(input.amount as number)))),
  trace: (input) => trace(input as { coins: number[]; amount: number }),
};
export default mod;
