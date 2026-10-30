import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { clampCapacity, parseOps, type LFUInput } from './node';

export function* trace(input: LFUInput): Generator<Frame, (number | null)[]> {
  const capacity = clampCapacity(input.capacity);
  const entries = new Map<number, { value: number; freq: number }>();
  const buckets = new Map<number, Set<number>>();
  let minFreq = 0;
  const results: (number | null)[] = [];
  const log: string[] = [];
  const cs: string[] = [];

  const viz = (keyHl: Record<string, Highlight> = {}, bucketHl: Record<string, Highlight> = {}): VisualState => {
    const bEntries: Record<string, string> = {};
    for (const f of [...buckets.keys()].sort((a, b) => a - b)) {
      bEntries[`freq ${f}${f === minFreq ? ' (min)' : ''}`] = [...buckets.get(f)!].join(' → ');
    }
    const eEntries: Record<string, string> = {};
    for (const [k, e] of entries) eEntries[String(k)] = `v=${e.value}, f=${e.freq}`;
    const bh: Record<string, Highlight> = {};
    for (const [f, h] of Object.entries(bucketHl)) bh[`freq ${f}${Number(f) === minFreq ? ' (min)' : ''}`] = h;
    return composite([
      mapViz(entries.size ? eEntries : { '—': 'rỗng' }, keyHl, `entries: key → {value, freq} · ${entries.size}/${capacity}`),
      mapViz(buckets.size ? bEntries : { '—': 'rỗng' }, bh, `buckets: freq → keys (trái = cũ nhất ⇒ bị loại trước) · minFreq = ${minFreq}`),
      arr(log.length ? log : ['—'], { title: 'Kết quả get' }),
    ]);
  };
  const st = () => ({ minFreq, size: entries.size });

  const addToBucket = (key: number, freq: number) => {
    let b = buckets.get(freq);
    if (!b) {
      b = new Set();
      buckets.set(freq, b);
    }
    b.add(key);
  };
  function* touch(key: number) {
    const e = entries.get(key)!;
    const old = e.freq;
    const b = buckets.get(old)!;
    b.delete(key);
    let note = `Key ${key} vừa được dùng ⇒ rời bucket freq ${old}.`;
    if (b.size === 0) {
      buckets.delete(old);
      if (minFreq === old) {
        minFreq++;
        note += ` Bucket rỗng và đó là minFreq ⇒ minFreq = ${minFreq}. Chỉ cần +1 vì key này sắp vào đúng bucket ${old + 1}, nên bucket đó chắc chắn không rỗng.`;
      } else note += ` Bucket rỗng ⇒ xoá luôn để không giữ rác.`;
    }
    yield frame(32, { key, freq: old, ...st() }, viz({ [String(key)]: 'compare' }), note, { callStack: [...cs, `touch(${key})`] });
    e.freq++;
    addToBucket(key, e.freq);
    yield frame(35, { key, freq: e.freq, ...st() }, viz({ [String(key)]: 'swap' }, { [String(e.freq)]: 'swap' }), `freq ${key}: ${old} → ${e.freq}. Thêm vào CUỐI Set của bucket ${e.freq}: Set giữ thứ tự chèn ⇒ key này là "mới dùng nhất" trong nhóm cùng tần suất (LRU để phá hoà).`, { callStack: [...cs, `touch(${key})`] });
  }

  yield frame(14, { capacity, ...st() }, viz(), `Cache rỗng. entries tra cứu O(1); buckets nhóm key theo tần suất; minFreq chỉ thẳng tới bucket chứa nạn nhân ⇒ không phải quét tìm min.`);
  for (const o of parseOps(input.ops)) {
    if (o.op === 'get') {
      cs.push(`get(${o.key})`);
      const e = entries.get(o.key);
      if (!e) {
        results.push(-1);
        log.push(`get ${o.key} → -1`);
        yield frame(40, { key: o.key, ...st() }, viz(), `get(${o.key}): không có trong entries ⇒ -1. Miss KHÔNG tăng tần suất của ai.`, { callStack: [...cs] });
        cs.pop();
        continue;
      }
      yield frame(39, { key: o.key, value: e.value, freq: e.freq }, viz({ [String(o.key)]: 'compare' }, { [String(e.freq)]: 'compare' }), `get(${o.key}): có, value = ${e.value}, freq = ${e.freq}. Mỗi lần đọc cũng là một lần "dùng" ⇒ phải tăng tần suất.`, { callStack: [...cs] });
      yield* touch(o.key);
      results.push(e.value);
      log.push(`get ${o.key} → ${e.value}`);
      yield frame(42, { key: o.key, value: e.value, ...st() }, viz({ [String(o.key)]: 'done' }), `Trả về ${e.value}.`, { callStack: [...cs] });
      cs.pop();
    } else {
      cs.push(`put(${o.key}, ${o.value})`);
      const e = entries.get(o.key);
      if (e) {
        e.value = o.value;
        yield frame(49, { key: o.key, value: o.value, freq: e.freq }, viz({ [String(o.key)]: 'swap' }), `put(${o.key}): key đã có ⇒ chỉ cập nhật value = ${o.value}, KHÔNG loại ai. Ghi đè cũng tính là một lần dùng ⇒ touch.`, { callStack: [...cs] });
        yield* touch(o.key);
        results.push(null);
        cs.pop();
        continue;
      }
      if (entries.size === capacity) {
        const b = buckets.get(minFreq)!;
        const victim = b.values().next().value!;
        yield frame(55, { victim, minFreq, size: entries.size }, viz({ [String(victim)]: 'swap' }, { [String(minFreq)]: 'swap' }), `Đầy (${capacity}) ⇒ nạn nhân nằm trong bucket minFreq = ${minFreq}. Có ${b.size} key cùng tần suất ⇒ phá hoà bằng LRU: lấy phần tử ĐẦU Set (chèn sớm nhất) = key ${victim}.`, { callStack: [...cs] });
        b.delete(victim);
        if (b.size === 0) buckets.delete(minFreq);
        entries.delete(victim);
        yield frame(58, { evicted: victim, size: entries.size }, viz(), `Đã xoá ${victim} khỏi bucket và entries. Không cần sửa minFreq ở đây: ngay sau đây key mới sẽ đặt minFreq = 1.`, { callStack: [...cs] });
      }
      entries.set(o.key, { value: o.value, freq: 1 });
      addToBucket(o.key, 1);
      minFreq = 1;
      results.push(null);
      yield frame(62, { key: o.key, value: o.value, ...st() }, viz({ [String(o.key)]: 'done' }, { '1': 'done' }), `Thêm ${o.key} với freq = 1 vào cuối bucket 1; minFreq = 1 vì không key nào có tần suất nhỏ hơn 1. Key mới là ứng viên bị loại sớm nhất – đúng tinh thần LFU.`, { callStack: [...cs] });
      cs.pop();
    }
  }
  yield frame(63, { results: results.map((r) => r ?? '–'), ...st() }, viz(), `Xong. Mọi thao tác O(1): vài thao tác Map/Set, không duyệt, không sắp xếp.`);
  return results;
}
