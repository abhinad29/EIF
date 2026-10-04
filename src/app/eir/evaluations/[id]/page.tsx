import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import EmptyState from "@/components/eir/EmptyState";
import { displayName, requireRole } from "@/lib/auth";
import { getEvaluationById } from "@/lib/eir/evaluations";
import { getEirFormMeta, getMaxScore } from "@/lib/eir/forms";
import { formatDate, formatScore, submittedAt } from "@/lib/eir/utils";
import { SCORE_MAX, stageLabels } from "@/lib/types";

const cardClass = "rounded-2xl border border-line bg-white/70 shadow-[0_1px_2px_rgba(15,27,45,0.04)]";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";
const emailLinkClass = `break-all rounded font-medium text-navy hover:text-navy-dark hover:underline ${focusRing}`;

function BackLink() {
  return (
    <Link
      href="/eir/evaluations"
      className={`inline-flex items-center gap-2 rounded-lg text-[15px] font-semibold text-navy hover:text-navy-dark ${focusRing}`}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      Back to All Evaluations
    </Link>
  );
}

export default async function EirEvaluationDetailPage({ params }: PageProps<"/eir/evaluations/[id]">) {
  await requireRole("eir");
  const { id } = await params;
  const evaluation = await getEvaluationById(id);

  if (!evaluation) {
    return (
      <div className="mx-auto max-w-6xl">
        <EmptyState
          titleAs="h1"
          title="Evaluation not found."
          description="This evaluation does not exist or is not available for EIR review."
        >
          <BackLink />
        </EmptyState>
      </div>
    );
  }

  const { venture } = evaluation;
  const form = getEirFormMeta(evaluation.form_type);
  const sections =
    form?.sections ?? Object.keys(evaluation.answers).map((key) => ({ key, title: key }));
  const maxScore = getMaxScore(evaluation, form);
  const totalScore = evaluation.total_score ?? 0;
  const submitted = submittedAt(evaluation);
  const submittedLabel = formatDate(submitted);
  const advisorName = displayName(evaluation.advisor);

  const ventureDetails: { label: string; value: ReactNode }[] = [
    { label: "Venture name", value: venture.name },
    { label: "Founder", value: venture.founder_name ?? "Not provided" },
    {
      label: "Primary contact",
      value: (
        <a href={`mailto:${venture.primary_contact_email}`} className={emailLinkClass}>
          {venture.primary_contact_email}
        </a>
      ),
    },
    { label: "Stage", value: stageLabels[venture.current_stage] },
    { label: "Tagline", value: venture.tagline ?? "Not provided" },
    {
      label: "Team",
      value:
        venture.team_emails.length > 0 ? (
          <ul className="space-y-1">
            {venture.team_emails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className={emailLinkClass}>
                  {email}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          "Not provided"
        ),
    },
    { label: "Date submitted", value: <time dateTime={submitted}>{submittedLabel}</time> },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <BackLink />

      <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-[42px]">{venture.name}</h1>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">Pass</span>
          </div>
          <p className="mt-3 text-lg font-semibold text-ink">{form?.title ?? evaluation.form_type}</p>
          <p className="mt-1 text-[15px] text-muted">
            Submitted by {advisorName} on <time dateTime={submitted}>{submittedLabel}</time>
          </p>
        </div>

        <button
          type="button"
          disabled
          title="PDF download coming soon"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-navy px-4 py-2.5 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Download PDF
          <span className="sr-only"> (coming soon)</span>
        </button>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section aria-labelledby="evaluation-summary-heading" className={`${cardClass} p-6`}>
            <h2 id="evaluation-summary-heading" className="text-xl font-bold tracking-tight text-ink">
              Evaluation summary
            </h2>
            <dl className="mt-4 divide-y divide-line">
              {sections.map((section) => {
                const score = evaluation.answers[section.key]?.score;
                return (
                  <div key={section.key} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-[15px] text-ink">{section.title}</dt>
                    <dd className="whitespace-nowrap text-[15px] font-semibold text-ink tabular-nums">
                      {typeof score === "number" ? formatScore(score, SCORE_MAX) : "Not scored"}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-sun-50 px-4 py-4">
              <p className="text-base font-semibold text-ink">Total Score</p>
              <p className="text-2xl font-extrabold text-navy-dark tabular-nums">{formatScore(totalScore, maxScore)}</p>
            </div>
            {form ? (
              <p className="mt-3 text-sm text-muted">
                Minimum passing score: {formatScore(form.passingScore, maxScore)}
              </p>
            ) : null}
          </section>

          <section aria-labelledby="section-notes-heading" className={`${cardClass} p-6`}>
            <h2 id="section-notes-heading" className="text-xl font-bold tracking-tight text-ink">
              Section notes
            </h2>
            <div className="mt-4 divide-y divide-line">
              {sections.map((section) => {
                const entry = evaluation.answers[section.key];
                const notes = entry?.notes.trim();
                return (
                  <article key={section.key} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-base font-semibold text-ink">{section.title}</h3>
                      {typeof entry?.score === "number" ? (
                        <span className="whitespace-nowrap text-sm font-semibold text-muted tabular-nums">
                          {formatScore(entry.score, SCORE_MAX)}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-muted">
                      {notes || "No notes were provided for this section."}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="advisor-feedback-heading" className={`${cardClass} p-6`}>
            <h2 id="advisor-feedback-heading" className="text-xl font-bold tracking-tight text-ink">
              Advisor feedback
            </h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-muted">
              {evaluation.feedback?.trim() || "No additional advisor feedback was provided."}
            </p>
          </section>
        </div>

        <aside aria-labelledby="venture-information-heading" className={`${cardClass} h-fit p-6`}>
          <h2 id="venture-information-heading" className="text-xl font-bold tracking-tight text-ink">
            Venture information
          </h2>
          <dl className="mt-4 space-y-4">
            {ventureDetails.map((detail) => (
              <div key={detail.label}>
                <dt className="text-sm font-medium text-muted">{detail.label}</dt>
                <dd className="mt-1 break-words text-[15px] text-ink">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
