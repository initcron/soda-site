import { describe, it, expect } from "vitest";
import { courses, getCourseBySlug, type Course } from "./courses";
import {
  paths,
  getPathBySlug,
  getCoursesForPath,
  getCertifiedPaths,
  getFlagshipPaths,
  getFreePath,
  isFreeCourse,
  resolvePathSlug,
  roadmaps,
  specialisations,
} from "./paths";

describe("courses data", () => {
  it("has at least 15 published courses", () => {
    const published = courses.filter((c) => c.status === "published");
    expect(published.length).toBeGreaterThanOrEqual(15);
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

  it("AI/Agentic courses appear before K8s courses in catalog order", () => {
    const aiIndex = courses.findIndex((c) => c.slug === "aiml-foundations");
    const k8sIndex = courses.findIndex((c) => c.slug === "advanced-kubernetes-bootcamp");
    const devopsIndex = courses.findIndex((c) => c.slug === "ultimate-devops-bootcamp");
    expect(aiIndex).toBeLessThan(k8sIndex);
    expect(k8sIndex).toBeLessThan(devopsIndex);
  });
});

describe("paths data", () => {
  it("has the five programme paths in catalogue order", () => {
    expect(paths.map((p) => p.slug)).toEqual([
      "agentic-devops",
      "ai-platform-engineering",
      "agenticops-kubernetes",
      "sre-foundations",
      "kubernetes-platform-engineering",
    ]);
  });

  it("every path has a unique slug and number", () => {
    expect(new Set(paths.map((p) => p.slug)).size).toBe(paths.length);
    expect(new Set(paths.map((p) => p.number)).size).toBe(paths.length);
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

  it("course.pathSlugs and path.courseSlugs agree", () => {
    paths.forEach((p) => {
      p.courseSlugs.forEach((slug) => {
        expect(getCourseBySlug(slug)!.pathSlugs).toContain(p.slug);
      });
    });
    courses.forEach((c) => {
      c.pathSlugs.forEach((slug) => {
        expect(getPathBySlug(slug)!.courseSlugs).toContain(c.slug);
      });
    });
  });

  it("prerequisitePathSlug references valid paths", () => {
    const pathSlugs = new Set(paths.map((p) => p.slug));
    paths.forEach((p) => {
      if (p.prerequisitePathSlug) {
        expect(pathSlugs.has(p.prerequisitePathSlug)).toBe(true);
      }
    });
  });

  it("every path describes audience, outcomes and modules", () => {
    paths.forEach((p) => {
      expect(p.tagline.length).toBeGreaterThan(0);
      expect(p.audience.length).toBeGreaterThan(0);
      expect(p.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(p.modules.length).toBeGreaterThanOrEqual(4);
    });
  });

  it("exposes three flagship tracks, two of them launching first", () => {
    const flagship = getFlagshipPaths();
    expect(flagship.map((p) => p.slug)).toEqual([
      "agentic-devops",
      "ai-platform-engineering",
      "agenticops-kubernetes",
    ]);
    expect(flagship.filter((p) => p.status === "launching").map((p) => p.slug)).toEqual([
      "agentic-devops",
      "ai-platform-engineering",
    ]);
  });

  it("every flagship track has a certification and a capstone", () => {
    getFlagshipPaths().forEach((p) => {
      expect(p.certification).toBeDefined();
      expect(p.certification!.name.length).toBeGreaterThan(0);
      expect(p.capstone).toBeDefined();
    });
  });

  it("offers the four School of DevOps certifications", () => {
    const names = Object.fromEntries(
      paths.filter((p) => p.certification).map((p) => [p.slug, p.certification!.name]),
    );
    expect(names).toEqual({
      "agentic-devops": "School of DevOps Certified Agentic DevOps Engineer",
      "ai-platform-engineering": "School of DevOps Certified AI Platform Engineer",
      "agenticops-kubernetes": "School of DevOps Certified AgentOps Engineer",
      "sre-foundations": "School of DevOps Certified SRE/DevOps Engineer",
    });
  });

  it("getCertifiedPaths lists launch tracks first and the SRE certification last", () => {
    expect(getCertifiedPaths().map((p) => p.slug)).toEqual([
      "agentic-devops",
      "ai-platform-engineering",
      "agenticops-kubernetes",
      "sre-foundations",
    ]);
  });

  it("the free path is SRE Foundations and covers the essentials", () => {
    const free = getFreePath();
    expect(free.slug).toBe("sre-foundations");
    expect(paths.filter((p) => p.kind === "free").length).toBe(1);
    expect(free.courseSlugs).toEqual(
      expect.arrayContaining([
        "ultimate-aws-bootcamp",
        "ultimate-terraform-bootcamp",
        "ultimate-ansible-bootcamp",
        "cicd-jenkins-docker",
      ]),
    );
  });

  it("getCoursesForPath returns courses in path order", () => {
    const free = getCoursesForPath("sre-foundations");
    expect(free.map((c) => c.slug)).toEqual(getFreePath().courseSlugs);

    const agentic = getCoursesForPath("agentic-devops");
    expect(agentic[0].slug).toBe("aiml-foundations");
    expect(agentic[agentic.length - 1].slug).toBe("agentic-devops-bootcamp");
  });

  it("resolves retired path slugs to their replacements", () => {
    expect(resolvePathSlug("devops-engineer")).toBe("sre-foundations");
    expect(resolvePathSlug("kubernetes-platform-engineer")).toBe("kubernetes-platform-engineering");
    expect(resolvePathSlug("ai-augmented-devops")).toBe("agentic-devops");
    expect(resolvePathSlug("agentic-devops-engineer")).toBe("agentic-devops");
    expect(resolvePathSlug("ai-platform-engineer")).toBe("ai-platform-engineering");
    expect(resolvePathSlug("agentic-devops")).toBe("agentic-devops");
    expect(resolvePathSlug("nope")).toBeUndefined();
  });
});

describe("free courses", () => {
  it("AI/ML Foundations is free", () => {
    expect(isFreeCourse(getCourseBySlug("aiml-foundations")!)).toBe(true);
  });

  it("every course in the free path is free", () => {
    getCoursesForPath("sre-foundations").forEach((c) => expect(isFreeCourse(c)).toBe(true));
  });

  it("other courses are not free", () => {
    const free = new Set(["aiml-foundations", ...getFreePath().courseSlugs]);
    courses
      .filter((c) => !free.has(c.slug))
      .forEach((c) => expect(isFreeCourse(c)).toBe(false));
  });
});

describe("specialisations data", () => {
  it("covers security, FinOps, governance and AI SRE", () => {
    expect(specialisations.map((s) => s.slug)).toEqual([
      "ai-security-devsecops",
      "finops-for-ai",
      "guardrails-grc",
      "ai-sre",
    ]);
  });

  it("references valid course slugs", () => {
    specialisations.forEach((s) => {
      (s.courseSlugs ?? []).forEach((slug) => {
        expect(getCourseBySlug(slug)).toBeDefined();
      });
    });
  });
});

describe("roadmaps data", () => {
  it("has a roadmap per starting role", () => {
    expect(roadmaps.length).toBeGreaterThanOrEqual(3);
    expect(new Set(roadmaps.map((r) => r.slug)).size).toBe(roadmaps.length);
  });

  it("every roadmap references valid path slugs", () => {
    const pathSlugs = new Set(paths.map((p) => p.slug));
    roadmaps.forEach((r) => {
      r.pathSlugs.forEach((slug) => {
        expect(pathSlugs.has(slug)).toBe(true);
      });
    });
  });

  it("every roadmap has at least 2 paths and names who it is for", () => {
    roadmaps.forEach((r) => {
      expect(r.pathSlugs.length).toBeGreaterThanOrEqual(2);
      expect(r.startingFrom.length).toBeGreaterThan(0);
    });
  });
});
