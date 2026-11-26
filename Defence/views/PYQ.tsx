"use client";
import { useState } from "react";
import { Search, Bookmark, BookmarkPlus, ChevronDown } from "lucide-react";
import { questionBank, type Difficulty } from "@/lib/data/questions";
import { useProgress } from "@/lib/store/progressStore";
import { SectionHeading } from "@/components/ui";

export default function PYQ() {
  const { bookmarkedQuestions, bookmarkQuestion, unbookmarkQuestion } = useProgress();
  const [exam, setExam] = useState<"All" | "CDS" | "AFCAT">("All");
  const [subject, setSubject] = useState("All");
  const [year, setYear] = useState<number | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [search, setSearch] = useState("");
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const years = questionBank.map((q) => q.year).filter(Boolean).reduce<number[]>((acc, y) => { if (y && !acc.includes(y)) acc.push(y); return acc; }, []).sort((a, b) => b - a);
  const subjects = questionBank.reduce<string[]>((acc, q) => { if (!acc.includes(q.subject)) acc.push(q.subject); return acc; }, ["All"]);

  const filtered = questionBank.filter((q) => {
    if (exam !== "All" && q.exam !== exam && q.exam !== "Both") return false;
    if (subject !== "All" && q.subject !== subject) return false;
    if (year !== "All" && q.year !== year) return false;
    if (difficulty !== "All" && q.difficulty !== difficulty) return false;
    if (onlyBookmarked && !bookmarkedQuestions.includes(q.id)) return false;
    if (search && !q.question.toLowerCase().includes(search.toLowerCase()) && !q.topic.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleBookmark = (id: string) => bookmarkedQuestions.includes(id) ? unbookmarkQuestion(id) : bookmarkQuestion(id);

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading
        title="Previous Year Questions"
        sub="Filter by exam, subject, year, difficulty. Bookmark for later revision."
        right={<div className="text-sm text-white/50">{filtered.length} questions</div>}
      />

      {/* Filters */}
      <div className="card space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-white/50 block mb-1">Exam</label>
            <select className="input-field w-full" value={exam} onChange={(e) => setExam(e.target.value as typeof exam)}>
              <option>All</option><option>CDS</option><option>AFCAT</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1">Subject</label>
            <select className="input-field w-full" value={subject} onChange={(e) => setSubject(e.target.value)}>
              {subjects.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1">Year</label>
            <select className="input-field w-full" value={year} onChange={(e) => setYear(e.target.value === "All" ? "All" : +e.target.value)}>
              <option value="All">All Years</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1">Difficulty</label>
            <select className="input-field w-full" value={difficulty} onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}>
              <option value="All">All</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input className="input-field w-full pl-8" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button
            onClick={() => setOnlyBookmarked((b) => !b)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all ${onlyBookmarked ? "bg-gold-500/20 border-gold-500/50 text-gold-400" : "border-white/10 text-white/60 hover:border-white/20"}`}
          >
            <Bookmark size={14} /> Bookmarked
          </button>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card text-center py-10 text-white/40">No questions match the filter.</div>
        ) : (
          filtered.map((q, idx) => {
            const isBookmarked = bookmarkedQuestions.includes(q.id);
            const isOpen = showExplanation === q.id;
            return (
              <div key={q.id} className="card border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-xs text-white/30 mt-1 flex-shrink-0 w-6">{idx + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {q.year && <span className="badge badge-blue">{q.year}</span>}
                      <span className={`diff-${q.difficulty}`}>{q.difficulty}</span>
                      <span className="text-xs text-white/40">{q.subject} · {q.topic}</span>
                    </div>
                    <div className="text-sm text-white/80 mb-3">{q.question}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {q.options.map((opt, i) => (
                        <div key={i} className={`text-xs px-3 py-1.5 rounded-lg ${
                          i === q.correct ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-navy-900/60 text-white/50"
                        }`}>
                          <span className="font-semibold mr-1">{String.fromCharCode(65 + i)}.</span>{opt}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setShowExplanation(isOpen ? null : q.id)} className="text-xs text-gold-400 hover:text-gold-300 mt-3 flex items-center gap-1">
                      <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      {isOpen ? "Hide" : "Show"} Explanation
                    </button>
                    {isOpen && (
                      <div className="mt-2 text-xs text-white/60 bg-navy-900/60 rounded-lg p-3">{q.explanation}</div>
                    )}
                  </div>
                  <button onClick={() => toggleBookmark(q.id)} className={`p-2 rounded-lg flex-shrink-0 ${isBookmarked ? "text-gold-400 bg-gold-500/10" : "text-white/30 hover:text-white/60 hover:bg-white/10"}`}>
                    {isBookmarked ? <Bookmark size={15} /> : <BookmarkPlus size={15} />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
