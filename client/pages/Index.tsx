import { ArrowRight, ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { paths } from "@/data/paths";

const featuredCourses = courses.slice(0, 6);

function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 52C33 28 39 64 65 42S95 21 111 42s27 16 45-1 29 8 41-24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
      <path
        d="M12 60C41 36 49 73 77 49s29-16 44 3 27 12 42-4 22 4 30-13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Index() {
  return (
    <main>
      {/* Hero — unchanged */}
      <section className="relative border-b border-[#13201e]/10 bg-[#eef2e7]">
        <div className="page-shell grid min-h-[620px] items-center gap-14 py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
          <div className="relative z-10">
            <div className="eyebrow">
              <Sparkles size={13} /> Engineering education, without the fluff
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[.94] tracking-[-0.075em] text-[#13201e] sm:text-6xl lg:text-7xl">
              Production-grade
              <br />
              <span className="text-[#6d8700]">DevOps, MLOps</span>
              <br />& Agentic AI.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#52615a] sm:text-lg">
              Learn how modern systems actually get built, deployed, and operated
              — from the instructor behind 15+ practical DevOps and AI courses.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/courses" className="button-primary">
                Explore courses <ArrowRight size={17} />
              </Link>
              <Link
                to="/learning-paths"
                className="group inline-flex items-center gap-2 text-sm font-bold"
              >
                Find your path{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
            <div className="absolute -inset-6 rounded-full border border-[#7e8b4f]/30"></div>
            <div className="absolute inset-7 rounded-full border border-dashed border-[#7e8b4f]/50"></div>
            <Link
              to="/roadmaps"
              aria-label="Explore the Agentic AI roadmap"
              className="relative block aspect-square overflow-hidden rounded-full border-2 border-[#13201e] bg-[#d9ff5a] p-7 shadow-[12px_12px_0_#13201e] transition-transform hover:-translate-y-1 sm:p-8"
            >
              <div className="relative z-10 flex h-full flex-col justify-between rounded-[28%] border-2 border-[#13201e] bg-[#f7f7f2] p-7 sm:p-8">
                <span className="w-fit rounded-full border border-[#13201e] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  SODA system map
                </span>
                <div>
                  <p className="font-display text-4xl font-extrabold leading-none tracking-[-.06em]">
                    Build the
                    <br />
                    real thing.
                  </p>
                  <Scribble className="mt-4 h-12 w-48 text-[#789200]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">DevOps × AI</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#13201e] text-[#d9ff5a]">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 hidden h-24 w-full bg-[linear-gradient(135deg,transparent_49%,rgba(19,32,30,.06)_50%,transparent_51%)] bg-[length:18px_18px] lg:block"></div>
      </section>

      {/* Stats — unchanged */}
      <section className="border-b border-[#13201e]/10 bg-[#13201e] text-[#f7f7f2]">
        <div className="page-shell grid grid-cols-2 divide-x divide-white/15 md:grid-cols-4">
          <div className="py-7 pr-4">
            <p className="font-display text-3xl font-extrabold tracking-[-.06em]">
              301k+
            </p>
            <p className="mt-1 text-xs text-[#aeb8ae]">learners worldwide</p>
          </div>
          <div className="py-7 px-4">
            <p className="font-display text-3xl font-extrabold tracking-[-.06em]">
              7k+
            </p>
            <p className="mt-1 text-xs text-[#aeb8ae]">course reviews</p>
          </div>
          <div className="py-7 pr-4 pl-0 md:px-4">
            <p className="font-display text-3xl font-extrabold tracking-[-.06em]">
              15+
            </p>
            <p className="mt-1 text-xs text-[#aeb8ae]">technical courses</p>
          </div>
          <div className="py-7 pl-4">
            <p className="font-display text-3xl font-extrabold tracking-[-.06em]">
              4.7/5
            </p>
            <p className="mt-1 text-xs text-[#aeb8ae]">average rating</p>
          </div>
        </div>
        <div className="page-shell pb-4 text-[10px] text-[#718177]">
          Udemy profile snapshot — July 2026
        </div>
      </section>

      {/* Learning Paths — data-driven */}
      <section className="page-shell py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Start with the outcome</p>
            <h2 className="section-title mt-4">
              Choose a learning path,
              <br />
              not just a course.
            </h2>
          </div>
          <Link
            to="/learning-paths"
            className="text-sm font-bold underline-offset-4 hover:underline"
          >
            See all paths <ArrowRight className="inline" size={15} />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {paths.map((path) => (
            <Link
              key={path.slug}
              to={`/learning-paths/${path.slug}`}
              className="path-card group"
            >
              <span className="font-mono text-xs text-[#759100]">
                {path.number} / PATH
              </span>
              <h3 className="mt-12 font-display text-2xl font-extrabold leading-tight tracking-[-.05em]">
                {path.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#617069]">
                {path.description}
              </p>
              <span className="mt-7 flex items-center gap-2 text-sm font-bold">
                Explore path{" "}
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={16}
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses — data-driven */}
      <section className="border-y border-[#13201e]/10 bg-[#e5ebdc]">
        <div className="page-shell py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Featured courses</p>
              <h2 className="section-title mt-4">
                Technical depth, built
                <br />
                for real work.
              </h2>
            </div>
            <Link
              to="/courses"
              className="text-sm font-bold underline-offset-4 hover:underline"
            >
              Browse catalogue <ArrowRight className="inline" size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link
                to={`/courses/${course.slug}`}
                key={course.slug}
                className={`course-card group ${course.status === "coming-soon" ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 rotate-[-4deg] items-center justify-center rounded-lg border border-[#13201e] bg-[#d9ff5a] font-mono text-sm font-bold">
                    {course.shortCode}
                  </span>
                  <div className="flex gap-2">
                    {course.status === "coming-soon" && (
                      <span className="rounded-full border border-dashed border-[#6d8700]/50 bg-[#d9ff5a]/20 px-2 py-1 text-[10px] font-bold uppercase">
                        Coming soon
                      </span>
                    )}
                    <span className="rounded-full border border-[#13201e]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {course.level}
                    </span>
                  </div>
                </div>
                <h3 className="mt-10 font-display text-xl font-extrabold tracking-[-.04em]">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-[#617069]">
                  {course.tagline}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#13201e]/10 pt-4 text-xs font-bold">
                  <span>View course</span>
                  <ArrowUpRight
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    size={17}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap CTA — unchanged */}
      <section className="page-shell py-24">
        <div className="overflow-hidden rounded-[2rem] bg-[#13201e] px-7 py-10 text-[#f7f7f2] sm:px-12 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="eyebrow text-[#d9ff5a]">Free visual guide</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[.98] tracking-[-.06em] sm:text-5xl">
                What does an Agentic AI Engineer actually need to know?
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#b9c4b9]">
                Follow the core skills, identify the deep-dives, and see which
                building blocks turn experiments into dependable systems.
              </p>
              <Link
                to="/roadmaps"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]"
              >
                Explore the roadmap <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-[#9ca997]/30 p-6">
              <div className="absolute -right-5 -top-5 rounded-full border border-[#d9ff5a]/50 bg-[#13201e] px-3 py-2 text-[10px] font-bold text-[#d9ff5a]">
                CORE PATH
              </div>
              <div className="rounded-lg border border-[#d9ff5a] p-3 text-center text-xs font-bold">
                Agentic AI Engineer
              </div>
              <div className="mx-auto h-7 w-px bg-[#d9ff5a]"></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-white/30 p-3 text-center text-[10px] font-bold">
                  Foundations
                </div>
                <div className="rounded-lg border border-white/30 p-3 text-center text-[10px] font-bold">
                  Agent skills
                </div>
                <div className="rounded-lg border border-white/30 p-3 text-center text-[10px] font-bold">
                  Production
                </div>
              </div>
              <div className="mx-auto h-7 w-px bg-[#d9ff5a]"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-dashed border-white/30 p-3 text-center text-[10px]">
                  LLM basics
                </div>
                <div className="rounded-lg border border-dashed border-white/30 p-3 text-center text-[10px]">
                  Eval & guardrails
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor CTA — unchanged */}
      <section className="border-t border-[#13201e]/10 bg-[#d9ff5a]">
        <div className="page-shell flex flex-col justify-between gap-10 py-16 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Built by a practitioner</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.06em]">
              From Gourav J. Shah,
              <br />
              to the next generation of builders.
            </h2>
          </div>
          <Link
            to="/about"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold"
          >
            Meet your instructor <ChevronRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
