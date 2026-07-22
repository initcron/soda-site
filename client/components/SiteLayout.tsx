import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const links = [
  { label: "Courses", to: "/courses" },
  { label: "Learning paths", to: "/learning-paths" },
  { label: "Roadmaps", to: "/roadmaps" },
  { label: "About", to: "/about" },
];

export default function SiteLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f7f2] text-[#13201e]">
      <header className="relative z-30 border-b border-[#13201e]/10 bg-[#f7f7f2]/90 backdrop-blur-md">
        <div className="page-shell flex h-[76px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9ff5a] font-display text-lg font-black tracking-[-0.1em]">S</span>
            <span className="font-display text-xl font-extrabold tracking-[-0.06em]">SODA<span className="text-[#60706b]">.</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13px] font-semibold md:flex">
            {links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `transition-colors hover:text-[#678100] ${isActive ? "text-[#678100]" : ""}`}>{link.label}</NavLink>)}
          </nav>
          <Link to="/legacy-access" className="hidden rounded-full border border-[#13201e]/15 px-4 py-2 text-xs font-bold transition hover:border-[#13201e] md:block">Legacy learner login</Link>
          <button aria-label="Toggle navigation" onClick={() => setOpen(!open)} className="rounded-full border border-[#13201e]/15 p-2 md:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {open && <div className="page-shell border-t border-[#13201e]/10 py-5 md:hidden"><nav className="flex flex-col gap-4 text-sm font-bold">{links.map((link) => <NavLink onClick={() => setOpen(false)} key={link.to} to={link.to}>{link.label}</NavLink>)}<Link onClick={() => setOpen(false)} to="/legacy-access">Legacy learner login</Link></nav></div>}
      </header>
      <Outlet />
      <footer className="border-t border-[#13201e]/15 bg-[#13201e] text-[#f7f7f2]">
        <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.3fr_2fr]">
          <div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9ff5a] font-display text-base font-black text-[#13201e]">S</span><span className="font-display text-xl font-extrabold tracking-[-0.06em]">SODA.</span></div><p className="mt-5 max-w-xs text-sm leading-6 text-[#c5cdc1]">Production-grade learning for the systems that run modern AI.</p></div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3"><div className="space-y-3"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8e9e95]">Explore</p><Link to="/courses" className="block hover:text-[#d9ff5a]">Courses</Link><Link to="/learning-paths" className="block hover:text-[#d9ff5a]">Learning paths</Link><Link to="/roadmaps" className="block hover:text-[#d9ff5a]">Roadmaps</Link></div><div className="space-y-3"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8e9e95]">Company</p><Link to="/about" className="block hover:text-[#d9ff5a]">About SODA</Link><Link to="/legacy-access" className="block hover:text-[#d9ff5a]">Legacy access</Link></div><div className="space-y-3"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8e9e95]">Legal</p><Link to="/legal" className="block hover:text-[#d9ff5a]">Privacy & disclosure</Link></div></div>
        </div>
        <div className="page-shell border-t border-white/10 py-5 text-xs text-[#8e9e95]">© 2026 School of Devops & AI. Course links go to Udemy.</div>
      </footer>
    </div>
  );
}
