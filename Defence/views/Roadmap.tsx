"use client";
import { useState } from "react";
import { CheckCircle, Circle, ChevronDown, ChevronRight, Flag, Zap } from "lucide-react";
import { roadmapDays } from "@/lib/data/roadmap";
import { useProgress } from "@/lib/store/progressStore";
import { ProgressBar, SectionHeading } from "@/components/ui";
import { pct } from "@/lib/utils";

const PHASES = [
  { n: 1, name: "Foundation", range: "Days 1–30", color: "#e3a92e" },
  { n: 2, name: "Concept Building", range: "Days 31–60", color: "#22c55e" },
  { n: 3, name: "Intermediate Practice", range: "Days 61–90", color: "#06b6d4" },
  { n: 4, name: "Advanced Preparation", range: "Days 91–120", color: "#8b5cf6" },
  { n: 5, name: "Revision & Mock Tests", range: "Days 121–150", color: "#f97316" },
  { n: 6, name: "Final Revision", range: "Days 151–180", color: "#ef4444" },
];

export default function Roadmap() {
  const { roadmapCompleted, completeRoadmapDay, uncompleteRoadmapDay } = useProgress();
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [examFilter, setExamFilter] = useState<"All" | "CDS" | "AFCAT">("All");

  const totalCompleted = roadmapCompleted.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading
        title="180-Day Preparation Roadmap"
        sub="Your complete mission plan from zero to exam day. Mark each day complete to track progress."
        right={
          <div className="text-right">
            <div className="text-2xl font-bold text-gold-400">{pct(totalCompleted, 180)}%</div>
            <div className="text-xs text-white/50">{totalCompleted}/180 days</div>
          </div>
        }
      />

      {/* Overall bar */}
      <div className="card py-4">
        <div className="flex justify-between text-xs text-white/60 mb-2">
          <span>Mission Progress</span>
          <span>{totalCompleted}/180 days completed</span>
        </div>
        <ProgressBar value={pct(totalCompleted, 180)} />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["All", "CDS", "AFCAT"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setExamFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              examFilter === f ? "bg-gold-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Phase cards */}
      <div className="space-y-4">
        {PHASES.map((phase) => {
          const phaseDays = roadmapDays.filter(
            (d) => d.phase === phase.n && (examFilter === "All" || d.exam === examFilter || d.exam === "Both")
          );
          const phaseDone = phaseDays.filter((d) => roadmapCompleted.includes(d.day)).length;
          const isExpanded = expandedPhase === phase.n;

          return (
            <div key={phase.n} className="card border border-white/5 overflow-hidden">
              <button
                className="w-full flex items-center gap-4 text-left"
                onClick={() => setExpandedPhase(isExpanded ? null : phase.n)}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: `${phase.color}20`, color: phase.color }}>
                  P{phase.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white">Phase {phase.n}: {phase.name}</div>
                  <div className="text-xs text-white/50">{phase.range}</div>
                </div>
                <div className="w-28 text-right mr-3">
                  <ProgressBar value={pct(phaseDone, phaseDays.length)} color={phase.color} height={5} />
                  <div className="text-xs text-white/50 mt-1">{phaseDone}/{phaseDays.length} days</div>
                </div>
                {isExpanded ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
              </button>

              {isExpanded && (
                <div className="mt-4 border-t border-white/5 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phaseDays.map((day) => {
                      const done = roadmapCompleted.includes(day.day);
                      const isDay = expandedDay === day.day;
                      return (
                        <div key={day.day} className="rounded-lg bg-navy-900/50 overflow-hidden">
                          <div
                            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-navy-900 transition-colors"
                            onClick={() => setExpandedDay(isDay ? null : day.day)}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                done ? uncompleteRoadmapDay(day.day) : completeRoadmapDay(day.day);
                              }}
                              className={done ? "text-green-400" : "text-white/30 hover:text-white/60"}
                            >
                              {done ? <CheckCircle size={16} /> : <Circle size={16} />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white/80">Day {day.day}</div>
                              <div className="text-xs text-white/40 truncate">{day.topics.join(" · ")}</div>
                            </div>
                            <div className={`badge ${day.exam === "CDS" ? "badge-blue" : day.exam === "AFCAT" ? "badge-gold" : "badge-green"} text-[10px]`}>
                              {day.exam === "Both" ? "Both" : day.exam}
                            </div>
                            {isDay ? <ChevronDown size={12} className="text-white/30" /> : <ChevronRight size={12} className="text-white/30" />}
                          </div>
                          {isDay && (
                            <div className="px-4 pb-3 space-y-2 text-xs">
                              <div className="flex gap-2">
                                <span className="text-gold-400 font-semibold">⏱ {day.studyHours}h study</span>
                                <span className="text-blue-400 font-semibold">📝 {day.practiceQuestions} questions</span>
                              </div>
                              <div>
                                <div className="text-white/50 mb-1 uppercase tracking-wide">Objectives:</div>
                                <ul className="space-y-0.5">
                                  {day.objectives.map((obj, i) => (
                                    <li key={i} className="flex items-center gap-1.5 text-white/60">
                                      <Zap size={10} className="text-gold-400" /> {obj}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="text-white/50">📌 Revision: {day.revisionTask}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
