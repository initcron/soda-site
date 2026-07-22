import { ArrowRight, ArrowUpRight, Map, Route, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const courseItems = [
  ["MLOps Bootcamp", "Intermediate", "Build and operate reliable ML systems.", "/courses/mlops-bootcamp"],
  ["Docker for MLOps & Agentic AI", "Intermediate", "Containerize intelligent workloads.", "/courses/mlops-bootcamp"],
  ["LLMOps with Kubernetes", "Advanced", "Run AI systems at scale.", "/courses/mlops-bootcamp"],
  ["Production Agentic DevOps", "Advanced", "Operationalize AI agents.", "/courses/mlops-bootcamp"],
  ["AI-Driven Infrastructure as Code", "Intermediate", "Automate production infrastructure.", "/courses/mlops-bootcamp"],
  ["DevSecOps Foundations", "Foundation", "Build secure delivery systems.", "/courses/mlops-bootcamp"],
];

const pathItems = [
  ["MLOps / AI Platform Engineer", "Foundations → MLOps → production operations", "4 courses"],
  ["Agentic DevOps Engineer", "DevOps foundations → agent architecture → reliable agents", "5 courses"],
  ["DevSecOps / Platform Engineering", "Secure delivery → platform foundations → scale", "4 courses"],
];

export default function Placeholder() {
  const location = useLocation();
  const isCourses = location.pathname === "/courses";
  const isPaths = location.pathname === "/learning-paths";
  const isRoadmaps = location.pathname === "/roadmaps";
  const title = isCourses ? "Courses built for the work ahead." : isPaths ? "Choose the outcome. Follow the path." : isRoadmaps ? "Free maps for the systems behind AI." : location.pathname === "/about" ? "Practical education, from a practitioner." : location.pathname === "/legacy-access" ? "Your existing learning is still here." : location.pathname === "/legal" ? "Clear terms for a clear relationship." : "Build the real thing.";

  if (isCourses) return <main className="page-shell py-16 sm:py-24"><div className="max-w-2xl"><p className="eyebrow"><Sparkles size={13}/> SODA course catalogue</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">{title}</h1><p className="mt-6 text-base leading-7 text-[#586760]">No generic promises. Just focused courses for engineers who need to ship, operate, and improve production systems.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{courseItems.map(([name, level, description, to], index) => <Link to={to} key={name} className="course-card group"><div className="flex items-start justify-between"><span className="font-mono text-xs text-[#789200]">0{index + 1}</span><span className="rounded-full border border-[#13201e]/15 px-2 py-1 text-[10px] font-bold uppercase">{level}</span></div><h2 className="mt-10 font-display text-xl font-extrabold tracking-[-.04em]">{name}</h2><p className="mt-2 text-sm leading-6 text-[#617069]">{description}</p><div className="mt-6 flex justify-between border-t border-[#13201e]/10 pt-4 text-xs font-bold"><span>View course</span><ArrowUpRight size={16}/></div></Link>)}</div></main>;

  if (isPaths) return <main className="page-shell py-16 sm:py-24"><div className="max-w-2xl"><p className="eyebrow"><Route size={13}/> Guided learning paths</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">{title}</h1><p className="mt-6 text-base leading-7 text-[#586760]">Ordered sequences for a role, with a course-level CTA at every step so you can start where your experience starts.</p></div><div className="mt-12 grid gap-4 lg:grid-cols-3">{pathItems.map(([name, description, count], index) => <Link to="/courses/mlops-bootcamp" key={name} className="path-card group"><span className="font-mono text-xs text-[#789200]">0{index + 1} / PATH</span><h2 className="mt-12 font-display text-2xl font-extrabold leading-tight tracking-[-.05em]">{name}</h2><p className="mt-4 text-sm leading-6 text-[#617069]">{description}</p><p className="mt-6 text-xs font-bold">{count} <ArrowRight className="ml-1 inline transition-transform group-hover:translate-x-1" size={14}/></p></Link>)}</div></main>;

  if (isRoadmaps) return <main className="page-shell py-16 sm:py-24"><div className="max-w-2xl"><p className="eyebrow"><Map size={13}/> Free visual guides</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em] sm:text-6xl">{title}</h1><p className="mt-6 text-base leading-7 text-[#586760]">A roadmap is broader than a course: it shows the core skills, optional deep-dives, and the few places where SODA can help you go deeper.</p></div><div className="mt-12 rounded-3xl bg-[#13201e] p-7 text-[#f7f7f2] sm:p-10"><div className="mx-auto max-w-2xl"><div className="rounded-xl border border-[#d9ff5a] p-4 text-center font-display font-bold">Agentic AI Engineer</div><div className="mx-auto h-8 w-px bg-[#d9ff5a]"/><div className="grid gap-3 sm:grid-cols-3">{["Foundations", "Core agent skills", "Production readiness"].map((item) => <div key={item} className="rounded-xl border border-white/25 p-4 text-center text-sm font-bold">{item}</div>)}</div><div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-3">{["LLM basics", "Agent architecture", "Eval & guardrails"].map((item) => <div key={item} className="rounded-xl border border-dashed border-white/30 p-4 text-center text-xs text-[#c5cec3]">{item}</div>)}</div><Link to="/learning-paths" className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]">Turn this into a guided path <ArrowRight size={16}/></Link></div></div></main>;

  return <main className="page-shell flex min-h-[58vh] items-center py-20"><div className="max-w-2xl"><p className="eyebrow">SODA / {location.pathname.slice(1).replace("-", " ")}</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em]">{title}</h1><p className="mt-6 max-w-lg text-base leading-7 text-[#586760]">This page is part of the SODA experience and is ready for its dedicated content. Continue exploring the live course catalogue while the full content is being prepared.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/courses" className="button-primary">Browse courses <ArrowRight size={16}/></Link><Link to="/" className="inline-flex items-center gap-2 px-3 py-3 text-sm font-bold">Back home</Link></div></div></main>;
}
