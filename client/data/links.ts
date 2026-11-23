import type { Course } from "./courses";

/**
 * Every cross-site URL lives here. Hosts and who owns them:
 * - hub: LearnForge Hub (catalog, buy page, checkout, licences)
 * - verify: public certificate check, a single certificate is `${verify}c/{id}`
 * - login: the legacy TutorLMS site
 */
export const links = {
  newsletter: "https://runbooks.schoolofdevops.com/",
  youtube: "https://www.youtube.com/schoolofdevops",
  linkedin: "https://in.linkedin.com/in/gouravshah",
  login: "https://courses.schoolofdevops.com/dashboard/",
  hub: "https://hub.schoolofdevops.com",
  verify: "https://verify.schoolofdevops.com/",
  /** Set when signed LearnForge installers have a download host. */
  appDownload: null as string | null,
} as const;

/** `hubSlug` is the Hub catalog slug, which may differ from the page slug. */
export function hubBuyUrl(hubSlug: string): string {
  return `${links.hub}/buy/soda/${hubSlug}`;
}

export interface CourseCta {
  kind: "hub" | "udemy";
  href: string;
  label: string;
}

/**
 * Where a course's enrol button goes. A course moves from Udemy to the Hub by
 * setting `hubSlug` on it once the Hub has published that course. The Hub
 * prices by country, so no price is ever shown here.
 */
export function getCourseCta(course: Course): CourseCta | null {
  if (course.status !== "published") return null;
  if (course.hubSlug) {
    return { kind: "hub", href: hubBuyUrl(course.hubSlug), label: "See price and enrol" };
  }
  return { kind: "udemy", href: course.udemyUrl, label: "Enroll on Udemy" };
}
