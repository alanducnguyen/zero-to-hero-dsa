/**
 * Queue bằng hai Stack – amortized O(1) mỗi thao tác.
 * inbox nhận phần tử mới; outbox đảo ngược inbox khi cần lấy ra.
 */
export class QueueTwoStacks<T> {
  private inbox: T[] = [];
  private outbox: T[] = [];

  push(x: T): void {
    this.inbox.push(x); // luôn đẩy vào inbox
  }

  /** Chuyển inbox sang outbox chỉ khi outbox rỗng ⇒ mỗi phần tử được chuyển tối đa 1 lần. */
  private shift(): void {
    if (this.outbox.length === 0) {
      while (this.inbox.length > 0) {
        this.outbox.push(this.inbox.pop()!); // đảo thứ tự: cũ nhất lên đỉnh outbox
      }
    }
  }

  pop(): T | undefined {
    this.shift();
    return this.outbox.pop();
  }

  peek(): T | undefined {
    this.shift();
    return this.outbox[this.outbox.length - 1];
  }

  get size(): number {
    return this.inbox.length + this.outbox.length;
  }
}
