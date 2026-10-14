/**
 * Min Stack – push/pop/top/getMin đều O(1).
 * Stack phụ `mins` lưu min hiện tại tại mỗi mức: đỉnh mins luôn là min của toàn stack.
 */
export class MinStack {
  readonly data: number[] = [];
  readonly mins: number[] = [];

  push(x: number): void {
    this.data.push(x);
    const m = this.mins.length ? Math.min(x, this.mins[this.mins.length - 1]) : x;
    this.mins.push(m); // min mới = min(x, min cũ)
  }

  pop(): number | undefined {
    this.mins.pop(); // hai stack luôn cùng chiều cao
    return this.data.pop();
  }

  top(): number | undefined {
    return this.data[this.data.length - 1];
  }

  getMin(): number | undefined {
    return this.mins[this.mins.length - 1];
  }
}
