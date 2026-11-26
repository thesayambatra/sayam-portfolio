"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight, Flame, Calendar, FileText, BookOpen,
  Users, Newspaper, ChevronRight, CheckSquare, Square,
  Tv2, Award, Zap, Star,
} from "lucide-react";
import { ProgressBar } from "@/components/ui";
import { useProgress } from "@/lib/store/progressStore";
import { cdsSyllabus, afcatSyllabus } from "@/lib/data/syllabus";
import { roadmapDays } from "@/lib/data/roadmap";
import { mockTests } from "@/lib/data/mockTests";
import { pct } from "@/lib/utils";

// ── Dummy leaderboard ──────────────────────────────────────────
const LEADERBOARD = [
  { rank: 1,  name: "Rohan M.",  xp: 4820, avatar: "R" },
  { rank: 2,  name: "Aditi S.",  xp: 4650, avatar: "A" },
  { rank: 3,  name: "Kunal P.", xp: 4390, avatar: "K" },
];

// ── Exam countdown target dates ────────────────────────────────
const EXAM_DATE = new Date("2027-02-07T00:00:00");

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 60000);
    return () => clearInterval(id);
  }, [target]);
  const days  = Math.max(0, Math.floor(diff / 86400000));
  const hours = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const mins  = Math.max(0, Math.floor((diff % 3600000) / 60000));
  return { days, hours, mins };
}

// ── Subject progress (dummy for new users) ─────────────────────
const SUBJECT_PROGRESS = [
  { label: "Quantitative Aptitude", pct: 70, color: "#4ade80" },
  { label: "Reasoning",             pct: 65, color: "#4ade80" },
  { label: "English",               pct: 72, color: "#4ade80" },
  { label: "General Awareness",     pct: 60, color: "#facc15" },
];

// ── Mission tasks ──────────────────────────────────────────────
const MISSIONS = [
  { label: "Watch 2 Concept Lectures",   total: 2 },
  { label: "Solve 50 Practice Questions",total: 50 },
  { label: "Attempt 1 Sectional Test",   total: 1 },
  { label: "Revise Short Notes",         total: 1 },
];

// ── Exam cards ─────────────────────────────────────────────────
const EXAM_CARDS = [
  {
    id: "afcat",
    label: "AFCAT",
    sub: "Air Force Common\nAdmission Test",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.2)",
    emoji: "✈️",
  },
  {
    id: "cds",
    label: "CDS",
    sub: "Combined\nDefence Services",
    color: "#facc15",
    bg: "rgba(250,204,21,0.08)",
    border: "rgba(250,204,21,0.2)",
    emoji: "⚔️",
  },
  {
    id: "nda",
    label: "NDA",
    sub: "National\nDefence Academy",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
    emoji: "🏛️",
  },
  {
    id: "capf",
    label: "CAPF",
    sub: "Central Armed\nPolice Forces",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.2)",
    emoji: "🛡️",
  },
];

// ── Quick access tiles ─────────────────────────────────────────
const QUICK_ACCESS = [
  { id: "currentaffairs", label: "Live Classes",    icon: Tv2,       live: true },
  { id: "mocktests",      label: "Mock Tests",      icon: FileText,  live: false },
  { id: "pyq",            label: "Previous Year Papers", icon: BookOpen, live: false },
  { id: "resources",      label: "Study Notes",     icon: FileText,  live: false },
  { id: "ssb",            label: "SSB Guidance",    icon: Award,     live: false },
  { id: "currentaffairs", label: "Current Affairs", icon: Newspaper, live: false },
];

// ── Rank info ──────────────────────────────────────────────────
const RANK_INFO = { title: "Cadet", level: 4, xp: 2450, nextXp: 3000, nextTitle: "Flight Cadet" };

export default function Dashboard({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { streakDays, topicsCompleted, roadmapCompleted, testResults, updateStreak } = useProgress();
  const { days, hours, mins } = useCountdown(EXAM_DATE);
  const [doneMissions, setDoneMissions] = useState<number[]>([]);
  const [activeExam, setActiveExam] = useState<"AFCAT" | "CDS">("AFCAT");

  useEffect(() => { updateStreak(); }, []);

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("defenceprep-user") || "{}") : {};

  // Overall progress %
  const allTopics = [...cdsSyllabus, ...afcatSyllabus].flatMap((s) => s.topics);
  const overallPct = allTopics.length ? Math.round((topicsCompleted.length / allTopics.length) * 100) : 68;

  const toggleMission = (i: number) =>
    setDoneMissions((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  return (
    <div className="flex gap-5 animate-fade-in">

      {/* ── LEFT + CENTRE ───────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Hero Banner */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(120deg, #0a1a0e 0%, #0d1f15 40%, #111827 100%)",
            border: "1px solid rgba(74,222,128,0.15)",
            minHeight: 220,
          }}
        >
          {/* Background military silhouette overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(ellipse at 70% 50%, rgba(74,222,128,0.3) 0%, transparent 60%)",
            }}
          />
          {/* Jet streaks decorative */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to left, rgba(74,222,128,0.08), transparent)",
            }} />
          </div>

          <div className="relative z-10 p-6 md:p-8">
            {/* Exam tabs */}
            <div className="flex items-center gap-3 mb-4">
              {["AFCAT", "CDS", "NDA", "CAPF"].map((e, i) => (
                <span key={e} className="flex items-center gap-2">
                  {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>}
                  <button
                    onClick={() => e === "AFCAT" || e === "CDS" ? setActiveExam(e as any) : null}
                    className="text-sm font-bold tracking-wide transition-colors"
                    style={{ color: activeExam === e ? "#4ade80" : "rgba(255,255,255,0.7)" }}
                  >
                    {e}
                  </button>
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3" style={{ color: "#fff" }}>
              PREPARE .{" "}
              <span style={{ color: "#4ade80" }}>QUALIFY</span>
              {" "}. SERVE
            </h1>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)", maxWidth: 400 }}>
              India's most complete Defence Exam Preparation Platform<br />
              for Aspirants of the Indian Armed Forces.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => onNavigate("syllabus")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
                style={{ background: "#4ade80", color: "#0a1a0e" }}
              >
                Start Learning <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onNavigate("mocktests")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                ▶ Watch Overview
              </button>
            </div>
          </div>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {EXAM_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigate("syllabus")}
              className="rounded-xl p-4 text-left transition-all hover:scale-[1.02] group"
              style={{ background: card.bg, border: `1px solid ${card.border}` }}
            >
              <div className="text-2xl mb-2">{card.emoji}</div>
              <div className="font-bold text-white text-base">{card.label}</div>
              <div className="text-xs mt-1 whitespace-pre-line leading-tight" style={{ color: "rgba(255,255,255,0.5)" }}>
                {card.sub}
              </div>
              <div className="mt-3 w-6 h-6 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1"
                style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                <ArrowRight size={12} style={{ color: card.color }} />
              </div>
            </button>
          ))}
        </div>

        {/* Preparation Journey + My Rank */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* My Preparation Journey */}
          <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">🏃</span>
              <span className="font-semibold text-white text-sm">My Preparation Journey</span>
            </div>
            <div className="flex gap-5 items-center">
              {/* Circular progress */}
              <div className="relative flex-shrink-0">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <circle
                    cx="45" cy="45" r="38"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 38}`}
                    strokeDashoffset={`${2 * Math.PI * 38 * (1 - overallPct / 100)}`}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-white">{overallPct}%</span>
                  <span className="text-[9px] text-center leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>Overall<br />Progress</span>
                </div>
              </div>

              {/* Subject bars */}
              <div className="flex-1 space-y-2.5">
                {SUBJECT_PROGRESS.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span>{s.label}</span>
                      <span style={{ color: s.color }}>{s.pct}%</span>
                    </div>
                    <div className="rounded-full overflow-hidden h-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Rank */}
          <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-base">🏅</span>
                <span className="font-semibold text-white text-sm">My Rank</span>
              </div>
              <button className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Rank badge */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(250,204,21,0.1)", border: "2px solid rgba(250,204,21,0.3)" }}>
                  <span className="text-3xl">⭐</span>
                </div>
              </div>
              <div>
                <div className="text-xl font-black" style={{ color: "#facc15" }}>{RANK_INFO.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Level {RANK_INFO.level} • {RANK_INFO.xp.toLocaleString()} XP
                </div>
                <div className="mt-2 w-40">
                  <div className="rounded-full overflow-hidden h-2" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full" style={{
                      width: `${(RANK_INFO.xp / RANK_INFO.nextXp) * 100}%`,
                      background: "linear-gradient(to right, #4ade80, #22d3ee)"
                    }} />
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Next Rank: {RANK_INFO.nextTitle} ({RANK_INFO.nextXp.toLocaleString()} XP)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} style={{ color: "#facc15" }} />
            <span className="font-semibold text-white text-sm">Quick Access</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {QUICK_ACCESS.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => onNavigate(item.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="relative">
                    <Icon size={22} style={{ color: "rgba(255,255,255,0.7)" }} />
                    {item.live && (
                      <span className="absolute -top-1 -right-1 text-[8px] font-bold px-1 rounded" style={{ background: "#ef4444", color: "#fff" }}>LIVE</span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-center leading-tight" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────── */}
      <div className="hidden xl:flex flex-col gap-4 w-72 flex-shrink-0">

        {/* Exam Countdown */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={15} style={{ color: "#4ade80" }} />
              <span className="text-sm font-semibold text-white">AFCAT 01/2027</span>
            </div>
            <ChevronRight size={15} style={{ color: "rgba(255,255,255,0.3)" }} />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[{ label: "Days", val: days }, { label: "Hours", val: hours }, { label: "Minutes", val: mins }].map((u) => (
              <div key={u.label} className="rounded-lg p-2 text-center" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                <div className="text-2xl font-black text-white">{u.val}</div>
                <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{u.label}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>Exam on: 07 Feb 2027</div>
        </div>

        {/* Today's Mission */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span className="text-sm font-semibold text-white">Today's Mission</span>
            </div>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{doneMissions.length}/{MISSIONS.length}</span>
          </div>
          <div className="space-y-2">
            {MISSIONS.map((m, i) => {
              const done = doneMissions.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => toggleMission(i)}
                  className="w-full flex items-center gap-2.5 text-left transition-all"
                >
                  {done
                    ? <CheckSquare size={15} style={{ color: "#4ade80", flexShrink: 0 }} />
                    : <Square size={15} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  }
                  <span className="text-xs" style={{ color: done ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.75)", textDecoration: done ? "line-through" : "none" }}>
                    {m.label}
                  </span>
                  <span className="ml-auto text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>(0/{m.total})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Study Streak */}
        <div className="rounded-xl px-4 py-3 flex items-center justify-between"
          style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2">
            <Flame size={18} style={{ color: "#fb923c" }} />
            <span className="text-sm font-semibold text-white">Study Streak</span>
          </div>
          <span className="text-sm font-black" style={{ color: "#4ade80" }}>{Math.max(streakDays, 12)} Days</span>
        </div>

        {/* Leaderboard */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star size={15} style={{ color: "#facc15" }} />
              <span className="text-sm font-semibold text-white">Leaderboard</span>
            </div>
            <button className="text-xs" style={{ color: "#4ade80" }}>View All →</button>
          </div>
          <div className="space-y-2">
            {LEADERBOARD.map((entry) => (
              <div key={entry.rank} className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <span className="text-sm font-bold w-4 text-center"
                  style={{ color: entry.rank === 1 ? "#facc15" : entry.rank === 2 ? "#94a3b8" : "#fb923c" }}>
                  {entry.rank}
                </span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#573CFA,#7c63fb)" }}>
                  {entry.avatar}
                </div>
                <span className="flex-1 text-xs font-medium text-white truncate">{entry.name}</span>
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>{entry.xp.toLocaleString()} XP</span>
              </div>
            ))}
            {/* You */}
            <div className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg mt-1"
              style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
              <span className="text-sm font-bold w-4 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>24</span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#4ade80,#22d3ee)" }}>
                Y
              </div>
              <span className="flex-1 text-xs font-medium" style={{ color: "#4ade80" }}>You</span>
              <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>2,450 XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
