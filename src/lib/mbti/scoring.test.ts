import { describe, expect, it } from "vitest";
import { calculate } from "./scoring";
import { QUESTIONS, type Letter } from "./questions";
import { TYPES } from "./types";

function answersFor(type: string): number[] {
  const letters = type.split("") as Letter[];
  return QUESTIONS.map((q) => (q.measures === null ? 3 : letters.includes(q.measures) ? 5 : 1));
}

describe("MBTI scoring", () => {
  it("can produce all 16 types", () => {
    const keys = Object.keys(TYPES);
    expect(keys).toHaveLength(16);
    for (const t of keys) expect(calculate(answersFor(t)).type).toBe(t);
  });

  it("is deterministic for all-neutral answers", () => {
    const neutral = QUESTIONS.map(() => 3);
    expect(calculate(neutral).type).toBe("INFP");
    expect(calculate(neutral).type).toBe(calculate(neutral).type);
  });

  it("uses Q25 to break S/N and J/P ties", () => {
    const a = QUESTIONS.map(() => 3);
    a[24] = 5;
    expect(calculate(a).type).toBe("INFP");
    a[24] = 1;
    expect(calculate(a).type).toBe("ISFJ");
  });

  it("gives 100% for maximal preference", () => {
    const r = calculate(answersFor("ESTJ"));
    expect(r.dimensions.every((d) => d.percent === 100)).toBe(true);
  });
});
