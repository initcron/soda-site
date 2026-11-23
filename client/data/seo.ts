import { courses, getCourseBySlug } from "./courses";
import { getFlagshipPaths, getPathBySlug, paths } from "./paths";

export const SITE_URL = "https://schoolofdevops.com";
export const SITE_NAME = "School of DevOps";

export interface Seo {
  title: string;
  description: string;
  noindex?: boolean;
}

const suffix = ` | ${SITE_NAME}`;

const staticPages: Record<string, Seo> = {
  "/": {
    title: `${SITE_NAME} | Run AI in production. Safely.`,
    description:
      "Courses, learning paths and certifications in Agentic DevOps, AI Platform Engineering and AgenticOps on Kubernetes, for experienced DevOps, SRE and platform engineers. Free SRE Foundations path.",
  },
  "/courses": {
    title: `Course catalogue${suffix}`,
    description:
      "Every School of DevOps course, filterable by track: Agentic DevOps, AI Platform Engineering, Kubernetes, Terraform, Ansible, AWS and CI/CD.",
  },
  "/learning-paths": {
    title: `Tracks and learning paths${suffix}`,
    description:
      "Three flagship tracks in production AI engineering, a free SRE Foundations path, and Kubernetes platform depth in between.",
  },
  "/certifications": {
    title: `Certifications${suffix}`,
    description:
      "Four planned hands-on certifications: Certified Agentic DevOps Engineer, Certified AI Platform Engineer, Certified AgentOps Engineer and Certified SRE/DevOps Engineer.",
  },
  "/for-teams": {
    title: `Team training${suffix}`,
    description:
      "Instructor-led, hands-on training in Agentic DevOps and AI Platform Engineering for DevOps, SRE and platform teams.",
  },
  "/roadmaps": {
    title: `Career roadmaps${suffix}`,
    description:
      "The route from the job you have now to production AI engineering, by starting role: DevOps, SRE, platform engineer, developer or QA.",
  },
  "/resources": {
    title: `Resources${suffix}`,
    description:
      "Free tools for engineers moving into production AI: a skills self-assessment, the production AI map, manager briefs and career roadmaps.",
  },
  "/resources/skills-assessment": {
    title: `Production AI engineering skills self-assessment${suffix}`,
    description:
      "Twenty questions about work you have actually done. Get a score in five areas and the learning path to start on. Free, no sign-up.",
  },
  "/resources/production-ai-map": {
    title: `The production AI map${suffix}`,
    description:
      "Two columns, one bridge, one floor: AI as the workload, AI as the worker, agents in production, and the guardrails everything stands on.",
  },
  "/get-learnforge": {
    title: `Get LearnForge${suffix}`,
    description:
      "LearnForge is the desktop app for School of DevOps courses: lessons, terminal labs and quizzes on macOS, Windows and Linux, online or offline.",
  },
  "/about": {
    title: `About Gourav Shah${suffix}`,
    description:
      "School of DevOps is led by Gourav Shah, course author for The Linux Foundation, with 12,000+ hours of hands-on workshops delivered.",
  },
  "/legal": {
    title: `Privacy and disclosure${suffix}`,
    description:
      "Who runs schoolofdevops.com, how the Udemy course links work, what the site collects and which services it relies on.",
  },
  "/legacy-access": {
    title: `Legacy access${suffix}`,
    description: "Access for learners on the previous School of DevOps course platform. This page is being prepared.",
    noindex: true,
  },
};

const notFound: Seo = {
  title: `Page not found${suffix}`,
  description: "This page does not exist. Browse the School of DevOps tracks and course catalogue.",
  noindex: true,
};

/** Meta descriptions are cut at a word boundary so previews are not truncated mid-word. */
function clip(text: string, max = 300): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function normalise(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function getSeo(pathname: string): Seo {
  const path = normalise(pathname);
  if (staticPages[path]) return staticPages[path];

  const [, section, slug, sub] = path.split("/");

  if (section === "courses" && slug && !sub) {
    const course = getCourseBySlug(slug);
    if (course) return { title: `${course.title}${suffix}`, description: clip(course.description) };
  }

  if (section === "learning-paths" && slug && !sub) {
    const learningPath = getPathBySlug(slug);
    if (learningPath) {
      return { title: `${learningPath.title}${suffix}`, description: clip(learningPath.description) };
    }
  }

  if (section === "resources" && slug === "manager-brief" && sub) {
    const track = getFlagshipPaths().find((p) => p.slug === sub);
    if (track) {
      return {
        title: `Manager brief: ${track.title}${suffix}`,
        description: `A one-page brief to make the case for the ${track.title} track: what you will learn, what the team gets back, and what it covers.`,
      };
    }
  }

  return notFound;
}

/** Every route that is written to static HTML at build time. */
export function getPrerenderRoutes(): string[] {
  return [
    ...Object.keys(staticPages),
    ...courses.map((c) => `/courses/${c.slug}`),
    ...paths.map((p) => `/learning-paths/${p.slug}`),
    ...getFlagshipPaths().map((p) => `/resources/manager-brief/${p.slug}`),
  ];
}

export function getSitemapRoutes(): string[] {
  return getPrerenderRoutes().filter((route) => !getSeo(route).noindex);
}

/** GitHub Pages serves each page from a directory, so canonical URLs end in a slash. */
export function canonicalUrl(pathname: string): string {
  const path = normalise(pathname);
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}
