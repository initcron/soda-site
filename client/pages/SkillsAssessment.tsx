import { ArrowRight, ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  answerLabels,
  areas,
  goals,
  questions,
  scoreAssessment,
  type GoalId,
} from "@/data/assessment";
import { links } from "@/data/links";
import { getPathBySlug } from "@/data/paths";

export default function SkillsAssessment() {
  const [goal, setGoal] = useState<GoalId>(goals[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = questions.filter((q) => answers[q.id] !== undefined).length;
  const result = scoreAssessment(answers, goal);
  const recommended = getPathBySlug(result.recommendedPathSlug)!;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell pt-5 text-xs text-[#8a90a0]">
          <Link className="hover:text-white" to="/">Home</Link>{" "}
          <ChevronRight className="inline" size={13} />{" "}
          <Link className="hover:text-white" to="/resources">Resources</Link>{" "}
          <ChevronRight className="inline" size={13} /> Skills self-assessment
        </div>
        <div className="page-shell py-14 lg:py-16">
          <p className="eyebrow-dark">Free tool · 5 minutes</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-.035em] sm:text-5xl">
            Production AI engineering skills self-assessment
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#c9ccd6]">
            Twenty questions about work you have actually done. You get a score in five areas and the path we would start you on. Nothing is stored or sent anywhere.
          </p>
        </div>
      </section>

      {submitted ? (
        <section className="page-shell py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Where to start</p>
              <h2 className="section-title mt-3">{recommended.title}</h2>
              <p className="lede mt-4">{result.reason}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/learning-paths/${recommended.slug}`} className="button-primary">
                  View {recommended.shortTitle} <ArrowRight size={16} />
                </Link>
                <button onClick={reset} className="button-ghost">
                  <RotateCcw size={15} /> Start again
                </button>
              </div>
              <p className="mt-8 text-sm leading-6 text-[#565b68]">
                Want the builds behind each area?{" "}
                <a href={links.newsletter} target="_blank" rel="noopener noreferrer" className="font-bold text-[#131A2B] underline-offset-4 hover:underline">
                  Subscribe to Runbooks & Robots
                </a>
                .
              </p>
            </div>
            <div className="card p-7">
              <p className="eyebrow">Your scores</p>
              <ul className="mt-6 space-y-6">
                {areas.map((area) => {
                  const s = result.areas[area.id];
                  return (
                    <li key={area.id}>
                      <div className="flex items-baseline justify-between gap-4 text-sm">
                        <Link to={`/learning-paths/${area.pathSlug}`} className="font-bold underline-offset-4 hover:underline">
                          {area.title}
                        </Link>
                        <span className="font-mono text-xs text-[#565b68]">{s.percent}%</span>
                      </div>
                      <div
                        className="mt-2 h-2 overflow-hidden rounded-full bg-[#131A2B]/10"
                        role="progressbar"
                        aria-valuenow={s.percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={area.title}
                      >
                        <div className="h-full rounded-full bg-[#886A7A]" style={{ width: `${s.percent}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-xs leading-5 text-[#565b68]">
                100% means you have run everything in that area in production. Below 50% we treat it as a gap.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="page-shell py-16">
          <fieldset>
            <legend className="font-display text-2xl font-bold tracking-[-.02em]">
              What do you want to be able to do?
            </legend>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {goals.map((g) => (
                <label
                  key={g.id}
                  className={`cursor-pointer rounded-xl border p-5 text-sm font-semibold transition ${
                    goal === g.id ? "border-[#131A2B] bg-[#131A2B] text-white" : "border-[#131A2B]/15 hover:border-[#131A2B]/60"
                  }`}
                >
                  <input type="radio" name="goal" value={g.id} checked={goal === g.id} onChange={() => setGoal(g.id)} className="sr-only" />
                  {g.label}
                </label>
              ))}
            </div>
          </fieldset>

          {areas.map((area) => (
            <div key={area.id} className="mt-14">
              <h2 className="font-display text-2xl font-bold tracking-[-.02em]">{area.title}</h2>
              <div className="mt-5 space-y-3">
                {questions
                  .filter((q) => q.area === area.id)
                  .map((q) => (
                    <fieldset key={q.id} className="card grid items-center gap-4 py-4 lg:grid-cols-[1fr_auto]">
                      <legend className="sr-only">{q.text}</legend>
                      <p className="text-sm font-semibold" aria-hidden="true">{q.text}</p>
                      <div className="flex flex-wrap gap-2">
                        {answerLabels.map((label, value) => (
                          <label
                            key={label}
                            className={`cursor-pointer rounded-md border px-3 py-1.5 text-xs font-bold transition ${
                              answers[q.id] === value
                                ? "border-[#131A2B] bg-[#131A2B] text-white"
                                : "border-[#131A2B]/15 text-[#565b68] hover:border-[#131A2B]/60"
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={value}
                              checked={answers[q.id] === value}
                              onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
                              className="sr-only"
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}
              </div>
            </div>
          ))}

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <button
              onClick={() => {
                setSubmitted(true);
                window.scrollTo({ top: 0 });
              }}
              disabled={answered === 0}
              className="button-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              See my result <ArrowRight size={16} />
            </button>
            <span className="text-sm text-[#565b68]">
              {answered} of {questions.length} answered. Unanswered questions count as “never done it”.
            </span>
          </div>
        </section>
      )}
    </main>
  );
}
