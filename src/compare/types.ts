import type { Frame, InputField, Preset } from '@/engine/types';

/** Một lời giải cho bài toán: code + trace riêng, dùng chung input của bài. */
export interface Solution {
  id: string;
  name: string;
  /** 1–2 câu ý tưởng */
  approach: string;
  complexity: { time: string; space: string };
  pros: string[];
  cons: string[];
  /** khi nào nên chọn lời giải này */
  whenToUse: string;
  /** 1 = tối ưu nhất (thứ tự khuyến nghị khi chốt đáp án) */
  rank: number;
  /** impl.ts?raw – hiển thị trong CodePane */
  source: string;
  run: (input: Record<string, unknown>) => unknown;
  trace: (input: Record<string, unknown>) => Generator<Frame, unknown>;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface CompareProblem {
  id: string;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  leetcode: { id: number; slug: string };
  tags: string[];
  /** problem.md – đề bài, ví dụ, ràng buộc */
  statement: string;
  /** input dùng chung cho mọi lời giải */
  inputs: InputField[];
  presets?: Preset[];
  solutions: Solution[];
  /** comparison.md – phân tích so sánh & xếp hạng */
  comparison: string;
  /** interview.md – kịch bản trình bày brute force → tối ưu */
  interview: string;
}
