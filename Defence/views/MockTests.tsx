"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ClipboardList, Play, Flag, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, AlertCircle, BookmarkPlus, Bookmark,
  ArrowRight, Clock,
} from "lucide-react";
import { mockTests } from "@/lib/data/mockTests";
import { questionBank, type Question } from "@/lib/data/questions";
import { useProgress } from "@/lib/store/progressStore";
import { SectionHeading } from "@/components/ui";
import { formatTime, pct } from "@/lib/utils";

type TestState = "list" | "running" | "result";

export default function MockTests() {
  const { addTestResult, bookmarkedQuestions, bookmarkQuestion, unbookmarkQuestion } = useProgress();
  const [state, setState] = useState<TestState>("list");
  const [selectedTest, setSelectedTest] = useState<typeof mockTests[0] | null>(null);
  const [examFilter, setExamFilter] = useState<"All" | "CDS" | "AFCAT" | "Subject">("All");

  // Test session state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);

  // Build question set for a test – use questionBank cycling
  const buildQuestions = (test: typeof mockTests[0]): Question[] => {
    const pool = questionBank.filter((q) => test.exam === "CDS" ? q.exam === "CDS" || q.exam === "Both" : q.exam === "AFCAT" || q.exam === "Both");
    const result: Question[] = [];
    while (result.length < test.totalQuestions) {
      result.push({ ...pool[result.length % pool.length], id: `${pool[result.length % pool.length].id}-${result.length}` });
    }
    return result;
  };

  const startTest = (test: typeof mockTests[0]) => {
    const qs = buildQuestions(test);
    setSelectedTest(test);
    setQuestions(qs);
    setAnswers({});
    setMarkedForReview(new Set());
    setCurrentIdx(0);
    setTimeLeft(test.duration * 60);
    setSubmitted(false);
    setState("running");
  };

  // Timer
  useEffect(() => {
    if (state !== "running" || submitted) return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) { submitTest(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [state, submitted]);

  const submitTest = useCallback(() => {
    if (!selectedTest) return;
    setSubmitted(true);
    setState("result");

    // Calculate score
    let correct = 0;
    let wrong = 0;
    const subjectScores: Record<string, { correct: number; wrong: number; unattempted: number }> = {};
    questions.forEach((q) => {
      const sub = q.subject;
      if (!subjectScores[sub]) subjectScores[sub] = { correct: 0, wrong: 0, unattempted: 0 };
      if (answers[q.id] === undefined) { subjectScores[sub].unattempted++; return; }
      if (answers[q.id] === q.correct) { correct++; subjectScores[sub].correct++; }
      else { wrong++; subjectScores[sub].wrong++; }
    });
    const score = correct - wrong * selectedTest.negativeMarking;
    addTestResult({
      testId: selectedTest.id,
      date: new Date().toISOString().split("T")[0],
      score: Math.max(0, Math.round(score)),
      total: questions.length,
      timeTaken: selectedTest.duration * 60 - timeLeft,
      subjectScores,
    });
  }, [selectedTest, questions, answers, timeLeft]);

  const toggleReview = (id: string) => setMarkedForReview((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleBookmark = (id: string) => bookmarkedQuestions.includes(id) ? unbookmarkQuestion(id) : bookmarkQuestion(id);

  const filteredTests = examFilter === "All" ? mockTests : mockTests.filter((t) => t.exam === examFilter || (examFilter === "Subject" && t.type === "subject"));

  // ── List View ──────────────────────────────────────────────────
  if (state === "list") {
    return (
      <div className="space-y-6 animate-fade-in">
        <SectionHeading title="Mock Test Platform" sub="Full-length & subject-wise tests with negative marking and detailed analysis." />
        <div className="flex gap-2 flex-wrap">
          {(["All", "CDS", "AFCAT", "Subject"] as const).map((f) => (
            <button key={f} onClick={() => setExamFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${examFilter === f ? "bg-gold-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>{f}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTests.map((test) => (
            <div key={test.id} className="card border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className={`badge mb-2 ${test.exam === "CDS" ? "badge-blue" : test.exam === "AFCAT" ? "badge-gold" : "badge-green"}`}>{test.exam}</div>
                  <h3 className="font-semibold text-white">{test.title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-navy-900/60 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">{test.totalQuestions}</div>
                  <div className="text-xs text-white/40">Questions</div>
                </div>
                <div className="bg-navy-900/60 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">{test.duration}m</div>
                  <div className="text-xs text-white/40">Duration</div>
                </div>
                <div className="bg-navy-900/60 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-red-400">-{test.negativeMarking}</div>
                  <div className="text-xs text-white/40">Negative</div>
                </div>
              </div>
              <div className="text-xs text-white/40 mb-4">
                Sections: {test.sections.map((s) => `${s.name} (${s.questions})`).join(" · ")}
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="text-xs text-white/40 mb-2 font-semibold uppercase tracking-wide">Instructions</div>
                <ul className="space-y-1">
                  {test.instructions.slice(0, 3).map((ins, i) => (
                    <li key={i} className="text-xs text-white/50 flex gap-2">
                      <span className="text-gold-400">•</span>{ins}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => startTest(test)} className="btn-gold w-full mt-4 flex items-center justify-center gap-2">
                <Play size={15} /> Start Test
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Result View ────────────────────────────────────────────────
  if (state === "result" && selectedTest) {
    const correct = questions.filter((q) => answers[q.id] === q.correct).length;
    const wrong = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.correct).length;
    const unattempted = questions.filter((q) => answers[q.id] === undefined).length;
    const score = Math.max(0, correct - wrong * selectedTest.negativeMarking);
    const scorePercent = pct(score, questions.length);

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="card border border-gold-500/20 bg-gradient-to-r from-gold-500/5 to-navy-800">
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-gold-400 mb-1">{score.toFixed(1)}</div>
            <div className="text-white/50">out of {questions.length} · {scorePercent}%</div>
            <div className={`mt-3 text-sm font-semibold ${scorePercent >= 70 ? "text-green-400" : scorePercent >= 50 ? "text-yellow-400" : "text-red-400"}`}>
              {scorePercent >= 70 ? "🎖 Excellent Performance!" : scorePercent >= 50 ? "👍 Good Attempt – Keep Improving" : "📚 Need More Practice"}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{correct}</div>
              <div className="text-xs text-white/50">Correct</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-400">{wrong}</div>
              <div className="text-xs text-white/50">Wrong</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-white/50">{unattempted}</div>
              <div className="text-xs text-white/50">Skipped</div>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Question Review</h2>
            <button onClick={() => setState("list")} className="btn-outline flex items-center gap-1 text-xs">
              Back to Tests <ArrowRight size={12} />
            </button>
          </div>
          {questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correct;
            const isWrong = userAns !== undefined && !isCorrect;
            const isSkipped = userAns === undefined;
            return (
              <div key={q.id} className="card border border-white/5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isCorrect ? "bg-green-500/20 text-green-400" : isWrong ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/50"
                  }`}>{idx + 1}</div>
                  <div className="text-sm text-white/80">{q.question}</div>
                </div>
                <div className="space-y-1.5 ml-9">
                  {q.options.map((opt, i) => (
                    <div key={i} className={`text-xs px-3 py-1.5 rounded-lg ${
                      i === q.correct ? "bg-green-500/15 text-green-400 border border-green-500/30" :
                      i === userAns && !isCorrect ? "bg-red-500/15 text-red-400 border border-red-500/30" :
                      "text-white/50"
                    }`}>
                      {String.fromCharCode(65 + i)}. {opt}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowExplanation(showExplanation === q.id ? null : q.id)}
                  className="ml-9 mt-3 text-xs text-gold-400 hover:text-gold-300"
                >
                  {showExplanation === q.id ? "Hide" : "Show"} Explanation
                </button>
                {showExplanation === q.id && (
                  <div className="ml-9 mt-2 text-xs text-white/60 bg-navy-900/60 rounded-lg p-3">{q.explanation}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Running Test View ──────────────────────────────────────────
  if (state === "running" && selectedTest && questions.length > 0) {
    const q = questions[currentIdx];
    const answered = Object.keys(answers).length;
    const total = questions.length;
    const isBookmarked = bookmarkedQuestions.includes(q.id);
    const isMarked = markedForReview.has(q.id);
    const timeColor = timeLeft < 300 ? "text-red-400" : timeLeft < 600 ? "text-yellow-400" : "text-white";

    return (
      <div className="space-y-4 animate-fade-in">
        {/* Top bar */}
        <div className="card flex flex-wrap items-center gap-3 py-3">
          <div className="text-sm font-semibold text-white flex-1 min-w-0 truncate">{selectedTest.title}</div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className={`font-mono font-bold flex items-center gap-1 ${timeColor}`}>
              <Clock size={15} /> {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-white/50">{answered}/{total}</div>
            <button onClick={submitTest} className="btn-gold text-xs py-1.5">Submit</button>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="card py-3">
          <div className="text-xs text-white/50 mb-2">Navigate Questions</div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, i) => {
              const qId = questions[i].id;
              const isAns = answers[qId] !== undefined;
              const isRev = markedForReview.has(qId);
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                    i === currentIdx ? "bg-gold-500 text-white" :
                    isRev ? "bg-orange-500/30 text-orange-400 border border-orange-500/40" :
                    isAns ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                    "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >{i + 1}</button>
              );
            })}
          </div>
          <div className="flex gap-3 mt-2 text-xs text-white/40">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30" /> Answered</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-500/20 border border-orange-500/30" /> Review</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-white/10" /> Not visited</span>
          </div>
        </div>

        {/* Question */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs text-white/40 mb-1 uppercase tracking-wide">{q.subject} · {q.topic}</div>
              <div className="text-sm font-medium text-white leading-relaxed">{q.question}</div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <button onClick={() => toggleBookmark(q.id)} title="Bookmark" className={`p-2 rounded-lg ${isBookmarked ? "text-gold-400 bg-gold-500/10" : "text-white/40 hover:bg-white/10"}`}>
                {isBookmarked ? <Bookmark size={15} /> : <BookmarkPlus size={15} />}
              </button>
              <button onClick={() => toggleReview(q.id)} title="Mark for review" className={`p-2 rounded-lg ${isMarked ? "text-orange-400 bg-orange-500/10" : "text-white/40 hover:bg-white/10"}`}>
                <Flag size={15} />
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all duration-150 ${
                    selected
                      ? "bg-gold-500/15 border-gold-500/50 text-white"
                      : "bg-navy-900/60 border-white/5 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              );
            })}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              disabled={currentIdx === 0}
              className="btn-outline flex items-center gap-1 disabled:opacity-30"
            >
              <ChevronLeft size={15} /> Prev
            </button>
            <span className="text-xs text-white/40">{currentIdx + 1} / {total}</span>
            <button
              onClick={() => setCurrentIdx((i) => Math.min(total - 1, i + 1))}
              disabled={currentIdx === total - 1}
              className="btn-outline flex items-center gap-1 disabled:opacity-30"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
