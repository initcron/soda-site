import { ChevronRight, Printer } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getPathBySlug } from "@/data/paths";

const teamBenefits: Record<string, string[]> = {
  "agentic-devops": [
    "A shared, written standard for how agents are used on our infrastructure and pipelines, in place of each engineer improvising.",
    "Agent-written changes that arrive as reviewed pull requests behind policy gates, so speed does not cost stability.",
    "A way to measure whether an agent workflow is worth its cost before we roll it out.",
  ],
  "ai-platform-engineering": [
    "The ability to decide, with numbers, when a hosted model API is enough and when self-hosting pays for itself.",
    "GPU capacity shared across teams with quotas and isolation, so it is not bought per project.",
    "AI services with SLOs, dashboards and cost per token, operated like the rest of production.",
  ],
  "agenticops-kubernetes": [
    "Agents that run with their own identity, scoped credentials and a sandbox, so they do not borrow an engineer's access.",
    "One governed route to tools and MCP servers, with allowlists and an audit trail.",
    "Evidence for security and compliance reviews: what each agent did, with what authority, at what cost.",
  ],
};

export default function ManagerBrief() {
  const { slug } = useParams<{ slug: string }>();
  const path = slug ? getPathBySlug(slug) : undefined;

  if (!path || path.kind !== "flagship") return <Navigate to="/resources" replace />;

  return (
    <main className="bg-[#f6f5f7] print:bg-white">
      <section className="border-b border-[#131A2B]/10 bg-white print:hidden">
        <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-4">
          <p className="text-xs text-[#565b68]">
            <Link className="hover:text-[#131A2B]" to="/resources">Resources</Link>{" "}
            <ChevronRight className="inline" size={13} /> Manager brief: {path.shortTitle}
          </p>
          <button onClick={() => window.print()} className="button-primary px-4 py-2 text-[13px]">
            <Printer size={15} /> Print or save as PDF
          </button>
        </div>
      </section>

      <article className="mx-auto my-10 max-w-3xl rounded-xl border border-[#131A2B]/15 bg-white p-8 sm:p-12 print:my-0 print:max-w-none print:rounded-none print:border-0 print:p-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#886A7A]">
          Training request · School of DevOps
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-.03em] sm:text-4xl">
          {path.title}
        </h1>
        <p className="mt-3 text-base font-semibold text-[#886A7A]">{path.tagline}</p>

        <h2 className="mt-10 font-display text-lg font-bold">The request</h2>
        <p className="mt-2 text-sm leading-7 text-[#3b4150]">
          I would like to take the {path.title} track from School of DevOps. {path.description}
        </p>

        <h2 className="mt-8 font-display text-lg font-bold">What the team gets back</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#3b4150]">
          {teamBenefits[path.slug].map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <h2 className="mt-8 font-display text-lg font-bold">What I will be able to do</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#3b4150]">
          {path.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>

        <h2 className="mt-8 font-display text-lg font-bold">What it covers</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-[#3b4150]">
          {path.modules.map((m) => (
            <li key={m.title}>
              <span className="font-bold text-[#131A2B]">{m.title}.</span> {m.topics}
            </li>
          ))}
        </ol>

        {path.capstone && (
          <>
            <h2 className="mt-8 font-display text-lg font-bold">What I will bring back</h2>
            <p className="mt-2 text-sm leading-7 text-[#3b4150]">
              The track ends in a capstone I can demonstrate to the team: {path.capstone.charAt(0).toLowerCase() + path.capstone.slice(1)}
            </p>
          </>
        )}

        <h2 className="mt-8 font-display text-lg font-bold">Time and cost</h2>
        <p className="mt-2 text-sm leading-7 text-[#3b4150]">
          The track is self-paced and fits around normal work. Courses are bought individually; current prices are on each course page. A certification, {path.certification?.name}, is planned and optional.
        </p>

        <h2 className="mt-8 font-display text-lg font-bold">About the provider</h2>
        <p className="mt-2 text-sm leading-7 text-[#3b4150]">
          School of DevOps is led by Gourav Shah, a course author for The Linux Foundation who has delivered more than 12,000 hours of hands-on engineering workshops. Team training is also available: schoolofdevops.com/for-teams
        </p>

        <p className="mt-10 border-t border-[#131A2B]/10 pt-5 font-mono text-[11px] text-[#565b68]">
          schoolofdevops.com/learning-paths/{path.slug}
        </p>
      </article>
    </main>
  );
}
