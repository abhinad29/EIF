import { getFormByType } from "@/lib/forms";
import { SCORE_MAX } from "@/lib/types";
import type { EvaluationFormType, EvaluationRow } from "./evaluations";

export type EirFormSection = { key: string; title: string };

export type EirFormMeta = {
  title: string;
  passingScore: number;
  sections: EirFormSection[];
};

export function getEirFormMeta(formType: EvaluationFormType): EirFormMeta | null {
  const form = getFormByType(formType);
  if (!form) return null;
  return {
    title: form.title,
    passingScore: form.passingScore,
    sections: form.sections.map((section) => ({ key: section.key, title: section.title })),
  };
}

export function getFormTitle(formType: EvaluationFormType): string {
  return getEirFormMeta(formType)?.title ?? formType;
}

export function getMaxScore(
  evaluation: EvaluationRow,
  form: EirFormMeta | null = getEirFormMeta(evaluation.form_type),
): number {
  return evaluation.max_score ?? (form ? form.sections.length * SCORE_MAX : 0);
}
