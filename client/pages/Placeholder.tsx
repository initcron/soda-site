import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const labels: Record<string, string> = { "/courses": "Courses", "/learning-paths": "Learning paths", "/roadmaps": "Roadmaps", "/about": "About SODA", "/legacy-access": "Legacy learner access", "/legal": "Legal" };

export default function Placeholder() {
 const location = useLocation();
 const label = labels[location.pathname] ?? "This page";
 return <main className="page-shell flex min-h-[58vh] items-center py-20"><div className="max-w-2xl"><p className="eyebrow">SODA / Coming next</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em]">{label},<br/>with the same depth.</h1><p className="mt-6 max-w-lg text-base leading-7 text-[#586760]">This section is ready for its dedicated content. Continue exploring the current course and homepage experience in the meantime.</p><Link to="/courses/mlops-bootcamp" className="button-primary mt-8">Explore MLOps Bootcamp <ArrowRight size={16}/></Link></div></main>;
}
