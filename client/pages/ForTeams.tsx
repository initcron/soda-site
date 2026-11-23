import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/site";
import { clients } from "@/data/clients";
import { links } from "@/data/links";
import { getFlagshipPaths } from "@/data/paths";

const flagship = getFlagshipPaths();

const problems = [
  "Developers are using coding agents without a consistent review standard.",
  "The platform team has been asked to support AI workloads and GPUs.",
  "SREs are experimenting with agents for incident response.",
  "Leadership wants AI usage, risk and cost under control.",
];

const format = [
  {
    title: "Built around your stack",
    body: "We start from the tools, clouds and constraints your team already has, and use your problems as the exercises.",
  },
  {
    title: "Instructor-led and hands-on",
    body: "Two to five days, in the room or live online. Every concept is followed by a lab on a real environment.",
  },
  {
    title: "A capstone and a leaders' briefing",
    body: "The team ships one working system. Leaders get a short briefing on what was built and what to do next.",
  },
];

export default function ForTeams() {
  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell py-16 lg:py-20">
          <p className="eyebrow-dark">
            <Users size={13} /> For teams
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">
            Turn your DevOps, SRE and platform teams into the people who run your AI.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9ccd6]">
            Hands-on team training in Agentic DevOps and AI Platform Engineering, from a trainer with 12,000+ hours in enterprise classrooms.
          </p>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="button-accent mt-9">
            Talk to Gourav on LinkedIn <ArrowRight size={16} />
          </a>
        </div>
        <div className="border-t border-white/10">
          <div className="page-shell flex flex-wrap items-center justify-center gap-x-10 gap-y-5 py-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a90a0]">Engineers trained at</p>
            {clients.map((client) => (
              <img key={client.name} src={client.logo} alt={client.name} className="h-7 object-contain opacity-70" />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-14 py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Where teams are today</p>
          <h2 className="section-title mt-3">If one of these is true, we should talk.</h2>
        </div>
        <ul className="space-y-3">
          {problems.map((p) => (
            <li key={p} className="card py-4 text-sm font-semibold leading-6">{p}</li>
          ))}
        </ul>
      </section>

      <section className="border-y border-[#131A2B]/10 bg-[#f6f5f7]">
        <div className="page-shell py-20">
          <SectionHeading
            eyebrow="Programmes"
            title="Team versions of every flagship track."
            lede="Each programme follows the public track curriculum, adapted to your environment."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {flagship.map((path) => (
              <Link key={path.slug} to={`/learning-paths/${path.slug}`} className="card-link group flex flex-col">
                <span className="font-mono text-xs text-[#886A7A]">{path.number} / TRACK</span>
                <h3 className="mt-6 font-display text-xl font-bold leading-snug tracking-[-.02em]">{path.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#565b68]">{path.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold">
                  See the curriculum
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading eyebrow="How it runs" title="Training your team can use on Monday." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {format.map((f) => (
            <div key={f.title} className="card">
              <h3 className="font-display text-lg font-bold tracking-[-.02em]">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#565b68]">{f.body}</p>
            </div>
          ))}
        </div>
        <div className="dark-band mt-12 flex flex-col items-start justify-between gap-6 rounded-xl p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-[-.03em]">Tell us what your team is trying to solve.</h2>
            <p className="mt-2 text-sm text-[#c9ccd6]">We will reply with an outline, prerequisites and a quote.</p>
          </div>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="button-accent shrink-0">
            Start the conversation <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
