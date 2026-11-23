import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { courses } from "@/data/courses";
import { isFreeCourse, paths } from "@/data/paths";

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
        <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">
          Courses built for the work ahead.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#5e6068]">
          Every published course, filterable by track. Courses are on Udemy
          while we build our own learning platform.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
            activeFilter === "all"
              ? "border-[#131A2B] bg-[#131A2B] text-[#ffffff]"
              : "border-[#131A2B]/15 hover:border-[#131A2B]"
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
                ? "border-[#131A2B] bg-[#131A2B] text-[#ffffff]"
                : "border-[#131A2B]/15 hover:border-[#131A2B]"
            }`}
          >
            {p.shortTitle}
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
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#131A2B] font-mono text-sm font-bold text-[#D9BFCB]">
                {course.shortCode}
              </span>
              <div className="flex flex-wrap justify-end gap-2">
                {isFreeCourse(course) && <span className="chip-free">Free soon in LearnForge</span>}
                {course.status === "coming-soon" && (
                  <span className="rounded-full border border-dashed border-[#886A7A]/50 bg-[#B08A9A]/20 px-2 py-1 text-[10px] font-bold uppercase">
                    Coming soon
                  </span>
                )}
                <span className="rounded-full border border-[#131A2B]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {course.level}
                </span>
              </div>
            </div>
            <h2 className="mt-10 font-display text-xl font-bold tracking-[-.02em]">
              {course.title}
            </h2>
            <p className="mt-2 text-sm text-[#6b6d75]">{course.tagline}</p>
            <div className="mt-6 flex justify-between border-t border-[#131A2B]/10 pt-4 text-xs font-bold">
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
