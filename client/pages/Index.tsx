import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseCard, SectionHeading, TrackCard, availableCourseCount } from "@/components/site";
import { SystemMap } from "@/components/SystemMap";
import { clients } from "@/data/clients";
import { courses } from "@/data/courses";
import { links } from "@/data/links";
import { getFlagshipPaths, getFreePath, specialisations } from "@/data/paths";

const flagship = getFlagshipPaths();
const freePath = getFreePath();
const featuredCourses = courses.filter((c) => c.status === "published").slice(0, 6);

const stats = [
  { value: "301k+", label: "learners worldwide" },
  { value: "12,000+", label: "hours of workshops delivered" },
  { value: "4.7/5", label: "average course rating" },
  { value: "160+", label: "countries" },
];

const steps = [
  {
    step: "01",
    title: "Foundations",
    body: "Fill any gaps with the free SRE Foundations path: Docker, Kubernetes, AWS, Terraform, Ansible and CI/CD.",
    tag: "Free",
  },
  {
    step: "02",
    title: "Track courses",
    body: "Work through a track in order. Each module explains the concept, then has you build it in a lab.",
    tag: "Courses",
  },
  {
    step: "03",
    title: "Capstone",
    body: "Build one production-shaped system end to end and write up the decisions you made.",
    tag: "Project",
  },
  {
    step: "04",
    title: "Certification",
    body: "Pass a hands-on exam and a capstone review to become a School of DevOps Certified engineer.",
    tag: "Planned",
  },
];

const audiences = [
  {
    title: "DevOps, cloud and platform engineers",
    question: "How do I move into AI infrastructure or agentic engineering without starting over?",
    to: "/learning-paths/ai-platform-engineering",
    cta: "AI Platform Engineering",
  },
  {
    title: "SRE and operations engineers",
    question: "How can agents help with incidents and toil, and how do I keep AI services reliable?",
    to: "/learning-paths/agentic-devops",
    cta: "Agentic DevOps",
  },
  {
    title: "Developers and QA engineers",
    question: "I own more testing, deployment and operations now. How do I use AI safely across it?",
    to: "/learning-paths/agentic-devops",
    cta: "Agentic DevOps",
  },
  {
    title: "Engineering and platform leaders",
    question: "How do I enable my teams to use AI without losing control of quality, security and cost?",
    to: "/for-teams",
    cta: "team training",
  },
];

export default function Index() {
  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div>
            <p className="eyebrow-dark">Production AI engineering</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl lg:text-[4.2rem]">
              Run AI in production.
              <br />
              <span className="text-[#D9BFCB]">Safely.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#c9ccd6]">
              Courses, learning paths and certifications in Agentic DevOps and AI Platform Engineering, for experienced DevOps, SRE, platform and software engineers.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/learning-paths" className="button-accent">
                Explore the tracks <ArrowRight size={16} />
              </Link>
              <Link to={`/learning-paths/${freePath.slug}`} className="button-ghost-dark">
                Start free with SRE Foundations
              </Link>
            </div>
            <p className="mt-6 text-sm text-[#8a90a0]">
              Taught by{" "}
              <Link to="/about" className="underline underline-offset-4 hover:text-white">
                Gourav Shah
              </Link>
              , course author for The Linux Foundation.
            </p>
          </div>
          <SystemMap />
        </div>
        <div className="border-t border-white/10">
          <div className="page-shell grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold tracking-[-.03em]">{s.value}</p>
                <p className="mt-1 text-xs text-[#aab0bf]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-band border-t border-white/10">
        <div className="page-shell flex flex-wrap items-center justify-center gap-x-10 gap-y-5 py-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a90a0]">
            Engineers trained at
          </p>
          {clients.map((client) => (
            <img key={client.name} src={client.logo} alt={client.name} className="h-7 object-contain opacity-70" />
          ))}
        </div>
      </section>

      <section className="page-shell py-20 lg:py-24">
        <SectionHeading
          eyebrow="Flagship tracks"
          title="Three tracks. Both sides of production AI."
          lede="Use AI to build and operate software, and build the platforms that run AI. Each track ends in a capstone and a certification."
          action={
            <Link to="/learning-paths" className="text-sm font-bold underline-offset-4 hover:underline">
              Compare all tracks <ArrowRight className="inline" size={15} />
            </Link>
          }
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {flagship.map((path) => (
            <TrackCard key={path.slug} path={path} availableCount={availableCourseCount(path, courses)} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#131A2B]/10 bg-[#f6f5f7]">
        <div className="page-shell py-20 lg:py-24">
          <SectionHeading
            eyebrow="How a track works"
            title="From foundations to a credential you can show."
            lede="The same four steps in every track, so you always know where you are and what comes next."
            action={
              <Link to="/certifications" className="text-sm font-bold underline-offset-4 hover:underline">
                About certifications <ArrowRight className="inline" size={15} />
              </Link>
            }
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.step} className="card">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#886A7A]">{s.step}</span>
                  <span className={s.tag === "Free" ? "chip-free" : s.tag === "Planned" ? "chip-planned" : "chip"}>{s.tag}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-[-.02em]">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#565b68]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-shell py-20 lg:py-24">
        <SectionHeading
          eyebrow="Who it is for"
          title="Built for engineers who already ship."
          lede="We teach mid-career professionals. If you are new, the free path gets you ready."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {audiences.map((a) => (
            <Link key={a.title} to={a.to} className="card-link group">
              <h3 className="font-display text-lg font-bold tracking-[-.02em]">{a.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#565b68]">“{a.question}”</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#886A7A]">
                Start with {a.cta}
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dark-band">
        <div className="page-shell grid items-center gap-12 py-20 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="chip-free">Free path</span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-.03em] sm:text-[2.6rem]">
              {freePath.title}: start your DevOps and SRE journey for free.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#c9ccd6]">{freePath.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/learning-paths/${freePath.slug}`} className="button-accent">
                View the free path <ArrowRight size={16} />
              </Link>
              <a href={links.newsletter} target="_blank" rel="noopener noreferrer" className="button-ghost-dark">
                Email me when it opens
              </a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {freePath.modules.map((m) => (
              <li key={m.title} className="flex gap-3 rounded-lg border border-white/15 p-4">
                <Check className="mt-0.5 shrink-0 text-[#D9BFCB]" size={16} />
                <div>
                  <p className="text-sm font-bold">{m.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#aab0bf]">{m.topics}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-shell py-20 lg:py-24">
        <SectionHeading
          eyebrow="Specialisations"
          title="The floor every track stands on."
          lede="Security, cost and governance are taught inside each track. These specialisations go deeper for the people who own them."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specialisations.map((s) => (
            <div key={s.slug} className="card flex flex-col">
              <span className="chip-planned w-fit">In development</span>
              <h3 className="mt-6 font-display text-lg font-bold tracking-[-.02em]">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#565b68]">{s.description}</p>
              <ul className="mt-4 space-y-1.5 border-t border-[#131A2B]/10 pt-4 text-xs text-[#565b68]">
                {s.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#131A2B]/10 bg-[#f6f5f7]">
        <div className="page-shell py-20 lg:py-24">
          <SectionHeading
            eyebrow="Available today"
            title="Courses you can start now."
            lede="Published courses are on Udemy while we build our own learning platform."
            action={
              <Link to="/courses" className="text-sm font-bold underline-offset-4 hover:underline">
                Browse the catalogue <ArrowRight className="inline" size={15} />
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="dark-band rounded-xl p-8 sm:p-10">
            <p className="eyebrow-dark">For teams</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-.03em]">
              Training a platform, DevOps or SRE team?
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#c9ccd6]">
              Instructor-led programmes built around your stack and your problems, from a trainer with 12,000+ hours in enterprise classrooms.
            </p>
            <Link to="/for-teams" className="button-accent mt-7">
              Explore team training <ArrowRight size={16} />
            </Link>
          </div>
          <div className="card p-8 sm:p-10">
            <p className="eyebrow">Stay current</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-.03em]">
              Runbooks & Robots
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#565b68]">
              A newsletter and YouTube channel on running AI in production: builds, failures and the decisions behind them.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={links.newsletter} target="_blank" rel="noopener noreferrer" className="button-primary">
                Subscribe to the newsletter
              </a>
              <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="button-ghost">
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
