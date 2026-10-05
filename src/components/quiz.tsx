import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-semibold">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Test progress"
      >
        <div className="h-full rounded-full bg-brand transition-all duration-500 ease-out" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function AnswerOption({
  label, value, selected, onSelect,
}: { label: string; value: number; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border-2 bg-card px-5 py-4 text-left font-semibold transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/50",
        selected ? "border-primary bg-primary-soft text-primary shadow-soft" : "border-border",
      )}
    >
      <span
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-xs transition-colors",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
        )}
        aria-hidden
      >
        {selected ? <Check className="h-4 w-4" /> : value}
      </span>
      <span className="flex-1">{label}</span>
      {selected && <span className="text-xs font-bold uppercase tracking-wider">Selected</span>}
    </button>
  );
}

export function ScoreBar({ name, percent, balanced }: { name: string; percent: number; balanced: boolean }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-display font-semibold">{name}</span>
        <span className="font-display text-lg font-bold text-primary">{percent}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-brand transition-all duration-1000 ease-out" style={{ width: `${percent}%` }} />
      </div>
      {balanced && (
        <p className="mt-1.5 text-xs text-muted-foreground">Your answers showed a fairly balanced preference between these two traits.</p>
      )}
    </div>
  );
}
