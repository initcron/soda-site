import { ArrowUpRight, ChevronRight } from "lucide-react";
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

      <section className="page-shell py-20">
        <p className="eyebrow">Course sequence</p>
        <h2 className="section-title mt-4">Your ordered path.</h2>
        <div className="mt-12 space-y-0">
          {pathCourses.map((course, index) => {
            const isLast = index === pathCourses.length - 1;
            const isComingSoon = course.status === "coming-soon";
            return (
              <div key={course.slug} className="flex gap-6">
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
