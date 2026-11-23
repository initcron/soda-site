export type AreaId = "foundations" | "kubernetes" | "agentic" | "platform" | "agentops";

export type GoalId = "agentic-devops" | "ai-platform-engineering" | "agenticops-kubernetes";

export interface Area {
  id: AreaId;
  title: string;
  /** Path that teaches this area. */
  pathSlug: string;
}

export interface Question {
  id: string;
  area: AreaId;
  text: string;
}

export interface Goal {
  id: GoalId;
  label: string;
  pathSlug: string;
}

export const MAX_ANSWER = 3;

/** Index is the answer value. */
export const answerLabels = [
  "Never done it",
  "Read or watched",
  "Done it in a lab",
  "Run it in production",
];

/** Below this percentage an area counts as a gap. */
const READY_AT = 50;

export const areas: Area[] = [
  { id: "foundations", title: "DevOps and SRE foundations", pathSlug: "sre-foundations" },
  { id: "kubernetes", title: "Kubernetes platform depth", pathSlug: "kubernetes-platform-engineering" },
  { id: "agentic", title: "Agents in delivery and operations", pathSlug: "agentic-devops" },
  { id: "platform", title: "AI platforms and inference", pathSlug: "ai-platform-engineering" },
  { id: "agentops", title: "Running agents in production", pathSlug: "agenticops-kubernetes" },
];

export const goals: Goal[] = [
  {
    id: "agentic-devops",
    label: "Use AI and agents in my delivery and operations work",
    pathSlug: "agentic-devops",
  },
  {
    id: "ai-platform-engineering",
    label: "Build and run the platform that serves models",
    pathSlug: "ai-platform-engineering",
  },
  {
    id: "agenticops-kubernetes",
    label: "Host and govern agents as production workloads",
    pathSlug: "agenticops-kubernetes",
  },
];

export const questions: Question[] = [
  { id: "f1", area: "foundations", text: "Built a container image and deployed it to Kubernetes" },
  { id: "f2", area: "foundations", text: "Provisioned cloud infrastructure with Terraform" },
  { id: "f3", area: "foundations", text: "Built a CI/CD pipeline that tests and deploys on commit" },
  { id: "f4", area: "foundations", text: "Set up monitoring and alerts for a service" },

  { id: "k1", area: "kubernetes", text: "Debugged a failing workload down to node, network or storage" },
  { id: "k2", area: "kubernetes", text: "Delivered with GitOps and a progressive rollout" },
  { id: "k3", area: "kubernetes", text: "Set RBAC, network policy and resource quotas for several teams" },
  { id: "k4", area: "kubernetes", text: "Upgraded a cluster that other teams depend on" },

  { id: "a1", area: "agentic", text: "Used a coding agent for infrastructure or pipeline work" },
  { id: "a2", area: "agentic", text: "Configured an agent's permissions, context and tool access on purpose" },
  { id: "a3", area: "agentic", text: "Put agent-written changes behind pull-request and policy gates" },
  { id: "a4", area: "agentic", text: "Had an agent investigate an incident and checked its conclusion" },

  { id: "p1", area: "platform", text: "Served an open model yourself, for example with vLLM" },
  { id: "p2", area: "platform", text: "Scheduled or shared GPUs across workloads" },
  { id: "p3", area: "platform", text: "Put a gateway in front of models for routing, quotas or usage tracking" },
  { id: "p4", area: "platform", text: "Tracked latency, throughput and cost per token for an AI service" },

  { id: "o1", area: "agentops", text: "Deployed an agent as a long-running workload on Kubernetes" },
  { id: "o2", area: "agentops", text: "Given an agent its own identity and scoped credentials" },
  { id: "o3", area: "agentops", text: "Run MCP servers behind a gateway or allowlist" },
  { id: "o4", area: "agentops", text: "Sandboxed an agent and kept an audit trail of what it did" },
];

export interface AreaScore {
  score: number;
  max: number;
  percent: number;
}

export interface AssessmentResult {
  areas: Record<AreaId, AreaScore>;
  recommendedPathSlug: string;
  reason: string;
}

function clamp(value: unknown): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.min(MAX_ANSWER, Math.max(0, Math.round(value)));
}

export function scoreAssessment(
  answers: Record<string, number>,
  goalId: GoalId,
): AssessmentResult {
  const scored = {} as Record<AreaId, AreaScore>;
  for (const area of areas) {
    const inArea = questions.filter((q) => q.area === area.id);
    const score = inArea.reduce((sum, q) => sum + clamp(answers[q.id]), 0);
    const max = inArea.length * MAX_ANSWER;
    scored[area.id] = { score, max, percent: Math.round((score / max) * 100) };
  }

  const goal = goals.find((g) => g.id === goalId) ?? goals[0];

  if (scored.foundations.percent < READY_AT) {
    return {
      areas: scored,
      recommendedPathSlug: "sre-foundations",
      reason:
        "Your answers show gaps in the DevOps and SRE basics. Close those first with the free path; every track assumes them.",
    };
  }

  const needsKubernetes = goal.id !== "agentic-devops";
  if (needsKubernetes && scored.kubernetes.percent < READY_AT) {
    return {
      areas: scored,
      recommendedPathSlug: "kubernetes-platform-engineering",
      reason:
        "Your goal runs on Kubernetes, and your answers show you would be learning Kubernetes operations and the AI layer at the same time. Build the Kubernetes depth first.",
    };
  }

  return {
    areas: scored,
    recommendedPathSlug: goal.pathSlug,
    reason:
      "You have the prerequisites. Start the track that matches your goal and use the scores below to see which modules will be new to you.",
  };
}
