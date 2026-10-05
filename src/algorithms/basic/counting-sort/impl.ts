/**
 * Counting Sort – sắp xếp không so sánh cho số nguyên trong miền nhỏ [0, k].
 * Đếm số lần xuất hiện, cộng dồn, rồi đặt từng phần tử vào đúng vị trí (stable).
 * @param input mảng số nguyên không âm
 * @returns mảng mới đã sắp xếp
 */
export function countingSort(input: number[]): number[] {
  if (input.length === 0) return [];
  const k = Math.max(...input); // giá trị lớn nhất
  const count = new Array<number>(k + 1).fill(0);
  for (const x of input) count[x]++; // đếm tần suất
  for (let v = 1; v <= k; v++) count[v] += count[v - 1]; // cộng dồn: count[v] = số phần tử ≤ v
  const out = new Array<number>(input.length);
  for (let i = input.length - 1; i >= 0; i--) {
    const x = input[i];
    count[x]--; // vị trí cuối còn trống của giá trị x
    out[count[x]] = x; // duyệt ngược để giữ stable
  }
  return out;
}
