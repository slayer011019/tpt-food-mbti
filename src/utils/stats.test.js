import { describe, expect, it } from "vitest";
import {
  mean,
  pearsonCorrelation,
  sampleCovariance,
  sampleVariance,
} from "./stats";

describe("stats utilities", () => {
  it("calculates sample variance/covariance", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
    expect(sampleVariance([1, 2, 3, 4])).toBeCloseTo(1.6667, 3);
    expect(sampleCovariance([1, 2, 3], [2, 4, 6])).toBeCloseTo(2, 5);
  });

  it("calculates Pearson correlation", () => {
    expect(pearsonCorrelation([1, 2, 3], [2, 4, 6])).toBeCloseTo(1, 5);
    expect(pearsonCorrelation([1, 2, 3], [6, 4, 2])).toBeCloseTo(-1, 5);
  });
});
