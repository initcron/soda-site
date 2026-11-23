import { ArrowRight, Award, Check, ChevronRight, Hammer } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CourseCard, PathBadge } from "@/components/site";
import { links } from "@/data/links";
import { getCoursesForPath, getPathBySlug, resolvePathSlug } from "@/data/paths";

export default function PathDetail() {
  const { slug } = useParams<{ slug: string }>();
  const resolved = slug ? resolvePathSlug(slug) : undefined;

  if (!resolved) return <Navigate to="/learning-paths" replace />;
  if (resolved !== slug) return <Navigate to={`/learning-paths/${resolved}`} replace />;

  const path = getPathBySlug(resolved)!;
  const pathCourses = getCoursesForPath(resolved);
  const prerequisite = path.prerequisitePathSlug ? getPathBySlug(path.prerequisitePathSlug) : undefined;
  const isFree = path.kind === "free";
  const isFlagship = path.kind === "flagship";

  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell pt-5 text-xs text-[#8a90a0]">
          <Link className="hover:text-white" to="/">Home</Link>{" "}
          <ChevronRight className="inline" size={13} />{" "}
          <Link className="hover:text-white" to="/learning-paths">Tracks</Link>{" "}
          <ChevronRight className="inline" size={13} /> {path.shortTitle}
        </div>
        <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.4fr_.6fr] lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-[#D9BFCB]">
                {path.number} / {isFlagship ? "TRACK" : "PATH"}
              </span>
              <PathBadge path={path} />
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-.035em] sm:text-5xl lg:text-6xl">
              {path.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-[#D9BFCB]">{path.tagline}</p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#c9ccd6]">{path.description}</p>
            {prerequisite && (
              <Link to={`/learning-paths/${prerequisite.slug}`} className="mt-7 inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-xs font-bold transition hover:border-white">
                Recommended first: {prerequisite.title} <ArrowRight size={13} />
              </Link>
            )}
          </div>
          <aside className="self-start rounded-xl border border-white/15 bg-white/[0.04] p-6">
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[#aab0bf]">Modules</dt>
                <dd className="font-bold">{path.modules.length}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#aab0bf]">Courses today</dt>
                <dd className="font-bold">{pathCourses.filter((c) => c.status === "published").length}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#aab0bf]">Price</dt>
                <dd className="text-right font-bold">
                  {isFree ? "Free on our platform" : "Per course on Udemy"}
                </dd>
              </div>
              {path.certification && (
                <div className="flex justify-between gap-4">
                  <dt className="text-[#aab0bf]">Certification</dt>
                  <dd className="font-bold">Planned</dd>
                </div>
              )}
            </dl>
            {pathCourses.length > 0 ? (
              <a href="#courses" className="button-accent mt-6 w-full">
                See the courses <ArrowRight size={15} />
              </a>
            ) : (
              <a href={links.newsletter} target="_blank" rel="noopener noreferrer" className="button-accent mt-6 w-full">
                Email me at launch
              </a>
            )}
            {isFree && (
              <p className="mt-4 text-xs leading-5 text-[#aab0bf]">
                Free access opens when our learning platform launches. The courses are on Udemy at Udemy's price until then.
              </p>
            )}
          </aside>
        </div>
      </section>

      <section className="page-shell grid gap-14 py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">What you will be able to do</p>
          <h2 className="section-title mt-3">Outcomes</h2>
          <ul className="mt-8 space-y-4">
            {path.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-sm leading-6 text-[#3b4150]">
                <Check className="mt-1 shrink-0 text-[#886A7A]" size={16} />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Who it is for</p>
          <h2 className="section-title mt-3">Audience</h2>
          <ul className="mt-8 space-y-3">
            {path.audience.map((a) => (
              <li key={a} className="card py-4 text-sm font-semibold">{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[#131A2B]/10 bg-[#f6f5f7]">
        <div className="page-shell py-20">
          <p className="eyebrow">Curriculum</p>
          <h2 className="section-title mt-3">What the {isFlagship ? "track" : "path"} covers.</h2>
          {path.status !== "available" && (
            <p className="lede mt-4 max-w-2xl">
              This is the planned curriculum. Modules are released as they are finished, and the outline will change as the tools do.
            </p>
          )}
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {path.modules.map((m, i) => (
              <li key={m.title} className="card flex gap-5">
                <span className="font-mono text-sm text-[#886A7A]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-[-.02em]">{m.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#565b68]">{m.topics}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {(path.capstone || path.certification) && (
        <section className="page-shell grid gap-4 py-20 lg:grid-cols-2">
          {path.capstone && (
            <div className="card p-8">
              <Hammer className="text-[#886A7A]" size={22} />
              <p className="eyebrow mt-5">Capstone</p>
              <p className="mt-3 font-display text-xl font-bold leading-snug tracking-[-.02em]">{path.capstone}</p>
            </div>
          )}
          {path.certification && (
            <div className="dark-band rounded-xl p-8">
              <Award className="text-[#D9BFCB]" size={22} />
              <p className="eyebrow-dark mt-5">Certification · planned</p>
              <p className="mt-3 font-display text-xl font-bold leading-snug tracking-[-.02em]">{path.certification.name}</p>
              <p className="mt-2 text-sm leading-6 text-[#c9ccd6]">{path.certification.format}.</p>
              <Link to="/certifications" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#D9BFCB] hover:text-white">
                How certification will work <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </section>
      )}

      <section id="courses" className="border-t border-[#131A2B]/10">
        <div className="page-shell py-20">
          <p className="eyebrow">Courses</p>
          <h2 className="section-title mt-3">
            {pathCourses.length > 0 ? "Start with what is available today." : "Courses are in development."}
          </h2>
          {pathCourses.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pathCourses.map((course) => (
                <CourseCard key={course.slug} course={course} free={isFree} />
              ))}
            </div>
          ) : (
            <div className="mt-8 max-w-2xl">
              <p className="lede">
                No courses in this track are published yet. Subscribe to the newsletter and we will email you when the first module opens.
              </p>
              <a href={links.newsletter} target="_blank" rel="noopener noreferrer" className="button-primary mt-6">
                Email me at launch <ArrowRight size={15} />
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
