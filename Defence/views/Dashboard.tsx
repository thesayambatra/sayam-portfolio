"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight, Flame, Calendar, FileText, BookOpen,
  Newspaper, ChevronRight, CheckSquare, Square,
  Tv2, Award, Zap, Settings, Save, X, Edit3,
} from "lucide-react";
import { useProgress } from "@/lib/store/progressStore";
import { cdsSyllabus, afcatSyllabus } from "@/lib/data/syllabus";
import { roadmapDays } from "@/lib/data/roadmap";
import { pct } from "@/lib/utils";

// ── Countdown hook ─────────────────────────────────────────────
function useCountdown(dateStr: string) {
  const [diff, setDiff] = useState(new Date(dateStr).getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(new Date(dateStr).getTime() - Date.now()), 60000);
    return () => clearInterval(id);
  }, [dateStr]);
  return {
    days:  Math.max(0, Math.floor(diff / 86400000)),
    hours: Math.max(0, Math.floor((diff % 86400000) / 3600000)),
    mins:  Math.max(0, Math.floor((diff % 3600000) / 60000)),
  };
}

// ── Exam cards (AFCAT + CDS only) ─────────────────────────────
const EXAM_CARDS = [
  { id: "afcat", label: "AFCAT", sub: "Air Force Common\nAdmission Test",   color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.2)",  emoji: "✈️" },
  { id: "cds",   label: "CDS",   sub: "Combined\nDefence Services",         color: "#facc15", bg: "rgba(250,204,21,0.08)",  border: "rgba(250,204,21,0.2)",  emoji: "⚔️" },
];

// ── Quick access tiles ─────────────────────────────────────────
const QUICK_ACCESS = [
  { id: "currentaffairs", label: "Live Classes",         icon: Tv2,      live: true  },
  { id: "mocktests",      label: "Mock Tests",           icon: FileText, live: false },
  { id: "pyq",            label: "Previous Year Papers", icon: BookOpen, live: false },
  { id: "resources",      label: "Study Materials",      icon: FileText, live: false },
  { id: "ssb",            label: "SSB Guidance",         icon: Award,    live: false },
  { id: "currentaffairs", label: "Current Affairs",      icon: Newspaper,live: false },
];

// ── Default editable config ────────────────────────────────────
const DEFAULT_CONFIG = {
  examLabel:   "AFCAT 01/2027",
  examDate:    "2027-02-07",
  examDisplay: "07 Feb 2027",
  subjects: [
    { label: "Quantitative Aptitude", pct: 0 },
    { label: "Reasoning",             pct: 0 },
    { label: "English",               pct: 0 },
    { label: "General Awareness",     pct: 0 },
  ],
  missions: [
    "Watch 2 Concept Lectures",
    "Solve 50 Practice Questions",
    "Attempt 1 Sectional Test",
    "Revise Short Notes",
  ],
};

type Config = typeof DEFAULT_CONFIG;

function loadConfig(): Config {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const s = localStorage.getItem("defenceprep-dashboard-config");
    return s ? { ...DEFAULT_CONFIG, ...JSON.parse(s) } : DEFAULT_CONFIG;
  } catch { return DEFAULT_CONFIG; }
}

export default function Dashboard({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { streakDays, topicsCompleted, roadmapCompleted, updateStreak } = useProgress();
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [draft, setDraft]   = useState<Config>(DEFAULT_CONFIG);
  const [editing, setEditing] = useState(false);
  const [doneMissions, setDoneMissions] = useState<number[]>([]);

  useEffect(() => {
    updateStreak();
    const c = loadConfig();
    setConfig(c);
    setDraft(c);
  }, []);

  const { days, hours, mins } = useCountdown(config.examDate);

  // Real progress from store
  const allTopics    = [...cdsSyllabus, ...afcatSyllabus].flatMap((s) => s.topics);
  const overallPct   = allTopics.length
    ? Math.round((topicsCompleted.length / allTopics.length) * 100)
    : 0;

  const saveConfig = () => {
    localStorage.setItem("defenceprep-dashboard-config", JSON.stringify(draft));
    setConfig(draft);
    setEditing(false);
  };

  const cancelEdit = () => { setDraft(config); setEditing(false); };

  const updateSubject = (i: number, field: "label" | "pct", val: string | number) =>
    setDraft((d) => ({ ...d, subjects: d.subjects.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }));

  const updateMission = (i: number, val: string) =>
    setDraft((d) => ({ ...d, missions: d.missions.map((m, idx) => idx === i ? val : m) }));

  const toggleMission = (i: number) =>
    setDoneMissions((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="flex gap-5 animate-fade-in">

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Hero Banner */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(120deg,#0a1a0e 0%,#0d1f15 40%,#111827 100%)", border: "1px solid rgba(74,222,128,0.15)", minHeight: 200 }}
        >
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 70% 50%,rgba(74,222,128,0.3) 0%,transparent 60%)" }} />
          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              {["AFCAT", "CDS"].map((e, i) => (
                <span key={e} className="flex items-center gap-2">
                  {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>}
                  <span className="text-sm font-bold" style={{ color: "#4ade80" }}>{e}</span>
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-white">
              PREPARE . <span style={{ color: "#4ade80" }}>QUALIFY</span> . SERVE
            </h1>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)", maxWidth: 400 }}>
              India's most complete Defence Exam Preparation Platform for Aspirants of the Indian Armed Forces.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => onNavigate("syllabus")} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold" style={{ background: "#4ade80", color: "#0a1a0e" }}>
                Start Learning <ArrowRight size={15} />
              </button>
              <button onClick={() => onNavigate("mocktests")} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
                ▶ Mock Tests
              </button>
            </div>
          </div>
        </div>

        {/* Exam Cards — AFCAT + CDS only */}
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

        {/* Preparation Journey */}
        <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🏃</span>
              <span className="font-semibold text-white">My Preparation Journey</span>
            </div>
            <button onClick={() => onNavigate("analytics")} className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Full Analytics <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-6 items-center">
            {/* Circular progress — real data */}
            <div className="relative flex-shrink-0">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#4ade80" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - overallPct / 100)}`}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white">{overallPct}%</span>
                <span className="text-[9px] text-center leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>Overall<br />Progress</span>
              </div>
            </div>
            {/* Subject bars from config */}
            <div className="flex-1 space-y-3">
              {config.subjects.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <span>{s.label}</span>
                    <span style={{ color: s.pct >= 70 ? "#4ade80" : s.pct >= 40 ? "#facc15" : "rgba(255,255,255,0.5)" }}>{s.pct}%</span>
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

        {/* Quick Access */}
        <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} style={{ color: "#facc15" }} />
            <span className="font-semibold text-white">Quick Access</span>
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
                    {item.live && (
                      <span className="absolute -top-1 -right-1 text-[8px] font-bold px-1 rounded" style={{ background: "#ef4444", color: "#fff" }}>LIVE</span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-center leading-tight" style={{ color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ───────────────────────────────────── */}
      <div className="hidden xl:flex flex-col gap-4 w-72 flex-shrink-0">

        {/* Edit / Save toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">Dashboard</span>
          {editing ? (
            <div className="flex gap-2">
              <button onClick={cancelEdit} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                <X size={12} /> Cancel
              </button>
              <button onClick={saveConfig} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold" style={{ background: "#4ade80", color: "#0a1a0e" }}>
                <Save size={12} /> Save
              </button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
              <Edit3 size={12} /> Customize
            </button>
          )}
        </div>

        {/* Exam Countdown — editable */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={15} style={{ color: "#4ade80" }} />
            {editing ? (
              <input
                className="flex-1 text-sm font-semibold text-white bg-transparent border-b border-white/20 outline-none"
                value={draft.examLabel}
                onChange={(e) => setDraft({ ...draft, examLabel: e.target.value })}
                placeholder="e.g. AFCAT 01/2027"
              />
            ) : (
              <span className="text-sm font-semibold text-white">{config.examLabel}</span>
            )}
          </div>
          {editing ? (
            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-white/40 block mb-1">Exam Date (YYYY-MM-DD)</label>
                <input
                  className="w-full text-sm text-white bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-white/30"
                  value={draft.examDate}
                  onChange={(e) => setDraft({ ...draft, examDate: e.target.value })}
                  placeholder="2027-02-07"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/40 block mb-1">Display Text</label>
                <input
                  className="w-full text-sm text-white bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-white/30"
                  value={draft.examDisplay}
                  onChange={(e) => setDraft({ ...draft, examDisplay: e.target.value })}
                  placeholder="07 Feb 2027"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[{ label: "Days", val: days }, { label: "Hours", val: hours }, { label: "Minutes", val: mins }].map((u) => (
                  <div key={u.label} className="rounded-lg p-2 text-center" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                    <div className="text-2xl font-black text-white">{u.val}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{u.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>Exam on: {config.examDisplay}</div>
            </>
          )}
        </div>

        {/* Preparation Journey — editable subject % */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span>🏃</span>
            <span className="text-sm font-semibold text-white">Preparation %</span>
          </div>
          <div className="space-y-3">
            {(editing ? draft.subjects : config.subjects).map((s, i) => (
              <div key={i}>
                {editing ? (
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 text-xs text-white bg-white/5 border border-white/10 rounded px-2 py-1 outline-none"
                      value={draft.subjects[i].label}
                      onChange={(e) => updateSubject(i, "label", e.target.value)}
                    />
                    <input
                      type="number" min="0" max="100"
                      className="w-14 text-xs text-white bg-white/5 border border-white/10 rounded px-2 py-1 outline-none text-center"
                      value={draft.subjects[i].pct}
                      onChange={(e) => updateSubject(i, "pct", Math.min(100, Math.max(0, +e.target.value)))}
                    />
                    <span className="text-xs text-white/40">%</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span>{s.label}</span>
                      <span style={{ color: s.pct >= 70 ? "#4ade80" : s.pct >= 40 ? "#facc15" : "rgba(255,255,255,0.4)" }}>{s.pct}%</span>
                    </div>
                    <div className="rounded-full overflow-hidden h-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.pct >= 70 ? "#4ade80" : s.pct >= 40 ? "#facc15" : "#94a3b8" }} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Today's Mission — editable */}
        <div className="rounded-xl p-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span className="text-sm font-semibold text-white">Today's Mission</span>
            </div>
            {!editing && <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{doneMissions.length}/{config.missions.length}</span>}
          </div>
          <div className="space-y-2">
            {(editing ? draft.missions : config.missions).map((m, i) => (
              editing ? (
                <input
                  key={i}
                  className="w-full text-xs text-white bg-white/5 border border-white/10 rounded px-2 py-1.5 outline-none"
                  value={draft.missions[i]}
                  onChange={(e) => updateMission(i, e.target.value)}
                />
              ) : (
                <button key={i} onClick={() => toggleMission(i)} className="w-full flex items-center gap-2.5 text-left">
                  {doneMissions.includes(i)
                    ? <CheckSquare size={15} style={{ color: "#4ade80", flexShrink: 0 }} />
                    : <Square size={15} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  }
                  <span className="text-xs" style={{
                    color: doneMissions.includes(i) ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.75)",
                    textDecoration: doneMissions.includes(i) ? "line-through" : "none",
                  }}>{m}</span>
                </button>
              )
            ))}
          </div>
        </div>

        {/* Study Streak */}
        <div className="rounded-xl px-4 py-3 flex items-center justify-between"
          style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2">
            <Flame size={18} style={{ color: "#fb923c" }} />
            <span className="text-sm font-semibold text-white">Study Streak</span>
          </div>
          <span className="text-sm font-black" style={{ color: "#4ade80" }}>{streakDays} Days</span>
        </div>
      </div>
    </div>
  );
}
