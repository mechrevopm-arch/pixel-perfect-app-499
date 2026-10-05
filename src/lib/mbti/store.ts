import { useEffect, useSyncExternalStore } from "react";
import { QUESTIONS } from "./questions";
import type { Answers } from "./scoring";

const KEY = "mindtype.answers.v1";
const empty = (): Answers => QUESTIONS.map(() => null);

let state: { answers: Answers; index: number; hydrated: boolean } = { answers: empty(), index: 0, hydrated: false };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ answers: state.answers, index: state.index }));
  } catch {
    /* storage unavailable — keep in memory */
  }
}

function hydrate() {
  if (state.hydrated) return;
  let next = { answers: empty(), index: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (Array.isArray(p.answers) && p.answers.length === QUESTIONS.length) {
        next = {
          answers: p.answers.map((a: unknown) => (typeof a === "number" && a >= 1 && a <= 5 ? a : null)),
          index: Math.min(Math.max(Number(p.index) || 0, 0), QUESTIONS.length - 1),
        };
      }
    }
  } catch {
    /* ignore */
  }
  state = { ...next, hydrated: true };
  emit();
}

export const quiz = {
  answer(i: number, value: number) {
    const answers = [...state.answers];
    answers[i] = value;
    state = { ...state, answers };
    persist();
    emit();
  },
  goTo(index: number) {
    state = { ...state, index };
    persist();
    emit();
  },
  reset() {
    state = { answers: empty(), index: 0, hydrated: true };
    persist();
    emit();
  },
};

const serverSnap = { answers: empty(), index: 0, hydrated: false };

export function useQuiz() {
  const snap = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => serverSnap,
  );
  useEffect(() => hydrate(), []);
  return snap;
}
