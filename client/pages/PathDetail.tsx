import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getPathBySlug, getCoursesForPath } from "@/data/paths";

export default function PathDetail() {
  const { slug } = useParams<{ slug: string }>();
  const path = slug ? getPathBySlug(slug) : undefined;
  const pathCourses = slug ? getCoursesForPath(slug) : [];
  const prerequisitePath = path?.prerequisitePathSlug
    ? getPathBySlug(path.prerequisitePathSlug)
    : undefined;

  if (!path) {
    return <Navigate to="/learning-paths" replace />;
  }

  const publishedCount = pathCourses.filter(
    (c) => c.status === "published"
  ).length;
  const hasComingSoon = pathCourses.some((c) => c.status === "coming-soon");

  return (
    <main className="bg-[#f6f3f8]">
      <section className="border-b border-[#1e1a2e]/10">
        <div className="page-shell py-5 text-xs text-[#6e647a]">
          <Link className="hover:text-[#1e1a2e]" to="/">
            Home
          </Link>{" "}
          <ChevronRight className="inline" size={13} />{" "}
          <Link className="hover:text-[#1e1a2e]" to="/learning-paths">
            Learning paths
          </Link>{" "}
          <ChevronRight className="inline" size={13} /> {path.title}
        </div>
      </section>

      <section className="border-b border-[#1e1a2e]/10 bg-[#ebe3f0]">
        <div className="page-shell py-16 lg:py-24">
          <p className="eyebrow">
            {path.number} / PATH · {pathCourses.length} course
            {pathCourses.length !== 1 ? "s" : ""}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[.94] tracking-[-.07em] sm:text-6xl">
            {path.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-7 text-[#5a5066]">
            {path.description}
          </p>
          {prerequisitePath && (
            <div className="mt-6">
              <Link
                to={`/learning-paths/${prerequisitePath.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#1e1a2e]/20 bg-white/60 px-4 py-2 text-xs font-bold transition hover:border-[#1e1a2e]"
              >
                Prerequisite: {prerequisitePath.title}{" "}
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="page-shell py-20">
        <p className="eyebrow">Course sequence</p>
        <h2 className="section-title mt-4">Your ordered path.</h2>
        <div className="mt-12 space-y-0">
          {pathCourses.map((course, index) => {
            const isLast = index === pathCourses.length - 1 && !hasComingSoon;
            const isComingSoon = course.status === "coming-soon";
            return (
              <div key={course.slug} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                      isComingSoon
                        ? "border-2 border-dashed border-[#7b5e8b]/40 text-[#7b5e8b]/60"
                        : "bg-[#1e1a2e] text-[#a288b3]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-[#7b5e8b]/30" />
                  )}
                </div>
                <Link
                  to={`/courses/${course.slug}`}
                  className={`mb-6 flex-1 rounded-2xl border border-[#1e1a2e]/15 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#1e1a2e] hover:shadow-[4px_4px_0_#a288b3] ${
                    isComingSoon ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 rotate-[-4deg] items-center justify-center rounded-lg border border-[#1e1a2e] bg-[#a288b3] font-mono text-xs font-bold">
                      {course.shortCode}
                    </span>
                    <div className="flex gap-2">
                      {isComingSoon && (
                        <span className="rounded-full border border-dashed border-[#7b5e8b]/50 bg-[#a288b3]/20 px-2 py-1 text-[10px] font-bold uppercase">
                          Coming soon
                        </span>
                      )}
                      <span className="rounded-full border border-[#1e1a2e]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-extrabold tracking-[-.04em]">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#665c70]">
                    {course.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#1e1a2e]/10 pt-4 text-xs font-bold">
                    <span>{course.duration}</span>
                    <ArrowUpRight size={15} />
                  </div>
                </Link>
              </div>
            );
          })}
          {publishedCount <= 3 && (
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#7b5e8b]/30 text-[#7b5e8b]/40 font-mono text-lg">
                  +
                </div>
              </div>
              <div className="mb-6 flex-1 rounded-2xl border border-dashed border-[#7b5e8b]/30 bg-[#a288b3]/10 p-6">
                <p className="font-display text-sm font-bold text-[#7b5e8b]">
                  More courses coming soon
                </p>
                <p className="mt-1 text-xs text-[#7b5e8b]/70">
                  This path is actively growing. New courses will be added as
                  they become available.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
