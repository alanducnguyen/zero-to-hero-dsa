import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  let prefix = 0;
  let minPrefix = 0;
  let best = -Infinity;
  const P: number[] = [0];
  for (let j = 0; j < nums.length; j++) {
    prefix += nums[j];
    P.push(prefix);
    const cand = prefix - minPrefix;
    const improved = cand > best;
    if (improved) best = cand;
    yield frame(8, { j, 'P[j+1]': prefix, minPrefix, 'P[j+1] − minPrefix': cand, best }, composite([arr(nums, { mode: 'bars', highlights: { [j]: 'active' } }), arr(P, { title: 'P (prefix sum), nhãn = số phần tử đã cộng', highlights: { [j + 1]: improved ? 'done' : 'compare', [P.indexOf(minPrefix)]: 'pointer' } }), mapViz({ best, minPrefix }, {}, 'Trạng thái')]), `Đoạn tốt nhất kết thúc tại ${j} = P[${j + 1}] − min(P[0..${j}]) = ${prefix} − (${minPrefix}) = ${cand}.${improved ? ' Cập nhật best.' : ''}`);
    const newMin = Math.min(minPrefix, prefix);
    if (newMin < minPrefix) {
      minPrefix = newMin;
      yield frame(9, { minPrefix }, composite([arr(nums, { mode: 'bars', highlights: { [j]: 'active' } }), arr(P, { title: 'P (prefix sum)', highlights: { [j + 1]: 'pointer' } }), mapViz({ best, minPrefix }, { minPrefix: 'swap' }, 'Trạng thái')]), `P[${j + 1}] = ${prefix} là prefix nhỏ nhất mới – các đoạn sau sẽ trừ nó để được tổng lớn nhất.`);
    } else minPrefix = newMin;
  }
  yield frame(11, { best }, composite([arr(nums, { mode: 'bars' }), arr(P, { title: 'P (prefix sum)' })]), `Kết quả ${best}. Một lượt, chỉ cần nhớ prefix hiện tại và prefix nhỏ nhất.`);
  return best;
}
