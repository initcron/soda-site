import { courses, type Course } from "./courses";

export type PathKind = "flagship" | "free" | "core";
export type PathStatus = "available" | "launching" | "planned";

export interface PathModule {
  title: string;
  topics: string;
}

export interface Certification {
  name: string;
  status: "planned";
  format: string;
}

export interface LearningPath {
  slug: string;
  number: string;
  title: string;
  /** Short label for nav, chips and filters. */
  shortTitle: string;
  kind: PathKind;
  status: PathStatus;
  /** One line that says which side of production AI this path covers. */
  tagline: string;
  description: string;
  audience: string[];
  outcomes: string[];
  modules: PathModule[];
  /** Courses you can take today. The full curriculum is in `modules`. */
  courseSlugs: string[];
  capstone?: string;
  certification?: Certification;
  prerequisitePathSlug?: string;
}

export interface Specialisation {
  slug: string;
  title: string;
  description: string;
  topics: string[];
  status: "planned";
  courseSlugs?: string[];
}

export interface CareerRoadmap {
  slug: string;
  title: string;
  startingFrom: string;
  description: string;
  pathSlugs: string[];
}

export const paths: LearningPath[] = [
  {
    slug: "agentic-devops",
    number: "01",
    title: "Agentic DevOps",
    shortTitle: "Agentic DevOps",
    kind: "flagship",
    status: "launching",
    tagline: "AI and agents for DevOps and software delivery.",
    description:
      "Put AI assistants and agents to work across the delivery lifecycle: infrastructure as code, pipelines, reviews and incidents. You stay accountable for quality, security and every production change.",
    audience: [
      "DevOps, SRE and platform engineers",
      "Developers and QA engineers who now own delivery",
      "Engineering leads setting team standards for agent use",
    ],
    outcomes: [
      "Run coding agents in daily ops work with permission modes, context and tool access you have designed on purpose",
      "Have agents write and review Terraform, Kubernetes manifests and pipelines behind pull-request and policy gates",
      "Move an agent up the authority ladder one step at a time: read-only, PR-only, approval-gated, bounded autonomy",
      "Build an incident triage agent with read-only tools and score its findings against real failures",
      "Measure whether an agent workflow is worth its cost before you roll it out to a team",
    ],
    modules: [
      {
        title: "AI-augmented DevOps",
        topics:
          "Claude Code, Codex and Copilot agents in ops work. Context, instructions, skills, MCP tools and permission modes.",
      },
      {
        title: "Agentic infrastructure as code",
        topics:
          "Agents that write and review Terraform and Ansible. PR-only workflows and policy-as-code gates.",
      },
      {
        title: "Agents in CI/CD",
        topics:
          "Agents that investigate failed builds and propose fixes. Test generation, review and quality gates.",
      },
      {
        title: "The authority ladder",
        topics:
          "Read-only, PR-only, approval-gated and bounded autonomy. The evidence each step needs before you grant it.",
      },
      {
        title: "AI for SRE",
        topics:
          "Alert investigation, log and trace correlation, and root-cause summaries you can check.",
      },
      {
        title: "Evaluation and cost",
        topics:
          "Scoring agent output, audit trails, and comparing subscription, metered API and agent-run costs.",
      },
    ],
    courseSlugs: [
      "aiml-foundations",
      "ai-driven-iac",
      "docker-genai-agentic",
      "agentic-devops-bootcamp",
    ],
    capstone:
      "An agent that is allowed to fix one thing: scoped credentials, an approval gate, an audit log, and a measured before-and-after on time to diagnose injected failures.",
    certification: {
      name: "School of DevOps Certified Agentic DevOps Engineer",
      status: "planned",
      format: "Planned format: hands-on exam plus a reviewed capstone",
    },
  },
  {
    slug: "ai-platform-engineering",
    number: "02",
    title: "AI Platform Engineering with Kubernetes",
    shortTitle: "AI Platform Engineering",
    kind: "flagship",
    status: "launching",
    tagline: "Build and operate the platforms that serve models.",
    description:
      "Design, build and run an LLM platform on Kubernetes: GPUs, scheduling, inference serving, gateways, observability and cost. You also learn when a hosted model API is the better answer.",
    audience: [
      "Platform, cloud and DevOps engineers",
      "SREs who will be on call for AI services",
      "MLOps engineers moving to LLM inference",
    ],
    outcomes: [
      "Decide between a hosted model API and self-hosting on cost, control and risk",
      "Share and schedule GPUs across teams with quotas and isolation that hold",
      "Serve models with vLLM and KServe behind an inference-aware gateway",
      "Set SLOs for an AI service and watch latency, throughput, failures and cost per token",
      "Hand a platform to another team with runbooks, dashboards and a load test report",
    ],
    modules: [
      {
        title: "AI infrastructure for platform engineers",
        topics:
          "How LLM inference works, hosted APIs versus self-hosting, and where Kubernetes is and is not justified.",
      },
      {
        title: "GPU foundations on Kubernetes",
        topics:
          "GPU Operator, Dynamic Resource Allocation, MIG and time-slicing.",
      },
      {
        title: "GPU sharing and scheduling",
        topics: "Kueue queues and quotas, HAMi, and tenant isolation.",
      },
      {
        title: "Inference serving",
        topics:
          "vLLM as the engine, KServe as the platform, autoscaling and rollout.",
      },
      {
        title: "Gateways and routing",
        topics:
          "Inference-aware routing, AI gateways, access control, quotas and usage tracking.",
      },
      {
        title: "Observability, reliability and cost",
        topics:
          "OpenTelemetry, GPU metrics, SLOs for AI services and cost per 1,000 tokens.",
      },
    ],
    courseSlugs: [
      "aiml-foundations",
      "docker-genai-agentic",
      "devops-to-mlops-bootcamp",
      "llmops-with-kubernetes",
    ],
    capstone:
      "Ship a multi-tenant inference platform: two models on shared GPUs, served behind an inference-aware gateway, with SLOs, a cost dashboard and a load test report.",
    certification: {
      name: "School of DevOps Certified AI Platform Engineer",
      status: "planned",
      format: "Planned format: hands-on exam plus a reviewed capstone",
    },
    prerequisitePathSlug: "kubernetes-platform-engineering",
  },
  {
    slug: "agenticops-kubernetes",
    number: "03",
    title: "AgenticOps: Agentic Engineering with Kubernetes",
    shortTitle: "AgenticOps",
    kind: "flagship",
    status: "planned",
    tagline: "Run agents as production workloads.",
    description:
      "An agent is a workload you host and a worker you trust. This track covers the runtime, identity, sandboxing, gateways and guardrails that let agents run on Kubernetes without becoming your next incident.",
    audience: [
      "Platform and DevOps engineers asked to host agents",
      "SREs and security engineers who must govern them",
      "Architects designing an agent platform",
    ],
    outcomes: [
      "Run agents on Kubernetes with kagent, Agent Sandbox and Agent Substrate",
      "Give each agent its own identity, scoped credentials and network policy",
      "Put MCP servers behind a gateway with allowlists, pinning and audit",
      "Apply guardrails for prompt injection, tool misuse and data exposure",
      "Trace, evaluate and cost every agent run",
    ],
    modules: [
      {
        title: "Agents as workloads",
        topics:
          "What changes when the workload reasons and acts. Runtime patterns on Kubernetes.",
      },
      {
        title: "Agent runtimes",
        topics: "kagent, Agent Sandbox, Agent Substrate and AX.",
      },
      {
        title: "Tools and MCP",
        topics:
          "ToolHive, MCP servers, registries, version pinning and scoped tokens.",
      },
      {
        title: "Agent gateways",
        topics: "agentgateway, routing, authentication, quotas and policy.",
      },
      {
        title: "Guardrails and sandboxing",
        topics:
          "gVisor and Kata isolation, input and output guardrails, the OWASP Top 10 for Agentic Applications.",
      },
      {
        title: "Operating agents",
        topics: "Tracing, evaluation, audit logs, cost and incident response.",
      },
    ],
    courseSlugs: [],
    capstone:
      "Host a team of agents on Kubernetes in sandboxes, behind an agent gateway, with scoped identities, MCP policy and a full audit trail.",
    certification: {
      name: "School of DevOps Certified AgentOps Engineer",
      status: "planned",
      format: "Planned format: hands-on exam plus a reviewed capstone",
    },
    prerequisitePathSlug: "kubernetes-platform-engineering",
  },
  {
    slug: "sre-foundations",
    number: "04",
    title: "SRE Foundations",
    shortTitle: "SRE Foundations",
    kind: "free",
    status: "available",
    tagline: "The free starting point for DevOps and SRE.",
    description:
      "Everything you need before the AI tracks: Linux, Docker, Kubernetes essentials, AWS, Terraform, Ansible and CI/CD. This path will be free in LearnForge, our desktop app. Until LearnForge is released, the courses are on Udemy.",
    audience: [
      "Anyone starting a DevOps or SRE career",
      "Developers and QA engineers who need the operations basics",
      "Experienced engineers filling a gap before an AI track",
    ],
    outcomes: [
      "Build and run containers, and deploy workloads to Kubernetes",
      "Provision cloud infrastructure on AWS with Terraform",
      "Configure servers at scale with Ansible",
      "Build CI/CD pipelines that test and ship on every commit",
    ],
    modules: [
      {
        title: "Linux, Git and the shell",
        topics: "The working environment for everything that follows.",
      },
      {
        title: "Docker and Kubernetes essentials",
        topics: "Images, containers, pods, deployments and services.",
      },
      {
        title: "AWS",
        topics: "Compute, networking, storage and identity.",
      },
      {
        title: "Terraform",
        topics: "Providers, state, modules and workflows.",
      },
      {
        title: "Ansible",
        topics: "Playbooks, roles and inventories.",
      },
      {
        title: "CI/CD",
        topics: "Pipelines with Jenkins and Docker.",
      },
    ],
    courseSlugs: [
      "ultimate-devops-bootcamp",
      "ultimate-aws-bootcamp",
      "ultimate-terraform-bootcamp",
      "ultimate-ansible-bootcamp",
      "cicd-jenkins-docker",
    ],
    capstone:
      "Take one application from a Git commit to a running Kubernetes deployment: infrastructure from Terraform, configuration from Ansible, and a pipeline that tests and ships it.",
    certification: {
      name: "School of DevOps Certified SRE/DevOps Engineer",
      status: "planned",
      format: "Planned format: hands-on exam. The learning path is free; the exam is optional",
    },
  },
  {
    slug: "kubernetes-platform-engineering",
    number: "05",
    title: "Kubernetes Platform Engineering",
    shortTitle: "Kubernetes Platform",
    kind: "core",
    status: "available",
    tagline: "The Kubernetes depth the AI tracks build on.",
    description:
      "From cluster administration to GitOps, service mesh and security. Take this if you will run AI platforms or agents on Kubernetes and need production depth first.",
    audience: [
      "DevOps engineers moving into platform work",
      "Engineers preparing for the AI Platform Engineering or AgenticOps tracks",
    ],
    outcomes: [
      "Administer and troubleshoot production Kubernetes clusters",
      "Deliver with GitOps and progressive rollouts using Argo",
      "Run managed Kubernetes on AWS with EKS",
      "Secure the pipeline and the mesh with DevSecOps practices and Istio",
    ],
    modules: [
      {
        title: "Kubernetes administration",
        topics: "Architecture, workloads, networking, storage, troubleshooting.",
      },
      {
        title: "GitOps and progressive delivery",
        topics: "Argo CD, Argo Workflows and Argo Rollouts.",
      },
      {
        title: "Managed Kubernetes on AWS",
        topics: "EKS provisioning, networking, IAM and operations.",
      },
      {
        title: "DevSecOps",
        topics: "SAST, DAST, image scanning, secrets and policy as code.",
      },
      {
        title: "Service mesh",
        topics: "Istio traffic management, mTLS and observability.",
      },
    ],
    courseSlugs: [
      "advanced-kubernetes-bootcamp",
      "ultimate-argo-bootcamp",
      "ultimate-eks-bootcamp",
      "ultimate-devsecops-bootcamp",
      "ultimate-istio-bootcamp",
    ],
    prerequisitePathSlug: "sre-foundations",
  },
];

export const specialisations: Specialisation[] = [
  {
    slug: "ai-security-devsecops",
    title: "AI Security & DevSecOps",
    description:
      "Secure AI applications and agents, and harden delivery pipelines against attackers who also use AI.",
    topics: [
      "OWASP LLM and Agentic Top 10",
      "Prompt injection and data exposure",
      "MCP supply chain",
      "Agent identity and permissions",
    ],
    status: "planned",
    courseSlugs: ["ultimate-devsecops-bootcamp"],
  },
  {
    slug: "finops-for-ai",
    title: "FinOps for AI & Agents",
    description:
      "Get an acceptable outcome at an acceptable cost across subscriptions, metered APIs, agent runs and self-hosted GPUs.",
    topics: [
      "Cost per token and per agent run",
      "Hosted versus self-hosted economics",
      "Quotas and chargeback",
      "GPU utilisation",
    ],
    status: "planned",
  },
  {
    slug: "guardrails-grc",
    title: "Guardrails & GRC",
    description:
      "Governance, risk and compliance for teams that let AI touch production, written for engineers who must implement it.",
    topics: [
      "Policy as code for agents",
      "Audit and evidence",
      "EU AI Act and sector rules",
      "Approval and escalation design",
    ],
    status: "planned",
  },
  {
    slug: "ai-sre",
    title: "AI SRE",
    description:
      "Use agents for incident investigation, and apply SRE practice to AI services: SLOs, failure modes and on-call.",
    topics: [
      "Agent-assisted triage",
      "Evaluating root-cause analysis",
      "SLOs for model gateways",
      "Reliability of agent systems",
    ],
    status: "planned",
  },
];

export const roadmaps: CareerRoadmap[] = [
  {
    slug: "ops-to-agentic-devops",
    title: "Agentic DevOps Engineer",
    startingFrom: "DevOps, SRE or platform engineer",
    description:
      "You already run delivery and operations. Add agents to that work, then learn to host and govern them as production workloads.",
    pathSlugs: ["agentic-devops", "agenticops-kubernetes"],
  },
  {
    slug: "ops-to-ai-platform",
    title: "AI Platform Engineer",
    startingFrom: "DevOps, cloud or platform engineer",
    description:
      "Deepen your Kubernetes practice, build and operate an LLM platform on it, then extend that platform to run agents.",
    pathSlugs: [
      "kubernetes-platform-engineering",
      "ai-platform-engineering",
      "agenticops-kubernetes",
    ],
  },
  {
    slug: "developer-to-agentic-delivery",
    title: "Developer who owns delivery",
    startingFrom: "Software developer or QA engineer",
    description:
      "Pick up the operations basics for free, then use agents safely across testing, delivery and operations.",
    pathSlugs: ["sre-foundations", "agentic-devops"],
  },
  {
    slug: "new-to-devops",
    title: "New to DevOps and SRE",
    startingFrom: "Student or career changer",
    description:
      "Start with the free foundations, add Kubernetes depth, and you are ready for any of the AI tracks.",
    pathSlugs: ["sre-foundations", "kubernetes-platform-engineering"],
  },
];

/** Path slugs that existed before the 2026-11 repositioning. */
const retiredPathSlugs: Record<string, string> = {
  "devops-engineer": "sre-foundations",
  "kubernetes-platform-engineer": "kubernetes-platform-engineering",
  "ai-augmented-devops": "agentic-devops",
  "agentic-devops-engineer": "agentic-devops",
  "ai-platform-engineer": "ai-platform-engineering",
};

export function getPathBySlug(slug: string): LearningPath | undefined {
  return paths.find((p) => p.slug === slug);
}

/** Maps a current or retired slug to a current one. */
export function resolvePathSlug(slug: string): string | undefined {
  if (getPathBySlug(slug)) return slug;
  return retiredPathSlugs[slug];
}

export function getFlagshipPaths(): LearningPath[] {
  return paths.filter((p) => p.kind === "flagship");
}

/** Paths that end in a certification: flagship tracks first, then the rest. */
export function getCertifiedPaths(): LearningPath[] {
  const certified = paths.filter((p) => p.certification);
  return [
    ...certified.filter((p) => p.kind === "flagship"),
    ...certified.filter((p) => p.kind !== "flagship"),
  ];
}

export function getFreePath(): LearningPath {
  return paths.find((p) => p.kind === "free")!;
}

/** A course is free if it is flagged free or belongs to the free path. */
export function isFreeCourse(course: Course): boolean {
  return course.free === true || getFreePath().courseSlugs.includes(course.slug);
}

export function getCoursesForPath(pathSlug: string): Course[] {
  const path = getPathBySlug(pathSlug);
  if (!path) return [];
  return path.courseSlugs
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter((c): c is Course => c !== undefined);
}
