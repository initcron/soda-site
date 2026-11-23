import { Link } from "react-router-dom";
import { links } from "@/data/links";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#131A2B]/10 pt-10">
      <h2 className="font-display text-2xl font-bold tracking-[-.025em]">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-[#3b4150]">{children}</div>
    </section>
  );
}

export default function Legal() {
  return (
    <main>
      <section className="dark-band border-t border-white/10">
        <div className="page-shell py-16 lg:py-20">
          <p className="eyebrow-dark">Privacy and disclosure</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">
            What this site does, and who runs it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9ccd6]">
            A plain account of how schoolofdevops.com works today. Last updated 23 November 2026.
          </p>
        </div>
      </section>

      <div className="page-shell py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <Section title="Who runs this site">
            <p>
              School of DevOps is run by Initcron Systems Pvt Ltd, Kudlu Gate, Bangalore, India.
            </p>
            <p>
              For any question about this site, your data or a course, write to{" "}
              <a href={links.contactMailto} className="font-bold text-[#131A2B] underline underline-offset-4">
                {links.contactEmail}
              </a>
              .
            </p>
          </Section>

          <Section title="Course links go to Udemy">
            <p>
              We are the authors of the courses listed here. Today they are sold on Udemy, and the enrol buttons on this site are our instructor links to those courses.
            </p>
            <p>
              When you enrol through one of these links, Udemy pays us a larger share of the sale than when you find the same course another way. You pay the same price either way. Udemy sets that price and handles your payment and your account under its own terms and privacy policy.
            </p>
          </Section>

          <Section title="What this site collects">
            <p>
              This site has no accounts, no sign-up forms and no checkout. We do not set cookies, and we do not run analytics or advertising trackers on it.
            </p>
            <p>
              The{" "}
              <Link to="/resources/skills-assessment" className="font-bold text-[#131A2B] underline underline-offset-4">
                skills self-assessment
              </Link>{" "}
              runs entirely in your browser. Your answers are not sent to us or stored.
            </p>
          </Section>

          <Section title="Services this site relies on">
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <span className="font-bold text-[#131A2B]">Hosting.</span> The site is hosted on GitHub Pages. Like any web host, GitHub receives your IP address when you load a page and may keep it in server logs.
              </li>
              <li>
                <span className="font-bold text-[#131A2B]">Fonts.</span> Fonts are loaded from Google Fonts, so Google receives your IP address when a page loads.
              </li>
              <li>
                <span className="font-bold text-[#131A2B]">Newsletter.</span> Runbooks & Robots is published on Substack. If you subscribe, Substack holds your email address under its own privacy policy, and you can unsubscribe from any issue.
              </li>
              <li>
                <span className="font-bold text-[#131A2B]">Other links.</span> Links to YouTube, LinkedIn and our previous course site take you to services with their own policies.
              </li>
            </ul>
          </Section>

          <Section title="What will change">
            <p>
              We plan to sell and host courses ourselves, through the LearnForge app. Before we take any payment, this page will be replaced with full terms of sale, a refund policy and a privacy policy that cover those services.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
