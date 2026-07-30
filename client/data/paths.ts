import { courses, type Course } from "./courses";

export interface LearningPath {
  slug: string;
  number: string;
  title: string;
  description: string;
  courseSlugs: string[];
  status: "published" | "coming-soon";
}

export const paths: LearningPath[] = [
  {
    slug: "devops-platform-engineer",
    number: "01",
    title: "DevOps / Platform Engineer",
    description:
      "From fundamentals to production Kubernetes, service mesh, and GitOps. The complete path to designing platforms that give teams velocity without compromise.",
    courseSlugs: [
      "ultimate-devops-bootcamp",
      "ultimate-ansible-bootcamp",
      "cicd-jenkins-docker",
      "ultimate-aws-bootcamp",
      "ultimate-eks-bootcamp",
      "advanced-kubernetes-bootcamp",
      "ultimate-argo-bootcamp",
      "ultimate-istio-bootcamp",
      "ultimate-devsecops-bootcamp",
      "windows-containers-azure",
    ],
    status: "published",
  },
  {
    slug: "agentic-devops",
    number: "02",
    title: "Agentic DevOps (AI for DevOps)",
    description:
      "Bring AI and agentic workflows into reliable, observable engineering practice. From ML foundations to AI-driven infrastructure automation.",
    courseSlugs: ["aiml-foundations", "docker-genai-agentic", "ai-driven-iac"],
    status: "published",
  },
  {
    slug: "ai-platform-engineer",
    number: "03",
    title: "AI Platform Engineer (DevOps for AI)",
    description:
      "Build, deploy, and operate ML systems that survive contact with production. The bridge from DevOps expertise to MLOps mastery.",
    courseSlugs: ["devops-to-mlops-bootcamp"],
    status: "published",
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
