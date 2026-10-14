import { rabinKarp } from './impl';

export interface RKInput { text: string; pattern: string; mod: number }

export const run = (input: RKInput) => rabinKarp(input.text, input.pattern, 31, Math.max(2, Math.floor(input.mod) || 101));
