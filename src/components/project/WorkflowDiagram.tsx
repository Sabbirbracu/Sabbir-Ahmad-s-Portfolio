"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles, UserCheck } from "lucide-react";
import type { CaseStudyWorkflowStage } from "@/types/project";

/**
 * End-to-end lifecycle diagram for a case study: stages in order, split into a sourcing and a finance
 * track, each stage marked where AI helps and where a person approves. Driven entirely by data
 * (`caseStudy.workflow`), so it needs no images.
 */

const TRACKS = {
  sourcing: {
    label: "Sourcing",
    sub: "From tender notice to an approved quotation",
    accent: "hsl(160 62% 26%)",
    tint: "hsl(160 62% 26% / 0.06)",
  },
  finance: {
    label: "Finance",
    sub: "From comparison to customer invoice",
    accent: "hsl(42 88% 44%)",
    tint: "hsl(42 88% 50% / 0.08)",
  },
} as const;

type TrackKey = keyof typeof TRACKS;

const Badge = ({ kind }: { kind: "ai" | "human" }) =>
  kind === "ai" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(42_88%_50%/0.4)] bg-[hsl(42_88%_50%/0.1)] px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase font-bold text-[hsl(36_80%_28%)]">
      <Sparkles className="h-3 w-3" /> AI-assisted
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(160_62%_26%/0.3)] bg-[hsl(160_62%_26%/0.08)] px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase font-bold text-[hsl(160_62%_22%)]">
      <UserCheck className="h-3 w-3" /> Person approves
    </span>
  );

const WorkflowDiagram = ({ stages }: { stages: CaseStudyWorkflowStage[] }) => {
  const numbered = stages.map((s, i) => ({ ...s, n: i + 1, track: (s.track ?? "sourcing") as TrackKey }));
  const groups = (Object.keys(TRACKS) as TrackKey[])
    .map((key) => ({ key, items: numbered.filter((s) => s.track === key) }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      {/* Legend */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge kind="ai" />
        <Badge kind="human" />
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
          Every stage links to the one before it
        </span>
      </div>

      <div className="space-y-6">
        {groups.map((group, gi) => {
          const track = TRACKS[group.key];
          return (
            <div key={group.key}>
              {gi > 0 && (
                <div className="mb-6 flex items-center gap-4 text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase">
                    <ArrowDown className="h-3.5 w-3.5" /> Hands over to {track.label.toLowerCase()}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
              )}

              <div className="rounded-2xl border border-border p-4 sm:p-6" style={{ background: track.tint }}>
                <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-heading text-xl font-extrabold tracking-tight" style={{ color: track.accent }}>
                    {track.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{track.sub}</p>
                </div>

                <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {group.items.map((s, i) => (
                    <motion.li
                      key={s.n}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="relative flex flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                      style={{ borderTop: `3px solid ${track.accent}` }}
                    >
                      <span
                        className="mb-3 inline-flex h-8 w-8 items-center justify-center font-mono text-sm font-bold text-white"
                        style={{ background: track.accent }}
                      >
                        {s.n}
                      </span>
                      <h4 className="font-heading text-base font-bold leading-snug text-foreground">{s.title}</h4>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                      {(s.ai || s.human) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {s.ai && <Badge kind="ai" />}
                          {s.human && <Badge kind="human" />}
                        </div>
                      )}
                      {i < group.items.length - 1 && (
                        <ArrowRight
                          className="absolute -right-[13px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-white p-0.5 text-muted-foreground lg:block"
                          aria-hidden
                        />
                      )}
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowDiagram;
