import Link from "next/link";
import { formatScore } from "@/lib/eir/utils";
import type { EirEvaluationRow } from "@/lib/eir/view";

const columns = ["Venture", "Form", "Score", "Advisor", "Date"];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

type PassedEvaluationsTableProps = {
  rows: EirEvaluationRow[];
  caption: string;
};

export default function PassedEvaluationsTable({ rows, caption }: PassedEvaluationsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white/70 shadow-[0_1px_2px_rgba(15,27,45,0.04)]">
      <table className="w-full min-w-[760px] text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-sun-50/50">
            {columns.map((column) => (
              <th key={column} scope="col" className="px-5 py-3 text-left text-sm font-semibold text-muted">
                {column}
              </th>
            ))}
            <th scope="col" className="px-5 py-3 text-right text-sm font-semibold text-muted">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-b-0 hover:bg-sun-50/40">
              <th scope="row" className="px-5 py-4 text-left text-[15px] font-semibold text-ink">
                <Link
                  href={`/eir/evaluations/${row.id}`}
                  className={`rounded hover:text-navy-dark hover:underline ${focusRing}`}
                >
                  {row.ventureName}
                </Link>
              </th>
              <td className="px-5 py-4 text-[15px] text-muted">{row.formTitle}</td>
              <td className="whitespace-nowrap px-5 py-4 text-[15px] font-semibold text-ink tabular-nums">
                {formatScore(row.totalScore, row.maxScore)}
              </td>
              <td className="px-5 py-4 text-[15px] text-muted">{row.advisorName}</td>
              <td className="whitespace-nowrap px-5 py-4 text-[15px] text-muted">
                <time dateTime={row.submittedAt}>{row.submittedLabel}</time>
              </td>
              <td className="px-5 py-4 text-right">
                <Link
                  href={`/eir/evaluations/${row.id}`}
                  className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold text-navy hover:bg-sun-100 hover:text-navy-dark ${focusRing}`}
                >
                  View<span className="sr-only"> {row.ventureName} evaluation</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
