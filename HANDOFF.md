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
| expert | trie | tree | ✅ |
| expert | largest-rectangle-histogram (monotonic stack) | composite array+stackqueue | ✅ |

## Phiên bản đầu: HOÀN THÀNH (12/12 bài, deploy workflow, README, đã kiểm tra desktop/mobile/dark)

## Việc tiếp theo (theo thứ tự)
1. Chủ repo: merge nhánh `claude/friendly-lovelace-xncix4` vào `main`, import repo vào Vercel (vercel.com/new).
2. Đợt 2 – thêm bài, **mỗi bài một commit riêng** (yêu cầu của chủ repo): Linear Search, Selection/Insertion Sort,
   Two Sum sorted (two pointers), Merge Sort, Tree DFS/BFS, Topological Sort, N-Queens (backtracking),
   House Robber (DP 1D), Union-Find, Bit Manipulation, Kadane/Prefix Sum.
3. Ý tưởng cải tiến UI: nút "so sánh thuật toán" (chạy 2 thuật toán cùng input), lưu input tuỳ chỉnh vào URL,
   trang tổng hợp "cheat sheet" độ phức tạp, mục "lộ trình 4 tuần".

## Quy ước commit (chủ repo yêu cầu)
- Tác giả `@Ethan <alanducnguyen@gmail.com>` (đã set trong git config của repo). KHÔNG thêm Co-Authored-By / dấu vết AI.
- Mỗi thuật toán / module một commit riêng, message tiếng Anh ngắn gọn.

## Lưu ý kỹ thuật đã gặp
- TypeScript phải là bản 5 (typescript-eslint chưa hỗ trợ TS 7).
- Tailwind v4 dùng `@theme static` để các biến `--color-*` dùng được trong `style={{}}` inline.
- eslint `react-hooks/set-state-in-effect` cấm setState trong effect → xử lý trong handler.
- Docker: `Dockerfile` multi-stage (node build → nginx), `docker/nginx.conf` SPA fallback, `docker-compose.yml` có profile `dev`.
- Deploy: Vercel (vercel.json), BrowserRouter + rewrite về index.html. Không dùng GitHub Pages.
- Playwright: dùng `executablePath: '/opt/pw-browsers/chromium'`, không chạy `playwright install`.
