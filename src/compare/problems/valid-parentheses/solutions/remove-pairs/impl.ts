/** Lặp xoá mọi cặp "()", "[]", "{}" kề nhau tới khi chuỗi không đổi; hợp lệ ⇔ còn lại chuỗi rỗng. O(n²) thời gian. */
export function isValid(s: string): boolean {
  let prev = '';
  while (s !== prev) {
    prev = s;
    s = s.replaceAll('()', ''); // mỗi lần replace quét và tạo chuỗi mới O(n)
    s = s.replaceAll('[]', '');
    s = s.replaceAll('{}', '');
  }
  return s === '';
}
