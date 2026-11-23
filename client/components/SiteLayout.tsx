import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { links as external } from "@/data/links";
import { getFlagshipPaths, getFreePath } from "@/data/paths";
import { getSeo } from "@/data/seo";

const freePath = getFreePath();

const nav = [
  { label: "Tracks", to: "/learning-paths" },
  { label: "Certifications", to: "/certifications" },
  { label: "Free SRE path", to: `/learning-paths/${freePath.slug}` },
  { label: "Courses", to: "/courses" },
  { label: "Resources", to: "/resources" },
  { label: "For teams", to: "/for-teams" },
];

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B08A9A] font-display text-lg font-bold text-white">
        S
      </span>
      <span className={`font-display text-lg font-bold tracking-[-.03em] ${dark ? "text-white" : "text-[#131A2B]"}`}>
        School of DevOps
      </span>
    </span>
  );
}

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = getSeo(pathname).title;
  }, [pathname]);

  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#131A2B]">
      <div className="dark-band print:hidden">
        <div className="page-shell flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-xs">
          <span className="text-[#c9ccd6]">
            Agentic DevOps and AI Platform Engineering tracks are launching first.
          </span>
          <Link to="/certifications" className="inline-flex items-center gap-1 font-bold text-[#D9BFCB] hover:text-white">
            See the tracks and certifications <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <header className="relative z-30 print:hidden border-b border-[#131A2B]/10 bg-white/95 backdrop-blur-md">
        <div className="page-shell flex h-[68px] items-center justify-between gap-6">
          <Link to="/" onClick={close} aria-label="School of DevOps home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-[13px] font-semibold lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/learning-paths"}
                className={({ isActive }) =>
                  `transition-colors hover:text-[#886A7A] ${isActive ? "text-[#886A7A]" : "text-[#131A2B]"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href={external.login} target="_blank" rel="noopener noreferrer" className="px-2 text-[13px] font-semibold hover:text-[#886A7A]">
              Login
            </a>
            <Link to={`/learning-paths/${freePath.slug}`} className="button-primary px-4 py-2 text-[13px]">
              Start free
            </Link>
          </div>
          <button aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-lg border border-[#131A2B]/15 p-2 lg:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open && (
          <div className="page-shell border-t border-[#131A2B]/10 py-5 lg:hidden">
            <nav className="flex flex-col gap-4 text-sm font-bold">
              {nav.map((item) => (
                <NavLink onClick={close} key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
              <a href={external.login} target="_blank" rel="noopener noreferrer" onClick={close}>
                Login
              </a>
            </nav>
          </div>
        )}
      </header>

      <Outlet />

      <footer className="dark-band print:hidden">
        <div className="page-shell grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#aab0bf]">
              Production AI engineering for experienced engineers: Agentic DevOps, AI Platform Engineering and AgenticOps on Kubernetes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a90a0]">Tracks</p>
              {getFlagshipPaths().map((p) => (
                <Link key={p.slug} to={`/learning-paths/${p.slug}`} className="block text-[#e6e8ee] hover:text-[#D9BFCB]">
                  {p.shortTitle}
                </Link>
              ))}
              <Link to={`/learning-paths/${freePath.slug}`} className="block text-[#e6e8ee] hover:text-[#D9BFCB]">
                {freePath.shortTitle} (free)
              </Link>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a90a0]">Learn</p>
              <Link to="/certifications" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">Certifications</Link>
              <Link to="/courses" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">Course catalogue</Link>
              <Link to="/resources" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">Resources</Link>
              <Link to="/get-learnforge" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">Get LearnForge</Link>
              <Link to="/roadmaps" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">Career roadmaps</Link>
              <Link to="/for-teams" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">For teams</Link>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a90a0]">Follow</p>
              <a href={external.newsletter} target="_blank" rel="noopener noreferrer" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">Newsletter</a>
              <a href={external.youtube} target="_blank" rel="noopener noreferrer" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">YouTube</a>
              <a href={external.linkedin} target="_blank" rel="noopener noreferrer" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">LinkedIn</a>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a90a0]">School</p>
              <Link to="/about" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">About</Link>
              <a href={external.login} target="_blank" rel="noopener noreferrer" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">Login</a>
              <Link to="/legal" className="block text-[#e6e8ee] hover:text-[#D9BFCB]">Privacy & disclosure</Link>
            </div>
          </div>
        </div>
        <div className="page-shell border-t border-white/10 py-5 text-xs text-[#8a90a0]">
          © 2026 School of DevOps, run by Initcron Systems Pvt Ltd. Course links are our instructor links to Udemy.
        </div>
      </footer>
    </div>
  );
}
