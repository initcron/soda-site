import { describe, expect, it } from "vitest";
import type { Course } from "./courses";
import { courses } from "./courses";
import { getCourseCta, hubBuyUrl, links } from "./links";

const published = courses.find((c) => c.status === "published")!;

describe("links config", () => {
  it("keeps every cross-site host in one place", () => {
    expect(links.hub).toBe("https://hub.schoolofdevops.com");
    expect(links.verify).toBe("https://verify.schoolofdevops.com/");
    expect(links.login).toBe("https://courses.schoolofdevops.com/dashboard/");
  });

  it("has no app download URL until one exists", () => {
    expect(links.appDownload).toBeNull();
  });

  it("builds Hub buy URLs from the Hub catalog slug", () => {
    expect(hubBuyUrl("agentic-devops")).toBe("https://hub.schoolofdevops.com/buy/soda/agentic-devops");
  });
});

describe("getCourseCta", () => {
  it("sends courses without a Hub slug to Udemy", () => {
    const cta = getCourseCta({ ...published, hubSlug: undefined });
    expect(cta).toEqual({ kind: "udemy", href: published.udemyUrl, label: "Enroll on Udemy" });
  });

  it("sends courses published on the Hub to the Hub buy page, with no price", () => {
    const cta = getCourseCta({ ...published, hubSlug: "some-hub-slug" } as Course);
    expect(cta).toEqual({
      kind: "hub",
      href: "https://hub.schoolofdevops.com/buy/soda/some-hub-slug",
      label: "See price and enrol",
    });
  });

  it("has no call to action for unpublished courses", () => {
    const comingSoon = courses.find((c) => c.status === "coming-soon")!;
    expect(getCourseCta(comingSoon)).toBeNull();
  });

  it("no course points at the Hub until the Hub publishes it", () => {
    courses.forEach((c) => expect(c.hubSlug).toBeUndefined());
  });
});
