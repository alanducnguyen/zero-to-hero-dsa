import { create } from 'zustand';
import type { AlgorithmModule, Frame } from '@/engine/types';
import { runTrace } from '@/engine/runner';

interface DebugState {
  moduleId: string | null;
  input: Record<string, unknown>;
  frames: Frame[];
  result: unknown;
  error?: string;
  truncated: boolean;
  index: number;
  playing: boolean;
  /** ms giữa 2 frame */
  speed: number;
  breakpoints: Set<number>;

  load: (mod: AlgorithmModule, input: Record<string, unknown>) => void;
  setInput: (input: Record<string, unknown>) => void;
  goto: (i: number) => void;
  next: () => void;
  prev: () => void;
  first: () => void;
  last: () => void;
  continueToBreakpoint: () => void;
  togglePlay: () => void;
  setPlaying: (p: boolean) => void;
  setSpeed: (ms: number) => void;
  toggleBreakpoint: (line: number) => void;
}

export const useDebugger = create<DebugState>()((set, get) => ({
  moduleId: null,
  input: {},
  frames: [],
  result: undefined,
  truncated: false,
  index: 0,
  playing: false,
  speed: 600,
  breakpoints: new Set(),

  load: (mod, input) => {
    const res = runTrace(mod, input);
    set({
      moduleId: mod.meta.id,
      input,
      frames: res.frames,
      result: res.result,
      error: res.error,
      truncated: res.truncated,
      index: 0,
      playing: false,
      breakpoints: get().moduleId === mod.meta.id ? get().breakpoints : new Set(),
    });
  },
  setInput: (input) => set({ input }),
  goto: (i) => set((s) => ({ index: Math.max(0, Math.min(s.frames.length - 1, i)) })),
  next: () => set((s) => ({ index: Math.min(s.frames.length - 1, s.index + 1), playing: s.index + 1 >= s.frames.length - 1 ? false : s.playing })),
  prev: () => set((s) => ({ index: Math.max(0, s.index - 1), playing: false })),
  first: () => set({ index: 0, playing: false }),
  last: () => set((s) => ({ index: Math.max(0, s.frames.length - 1), playing: false })),
  continueToBreakpoint: () => {
    const { frames, index, breakpoints } = get();
    if (breakpoints.size === 0) {
      set({ playing: true });
      return;
    }
    for (let i = index + 1; i < frames.length; i++) {
      if (breakpoints.has(frames[i].line)) {
        set({ index: i, playing: false });
        return;
      }
    }
    set({ index: frames.length - 1, playing: false });
  },
  togglePlay: () =>
    set((s) => {
      if (s.playing) return { playing: false };
      // nếu đang ở cuối thì phát lại từ đầu
      return s.index >= s.frames.length - 1 ? { index: 0, playing: true } : { playing: true };
    }),
  setPlaying: (playing) => set({ playing }),
  setSpeed: (speed) => set({ speed }),
  toggleBreakpoint: (line) =>
    set((s) => {
      const bp = new Set(s.breakpoints);
      if (bp.has(line)) bp.delete(line);
      else bp.add(line);
      return { breakpoints: bp };
    }),
}));
