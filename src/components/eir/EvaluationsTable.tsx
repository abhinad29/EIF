"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { Search } from "lucide-react";
import EmptyState from "@/components/eir/EmptyState";
import PassedEvaluationsTable from "@/components/eir/PassedEvaluationsTable";
import type { EvaluationFormType } from "@/lib/eir/evaluations";
import { isInSemester, isWithinLastDays, pluralize } from "@/lib/eir/utils";
import type { EirEvaluationRow, FormOption } from "@/lib/eir/view";

const dateOptions = [
  { value: "all", label: "All dates" },
  { value: "last-7", label: "Last 7 days" },
  { value: "last-30", label: "Last 30 days" },
  { value: "semester", label: "This semester" },
] as const;

type DateFilter = (typeof dateOptions)[number]["value"];
type FormFilter = EvaluationFormType | "all";

// "now" is captured when the date filter changes (in the event handler), so rendering stays pure.
type DateRange = { filter: DateFilter; now: number };

const ALL_DATES: DateRange = { filter: "all", now: 0 };

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";
const controlClass = `h-11 rounded-lg border border-line bg-white/70 text-[15px] text-ink ${focusRing}`;

function matchesDate(iso: string, range: DateRange): boolean {
  switch (range.filter) {
    case "all":
      return true;
    case "last-7":
      return isWithinLastDays(iso, 7, range.now);
    case "last-30":
      return isWithinLastDays(iso, 30, range.now);
    case "semester":
      return isInSemester(iso);
  }
}

type EvaluationsTableProps = {
  rows: EirEvaluationRow[];
  formOptions: FormOption[];
};

export default function EvaluationsTable({ rows, formOptions }: EvaluationsTableProps) {
  const [query, setQuery] = useState("");
  const [formFilter, setFormFilter] = useState<FormFilter>("all");
  const [dateRange, setDateRange] = useState<DateRange>(ALL_DATES);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (needle === "" || row.ventureName.toLowerCase().includes(needle)) &&
        (formFilter === "all" || row.formType === formFilter) &&
        matchesDate(row.submittedAt, dateRange),
    );
  }, [rows, query, formFilter, dateRange]);

  const isFiltered = query.trim() !== "" || formFilter !== "all" || dateRange.filter !== "all";

  function handleFormChange(event: ChangeEvent<HTMLSelectElement>) {
    const option = formOptions.find((candidate) => candidate.value === event.target.value);
    setFormFilter(option ? option.value : "all");
  }

  function handleDateChange(event: ChangeEvent<HTMLSelectElement>) {
    const option = dateOptions.find((candidate) => candidate.value === event.target.value);
    setDateRange({ filter: option ? option.value : "all", now: Date.now() });
  }

  function clearFilters() {
    setQuery("");
    setFormFilter("all");
    setDateRange(ALL_DATES);
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        title="No passed ventures yet."
        description="Passed advisor evaluations will appear here when they're ready for EIR review."
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="eir-evaluation-search" className="sr-only">
            Search ventures
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
          />
          <input
            id="eir-evaluation-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ventures..."
            className={`${controlClass} w-full pl-10 pr-3 placeholder:text-muted`}
          />
        </div>

        <div>
          <label htmlFor="eir-form-filter" className="sr-only">
            Filter by form
          </label>
          <select
            id="eir-form-filter"
            value={formFilter}
            onChange={handleFormChange}
            className={`${controlClass} w-full px-3 sm:w-64`}
          >
            <option value="all">All forms</option>
            {formOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="eir-date-filter" className="sr-only">
            Filter by date submitted
          </label>
          <select
            id="eir-date-filter"
            value={dateRange.filter}
            onChange={handleDateChange}
            className={`${controlClass} w-full px-3 sm:w-44`}
          >
            {dateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {isFiltered
          ? `Showing ${filteredRows.length} of ${pluralize(rows.length, "evaluation")}`
          : pluralize(rows.length, "evaluation")}
      </p>

      <div className="mt-3">
        {filteredRows.length > 0 ? (
          <PassedEvaluationsTable rows={filteredRows} caption="Passed venture evaluations" />
        ) : (
          <EmptyState title="No evaluations match your filters.">
            <button
              type="button"
              onClick={clearFilters}
              className={`rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-sun-50 ${focusRing}`}
            >
              Clear filters
            </button>
          </EmptyState>
        )}
      </div>
    </div>
  );
}
