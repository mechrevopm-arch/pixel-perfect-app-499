export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  /** Pole the question measures. Q25 is a tie-breaker (null). */
  measures: Letter | null;
}

export const QUESTIONS: Question[] = [
  { id: 1, text: "I feel energized after spending time with a large group of people.", measures: "E" },
  { id: 2, text: "I prefer having a few close friends rather than a large social circle.", measures: "I" },
  { id: 3, text: "I usually feel comfortable starting conversations with people I don't know.", measures: "E" },
  { id: 4, text: "After a busy social event, I usually need some quiet time alone to recharge.", measures: "I" },
  { id: 5, text: "I enjoy thinking out loud and discussing my ideas with other people.", measures: "E" },
  { id: 6, text: "I prefer processing my thoughts privately before sharing them with others.", measures: "I" },
  { id: 7, text: "I prefer dealing with practical facts rather than abstract possibilities.", measures: "S" },
  { id: 8, text: "I often imagine how things could be different from how they currently are.", measures: "N" },
  { id: 9, text: "When learning something new, I prefer real examples and practical demonstrations.", measures: "S" },
  { id: 10, text: "I enjoy thinking about theories, possibilities, and future scenarios.", measures: "N" },
  { id: 11, text: "I usually pay close attention to specific details.", measures: "S" },
  { id: 12, text: "I naturally notice patterns and connections that others may overlook.", measures: "N" },
  { id: 13, text: "When making an important decision, I usually prioritize logic over people's feelings.", measures: "T" },
  { id: 14, text: "I consider how a decision will emotionally affect other people.", measures: "F" },
  { id: 15, text: "I prefer solving disagreements by focusing on facts and objective reasoning.", measures: "T" },
  { id: 16, text: "I often try to maintain harmony even when it means compromising my own position.", measures: "F" },
  { id: 17, text: "I believe being fair sometimes means treating everyone according to the same rules.", measures: "T" },
  { id: 18, text: "I naturally empathize with people when they are going through difficult situations.", measures: "F" },
  { id: 19, text: "I prefer having a clear plan before starting an important task.", measures: "J" },
  { id: 20, text: "I enjoy keeping my options open instead of making decisions too early.", measures: "P" },
  { id: 21, text: "I feel more comfortable when my schedule is organized and predictable.", measures: "J" },
  { id: 22, text: "I often make spontaneous decisions based on what feels right at the moment.", measures: "P" },
  { id: 23, text: "I usually finish tasks before moving on to something else.", measures: "J" },
  { id: 24, text: "I enjoy adapting my plans when unexpected opportunities appear.", measures: "P" },
  { id: 25, text: "When approaching a new situation, I usually rely more on my natural instincts than on a fixed plan.", measures: null },
];

export const LIKERT = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
] as const;
