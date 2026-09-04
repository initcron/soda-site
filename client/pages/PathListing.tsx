import { ArrowRight, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { paths, getPathBySlug } from "@/data/paths";
import { courses } from "@/data/courses";

const aiPaths = paths.filter((p) =>
  ["ai-augmented-devops", "agentic-devops-engineer", "ai-platform-engineer"].includes(p.slug)
);
const devopsPaths = paths.filter((p) =>
  ["devops-engineer", "kubernetes-platform-engineer"].includes(p.slug)
);

function PathCard({ path }: { path: (typeof paths)[number] }) {
  const courseCount = path.courseSlugs.length;
  const levels = [
    ...new Set(
      path.courseSlugs
        .map((s) => courses.find((c) => c.slug === s)?.level)
        .filter(Boolean)
    ),
  ];
  const prereq = path.prerequisitePathSlug
    ? getPathBySlug(path.prerequisitePathSlug)
    : undefined;
  return (
    <Link
      to={`/learning-paths/${path.slug}`}
      className="path-card group"
    >
      <span className="font-mono text-xs text-[#B07A64]">
        {path.number} / PATH
      </span>
      {prereq && (
        <span className="mt-2 block text-[10px] font-bold text-[#B07A64]/70">
          Requires: {prereq.title}
        </span>
      )}
      <h2 className="mt-12 font-display text-2xl font-extrabold leading-tight tracking-[-.05em]">
        {path.title}
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#6b6d75]">
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
}

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
        <p className="mt-6 text-base leading-7 text-[#5e6068]">
          Ordered sequences for a role, with a course-level CTA at every step so
          you can start where your experience starts.
        </p>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-2xl font-extrabold tracking-[-.05em]">
          AI Native DevOps Engineer
        </h2>
        <p className="mt-2 text-sm text-[#5e6068]">
          For existing DevOps engineers ready to integrate AI into their workflows.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {aiPaths.map((path) => (
            <PathCard key={path.slug} path={path} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-extrabold tracking-[-.05em]">
          DevOps / Platform Engineer
        </h2>
        <p className="mt-2 text-sm text-[#5e6068]">
          The foundational path for new and experienced engineers who want to get
          into and dive deeper into DevOps.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {devopsPaths.map((path) => (
            <PathCard key={path.slug} path={path} />
          ))}
        </div>
      </div>
    </main>
  );
}
