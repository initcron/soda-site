import { Link } from "react-router-dom";

/** The signature diagram: workload, worker, bridge, floor. Needs a dark background. */
export function SystemMap() {
  return (
    <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5 sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a90a0]">
        The map we teach from
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/learning-paths/ai-platform-engineering" className="rounded-lg border border-white/20 p-4 transition hover:border-[#D9BFCB]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#D9BFCB]">AI is the workload</p>
          <p className="mt-2 font-display text-base font-bold leading-snug">AI Platform Engineering</p>
          <p className="mt-2 text-xs leading-5 text-[#aab0bf]">GPUs, scheduling, inference, gateways, cost</p>
        </Link>
        <Link to="/learning-paths/agentic-devops" className="rounded-lg border border-white/20 p-4 transition hover:border-[#D9BFCB]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#D9BFCB]">AI is the worker</p>
          <p className="mt-2 font-display text-base font-bold leading-snug">Agentic DevOps</p>
          <p className="mt-2 text-xs leading-5 text-[#aab0bf]">Agents in IaC, pipelines, reviews, incidents</p>
        </Link>
      </div>
      <Link to="/learning-paths/agenticops-kubernetes" className="mt-3 block rounded-lg border border-[#D9BFCB]/50 bg-[#D9BFCB]/[0.07] p-4 text-center transition hover:border-[#D9BFCB]">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#D9BFCB]">The bridge</p>
        <p className="mt-1 font-display text-base font-bold">AgenticOps: agents in production</p>
        <p className="mt-1 text-xs text-[#aab0bf]">A workload you host and a worker you trust</p>
      </Link>
      <div className="mt-3 rounded-lg bg-white/10 p-4 text-center">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#D9BFCB]">The floor</p>
        <p className="mt-1 text-xs leading-5 text-[#e6e8ee]">
          Security · Guardrails · Governance · Evaluation · Cost
        </p>
      </div>
    </div>
  );
}
