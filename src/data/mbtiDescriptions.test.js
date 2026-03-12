import { describe, expect, it } from "vitest";
import {
  ALL_TYPE_CODES,
  getTypeDescription,
  isValidTypeCode,
  validateTypeDescriptions,
} from "./mbtiDescriptions";

describe("mbtiDescriptions", () => {
  it("covers all expected 32 type codes without extras", () => {
    const result = validateTypeDescriptions();
    expect(result.isValid).toBe(true);
    expect(result.count).toBe(32);
    expect(result.missing).toHaveLength(0);
    expect(result.extras).toHaveLength(0);
  });

  it("validates type code format", () => {
    expect(ALL_TYPE_CODES).toHaveLength(32);
    expect(isValidTypeCode("TICDM")).toBe(true);
    expect(isValidTypeCode("ticdm")).toBe(true);
    expect(isValidTypeCode("ABCDE")).toBe(false);
    expect(isValidTypeCode("TICD")).toBe(false);
  });

  it("returns fallback profile for unknown code", () => {
    const profile = getTypeDescription("ABCDE");
    expect(profile.title).toBe("알 수 없는 타입");
    expect(profile.recommendations).toEqual([]);
  });
});
