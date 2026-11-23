import { describe, expect, it } from "vitest";
import { areas, goals, MAX_ANSWER, questions, scoreAssessment, type AreaId } from "./assessment";
import { getPathBySlug } from "./paths";

function answersFor(levels: Partial<Record<AreaId, number>>) {
  return Object.fromEntries(questions.map((q) => [q.id, levels[q.area] ?? 0]));
}

describe("assessment data", () => {
  it("has unique question ids and at least three questions per area", () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
    areas.forEach((area) => {
      expect(questions.filter((q) => q.area === area.id).length).toBeGreaterThanOrEqual(3);
    });
  });

  it("every goal points at a real path", () => {
    goals.forEach((g) => expect(getPathBySlug(g.pathSlug)).toBeDefined());
  });
});

describe("scoreAssessment", () => {
  it("scores each area as a percentage of its maximum", () => {
    const result = scoreAssessment(answersFor({ foundations: MAX_ANSWER, kubernetes: 0 }), "agentic-devops");
    expect(result.areas.foundations.percent).toBe(100);
    expect(result.areas.kubernetes.percent).toBe(0);
  });

  it("treats unanswered questions as zero", () => {
    const result = scoreAssessment({}, "agentic-devops");
    areas.forEach((a) => expect(result.areas[a.id].percent).toBe(0));
  });

  it("ignores answers outside the valid range", () => {
    const first = questions.find((q) => q.area === "foundations")!;
    const result = scoreAssessment({ [first.id]: 99 }, "agentic-devops");
    expect(result.areas.foundations.score).toBe(MAX_ANSWER);
  });

  it("sends people without the basics to the free path, whatever their goal", () => {
    goals.forEach((g) => {
      expect(scoreAssessment({}, g.id).recommendedPathSlug).toBe("sre-foundations");
    });
  });

  it("recommends Kubernetes depth before the platform tracks when it is missing", () => {
    const answers = answersFor({ foundations: MAX_ANSWER, kubernetes: 1 });
    expect(scoreAssessment(answers, "ai-platform-engineering").recommendedPathSlug).toBe(
      "kubernetes-platform-engineering",
    );
    expect(scoreAssessment(answers, "agenticops-kubernetes").recommendedPathSlug).toBe(
      "kubernetes-platform-engineering",
    );
  });

  it("does not require Kubernetes depth for Agentic DevOps", () => {
    const answers = answersFor({ foundations: MAX_ANSWER, kubernetes: 0 });
    expect(scoreAssessment(answers, "agentic-devops").recommendedPathSlug).toBe("agentic-devops");
  });

  it("recommends the goal track once the prerequisites are met", () => {
    const answers = answersFor({ foundations: MAX_ANSWER, kubernetes: MAX_ANSWER });
    goals.forEach((g) => {
      expect(scoreAssessment(answers, g.id).recommendedPathSlug).toBe(g.pathSlug);
    });
  });

  it("explains the recommendation", () => {
    expect(scoreAssessment({}, "agentic-devops").reason.length).toBeGreaterThan(0);
  });
});
