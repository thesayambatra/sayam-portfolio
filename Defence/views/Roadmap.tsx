"use client";
import { useState, useMemo } from "react";
import { CheckCircle, Circle, ChevronDown, ChevronRight, Map, Zap, Clock, Target, Flag } from "lucide-react";
import { roadmapDays } from "@/lib/data/roadmap";
import { useProgress } from "@/lib/store/progressStore";
import { SectionHeading } from "@/components/ui";

const PHASE_COLORS: Record<number, { color: string; bg: string; label: string }> = {
  1: { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  label: "Foundation" },
  2: { color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  label: "Concept Building" },
  3: { color: "#facc15", bg: "rgba(250,204,21,0.1)",  label: "Intermediate Practice" },
  4: { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  label: "Advanced Practice" },
  5: { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", label: "Revision & Mocks" },
  6: { color: "#f472b6", bg: "rgba(244,114,182,0.1)", label: "Final Sprint" },
};

export default function Roadmap() {
  const { roadmapCompleted, completeRoadmapDay, uncompleteRoadmapDay, targetDate, exam } = useProgress();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [filterPhase, setFilterPhase] = useState<number | "all">("all");
  const [view, setView] = useState<"dynamic" | "full">("dynamic");

  // Days left to exam
  const daysLeft = Math.max(0, Math.ceil((new Date(targetDate).getTime() - Date.now()) / 86400000));
  const todayDayNum = Math.min(roadmapCompleted.length + 1, roadmapDays.length);

  // Dynamic plan: scale 180-day plan to daysLeft
  const dynamicDays = useMemo(() => {
    if (daysLeft >= 180) return roadmapDays;
    if (daysLeft <= 0) return [];
    // Map each day proportionally
    const ratio = roadmapDays.length / Math.max(daysLeft, 1);
    const seen = new Set<number>();
    const result = [];
    for (let i = 0; i < daysLeft; i++) {
      const srcIdx = Math.min(Math.floor(i * ratio), roadmapDays.length - 1);
      if (!seen.has(srcIdx)) {
        seen.add(srcIdx);
        result.push({ ...roadmapDays[srcIdx], day: i + 1 });
      }
    }
    return result;
  }, [daysLeft]);

  const displayDays = view === "dynamic" ? dynamicDays : roadmapDays;
  const phases = [...new Set(displayDays.map((d) => d.phase))];
  const filteredDays = filterPhase === "all" ? displayDays : displayDays.filter((d) => d.phase === filterPhase);

  const completedCount = roadmapCompleted.length;
  const totalCount = displayDays.length;
  const pctDone = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading
        title="Your Roadmap"
        sub={view === "dynamic"
          ? `${daysLeft} days to exam · Personalised ${daysLeft}-day plan`
          : "Full 180-day structured plan"}
        right={
          <div className="flex gap-2">
            <button onClick={() => setView("dynamic")} className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
              style={{ background: view === "dynamic" ? "#4ade80" : "rgba(255,255,255,0.05)", color: view === "dynamic" ? "#0a1a0e" : "rgba(255,255,255,0.5)" }}>
              {daysLeft}d Plan
            </button>
            <button onClick={() => setView("full")} className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
              style={{ background: view === "full" ? "#4ade80" : "rgba(255,255,255,0.05)", color: view === "full" ? "#0a1a0e" : "rgba(255,255,255,0.5)" }}>
              Full 180d
            </button>
          </div>
        }
      />

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Flag,   label: "Days Left",    value: daysLeft,         color: "#4ade80" },
          { icon: Clock,  label: "Today",        value: `Day ${todayDayNum}`, color: "#60a5fa" },
          { icon: Target, label: "Completed",    value: `${completedCount}/${totalCount}`, color: "#a78bfa" },
          { icon: Zap,    label: "Progress",     value: `${pctDone}%`,    color: "#facc15" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3 flex items-center gap-3" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18` }}>
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
              <div className="text-base font-black text-white">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span>Overall Roadmap Progress</span><span style={{ color: "#4ade80" }}>{pctDone}%</span>
        </div>
        <div className="rounded-full overflow-hidden h-2.5" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pctDone}%`, background: "linear-gradient(to right,#4ade80,#22d3ee)" }} />
        </div>
      </div>

      {/* Phase filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilterPhase("all")} className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
          style={{ background: filterPhase === "all" ? "#4ade80" : "rgba(255,255,255,0.05)", color: filterPhase === "all" ? "#0a1a0e" : "rgba(255,255,255,0.5)" }}>
          All Phases
        </button>
        {phases.map((p) => {
          const pc = PHASE_COLORS[p] || PHASE_COLORS[1];
          return (
            <button key={p} onClick={() => setFilterPhase(p)} className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
              style={{ background: filterPhase === p ? pc.color : "rgba(255,255,255,0.05)", color: filterPhase === p ? "#0a1a0e" : "rgba(255,255,255,0.5)" }}>
              Phase {p}: {pc.label}
            </button>
          );
        })}
      </div>

      {/* Day cards */}
      <div className="space-y-2">
        {filteredDays.map((day) => {
          const isDone = roadmapCompleted.includes(day.day);
          const isToday = day.day === todayDayNum;
          const isExpanded = expandedDay === day.day;
          const pc = PHASE_COLORS[day.phase] || PHASE_COLORS[1];

          return (
            <div key={day.day}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                background: isToday ? "rgba(74,222,128,0.07)" : "#0d1424",
                border: isToday ? "1px solid rgba(74,222,128,0.4)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Header row */}
              <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpandedDay(isExpanded ? null : day.day)}>
                {/* Complete toggle */}
                <button
                  onClick={(e) => { e.stopPropagation(); isDone ? uncompleteRoadmapDay(day.day) : completeRoadmapDay(day.day); }}
                  className="flex-shrink-0"
                >
                  {isDone
                    ? <CheckCircle size={20} style={{ color: "#4ade80" }} />
                    : <Circle size={20} style={{ color: "rgba(255,255,255,0.2)" }} />
                  }
                </button>

                {/* Day badge */}
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.color}40` }}>
                  {day.day}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold" style={{ color: pc.color }}>Phase {day.phase}</span>
                    {isToday && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#4ade80", color: "#0a1a0e" }}>TODAY</span>}
                    {isDone && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>✓ Done</span>}
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: day.exam === "CDS" ? "rgba(96,165,250,0.1)" : day.exam === "AFCAT" ? "rgba(250,204,21,0.1)" : "rgba(255,255,255,0.05)", color: day.exam === "CDS" ? "#60a5fa" : day.exam === "AFCAT" ? "#facc15" : "rgba(255,255,255,0.5)" }}>{day.exam}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {day.topics.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{t}{i < Math.min(day.topics.length, 3) - 1 ? " ·" : ""}</span>
                    ))}
                    {day.topics.length > 3 && <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>+{day.topics.length - 3} more</span>}
                  </div>
                </div>

                {/* Meta */}
                <div className="hidden md:flex items-center gap-3 text-xs flex-shrink-0" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span>⏱ {day.studyHours}h</span>
                  <span>❓ {day.practiceQuestions}q</span>
                </div>

                {isExpanded ? <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} /> : <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />}
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="text-xs font-semibold mb-2" style={{ color: "#4ade80" }}>📚 Topics to Cover</div>
                      <ul className="space-y-1">
                        {day.topics.map((t, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                            <span style={{ color: pc.color }}>▹</span> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="text-xs font-semibold mb-2" style={{ color: "#60a5fa" }}>🎯 Objectives</div>
                      <ul className="space-y-1">
                        {day.objectives.map((o, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                            <span style={{ color: "#60a5fa" }}>✓</span> {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span className="rounded-lg px-3 py-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>⏱ Study: {day.studyHours} hours</span>
                    <span className="rounded-lg px-3 py-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>❓ Practice: {day.practiceQuestions} questions</span>
                    <span className="rounded-lg px-3 py-1.5 flex-1" style={{ background: "rgba(255,255,255,0.04)" }}>📝 Revise: {day.revisionTask}</span>
                  </div>
                  <button
                    onClick={() => isDone ? uncompleteRoadmapDay(day.day) : completeRoadmapDay(day.day)}
                    className="w-full py-2 rounded-lg text-xs font-semibold transition-all"
                    style={{ background: isDone ? "rgba(239,68,68,0.1)" : "#4ade80", color: isDone ? "#ef4444" : "#0a1a0e", border: isDone ? "1px solid rgba(239,68,68,0.3)" : "none" }}
                  >
                    {isDone ? "Mark as Incomplete" : "✓ Mark Day Complete"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
