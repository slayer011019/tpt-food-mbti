import { describe, expect, it } from "vitest";
import questions, { BASIC_QUESTION_COUNT } from "../data/questions";
import {
  buildDimensionScores,
  correctedItemTotalCorrelation,
  cronbachAlpha,
} from "./psychometrics";

describe("psychometrics", () => {
  it("builds dimension scores for the basic phase", () => {
    const answers = Array(BASIC_QUESTION_COUNT).fill(5);
    const scores = buildDimensionScores(answers, questions, "basic");

    expect(scores.TB.count).toBe(2);
    expect(scores.IP.count).toBe(2);
    expect(scores.CR.count).toBe(2);
    expect(scores.DS.count).toBe(2);
    expect(scores.MU.count).toBe(2);
    expect(typeof scores.TB.avg).toBe("number");
  });

  it("returns alpha close to 1 for perfectly consistent responses", () => {
    const items = Array.from({ length: BASIC_QUESTION_COUNT }, (_, idx) => ({
      id: `T${idx + 1}`,
      dimension: "TB",
      reverse: false,
    }));
    const matrix = [
      Array(BASIC_QUESTION_COUNT).fill(1),
      Array(BASIC_QUESTION_COUNT).fill(2),
      Array(BASIC_QUESTION_COUNT).fill(3),
      Array(BASIC_QUESTION_COUNT).fill(4),
      Array(BASIC_QUESTION_COUNT).fill(5),
    ];

    const alpha = cronbachAlpha(matrix, items);
    expect(alpha).not.toBeNull();
    expect(alpha).toBeGreaterThan(0.9);
  });

  it("computes corrected item-total correlations", () => {
    const items = questions.slice(0, BASIC_QUESTION_COUNT);
    const matrix = [
      [1, 5, 1, 5, 1, 5, 1, 5, 1, 5],
      [2, 4, 2, 4, 2, 4, 2, 4, 2, 4],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [4, 2, 4, 2, 4, 2, 4, 2, 4, 2],
      [5, 1, 5, 1, 5, 1, 5, 1, 5, 1],
    ];

    const correlations = correctedItemTotalCorrelation(matrix, items);
    expect(correlations.length).toBe(BASIC_QUESTION_COUNT);
    expect(correlations[0]).toHaveProperty("id");
    expect(correlations[0]).toHaveProperty("rit");
  });
});
