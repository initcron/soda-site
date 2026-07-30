import { ArrowRight, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { paths } from "@/data/paths";
import { getCoursesForPath } from "@/data/paths";

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState(paths[0].slug);
  const activePath = paths.find((p) => p.slug === activeTab) ?? paths[0];
  const pathCourses = getCoursesForPath(activeTab);

  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <Map size={13} /> Free visual guides
        </p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">
          Free maps for the systems behind AI.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#586760]">
          A roadmap is broader than a course: it shows the core skills, optional
          deep-dives, and the few places where SODA can help you go deeper.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex flex-wrap gap-2">
        {paths.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActiveTab(p.slug)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              activeTab === p.slug
                ? "border-[#13201e] bg-[#13201e] text-[#f7f7f2]"
                : "border-[#13201e]/15 hover:border-[#13201e]"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Roadmap diagram */}
      <div className="mt-10 overflow-hidden rounded-3xl bg-[#13201e] p-7 text-[#f7f7f2] sm:p-10">
        <div className="mb-8">
          <span className="font-mono text-xs text-[#d9ff5a]">
            {activePath.number} / ROADMAP
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.05em]">
            {activePath.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#b9c4b9]">
            {activePath.description}
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-0">
          {pathCourses.map((course, index) => {
            const isLast = index === pathCourses.length - 1;
            const isComingSoon = course.status === "coming-soon";
            return (
              <div key={course.slug} className="flex gap-5">
                {/* Connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                      isComingSoon
                        ? "border border-dashed border-[#d9ff5a]/40 text-[#d9ff5a]/50"
                        : "bg-[#d9ff5a] text-[#13201e]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-[#d9ff5a]/30" />
                  )}
                </div>
                {/* Node */}
                <Link
                  to={`/courses/${course.slug}`}
                  className={`mb-4 flex-1 rounded-xl border p-4 transition hover:border-[#d9ff5a] ${
                    isComingSoon
                      ? "border-dashed border-white/20 opacity-50"
                      : "border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold">
                      {course.title}
                    </h3>
                    <span className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-bold uppercase">
                      {course.level}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#b9c4b9]">
                    {course.tagline}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to={`/learning-paths/${activePath.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]"
          >
            Start this path <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
