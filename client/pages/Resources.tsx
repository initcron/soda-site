import { ArrowRight, ArrowUpRight, ClipboardCheck, FileText, Map, Mail, Route, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/site";
import { links } from "@/data/links";
import { getFlagshipPaths } from "@/data/paths";

const flagship = getFlagshipPaths();

const tools = [
  {
    icon: ClipboardCheck,
    title: "Skills self-assessment",
    body: "Twenty questions, five areas, and the path we would start you on. Takes five minutes.",
    to: "/resources/skills-assessment",
    cta: "Take the assessment",
  },
  {
    icon: Map,
    title: "The production AI map",
    body: "Workload, worker, bridge and floor: the one diagram we use to explain where every skill fits.",
    to: "/resources/production-ai-map",
    cta: "Read the map",
  },
  {
    icon: Route,
    title: "Career roadmaps",
    body: "The route from the job you have now to production AI engineering, by starting role.",
    to: "/roadmaps",
    cta: "Find your roadmap",
  },
];

export default function Resources() {
  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell py-16 lg:py-20">
          <p className="eyebrow-dark">Resources</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">
            Free tools for engineers moving into production AI.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9ccd6]">
            Work out where you stand, see how the pieces fit, and make the case to your manager. No sign-up.
          </p>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading eyebrow="Tools and guides" title="Start here." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="card-link group flex flex-col">
              <t.icon className="text-[#886A7A]" size={22} />
              <h3 className="mt-6 font-display text-xl font-bold tracking-[-.02em]">{t.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#565b68]">{t.body}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold">
                {t.cta}
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#131A2B]/10 bg-[#f6f5f7]">
        <div className="page-shell py-20">
          <SectionHeading
            eyebrow="Manager briefs"
            title="Convince your manager."
            lede="A one-page brief for each track: what you will learn, what the team gets back, and what you are asking for. Print it or save it as a PDF."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {flagship.map((path) => (
              <Link key={path.slug} to={`/resources/manager-brief/${path.slug}`} className="card-link group flex flex-col">
                <FileText className="text-[#886A7A]" size={22} />
                <h3 className="mt-6 font-display text-xl font-bold leading-snug tracking-[-.02em]">{path.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#565b68]">{path.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold">
                  Open the brief
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading eyebrow="Follow the work" title="New builds every fortnight." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <a href={links.newsletter} target="_blank" rel="noopener noreferrer" className="card-link group">
            <Mail className="text-[#886A7A]" size={22} />
            <h3 className="mt-6 font-display text-xl font-bold tracking-[-.02em]">Runbooks & Robots newsletter</h3>
            <p className="mt-2 text-sm leading-6 text-[#565b68]">
              The decision behind each build, and what broke on the way.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
              Subscribe <ArrowUpRight size={15} />
            </span>
          </a>
          <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="card-link group">
            <Youtube className="text-[#886A7A]" size={22} />
            <h3 className="mt-6 font-display text-xl font-bold tracking-[-.02em]">School of DevOps on YouTube</h3>
            <p className="mt-2 text-sm leading-6 text-[#565b68]">
              Walkthroughs of AI platforms and agents running on real infrastructure.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
              Watch <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
