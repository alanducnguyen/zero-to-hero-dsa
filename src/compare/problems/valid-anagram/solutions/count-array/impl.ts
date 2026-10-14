/** Mảng đếm 26 ô cho a–z: cộng theo s, trừ theo t, kiểm tra toàn 0. O(n) thời gian, O(1) bộ nhớ. */
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Array<number>(26).fill(0);
  const A = 'a'.charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - A]++;
    count[t.charCodeAt(i) - A]--;
  }
  return count.every((v) => v === 0);
}
