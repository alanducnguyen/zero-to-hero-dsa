# CLAUDE.md – hướng dẫn cho Claude Code khi làm việc với repo này

## Dự án là gì
Website tĩnh học DSA bằng **tiếng Việt** để luyện phỏng vấn big tech. Mỗi thuật toán có:
lý thuyết sâu (content.md), tab Phỏng vấn (interview.md), code TypeScript chạy Node (impl.ts),
và **chế độ Debug line-by-line** (trace.ts sinh frame cho visualizer).

Kế hoạch tổng thể và trạng thái hiện tại: xem `HANDOFF.md` (LUÔN đọc trước khi làm, và cập nhật khi xong việc).

## Lệnh
```bash
pnpm install
pnpm dev            # dev server
pnpm test           # vitest – mọi thuật toán phải pass
pnpm typecheck && pnpm lint && pnpm build   # phải sạch trước khi commit
pnpm algo <id>      # chạy impl trên Node với input mẫu (scripts/run.ts)
```
Kiểm tra UI: `pnpm preview --port 4173` rồi dùng Playwright (Chromium tại /opt/pw-browsers/chromium) chụp
`http://localhost:4173/#/algo/<id>?tab=debug`.

## Kiến trúc
- `src/engine/types.ts` – `Frame`, `VisualState` (array | stackqueue | linkedlist | tree | graph | matrix | heap | map | composite), `AlgorithmModule`, `InputField`.
- `src/engine/helpers.ts` – `frame()`, `arr()`, `hl()`, `hlRange()`, `stack()`, `queue()`, `matrix()`, `mapViz()`, `composite()`.
- `src/engine/runner.ts` – chạy generator → `Frame[]` (giới hạn 4000 frame).
- `src/visualizers/*` – render SVG từng `VisualState`; `index.tsx` là switch.
- `src/debugger/*` – store zustand (`useDebugger`), CodePane (prism, breakpoint), Controls, InputForm, DebuggerPanel.
- `src/content/registry.ts` – **đăng ký module mới ở đây** (thứ tự = thứ tự học). `levels.ts` – 4 cấp.
- `src/algorithms/<level>/<id>/` – mỗi thuật toán 1 thư mục (level: basic | intermediate | advanced | expert).

## Cách thêm một thuật toán (pattern bắt buộc)
Copy cấu trúc `src/algorithms/basic/bubble-sort/`:
1. `impl.ts` – code sạch, JSDoc, **một hàm export** (scripts/run.ts gọi hàm export đầu tiên với các input theo thứ tự `meta.inputs`). Nếu chữ ký hàm không khớp thứ tự inputs, thêm `node.ts` export `run(input)`.
2. `trace.ts` – `export function* trace(input): Generator<Frame, Output>`; mỗi `yield frame(line, vars, visual, note)`.
   **`line` là số dòng trong impl.ts** – dùng `cat -n impl.ts` để lấy số chính xác. Note bằng tiếng Việt, giải thích "tại sao", không chỉ "làm gì".
   Trace phải cho **cùng kết quả** với impl.
3. `meta.ts` – `AlgorithmMeta` (id = tên thư mục, inputs có default nhỏ để ≤ ~300 frame, presets).
4. `content.md` – các section cố định theo thứ tự: Bài toán → Ý tưởng/Trực giác → Thuật toán từng bước → Chứng minh đúng → Độ phức tạp (bảng) → Tradeoff → Lợi/Hại → Use case thực tế → Lỗi thường gặp → Biến thể. 600–1200 từ, dùng `##`.
5. `interview.md` – Cách trình bày → Câu hỏi follow-up → Checklist nhận diện pattern → Bài luyện tập.
6. `index.ts` – import `?raw` cho impl/content/interview, export `AlgorithmModule`.
7. `impl.test.ts` – test impl với case biên + `checkModule(mod, [...])` từ `@/engine/testUtils`.
8. Thêm vào `ALGORITHMS` trong `src/content/registry.ts`.

## Quy ước
- Tiếng Việt có dấu trong UI/nội dung; thuật ngữ kỹ thuật giữ tiếng Anh.
- Màu highlight: compare=vàng, swap=đỏ, done=xanh lá, pointer=xanh dương, visited=xám, active=tím, range=cyan.
- Không commit `dist/`. Commit message tiếng Anh, mô tả rõ. Không đưa tên model vào code/commit.
- Chạy `pnpm test && pnpm typecheck && pnpm lint` trước mỗi commit.
