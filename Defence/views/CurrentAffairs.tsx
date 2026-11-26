"use client";
import { useState } from "react";
import { Calendar, Shield, Globe, Award, Dumbbell, Zap } from "lucide-react";
import { currentAffairs, defenceExercises } from "@/lib/data/currentAffairs";
import { SectionHeading } from "@/components/ui";

const catIcons: Record<string, any> = {
  Defence: Shield,
  "International Relations": Globe,
  Appointments: Award,
  "Defence Exercises": Zap,
  Sports: Dumbbell,
  "Space Technology": Zap,
  "Important Dates": Calendar,
  "Military Operations": Shield,
  "Government Schemes": Globe,
};

export default function CurrentAffairs() {
  const [tab, setTab] = useState<"daily" | "exercises" | "quiz">("daily");
  const [catFilter, setCatFilter] = useState("All");
  const [examFilter, setExamFilter] = useState("All");
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const categories = currentAffairs.reduce<string[]>((acc, c) => { if (!acc.includes(c.category)) acc.push(c.category); return acc; }, ["All"]);

  const filtered = currentAffairs.filter((c) => {
    if (catFilter !== "All" && c.category !== catFilter) return false;
    if (examFilter !== "All" && !c.exam.includes(examFilter)) return false;
    return true;
  });

  // Simple quiz from CA items
  const quizItems = currentAffairs.slice(0, 5).map((item) => ({
    question: `What was notable about "${item.headline}"?`,
    answer: item.detail,
    options: [item.detail, "It was a successful bilateral summit", "ISRO launched a new satellite", "India signed a defence MoU with UAE"],
    correct: 0,
  }));
  const qi = quizItems[quizIdx % quizItems.length];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading title="Current Affairs & Defence Updates" sub="Stay updated with the latest defence, international and national events." />

      <div className="flex gap-2">
        {[
          { id: "daily", label: "Daily Updates" },
          { id: "exercises", label: "Defence Exercises" },
          { id: "quiz", label: "CA Quiz" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-gold-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "daily" && (
        <>
          <div className="flex flex-wrap gap-3">
            <select className="input-field" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className="input-field" value={examFilter} onChange={(e) => setExamFilter(e.target.value)}>
              <option value="All">All Exams</option>
              <option value="CDS">CDS</option>
              <option value="AFCAT">AFCAT</option>
            </select>
          </div>

          <div className="space-y-3">
            {filtered.map((item) => {
              const Icon = catIcons[item.category] ?? Calendar;
              return (
                <div key={item.id} className="card border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-gold-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="badge badge-gold">{item.category}</span>
                        <span className="text-xs text-white/40">{item.date}</span>
                        <div className="flex gap-1">
                          {item.exam.map((e) => (
                            <span key={e} className={`badge text-[10px] ${e === "CDS" ? "badge-blue" : "badge-gold"}`}>{e}</span>
                          ))}
                        </div>
                      </div>
                      <div className="font-semibold text-white text-sm">{item.headline}</div>
                      <div className="text-xs text-white/50 mt-1 leading-relaxed">{item.detail}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "exercises" && (
        <div className="space-y-4">
          <div className="bg-olive-500/10 border border-olive-500/20 rounded-xl p-4 text-sm text-olive-300">
            Defence exercises are frequently asked in both CDS and AFCAT examinations. Memorise the name, countries involved and type of exercise.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {defenceExercises.map((ex, i) => (
              <div key={i} className="card border border-white/5 hover:border-white/10 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-olive-500/10 flex items-center justify-center">
                  <Shield size={18} className="text-olive-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">{ex.name}</div>
                  <div className="text-xs text-white/50">{ex.countries}</div>
                  <div className="flex gap-2 mt-1">
                    <span className="badge badge-green text-[10px]">{ex.type}</span>
                    <span className="badge badge-blue text-[10px]">{ex.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "quiz" && qi && (
        <div className="max-w-2xl">
          <div className="card border border-white/5">
            <div className="text-xs text-gold-400 uppercase tracking-wide mb-3">Question {(quizIdx % quizItems.length) + 1} of {quizItems.length}</div>
            <div className="text-sm font-medium text-white mb-5">{qi.question}</div>
            <div className="space-y-2.5">
              {qi.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuizAnswer(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                    quizAnswer === null ? "bg-navy-900/60 border-white/5 hover:border-white/20 text-white/70" :
                    i === qi.correct ? "bg-green-500/15 border-green-500/40 text-green-400" :
                    quizAnswer === i ? "bg-red-500/15 border-red-500/40 text-red-400" :
                    "bg-navy-900/40 border-white/5 text-white/40"
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
            {quizAnswer !== null && (
              <div className="mt-4 p-3 bg-navy-900/60 rounded-lg text-xs text-white/60">
                📌 {qi.answer}
              </div>
            )}
            <button
              onClick={() => { setQuizIdx((n) => n + 1); setQuizAnswer(null); }}
              className="btn-gold mt-4 w-full"
            >
              {quizAnswer !== null ? "Next Question →" : "Skip"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
