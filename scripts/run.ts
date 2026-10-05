/**
 * Chạy một thuật toán trên Node với input mẫu: `pnpm algo <id>`
 * Ví dụ: pnpm algo bubble-sort
 */
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const id = process.argv[2];
const root = join(import.meta.dirname, '..', 'src', 'algorithms');
const levels = readdirSync(root);
const all = levels.flatMap((l) => readdirSync(join(root, l)).map((a) => ({ level: l, id: a })));

if (!id || !all.some((a) => a.id === id)) {
  console.log('Cách dùng: pnpm algo <id>\nCác thuật toán có sẵn:');
  for (const a of all) console.log(`  ${a.id.padEnd(28)} (${a.level})`);
  process.exit(id ? 1 : 0);
}

const dir = join(root, all.find((a) => a.id === id)!.level, id);
const meta = (await import(pathToFileURL(join(dir, 'meta.ts')).href)).meta;
const impl = await import(pathToFileURL(join(dir, 'impl.ts')).href);
const fnName = Object.keys(impl).find((k) => typeof impl[k] === 'function')!;
const input: Record<string, unknown> = {};
for (const f of meta.inputs) input[f.key] = f.default;
const args = meta.inputs.map((f: { key: string }) => input[f.key]);

console.log(`▶ ${meta.title}  (${fnName})`);
console.log('Input :', JSON.stringify(input));
const t0 = performance.now();
const out = existsSync(join(dir, 'node.ts')) ? (await import(pathToFileURL(join(dir, 'node.ts')).href)).run(input) : impl[fnName](...args);
console.log('Output:', JSON.stringify(out));
console.log(`⏱ ${(performance.now() - t0).toFixed(3)} ms`);
