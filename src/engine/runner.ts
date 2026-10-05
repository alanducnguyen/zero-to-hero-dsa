import type { AlgorithmModule, Frame } from './types';

export const MAX_FRAMES = 4000;

export interface RunResult {
  frames: Frame[];
  result: unknown;
  truncated: boolean;
  error?: string;
}

/** Chạy generator tới hết, thu thập toàn bộ frame. */
export function runTrace(mod: AlgorithmModule, input: Record<string, unknown>): RunResult {
  const frames: Frame[] = [];
  let truncated = false;
  let result: unknown;
  try {
    const gen = mod.trace(input);
    for (;;) {
      const r = gen.next();
      if (r.done) {
        result = r.value;
        break;
      }
      frames.push(r.value);
      if (frames.length >= MAX_FRAMES) {
        truncated = true;
        break;
      }
    }
  } catch (e) {
    return { frames, result: undefined, truncated, error: e instanceof Error ? e.message : String(e) };
  }
  return { frames, result, truncated };
}
