import { SCORE_MAX, type Decision, type SectionEntry, type Venture } from "@/lib/types";

/**
 * EIR data layer (mock).
 *
 * Pages must only use the three async accessors at the bottom of this file.
 * They are the swap points for Supabase queries later. The EIR visibility rule
 * (submitted + pass) is enforced here, mirroring the production RLS policy.
 */

export const EVALUATION_FORM_TYPES = [
  "ready_stage_recommendation",
  "set_stage_recommendation",
  "set_stage_evaluation",
] as const;

export type EvaluationFormType = (typeof EVALUATION_FORM_TYPES)[number];
export type EvaluationStatus = "draft" | "submitted";

/** Mirrors public.evaluations. */
export type EvaluationRow = {
  id: string;
  venture_id: string;
  advisor_id: string;
  form_type: EvaluationFormType;
  status: EvaluationStatus;
  answers: Record<string, SectionEntry>;
  total_score: number | null;
  max_score: number | null;
  decision: Decision | null;
  feedback: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type EirAdvisor = {
  id: string;
  full_name: string;
  email: string;
  role: "advisor";
  created_at: string;
};

export type EirEvaluation = EvaluationRow & {
  venture: Venture;
  advisor: EirAdvisor;
};

// ---------------------------------------------------------------------------
// Mock data (not exported; pages go through the accessors below)
// ---------------------------------------------------------------------------

const MOCK_ADVISORS: EirAdvisor[] = [
  {
    id: "30000000-0000-0000-0000-000000000001",
    full_name: "Sarah Kim",
    email: "sarah.kim@northeastern.edu",
    role: "advisor",
    created_at: "2026-08-01T12:00:00.000Z",
  },
  {
    id: "30000000-0000-0000-0000-000000000002",
    full_name: "Daniel Okafor",
    email: "d.okafor@northeastern.edu",
    role: "advisor",
    created_at: "2026-08-01T12:00:00.000Z",
  },
  {
    id: "30000000-0000-0000-0000-000000000003",
    full_name: "Priya Raman",
    email: "p.raman@northeastern.edu",
    role: "advisor",
    created_at: "2026-08-03T12:00:00.000Z",
  },
  {
    id: "30000000-0000-0000-0000-000000000004",
    full_name: "Marcus Lee",
    email: "marcus.lee@northeastern.edu",
    role: "advisor",
    created_at: "2026-08-05T12:00:00.000Z",
  },
];

const MOCK_VENTURES: Venture[] = [
  {
    id: "20000000-0000-0000-0000-000000000001",
    name: "EcoCharge",
    tagline: "Smarter charging infrastructure for urban mobility.",
    founder_name: "Maya Patel",
    primary_contact_email: "maya@ecocharge.co",
    team_emails: ["maya@ecocharge.co", "alex@ecocharge.co"],
    current_stage: "ready",
    created_by: "30000000-0000-0000-0000-000000000001",
    created_at: "2026-08-15T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    name: "NourishAI",
    tagline: "AI meal planning for students with dietary restrictions.",
    founder_name: "Jordan Rivera",
    primary_contact_email: "jordan@nourishai.app",
    team_emails: ["jordan@nourishai.app", "sam@nourishai.app", "lee@nourishai.app"],
    current_stage: "set",
    created_by: "30000000-0000-0000-0000-000000000002",
    created_at: "2026-08-12T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    name: "CampusCart",
    tagline: "Peer-to-peer marketplace for campus essentials.",
    founder_name: "Ethan Brooks",
    primary_contact_email: "ethan@campuscart.io",
    team_emails: ["ethan@campuscart.io"],
    current_stage: "ready",
    created_by: "30000000-0000-0000-0000-000000000003",
    created_at: "2026-08-18T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000004",
    name: "StudyBuddy",
    tagline: "Matching students with study partners by course and schedule.",
    founder_name: "Aisha Mohammed",
    primary_contact_email: "aisha@studybuddy.app",
    team_emails: ["aisha@studybuddy.app", "noah@studybuddy.app"],
    current_stage: "ready",
    created_by: "30000000-0000-0000-0000-000000000001",
    created_at: "2026-08-20T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000005",
    name: "GreenGrid",
    tagline: "Energy usage dashboards for small commercial buildings.",
    founder_name: "Lucas Fernandes",
    primary_contact_email: "lucas@greengrid.energy",
    team_emails: ["lucas@greengrid.energy", "emma@greengrid.energy"],
    current_stage: "set",
    created_by: "30000000-0000-0000-0000-000000000002",
    created_at: "2026-08-10T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000006",
    name: "MedRoute",
    tagline: "Non-emergency medical transport scheduling for clinics.",
    founder_name: "Hannah Wu",
    primary_contact_email: "hannah@medroute.health",
    team_emails: ["hannah@medroute.health", "omar@medroute.health", "grace@medroute.health"],
    current_stage: "set",
    created_by: "30000000-0000-0000-0000-000000000004",
    created_at: "2026-08-08T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000007",
    name: "LaunchLoop",
    tagline: "Structured feedback on first-time founders' landing pages.",
    founder_name: "Diego Alvarez",
    primary_contact_email: "diego@launchloop.co",
    team_emails: ["diego@launchloop.co"],
    current_stage: "ready",
    created_by: "30000000-0000-0000-0000-000000000003",
    created_at: "2026-08-22T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000008",
    name: "ClearPath",
    tagline: "Career navigation for first-generation college students.",
    founder_name: "Sofia Nguyen",
    primary_contact_email: "sofia@clearpath.org",
    team_emails: ["sofia@clearpath.org", "james@clearpath.org"],
    current_stage: "set",
    created_by: "30000000-0000-0000-0000-000000000004",
    created_at: "2026-08-11T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000009",
    name: "CivicFlow",
    tagline: "Permit tracking for small municipalities.",
    founder_name: "Ryan O'Connor",
    primary_contact_email: "ryan@civicflow.io",
    team_emails: ["ryan@civicflow.io", "nadia@civicflow.io"],
    current_stage: "set",
    created_by: "30000000-0000-0000-0000-000000000001",
    created_at: "2026-08-14T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000010",
    name: "TutorBridge",
    tagline: "Affordable tutoring from vetted college students.",
    founder_name: "Olivia Grant",
    primary_contact_email: "olivia@tutorbridge.com",
    team_emails: ["olivia@tutorbridge.com", "marco@tutorbridge.com"],
    current_stage: "set",
    created_by: "30000000-0000-0000-0000-000000000002",
    created_at: "2026-08-09T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000011",
    name: "ParkPulse",
    tagline: "Real-time parking availability for downtown garages.",
    founder_name: "Kevin Tran",
    primary_contact_email: "kevin@parkpulse.co",
    team_emails: ["kevin@parkpulse.co"],
    current_stage: "ready",
    created_by: "30000000-0000-0000-0000-000000000003",
    created_at: "2026-08-25T12:00:00.000Z",
  },
  {
    id: "20000000-0000-0000-0000-000000000012",
    name: "SnackStack",
    tagline: "Subscription snack boxes for residence halls.",
    founder_name: "Chloe Martin",
    primary_contact_email: "chloe@snackstack.shop",
    team_emails: ["chloe@snackstack.shop", "ben@snackstack.shop"],
    current_stage: "ready",
    created_by: "30000000-0000-0000-0000-000000000004",
    created_at: "2026-08-26T12:00:00.000Z",
  },
];

type MockSectionKey =
  | "value_proposition"
  | "market_research"
  | "customer_understanding"
  | "solution_design";

type MockEvaluationInput = Omit<
  EvaluationRow,
  "status" | "answers" | "total_score" | "max_score" | "submitted_at" | "updated_at"
> & {
  answers: Record<MockSectionKey, SectionEntry>;
  submitted_at: string;
};

function section(score: number, notes: string, shareNotes = true): SectionEntry {
  return { score, notes, shareNotes };
}

/** Builds a submitted row whose total_score is always the sum of its section scores. */
function submitted(input: MockEvaluationInput): EvaluationRow {
  const entries = Object.values(input.answers);
  return {
    ...input,
    status: "submitted",
    total_score: entries.reduce((total, entry) => total + (entry.score ?? 0), 0),
    max_score: entries.length * SCORE_MAX,
    updated_at: input.submitted_at,
  };
}

const MOCK_EVALUATIONS: EvaluationRow[] = [
  submitted({
    id: "10000000-0000-0000-0000-000000000001",
    venture_id: "20000000-0000-0000-0000-000000000001",
    advisor_id: "30000000-0000-0000-0000-000000000001",
    form_type: "ready_stage_recommendation",
    answers: {
      value_proposition: section(4, "The team clearly communicates the customer problem and core value proposition."),
      market_research: section(4, "Market is clearly defined; more competitive research would strengthen the pitch."),
      customer_understanding: section(5, "Strong customer discovery with clear evidence target users feel this problem."),
      solution_design: section(4, "Initial product scope is realistic and fits the primary use case."),
    },
    decision: "pass",
    feedback:
      "Strong value proposition and customer validation. The team is ready to move forward to the next stage.",
    submitted_at: "2026-09-23T18:15:00.000Z",
    created_at: "2026-09-22T14:00:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000002",
    venture_id: "20000000-0000-0000-0000-000000000002",
    advisor_id: "30000000-0000-0000-0000-000000000002",
    form_type: "set_stage_evaluation",
    answers: {
      value_proposition: section(
        5,
        "Crisp problem framing: students with allergies or dietary restrictions spend hours planning meals and still eat poorly. Personalized plans are a clear differentiator.",
      ),
      market_research: section(
        4,
        "Good sizing of the campus dining market. The competitive slide should address general-purpose meal planners more directly.",
      ),
      customer_understanding: section(
        5,
        "Over 60 student interviews and a 200-person survey. Pilot retention data shows real pull.",
      ),
      solution_design: section(
        5,
        "Working pilot with dining-hall menu integration. The roadmap is sequenced around the riskiest assumptions.",
      ),
    },
    decision: "pass",
    feedback:
      "Exceptional Set Stage pitch. Pilot retention and dining-hall integration make a compelling case. Tighten the competitive comparison before the next pitch.",
    submitted_at: "2026-10-03T15:30:00.000Z",
    created_at: "2026-10-02T13:00:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000003",
    venture_id: "20000000-0000-0000-0000-000000000003",
    advisor_id: "30000000-0000-0000-0000-000000000003",
    form_type: "ready_stage_recommendation",
    answers: {
      value_proposition: section(
        4,
        "Clear value for students buying and selling textbooks and dorm gear. The pitch could lead with the savings story sooner.",
      ),
      market_research: section(
        4,
        "Reasonable bottom-up estimate for Northeastern. Assumptions about expanding to other campuses need support.",
      ),
      customer_understanding: section(4, "Solid interview set; move-in and move-out pain points are well documented."),
      solution_design: section(
        4,
        "MVP scope is tight. Trust and safety for in-person exchanges should be addressed in the next iteration.",
        false,
      ),
    },
    decision: "pass",
    feedback:
      "Meets the bar for Ready Stage. Focus next on trust and safety, and validate demand beyond move-in weeks.",
    submitted_at: "2026-09-03T14:00:00.000Z",
    created_at: "2026-09-02T15:00:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000004",
    venture_id: "20000000-0000-0000-0000-000000000004",
    advisor_id: "30000000-0000-0000-0000-000000000001",
    form_type: "ready_stage_recommendation",
    answers: {
      value_proposition: section(
        4,
        "Value is clear for students in large intro courses. Articulate why existing group chats fall short.",
      ),
      market_research: section(
        5,
        "Excellent research: enrollment data by course, a competitor teardown, and a clear wedge in large STEM courses.",
      ),
      customer_understanding: section(
        4,
        "Interviews show the problem is real, especially for commuter students. More data on repeat usage would help.",
      ),
      solution_design: section(4, "Matching flow is simple and well designed. Calendar integration is a smart next step."),
    },
    decision: "pass",
    feedback: "Strong market research and a clear wedge. Show evidence of repeat usage at the next stage.",
    submitted_at: "2026-09-10T16:45:00.000Z",
    created_at: "2026-09-09T18:00:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000005",
    venture_id: "20000000-0000-0000-0000-000000000005",
    advisor_id: "30000000-0000-0000-0000-000000000002",
    form_type: "set_stage_recommendation",
    answers: {
      value_proposition: section(
        5,
        "Compelling ROI story for building owners, with concrete savings from the two pilot buildings.",
      ),
      market_research: section(
        4,
        "Target segment is well defined. Clarify how GreenGrid competes with utility-provided dashboards.",
      ),
      customer_understanding: section(
        4,
        "Good relationships with property managers. Would like to hear more from tenants and facilities staff.",
      ),
      solution_design: section(
        5,
        "Using existing meters instead of new hardware is a strong design choice that lowers adoption friction.",
      ),
    },
    decision: "pass",
    feedback:
      "Recommended for the Set Stage pitch. The pilot savings data is the strongest part of the story; lead with it.",
    submitted_at: "2026-10-01T19:20:00.000Z",
    created_at: "2026-09-30T16:00:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000006",
    venture_id: "20000000-0000-0000-0000-000000000006",
    advisor_id: "30000000-0000-0000-0000-000000000004",
    form_type: "set_stage_evaluation",
    answers: {
      value_proposition: section(
        4,
        "Clear pain for clinic schedulers who coordinate rides by phone. Quantify the cost of missed appointments.",
      ),
      market_research: section(
        4,
        "Good understanding of the regional clinic market and payer landscape. Reimbursement risk needs a clearer plan.",
        false,
      ),
      customer_understanding: section(
        5,
        "Shadowed schedulers at three clinics. The workflow maps are excellent and clearly informed the product.",
      ),
      solution_design: section(
        5,
        "Well-scoped scheduling tool with thoughtful dispatch integration; HIPAA considerations were addressed early.",
      ),
    },
    decision: "pass",
    feedback:
      "Excellent customer understanding. Prepare a clearer reimbursement and payer strategy for the next stage.",
    submitted_at: "2026-09-15T13:10:00.000Z",
    created_at: "2026-09-14T19:30:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000007",
    venture_id: "20000000-0000-0000-0000-000000000007",
    advisor_id: "30000000-0000-0000-0000-000000000003",
    form_type: "ready_stage_recommendation",
    answers: {
      value_proposition: section(
        5,
        "Very clear promise: structured feedback on a landing page within 48 hours. Easy to understand in one sentence.",
      ),
      market_research: section(
        4,
        "Good sense of the first-time founder segment. Pricing benchmarks against design agencies would help.",
      ),
      customer_understanding: section(
        4,
        "Early users from the accelerator community are engaged. Broaden interviews beyond Northeastern founders.",
      ),
      solution_design: section(5, "Reviewer workflow and feedback templates are well thought out and already in use."),
    },
    decision: "pass",
    feedback: "Ready to move forward. The product already delivers value; next, prove willingness to pay.",
    submitted_at: "2026-10-02T17:05:00.000Z",
    created_at: "2026-10-02T13:00:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000008",
    venture_id: "20000000-0000-0000-0000-000000000008",
    advisor_id: "30000000-0000-0000-0000-000000000004",
    form_type: "set_stage_recommendation",
    answers: {
      value_proposition: section(
        4,
        "Meaningful mission and a clear problem for first-generation students navigating internships and co-ops.",
      ),
      market_research: section(
        4,
        "Good data on the first-generation population. The institutional buyer (career services) needs more exploration.",
      ),
      customer_understanding: section(
        4,
        "Student interviews are strong. Add conversations with career advisors who would champion the tool.",
      ),
      solution_design: section(
        5,
        "Mentor matching and the milestone checklist are excellent and grounded in what students described.",
      ),
    },
    decision: "pass",
    feedback: null,
    submitted_at: "2026-09-08T20:30:00.000Z",
    created_at: "2026-09-08T15:00:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000009",
    venture_id: "20000000-0000-0000-0000-000000000009",
    advisor_id: "30000000-0000-0000-0000-000000000001",
    form_type: "set_stage_evaluation",
    answers: {
      value_proposition: section(
        4,
        "Clear benefit for small-town clerks managing permits on paper. Highlight the time saved per permit.",
      ),
      market_research: section(
        5,
        "Thorough research on municipal procurement cycles and budget constraints. This is a real strength.",
      ),
      customer_understanding: section(
        4,
        "Interviews with clerks in four towns. Would like to see input from residents applying for permits.",
      ),
      solution_design: section(
        4,
        "Reasonable MVP. Plan for migrating data from existing paper and spreadsheet records.",
        false,
      ),
    },
    decision: "pass",
    feedback:
      "Strong understanding of municipal buyers. Address data migration and the resident experience before the next pitch.",
    submitted_at: "2026-09-18T15:00:00.000Z",
    created_at: "2026-09-17T14:15:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000010",
    venture_id: "20000000-0000-0000-0000-000000000010",
    advisor_id: "30000000-0000-0000-0000-000000000002",
    form_type: "set_stage_recommendation",
    answers: {
      value_proposition: section(
        5,
        "Affordable, vetted tutoring is a clear and compelling offer for families priced out of test-prep companies.",
      ),
      market_research: section(
        5,
        "Excellent market analysis with local pricing data and a clear view of the competitive landscape.",
      ),
      customer_understanding: section(
        4,
        "Parent interviews are strong. Add more on what keeps student tutors engaged over a full semester.",
      ),
      solution_design: section(
        5,
        "Vetting and scheduling flow is polished, and the pilot shows strong session completion rates.",
      ),
    },
    decision: "pass",
    feedback:
      "One of the strongest Set Stage recommendations this cycle. Focus on tutor retention going into the next stage.",
    submitted_at: "2026-09-12T18:40:00.000Z",
    created_at: "2026-09-11T17:00:00.000Z",
  }),

  // Fail evaluations: must never be visible to EIRs (filtered out by getPassedEvaluations).
  submitted({
    id: "10000000-0000-0000-0000-000000000011",
    venture_id: "20000000-0000-0000-0000-000000000011",
    advisor_id: "30000000-0000-0000-0000-000000000003",
    form_type: "ready_stage_recommendation",
    answers: {
      value_proposition: section(3, "The problem is real, but the value over existing parking apps is not yet clear."),
      market_research: section(3, "Market sizing relies on national figures; local garage data is needed."),
      customer_understanding: section(3, "Only a handful of driver interviews; garage operators have not been consulted."),
      solution_design: section(3, "The sensor hardware plan is expensive relative to expected revenue."),
    },
    decision: "fail",
    feedback: "Not ready to advance. Talk to garage operators and clarify differentiation before re-pitching.",
    submitted_at: "2026-09-28T16:00:00.000Z",
    created_at: "2026-09-28T13:30:00.000Z",
  }),
  submitted({
    id: "10000000-0000-0000-0000-000000000012",
    venture_id: "20000000-0000-0000-0000-000000000012",
    advisor_id: "30000000-0000-0000-0000-000000000004",
    form_type: "ready_stage_recommendation",
    answers: {
      value_proposition: section(3, "Convenient, but the value compared with campus convenience stores is thin."),
      market_research: section(4, "Reasonable research on residence hall demographics and competing subscription boxes."),
      customer_understanding: section(3, "Survey interest has not translated into pre-orders."),
      solution_design: section(4, "Fulfillment plan is realistic for a small launch."),
    },
    decision: "fail",
    feedback: "Promising operations, but demand needs validation. Run a pre-order test before resubmitting.",
    submitted_at: "2026-09-05T14:30:00.000Z",
    created_at: "2026-09-04T16:00:00.000Z",
  }),
];

const venturesById = new Map(MOCK_VENTURES.map((venture) => [venture.id, venture]));
const advisorsById = new Map(MOCK_ADVISORS.map((advisor) => [advisor.id, advisor]));

/** Same rule as the "EIRs read submitted passing evaluations" RLS policy. */
function isVisibleToEir(row: EvaluationRow): boolean {
  return row.status === "submitted" && row.decision === "pass";
}

function submittedTime(row: EvaluationRow): number {
  return Date.parse(row.submitted_at ?? row.updated_at);
}

// ---------------------------------------------------------------------------
// Accessors (swap these for Supabase queries later)
// ---------------------------------------------------------------------------

/** All evaluations an EIR may see: submitted + pass, newest first. */
export async function getPassedEvaluations(): Promise<EirEvaluation[]> {
  return MOCK_EVALUATIONS.filter(isVisibleToEir)
    .flatMap((row) => {
      const venture = venturesById.get(row.venture_id);
      const advisor = advisorsById.get(row.advisor_id);
      return venture && advisor ? [{ ...row, venture, advisor }] : [];
    })
    .sort((a, b) => submittedTime(b) - submittedTime(a));
}

export async function getRecentPassedEvaluations(limit = 5): Promise<EirEvaluation[]> {
  const evaluations = await getPassedEvaluations();
  return evaluations.slice(0, limit);
}

/** Returns null for unknown IDs and for any evaluation that isn't submitted + pass. */
export async function getEvaluationById(id: string): Promise<EirEvaluation | null> {
  const evaluations = await getPassedEvaluations();
  return evaluations.find((evaluation) => evaluation.id === id) ?? null;
}
