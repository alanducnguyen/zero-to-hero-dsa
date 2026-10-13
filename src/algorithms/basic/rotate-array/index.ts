import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { rotate } from './impl';
import { trace } from './trace';
const mod: AlgorithmModule = { meta, source, content, interview, run: (input) => rotate([...(input.nums as number[])], Math.max(0, Math.floor(input.k as number))), trace: (input) => trace({ nums: input.nums as number[], k: Math.max(0, Math.floor(input.k as number)) }) };
export default mod;
