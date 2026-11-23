import { describe, expect, it } from "vitest";
import { courses } from "./courses";
import { getFlagshipPaths, paths } from "./paths";
import { SITE_URL, canonicalUrl, getPrerenderRoutes, getSeo, getSitemapRoutes } from "./seo";

describe("getSeo", () => {
  it("gives the homepage the positioning title", () => {
    expect(getSeo("/").title).toBe("School of DevOps | Run AI in production. Safely.");
  });

  it("treats a trailing slash as the same page", () => {
    expect(getSeo("/courses/")).toEqual(getSeo("/courses"));
  });

  it("builds course pages from course data", () => {
    const course = courses[0];
    const seo = getSeo(`/courses/${course.slug}`);
    expect(seo.title).toBe(`${course.title} | School of DevOps`);
    expect(course.description.startsWith(seo.description.replace(/…$/, ""))).toBe(true);
  });

  it("builds path pages from path data", () => {
    const path = paths[0];
    const seo = getSeo(`/learning-paths/${path.slug}`);
    expect(seo.title).toBe(`${path.title} | School of DevOps`);
    expect(path.description.startsWith(seo.description.replace(/…$/, ""))).toBe(true);
  });

  it("marks unknown pages and placeholders as noindex", () => {
    expect(getSeo("/nope").noindex).toBe(true);
    expect(getSeo("/courses/nope").noindex).toBe(true);
    expect(getSeo("/legal").noindex).toBe(true);
    expect(getSeo("/courses").noindex).toBeFalsy();
  });

  it("never returns an empty or overlong description", () => {
    getPrerenderRoutes().forEach((route) => {
      const { title, description } = getSeo(route);
      expect(title.length).toBeGreaterThan(0);
      expect(description.length).toBeGreaterThan(40);
      expect(description.length).toBeLessThanOrEqual(300);
    });
  });

  it("gives every prerendered page a unique title", () => {
    const titles = getPrerenderRoutes().map((r) => getSeo(r).title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

describe("prerender routes", () => {
  it("covers every course, path and manager brief", () => {
    const routes = getPrerenderRoutes();
    courses.forEach((c) => expect(routes).toContain(`/courses/${c.slug}`));
    paths.forEach((p) => expect(routes).toContain(`/learning-paths/${p.slug}`));
    getFlagshipPaths().forEach((p) => expect(routes).toContain(`/resources/manager-brief/${p.slug}`));
    ["/", "/courses", "/learning-paths", "/certifications", "/for-teams", "/about", "/resources", "/get-learnforge"].forEach(
      (r) => expect(routes).toContain(r),
    );
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("keeps noindex pages out of the sitemap", () => {
    const sitemap = getSitemapRoutes();
    expect(sitemap).not.toContain("/legal");
    expect(sitemap).toContain("/");
    sitemap.forEach((r) => expect(getSeo(r).noindex).toBeFalsy());
  });
});

describe("canonicalUrl", () => {
  it("uses the production host and a trailing slash", () => {
    expect(SITE_URL).toBe("https://schoolofdevops.com");
    expect(canonicalUrl("/")).toBe("https://schoolofdevops.com/");
    expect(canonicalUrl("/courses")).toBe("https://schoolofdevops.com/courses/");
    expect(canonicalUrl("/courses/")).toBe("https://schoolofdevops.com/courses/");
  });
});
