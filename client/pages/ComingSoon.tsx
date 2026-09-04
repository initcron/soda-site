import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ComingSoon() {
  const location = useLocation();
  const pageName = location.pathname.slice(1).replace(/-/g, " ");

  return (
    <main className="page-shell flex min-h-[58vh] items-center py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">School of DevOps / {pageName}</p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em]">
          This page is coming soon.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-[#5e6068]">
          We're still building this part of the School of DevOps experience. In the
          meantime, explore the live course catalogue or head back home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/courses" className="button-primary">
            Browse courses <ArrowRight size={16} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-3 text-sm font-bold"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
