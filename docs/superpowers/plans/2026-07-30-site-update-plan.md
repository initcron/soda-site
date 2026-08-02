# SODA Site Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder content with real Udemy course data, centralized data model, dynamic routing, learning path detail pages, and roadmap visualization.

**Architecture:** Data-driven SPA. Centralized `client/data/` layer holds all course and path data (scraped from Udemy, stored as static TypeScript). Dynamic React Router routes (`/courses/:slug`, `/learning-paths/:slug`) feed a single reusable component per entity type. All pages follow the existing design language (off-white bg, dark green-black text, lime accent, Space Grotesk/Manrope/DM Mono fonts).

**Tech Stack:** Vite 8, React 18, React Router 6, Tailwind CSS 3, shadcn/ui (Accordion), lucide-react icons, vitest for tests.

## Global Constraints

- GitHub Pages deployment — client-side routing only, no server-side rendering
- Base path: `/soda-site/` in production (set in `vite.config.ts`)
- Existing design tokens: bg `#f7f7f2`, text `#13201e`, lime `#d9ff5a`, olive `#6d8700`/`#789200`
- Fonts: Space Grotesk (display), Manrope (body), DM Mono (mono)
- CSS classes: `.page-shell`, `.eyebrow`, `.section-title`, `.button-primary`, `.path-card`, `.course-card`
- Path alias: `@` → `./client`
- Package manager: pnpm
- Tests: vitest (`pnpm test`)
- All Udemy links must include `?referralCode=` parameter
- "Coming Soon" courses have `status: "coming-soon"`, no Udemy URL

---

### Task 1: Scrape Udemy Course Metadata

**Purpose:** Fetch each Udemy course page to extract description, outcomes, curriculum, rating, student count, and duration. Output a JSON file consumed by Task 2.

**Files:**
- Create: `sandbox/udemy_courses_scraped.json`

**Interfaces:**
- Consumes: Course URLs from `sandbox/udemy_courses.txt` plus corrected URLs:
  - Istio: `https://www.udemy.com/course/ultimate-istio-bootcamp/?referralCode=BE5DC388AC12CF94DC31`
  - DevSecOps: `https://www.udemy.com/course/ultimate_devsecops_bootcamp/?referralCode=82189A9CE8EEC401274F`
- Produces: `sandbox/udemy_courses_scraped.json` with this schema per course:
  ```json
  {
    "url": "https://www.udemy.com/course/slug/?referralCode=...",
    "title": "Course Title",
    "description": "Full description paragraph(s)",
    "outcomes": ["What you'll learn item 1", "..."],
    "curriculum": [{"title": "Section 1 title", "description": "Brief section summary"}],
    "rating": "4.7",
    "students": "45000",
    "duration": "32 hours",
    "level": "Intermediate"
  }
  ```

- [ ] **Step 1: Fetch each Udemy course page and extract metadata**

Use `WebFetch` (or `curl` if WebFetch unavailable) on each of these 14 URLs. Extract from the HTML: course description, "What you'll learn" section, curriculum section titles, rating, number of students, total duration, and level.

Full URL list (with corrected Istio and DevSecOps URLs):
```
https://www.udemy.com/course/ultimate-devops-bootcamp-by-school-of-devops/?referralCode=A8BF1965E5F822B8EDE1
https://www.udemy.com/course/ultimate-ansible-bootcamp/?referralCode=706F8C8965DDD15F55DA
https://www.udemy.com/course/ultimate-jenkins-bootcamp-by-school-of-devops/?referralCode=BAC80386E38F767AC155
https://www.udemy.com/course/aws-devops-bootcamp/?referralCode=B41341BB6F35E5A8CBA2
https://www.udemy.com/course/ultimate-eks-bootcamp-school-of-devops/?referralCode=C52888C854D71EA8AD9B
https://www.udemy.com/course/kubernetes-certified-administrator/?referralCode=668C42F019B5D127006A
https://www.udemy.com/course/ultimate-argo-bootcamp-by-school-of-devops/?referralCode=F34684D2947EDD2A8EF8
https://www.udemy.com/course/ultimate-istio-bootcamp/?referralCode=BE5DC388AC12CF94DC31
https://www.udemy.com/course/ultimate_devsecops_bootcamp/?referralCode=82189A9CE8EEC401274F
https://www.udemy.com/course/continuous-integration-with-azure-devops-and-docker/?referralCode=745F4AB38A8632B3739D
https://www.udemy.com/course/aiml-foundations-for-absolute-beginners-agenticai-mlops/?referralCode=0312C90C0B546DFCC6BA
https://www.udemy.com/course/mastering-aiml-with-docker/?referralCode=5984A469AB6F4D56DED7
https://www.udemy.com/course/ai-driven-infrastructure-as-code-iac-and-cloud-automation/?referralCode=5ED8B63441C86BD8A4FD
https://www.udemy.com/course/devops-to-mlops-bootcamp/?referralCode=32FDA90B8EEDA296A577
```

- [ ] **Step 2: Write scraped data to JSON file**

Save to `sandbox/udemy_courses_scraped.json`. If scraping fails for any course (blocked, 403, etc.), create an entry with `"scraped": false` and fill `description`, `outcomes`, and `curriculum` with reasonable defaults based on the course title. Do NOT leave empty arrays.

- [ ] **Step 3: Verify all 14 courses have entries**

```bash
cat sandbox/udemy_courses_scraped.json | jq 'length'
# Expected: 14
```

- [ ] **Step 4: Commit**

```bash
git add sandbox/udemy_courses_scraped.json
git commit -m "feat: scrape Udemy course metadata for 14 courses"
```

---

### Task 2: Create Centralized Data Layer

**Files:**
- Create: `client/data/courses.ts`
- Create: `client/data/paths.ts`
- Create: `client/data/courses.test.ts`

**Interfaces:**
- Consumes: `sandbox/udemy_courses_scraped.json` (from Task 1)
- Produces:
  - `Course` interface and `courses: Course[]` array (named export)
  - `LearningPath` interface and `paths: LearningPath[]` array (named export)
  - Helper: `getCourseBySlug(slug: string): Course | undefined`
  - Helper: `getPathBySlug(slug: string): LearningPath | undefined`
  - Helper: `getCoursesForPath(pathSlug: string): Course[]`

- [ ] **Step 1: Write failing data integrity tests**

Create `client/data/courses.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { courses, getCourseBySlug, type Course } from "./courses";
import { paths, getPathBySlug, getCoursesForPath, type LearningPath } from "./paths";

describe("courses data", () => {
  it("has at least 14 published courses", () => {
    const published = courses.filter((c) => c.status === "published");
    expect(published.length).toBeGreaterThanOrEqual(14);
  });

  it("every course has a unique slug", () => {
    const slugs = courses.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every course has a unique shortCode", () => {
    const codes = courses.map((c) => c.shortCode);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("every published course has a udemyUrl with referralCode", () => {
    courses
      .filter((c) => c.status === "published")
      .forEach((c) => {
        expect(c.udemyUrl).toContain("udemy.com/course/");
        expect(c.udemyUrl).toContain("referralCode=");
      });
  });

  it("every course has non-empty outcomes", () => {
    courses.forEach((c) => {
      expect(c.outcomes.length).toBeGreaterThan(0);
    });
  });

  it("every course has non-empty curriculum", () => {
    courses.forEach((c) => {
      expect(c.curriculum.length).toBeGreaterThan(0);
    });
  });

  it("getCourseBySlug returns correct course", () => {
    const course = getCourseBySlug("ultimate-devops-bootcamp");
    expect(course).toBeDefined();
    expect(course!.title).toBe("Ultimate DevOps Bootcamp");
  });

  it("getCourseBySlug returns undefined for invalid slug", () => {
    expect(getCourseBySlug("nonexistent")).toBeUndefined();
  });
});

describe("paths data", () => {
  it("has exactly 3 paths", () => {
    expect(paths.length).toBe(3);
  });

  it("every path has a unique slug", () => {
    const slugs = paths.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every path references valid course slugs", () => {
    const courseSlugs = new Set(courses.map((c) => c.slug));
    paths.forEach((p) => {
      p.courseSlugs.forEach((slug) => {
        expect(courseSlugs.has(slug)).toBe(true);
      });
    });
  });

  it("every course with pathSlugs references valid paths", () => {
    const pathSlugs = new Set(paths.map((p) => p.slug));
    courses.forEach((c) => {
      c.pathSlugs.forEach((slug) => {
        expect(pathSlugs.has(slug)).toBe(true);
      });
    });
  });

  it("getCoursesForPath returns courses in path order", () => {
    const devopsCourses = getCoursesForPath("devops-platform-engineer");
    expect(devopsCourses.length).toBeGreaterThanOrEqual(10);
    expect(devopsCourses[0].slug).toBe("ultimate-devops-bootcamp");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm test client/data/courses.test.ts
```
Expected: FAIL — modules don't exist yet.

- [ ] **Step 3: Create `client/data/courses.ts`**

Build from scraped JSON data. Use this exact structure:

```typescript
export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: "Foundation" | "Intermediate" | "Advanced";
  duration: string;
  udemyUrl: string;
  outcomes: string[];
  curriculum: { title: string; description: string }[];
  rating?: string;
  students?: string;
  status: "published" | "coming-soon";
  shortCode: string;
  pathSlugs: string[];
}

export const courses: Course[] = [
  // --- Path: DevOps / Platform Engineer ---
  {
    slug: "ultimate-devops-bootcamp",
    title: "Ultimate DevOps Bootcamp",
    tagline: "Master DevOps fundamentals from scratch",
    description: "...", // FROM SCRAPED DATA
    level: "Foundation",
    duration: "...",    // FROM SCRAPED DATA
    udemyUrl: "https://www.udemy.com/course/ultimate-devops-bootcamp-by-school-of-devops/?referralCode=A8BF1965E5F822B8EDE1",
    outcomes: [],       // FROM SCRAPED DATA
    curriculum: [],     // FROM SCRAPED DATA
    rating: "...",      // FROM SCRAPED DATA
    students: "...",    // FROM SCRAPED DATA
    status: "published",
    shortCode: "DO",
    pathSlugs: ["devops-platform-engineer"],
  },
  // ... all 14 courses with real scraped data ...
  // ... plus 2 aspirational courses:
  {
    slug: "llmops-with-kubernetes",
    title: "LLMOps with Kubernetes",
    tagline: "Run AI systems at scale",
    description: "Learn to deploy, scale, and operate large language model services on Kubernetes infrastructure.",
    level: "Advanced",
    duration: "Coming soon",
    udemyUrl: "",
    outcomes: ["Deploy LLM services on Kubernetes clusters", "Scale inference workloads with autoscaling", "Monitor and optimize LLM serving infrastructure"],
    curriculum: [{ title: "LLM Serving Architecture", description: "Patterns for deploying language models as production services" }, { title: "Kubernetes for ML Workloads", description: "GPU scheduling, resource management, and scaling strategies" }, { title: "Observability and Operations", description: "Monitoring latency, throughput, and cost for LLM services" }],
    status: "coming-soon",
    shortCode: "LK",
    pathSlugs: [],
  },
  {
    slug: "production-agentic-devops",
    title: "Production Agentic DevOps",
    tagline: "Operationalize AI agents",
    description: "Build the infrastructure and delivery pipelines that make AI agents reliable, observable, and production-ready.",
    level: "Advanced",
    duration: "Coming soon",
    udemyUrl: "",
    outcomes: ["Design delivery pipelines for agentic systems", "Implement observability for autonomous agents", "Build guardrails and rollback mechanisms for agent deployments"],
    curriculum: [{ title: "Agent Deployment Patterns", description: "CI/CD and release strategies for agentic workloads" }, { title: "Observability for Agents", description: "Tracing, logging, and monitoring autonomous systems" }, { title: "Guardrails and Reliability", description: "Safety mechanisms, rollback, and human-in-the-loop patterns" }],
    status: "coming-soon",
    shortCode: "AG",
    pathSlugs: [],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
```

**IMPORTANT:** The `// FROM SCRAPED DATA` comments above are instructions to the implementer. Replace them with actual data from `sandbox/udemy_courses_scraped.json`. Do NOT leave placeholder comments in the final file.

Full slug-to-shortCode mapping for the 14 real courses:
| Slug | ShortCode |
|------|-----------|
| `ultimate-devops-bootcamp` | DO |
| `ultimate-ansible-bootcamp` | AN |
| `cicd-jenkins-docker` | JK |
| `ultimate-aws-bootcamp` | AW |
| `ultimate-eks-bootcamp` | EK |
| `advanced-kubernetes-bootcamp` | K8 |
| `ultimate-argo-bootcamp` | AR |
| `ultimate-istio-bootcamp` | IS |
| `ultimate-devsecops-bootcamp` | DS |
| `windows-containers-azure` | AZ |
| `aiml-foundations` | AI |
| `docker-genai-agentic` | DG |
| `ai-driven-iac` | IA |
| `devops-to-mlops-bootcamp` | ML |

Full slug-to-pathSlugs mapping:
| Slug | pathSlugs |
|------|-----------|
| `ultimate-devops-bootcamp` | `["devops-platform-engineer"]` |
| `ultimate-ansible-bootcamp` | `["devops-platform-engineer"]` |
| `cicd-jenkins-docker` | `["devops-platform-engineer"]` |
| `ultimate-aws-bootcamp` | `["devops-platform-engineer"]` |
| `ultimate-eks-bootcamp` | `["devops-platform-engineer"]` |
| `advanced-kubernetes-bootcamp` | `["devops-platform-engineer"]` |
| `ultimate-argo-bootcamp` | `["devops-platform-engineer"]` |
| `ultimate-istio-bootcamp` | `["devops-platform-engineer"]` |
| `ultimate-devsecops-bootcamp` | `["devops-platform-engineer"]` |
| `windows-containers-azure` | `["devops-platform-engineer"]` |
| `aiml-foundations` | `["agentic-devops"]` |
| `docker-genai-agentic` | `["agentic-devops"]` |
| `ai-driven-iac` | `["agentic-devops"]` |
| `devops-to-mlops-bootcamp` | `["ai-platform-engineer"]` |

- [ ] **Step 4: Create `client/data/paths.ts`**

```typescript
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
    description: "From fundamentals to production Kubernetes, service mesh, and GitOps. The complete path to designing platforms that give teams velocity without compromise.",
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
    description: "Bring AI and agentic workflows into reliable, observable engineering practice. From ML foundations to AI-driven infrastructure automation.",
    courseSlugs: [
      "aiml-foundations",
      "docker-genai-agentic",
      "ai-driven-iac",
    ],
    status: "published",
  },
  {
    slug: "ai-platform-engineer",
    number: "03",
    title: "AI Platform Engineer (DevOps for AI)",
    description: "Build, deploy, and operate ML systems that survive contact with production. The bridge from DevOps expertise to MLOps mastery.",
    courseSlugs: [
      "devops-to-mlops-bootcamp",
    ],
    status: "published",
  },
];

export function getPathBySlug(slug: string): LearningPath | undefined {
  return paths.find((p) => p.slug === slug);
}

export function getCoursesForPath(pathSlug: string): import("./courses").Course[] {
  const { courses } = require("./courses");
  const path = getPathBySlug(pathSlug);
  if (!path) return [];
  return path.courseSlugs
    .map((slug: string) => courses.find((c: any) => c.slug === slug))
    .filter(Boolean);
}
```

**NOTE to implementer:** The `getCoursesForPath` function above uses `require` to avoid circular imports. Refactor it to use a proper import pattern instead:

```typescript
import { courses, type Course } from "./courses";

export function getCoursesForPath(pathSlug: string): Course[] {
  const path = getPathBySlug(pathSlug);
  if (!path) return [];
  return path.courseSlugs
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter((c): c is Course => c !== undefined);
}
```

This works because `courses.ts` does NOT import from `paths.ts` — no circular dependency.

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm test client/data/courses.test.ts
```
Expected: ALL PASS

- [ ] **Step 6: Commit**

```bash
git add client/data/courses.ts client/data/paths.ts client/data/courses.test.ts
git commit -m "feat: add centralized course and path data layer with tests"
```

---

### Task 3: Build CourseCatalog Page

**Files:**
- Create: `client/pages/CourseCatalog.tsx`

**Interfaces:**
- Consumes: `courses` from `client/data/courses.ts`, `paths` from `client/data/paths.ts`
- Produces: Page component rendering all courses in a filterable grid with path tabs

- [ ] **Step 1: Create `client/pages/CourseCatalog.tsx`**

```tsx
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { courses } from "@/data/courses";
import { paths } from "@/data/paths";

export default function CourseCatalog() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? courses
      : courses.filter((c) => c.pathSlugs.includes(activeFilter));

  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <Sparkles size={13} /> SODA course catalogue
        </p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">
          Courses built for the work ahead.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#586760]">
          No generic promises. Just focused courses for engineers who need to
          ship, operate, and improve production systems.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
            activeFilter === "all"
              ? "border-[#13201e] bg-[#13201e] text-[#f7f7f2]"
              : "border-[#13201e]/15 hover:border-[#13201e]"
          }`}
        >
          All courses
        </button>
        {paths.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActiveFilter(p.slug)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              activeFilter === p.slug
                ? "border-[#13201e] bg-[#13201e] text-[#f7f7f2]"
                : "border-[#13201e]/15 hover:border-[#13201e]"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course, index) => (
          <Link
            to={`/courses/${course.slug}`}
            key={course.slug}
            className={`course-card group ${course.status === "coming-soon" ? "opacity-60" : ""}`}
          >
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 rotate-[-4deg] items-center justify-center rounded-lg border border-[#13201e] bg-[#d9ff5a] font-mono text-sm font-bold">
                {course.shortCode}
              </span>
              <div className="flex gap-2">
                {course.status === "coming-soon" && (
                  <span className="rounded-full border border-dashed border-[#6d8700]/50 bg-[#d9ff5a]/20 px-2 py-1 text-[10px] font-bold uppercase">
                    Coming soon
                  </span>
                )}
                <span className="rounded-full border border-[#13201e]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {course.level}
                </span>
              </div>
            </div>
            <h2 className="mt-10 font-display text-xl font-extrabold tracking-[-.04em]">
              {course.title}
            </h2>
            <p className="mt-2 text-sm text-[#617069]">{course.tagline}</p>
            <div className="mt-6 flex justify-between border-t border-[#13201e]/10 pt-4 text-xs font-bold">
              <span>{course.status === "coming-soon" ? "Notify me" : "View course"}</span>
              <ArrowUpRight
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                size={16}
              />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify component renders without errors**

Start dev server and navigate to `/courses` (after wiring route in Task 6):
```bash
pnpm dev
```
For now, just verify the file has no TypeScript errors:
```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add client/pages/CourseCatalog.tsx
git commit -m "feat: add CourseCatalog page with path filter tabs"
```

---

### Task 4: Refactor CourseDetail to Be Data-Driven

**Files:**
- Modify: `client/pages/CourseDetail.tsx`

**Interfaces:**
- Consumes: `getCourseBySlug` from `client/data/courses.ts`, `paths` from `client/data/paths.ts`
- Produces: Data-driven `CourseDetail` component that reads slug from URL params

- [ ] **Step 1: Rewrite `client/pages/CourseDetail.tsx`**

Replace entire file with data-driven version. Preserves the exact same visual layout (breadcrumb, hero with enrollment sidebar, audience fit, outcomes, capstone, syllabus accordion, "what's next" CTA) but pulls all content from the data layer.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Check, ChevronRight, ExternalLink } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getCourseBySlug } from "@/data/courses";
import { paths } from "@/data/paths";

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourseBySlug(slug) : undefined;

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const coursePath = paths.find((p) => p.courseSlugs.includes(course.slug));
  const isComingSoon = course.status === "coming-soon";

  return (
    <main className="bg-[#f7f7f2]">
      {/* Breadcrumb */}
      <section className="border-b border-[#13201e]/10">
        <div className="page-shell py-5 text-xs text-[#68756f]">
          <Link className="hover:text-[#13201e]" to="/">
            Home
          </Link>{" "}
          <ChevronRight className="inline" size={13} />{" "}
          <Link className="hover:text-[#13201e]" to="/courses">
            Courses
          </Link>{" "}
          <ChevronRight className="inline" size={13} /> {course.title}
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[#13201e]/10 bg-[#e5ebdc]">
        <div className="page-shell grid gap-10 py-16 lg:grid-cols-[1.35fr_.65fr] lg:py-24">
          <div>
            <p className="eyebrow">
              {course.level} · {course.duration}
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.94] tracking-[-.07em] sm:text-6xl">
              {course.title}
              {!isComingSoon && (
                <>
                  :<br />
                  <span className="text-[#6d8700]">Build systems,</span>
                  <br />
                  not demos.
                </>
              )}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52615a]">
              {course.description}
            </p>
            {!isComingSoon && course.rating && (
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-[#13201e]/15 bg-[#f7f7f2] px-3 py-1.5">
                  {course.rating} / 5 rating
                </span>
                {course.students && (
                  <span className="rounded-full border border-[#13201e]/15 bg-[#f7f7f2] px-3 py-1.5">
                    {course.students} students
                  </span>
                )}
              </div>
            )}
          </div>
          <aside className="self-end rounded-2xl border border-[#13201e] bg-[#13201e] p-6 text-[#f7f7f2] shadow-[8px_8px_0_#d9ff5a]">
            {isComingSoon ? (
              <>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-[#b7c4ae]">
                  Coming soon
                </p>
                <p className="mt-4 font-display text-2xl font-extrabold tracking-[-.04em]">
                  Under development.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#bcc7ba]">
                  This course is being built. Check back soon or explore other
                  courses in the catalogue.
                </p>
                <Link
                  to="/courses"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]"
                >
                  Browse courses <ArrowRight size={15} />
                </Link>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-[#b7c4ae]">
                  Ready when you are
                </p>
                <p className="mt-4 font-display text-2xl font-extrabold tracking-[-.04em]">
                  Learn on Udemy.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#bcc7ba]">
                  Enrollment, pricing, and full curriculum are available on the
                  course page.
                </p>
                <a
                  href={course.udemyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]"
                >
                  Enroll on Udemy <ExternalLink size={15} />
                </a>
              </>
            )}
          </aside>
        </div>
      </section>

      {/* Audience fit + Outcomes */}
      <section className="page-shell grid gap-14 py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">The right fit</p>
          <h2 className="section-title mt-4">
            Make sure it matches
            <br />
            where you are.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#13201e]/15 bg-white p-6">
              <p className="font-display text-xl font-extrabold">
                This is for you if…
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#586760]">
                <li className="flex gap-2">
                  <Check
                    size={16}
                    className="mt-1 shrink-0 text-[#789200]"
                  />
                  You have some technical background and want hands-on practice.
                </li>
                <li className="flex gap-2">
                  <Check
                    size={16}
                    className="mt-1 shrink-0 text-[#789200]"
                  />
                  You want to build and operate real systems, not just study
                  theory.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#13201e]/15 p-6">
              <p className="font-display text-xl font-extrabold">
                Not the right fit if…
              </p>
              <p className="mt-5 text-sm leading-6 text-[#586760]">
                You are looking for a conceptual overview with no implementation
                work, or are completely new to programming.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="eyebrow">What you'll build</p>
          <div className="mt-7 space-y-4">
            {course.outcomes.map((outcome, i) => (
              <div
                key={outcome}
                className="flex gap-5 border-b border-[#13201e]/15 pb-5"
              >
                <span className="font-mono text-xs text-[#789200]">
                  0{i + 1}
                </span>
                <p className="font-display text-xl font-bold leading-6 tracking-[-.035em]">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="page-shell grid gap-12 py-20 lg:grid-cols-[1fr_.85fr]">
        <div>
          <p className="eyebrow">Course map</p>
          <h2 className="section-title mt-4">The syllabus highlights.</h2>
          <Accordion
            type="single"
            collapsible
            className="mt-8 border-t border-[#13201e]/15"
          >
            {course.curriculum.map((item, index) => (
              <AccordionItem key={item.title} value={item.title}>
                <AccordionTrigger className="font-display text-lg font-bold tracking-[-.025em] hover:no-underline">
                  <span>
                    <span className="mr-4 font-mono text-xs text-[#789200]">
                      0{index + 1}
                    </span>
                    {item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-[#586760]">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {coursePath && (
          <aside className="rounded-2xl bg-[#d9ff5a] p-7">
            <p className="eyebrow">What's next</p>
            <h3 className="mt-4 font-display text-3xl font-extrabold leading-none tracking-[-.05em]">
              Keep going with the {coursePath.title} path.
            </h3>
            <p className="mt-5 text-sm leading-6 text-[#43513a]">
              Turn this foundation into a complete, ordered route toward
              mastering {coursePath.title.toLowerCase()}.
            </p>
            <Link
              to={`/learning-paths/${coursePath.slug}`}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold"
            >
              View learning path <ArrowRight size={16} />
            </Link>
          </aside>
        )}
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add client/pages/CourseDetail.tsx
git commit -m "feat: refactor CourseDetail to be data-driven via URL params"
```

---

### Task 5: Build PathListing and PathDetail Pages

**Files:**
- Create: `client/pages/PathListing.tsx`
- Create: `client/pages/PathDetail.tsx`

**Interfaces:**
- Consumes: `paths`, `getPathBySlug`, `getCoursesForPath` from data layer
- Produces: Two page components for listing and detail views of learning paths

- [ ] **Step 1: Create `client/pages/PathListing.tsx`**

```tsx
import { ArrowRight, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "@/data/paths";
import { courses } from "@/data/courses";

export default function PathListing() {
  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <Route size={13} /> Guided learning paths
        </p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">
          Choose the outcome. Follow the path.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#586760]">
          Ordered sequences for a role, with a course-level CTA at every step so
          you can start where your experience starts.
        </p>
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {paths.map((path) => {
          const courseCount = path.courseSlugs.length;
          const levels = [
            ...new Set(
              path.courseSlugs
                .map((s) => courses.find((c) => c.slug === s)?.level)
                .filter(Boolean)
            ),
          ];
          return (
            <Link
              to={`/learning-paths/${path.slug}`}
              key={path.slug}
              className="path-card group"
            >
              <span className="font-mono text-xs text-[#759100]">
                {path.number} / PATH
              </span>
              <h2 className="mt-12 font-display text-2xl font-extrabold leading-tight tracking-[-.05em]">
                {path.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#617069]">
                {path.description}
              </p>
              <div className="mt-6 flex items-center justify-between text-xs font-bold">
                <span>
                  {courseCount} course{courseCount !== 1 ? "s" : ""} ·{" "}
                  {levels.join(" → ")}
                </span>
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={14}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create `client/pages/PathDetail.tsx`**

```tsx
import { ArrowRight, ArrowUpRight, ChevronRight, ExternalLink } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getPathBySlug, getCoursesForPath } from "@/data/paths";

export default function PathDetail() {
  const { slug } = useParams<{ slug: string }>();
  const path = slug ? getPathBySlug(slug) : undefined;
  const pathCourses = slug ? getCoursesForPath(slug) : [];

  if (!path) {
    return <Navigate to="/learning-paths" replace />;
  }

  return (
    <main className="bg-[#f7f7f2]">
      {/* Breadcrumb */}
      <section className="border-b border-[#13201e]/10">
        <div className="page-shell py-5 text-xs text-[#68756f]">
          <Link className="hover:text-[#13201e]" to="/">
            Home
          </Link>{" "}
          <ChevronRight className="inline" size={13} />{" "}
          <Link className="hover:text-[#13201e]" to="/learning-paths">
            Learning paths
          </Link>{" "}
          <ChevronRight className="inline" size={13} /> {path.title}
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[#13201e]/10 bg-[#e5ebdc]">
        <div className="page-shell py-16 lg:py-24">
          <p className="eyebrow">
            {path.number} / PATH · {pathCourses.length} course
            {pathCourses.length !== 1 ? "s" : ""}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[.94] tracking-[-.07em] sm:text-6xl">
            {path.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52615a]">
            {path.description}
          </p>
        </div>
      </section>

      {/* Course sequence */}
      <section className="page-shell py-20">
        <p className="eyebrow">Course sequence</p>
        <h2 className="section-title mt-4">Your ordered path.</h2>
        <div className="mt-12 space-y-0">
          {pathCourses.map((course, index) => {
            const isLast = index === pathCourses.length - 1;
            const isComingSoon = course.status === "coming-soon";
            return (
              <div key={course.slug} className="flex gap-6">
                {/* Step connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                      isComingSoon
                        ? "border-2 border-dashed border-[#6d8700]/40 text-[#6d8700]/60"
                        : "bg-[#13201e] text-[#d9ff5a]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-[#6d8700]/30" />
                  )}
                </div>
                {/* Course card */}
                <Link
                  to={`/courses/${course.slug}`}
                  className={`mb-6 flex-1 rounded-2xl border border-[#13201e]/15 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#13201e] hover:shadow-[4px_4px_0_#d9ff5a] ${
                    isComingSoon ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 rotate-[-4deg] items-center justify-center rounded-lg border border-[#13201e] bg-[#d9ff5a] font-mono text-xs font-bold">
                      {course.shortCode}
                    </span>
                    <div className="flex gap-2">
                      {isComingSoon && (
                        <span className="rounded-full border border-dashed border-[#6d8700]/50 bg-[#d9ff5a]/20 px-2 py-1 text-[10px] font-bold uppercase">
                          Coming soon
                        </span>
                      )}
                      <span className="rounded-full border border-[#13201e]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-extrabold tracking-[-.04em]">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#617069]">
                    {course.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#13201e]/10 pt-4 text-xs font-bold">
                    <span>{course.duration}</span>
                    <ArrowUpRight size={15} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm typecheck
```

- [ ] **Step 4: Commit**

```bash
git add client/pages/PathListing.tsx client/pages/PathDetail.tsx
git commit -m "feat: add PathListing and PathDetail pages"
```

---

### Task 6: Build Roadmap Page

**Files:**
- Create: `client/pages/Roadmap.tsx`

**Interfaces:**
- Consumes: `paths` from `client/data/paths.ts`, `getCoursesForPath` from `client/data/paths.ts`
- Produces: Tab-switchable roadmap page with vertical step diagram per path

- [ ] **Step 1: Create `client/pages/Roadmap.tsx`**

```tsx
import { ArrowRight, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { paths } from "@/data/paths";
import { getCoursesForPath } from "@/data/paths";

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState(paths[0].slug);
  const activePath = paths.find((p) => p.slug === activeTab) ?? paths[0];
  const pathCourses = getCoursesForPath(activeTab);

  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <Map size={13} /> Free visual guides
        </p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">
          Free maps for the systems behind AI.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#586760]">
          A roadmap is broader than a course: it shows the core skills, optional
          deep-dives, and the few places where SODA can help you go deeper.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex flex-wrap gap-2">
        {paths.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActiveTab(p.slug)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              activeTab === p.slug
                ? "border-[#13201e] bg-[#13201e] text-[#f7f7f2]"
                : "border-[#13201e]/15 hover:border-[#13201e]"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Roadmap diagram */}
      <div className="mt-10 overflow-hidden rounded-3xl bg-[#13201e] p-7 text-[#f7f7f2] sm:p-10">
        <div className="mb-8">
          <span className="font-mono text-xs text-[#d9ff5a]">
            {activePath.number} / ROADMAP
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.05em]">
            {activePath.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#b9c4b9]">
            {activePath.description}
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-0">
          {pathCourses.map((course, index) => {
            const isLast = index === pathCourses.length - 1;
            const isComingSoon = course.status === "coming-soon";
            return (
              <div key={course.slug} className="flex gap-5">
                {/* Connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                      isComingSoon
                        ? "border border-dashed border-[#d9ff5a]/40 text-[#d9ff5a]/50"
                        : "bg-[#d9ff5a] text-[#13201e]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-[#d9ff5a]/30" />
                  )}
                </div>
                {/* Node */}
                <Link
                  to={`/courses/${course.slug}`}
                  className={`mb-4 flex-1 rounded-xl border p-4 transition hover:border-[#d9ff5a] ${
                    isComingSoon
                      ? "border-dashed border-white/20 opacity-50"
                      : "border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold">
                      {course.title}
                    </h3>
                    <span className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-bold uppercase">
                      {course.level}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#b9c4b9]">
                    {course.tagline}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to={`/learning-paths/${activePath.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]"
          >
            Start this path <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add client/pages/Roadmap.tsx
git commit -m "feat: add Roadmap page with tab-switchable path diagrams"
```

---

### Task 7: Update Index.tsx to Use Data Layer

**Files:**
- Modify: `client/pages/Index.tsx`

**Interfaces:**
- Consumes: `courses` from `client/data/courses.ts`, `paths` from `client/data/paths.ts`
- Produces: Updated home page pulling from centralized data

- [ ] **Step 1: Rewrite `client/pages/Index.tsx`**

Replace the inline `paths` and `courses` arrays with imports from the data layer. Keep exact same JSX structure and visual design. Key changes:
- Import `courses` and `paths` from data files
- Featured courses section shows first 6 courses from the full list
- Path cards link to `/learning-paths/${path.slug}` instead of generic `/learning-paths`
- Course cards link to `/courses/${course.slug}` instead of hardcoded paths
- "Coming Soon" badge on aspirational courses

```tsx
import { ArrowRight, ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { paths } from "@/data/paths";

const featuredCourses = courses.slice(0, 6);

function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 52C33 28 39 64 65 42S95 21 111 42s27 16 45-1 29 8 41-24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
      <path
        d="M12 60C41 36 49 73 77 49s29-16 44 3 27 12 42-4 22 4 30-13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Index() {
  return (
    <main>
      {/* Hero — unchanged */}
      <section className="relative border-b border-[#13201e]/10 bg-[#eef2e7]">
        <div className="page-shell grid min-h-[620px] items-center gap-14 py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
          <div className="relative z-10">
            <div className="eyebrow">
              <Sparkles size={13} /> Engineering education, without the fluff
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[.94] tracking-[-0.075em] text-[#13201e] sm:text-6xl lg:text-7xl">
              Production-grade
              <br />
              <span className="text-[#6d8700]">DevOps, MLOps</span>
              <br />& Agentic AI.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#52615a] sm:text-lg">
              Learn how modern systems actually get built, deployed, and operated
              — from the instructor behind 15+ practical DevOps and AI courses.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/courses" className="button-primary">
                Explore courses <ArrowRight size={17} />
              </Link>
              <Link
                to="/learning-paths"
                className="group inline-flex items-center gap-2 text-sm font-bold"
              >
                Find your path{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
            <div className="absolute -inset-6 rounded-full border border-[#7e8b4f]/30"></div>
            <div className="absolute inset-7 rounded-full border border-dashed border-[#7e8b4f]/50"></div>
            <Link
              to="/roadmaps"
              aria-label="Explore the Agentic AI roadmap"
              className="relative block aspect-square overflow-hidden rounded-full border-2 border-[#13201e] bg-[#d9ff5a] p-7 shadow-[12px_12px_0_#13201e] transition-transform hover:-translate-y-1 sm:p-8"
            >
              <div className="relative z-10 flex h-full flex-col justify-between rounded-[28%] border-2 border-[#13201e] bg-[#f7f7f2] p-7 sm:p-8">
                <span className="w-fit rounded-full border border-[#13201e] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  SODA system map
                </span>
                <div>
                  <p className="font-display text-4xl font-extrabold leading-none tracking-[-.06em]">
                    Build the
                    <br />
                    real thing.
                  </p>
                  <Scribble className="mt-4 h-12 w-48 text-[#789200]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">DevOps × AI</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#13201e] text-[#d9ff5a]">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 hidden h-24 w-full bg-[linear-gradient(135deg,transparent_49%,rgba(19,32,30,.06)_50%,transparent_51%)] bg-[length:18px_18px] lg:block"></div>
      </section>

      {/* Stats — unchanged */}
      <section className="border-b border-[#13201e]/10 bg-[#13201e] text-[#f7f7f2]">
        <div className="page-shell grid grid-cols-2 divide-x divide-white/15 md:grid-cols-4">
          <div className="py-7 pr-4">
            <p className="font-display text-3xl font-extrabold tracking-[-.06em]">
              301k+
            </p>
            <p className="mt-1 text-xs text-[#aeb8ae]">learners worldwide</p>
          </div>
          <div className="py-7 px-4">
            <p className="font-display text-3xl font-extrabold tracking-[-.06em]">
              7k+
            </p>
            <p className="mt-1 text-xs text-[#aeb8ae]">course reviews</p>
          </div>
          <div className="py-7 pr-4 pl-0 md:px-4">
            <p className="font-display text-3xl font-extrabold tracking-[-.06em]">
              15+
            </p>
            <p className="mt-1 text-xs text-[#aeb8ae]">technical courses</p>
          </div>
          <div className="py-7 pl-4">
            <p className="font-display text-3xl font-extrabold tracking-[-.06em]">
              4.7/5
            </p>
            <p className="mt-1 text-xs text-[#aeb8ae]">average rating</p>
          </div>
        </div>
        <div className="page-shell pb-4 text-[10px] text-[#718177]">
          Udemy profile snapshot — July 2026
        </div>
      </section>

      {/* Learning Paths — data-driven */}
      <section className="page-shell py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Start with the outcome</p>
            <h2 className="section-title mt-4">
              Choose a learning path,
              <br />
              not just a course.
            </h2>
          </div>
          <Link
            to="/learning-paths"
            className="text-sm font-bold underline-offset-4 hover:underline"
          >
            See all paths <ArrowRight className="inline" size={15} />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {paths.map((path) => (
            <Link
              key={path.slug}
              to={`/learning-paths/${path.slug}`}
              className="path-card group"
            >
              <span className="font-mono text-xs text-[#759100]">
                {path.number} / PATH
              </span>
              <h3 className="mt-12 font-display text-2xl font-extrabold leading-tight tracking-[-.05em]">
                {path.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#617069]">
                {path.description}
              </p>
              <span className="mt-7 flex items-center gap-2 text-sm font-bold">
                Explore path{" "}
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={16}
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses — data-driven */}
      <section className="border-y border-[#13201e]/10 bg-[#e5ebdc]">
        <div className="page-shell py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Featured courses</p>
              <h2 className="section-title mt-4">
                Technical depth, built
                <br />
                for real work.
              </h2>
            </div>
            <Link
              to="/courses"
              className="text-sm font-bold underline-offset-4 hover:underline"
            >
              Browse catalogue <ArrowRight className="inline" size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link
                to={`/courses/${course.slug}`}
                key={course.slug}
                className={`course-card group ${course.status === "coming-soon" ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 rotate-[-4deg] items-center justify-center rounded-lg border border-[#13201e] bg-[#d9ff5a] font-mono text-sm font-bold">
                    {course.shortCode}
                  </span>
                  <div className="flex gap-2">
                    {course.status === "coming-soon" && (
                      <span className="rounded-full border border-dashed border-[#6d8700]/50 bg-[#d9ff5a]/20 px-2 py-1 text-[10px] font-bold uppercase">
                        Coming soon
                      </span>
                    )}
                    <span className="rounded-full border border-[#13201e]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {course.level}
                    </span>
                  </div>
                </div>
                <h3 className="mt-10 font-display text-xl font-extrabold tracking-[-.04em]">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-[#617069]">
                  {course.tagline}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#13201e]/10 pt-4 text-xs font-bold">
                  <span>View course</span>
                  <ArrowUpRight
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    size={17}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap CTA — unchanged */}
      <section className="page-shell py-24">
        <div className="overflow-hidden rounded-[2rem] bg-[#13201e] px-7 py-10 text-[#f7f7f2] sm:px-12 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="eyebrow text-[#d9ff5a]">Free visual guide</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[.98] tracking-[-.06em] sm:text-5xl">
                What does an Agentic AI Engineer actually need to know?
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#b9c4b9]">
                Follow the core skills, identify the deep-dives, and see which
                building blocks turn experiments into dependable systems.
              </p>
              <Link
                to="/roadmaps"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]"
              >
                Explore the roadmap <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-[#9ca997]/30 p-6">
              <div className="absolute -right-5 -top-5 rounded-full border border-[#d9ff5a]/50 bg-[#13201e] px-3 py-2 text-[10px] font-bold text-[#d9ff5a]">
                CORE PATH
              </div>
              <div className="rounded-lg border border-[#d9ff5a] p-3 text-center text-xs font-bold">
                Agentic AI Engineer
              </div>
              <div className="mx-auto h-7 w-px bg-[#d9ff5a]"></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-white/30 p-3 text-center text-[10px] font-bold">
                  Foundations
                </div>
                <div className="rounded-lg border border-white/30 p-3 text-center text-[10px] font-bold">
                  Agent skills
                </div>
                <div className="rounded-lg border border-white/30 p-3 text-center text-[10px] font-bold">
                  Production
                </div>
              </div>
              <div className="mx-auto h-7 w-px bg-[#d9ff5a]"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-dashed border-white/30 p-3 text-center text-[10px]">
                  LLM basics
                </div>
                <div className="rounded-lg border border-dashed border-white/30 p-3 text-center text-[10px]">
                  Eval & guardrails
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor CTA — unchanged */}
      <section className="border-t border-[#13201e]/10 bg-[#d9ff5a]">
        <div className="page-shell flex flex-col justify-between gap-10 py-16 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Built by a practitioner</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.06em]">
              From Gourav J. Shah,
              <br />
              to the next generation of builders.
            </h2>
          </div>
          <Link
            to="/about"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold"
          >
            Meet your instructor <ChevronRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add client/pages/Index.tsx
git commit -m "feat: update Index page to use centralized data layer"
```

---

### Task 8: Update App.tsx Routing and Cleanup

**Files:**
- Modify: `client/App.tsx`
- Modify: `client/pages/NotFound.tsx`
- Delete: `client/pages/Placeholder.tsx`

**Interfaces:**
- Consumes: All new page components from Tasks 3-7
- Produces: Complete routing with dynamic params, styled NotFound, no more Placeholder

- [ ] **Step 1: Rewrite `client/App.tsx`**

```tsx
import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import CourseCatalog from "./pages/CourseCatalog";
import CourseDetail from "./pages/CourseDetail";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PathDetail from "./pages/PathDetail";
import PathListing from "./pages/PathListing";
import Roadmap from "./pages/Roadmap";

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<CourseCatalog />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/learning-paths" element={<PathListing />} />
        <Route path="/learning-paths/:slug" element={<PathDetail />} />
        <Route path="/roadmaps" element={<Roadmap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(<App />);
```

- [ ] **Step 2: Restyle `client/pages/NotFound.tsx` to match site design**

```tsx
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-[58vh] items-center py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">404 / Not found</p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em]">
          This page doesn't exist yet.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-[#586760]">
          The page you're looking for may have moved or hasn't been built yet.
          Explore the course catalogue to find what you need.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/courses" className="button-primary">
            Browse courses <ArrowRight size={16} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-3 text-sm font-bold"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Delete `client/pages/Placeholder.tsx`**

```bash
rm client/pages/Placeholder.tsx
```

- [ ] **Step 4: Run typecheck and tests**

```bash
pnpm typecheck
pnpm test
```

- [ ] **Step 5: Commit**

```bash
git add client/App.tsx client/pages/NotFound.tsx
git rm client/pages/Placeholder.tsx
git commit -m "feat: wire dynamic routes, restyle NotFound, remove Placeholder"
```

---

### Task 9: Visual Verification

**Files:** None (read-only verification)

**Purpose:** Start dev server, navigate every route, verify visual consistency and functionality.

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Verify each route works**

Navigate to each route in browser and verify:

| Route | Check |
|-------|-------|
| `/` | Hero, stats, paths (link to `/learning-paths/:slug`), courses (link to `/courses/:slug`), roadmap CTA |
| `/courses` | All 16 courses shown (14 real + 2 aspirational). Filter tabs work. "Coming soon" badge on aspirational. |
| `/courses/ultimate-devops-bootcamp` | Full detail page loads with scraped data. Enroll button links to Udemy. |
| `/courses/llmops-with-kubernetes` | "Coming Soon" version renders. No Udemy link. |
| `/courses/nonexistent` | Redirects to `/courses` |
| `/learning-paths` | All 3 paths with correct course counts |
| `/learning-paths/devops-platform-engineer` | 10-course sequence with step connectors |
| `/learning-paths/nonexistent` | Redirects to `/learning-paths` |
| `/roadmaps` | Tabs switch between 3 paths. Course nodes link to detail pages. |
| `/random-page` | NotFound page in site design style |

- [ ] **Step 3: Verify no console errors**

Open browser DevTools, check for:
- No React warnings
- No 404 errors for assets
- No TypeScript/runtime errors

- [ ] **Step 4: Run full test suite**

```bash
pnpm test
```

- [ ] **Step 5: Commit any fixes found during verification**

Only if issues were found in steps 2-4.

---

### Task 10: Final Build Verification

**Files:** None

- [ ] **Step 1: Run production build**

```bash
pnpm build:client
```
Expected: Clean build with no warnings, output to `dist/spa/`.

- [ ] **Step 2: Verify built files include new routes**

```bash
ls dist/spa/
```
Should contain `index.html` and hashed JS/CSS assets.

- [ ] **Step 3: Run all tests one final time**

```bash
pnpm test
```

- [ ] **Step 4: Commit any remaining changes**

```bash
git status
# If any unstaged changes, add and commit
```
