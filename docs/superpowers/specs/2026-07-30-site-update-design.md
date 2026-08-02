# SODA Site Update — Design Spec

**Date:** 2026-07-30
**Status:** Draft
**Scope:** Replace placeholder content with real Udemy course data, centralized data model, dynamic routing, learning path detail pages, and simple roadmap visualization.

---

## 1. Data Layer

### Course Model (`client/data/courses.ts`)

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
```

### Learning Path Model (`client/data/paths.ts`)

```typescript
export interface LearningPath {
  slug: string;
  number: string;
  title: string;
  description: string;
  courseSlugs: string[];
  status: "published" | "coming-soon";
}
```

### Course Inventory (14 real + aspirational)

**Path 1: DevOps / Platform Engineer** (`devops-platform-engineer`)
| # | Course | Slug | Level | Udemy URL |
|---|--------|------|-------|-----------|
| 1 | Ultimate DevOps Bootcamp | `ultimate-devops-bootcamp` | Foundation | udemy.com/course/ultimate-devops-bootcamp-by-school-of-devops/ |
| 2 | Ultimate Ansible Bootcamp | `ultimate-ansible-bootcamp` | Intermediate | udemy.com/course/ultimate-ansible-bootcamp/ |
| 3 | CI/CD with Jenkins & Docker | `cicd-jenkins-docker` | Intermediate | udemy.com/course/ultimate-jenkins-bootcamp-by-school-of-devops/ |
| 4 | Ultimate AWS Bootcamp | `ultimate-aws-bootcamp` | Intermediate | udemy.com/course/aws-devops-bootcamp/ |
| 5 | Ultimate EKS Bootcamp | `ultimate-eks-bootcamp` | Advanced | udemy.com/course/ultimate-eks-bootcamp-school-of-devops/ |
| 6 | Advanced Kubernetes Bootcamp | `advanced-kubernetes-bootcamp` | Advanced | udemy.com/course/kubernetes-certified-administrator/ |
| 7 | Ultimate Argo Bootcamp | `ultimate-argo-bootcamp` | Advanced | udemy.com/course/ultimate-argo-bootcamp-by-school-of-devops/ |
| 8 | Ultimate Istio Bootcamp | `ultimate-istio-bootcamp` | Advanced | udemy.com/course/ultimate-istio-bootcamp/ |
| 9 | Ultimate DevSecOps Bootcamp | `ultimate-devsecops-bootcamp` | Advanced | udemy.com/course/ultimate_devsecops_bootcamp/ |
| 10 | Windows Containers with Azure CI/CD | `windows-containers-azure` | Intermediate | udemy.com/course/continuous-integration-with-azure-devops-and-docker/ |

**Path 2: Agentic DevOps (AI for DevOps)** (`agentic-devops`)
| # | Course | Slug | Level | Udemy URL |
|---|--------|------|-------|-----------|
| 1 | AI/ML Foundations for Absolute Beginners | `aiml-foundations` | Foundation | udemy.com/course/aiml-foundations-for-absolute-beginners-agenticai-mlops/ |
| 2 | Docker for GenAI & AgenticAI | `docker-genai-agentic` | Intermediate | udemy.com/course/mastering-aiml-with-docker/ |
| 3 | AI Driven Infrastructure as Code | `ai-driven-iac` | Intermediate | udemy.com/course/ai-driven-infrastructure-as-code-iac-and-cloud-automation/ |

**Path 3: AI Platform Engineer (DevOps for AI)** (`ai-platform-engineer`)
| # | Course | Slug | Level | Udemy URL |
|---|--------|------|-------|-----------|
| 1 | DevOps to MLOps Bootcamp | `devops-to-mlops-bootcamp` | Intermediate | udemy.com/course/devops-to-mlops-bootcamp/ |

**Aspirational courses** (status: "coming-soon", no Udemy URLs, no path assignment yet):
- LLMOps with Kubernetes — from current site, keep as planned future course
- Production Agentic DevOps — from current site, keep as planned future course

Note: "DevSecOps Foundations" from the current site is replaced by the real "Ultimate DevSecOps Bootcamp" course.

These retain the current site's aspirational titles. No Udemy URLs.

### Learning Paths

| # | Path | Slug | Courses | Status |
|---|------|------|---------|--------|
| 01 | DevOps / Platform Engineer | `devops-platform-engineer` | 10 real courses | published |
| 02 | Agentic DevOps (AI for DevOps) | `agentic-devops` | 3 real courses | published |
| 03 | AI Platform Engineer (DevOps for AI) | `ai-platform-engineer` | 1 real course | published |

---

## 2. Routing

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Index` | Home page, imports from data files |
| `/courses` | `CourseCatalog` | All courses grid with path filter tabs |
| `/courses/:slug` | `CourseDetail` | Data-driven, single reusable component |
| `/learning-paths` | `PathListing` | All learning path cards |
| `/learning-paths/:slug` | `PathDetail` | Course sequence for one path |
| `/roadmaps` | `Roadmap` | Simple path diagrams with tabs |
| `/about` | `About` | Placeholder for now |
| `*` | `NotFound` | Wire up existing component |

- All routes client-side (React Router). GitHub Pages serves `index.html`.
- `Placeholder.tsx` removed — each route gets dedicated component.

---

## 3. Components

### Modified
- **`CourseDetail.tsx`** — Receives data via `useParams()` slug → lookup in courses array. Same visual layout (breadcrumb, hero, outcomes, syllabus accordion, enrollment sidebar). "Coming Soon" courses show teaser + notification signup instead of enroll CTA.
- **`Index.tsx`** — Imports courses/paths from data files instead of inline arrays. Stats remain hardcoded (snapshot data). Aspirational courses shown with "Coming Soon" badge.
- **`App.tsx`** — Updated route definitions with dynamic `:slug` params.

### New
- **`CourseCatalog.tsx`** — Grid of course cards. Tab filters by path. "Coming Soon" courses shown with dimmed styling + badge.
- **`PathListing.tsx`** — Cards per learning path showing title, description, course count, level range.
- **`PathDetail.tsx`** — Ordered course sequence for one path. Visual step progression (numbered steps with connecting lines). Each step = mini course card.
- **`Roadmap.tsx`** — Tab-switchable view. Each tab = one learning path shown as vertical step diagram with course nodes connected by lines.

### Removed
- **`Placeholder.tsx`** — All branches replaced by proper pages.

---

## 4. Udemy Scraping Strategy

Scrape each of 14 Udemy course pages (one-time, store results in `courses.ts`):

**Fields to extract:**
- Course description (full text)
- "What you'll learn" bullet points → `outcomes[]`
- Curriculum section titles + descriptions → `curriculum[]`
- Rating, student count, duration
- Course level confirmation

**Approach:** Fetch HTML, parse relevant sections. Store as static data — no runtime API calls.

**Fallback:** If scraping blocked or incomplete, manually write descriptions based on course titles and known content.

---

## 5. Roadmap Page

- Vertical step diagram per learning path
- Each step = course card (title, level badge, status indicator)
- Connecting lines between steps
- Tabs to switch between 3 paths
- Built with Tailwind only (no extra libraries)
- Each course node links to its detail page

---

## 6. Visual Design

Maintain existing design language:
- Off-white background (#f7f7f2), dark green-black (#13201e)
- Lime accent (#d9ff5a) for CTAs and highlights
- Space Grotesk headings, Manrope body, DM Mono labels
- `.path-card` and `.course-card` hover patterns
- shadcn/ui Accordion for syllabus sections

New elements:
- "Coming Soon" badge: muted lime with dashed border
- Level badges: Foundation (green), Intermediate (blue), Advanced (purple)
- Step connector lines: olive green (#6d8700)

---

## 7. Future Enhancements

Documented for future implementation (not in current scope):

1. **Interactive roadmap** — Clickable nodes, progress tracking, prerequisite visualization, possibly using react-flow or d3
2. **Dark mode** — CSS vars configured in Tailwind, needs dark palette definition in `:root`
3. **Course reviews/testimonials** — Pull from Udemy API or manually curate
4. **Search and filter** — By level, topic, duration across course catalog
5. **Framer Motion animations** — Page transitions, card entrance animations (library already installed)
6. **3D hero visualization** — three.js already installed, could add interactive element to hero
7. **About page** — Full instructor bio, SODA mission statement, team
8. **Blog/resources section** — Articles, tutorials, DevOps guides
9. **Student dashboard** — Track progress across learning paths (would need auth + backend)
10. **Udemy API integration** — Live ratings/student counts instead of static snapshots
11. **Course comparison** — Side-by-side comparison of courses in same path
12. **Certificate/badge system** — Visual badges for path completion

---

## 8. Out of Scope

- Backend changes (Express server stays minimal)
- Authentication / user accounts
- Dark mode implementation
- About/legal page content
- Blog functionality
- Any unused library removal (three.js, framer-motion, recharts)
