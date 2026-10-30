export interface NetworkInput {
  times: number[][];
  n: number;
  k: number;
}

/** Chuẩn hoá input từ form: n trong [1, 12], k hợp lệ, bỏ cạnh sai định dạng hoặc trọng số âm. */
export function normalize(input: Record<string, unknown>): NetworkInput {
  const n = Math.max(1, Math.min(12, Math.floor(Number(input.n) || 1)));
  const k0 = Math.floor(Number(input.k) || 1);
  const k = k0 >= 1 && k0 <= n ? k0 : 1;
  const ok = (x: number) => Number.isInteger(x) && x >= 1 && x <= n;
  const times = ((input.times as number[][]) ?? [])
    .filter((e) => Array.isArray(e) && e.length >= 3 && ok(e[0]) && ok(e[1]) && Number.isFinite(e[2]) && e[2] >= 0)
    .map((e) => [e[0], e[1], e[2]]);
  return { times, n, k };
}
