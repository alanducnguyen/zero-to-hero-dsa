import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { run } from './node';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => {
    const nums = input.nums as number[];
    const k = Math.max(1, Math.min(input.k as number, nums.length || 1));
    return run({ nums, k });
  },
  trace: (input) => trace(input as { nums: number[]; k: number }),
};
export default mod;
