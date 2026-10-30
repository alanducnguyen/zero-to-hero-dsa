import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'accounts-merge',
  title: 'Accounts Merge',
  subtitle: 'Gộp tài khoản bằng Union-Find trên email – path compression + union by size',
  level: 'expert',
  category: 'Graph',
  tags: ['union-find', 'dsu', 'graph', 'connected-components', 'hashmap', 'string'],
  companies: ['Meta', 'Google', 'Amazon', 'Microsoft', 'LinkedIn', 'Pinterest'],
  complexity: { time: 'O(E·α(E) + E log E)', space: 'O(E) – E tổng số email', best: 'O(E log E)', worst: 'O(E log E)' },
  leetcode: [
    { id: 721, title: 'Accounts Merge', slug: 'accounts-merge' },
    { id: 547, title: 'Number of Provinces', slug: 'number-of-provinces' },
    { id: 990, title: 'Satisfiability of Equality Equations', slug: 'satisfiability-of-equality-equations' },
    { id: 1202, title: 'Smallest String With Swaps', slug: 'smallest-string-with-swaps' },
  ],
  inputs: [
    {
      key: 'accounts',
      label: 'Mỗi dòng "Tên:email1,email2,..."',
      type: 'string[]',
      default: ['John:js@m,jn@m', 'John:js@m,j0@m', 'Mary:mary@m', 'John:jb@m'],
      maxLength: 8,
    },
  ],
  presets: [
    { label: 'Bắc cầu qua 3 account', values: { accounts: ['Ann:a@x,b@x', 'Ann:c@x,d@x', 'Ann:b@x,c@x', 'Bob:z@x'] } },
    { label: 'Trùng tên, khác người', values: { accounts: ['Alex:a1@x', 'Alex:a2@x', 'Alex:a1@x,a3@x'] } },
    { label: 'Chuỗi dài (xem nén đường)', values: { accounts: ['Kim:k1@x,k2@x', 'Kim:k3@x,k4@x', 'Kim:k5@x,k6@x', 'Kim:k2@x,k3@x', 'Kim:k6@x,k1@x', 'Kim:k4@x,k5@x'] } },
  ],
};
