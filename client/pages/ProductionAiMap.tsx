import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SystemMap } from "@/components/SystemMap";

const parts = [
  {
    label: "Left column",
    title: "AI is the workload",
    body: "Someone has to run the models: GPUs, scheduling, inference serving, routing, monitoring and cost. The model is a service like any other, with unusual hardware and unusual failure modes. This is the work of an AI platform engineer.",
    to: "/learning-paths/ai-platform-engineering",
    cta: "AI Platform Engineering with Kubernetes",
  },
  {
    label: "Right column",
    title: "AI is the worker",
    body: "Agents now write code, change infrastructure, run pipelines and triage incidents. Someone has to design that work, supervise it and decide how much to trust it. This is the work of an agentic DevOps engineer.",
    to: "/learning-paths/agentic-devops",
    cta: "Agentic DevOps",
  },
  {
    label: "The bridge",
    title: "Agents in production",
    body: "An agent your team relies on is a worker, and it is also a workload that needs a runtime, an identity, a sandbox and network policy. The two columns meet here. Most of the hard questions about agents are platform questions.",
    to: "/learning-paths/agenticops-kubernetes",
    cta: "AgenticOps",
  },
  {
    label: "The floor",
    title: "Security, guardrails, governance, evaluation and cost",
    body: "These are not a separate column. Everything above stands on them, so we teach them inside every track. An agent earns authority one step at a time: read-only, then pull requests only, then approval-gated actions, then bounded autonomy.",
    to: "/learning-paths",
    cta: "See the specialisations",
  },
];

export default function ProductionAiMap() {
  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell pt-5 text-xs text-[#8a90a0]">
          <Link className="hover:text-white" to="/">Home</Link>{" "}
          <ChevronRight className="inline" size={13} />{" "}
          <Link className="hover:text-white" to="/resources">Resources</Link>{" "}
          <ChevronRight className="inline" size={13} /> The production AI map
        </div>
        <div className="page-shell grid items-center gap-12 py-14 lg:grid-cols-[1fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow-dark">Guide</p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-.035em] sm:text-5xl">
              The production AI map: two columns, one bridge, one floor.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#c9ccd6]">
              Production AI engineering is two jobs that share a foundation. This is the diagram we draw first in every course and workshop, because it tells you where a skill fits before you learn it.
            </p>
          </div>
          <SystemMap />
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {parts.map((p) => (
            <article key={p.title}>
              <p className="eyebrow">{p.label}</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-[-.025em] sm:text-3xl">{p.title}</h2>
              <p className="mt-4 text-base leading-8 text-[#3b4150]">{p.body}</p>
              <Link to={p.to} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#886A7A] hover:underline">
                {p.cta} <ArrowRight size={15} />
              </Link>
            </article>
          ))}

          <article className="border-t border-[#131A2B]/10 pt-12">
            <p className="eyebrow">How to use it</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-[-.025em] sm:text-3xl">
              Find your column, then check the floor.
            </h2>
            <p className="mt-4 text-base leading-8 text-[#3b4150]">
              If your team is being asked to host models, start on the left. If your team is adopting coding agents, start on the right. If you are doing both, you are already on the bridge. Whichever it is, ask the floor questions before you ship: who is this acting as, what can it reach, how would we know it went wrong, and what does a run cost?
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/resources/skills-assessment" className="button-primary">
                Find where you stand <ArrowRight size={16} />
              </Link>
              <Link to="/learning-paths" className="button-ghost">
                Compare the tracks
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
