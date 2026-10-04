import EvaluationsTable from "@/components/eir/EvaluationsTable";
import { requireRole } from "@/lib/auth";
import { EVALUATION_FORM_TYPES, getPassedEvaluations } from "@/lib/eir/evaluations";
import { getFormTitle } from "@/lib/eir/forms";
import { toEirEvaluationRow, type FormOption } from "@/lib/eir/view";

export default async function EirEvaluationsPage() {
  await requireRole("eir");
  const evaluations = await getPassedEvaluations();

  const rows = evaluations.map(toEirEvaluationRow);
  const formOptions: FormOption[] = EVALUATION_FORM_TYPES.map((value) => ({
    value,
    label: getFormTitle(value),
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-[42px]">All Evaluations</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">Review ventures that have passed advisor evaluation.</p>

      <div className="mt-10">
        <EvaluationsTable rows={rows} formOptions={formOptions} />
      </div>
    </div>
  );
}
