import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { groupAnagrams } from './impl';
import { trace } from './trace';
const mod: AlgorithmModule = { meta, source, content, interview, run: (input) => groupAnagrams(input.words as string[]), trace: (input) => trace(input as { words: string[] }) };
export default mod;
