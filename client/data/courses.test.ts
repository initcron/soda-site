import { describe, it, expect } from "vitest";
import { courses, getCourseBySlug, type Course } from "./courses";
import { paths, getPathBySlug, getCoursesForPath, roadmaps, type LearningPath, type CareerRoadmap } from "./paths";

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
  it("has exactly 5 paths", () => {
    expect(paths.length).toBe(5);
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

  it("prerequisitePathSlug references valid paths", () => {
    const pathSlugs = new Set(paths.map((p) => p.slug));
    paths.forEach((p) => {
      if (p.prerequisitePathSlug) {
        expect(pathSlugs.has(p.prerequisitePathSlug)).toBe(true);
      }
    });
  });

  it("getCoursesForPath returns courses in path order", () => {
    const devopsCourses = getCoursesForPath("devops-engineer");
    expect(devopsCourses.length).toBe(5);
    expect(devopsCourses[0].slug).toBe("ultimate-aws-bootcamp");

    const agenticCourses = getCoursesForPath("agentic-devops-engineer");
    expect(agenticCourses.length).toBe(4);
    expect(agenticCourses[0].slug).toBe("aiml-foundations");
  });
});

describe("roadmaps data", () => {
  it("has exactly 3 career roadmaps", () => {
    expect(roadmaps.length).toBe(3);
  });

  it("every roadmap references valid path slugs", () => {
    const pathSlugs = new Set(paths.map((p) => p.slug));
    roadmaps.forEach((r) => {
      r.pathSlugs.forEach((slug) => {
        expect(pathSlugs.has(slug)).toBe(true);
      });
    });
  });

  it("every roadmap has at least 2 paths", () => {
    roadmaps.forEach((r) => {
      expect(r.pathSlugs.length).toBeGreaterThanOrEqual(2);
    });
  });
});
