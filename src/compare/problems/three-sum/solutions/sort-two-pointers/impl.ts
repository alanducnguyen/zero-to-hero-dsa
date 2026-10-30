/** Sắp xếp, cố định i rồi hai con trỏ trên đoạn sau; nhảy qua giá trị trùng nên không cần Set. O(n²) thời gian, O(1) phụ (ngoài sort). */
export function threeSum(nums: number[]): number[][] {
  const a = [...nums].sort((x, y) => x - y);
  const res: number[][] = [];
  for (let i = 0; i < a.length - 2; i++) {
    if (a[i] > 0) break; // số nhỏ nhất đã > 0 ⇒ không thể tổng 0
    if (i > 0 && a[i] === a[i - 1]) continue; // cùng giá trị cố định ⇒ bộ ba trùng
    let l = i + 1;
    let r = a.length - 1;
    while (l < r) {
      const sum = a[i] + a[l] + a[r];
      if (sum < 0) l++; // cần tổng lớn hơn
      else if (sum > 0) r--; // cần tổng nhỏ hơn
      else {
        res.push([a[i], a[l], a[r]]);
        while (l < r && a[l] === a[l + 1]) l++; // nhảy qua bản sao của a[l]
        while (l < r && a[r] === a[r - 1]) r--;
        l++;
        r--;
      }
    }
  }
  return res;
}
