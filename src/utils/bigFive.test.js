import { describe, expect, it } from "vitest";
import { computeBigFiveScores } from "./bigFive";

describe("computeBigFiveScores", () => {
  it("returns midpoint profile for neutral responses", () => {
    const answers = Array(10).fill(4);
    const scores = computeBigFiveScores(answers);
    expect(scores.EXTRAVERSION).toBe(4);
    expect(scores.AGREEABLENESS).toBe(4);
    expect(scores.CONSCIENTIOUSNESS).toBe(4);
    expect(scores.EMOTIONAL_STABILITY).toBe(4);
    expect(scores.OPENNESS).toBe(4);
  });

  it("applies reverse coding", () => {
    const answers = [7, 7, 7, 7, 7, 1, 7, 1, 7, 1];
    const scores = computeBigFiveScores(answers);

    expect(scores.EXTRAVERSION).toBe(7);
    expect(scores.AGREEABLENESS).toBe(4);
    expect(scores.CONSCIENTIOUSNESS).toBe(7);
    expect(scores.EMOTIONAL_STABILITY).toBe(4);
    expect(scores.OPENNESS).toBe(7);
  });
});
