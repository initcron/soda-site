import { ArrowRight, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "@/data/paths";
import { courses } from "@/data/courses";

export default function PathListing() {
  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <Route size={13} /> Guided learning paths
        </p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">
          Choose the outcome. Follow the path.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#586760]">
          Ordered sequences for a role, with a course-level CTA at every step so
          you can start where your experience starts.
        </p>
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {paths.map((path) => {
          const courseCount = path.courseSlugs.length;
          const levels = [
            ...new Set(
              path.courseSlugs
                .map((s) => courses.find((c) => c.slug === s)?.level)
                .filter(Boolean)
            ),
          ];
          return (
            <Link
              to={`/learning-paths/${path.slug}`}
              key={path.slug}
              className="path-card group"
            >
              <span className="font-mono text-xs text-[#759100]">
                {path.number} / PATH
              </span>
              <h2 className="mt-12 font-display text-2xl font-extrabold leading-tight tracking-[-.05em]">
                {path.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#617069]">
                {path.description}
              </p>
              <div className="mt-6 flex items-center justify-between text-xs font-bold">
                <span>
                  {courseCount} course{courseCount !== 1 ? "s" : ""} ·{" "}
                  {levels.join(" → ")}
                </span>
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={14}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
