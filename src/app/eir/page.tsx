import Link from "next/link";
import { ArrowRight, CalendarClock, ClipboardCheck, Gauge, Trophy } from "lucide-react";
import EmptyState from "@/components/eir/EmptyState";
import PassedEvaluationsTable from "@/components/eir/PassedEvaluationsTable";
import StatCard from "@/components/eir/StatCard";
import { displayName, requireRole } from "@/lib/auth";
import { getPassedEvaluations, getRecentPassedEvaluations } from "@/lib/eir/evaluations";
import { formatScore } from "@/lib/eir/utils";
import { getEirHomeStats, toEirEvaluationRow } from "@/lib/eir/view";

export default async function EirHomePage() {
  const profile = await requireRole("eir");
  const firstName = displayName(profile).split(" ")[0];

  const [passed, recent] = await Promise.all([getPassedEvaluations(), getRecentPassedEvaluations(5)]);
  const stats = getEirHomeStats(passed);
  const recentRows = recent.map(toEirEvaluationRow);

  const averageLabel =
    stats.averageScore === null ? "—" : `${stats.averageScore.toFixed(1)} / ${stats.maxScore}`;
  const highestLabel = stats.highestScore === null ? "—" : formatScore(stats.highestScore, stats.maxScore);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-[42px]">Welcome, {firstName}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Here&apos;s a summary of recently passed venture evaluations ready for EIR review.
      </p>

      <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="New This Week"
          value={String(stats.newThisWeek)}
          detail="Passed in the last 7 days"
          icon={CalendarClock}
        />
        <StatCard label="Total Passed" value={String(stats.totalPassed)} detail="This semester" icon={ClipboardCheck} />
        <StatCard label="Average Score" value={averageLabel} detail="Across passed evaluations" icon={Gauge} />
        <StatCard
          label="Highest Score"
          value={highestLabel}
          detail={stats.highestVentures.length > 0 ? stats.highestVentures.join(", ") : undefined}
          icon={Trophy}
        />
      </dl>

      <section aria-labelledby="recent-passed-heading" className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="recent-passed-heading" className="text-2xl font-bold tracking-tight text-ink">
            Recently passed ventures
          </h2>
          <Link
            href="/eir/evaluations"
            className="inline-flex items-center gap-1 rounded-lg text-[15px] font-semibold text-navy hover:text-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            View all
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5">
          {recentRows.length > 0 ? (
            <PassedEvaluationsTable rows={recentRows} caption="Recently passed ventures" />
          ) : (
            <EmptyState
              title="No passed ventures yet."
              description="Passed advisor evaluations will appear here when they're ready for EIR review."
            />
          )}
        </div>
      </section>
    </div>
  );
}
