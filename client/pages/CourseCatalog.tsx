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
          <Sparkles size={13} /> Course catalogue
        </p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">
          Courses built for the work ahead.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#5e5469]">
          No generic promises. Just focused courses for engineers who need to
          ship, operate, and improve production systems.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
            activeFilter === "all"
              ? "border-[#1e1a2e] bg-[#1e1a2e] text-[#f6f3f8]"
              : "border-[#1e1a2e]/15 hover:border-[#1e1a2e]"
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
                ? "border-[#1e1a2e] bg-[#1e1a2e] text-[#f6f3f8]"
                : "border-[#1e1a2e]/15 hover:border-[#1e1a2e]"
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
              <span className="flex h-12 w-12 rotate-[-4deg] items-center justify-center rounded-lg border border-[#1e1a2e] bg-[#a288b3] font-mono text-sm font-bold">
                {course.shortCode}
              </span>
              <div className="flex gap-2">
                {course.status === "coming-soon" && (
                  <span className="rounded-full border border-dashed border-[#7b5e8b]/50 bg-[#a288b3]/20 px-2 py-1 text-[10px] font-bold uppercase">
                    Coming soon
                  </span>
                )}
                <span className="rounded-full border border-[#1e1a2e]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {course.level}
                </span>
              </div>
            </div>
            <h2 className="mt-10 font-display text-xl font-extrabold tracking-[-.04em]">
              {course.title}
            </h2>
            <p className="mt-2 text-sm text-[#665c70]">{course.tagline}</p>
            <div className="mt-6 flex justify-between border-t border-[#1e1a2e]/10 pt-4 text-xs font-bold">
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
