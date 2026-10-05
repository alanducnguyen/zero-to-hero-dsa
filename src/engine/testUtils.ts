import { expect } from 'vitest';
import type { AlgorithmModule } from './types';
import { runTrace } from './runner';

/**
 * Kiểm tra chung cho mọi module:
 * - trace cho cùng kết quả với run
 * - mọi line nằm trong phạm vi source
 * - số frame hợp lý với input mặc định
 */
export function checkModule(mod: AlgorithmModule, inputs: Record<string, unknown>[]) {
  const lineCount = mod.source.split('\n').length;
  for (const input of inputs) {
    const res = runTrace(mod, input);
    expect(res.error).toBeUndefined();
    expect(res.truncated).toBe(false);
    expect(res.frames.length).toBeGreaterThan(0);
    expect(res.result).toEqual(mod.run(input));
    for (const f of res.frames) {
      expect(f.line).toBeGreaterThanOrEqual(1);
      expect(f.line).toBeLessThanOrEqual(lineCount);
    }
  }
}

export function defaultInput(mod: AlgorithmModule): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of mod.meta.inputs) out[f.key] = structuredClone(f.default);
  return out;
}
