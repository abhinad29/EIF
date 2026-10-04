// SANDBOX STAND-IN, do not copy to real repo
export type FormSection = { key: string; title: string };
export type FormDefinition = { title: string; passingScore: number; sections: FormSection[] };

const SECTIONS: FormSection[] = [
  { key: "value_proposition", title: "Value Proposition" },
  { key: "market_research", title: "Market Research" },
  { key: "customer_understanding", title: "Customer / User Understanding" },
  { key: "solution_design", title: "Solution Design" },
];

const FORMS: Record<string, FormDefinition> = {
  ready_stage_recommendation: { title: "Ready Stage Pitch Recommendation", passingScore: 16, sections: SECTIONS },
  set_stage_recommendation: { title: "Set Stage Pitch Recommendation", passingScore: 16, sections: SECTIONS },
  set_stage_evaluation: { title: "Set Stage Pitch Evaluation", passingScore: 16, sections: SECTIONS },
};

export function getFormByType(formType: string): FormDefinition | undefined {
  return FORMS[formType];
}
