import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-[58vh] items-center py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">404 / Not found</p>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.95] tracking-[-.07em]">
          This page doesn't exist yet.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-[#5e6068]">
          The page you're looking for may have moved or hasn't been built yet.
          Explore the course catalogue to find what you need.
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
