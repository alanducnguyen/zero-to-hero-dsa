import type { Highlight } from '@/engine/types';

export const HL_COLOR: Record<Highlight, string> = {
  compare: 'var(--color-viz-compare)',
  swap: 'var(--color-viz-swap)',
  done: 'var(--color-viz-done)',
  pointer: 'var(--color-viz-pointer)',
  visited: 'var(--color-viz-visited)',
  active: 'var(--color-viz-active)',
  range: 'var(--color-viz-range)',
  muted: 'var(--surface-3)',
};

export const HL_LABEL: Record<Highlight, string> = {
  compare: 'Đang so sánh',
  swap: 'Vừa thay đổi',
  done: 'Hoàn tất',
  pointer: 'Con trỏ',
  visited: 'Đã duyệt',
  active: 'Đang xét',
  range: 'Khoảng đang xét',
  muted: 'Ngoài phạm vi',
};

export const fillFor = (h?: Highlight) => (h ? HL_COLOR[h] : 'var(--viz-default)');
export const POINTER_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
