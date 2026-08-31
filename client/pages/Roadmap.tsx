import { ArrowRight, ChevronDown, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { roadmaps, getPathBySlug, getCoursesForPath } from "@/data/paths";

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState(roadmaps[0].slug);
  const activeRoadmap =
    roadmaps.find((r) => r.slug === activeTab) ?? roadmaps[0];

  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <Map size={13} /> Career roadmaps
        </p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">
          Career maps for the systems behind AI.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#5e5469]">
          A career roadmap chains multiple learning paths into a complete
          journey. See the full picture from foundations to mastery.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {roadmaps.map((r) => (
          <button
            key={r.slug}
            onClick={() => setActiveTab(r.slug)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              activeTab === r.slug
                ? "border-[#1e1a2e] bg-[#1e1a2e] text-[#f6f3f8]"
                : "border-[#1e1a2e]/15 hover:border-[#1e1a2e]"
            }`}
          >
            {r.title}
          </button>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl bg-[#1e1a2e] p-7 text-[#f6f3f8] sm:p-10">
        <div className="mb-8">
          <span className="font-mono text-xs text-[#a288b3]">
            CAREER ROADMAP
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.05em]">
            {activeRoadmap.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#b5aebb]">
            {activeRoadmap.description}
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-0">
          {activeRoadmap.pathSlugs.map((pathSlug, pathIndex) => {
            const path = getPathBySlug(pathSlug);
            const pathCourses = getCoursesForPath(pathSlug);
            if (!path) return null;
            const isLastPath =
              pathIndex === activeRoadmap.pathSlugs.length - 1;

            return (
              <div key={pathSlug}>
                <div className="rounded-2xl border border-white/15 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#a288b3]">
                        {path.number} / PATH
                      </span>
                      <h3 className="mt-1 font-display text-xl font-extrabold tracking-[-.04em]">
                        {path.title}
                      </h3>
                    </div>
                    <Link
                      to={`/learning-paths/${path.slug}`}
                      className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-bold transition hover:border-[#a288b3] hover:text-[#a288b3]"
                    >
                      View path
                    </Link>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {pathCourses.map((course) => {
                      const isComingSoon = course.status === "coming-soon";
                      return (
                        <Link
                          key={course.slug}
                          to={`/courses/${course.slug}`}
                          className={`rounded-lg border p-3 transition hover:border-[#a288b3] ${
                            isComingSoon
                              ? "border-dashed border-white/15 opacity-50"
                              : "border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display text-xs font-bold">
                              {course.title}
                            </span>
                            {isComingSoon && (
                              <span className="ml-2 shrink-0 rounded-full border border-dashed border-[#a288b3]/40 px-1.5 py-0.5 text-[8px] font-bold text-[#a288b3]/60">
                                Soon
                              </span>
                            )}
                          </div>
                          <span className="mt-1 block text-[10px] text-[#b5aebb]">
                            {course.level} · {course.duration}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {!isLastPath && (
                  <div className="flex justify-center py-3">
                    <ChevronDown className="text-[#a288b3]" size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to={`/learning-paths/${activeRoadmap.pathSlugs[0]}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#a288b3] px-5 py-3 text-sm font-bold text-[#1e1a2e]"
          >
            Start this roadmap <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
