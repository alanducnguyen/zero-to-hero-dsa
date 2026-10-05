import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completed: Record<string, true>;
  bookmarked: Record<string, true>;
  toggleCompleted: (id: string) => void;
  toggleBookmark: (id: string) => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completed: {},
      bookmarked: {},
      toggleCompleted: (id) =>
        set((s) => {
          const next = { ...s.completed };
          if (next[id]) delete next[id];
          else next[id] = true;
          return { completed: next };
        }),
      toggleBookmark: (id) =>
        set((s) => {
          const next = { ...s.bookmarked };
          if (next[id]) delete next[id];
          else next[id] = true;
          return { bookmarked: next };
        }),
    }),
    { name: 'dsa-progress' },
  ),
);
