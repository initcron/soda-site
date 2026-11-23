import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading, TrackCard, availableCourseCount } from "@/components/site";
import { courses } from "@/data/courses";
import { getFlagshipPaths, paths, specialisations } from "@/data/paths";

const flagship = getFlagshipPaths();
const supporting = paths.filter((p) => p.kind !== "flagship");

export default function PathListing() {
  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell py-16 lg:py-20">
          <p className="eyebrow-dark">Tracks and learning paths</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">
            Pick the side of production AI you want to own.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9ccd6]">
            Three flagship tracks for experienced engineers, a free foundations path for anyone starting out, and Kubernetes depth in between.
          </p>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading
          eyebrow="Flagship tracks"
          title="Courses, a capstone and a certification."
          lede="Agentic DevOps and AI Platform Engineering launch first. AgenticOps follows."
          action={
            <Link to="/certifications" className="text-sm font-bold underline-offset-4 hover:underline">
              About certifications <ArrowRight className="inline" size={15} />
            </Link>
          }
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {flagship.map((path) => (
            <TrackCard key={path.slug} path={path} availableCount={availableCourseCount(path, courses)} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#131A2B]/10 bg-[#f6f5f7]">
        <div className="page-shell py-20">
          <SectionHeading
            eyebrow="Foundations"
            title="Get ready for the tracks."
            lede="Start free if you are new to DevOps and SRE. Add Kubernetes depth before the platform tracks."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {supporting.map((path) => (
              <TrackCard key={path.slug} path={path} availableCount={availableCourseCount(path, courses)} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading
          eyebrow="Specialisations"
          title="Security, cost and governance in depth."
          lede="Taught inside every track, and offered as focused specialisations as they are released."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specialisations.map((s) => (
            <div key={s.slug} className="card flex flex-col">
              <span className="chip-planned w-fit">In development</span>
              <h3 className="mt-6 font-display text-lg font-bold tracking-[-.02em]">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#565b68]">{s.description}</p>
              {s.courseSlugs?.map((slug) => {
                const course = courses.find((c) => c.slug === slug);
                return course ? (
                  <Link key={slug} to={`/courses/${slug}`} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#886A7A] hover:underline">
                    Available today: {course.title} <ArrowRight size={12} />
                  </Link>
                ) : null;
              })}
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-[#565b68]">
          Not sure where to start?{" "}
          <Link to="/roadmaps" className="font-bold text-[#131A2B] underline-offset-4 hover:underline">
            See the roadmap for your current role
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
