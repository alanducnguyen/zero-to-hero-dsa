## Đề bài

Cho chuỗi `s` và từ điển `wordDict` (danh sách từ). Trả về `true` nếu `s` có thể được cắt thành một dãy **một hoặc nhiều** từ trong từ điển (mỗi từ được dùng lại nhiều lần), ngược lại `false`.

```
s = "leetcode",      wordDict = ["leet", "code"]                    →  true   ("leet" + "code")
s = "applepenapple", wordDict = ["apple", "pen"]                    →  true   (dùng lại "apple")
s = "catsandog",     wordDict = ["cats", "dog", "sand", "and", "cat"] →  false
```

## Ràng buộc

- `1 ≤ |s| ≤ 300`, `1 ≤ |wordDict| ≤ 1000`, mỗi từ dài `1..20`, chỉ chữ thường, các từ khác nhau.
- |s| = 300 khiến đệ quy thuần (O(2ⁿ) worst case) chắc chắn TLE với input kiểu `"aaaa…ab"`.
- Trong bản mô phỏng, `s` bị cắt còn tối đa 12 ký tự và từ điển tối đa 6 từ để đệ quy thuần không vượt 4000 frame.

## Câu hỏi nên hỏi lại người phỏng vấn

- Một từ có được dùng nhiều lần không? (Có.)
- Chuỗi rỗng tính là cắt được không? (Theo quy ước DP: có.)
- Chỉ cần true/false, hay cần **liệt kê mọi cách cắt** (Word Break II)? Hay **số cách cắt**?
- Từ điển lớn cỡ nào so với `s`? (Quyết định dùng Set hay Trie.)
