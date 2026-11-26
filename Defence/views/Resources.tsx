"use client";
import { useState } from "react";
import { Download, BookOpen, FileText, Hash, Globe, ExternalLink, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui";

const resources = [
  { id: "r1", title: "CDS English Grammar Notes", subject: "English", type: "Notes", exam: "CDS", size: "2.4 MB", description: "Complete grammar reference with examples – Parts of Speech, Tenses, Voice, Narration." },
  { id: "r2", title: "AFCAT GK Quick Reference", subject: "General Awareness", type: "Formula Sheet", exam: "AFCAT", size: "1.8 MB", description: "One-page-per-topic GK summary: History, Geography, Polity, Science, Defence." },
  { id: "r3", title: "CDS Mathematics Formula Book", subject: "Mathematics", type: "Formula Sheet", exam: "CDS", size: "1.2 MB", description: "All formulae for Arithmetic, Algebra, Trigonometry, Geometry, Mensuration and Statistics." },
  { id: "r4", title: "Indian History Timeline", subject: "History", type: "Notes", exam: "Both", size: "3.1 MB", description: "Chronological timeline from Indus Valley to Post-Independence India with key events." },
  { id: "r5", title: "IAF Aircraft & Weapons Guide", subject: "Indian Air Force", type: "Notes", exam: "AFCAT", size: "5.2 MB", description: "Detailed guide on IAF fighter aircraft, missiles, helicopters and weapons systems." },
  { id: "r6", title: "Polity Short Notes", subject: "Polity", type: "Notes", exam: "CDS", size: "2.0 MB", description: "Indian Constitution, Parliament, Judiciary, Fundamental Rights and DPSP quick notes." },
  { id: "r7", title: "Defence Vocabulary 500 Words", subject: "English", type: "Vocabulary", exam: "Both", size: "0.8 MB", description: "500 high-frequency words from CDS and AFCAT papers with meanings and usage examples." },
  { id: "r8", title: "Current Affairs Monthly Digest", subject: "Current Affairs", type: "PDF", exam: "Both", size: "4.5 MB", description: "November 2024 current affairs covering defence, sports, economy, science and international relations." },
  { id: "r9", title: "Trigonometry Master Sheet", subject: "Mathematics", type: "Formula Sheet", exam: "CDS", size: "0.5 MB", description: "All trigonometric identities, standard values and formulae with worked examples." },
  { id: "r10", title: "Biology Human Body Notes", subject: "Biology", type: "Notes", exam: "CDS", size: "1.6 MB", description: "Digestive, respiratory, circulatory, nervous and endocrine systems with diagrams." },
  { id: "r11", title: "AFCAT Reasoning Tricks", subject: "Reasoning", type: "Notes", exam: "AFCAT", size: "2.3 MB", description: "Shortcuts and tricks for analogies, series, coding-decoding, spatial ability and military aptitude." },
  { id: "r12", title: "GK Important Dates & Events", subject: "General Knowledge", type: "Formula Sheet", exam: "Both", size: "0.9 MB", description: "Important national and international days, historical dates and military milestones." },
];

const vocab = [
  { word: "Tenacious", meaning: "Persistent, determined, not easily giving up", example: "A tenacious cadet never loses focus during training." },
  { word: "Laconic", meaning: "Using very few words; brief and concise", example: "The officer gave a laconic briefing before the operation." },
  { word: "Belligerent", meaning: "Hostile and aggressive; inclined to start quarrels or wars", example: "The belligerent nation posed a threat to regional stability." },
  { word: "Sagacious", meaning: "Having or showing keen mental discernment", example: "A sagacious commander anticipates the enemy's moves." },
  { word: "Indomitable", meaning: "Impossible to subdue or defeat", example: "The indomitable spirit of Indian soldiers is their greatest strength." },
  { word: "Pugnacious", meaning: "Eager or quick to argue, quarrel or fight", example: "His pugnacious attitude made negotiations difficult." },
  { word: "Perspicacious", meaning: "Having a ready insight into things; shrewd", example: "The perspicacious analyst predicted the conflict weeks in advance." },
  { word: "Intrepid", meaning: "Fearless; adventurous", example: "Intrepid soldiers volunteered for the high-altitude rescue mission." },
];

export default function Resources() {
  const [tab, setTab] = useState<"materials" | "vocab" | "formulae">("materials");
  const [examFilter, setExamFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");

  const types = resources.reduce<string[]>((acc, r) => { if (!acc.includes(r.type)) acc.push(r.type); return acc; }, ["All"]);
  const exams = ["All", "CDS", "AFCAT", "Both"];

  const filtered = resources.filter((r) => {
    if (examFilter !== "All" && r.exam !== examFilter) return false;
    if (typeFilter !== "All" && r.type !== typeFilter) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.subject.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading title="Learning Resources" sub="Study materials, formula sheets, vocabulary and notes." />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "materials", label: "Study Materials" },
          { id: "vocab", label: "Vocabulary Builder" },
          { id: "formulae", label: "Formula Sheets" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-gold-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "materials" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input className="input-field w-full pl-8" placeholder="Search resources..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="input-field" value={examFilter} onChange={(e) => setExamFilter(e.target.value)}>
              {exams.map((e) => <option key={e}>{e}</option>)}
            </select>
            <select className="input-field" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r) => (
              <div key={r.id} className="card border border-white/5 hover:border-white/10 transition-all flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    {r.type === "Formula Sheet" ? <Hash size={18} className="text-blue-400" /> :
                     r.type === "Notes" ? <BookOpen size={18} className="text-green-400" /> :
                     r.type === "Vocabulary" ? <Globe size={18} className="text-purple-400" /> :
                     <FileText size={18} className="text-gold-400" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{r.title}</div>
                    <div className="text-xs text-white/40">{r.subject} · {r.size}</div>
                  </div>
                </div>
                <p className="text-xs text-white/50 flex-1 mb-4">{r.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className={`badge ${r.exam === "CDS" ? "badge-blue" : r.exam === "AFCAT" ? "badge-gold" : "badge-green"}`}>{r.exam}</span>
                    <span className="badge bg-white/5 text-white/50">{r.type}</span>
                  </div>
                  <button className="btn-ghost text-xs flex items-center gap-1 text-gold-400">
                    <Download size={13} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "vocab" && (
        <div className="space-y-3">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
            Study 10 new words daily. Use flashcards, example sentences and mnemonics for best retention.
          </div>
          {vocab.map((v, i) => (
            <div key={i} className="card border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-xs font-bold text-purple-400">{i + 1}</div>
                <div>
                  <div className="font-semibold text-white">{v.word}</div>
                  <div className="text-sm text-white/60 mt-1">{v.meaning}</div>
                  <div className="text-xs text-white/40 italic mt-1">"{v.example}"</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "formulae" && (
        <div className="space-y-4">
          {[
            {
              subject: "Trigonometry",
              formulae: [
                "sin²θ + cos²θ = 1",
                "1 + tan²θ = sec²θ",
                "1 + cot²θ = cosec²θ",
                "sin(A±B) = sinA cosB ± cosA sinB",
                "cos(A±B) = cosA cosB ∓ sinA sinB",
                "tan(A+B) = (tanA + tanB) / (1 - tanA tanB)",
                "sin 30°=½, sin 60°=√3/2, sin 45°=1/√2",
              ],
            },
            {
              subject: "Mensuration",
              formulae: [
                "Area of circle = πr²",
                "Volume of sphere = (4/3)πr³",
                "Volume of cylinder = πr²h",
                "Volume of cone = (1/3)πr²h",
                "Area of triangle = ½ × b × h",
                "Lateral surface area of cylinder = 2πrh",
                "Total surface area of cylinder = 2πr(r+h)",
              ],
            },
            {
              subject: "Algebra",
              formulae: [
                "(a+b)² = a² + 2ab + b²",
                "(a-b)² = a² - 2ab + b²",
                "(a+b)³ = a³ + 3a²b + 3ab² + b³",
                "a² - b² = (a+b)(a-b)",
                "a³ + b³ = (a+b)(a² - ab + b²)",
                "a³ - b³ = (a-b)(a² + ab + b²)",
              ],
            },
            {
              subject: "Statistics",
              formulae: [
                "Mean = Σx / n",
                "Median = middle value when sorted",
                "Mode = most frequent value",
                "SD = √(Σ(x - x̄)² / n)",
                "P(A) = Favourable outcomes / Total outcomes",
                "P(A∪B) = P(A) + P(B) - P(A∩B)",
              ],
            },
          ].map((sec) => (
            <div key={sec.subject} className="card border border-white/5">
              <div className="font-semibold text-white mb-3">{sec.subject} Formulae</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sec.formulae.map((f, i) => (
                  <div key={i} className="bg-navy-900/80 rounded-lg px-3 py-2 font-mono text-sm text-gold-300">{f}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
