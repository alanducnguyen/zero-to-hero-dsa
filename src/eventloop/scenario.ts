/**
 * DSL mô tả kịch bản event loop. Không thông dịch JS tuỳ ý: từ DSL sinh ra
 * (1) source JS hiển thị trong CodePane và (2) cây Op có số dòng để trace highlight đúng.
 */
export type Op =
  | { kind: 'log'; msg: string; line: number }
  | { kind: 'timeout'; delay: number; label: string; body: Op[]; line: number; endLine: number }
  | { kind: 'immediate'; label: string; body: Op[]; line: number; endLine: number }
  | { kind: 'nextTick'; label: string; body: Op[]; line: number; endLine: number }
  | { kind: 'then'; label: string; body: Op[]; line: number; endLine: number }
  | { kind: 'io'; delay: number; label: string; body: Op[]; line: number; endLine: number }
  | { kind: 'block'; ms: number; line: number };

/** Dạng viết tay (không có số dòng). */
export type OpSpec =
  | { kind: 'log'; msg: string }
  | { kind: 'timeout'; delay: number; label: string; body: OpSpec[] }
  | { kind: 'immediate'; label: string; body: OpSpec[] }
  | { kind: 'nextTick'; label: string; body: OpSpec[] }
  | { kind: 'then'; label: string; body: OpSpec[] }
  | { kind: 'io'; delay: number; label: string; body: OpSpec[] }
  | { kind: 'block'; ms: number };

export interface Scenario {
  id: string;
  title: string;
  description: string;
  /** Kết quả giữa setTimeout(0) và setImmediate ở main module có thể đảo ngoài đời thật */
  nondeterministic?: boolean;
  ops: OpSpec[];
}

export interface Generated {
  source: string;
  ops: Op[];
  /** dòng cuối của script (để highlight khi main kết thúc) */
  lastLine: number;
}

const usesIO = (ops: OpSpec[]): boolean => ops.some((o) => o.kind === 'io' || ('body' in o && usesIO(o.body)));

/** Sinh source JS + cây Op có số dòng. */
export function generate(scenario: Scenario): Generated {
  const lines: string[] = [];
  if (usesIO(scenario.ops)) {
    lines.push("const fs = require('fs');", '');
  }
  const emit = (specs: OpSpec[], indent: string): Op[] =>
    specs.map((spec): Op => {
      const line = lines.length + 1;
      switch (spec.kind) {
        case 'log':
          lines.push(`${indent}console.log('${spec.msg}');`);
          return { kind: 'log', msg: spec.msg, line };
        case 'block':
          lines.push(`${indent}const end = Date.now() + ${spec.ms}; while (Date.now() < end) {} // chặn ${spec.ms}ms`);
          return { kind: 'block', ms: spec.ms, line };
        case 'timeout': {
          lines.push(`${indent}setTimeout(() => {`);
          const body = emit(spec.body, indent + '  ');
          lines.push(`${indent}}, ${spec.delay});`);
          return { kind: 'timeout', delay: spec.delay, label: spec.label, body, line, endLine: lines.length };
        }
        case 'immediate': {
          lines.push(`${indent}setImmediate(() => {`);
          const body = emit(spec.body, indent + '  ');
          lines.push(`${indent}});`);
          return { kind: 'immediate', label: spec.label, body, line, endLine: lines.length };
        }
        case 'nextTick': {
          lines.push(`${indent}process.nextTick(() => {`);
          const body = emit(spec.body, indent + '  ');
          lines.push(`${indent}});`);
          return { kind: 'nextTick', label: spec.label, body, line, endLine: lines.length };
        }
        case 'then': {
          lines.push(`${indent}Promise.resolve().then(() => {`);
          const body = emit(spec.body, indent + '  ');
          lines.push(`${indent}});`);
          return { kind: 'then', label: spec.label, body, line, endLine: lines.length };
        }
        case 'io': {
          lines.push(`${indent}fs.readFile(__filename, () => {`);
          const body = emit(spec.body, indent + '  ');
          lines.push(`${indent}});`);
          return { kind: 'io', delay: spec.delay, label: spec.label, body, line, endLine: lines.length };
        }
      }
    });
  const ops = emit(scenario.ops, '');
  return { source: lines.join('\n') + '\n', ops, lastLine: lines.length };
}
