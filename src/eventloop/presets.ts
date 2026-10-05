import type { Scenario } from './scenario';

export const PRESETS: Scenario[] = [
  {
    id: 'classic-order',
    title: 'Thứ tự kinh điển',
    description: 'sync → nextTick → promise → timers → check. Câu hỏi phỏng vấn số 1 về Node.',
    nondeterministic: true,
    ops: [
      { kind: 'log', msg: 'start' },
      { kind: 'timeout', delay: 0, label: 'timeout', body: [{ kind: 'log', msg: 'timeout' }] },
      { kind: 'immediate', label: 'immediate', body: [{ kind: 'log', msg: 'immediate' }] },
      { kind: 'nextTick', label: 'nextTick', body: [{ kind: 'log', msg: 'nextTick' }] },
      { kind: 'then', label: 'promise', body: [{ kind: 'log', msg: 'promise' }] },
      { kind: 'log', msg: 'end' },
    ],
  },
  {
    id: 'nexttick-vs-promise',
    title: 'nextTick vs promise lồng nhau',
    description: 'nextTick trong promise và promise trong nextTick: ai chạy trước?',
    ops: [
      { kind: 'then', label: 'p1', body: [
        { kind: 'log', msg: 'p1' },
        { kind: 'nextTick', label: 'tick-in-p1', body: [{ kind: 'log', msg: 'tick trong p1' }] },
      ] },
      { kind: 'nextTick', label: 't1', body: [
        { kind: 'log', msg: 't1' },
        { kind: 'then', label: 'p-in-t1', body: [{ kind: 'log', msg: 'promise trong t1' }] },
      ] },
      { kind: 'then', label: 'p2', body: [{ kind: 'log', msg: 'p2' }] },
      { kind: 'nextTick', label: 't2', body: [{ kind: 'log', msg: 't2' }] },
      { kind: 'log', msg: 'sync' },
    ],
  },
  {
    id: 'inside-io',
    title: 'Trong I/O callback: immediate luôn trước timeout',
    description: 'Ngoài script chính thì không xác định, nhưng trong I/O callback thì setImmediate luôn chạy trước setTimeout(0).',
    ops: [
      { kind: 'log', msg: 'start' },
      { kind: 'io', delay: 5, label: 'readFile', body: [
        { kind: 'log', msg: 'io done' },
        { kind: 'timeout', delay: 0, label: 'timeout-in-io', body: [{ kind: 'log', msg: 'timeout' }] },
        { kind: 'immediate', label: 'immediate-in-io', body: [{ kind: 'log', msg: 'immediate' }] },
      ] },
      { kind: 'log', msg: 'end' },
    ],
  },
  {
    id: 'blocking',
    title: 'Code chặn làm timer trễ',
    description: 'setTimeout(100) nhưng thread chính bận 200ms ⇒ callback chạy muộn. Timer là "không sớm hơn", không phải "đúng lúc".',
    ops: [
      { kind: 'log', msg: 'start' },
      { kind: 'timeout', delay: 100, label: 'timer100', body: [{ kind: 'log', msg: 'timer 100ms' }] },
      { kind: 'block', ms: 200 },
      { kind: 'log', msg: 'end' },
    ],
  },
  {
    id: 'many-timers',
    title: 'Nhiều timer: theo hết hạn, rồi theo thứ tự đăng ký',
    description: 'Timer 50, 10, 30, 10 ⇒ 10 (a), 10 (b), 30, 50. Event loop ngủ giữa các mốc.',
    ops: [
      { kind: 'timeout', delay: 50, label: 't50', body: [{ kind: 'log', msg: 't50' }] },
      { kind: 'timeout', delay: 10, label: 't10a', body: [{ kind: 'log', msg: 't10a' }] },
      { kind: 'timeout', delay: 30, label: 't30', body: [{ kind: 'log', msg: 't30' }] },
      { kind: 'timeout', delay: 10, label: 't10b', body: [{ kind: 'log', msg: 't10b' }] },
      { kind: 'log', msg: 'sync' },
    ],
  },
  {
    id: 'microtask-starvation',
    title: 'Microtask "bỏ đói" timer',
    description: 'Promise liên tục sinh promise mới ⇒ event loop không bao giờ tới phase timers cho tới khi microtask queue cạn.',
    ops: [
      { kind: 'timeout', delay: 0, label: 'timeout', body: [{ kind: 'log', msg: 'timeout' }] },
      { kind: 'then', label: 'p1', body: [
        { kind: 'log', msg: 'p1' },
        { kind: 'then', label: 'p2', body: [
          { kind: 'log', msg: 'p2' },
          { kind: 'then', label: 'p3', body: [{ kind: 'log', msg: 'p3' }] },
        ] },
      ] },
      { kind: 'log', msg: 'sync' },
    ],
  },
  {
    id: 'multi-iteration',
    title: 'Vòng lặp quay nhiều vòng',
    description: 'Timer đặt immediate và timer mới; immediate chạy ngay vòng này (phase check), timer mới phải chờ vòng sau.',
    ops: [
      { kind: 'timeout', delay: 0, label: 'A', body: [
        { kind: 'log', msg: 'A' },
        { kind: 'immediate', label: 'B', body: [{ kind: 'log', msg: 'B (immediate trong A)' }] },
        { kind: 'timeout', delay: 0, label: 'C', body: [{ kind: 'log', msg: 'C (timeout trong A)' }] },
      ] },
      { kind: 'log', msg: 'sync' },
    ],
  },
];

export const presetById = new Map(PRESETS.map((p) => [p.id, p]));
