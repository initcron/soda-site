import { ArrowRight, BookOpen, ListChecks, MonitorDown, SquareTerminal, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/site";
import { links } from "@/data/links";
import { getFreePath } from "@/data/paths";

const freePath = getFreePath();

const features = [
  {
    icon: BookOpen,
    title: "Lessons",
    body: "Read each course module by module, in order, at your own pace.",
  },
  {
    icon: SquareTerminal,
    title: "Terminal labs",
    body: "Run the lab commands in a terminal inside the app, next to the instructions.",
  },
  {
    icon: ListChecks,
    title: "Quizzes",
    body: "Check what you have understood before you move to the next module.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    body: "Your courses are on your computer, so you can keep learning without a connection.",
  },
];

const facts = [
  "A desktop app for macOS, Windows and Linux.",
  "No sign-up is needed to read free courses.",
  "An AI key is optional. The app works without one.",
];

export default function GetLearnForge() {
  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell py-16 lg:py-20">
          <p className="eyebrow-dark">
            <MonitorDown size={13} /> The School of DevOps app
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">
            LearnForge: your courses, labs and quizzes in one desktop app.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9ccd6]">
            LearnForge is where School of DevOps courses will run. It is in development and not available to download yet.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {links.appDownload ? (
              <a href={links.appDownload} className="button-accent">
                Download LearnForge <ArrowRight size={16} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/40 px-5 py-3 text-sm font-bold text-[#c9ccd6]">
                Download coming soon
              </span>
            )}
            <a href={links.newsletter} target="_blank" rel="noopener noreferrer" className="button-ghost-dark">
              Email me when it is ready
            </a>
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading eyebrow="What it does" title="Built for hands-on courses." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card">
              <f.icon className="text-[#886A7A]" size={22} />
              <h3 className="mt-6 font-display text-lg font-bold tracking-[-.02em]">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#565b68]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#131A2B]/10 bg-[#f6f5f7]">
        <div className="page-shell grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2 className="section-title mt-3">Before you download.</h2>
            <ul className="mt-8 space-y-3">
              {facts.map((f) => (
                <li key={f} className="card py-4 text-sm font-semibold">{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Until then</p>
            <h2 className="section-title mt-3">Start learning today.</h2>
            <p className="lede mt-4">
              Published courses are on Udemy for now. Existing learners on our previous course site can keep using it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/learning-paths/${freePath.slug}`} className="button-primary">
                See {freePath.title} <ArrowRight size={16} />
              </Link>
              <Link to="/courses" className="button-ghost">
                Browse courses
              </Link>
              <a href={links.login} target="_blank" rel="noopener noreferrer" className="button-ghost">
                Previous course site login
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
