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
        <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">
          Find the route from the job you have now.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#5e6068]">
          Pick where you are starting from. Each roadmap chains the paths
          and tracks that get you to production AI engineering.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {roadmaps.map((r) => (
          <button
            key={r.slug}
            onClick={() => setActiveTab(r.slug)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              activeTab === r.slug
                ? "border-[#131A2B] bg-[#131A2B] text-[#ffffff]"
                : "border-[#131A2B]/15 hover:border-[#131A2B]"
            }`}
          >
            {r.title}
          </button>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl bg-[#131A2B] p-7 text-[#ffffff] sm:p-10">
        <div className="mb-8">
          <span className="font-mono text-xs uppercase text-[#D9BFCB]">
            Starting from: {activeRoadmap.startingFrom}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.025em]">
            {activeRoadmap.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#b0b2b8]">
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
                <div className="rounded-xl border border-white/15 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#B08A9A]">
                        {path.number} / PATH
                      </span>
                      <h3 className="mt-1 font-display text-xl font-bold tracking-[-.02em]">
                        {path.title}
                      </h3>
                    </div>
                    <Link
                      to={`/learning-paths/${path.slug}`}
                      className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-bold transition hover:border-[#B08A9A] hover:text-[#B08A9A]"
                    >
                      View path
                    </Link>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {pathCourses.length === 0 && (
                      <p className="rounded-lg border border-dashed border-white/20 p-3 text-xs text-[#b0b2b8] sm:col-span-2">
                        Courses for this track are in development.
                      </p>
                    )}
                    {pathCourses.map((course) => {
                      const isComingSoon = course.status === "coming-soon";
                      return (
                        <Link
                          key={course.slug}
                          to={`/courses/${course.slug}`}
                          className={`rounded-lg border p-3 transition hover:border-[#B08A9A] ${
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
                              <span className="ml-2 shrink-0 rounded-full border border-dashed border-[#B08A9A]/40 px-1.5 py-0.5 text-[8px] font-bold text-[#B08A9A]/60">
                                Soon
                              </span>
                            )}
                          </div>
                          <span className="mt-1 block text-[10px] text-[#b0b2b8]">
                            {course.level} · {course.duration}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {!isLastPath && (
                  <div className="flex justify-center py-3">
                    <ChevronDown className="text-[#B08A9A]" size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to={`/learning-paths/${activeRoadmap.pathSlugs[0]}`}
            className="button-accent"
          >
            Start this roadmap <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
