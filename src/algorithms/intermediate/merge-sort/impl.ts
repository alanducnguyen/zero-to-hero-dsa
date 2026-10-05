/**
 * Merge Sort – chia đôi, sắp xếp từng nửa, rồi trộn hai nửa đã sắp xếp.
 * Stable, luôn O(n log n), cần O(n) bộ nhớ phụ.
 * @param input mảng số
 * @returns mảng mới đã sắp xếp
 */
export function mergeSort(input: number[]): number[] {
  if (input.length <= 1) return input; // 0 hoặc 1 phần tử: đã sắp xếp
  const mid = Math.floor(input.length / 2);
  const left = mergeSort(input.slice(0, mid));
  const right = mergeSort(input.slice(mid));
  return merge(left, right);
}

/** Trộn hai mảng đã sắp xếp thành một mảng sắp xếp. */
function merge(left: number[], right: number[]): number[] {
  const out: number[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      out.push(left[i++]); // <= giữ tính stable
    } else {
      out.push(right[j++]);
    }
  }
  while (i < left.length) out.push(left[i++]); // phần dư bên trái
  while (j < right.length) out.push(right[j++]); // phần dư bên phải
  return out;
}
