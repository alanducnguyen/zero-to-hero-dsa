## Đề bài

Cho `beginWord`, `endWord` và danh sách `wordList`. Một **chuỗi biến đổi** là dãy từ `beginWord → s₁ → s₂ → … → endWord` sao cho hai từ liên tiếp khác nhau **đúng một ký tự**, và mọi `sᵢ` (kể cả `endWord`) đều thuộc `wordList`. `beginWord` không cần nằm trong list. Trả về **số từ** trong chuỗi ngắn nhất, hoặc `0` nếu không tồn tại.

```
beginWord = "hit", endWord = "cog"
wordList  = ["hot","dot","dog","lot","log","cog"]
→ 5   (hit → hot → dot → dog → cog)

wordList  = ["hot","dot","dog","lot","log"]
→ 0   ("cog" không có trong list)
```

## Ràng buộc

- `1 ≤ L = beginWord.length ≤ 10`, mọi từ cùng độ dài, chỉ gồm chữ thường.
- `1 ≤ n = wordList.length ≤ 5000`, các từ trong list khác nhau, `beginWord ≠ endWord`.

## Câu hỏi nên hỏi lại người phỏng vấn

- Đếm số **từ** hay số **bước**? (LeetCode đếm từ: hit→hot là 2.)
- `endWord` có chắc trong list không? Nếu không, trả 0 ngay.
- Bảng chữ cái là gì? Chỉ `a–z` thì sinh biến thể rẻ; Unicode thì khác.
- Cần độ dài hay cần in ra mọi đường ngắn nhất (Word Ladder II)?

## Mô hình hoá

Mỗi từ là một đỉnh, hai từ khác đúng một ký tự có cạnh vô hướng, trọng số 1. Bài toán = **đường đi ngắn nhất trên đồ thị không trọng số** ⇒ BFS. Đồ thị là *ngầm*: không ai đưa danh sách cạnh, và cách tìm hàng xóm quyết định độ phức tạp.
