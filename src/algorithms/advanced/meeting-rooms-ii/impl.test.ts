import { describe, it, expect } from 'vitest';
import { minMeetingRooms } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('meeting-rooms-ii', () => {
  it('computes min rooms', () => {
    expect(minMeetingRooms([[0, 30], [5, 10], [15, 20]])).toBe(2);
    expect(minMeetingRooms([[7, 10], [2, 4]])).toBe(1);
    expect(minMeetingRooms([[9, 10], [0, 4], [2, 6], [5, 8], [7, 12], [4, 7]])).toBe(3);
    expect(minMeetingRooms([[1, 5], [2, 6], [3, 7], [4, 8]])).toBe(4);
  });
  it('handles edge cases', () => {
    expect(minMeetingRooms([])).toBe(0);
    expect(minMeetingRooms([[1, 2]])).toBe(1);
    expect(minMeetingRooms([[1, 3], [3, 5], [5, 7]])).toBe(1); // chạm đầu mút không tính trùng
    expect(minMeetingRooms([[1, 4], [1, 4], [1, 4]])).toBe(3);
    expect(minMeetingRooms([[1, 10], [2, 3], [4, 5], [6, 7]])).toBe(2);
  });
  it('does not mutate input', () => {
    const iv = [[5, 10], [0, 30]];
    minMeetingRooms(iv);
    expect(iv).toEqual([[5, 10], [0, 30]]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { intervals: [] },
      { intervals: ['1-4', '1-4', '1-4'] },
      { intervals: ['8-9', '1-10', '2-3', '6-7', '4-5'] },
    ]);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
