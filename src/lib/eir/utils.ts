import type { EvaluationRow } from "./evaluations";

const DAY_MS = 24 * 60 * 60 * 1000;

// "This semester": Sep 1, 2026 through Dec 20, 2026 (America/New_York). End is exclusive.
const SEMESTER_START_MS = Date.parse("2026-09-01T00:00:00-04:00");
const SEMESTER_END_MS = Date.parse("2026-12-21T00:00:00-05:00");

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

/** e.g. "Sep 23, 2026" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatScore(score: number, max: number): string {
  return `${score} / ${max}`;
}

export function pluralize(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export function submittedAt(row: Pick<EvaluationRow, "submitted_at" | "updated_at">): string {
  return row.submitted_at ?? row.updated_at;
}

export function isWithinLastDays(iso: string, days: number, now: number): boolean {
  const time = Date.parse(iso);
  return time <= now && time > now - days * DAY_MS;
}

export function isInSemester(iso: string): boolean {
  const time = Date.parse(iso);
  return time >= SEMESTER_START_MS && time < SEMESTER_END_MS;
}
