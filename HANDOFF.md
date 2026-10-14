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

| Mốc | Nội dung | Trạng thái |
|---|---|---|
| Phiên bản đầu | 12 bài (3/cấp), engine, debugger, UI | ✅ merged |
| Đợt 2 (PR #3–#6) | 24 bài (6/cấp) | ✅ merged |
| Đợt 3 (PR #7–#10) | 40 bài (10/cấp) | ✅ merged |
| PR #11 | Trang Nhận diện pattern (22 pattern) | ✅ merged |
| PR #12 | Node.js Event Loop (7 kịch bản) | ✅ merged |
| Đợt 4 (PR #13–#16) | 52 bài (13/cấp) | ✅ merged |
| Đợt 5 (PR #17–#20) | 64 bài (16/cấp) | ✅ merged |
| PR #21 | Mục Nhiều lời giải – pilot 10 bài, 36 lời giải | ⏳ PR mở, chưa merge |

`main` hiện có **64 bài** cùng trang pattern và Node.js Event Loop. PR #21 bổ sung mục Nhiều lời giải.

| PR | Nhánh | Bài |
|---|---|---|
| #13 | `feat/basic-batch-4` | valid-anagram, rotate-array, min-stack |
| #14 | `feat/intermediate-batch-4` | merge-two-sorted-lists, lowest-common-ancestor, group-anagrams |
| #15 | `feat/advanced-batch-4` | longest-common-subsequence, word-break, floyd-warshall |
| #16 | `feat/expert-batch-4` | fenwick-tree, bellman-ford, rabin-karp |
| #17 | `feat/basic-batch-5` | climbing-stairs, majority-element, merge-sorted-arrays |
| #18 | `feat/intermediate-batch-5` | subsets, top-k-frequent, bipartite-check |
| #19 | `feat/advanced-batch-5` | merge-k-sorted-lists, daily-temperatures, counting-bits |
| #20 | `feat/expert-batch-5` | trapping-rain-water, median-two-sorted-arrays, quickselect |
| #21 | `feat/compare-solutions` | compare: two-sum, kth-largest, valid-anagram, majority-element, max-subarray, fibonacci, trapping-rain-water, find-duplicate, longest-palindromic-substring, merge-k-sorted |

### Các mục ngoài DSA
- **Node.js Event Loop** (`/event-loop`): `src/eventloop/` gồm `scenario.ts` (DSL + sinh code JS có số dòng), `simulate.ts` (mô phỏng libuv: nextTick → microtask → timers → pending → poll (ngủ/tua giờ ảo) → check → close), `presets.ts` (7 kịch bản), `content.md`, `interview.md`, `simulate.test.ts` (**chạy code sinh ra bằng Node thật** và so output). Visual kind `eventloop` (`src/visualizers/EventLoopViz.tsx`). Trang `src/pages/EventLoopPage.tsx` tái dùng DebuggerPanel qua AlgorithmModule giả (`inputs: []`). Thêm kịch bản = thêm vào `PRESETS` + test kỳ vọng output.
- **Nhận diện pattern** (`/patterns`, `/patterns/:id`): `src/content/patterns.ts` (22 pattern: signals, avoid, steps, template, realWorld, algorithms, leetcode) + `DECISION_TREE`; trang `src/pages/PatternsPage.tsx`; chip pattern trên trang thuật toán; test `patterns.test.ts` bắt buộc mọi thuật toán thuộc ≥ 1 pattern (thêm bài mới ⇒ thêm id vào pattern).
- **Nhiều lời giải** (`/compare`, `/compare/:id`): một bài toán – nhiều cách giải, so sánh và xếp hạng, **mỗi lời giải có Debug trace riêng**. `src/compare/`: `types.ts` (`CompareProblem`, `Solution` có `rank` 1 = tối ưu, `source`, `run`, `trace`), `toModule.ts` (gói solution thành `AlgorithmModule` cho `DebuggerPanel`/`checkModule`), `registry.ts` (`PROBLEMS`), `problems/<id>/{problem.md, comparison.md, interview.md, index.ts, solutions/<sol>/{impl.ts, trace.ts}}`. Trang `src/pages/ComparePage.tsx`: tab Đề bài / Lời giải (sub-tab theo thứ tự trình bày brute → tối ưu, `?tab=solutions&sol=<id>`) / So sánh & xếp hạng (bảng tự sinh từ `solutions` + markdown) / Phỏng vấn. Test `src/compare/registry.test.ts`: cấu trúc, mỗi solution `checkModule`, và **mọi solution cho cùng kết quả** trên default + presets (dùng hàm `norm` trong `index.ts` để chuẩn hoá input/kết quả khi cần). Thêm bài = copy `problems/two-sum/`, import vào `PROBLEMS`; nếu id trùng id thuật toán thì trang thuật toán tự hiện link "so sánh nhiều lời giải". ⌘K (`SearchDialog.tsx`) index cả algorithms, problems, patterns, event loop.

Sửa visualizer: ArrayViz ô tự giãn theo nhãn dài (PR #8); MatrixViz cột nhãn hàng theo nhãn dài nhất (PR #9).

## Việc tiếp theo cho phiên sau (theo thứ tự ưu tiên)
0. **Đọc CLAUDE.md, rồi file này.** Kiểm tra PR #21 đã merge chưa; nếu chưa, tiếp tục compare đợt 2 ở nhánh riêng từ `origin/main` hoặc chờ chủ repo merge.
1. **Dọn sau merge** (nhánh `chore/post-merge`): kiểm tra README nói 64 bài; `/compare` link chéo – id compare `merge-k-sorted` và `kth-largest` không trùng id thuật toán `merge-k-sorted-lists`, `kth-largest-heap` ⇒ cân nhắc đổi id compare cho khớp (sửa thư mục + `id` + registry; URL cũ sẽ đổi).
2. **Compare đợt 2** (nhánh `feat/compare-batch-2`, 10 bài, mỗi bài 1 commit `Add compare: <Title>`): 3sum (brute / sort+two pointers ★ / hashset), longest-increasing-subsequence (brute / DP O(n²) / patience O(n log n) ★), coin-change (đệ quy / memo / bottom-up ★ / BFS), lru-cache (array / Map thứ tự chèn ★ / doubly linked list + map), course-schedule (DFS 3 màu / Kahn ★), word-ladder (DFS / BFS ★ / bidirectional BFS), min-stack (hai stack ★ / stack cặp / stack chênh lệch), product-except-self (chia / prefix+suffix / prefix+suffix O(1) ★), search-rotated-array (sort / tìm pivot + nhị phân / nhị phân một lượt ★), number-of-islands (DFS ★ / BFS / Union-Find). Mẫu: `src/compare/problems/two-sum/`. Mỗi lời giải impl ≤ 25 dòng, trace ≤ ~300 frame, note tiếng Việt "tại sao".
3. **Đợt 6 thuật toán** (nếu còn budget): pattern còn ít bài – insert-interval (intervals), middle-of-list (fast-slow), course-schedule (topological-sort), accounts-merge (union-find), jump-game (greedy), minimum-window-substring (sliding-window). Quy trình như đợt 4/5: mỗi cấp một nhánh `feat/<level>-batch-6`, mỗi bài một commit, gắn pattern, test, Playwright, PR.
4. **Ý tưởng UI**: cheat sheet độ phức tạp (bảng tổng hợp từ `meta.complexity`), lộ trình 4 tuần, lưu input tuỳ chỉnh vào URL, nút "so sánh 2 thuật toán cùng input".

## Quy trình & mẹo đã dùng (tái dùng cho phiên sau)
- Nhánh mới luôn từ `origin/main`: `git checkout -b feat/<x> origin/main`.
- **Mỗi bài một commit** kể cả khi nhiều bài cùng sửa `registry.ts`/`patterns.ts`: viết xong cả batch, rồi với từng bài: tạm ghi hai file về trạng thái "chỉ gồm các bài đã commit" (xoá import/phần tử/id của các bài sau), `git add` thư mục bài + hai file, commit, khôi phục bản đầy đủ. Script python ~20 dòng, chạy `git commit --author="Ethan <alanducnguyen@gmail.com>"`.
- Chụp UI: `pnpm build && (pnpm preview --port 4173 --strictPort > /dev/null 2>&1 &)`, script Playwright phải **đặt trong repo** (vd `./.shot.mjs`, xoá sau) để resolve được package `playwright`; dùng `executablePath: '/opt/pw-browsers/chromium'`, bấm `ArrowRight` vài lần rồi `screenshot`. Preview cũ chết thì chạy lại lệnh trên, không `pkill` trong cùng shell.
- Lint: React Compiler cấm `useMemo` với dependency là object dẫn xuất (`react-hooks/preserve-manual-memoization`) – bỏ `useMemo`, dùng `key=` để remount.
- PR body tiếng Việt, không footer AI; mô tả bảng bài/visualizer/pattern + kết quả kiểm tra + lưu ý conflict.

## Quy ước git (chủ repo yêu cầu – chi tiết trong CLAUDE.md)
- Nhánh: `feat/...`, `fix/...`, `docs/...`, `chore/...`; KHÔNG dùng `claude/...`.
- Tác giả `@Ethan <alanducnguyen@gmail.com>`. KHÔNG thêm Co-Authored-By / dấu vết AI.
- Mỗi thuật toán / module một commit riêng, message tiếng Anh ngắn gọn.

## Lưu ý kỹ thuật đã gặp
- TypeScript phải là bản 5 (typescript-eslint chưa hỗ trợ TS 7).
- Tailwind v4 dùng `@theme static` để các biến `--color-*` dùng được trong `style={{}}` inline.
- eslint `react-hooks/set-state-in-effect` cấm setState trong effect → xử lý trong handler.
- `TreeNode.hidden` (engine/types.ts): node giữ chỗ để cây nhị phân lệch vẽ đúng trái/phải; TreeViz bỏ qua khi vẽ.
- Docker: `Dockerfile` multi-stage (node build → nginx), `docker/nginx.conf` SPA fallback, `docker-compose.yml` có profile `dev`.
- Deploy: Vercel (vercel.json), BrowserRouter + rewrite về index.html. Không dùng GitHub Pages.
- Playwright: dùng `executablePath: '/opt/pw-browsers/chromium'`, không chạy `playwright install`.
