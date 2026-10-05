import { create } from 'zustand';

const KEY = 'dsa-theme';

interface ThemeState {
  dark: boolean;
  toggle: () => void;
}

function apply(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  try {
    localStorage.setItem(KEY, dark ? 'dark' : 'light');
  } catch {
    /* ignore */
  }
}

/** Theme dùng chung toàn app (một nguồn sự thật). */
export const useTheme = create<ThemeState>()((set, get) => ({
  dark: typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  toggle: () => {
    const dark = !get().dark;
    apply(dark);
    set({ dark });
  },
}));
