// SANDBOX STAND-IN, do not copy to real repo
export type Stage = "ready" | "set" | "go";
export const stageLabels: Record<Stage, string> = { ready: "Ready Stage", set: "Set Stage", go: "Go Stage" };

export type Venture = {
  id: string;
  name: string;
  tagline: string | null;
  founder_name: string | null;
  primary_contact_email: string;
  team_emails: string[];
  current_stage: Stage;
  created_by: string | null;
  created_at: string;
};

export type SectionEntry = { score?: number; notes: string; shareNotes: boolean };
export const SCORE_MAX = 5;
export type Decision = "pass" | "fail";
