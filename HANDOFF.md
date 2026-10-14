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
- Đợt 3: 40 bài (10/cấp) – đã merge (PR #7–#10).
- Trang Nhận diện pattern (PR #11), Node.js Event Loop (PR #12) – đã merge.
- Đợt 4: 52 bài (13/cấp) – 4 PR (#13–#16), đã merge.
- Đợt 5: 64 bài (16/cấp) – 4 PR (#17–#20). Các nhánh đợt 4 + 5 đều tạo từ `main` (40 bài); khi merge cần giữ các bổ sung ở cả `registry.ts`/`patterns.ts`.

| Nhánh | Bài | PR |
|---|---|---|
| `feat/basic-batch-4` | valid-anagram, rotate-array, min-stack | #13 |
| `feat/intermediate-batch-4` | merge-two-sorted-lists, lowest-common-ancestor, group-anagrams | #14 |
| `feat/advanced-batch-4` | longest-common-subsequence, word-break, floyd-warshall | #15 |
| `feat/expert-batch-4` | fenwick-tree, bellman-ford, rabin-karp | #16 |
| `feat/basic-batch-5` | climbing-stairs, majority-element, merge-sorted-arrays | #17 |
| `feat/intermediate-batch-5` | subsets, top-k-frequent, bipartite-check | #18 |
| `feat/advanced-batch-5` | merge-k-sorted-lists, daily-temperatures, counting-bits | #19 |
| `feat/expert-batch-5` | trapping-rain-water, median-two-sorted-arrays, quickselect (+ HANDOFF/README) | #20 |

- Mục **Node.js Event Loop** (`/event-loop`): `src/eventloop/` gồm `scenario.ts` (DSL + sinh code JS có số dòng), `simulate.ts` (mô phỏng libuv: nextTick → microtask → timers → pending → poll (ngủ/tua giờ ảo) → check → close), `presets.ts` (7 kịch bản), `content.md`, `interview.md`, `simulate.test.ts` (**chạy code sinh ra bằng Node thật** và so output). Visual kind mới `eventloop` (`src/visualizers/EventLoopViz.tsx`, dùng container query). Trang `src/pages/EventLoopPage.tsx` tái dùng DebuggerPanel qua AlgorithmModule giả (`inputs: []`). Thêm kịch bản = thêm vào `PRESETS` + test kỳ vọng output.
- Trang **Nhận diện pattern** (`/patterns`, `/patterns/:id`): dữ liệu ở `src/content/patterns.ts` (22 pattern: signals, avoid, steps, template, realWorld, algorithms, leetcode) + `DECISION_TREE`; trang `src/pages/PatternsPage.tsx`; chip pattern trên trang thuật toán; test `patterns.test.ts` bắt buộc mọi thuật toán thuộc ≥ 1 pattern (thêm bài mới ⇒ thêm id vào pattern).

Sửa visualizer trong đợt 3: ArrayViz ô tự giãn theo nhãn dài (PR #8); MatrixViz cột nhãn hàng theo nhãn dài nhất (PR #9).

Kỹ thuật chia commit theo bài khi nhiều bài cùng sửa `registry.ts`/`patterns.ts`: tạm ghi hai file về trạng thái "chỉ có các bài đã commit", `git add` thư mục bài + hai file, commit, rồi khôi phục bản đầy đủ cho bài kế tiếp (script python nhỏ, chạy sau khi đã viết xong cả 3 bài).

## Việc tiếp theo (theo thứ tự)
1. Merge PR #17 → #20; conflict `registry.ts`/`patterns.ts` thì giữ cả hai phía.
2. Sau khi merge xong, chạy `pnpm test` trên `main` (test patterns sẽ bắt lỗi nếu thiếu id khi resolve conflict).
3. Ý tưởng đợt sau: pattern còn ít bài (intervals: insert-interval; fast-slow: middle-of-list; topological-sort: course-schedule; union-find: accounts-merge; greedy: jump-game; sliding-window: minimum-window-substring), hoặc trang "lộ trình 4 tuần".
4. Ý tưởng cải tiến UI: nút "so sánh thuật toán" (chạy 2 thuật toán cùng input), lưu input tuỳ chỉnh vào URL, trang "cheat sheet" độ phức tạp.

## Quy ước git (chủ repo yêu cầu – chi tiết trong CLAUDE.md)
- Nhánh: `feat/...`, `fix/...`, `docs/...`, `chore/...`; KHÔNG dùng `claude/...`.
- Tác giả `@Ethan <alanducnguyen@gmail.com>` (đã set trong git config của repo). KHÔNG thêm Co-Authored-By / dấu vết AI.
- Mỗi thuật toán / module một commit riêng, message tiếng Anh ngắn gọn.

## Lưu ý kỹ thuật đã gặp
- TypeScript phải là bản 5 (typescript-eslint chưa hỗ trợ TS 7).
- Tailwind v4 dùng `@theme static` để các biến `--color-*` dùng được trong `style={{}}` inline.
- eslint `react-hooks/set-state-in-effect` cấm setState trong effect → xử lý trong handler.
- `TreeNode.hidden` (engine/types.ts): node giữ chỗ để cây nhị phân lệch vẽ đúng trái/phải; TreeViz bỏ qua khi vẽ.
- Docker: `Dockerfile` multi-stage (node build → nginx), `docker/nginx.conf` SPA fallback, `docker-compose.yml` có profile `dev`.
- Deploy: Vercel (vercel.json), BrowserRouter + rewrite về index.html. Không dùng GitHub Pages.
- Playwright: dùng `executablePath: '/opt/pw-browsers/chromium'`, không chạy `playwright install`.
