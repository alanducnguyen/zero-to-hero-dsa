# Zero to Hero DSA

Website học **Cấu trúc dữ liệu & Giải thuật** bằng tiếng Việt, hướng tới phỏng vấn big tech.
Mỗi thuật toán có phân tích chi tiết, chứng minh đúng, tradeoff, use case thực tế, tab phỏng vấn,
code TypeScript chạy trên Node.js và **chế độ Debug line-by-line** với visualize.

## Tính năng

- **4 cấp độ:** Cơ bản → Middle → Nâng cao → Siêu cấp (3 bài/cấp trong phiên bản đầu, đang mở rộng).
- **Debug line-by-line:** highlight dòng đang chạy, breakpoint, tiến/lùi từng bước, auto-play, timeline,
  biến & call stack thay đổi theo thời gian thực. Phím tắt `←` `→` `Space` `F8`.
- **8 visualizer SVG:** mảng/cột, stack/queue, linked list, cây, đồ thị, ma trận (DP/lưới), heap, hashmap.
- **Input tuỳ chỉnh + preset** cho từng bài (case biên, worst case, ngẫu nhiên).
- Tiến độ học, bookmark (localStorage), dark mode, tìm kiếm `⌘K`, responsive.

## Chạy

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm test         # vitest: impl đúng + trace khớp impl
pnpm build        # typecheck + build static vào dist/
pnpm algo <id>    # chạy thuật toán trên Node, vd: pnpm algo binary-search
```

## Cấu trúc

```
src/engine/        lõi trace/frame (không phụ thuộc React)
src/visualizers/   render SVG cho từng loại VisualState
src/debugger/      UI debug: code pane, controls, biến, input form
src/algorithms/<level>/<id>/
  impl.ts          code sạch, chạy Node
  trace.ts         generator sinh frame cho debugger (line = số dòng trong impl.ts)
  meta.ts          thông tin, độ phức tạp, input schema, preset
  content.md       lý thuyết (tab Học)
  interview.md     tab Phỏng vấn
  impl.test.ts     test
src/content/registry.ts   đăng ký thuật toán
```

Thêm thuật toán mới: copy thư mục `src/algorithms/basic/bubble-sort`, sửa và đăng ký trong `registry.ts`.
Chi tiết trong `CLAUDE.md`.

## Deploy (Vercel)

1. Vào [vercel.com/new](https://vercel.com/new), import repo `zero-to-hero-dsa`.
2. Vercel tự đọc `vercel.json` (framework Vite, build `pnpm test && pnpm build`, output `dist`). Không cần cấu hình thêm.
3. Mỗi push lên `main` sẽ deploy production; mỗi PR có preview URL riêng.

Muốn site riêng tư: Settings → Deployment Protection → bật Password Protection hoặc Vercel Authentication (gói Pro).
