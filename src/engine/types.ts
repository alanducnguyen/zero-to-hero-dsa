/**
 * Lõi của chế độ Debug: mỗi thuật toán được viết dưới dạng generator
 * yield ra các Frame. Debugger chỉ việc phát lại Frame[] theo index.
 */

export type Highlight =
  | 'compare' // đang so sánh
  | 'swap' // vừa hoán đổi / thay đổi
  | 'done' // đã đúng vị trí / hoàn tất
  | 'pointer' // vị trí con trỏ
  | 'visited' // đã duyệt
  | 'active' // phần tử đang xét
  | 'range' // nằm trong khoảng đang xét
  | 'muted'; // bị loại / ngoài phạm vi

export interface Pointer {
  name: string;
  index: number;
}

export interface ArrayVisual {
  kind: 'array';
  title?: string;
  items: (number | string)[];
  highlights?: Record<number, Highlight>;
  pointers?: Pointer[];
  /** khoảng [from, to] (inclusive) được tô nền */
  ranges?: { from: number; to: number; label?: string; color?: Highlight }[];
  /** hiển thị dạng cột (bars) theo giá trị hay dạng ô */
  mode?: 'bars' | 'cells';
}

export interface LinkedListVisual {
  kind: 'linkedlist';
  title?: string;
  nodes: { id: string; value: number | string; next: string | null }[];
  /** id node mà con trỏ đang trỏ tới; null = trỏ tới null */
  pointers?: { name: string; id: string | null }[];
  highlights?: Record<string, Highlight>;
  /** thứ tự hiển thị trái→phải (id) */
  order?: string[];
}

export interface StackQueueVisual {
  kind: 'stackqueue';
  title?: string;
  mode: 'stack' | 'queue';
  items: (number | string)[];
  highlights?: Record<number, Highlight>;
}

export interface TreeNode {
  id: string;
  label: string;
  children: string[];
}
export interface TreeVisual {
  kind: 'tree';
  title?: string;
  nodes: TreeNode[];
  rootId: string | null;
  highlights?: Record<string, Highlight>;
  /** nhãn phụ dưới node (vd: isEnd) */
  marks?: Record<string, string>;
}

export interface GraphVisual {
  kind: 'graph';
  title?: string;
  nodes: { id: string; label?: string; x: number; y: number }[];
  edges: { from: string; to: string; weight?: number; directed?: boolean }[];
  highlights?: Record<string, Highlight>;
  edgeHighlights?: Record<string, Highlight>; // key = `${from}->${to}`
  /** nhãn phụ ở node (vd khoảng cách) */
  marks?: Record<string, string>;
}

export interface MatrixVisual {
  kind: 'matrix';
  title?: string;
  cells: (number | string | null)[][];
  highlights?: Record<string, Highlight>; // key = `${r},${c}`
  rowLabels?: string[];
  colLabels?: string[];
}

export interface HeapVisual {
  kind: 'heap';
  title?: string;
  items: number[];
  highlights?: Record<number, Highlight>;
}

export interface MapVisual {
  kind: 'map';
  title?: string;
  entries: { key: string; value: string | number }[];
  highlights?: Record<string, Highlight>;
}

export interface CompositeVisual {
  kind: 'composite';
  parts: VisualState[];
  layout?: 'row' | 'column';
}

export type VisualState =
  | ArrayVisual
  | LinkedListVisual
  | StackQueueVisual
  | TreeVisual
  | GraphVisual
  | MatrixVisual
  | HeapVisual
  | MapVisual
  | CompositeVisual;

export interface Frame {
  /** dòng trong impl.ts (1-based) đang thực thi */
  line: number;
  vars: Record<string, unknown>;
  visual: VisualState;
  /** giải thích tiếng Việt cho bước này */
  note?: string;
  callStack?: string[];
  log?: string;
}

export type InputField =
  | { key: string; label: string; type: 'number[]'; default: number[]; min?: number; max?: number; maxLength?: number }
  | { key: string; label: string; type: 'number'; default: number; min?: number; max?: number }
  | { key: string; label: string; type: 'string'; default: string; maxLength?: number }
  | { key: string; label: string; type: 'string[]'; default: string[]; maxLength?: number }
  | { key: string; label: string; type: 'grid'; default: number[][] }
  | {
      key: string;
      label: string;
      type: 'graph';
      default: { nodes: { id: string; x: number; y: number }[]; edges: { from: string; to: string; weight?: number }[]; directed?: boolean };
    };

export type Level = 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface Preset {
  label: string;
  values: Record<string, unknown>;
}

export interface AlgorithmMeta {
  id: string;
  title: string;
  subtitle: string;
  level: Level;
  category: string;
  tags: string[];
  companies: string[];
  complexity: { time: string; space: string; best?: string; worst?: string };
  leetcode?: { id: number; title: string; slug: string }[];
  inputs: InputField[];
  presets?: Preset[];
}

export interface AlgorithmModule {
  meta: AlgorithmMeta;
  /** nguồn impl.ts (hiển thị trong CodePane) */
  source: string;
  /** nội dung markdown tab Học */
  content: string;
  /** nội dung markdown tab Phỏng vấn */
  interview: string;
  /** generator sinh frame; return giá trị cuối */
  trace: (input: Record<string, unknown>) => Generator<Frame, unknown>;
  /** hàm thuần để chạy trên Node / test */
  run: (input: Record<string, unknown>) => unknown;
}
