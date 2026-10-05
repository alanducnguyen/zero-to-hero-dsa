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

## Tiến độ
- Phiên bản đầu: 12 bài (3/cấp) – đã merge.
- Đợt 2: 24 bài (6/cấp) – đã merge (PR #3–#6).
- Đợt 3: 40 bài (10/cấp) – 4 PR (#7–#10), mỗi cấp một nhánh, mỗi bài một commit.

| Nhánh đợt 3 | Bài | Trạng thái |
|---|---|---|
| `feat/basic-batch-3` | two-sum-hashmap, counting-sort, prefix-sum, queue-two-stacks | ✅ PR #7 |
| `feat/intermediate-batch-3` | linked-list-cycle (Floyd), lru-cache, bst-operations, number-of-islands (DFS) | ✅ PR #8 |
| `feat/advanced-batch-3` | coin-change, knapsack-01, kruskal-mst, merge-intervals | ✅ PR #9 |
| `feat/expert-batch-3` | sliding-window-maximum (deque), lis-patience, kmp, segment-tree | ✅ PR #10 |

Sửa visualizer trong đợt 3: ArrayViz ô tự giãn theo nhãn dài (PR #8); MatrixViz cột nhãn hàng theo nhãn dài nhất (PR #9).

## Việc tiếp theo (theo thứ tự)
1. Chủ repo: merge nhánh `claude/friendly-lovelace-xncix4` vào `main`, import repo vào Vercel (vercel.com/new).
2. Đợt 3 đã xong. Merge PR #7 → #8 → #9 → #10; conflict ở `registry.ts` hoặc `HANDOFF.md` thì giữ cả hai phía (HANDOFF lấy bản của PR #10).
- Đợt 3: lên 40 bài (10/cấp) – đang làm, mỗi cấp một nhánh/PR, mỗi bài một commit.

| Nhánh đợt 3 | Bài | Trạng thái |
|---|---|---|
| `feat/basic-batch-3` | two-sum-hashmap, counting-sort, prefix-sum, queue-two-stacks | ✅ (PR mở) |
| `feat/intermediate-batch-3` | linked-list-cycle (Floyd), lru-cache, bst-operations, number-of-islands (DFS) | ⬜ |
| `feat/advanced-batch-3` | coin-change, knapsack-01, kruskal-mst, merge-intervals | ⬜ |
| `feat/expert-batch-3` | sliding-window-maximum (deque), lis-patience, kmp, segment-tree | ⬜ |

## Việc tiếp theo (theo thứ tự)
1. Chủ repo: merge nhánh `claude/friendly-lovelace-xncix4` vào `main`, import repo vào Vercel (vercel.com/new).
2. Đợt 3: xem bảng trên. Mỗi nhánh tạo từ `origin/main`. Merge PR theo thứ tự cấp; conflict ở registry.ts hoặc HANDOFF.md thì giữ cả hai phía.
3. Ý tưởng cải tiến UI: nút "so sánh thuật toán" (chạy 2 thuật toán cùng input), lưu input tuỳ chỉnh vào URL,
   trang tổng hợp "cheat sheet" độ phức tạp, mục "lộ trình 4 tuần".

## Quy ước git (chủ repo yêu cầu – chi tiết trong CLAUDE.md)
- Nhánh: `feat/...`, `fix/...`, `docs/...`, `chore/...`; KHÔNG dùng `claude/...`.
- Tác giả `@Ethan <alanducnguyen@gmail.com>` (đã set trong git config của repo). KHÔNG thêm Co-Authored-By / dấu vết AI.
- Mỗi thuật toán / module một commit riêng, message tiếng Anh ngắn gọn.
- Lịch sử hiện tại nằm trên nhánh `claude/friendly-lovelace-xncix4` (tạo trước khi có quy ước); chủ repo merge vào `main` rồi xoá.

## Lưu ý kỹ thuật đã gặp
- TypeScript phải là bản 5 (typescript-eslint chưa hỗ trợ TS 7).
- Tailwind v4 dùng `@theme static` để các biến `--color-*` dùng được trong `style={{}}` inline.
- eslint `react-hooks/set-state-in-effect` cấm setState trong effect → xử lý trong handler.
- `TreeNode.hidden` (engine/types.ts): node giữ chỗ để cây nhị phân lệch vẽ đúng trái/phải; TreeViz bỏ qua khi vẽ.
- Docker: `Dockerfile` multi-stage (node build → nginx), `docker/nginx.conf` SPA fallback, `docker-compose.yml` có profile `dev`.
- Deploy: Vercel (vercel.json), BrowserRouter + rewrite về index.html. Không dùng GitHub Pages.
- Playwright: dùng `executablePath: '/opt/pw-browsers/chromium'`, không chạy `playwright install`.
