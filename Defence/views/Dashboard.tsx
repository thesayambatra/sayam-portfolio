"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight, Flame, Calendar, FileText, BookOpen,
  Newspaper, CheckSquare, Square, Tv2, Award, Zap,
  Target, Clock, TrendingUp, Map, Gamepad2, ChevronRight,
} from "lucide-react";
import { useProgress } from "@/lib/store/progressStore";
import { cdsSyllabus, afcatSyllabus } from "@/lib/data/syllabus";
import { roadmapDays } from "@/lib/data/roadmap";
import { mockTests } from "@/lib/data/mockTests";
import { pct } from "@/lib/utils";

// ── Countdown ──────────────────────────────────────────────────
function useCountdown(dateStr: string) {
  const [diff, setDiff] = useState(new Date(dateStr).getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(new Date(dateStr).getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [dateStr]);
  return {
    days:  Math.max(0, Math.floor(diff / 86400000)),
    hours: Math.max(0, Math.floor((diff % 86400000) / 3600000)),
    mins:  Math.max(0, Math.floor((diff % 3600000) / 60000)),
    secs:  Math.max(0, Math.floor((diff % 60000) / 1000)),
  };
}

// ── Exam cards ─────────────────────────────────────────────────
const EXAM_CARDS = [
  { id: "afcat", label: "AFCAT", sub: "Air Force Common\nAdmission Test", color: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.2)", emoji: "✈️" },
  { id: "cds",   label: "CDS",   sub: "Combined\nDefence Services",       color: "#facc15", bg: "rgba(250,204,21,0.08)", border: "rgba(250,204,21,0.2)", emoji: "⚔️" },
];

// ── Quick access ───────────────────────────────────────────────
const QUICK_ACCESS = [
  { id: "currentaffairs", label: "Live Classes",         icon: Tv2,       live: true  },
  { id: "mocktests",      label: "Mock Tests",           icon: FileText,  live: false },
  { id: "pyq",            label: "Previous Year Papers", icon: BookOpen,  live: false },
  { id: "resources",      label: "Study Materials",      icon: FileText,  live: false },
  { id: "ssb",            label: "SSB Guidance",         icon: Award,     live: false },
  { id: "currentaffairs", label: "Current Affairs",      icon: Newspaper, live: false },
];

export default function Dashboard({ onNavigate }: { onNavigate: (id: string) => void }) {
  const {
    name, exam, targetDate,
    streakDays, topicsCompleted, roadmapCompleted,
    testResults, totalStudyHours, updateStreak,
  } = useProgress();

  useEffect(() => { updateStreak(); }, []);

  // ── Computed stats ─────────────────────────────────────────
  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("defenceprep-user") || "{}") : {};
  const displayName = user.name || name;

  const allTopics   = [...cdsSyllabus, ...afcatSyllabus].flatMap((s) => s.topics);
  const overallPct  = allTopics.length ? Math.round((topicsCompleted.length / allTopics.length) * 100) : 0;

  // Per-subject completion
  const subjects = [...cdsSyllabus, ...afcatSyllabus].map((sub) => {
    const done = sub.topics.filter((t) => topicsCompleted.includes(t.id)).length;
    return { label: sub.subject, pct: sub.topics.length ? Math.round((done / sub.topics.length) * 100) : 0 };
  });

  // Days left
  const daysLeft = Math.max(0, Math.ceil((new Date(targetDate).getTime() - Date.now()) / 86400000));

  // Roadmap: today's day index
  const todayDayNum   = Math.min(roadmapCompleted.length + 1, roadmapDays.length);
  const todayRoadmap  = roadmapDays.find((d) => d.day === todayDayNum);

  // Avg test score
  const avgScore = testResults.length
    ? Math.round(testResults.reduce((s, t) => s + pct(t.score, t.total), 0) / testResults.length)
    : 0;

  // Countdown
  const { days, hours, mins, secs } = useCountdown(targetDate);

  // Auto missions from roadmap
  const autoMissions = todayRoadmap
    ? [
        ...todayRoadmap.topics.map((t) => `Study: ${t}`),
        `Solve ${todayRoadmap.practiceQuestions} practice questions`,
        `Revise: ${todayRoadmap.revisionTask}`,
      ]
    : ["Mark topics complete in Syllabus", "Take a Mock Test", "Read today's Current Affairs"];

  const [doneMissions, setDoneMissions] = useState<number[]>([]);
  const toggleMission = (i: number) =>
    setDoneMissions((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  return (
    <div className="flex gap-5 animate-fade-in">

      {/* ── MAIN ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Welcome + Hero */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(120deg,#0a1a0e 0%,#0d1f15 40%,#111827 100%)", border: "1px solid rgba(74,222,128,0.15)", minHeight: 190 }}
        >
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 70% 50%,rgba(74,222,128,0.3) 0%,transparent 60%)" }} />
          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              {["AFCAT", "CDS"].map((e, i) => (
                <span key={e} className="flex items-center gap-2">
                  {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>}
                  <span className="text-sm font-bold" style={{ color: "#4ade80" }}>{e}</span>
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1 text-white">
              Welcome back, <span style={{ color: "#4ade80" }}>{displayName}</span> 🎖
            </h1>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Day <strong style={{ color: "#4ade80" }}>{todayDayNum}</strong> of your mission · <strong style={{ color: "#facc15" }}>{daysLeft}</strong> days left to exam
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => onNavigate("syllabus")} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold" style={{ background: "#4ade80", color: "#0a1a0e" }}>
                Continue Studying <ArrowRight size={15} />
              </button>
              <button onClick={() => onNavigate("mocktests")} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
                Take Mock Test
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Flame,      label: "Streak",       value: `${streakDays}d 🔥`,           color: "#fb923c" },
            { icon: Clock,      label: "Study Hours",  value: `${totalStudyHours.toFixed(1)}h`, color: "#60a5fa" },
            { icon: Target,     label: "Avg Score",    value: `${avgScore}%`,                   color: "#4ade80" },
            { icon: TrendingUp, label: "Topics Done",  value: `${topicsCompleted.length}/${allTopics.length}`, color: "#a78bfa" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 flex items-center gap-3" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                <div className="text-lg font-black text-white">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-2 gap-4">
          {EXAM_CARDS.map((card) => (
            <button key={card.id} onClick={() => onNavigate("syllabus")}
              className="rounded-xl p-5 text-left transition-all hover:scale-[1.02] group"
              style={{ background: card.bg, border: `1px solid ${card.border}` }}
            >
              <div className="text-3xl mb-3">{card.emoji}</div>
              <div className="font-bold text-white text-lg">{card.label}</div>
              <div className="text-xs mt-1 whitespace-pre-line leading-tight" style={{ color: "rgba(255,255,255,0.5)" }}>{card.sub}</div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: card.color }}>
                Start Preparing <ArrowRight size={12} />
              </div>
            </button>
          ))}
        </div>

        {/* Preparation Journey — auto from real data */}
        <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span>🏃</span>
              <span className="font-semibold text-white">My Preparation Journey</span>
            </div>
            <button onClick={() => onNavigate("analytics")} className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Full Analytics <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-6 items-start">
            <div className="relative flex-shrink-0">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#4ade80" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - overallPct / 100)}`}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 0.6s" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white">{overallPct}%</span>
                <span className="text-[9px] text-center leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>Overall</span>
              </div>
            </div>
            <div className="flex-1 space-y-2.5">
              {subjects.slice(0, 5).map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <span>{s.label}</span>
                    <span style={{ color: s.pct >= 70 ? "#4ade80" : s.pct >= 40 ? "#facc15" : "rgba(255,255,255,0.4)" }}>{s.pct}%</span>
                  </div>
                  <div className="rounded-full overflow-hidden h-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${s.pct}%`, background: s.pct >= 70 ? "#4ade80" : s.pct >= 40 ? "#facc15" : "#94a3b8" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Roadmap preview */}
        {todayRoadmap && (
          <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Map size={16} style={{ color: "#4ade80" }} />
                <span className="font-semibold text-white">Today's Roadmap — Day {todayDayNum}</span>
              </div>
              <button onClick={() => onNavigate("roadmap")} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
                Full Plan <ChevronRight size={13} />
              </button>
            </div>
            <div className="rounded-lg p-3 mb-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Phase {todayRoadmap.phase} · {todayRoadmap.phaseName}</div>
              <div className="flex flex-wrap gap-2">
                {todayRoadmap.topics.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-md" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center rounded-lg p-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-base font-black" style={{ color: "#4ade80" }}>{todayRoadmap.studyHours}h</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Study</div>
              </div>
              <div className="text-center rounded-lg p-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-base font-black" style={{ color: "#60a5fa" }}>{todayRoadmap.practiceQuestions}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Questions</div>
              </div>
              <div className="text-center rounded-lg p-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-base font-black" style={{ color: "#facc15" }}>{daysLeft}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Days Left</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Access */}
        <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={16} style={{ color: "#facc15" }} />
              <span className="font-semibold text-white">Quick Access</span>
            </div>
            <button onClick={() => onNavigate("games")} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>
              <Gamepad2 size={13} /> Mind Games
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {QUICK_ACCESS.map((item, i) => {
              const Icon = item.icon;
              return (
                <button key={i} onClick={() => onNavigate(item.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="relative">
                    <Icon size={22} style={{ color: "rgba(255,255,255,0.7)" }} />
                    {item.live && <span className="absolute -top-1 -right-1 text-[8px] font-bold px-1 rounded" style={{ background: "#ef4444", color: "#fff" }}>LIVE</span>}
                  </div>
                  <span className="text-[11px] font-medium text-center leading-tight" style={{ color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (auto, no manual editing) ──────────── */}
      <div className="hidden xl:flex flex-col gap-4 w-72 flex-shrink-0">

        {/* Live Countdown */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={15} style={{ color: "#4ade80" }} />
            <span className="text-sm font-semibold text-white">Exam Countdown</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {[{ label: "Days", val: days }, { label: "Hours", val: hours }, { label: "Mins", val: mins }, { label: "Secs", val: secs }].map((u) => (
              <div key={u.label} className="rounded-lg p-2 text-center" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                <div className="text-xl font-black text-white tabular-nums">{String(u.val).padStart(2, "0")}</div>
                <div className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{u.label}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            Target: {new Date(targetDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </div>
          <button onClick={() => onNavigate("profile")} className="mt-2 w-full text-xs py-1.5 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
            Change exam date in Profile →
          </button>
        </div>

        {/* Today's Auto Missions */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span className="text-sm font-semibold text-white">Today's Mission</span>
            </div>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{doneMissions.length}/{autoMissions.length}</span>
          </div>
          <div className="space-y-2">
            {autoMissions.map((m, i) => (
              <button key={i} onClick={() => toggleMission(i)} className="w-full flex items-start gap-2.5 text-left">
                {doneMissions.includes(i)
                  ? <CheckSquare size={15} style={{ color: "#4ade80", flexShrink: 0, marginTop: 1 }} />
                  : <Square size={15} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, marginTop: 1 }} />
                }
                <span className="text-xs leading-relaxed" style={{
                  color: doneMissions.includes(i) ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.75)",
                  textDecoration: doneMissions.includes(i) ? "line-through" : "none",
                }}>{m}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2">
            <Flame size={18} style={{ color: "#fb923c" }} />
            <span className="text-sm font-semibold text-white">Study Streak</span>
          </div>
          <span className="text-sm font-black" style={{ color: "#4ade80" }}>{streakDays} Days</span>
        </div>

        {/* Recent test results */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Recent Tests</span>
            <button onClick={() => onNavigate("analytics")} className="text-xs" style={{ color: "#4ade80" }}>All →</button>
          </div>
          {testResults.length === 0 ? (
            <div className="text-center py-4">
              <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>No tests taken yet</div>
              <button onClick={() => onNavigate("mocktests")} className="text-xs px-3 py-1.5 rounded-lg font-semibold" style={{ background: "#4ade80", color: "#0a1a0e" }}>
                Start Now
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {testResults.slice(0, 3).map((t, i) => {
                const sc = pct(t.score, t.total);
                const mt = mockTests.find((m) => m.id === t.testId);
                return (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: sc >= 70 ? "rgba(74,222,128,0.1)" : sc >= 50 ? "rgba(250,204,21,0.1)" : "rgba(239,68,68,0.1)",
                               color: sc >= 70 ? "#4ade80" : sc >= 50 ? "#facc15" : "#ef4444" }}>
                      {sc}%
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-white truncate">{mt?.title ?? t.testId}</div>
                      <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{t.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mind Games CTA */}
        <button onClick={() => onNavigate("games")}
          className="rounded-xl p-4 text-left transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg,rgba(167,139,250,0.15),rgba(96,165,250,0.1))", border: "1px solid rgba(167,139,250,0.3)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 size={18} style={{ color: "#a78bfa" }} />
            <span className="text-sm font-semibold text-white">Mind Games</span>
          </div>
          <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            Flashcards · Quick Quiz · Word Scramble
          </div>
          <div className="text-xs font-semibold" style={{ color: "#a78bfa" }}>Play Now →</div>
        </button>
      </div>
    </div>
  );
}
