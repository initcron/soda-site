import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "@/data/courses";
import { isFreeCourse, type LearningPath, type PathStatus } from "@/data/paths";

const statusLabel: Record<PathStatus, string> = {
  available: "Available",
  launching: "Launching first",
  planned: "In development",
};

export function PathBadge({ path }: { path: LearningPath }) {
  if (path.kind === "free") return <span className="chip-free">Free path</span>;
  if (path.status === "launching") return <span className="chip-new">{statusLabel.launching}</span>;
  if (path.status === "planned") return <span className="chip-planned">{statusLabel.planned}</span>;
  return <span className="chip">{statusLabel.available}</span>;
}

export function availableCourseCount(path: LearningPath, all: Course[]) {
  return path.courseSlugs.filter(
    (slug) => all.find((c) => c.slug === slug)?.status === "published",
  ).length;
}

export function TrackCard({
  path,
  availableCount,
}: {
  path: LearningPath;
  availableCount: number;
}) {
  return (
    <Link to={`/learning-paths/${path.slug}`} className="path-card group">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-[#886A7A]">
          {path.number} / {path.kind === "flagship" ? "TRACK" : "PATH"}
        </span>
        <PathBadge path={path} />
      </div>
      <h3 className="mt-8 font-display text-2xl font-bold leading-tight tracking-[-.025em] text-[#131A2B]">
        {path.title}
      </h3>
      <p className="mt-2 text-sm font-semibold text-[#886A7A]">{path.tagline}</p>
      <p className="mt-3 text-sm leading-6 text-[#565b68]">{path.description}</p>
      <div className="mt-auto flex items-center justify-between border-t border-[#131A2B]/10 pt-4 text-xs font-bold text-[#131A2B]">
        <span>
          {path.modules.length} modules
          {availableCount > 0 && ` · ${availableCount} course${availableCount !== 1 ? "s" : ""} today`}
          {path.certification && " · Certification"}
        </span>
        <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
      </div>
    </Link>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const free = isFreeCourse(course);
  const comingSoon = course.status === "coming-soon";
  return (
    <Link to={`/courses/${course.slug}`} className="course-card group">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#131A2B] font-mono text-sm font-bold text-[#D9BFCB]">
          {course.shortCode}
        </span>
        <div className="flex flex-wrap justify-end gap-2">
          {free && <span className="chip-free">Free soon in LearnForge</span>}
          {comingSoon && <span className="chip-planned">Coming soon</span>}
          <span className="chip">{course.level}</span>
        </div>
      </div>
      <h3 className="mt-7 font-display text-lg font-bold leading-snug tracking-[-.02em] text-[#131A2B]">
        {course.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#565b68]">{course.tagline}</p>
      <div className="mt-auto flex items-center justify-between border-t border-[#131A2B]/10 pt-4 text-xs font-bold text-[#131A2B]">
        <span>{comingSoon ? "See what is planned" : course.duration}</span>
        <ArrowUpRight
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          size={16}
        />
      </div>
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-3">{title}</h2>
        {lede && <p className="lede mt-4">{lede}</p>}
      </div>
      {action}
    </div>
  );
}
