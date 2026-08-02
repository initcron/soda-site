import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Check, ChevronRight, ExternalLink } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getCourseBySlug } from "@/data/courses";
import { paths } from "@/data/paths";

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourseBySlug(slug) : undefined;

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const coursePath = paths.find((p) => p.courseSlugs.includes(course.slug));
  const isComingSoon = course.status === "coming-soon";

  return (
    <main className="bg-[#f7f7f2]">
      {/* Breadcrumb */}
      <section className="border-b border-[#13201e]/10">
        <div className="page-shell py-5 text-xs text-[#68756f]">
          <Link className="hover:text-[#13201e]" to="/">
            Home
          </Link>{" "}
          <ChevronRight className="inline" size={13} />{" "}
          <Link className="hover:text-[#13201e]" to="/courses">
            Courses
          </Link>{" "}
          <ChevronRight className="inline" size={13} /> {course.title}
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[#13201e]/10 bg-[#e5ebdc]">
        <div className="page-shell grid gap-10 py-16 lg:grid-cols-[1.35fr_.65fr] lg:py-24">
          <div>
            <p className="eyebrow">
              {course.level} · {course.duration}
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.94] tracking-[-.07em] sm:text-6xl">
              {course.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52615a]">
              {course.description}
            </p>
            {!isComingSoon && course.rating && (
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-[#13201e]/15 bg-[#f7f7f2] px-3 py-1.5">
                  {course.rating} / 5 rating
                </span>
                {course.students && (
                  <span className="rounded-full border border-[#13201e]/15 bg-[#f7f7f2] px-3 py-1.5">
                    {course.students} students
                  </span>
                )}
              </div>
            )}
          </div>
          <aside className="self-end rounded-2xl border border-[#13201e] bg-[#13201e] p-6 text-[#f7f7f2] shadow-[8px_8px_0_#d9ff5a]">
            {isComingSoon ? (
              <>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-[#b7c4ae]">
                  Coming soon
                </p>
                <p className="mt-4 font-display text-2xl font-extrabold tracking-[-.04em]">
                  Under development.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#bcc7ba]">
                  This course is being built. Check back soon or explore other
                  courses in the catalogue.
                </p>
                <Link
                  to="/courses"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]"
                >
                  Browse courses <ArrowRight size={15} />
                </Link>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-[#b7c4ae]">
                  Ready when you are
                </p>
                <p className="mt-4 font-display text-2xl font-extrabold tracking-[-.04em]">
                  Learn on Udemy.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#bcc7ba]">
                  Enrollment, pricing, and full curriculum are available on the
                  course page.
                </p>
                <a
                  href={course.udemyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d9ff5a] px-5 py-3 text-sm font-bold text-[#13201e]"
                >
                  Enroll on Udemy <ExternalLink size={15} />
                </a>
              </>
            )}
          </aside>
        </div>
      </section>

      {/* Audience fit + Outcomes */}
      <section className="page-shell grid gap-14 py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">The right fit</p>
          <h2 className="section-title mt-4">
            Make sure it matches
            <br />
            where you are.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#13201e]/15 bg-white p-6">
              <p className="font-display text-xl font-extrabold">
                This is for you if…
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#586760]">
                <li className="flex gap-2">
                  <Check
                    size={16}
                    className="mt-1 shrink-0 text-[#789200]"
                  />
                  You have some technical background and want hands-on practice.
                </li>
                <li className="flex gap-2">
                  <Check
                    size={16}
                    className="mt-1 shrink-0 text-[#789200]"
                  />
                  You want to build and operate real systems, not just study
                  theory.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#13201e]/15 p-6">
              <p className="font-display text-xl font-extrabold">
                Not the right fit if…
              </p>
              <p className="mt-5 text-sm leading-6 text-[#586760]">
                You are looking for a conceptual overview with no implementation
                work, or are completely new to programming.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="eyebrow">What you'll build</p>
          <div className="mt-7 space-y-4">
            {course.outcomes.map((outcome, i) => (
              <div
                key={outcome}
                className="flex gap-5 border-b border-[#13201e]/15 pb-5"
              >
                <span className="font-mono text-xs text-[#789200]">
                  0{i + 1}
                </span>
                <p className="font-display text-xl font-bold leading-6 tracking-[-.035em]">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="page-shell grid gap-12 py-20 lg:grid-cols-[1fr_.85fr]">
        <div>
          <p className="eyebrow">Course map</p>
          <h2 className="section-title mt-4">The syllabus highlights.</h2>
          <Accordion
            type="single"
            collapsible
            className="mt-8 border-t border-[#13201e]/15"
          >
            {course.curriculum.map((item, index) => (
              <AccordionItem key={item.title} value={item.title}>
                <AccordionTrigger className="font-display text-lg font-bold tracking-[-.025em] hover:no-underline">
                  <span>
                    <span className="mr-4 font-mono text-xs text-[#789200]">
                      0{index + 1}
                    </span>
                    {item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-[#586760]">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {coursePath && (
          <aside className="rounded-2xl bg-[#d9ff5a] p-7">
            <p className="eyebrow">What's next</p>
            <h3 className="mt-4 font-display text-3xl font-extrabold leading-none tracking-[-.05em]">
              Keep going with the {coursePath.title} path.
            </h3>
            <p className="mt-5 text-sm leading-6 text-[#43513a]">
              Turn this foundation into a complete, ordered route toward
              mastering {coursePath.title.toLowerCase()}.
            </p>
            <Link
              to={`/learning-paths/${coursePath.slug}`}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold"
            >
              View learning path <ArrowRight size={16} />
            </Link>
          </aside>
        )}
      </section>
    </main>
  );
}
