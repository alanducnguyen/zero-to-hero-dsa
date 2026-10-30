import { findOrder } from './impl';

export interface CInput { numCourses: number; prerequisites: string[] }

/**
 * Chuẩn hoá input: "b->a" (học b trước a) ⇒ cặp [a, b] theo định dạng LeetCode.
 * Bỏ qua chuỗi sai định dạng hoặc số môn ngoài phạm vi 0..numCourses-1.
 */
export function parse(input: CInput): { numCourses: number; prerequisites: number[][] } {
  const numCourses = Math.max(0, Math.floor(Number(input.numCourses) || 0));
  const prerequisites: number[][] = [];
  for (const raw of input.prerequisites) {
    const m = /^\s*(\d+)\s*(?:->|-|,|>)\s*(\d+)\s*$/.exec(raw);
    if (!m) continue;
    const b = Number(m[1]), a = Number(m[2]);
    if (a >= numCourses || b >= numCourses) continue;
    prerequisites.push([a, b]);
  }
  return { numCourses, prerequisites };
}

export const run = (input: CInput) => {
  const { numCourses, prerequisites } = parse(input);
  return findOrder(numCourses, prerequisites);
};
