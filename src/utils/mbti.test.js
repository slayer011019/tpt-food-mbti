import { describe, it, expect } from "vitest";
import { calculateMBTI } from "./mbti";

const buildQuestionBank = (overrides = {}) => [
  { dimension: "TB", reverse: false, ...overrides },
  { dimension: "TB", reverse: false, ...overrides },
  { dimension: "IP", reverse: false, ...overrides },
  { dimension: "IP", reverse: false, ...overrides },
  { dimension: "CR", reverse: false, ...overrides },
  { dimension: "CR", reverse: false, ...overrides },
  { dimension: "DS", reverse: false, ...overrides },
  { dimension: "DS", reverse: false, ...overrides },
  { dimension: "MU", reverse: false, ...overrides },
  { dimension: "MU", reverse: false, ...overrides },
];

describe("calculateMBTI", () => {
  it("uses deterministic tie-breaker at avg === 3", () => {
    const questions = buildQuestionBank();
    const answers = Array(10).fill(3);
    expect(calculateMBTI(answers, questions)).toBe("BPRSU");
  });

  it("applies reverse scoring", () => {
    const questions = [
      { dimension: "TB", reverse: false },
      { dimension: "TB", reverse: true },
      { dimension: "IP", reverse: false },
      { dimension: "IP", reverse: false },
      { dimension: "CR", reverse: false },
      { dimension: "CR", reverse: false },
      { dimension: "DS", reverse: false },
      { dimension: "DS", reverse: false },
      { dimension: "MU", reverse: false },
      { dimension: "MU", reverse: false },
    ];
    const answers = [5, 5, 4, 4, 4, 4, 4, 4, 4, 4];
    expect(calculateMBTI(answers, questions)).toBe("BICDM");
  });

  it("returns expected code for a simple high-score input", () => {
    const questions = buildQuestionBank();
    const answers = Array(10).fill(5);
    expect(calculateMBTI(answers, questions)).toBe("TICDM");
  });
});
