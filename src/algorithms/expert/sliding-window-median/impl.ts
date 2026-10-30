/**
 * Sliding Window Median (LeetCode 480) – hai heap + xoá trễ (lazy deletion).
 * low  = max-heap giữ nửa NHỎ của cửa sổ (đỉnh = phần tử lớn nhất nửa dưới).
 * high = min-heap giữ nửa LỚN của cửa sổ (đỉnh = phần tử nhỏ nhất nửa trên).
 * Heap không xoá được phần tử giữa ⇒ ghi vào `delayed`, chỉ thực sự bỏ khi nó lên đỉnh.
 * Thời gian O(n log n), bộ nhớ O(n).
 */
class Heap {
  readonly data: number[] = [];
  constructor(private before: (a: number, b: number) => boolean) {}

  get size(): number {
    return this.data.length;
  }

  peek(): number {
    return this.data[0];
  }

  push(x: number): void {
    const a = this.data;
    a.push(x);
    let i = a.length - 1;
    while (i > 0 && this.before(a[i], a[(i - 1) >> 1])) {
      const p = (i - 1) >> 1;
      [a[i], a[p]] = [a[p], a[i]];
      i = p;
    }
  }

  pop(): number {
    const a = this.data;
    const top = a[0];
    const last = a.pop()!;
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      for (;;) {
        let best = i;
        for (const c of [2 * i + 1, 2 * i + 2]) if (c < a.length && this.before(a[c], a[best])) best = c;
        if (best === i) break;
        [a[i], a[best]] = [a[best], a[i]];
        i = best;
      }
    }
    return top;
  }
}

export function medianSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0 || k > nums.length) return [];
  const low = new Heap((a, b) => a > b); // max-heap: nửa nhỏ
  const high = new Heap((a, b) => a < b); // min-heap: nửa lớn
  const delayed = new Map<number, number>(); // giá trị → số bản sao chờ xoá
  let lowSize = 0; // số phần tử HỢP LỆ trong low (không tính bản chờ xoá)
  let highSize = 0;
  const result: number[] = [];

  /** Bỏ các phần tử đã rời cửa sổ đang nằm trên đỉnh heap. */
  const prune = (heap: Heap): void => {
    while (heap.size > 0 && (delayed.get(heap.peek()) ?? 0) > 0) {
      const x = heap.pop();
      delayed.set(x, delayed.get(x)! - 1);
    }
  };

  /** Giữ lowSize === highSize hoặc lowSize === highSize + 1. */
  const rebalance = (): void => {
    if (lowSize > highSize + 1) {
      high.push(low.pop());
      lowSize--;
      highSize++;
      prune(low);
    } else if (lowSize < highSize) {
      low.push(high.pop());
      highSize--;
      lowSize++;
      prune(high);
    }
  };

  for (let i = 0; i < nums.length; i++) {
    // 1. Thêm phần tử mới vào nửa phù hợp
    if (lowSize === 0 || nums[i] <= low.peek()) {
      low.push(nums[i]);
      lowSize++;
    } else {
      high.push(nums[i]);
      highSize++;
    }
    // 2. Phần tử nums[i - k] rời cửa sổ: đánh dấu xoá trễ
    if (i >= k) {
      const out = nums[i - k];
      delayed.set(out, (delayed.get(out) ?? 0) + 1);
      if (out <= low.peek()) lowSize--;
      else highSize--;
      prune(low);
      prune(high);
    }
    // 3. Cân bằng kích thước hợp lệ rồi đọc trung vị từ đỉnh
    rebalance();
    if (i >= k - 1) {
      result.push(k % 2 === 1 ? low.peek() : (low.peek() + high.peek()) / 2);
    }
  }
  return result;
}
