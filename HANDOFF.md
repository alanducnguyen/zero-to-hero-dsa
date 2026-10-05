# HANDOFF – trạng thái dự án & việc tiếp theo

> Cập nhật file này sau mỗi đợt commit. Phiên mới: đọc CLAUDE.md rồi file này, tiếp tục từ mục "Việc tiếp theo".

## Mục tiêu (đã chốt với chủ repo)
- Website học DSA tiếng Việt, 4 cấp (Cơ bản / Middle / Nâng cao / Siêu cấp), phục vụ phỏng vấn big tech.
- Mỗi bài: phân tích chi tiết, tradeoff, lợi/hại, use case thực tế, code TS/Node, chế độ Debug line-by-line có visual.
- Stack: Vite + React 19 + TS + Tailwind v4, static site, deploy GitHub Pages.
- Phiên bản đầu: framework + 12 thuật toán (3 bài/cấp). Ngân sách hạn chế → commit theo từng đợt nhỏ.

## Đã xong
- [x] Scaffold, engine trace/frame, 8 visualizer, debugger panel (breakpoint, step, play, timeline, biến, call stack, input form + preset), layout, trang chủ, trang cấp độ, trang thuật toán 4 tab, search ⌘K, tiến độ localStorage, dark mode, responsive, Node runner.
- [x] Bài 1: `basic/bubble-sort` (mẫu chuẩn để copy).

## Danh sách 12 bài phiên bản đầu
| Cấp | id | visualizer | trạng thái |
|---|---|---|---|
| basic | bubble-sort | array bars | ✅ |
| basic | binary-search | array + ranges | ✅ |
| basic | valid-parentheses | stackqueue | ✅ |
| intermediate | longest-substring-no-repeat (sliding window) | composite array+map | ✅ |
| intermediate | quick-sort | array + callStack | ✅ |
| intermediate | reverse-linked-list | linkedlist | ✅ |
| advanced | bfs-grid-shortest-path | matrix | ✅ |
| advanced | dijkstra | composite graph+matrix(dist) | ✅ |
| advanced | kth-largest-heap | heap | ✅ |
| expert | edit-distance | matrix | ✅ |
| expert | trie | tree | ⬜ |
| expert | largest-rectangle-histogram (monotonic stack) | composite array+stackqueue | ⬜ |

## Việc tiếp theo (theo thứ tự)
1. Viết các bài còn lại theo bảng trên, mỗi cấp 1 commit. Cập nhật bảng này.
2. `.github/workflows/deploy.yml` deploy GitHub Pages (build `pnpm build`, upload `dist`). README hướng dẫn.
3. Kiểm tra UI bằng Playwright ở 1440px và 390px, dark mode.
4. Đợt sau (ngoài phạm vi phiên bản đầu): Linear Search, Selection/Insertion Sort, Two Sum sorted, Merge Sort, Tree DFS/BFS, Topological Sort, N-Queens, House Robber, Union-Find, Bit Manipulation, Kadane/Prefix Sum.

## Lưu ý kỹ thuật đã gặp
- TypeScript phải là bản 5 (typescript-eslint chưa hỗ trợ TS 7).
- Tailwind v4 dùng `@theme static` để các biến `--color-*` dùng được trong `style={{}}` inline.
- eslint `react-hooks/set-state-in-effect` cấm setState trong effect → xử lý trong handler.
- Playwright: dùng `executablePath: '/opt/pw-browsers/chromium'`, không chạy `playwright install`.
