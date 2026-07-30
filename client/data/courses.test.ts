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
