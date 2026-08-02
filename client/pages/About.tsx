import { ArrowRight, ArrowUpRight, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="bg-[#f7f7f2]">
      <section className="border-b border-[#13201e]/10">
        <div className="page-shell py-5 text-xs text-[#68756f]">
          <Link className="hover:text-[#13201e]" to="/">
            Home
          </Link>{" "}
          <ChevronRight className="inline" size={13} /> About
        </div>
      </section>

      <section className="border-b border-[#13201e]/10 bg-[#e5ebdc]">
        <div className="page-shell py-16 lg:py-24">
          <p className="eyebrow">About SODA</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[.94] tracking-[-.07em] sm:text-6xl">
            Built by a practitioner,
            <br />
            for practitioners.
          </h1>
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <div className="overflow-hidden rounded-2xl border border-[#13201e]/15 bg-white p-6">
              <div className="flex h-40 items-center justify-center rounded-xl bg-[#13201e] text-[#d9ff5a]">
                <span className="font-display text-6xl font-extrabold">GS</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-extrabold tracking-[-.05em]">
                Gourav J. Shah
              </h2>
              <p className="mt-1 text-sm font-bold text-[#6d8700]">
                Founder, School of DevOps & AI
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://in.linkedin.com/in/gouravshah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-[#13201e]/15 px-3 py-1.5 text-[10px] font-bold transition hover:border-[#13201e]"
                >
                  LinkedIn <ArrowUpRight size={10} />
                </a>
                <a
                  href="https://runbooks.schoolofdevops.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-[#13201e]/15 px-3 py-1.5 text-[10px] font-bold transition hover:border-[#13201e]"
                >
                  Newsletter <ArrowUpRight size={10} />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-[-.04em]">
                The story
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#52615a]">
                Gourav J. Shah is a DevOps practitioner, trainer, and author
                based in Bengaluru, India. With over two decades in IT
                operations, cloud computing, and infrastructure automation, he
                founded the School of DevOps to bridge the gap between theory
                and production-grade practice.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#52615a]">
                His courses on Udemy have reached over 300,000 learners
                worldwide, with a 4.7 average rating across 15+ technical
                courses. He is a Certified Kubernetes Administrator and has
                served as a course maintainer and developer for The Linux
                Foundation.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl font-extrabold tracking-[-.04em]">
                Background
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#52615a]">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6d8700]" />
                  Author of <em>Ansible Playbook Essentials</em> (Packt, 2015)
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6d8700]" />
                  Course maintainer and developer for The Linux Foundation
                  (2022–2024)
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6d8700]" />
                  Certified Kubernetes Administrator (CKA)
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6d8700]" />
                  Certified MLOps Engineer
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6d8700]" />
                  Expertise in DevOps, Kubernetes, MLOps, and Agentic AI
                  infrastructure
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#13201e]/15 bg-white p-6">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-[#6d8700]" />
                <h3 className="font-display text-lg font-extrabold tracking-[-.04em]">
                  Runbooks & Robots
                </h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#52615a]">
                A newsletter on DevOps, AI infrastructure, and the systems that
                run modern engineering. Written by Gourav for practitioners who
                build and operate production systems.
              </p>
              <a
                href="https://runbooks.schoolofdevops.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#13201e] px-5 py-2.5 text-xs font-bold text-[#d9ff5a] transition hover:bg-[#13201e]/90"
              >
                Subscribe to the newsletter <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
