import { QUESTIONS, type Letter } from "./questions";

export type Answers = (number | null)[];

export interface DimensionResult {
  first: Letter;
  second: Letter;
  /** Raw score for first pole, 6..30 */
  firstScore: number;
  secondScore: number;
  winner: Letter;
  /** Relative preference for the winning pole, 50..100 */
  percent: number;
  balanced: boolean;
}

export interface MbtiResult {
  type: string;
  dimensions: DimensionResult[];
}

const DIMENSIONS: [Letter, Letter][] = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"],
];

/** Deterministic fallback when a dimension is perfectly tied and Q25 can't break it. */
const FALLBACK: Record<string, Letter> = { EI: "I", SN: "N", TF: "F", JP: "P" };

export function isComplete(answers: Answers): boolean {
  return answers.length === QUESTIONS.length && answers.every((a) => typeof a === "number" && a >= 1 && a <= 5);
}

export function calculate(answers: Answers): MbtiResult {
  const q25 = answers[24] ?? 3;
  const dimensions = DIMENSIONS.map(([first, second]) => {
    let firstScore = 0;
    let secondScore = 0;
    QUESTIONS.forEach((q, i) => {
      const v = answers[i] ?? 3;
      if (q.measures === first) {
        firstScore += v;
        secondScore += 6 - v;
      } else if (q.measures === second) {
        secondScore += v;
        firstScore += 6 - v;
      }
    });

    let winner: Letter;
    if (firstScore > secondScore) winner = first;
    else if (secondScore > firstScore) winner = second;
    else if ((first === "S" || first === "J") && q25 !== 3) {
      // Q25 (instinct over plan) leans N / P when agreed, S / J when disagreed.
      winner = q25 > 3 ? second : first;
    } else winner = FALLBACK[first + second];

    const total = firstScore + secondScore;
    const winScore = winner === first ? firstScore : secondScore;
    const percent = Math.round((winScore / total) * 100);
    return {
      first,
      second,
      firstScore,
      secondScore,
      winner,
      percent,
      balanced: Math.abs(firstScore - secondScore) <= 2,
    };
  });

  return { type: dimensions.map((d) => d.winner).join(""), dimensions };
}
