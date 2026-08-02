import { courses, type Course } from "./courses";

export interface LearningPath {
  slug: string;
  number: string;
  title: string;
  description: string;
  courseSlugs: string[];
  status: "published" | "coming-soon";
  prerequisitePathSlug?: string;
}

export interface CareerRoadmap {
  slug: string;
  title: string;
  description: string;
  pathSlugs: string[];
}

export const paths: LearningPath[] = [
  {
    slug: "devops-engineer",
    number: "01",
    title: "DevOps Engineer",
    description:
      "Build a solid DevOps foundation with cloud infrastructure, configuration management, and CI/CD pipelines. The starting point for every modern infrastructure career.",
    courseSlugs: [
      "ultimate-aws-bootcamp",
      "ultimate-terraform-bootcamp",
      "ultimate-ansible-bootcamp",
      "ultimate-devops-bootcamp",
      "cicd-jenkins-docker",
    ],
    status: "published",
  },
  {
    slug: "kubernetes-platform-engineer",
    number: "02",
    title: "Kubernetes Platform Engineer",
    description:
      "From core Kubernetes to GitOps, service mesh, and security. Build and operate production-grade container platforms at scale.",
    courseSlugs: [
      "advanced-kubernetes-bootcamp",
      "ultimate-argo-bootcamp",
      "ultimate-eks-bootcamp",
      "ultimate-devsecops-bootcamp",
      "ultimate-istio-bootcamp",
    ],
    status: "published",
    prerequisitePathSlug: "devops-engineer",
  },
  {
    slug: "ai-augmented-devops",
    number: "03",
    title: "AI Augmented DevOps Engineer",
    description:
      "Bring AI into your DevOps toolkit. From ML foundations to AI-driven infrastructure automation, learn to work smarter with AI-assisted workflows.",
    courseSlugs: ["aiml-foundations", "ai-driven-iac"],
    status: "published",
  },
  {
    slug: "agentic-devops-engineer",
    number: "04",
    title: "Agentic DevOps Engineer",
    description:
      "Design, deploy, and operate autonomous AI agent systems within DevOps pipelines. The frontier of AI-powered infrastructure.",
    courseSlugs: ["aiml-foundations", "ai-driven-iac", "docker-genai-agentic", "agentic-devops-bootcamp"],
    status: "published",
    prerequisitePathSlug: "ai-augmented-devops",
  },
  {
    slug: "ai-platform-engineer",
    number: "05",
    title: "AI Platform Engineer (MLOps)",
    description:
      "Build, deploy, and operate ML systems that survive contact with production. The bridge from DevOps expertise to MLOps mastery.",
    courseSlugs: [
      "aiml-foundations",
      "docker-genai-agentic",
      "devops-to-mlops-bootcamp",
      "llmops-with-kubernetes",
    ],
    status: "published",
  },
];

export const roadmaps: CareerRoadmap[] = [
  {
    slug: "devops-platform-engineer",
    title: "DevOps / Platform Engineer",
    description:
      "From DevOps fundamentals through production Kubernetes platforms. The complete path to designing platforms that give teams velocity without compromise.",
    pathSlugs: ["devops-engineer", "kubernetes-platform-engineer"],
  },
  {
    slug: "ai-platform-engineer-career",
    title: "AI Platform Engineer",
    description:
      "From AI foundations through MLOps and LLMOps. Build the infrastructure that makes machine learning production-ready.",
    pathSlugs: ["ai-augmented-devops", "ai-platform-engineer"],
  },
  {
    slug: "agentic-devops-engineer-career",
    title: "Agentic DevOps Engineer",
    description:
      "From AI-augmented workflows to fully autonomous agent systems. The frontier career path for AI-native infrastructure engineers.",
    pathSlugs: ["ai-augmented-devops", "agentic-devops-engineer"],
  },
];

export function getPathBySlug(slug: string): LearningPath | undefined {
  return paths.find((p) => p.slug === slug);
}

export function getCoursesForPath(pathSlug: string): Course[] {
  const path = getPathBySlug(pathSlug);
  if (!path) return [];
  return path.courseSlugs
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter((c): c is Course => c !== undefined);
}
