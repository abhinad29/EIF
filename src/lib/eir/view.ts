import { displayName } from "@/lib/auth";
import type { EirEvaluation, EvaluationFormType } from "./evaluations";
import { getEirFormMeta, getMaxScore } from "./forms";
import { formatDate, isInSemester, isWithinLastDays, submittedAt } from "./utils";

export type EirEvaluationRow = {
  id: string;
  ventureName: string;
  formType: EvaluationFormType;
  formTitle: string;
  totalScore: number;
  maxScore: number;
  advisorName: string;
  submittedAt: string;
  submittedLabel: string;
};

export type FormOption = { value: EvaluationFormType; label: string };

export function toEirEvaluationRow(evaluation: EirEvaluation): EirEvaluationRow {
  const form = getEirFormMeta(evaluation.form_type);
  const submitted = submittedAt(evaluation);
  return {
    id: evaluation.id,
    ventureName: evaluation.venture.name,
    formType: evaluation.form_type,
    formTitle: form?.title ?? evaluation.form_type,
    totalScore: evaluation.total_score ?? 0,
    maxScore: getMaxScore(evaluation, form),
    advisorName: displayName(evaluation.advisor),
    submittedAt: submitted,
    submittedLabel: formatDate(submitted),
  };
}

export type EirHomeStats = {
  newThisWeek: number;
  totalPassed: number;
  averageScore: number | null;
  highestScore: number | null;
  highestVentures: string[];
  maxScore: number;
};

export function getEirHomeStats(evaluations: EirEvaluation[], now: number = Date.now()): EirHomeStats {
  const semester = evaluations.filter((evaluation) => isInSemester(submittedAt(evaluation)));
  const scores = semester.map((evaluation) => evaluation.total_score ?? 0);
  const highestScore = scores.length > 0 ? Math.max(...scores) : null;

  return {
    newThisWeek: evaluations.filter((evaluation) => isWithinLastDays(submittedAt(evaluation), 7, now)).length,
    totalPassed: semester.length,
    averageScore: scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : null,
    highestScore,
    highestVentures:
      highestScore === null
        ? []
        : semester
            .filter((evaluation) => (evaluation.total_score ?? 0) === highestScore)
            .map((evaluation) => evaluation.venture.name),
    maxScore: semester.length > 0 ? Math.max(...semester.map((evaluation) => getMaxScore(evaluation))) : 0,
  };
}
