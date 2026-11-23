import { ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { PathBadge, SectionHeading } from "@/components/site";
import { links } from "@/data/links";
import { getCertifiedPaths } from "@/data/paths";

const certified = getCertifiedPaths();

const principles = [
  {
    title: "Hands-on, not multiple choice",
    body: "You are assessed on work you do in a live environment: building, breaking and fixing a system.",
  },
  {
    title: "A capstone someone reviews",
    body: "The track certifications include a production-shaped project and a written account of your decisions.",
  },
  {
    title: "Priced for individuals",
    body: "A credential should not need a corporate budget. Prices will be published before enrolment opens.",
  },
  {
    title: "Kept current",
    body: "The tools change fast. Exams are tied to patterns first and tool versions second, and are revised as the stack moves.",
  },
];

const faqs = [
  {
    q: "Can I get certified today?",
    a: "Not yet. The certifications are planned. The courses in each track are available now, and the exam and capstone review will open after the full track is released.",
  },
  {
    q: "What will it cost?",
    a: "Prices are not set. Our aim is a cost an individual engineer can pay without employer sponsorship.",
  },
  {
    q: "Do I need the free SRE Foundations path first?",
    a: "Only if you are missing the basics. The tracks assume you are comfortable with Linux, containers, Kubernetes essentials and CI/CD.",
  },
  {
    q: "Is the SRE/DevOps certification free too?",
    a: "The SRE Foundations learning path will be free. The certification exam is optional and will carry a fee, which is not set yet.",
  },
  {
    q: "How does this relate to CNCF certifications?",
    a: "They are independent. Our tracks teach the same production skills, so they are useful preparation, but passing ours does not grant a CNCF credential.",
  },
];

export default function Certifications() {
  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell py-16 lg:py-20">
          <p className="eyebrow-dark">
            <Award size={13} /> Certifications
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">
            Credentials that show you can run it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9ccd6]">
            Four hands-on certifications for engineers who run production systems. They are in development and will open track by track.
          </p>
          <a href={links.newsletter} target="_blank" rel="noopener noreferrer" className="button-accent mt-9">
            Email me when enrolment opens <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading
          eyebrow="Planned certifications"
          title="Four School of DevOps certifications."
          lede="One for each flagship track, and one for the free SRE Foundations path. Start the courses now and sit the exam when it opens."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {certified.map((path) => (
            <div key={path.slug} className="card flex flex-col p-7">
              <div className="flex items-center justify-between gap-3">
                <Award className="text-[#886A7A]" size={22} />
                <PathBadge path={path} />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold leading-snug tracking-[-.02em]">
                {path.certification!.name}
              </h3>
              <p className="mt-2 text-sm font-semibold text-[#886A7A]">{path.certification!.format}</p>
              <p className="mt-4 text-sm leading-6 text-[#565b68]">
                <span className="font-bold text-[#131A2B]">Capstone: </span>
                {path.capstone}
              </p>
              <Link to={`/learning-paths/${path.slug}`} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold">
                View {path.shortTitle} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#131A2B]/10 bg-[#f6f5f7]">
        <div className="page-shell py-20">
          <SectionHeading eyebrow="How we will assess" title="What the credential will mean." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.title} className="card">
                <h3 className="font-display text-lg font-bold tracking-[-.02em]">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#565b68]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading eyebrow="Questions" title="Before you ask." />
        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="card">
              <dt className="font-display text-lg font-bold tracking-[-.02em]">{f.q}</dt>
              <dd className="mt-2 text-sm leading-6 text-[#565b68]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
