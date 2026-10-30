/**
 * LFU Cache (LeetCode 460) – loại key ÍT được dùng nhất; hoà thì loại key cũ nhất (LRU).
 * entries: key → { value, freq }
 * buckets: freq → Set các key có tần suất đó. Set của JS giữ thứ tự chèn
 *          ⇒ phần tử đầu Set là key lâu không dùng nhất trong nhóm.
 * minFreq: tần suất nhỏ nhất hiện có ⇒ biết ngay bucket chứa nạn nhân.
 * Mọi thao tác O(1).
 */
export class LFUCache {
  private entries = new Map<number, { value: number; freq: number }>();
  private buckets = new Map<number, Set<number>>();
  private minFreq = 0;

  constructor(readonly capacity: number) {}

  private addToBucket(key: number, freq: number): void {
    let bucket = this.buckets.get(freq);
    if (!bucket) {
      bucket = new Set();
      this.buckets.set(freq, bucket);
    }
    bucket.add(key); // thêm vào CUỐI ⇒ mới dùng nhất trong nhóm
  }

  /** Key vừa được dùng: chuyển từ bucket freq sang freq + 1. */
  private touch(key: number): void {
    const entry = this.entries.get(key)!;
    const bucket = this.buckets.get(entry.freq)!;
    bucket.delete(key);
    if (bucket.size === 0) {
      this.buckets.delete(entry.freq);
      if (this.minFreq === entry.freq) this.minFreq++;
    }
    entry.freq++;
    this.addToBucket(key, entry.freq);
  }

  get(key: number): number {
    const entry = this.entries.get(key);
    if (!entry) return -1;
    this.touch(key);
    return entry.value;
  }

  put(key: number, value: number): void {
    if (this.capacity <= 0) return;
    const entry = this.entries.get(key);
    if (entry) {
      entry.value = value;
      this.touch(key);
      return;
    }
    if (this.entries.size === this.capacity) {
      const bucket = this.buckets.get(this.minFreq)!;
      const victim = bucket.values().next().value!; // LRU trong nhóm ít dùng nhất
      bucket.delete(victim);
      if (bucket.size === 0) this.buckets.delete(this.minFreq);
      this.entries.delete(victim);
    }
    this.entries.set(key, { value, freq: 1 });
    this.addToBucket(key, 1);
    this.minFreq = 1; // key mới luôn có freq 1 – nhỏ nhất có thể
  }
}
