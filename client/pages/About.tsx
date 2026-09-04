import { ArrowRight, ArrowUpRight, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const clients = [
  { name: "Cisco", logo: "/images/clients/cisco.png" },
  { name: "Citrix", logo: "/images/clients/citrix.png" },
  { name: "Dell", logo: "/images/clients/dell.png" },
  { name: "HP", logo: "/images/clients/hp.png" },
  { name: "IBM", logo: "/images/clients/ibm.png" },
  { name: "Oracle", logo: "/images/clients/oracle.png" },
  { name: "VMware", logo: "/images/clients/vmware.png" },
];

export default function About() {
  return (
    <main className="bg-[#ffffff]">
      <section className="border-b border-[#506580]/10">
        <div className="page-shell py-5 text-xs text-[#6b6d75]">
          <Link className="hover:text-[#506580]" to="/">
            Home
          </Link>{" "}
          <ChevronRight className="inline" size={13} /> About
        </div>
      </section>

      <section className="border-b border-[#506580]/10 bg-[#ffffff]">
        <div className="page-shell py-16 lg:py-24">
          <p className="eyebrow">About</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[.94] tracking-[-.07em] sm:text-6xl">
            Built by a practitioner,
            <br />
            for practitioners.
          </h1>
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-[#506580]/15 bg-white">
              <img
                src="/images/instructor/gourav-shah.jpg"
                alt="Gourav J. Shah"
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="font-display text-2xl font-extrabold tracking-[-.05em]">
                  Gourav J. Shah
                </h2>
                <p className="mt-1 text-sm font-bold text-[#B07A64]">
                  Founder, School of DevOps
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="https://in.linkedin.com/in/gouravshah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[#506580]/15 px-3 py-1.5 text-[10px] font-bold transition hover:border-[#506580]"
                  >
                    LinkedIn <ArrowUpRight size={10} />
                  </a>
                  <a
                    href="https://runbooks.schoolofdevops.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[#506580]/15 px-3 py-1.5 text-[10px] font-bold transition hover:border-[#506580]"
                  >
                    Newsletter <ArrowUpRight size={10} />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <img
                src="/images/instructor/workshop-1.jpg"
                alt="Gourav Shah delivering a workshop"
                className="rounded-xl border border-[#506580]/10 object-cover"
              />
              <img
                src="/images/instructor/workshop-2.jpg"
                alt="Corporate training session"
                className="rounded-xl border border-[#506580]/10 object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-[-.04em]">
                Your instructor
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5e6068]">
                Learn directly from Gourav Shah, a DevOps trainer and corporate
                workshop leader who has helped thousands of IT professionals
                from the world's top organisations master DevOps skills. He has
                authored official DevOps courses for The Linux Foundation and
                delivered over 12,000 hours of hands-on workshops.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5e6068]">
                Gourav is on a mission to help a million DevOps professionals
                become AI Native with Agentic DevOps and MLOps. His courses on
                Udemy have reached over 300,000 learners worldwide, with a 4.7
                average rating across 15+ technical courses.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl font-extrabold tracking-[-.04em]">
                Background
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#5e6068]">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B07A64]" />
                  Corporate trainer with 12,000+ hours of workshops delivered
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B07A64]" />
                  Author of <em>Ansible Playbook Essentials</em> (Packt, 2015)
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B07A64]" />
                  Official course author for The Linux Foundation
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B07A64]" />
                  Certified Kubernetes Administrator (CKA)
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B07A64]" />
                  300,000+ learners across 160+ countries
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#506580]/15 bg-white p-6">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-[#B07A64]" />
                <h3 className="font-display text-lg font-extrabold tracking-[-.04em]">
                  Runbooks & Robots
                </h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#5e6068]">
                A newsletter on DevOps, AI infrastructure, and the systems that
                run modern engineering. Written by Gourav for practitioners who
                build and operate production systems.
              </p>
              <a
                href="https://runbooks.schoolofdevops.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#506580] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#506580]/90"
              >
                Subscribe to the newsletter <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#506580]/10 bg-[#506580] text-[#ffffff]">
        <div className="page-shell py-16">
          <p className="text-center font-mono text-xs text-[#D4A08A]">
            TRUSTED BY TEAMS AT
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-10 opacity-70">
            {clients.map((client) => (
              <img
                key={client.name}
                src={client.logo}
                alt={client.name}
                className="h-8 object-contain"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
