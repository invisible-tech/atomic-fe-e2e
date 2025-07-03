// compareTwoStrings.test.ts
import { describe, it, expect } from 'vitest';
import { compareTwoStrings } from '../compareTwoStrings';

describe('compareTwoStrings – important real-world cases', () => {
  it('identical very long strings return 1', () => {
    const str = 'a'.repeat(100_000);
    expect(compareTwoStrings(str, str)).toBe(1);
  });

  it('same very long string compared 3 times gives consistent result', () => {
    const str1 = 'a'.repeat(10_000);
    const str2 = 'a'.repeat(10_000);
    const first = compareTwoStrings(str1, str2);
    const second = compareTwoStrings(str1, str2);
    const third = compareTwoStrings(str1, str2);
    expect(first).toBe(1);
    expect(second).toBe(1);
    expect(third).toBe(1);
  });

  it('long string vs slightly modified version', () => {
    const base = 'a'.repeat(9999) + 'b';
    const modified = 'a'.repeat(9998) + 'bb';
    const score = compareTwoStrings(base, modified);
    expect(score).toBeGreaterThan(0.95);
    expect(score).toBeLessThan(1);
  });

  it('very long string vs totally different long string', () => {
    const a = 'a'.repeat(10000);
    const b = 'z'.repeat(10000);
    expect(compareTwoStrings(a, b)).toBe(0);
  });

  it('multiline string vs same multiline with small change', () => {
    const a = `function sayHello() {
  console.log("Hello");
}

function sayGoodbye() {
  console.log("Goodbye");
}`;
    const b = `function sayHello() {
  console.log("Hello, world!");
}

function sayGoodbye() {
  console.log("Goodbye");
}`;
    const score = compareTwoStrings(a, b);
    expect(score).toBeGreaterThan(0.8);
    expect(score).toBeLessThan(1);
  });

  it('two very similar sentences with multiple differences', () => {
    const a = 'The quick brown fox jumps over the lazy dog.';
    const b = 'A quick brown fox jumped over a lazy dog!';
    const score = compareTwoStrings(a, b);
    expect(score).toBeGreaterThan(0.7);
    expect(score).toBeLessThan(1);
  });

  it('string vs partial substring', () => {
    expect(compareTwoStrings('encyclopedia', 'clopedia')).toBeGreaterThan(0.5);
    expect(compareTwoStrings('encyclopedia', 'ency')).toBeGreaterThan(0.3);
  });

  it('capitalization differences are ignored', () => {
    expect(compareTwoStrings('HELLO WORLD', 'hello world')).toBe(1);
  });

  it('returns 0 for no shared content', () => {
    expect(compareTwoStrings('abcdefg', '1234567')).toBe(0);
  });

  it('high similarity with shared prefixes and suffixes', () => {
    const a = 'function compareStringsByNgramSimilarity() { return 1; }';
    const b = 'function compareStringsByNgramSimularity() { return 1; }';
    const score = compareTwoStrings(a, b);
    expect(score).toBeGreaterThan(0.85);
    expect(score).toBeLessThan(1);
  });
});
