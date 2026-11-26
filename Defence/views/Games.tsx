"use client";
import { useState, useEffect, useCallback } from "react";
import { RotateCcw, ChevronRight, Gamepad2, Zap, Trophy, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui";

// ── Flashcard data ─────────────────────────────────────────────
const FLASHCARDS = [
  { q: "What does AFCAT stand for?", a: "Air Force Common Admission Test" },
  { q: "What does CDS stand for?", a: "Combined Defence Services" },
  { q: "Who is the Supreme Commander of the Indian Armed Forces?", a: "President of India" },
  { q: "When was the Indian Air Force established?", a: "8 October 1932" },
  { q: "What is the motto of the Indian Air Force?", a: "Touch the Sky with Glory (Nabha Sparsham Diptam)" },
  { q: "What is the motto of the Indian Army?", a: "Service Before Self" },
  { q: "What is the motto of the Indian Navy?", a: "Sam No Varunah" },
  { q: "Which is the highest military honour in India?", a: "Param Vir Chakra" },
  { q: "What is Agniveer Scheme also known as?", a: "Agnipath Scheme" },
  { q: "Where is the SSB (Services Selection Board) headquartered?", a: "Allahabad (Prayagraj)" },
  { q: "Full form of UPSC", a: "Union Public Service Commission" },
  { q: "What is the duration of AFCAT exam?", a: "2 hours (120 minutes)" },
  { q: "CDS exam is conducted how many times a year?", a: "Twice a year" },
  { q: "What is Mach 1?", a: "Speed of sound (~343 m/s or ~1235 km/h)" },
  { q: "Full form of ATC in aviation?", a: "Air Traffic Control" },
  { q: "What does IAF's Sukhoi Su-30MKI stand for?", a: "Modernizirovanniy Kommercheskiy India (Modernised Commercial India)" },
  { q: "India's first indigenously built aircraft carrier?", a: "INS Vikrant (IAC-1)" },
  { q: "Exercise SHAKTI is held between?", a: "India and France" },
  { q: "Exercise MALABAR involves which nations?", a: "India, USA, Japan" },
  { q: "What is Operation Sindoor?", a: "IAF precision strike on terror camps across the border" },
];

// ── Quiz questions ─────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  { q: "The Indian Air Force was established in:", options: ["1930", "1932", "1935", "1947"], correct: 1 },
  { q: "Who is the Supreme Commander of Indian Armed Forces?", options: ["PM of India", "President of India", "Chief of Defence Staff", "Army Chief"], correct: 1 },
  { q: "Exercise INDRA is a military exercise between India and:", options: ["USA", "France", "Russia", "China"], correct: 2 },
  { q: "Full form of AFCAT:", options: ["Air Force Cadet Admission Test", "Air Force Common Admission Test", "Armed Forces Common Aptitude Test", "Air Force Command Aptitude Test"], correct: 1 },
  { q: "INS Vikrant is India's:", options: ["Submarine", "Destroyer", "Aircraft Carrier", "Frigate"], correct: 2 },
  { q: "Param Vir Chakra is awarded for:", options: ["Peacetime gallantry", "Wartime gallantry", "Excellence in service", "Best cadet award"], correct: 1 },
  { q: "CDS exam is conducted by:", options: ["Ministry of Defence", "UPSC", "DRDO", "NDA"], correct: 1 },
  { q: "Exercise MALABAR involves:", options: ["India-USA", "India-France-USA", "India-USA-Japan", "India-Australia-USA"], correct: 2 },
  { q: "The motto of the Indian Air Force is:", options: ["Service Before Self", "Nabha Sparsham Diptam", "Sam No Varunah", "Jai Hind"], correct: 1 },
  { q: "What is Mach 2?", options: ["Twice speed of light", "Twice speed of sound", "2000 km/h exactly", "Speed of fastest jet"], correct: 1 },
];

// ── Word scramble ──────────────────────────────────────────────
const SCRAMBLE_WORDS = [
  { word: "STRATEGY", hint: "A plan of action to achieve a goal" },
  { word: "TACTICAL", hint: "Related to small-scale military maneuvers" },
  { word: "SQUADRON", hint: "A unit of military aircraft" },
  { word: "INFANTRY", hint: "Soldiers who fight on foot" },
  { word: "ARTILLERY", hint: "Large-calibre guns used in warfare" },
  { word: "RECONNAISSANCE", hint: "Military observation of a region" },
  { word: "BATTALION", hint: "A large body of troops" },
  { word: "FORMATION", hint: "An arrangement of troops or aircraft" },
  { word: "SOVEREIGN", hint: "A person or nation that holds supreme power" },
  { word: "LOGISTICS", hint: "Planning and managing military supplies" },
];

function scramble(word: string) {
  const a = word.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.join("") === word ? scramble(word) : a.join("");
}

// ════════════════════════════════════════════════════════════════
export default function Games() {
  const [game, setGame] = useState<"menu" | "flashcard" | "quiz" | "scramble">("menu");

  if (game === "flashcard") return <FlashcardGame onBack={() => setGame("menu")} />;
  if (game === "quiz")      return <QuizGame      onBack={() => setGame("menu")} />;
  if (game === "scramble")  return <ScrambleGame  onBack={() => setGame("menu")} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading title="Mind Games" sub="Learn while you play — sharpen your GK, vocab and defence knowledge." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            id: "flashcard", emoji: "🃏", title: "Flashcards",
            desc: "Flip cards to test your defence knowledge — terms, facts, and key concepts.",
            color: "#4ade80", stats: `${FLASHCARDS.length} cards`,
          },
          {
            id: "quiz", emoji: "⚡", title: "Quick Fire Quiz",
            desc: "10 seconds per question. Test your GK under pressure — just like the real exam.",
            color: "#facc15", stats: `${QUIZ_QUESTIONS.length} questions`,
          },
          {
            id: "scramble", emoji: "🔤", title: "Word Scramble",
            desc: "Unscramble military and defence vocabulary to build your word power.",
            color: "#a78bfa", stats: `${SCRAMBLE_WORDS.length} words`,
          },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => setGame(g.id as any)}
            className="rounded-2xl p-6 text-left transition-all hover:scale-[1.02] group"
            style={{ background: "#0d1424", border: `1px solid ${g.color}30` }}
          >
            <div className="text-4xl mb-4">{g.emoji}</div>
            <div className="text-lg font-bold text-white mb-1">{g.title}</div>
            <div className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{g.desc}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded-md" style={{ background: `${g.color}15`, color: g.color }}>{g.stats}</span>
              <span className="text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: g.color }}>
                Play <ChevronRight size={15} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Quick tips */}
      <div className="rounded-xl p-5" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><Zap size={15} style={{ color: "#facc15" }} /> Why Play?</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
          <div>🧠 <strong className="text-white">Active Recall</strong> — Games force your brain to retrieve information, making it stick 2x longer than passive reading.</div>
          <div>⏱ <strong className="text-white">Time Pressure</strong> — The quiz simulates exam conditions, training you to think fast and accurately.</div>
          <div>🎯 <strong className="text-white">Vocabulary</strong> — Defence vocab in scramble directly appears in AFCAT verbal section.</div>
        </div>
      </div>
    </div>
  );
}

// ── Flashcard Game ─────────────────────────────────────────────
function FlashcardGame({ onBack }: { onBack: () => void }) {
  const [idx, setIdx]       = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown]   = useState<number[]>([]);
  const [unknown, setUnknown] = useState<number[]>([]);

  const card = FLASHCARDS[idx];
  const remaining = FLASHCARDS.length - known.length - unknown.length;

  const next = (result: "known" | "unknown") => {
    if (result === "known") setKnown((p) => [...p, idx]);
    else setUnknown((p) => [...p, idx]);
    setFlipped(false);
    setTimeout(() => setIdx((i) => Math.min(i + 1, FLASHCARDS.length - 1)), 150);
  };

  const reset = () => { setIdx(0); setFlipped(false); setKnown([]); setUnknown([]); };

  const finished = idx >= FLASHCARDS.length - 1 && (known.includes(idx) || unknown.includes(idx));

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>← Back</button>
        <div className="text-lg font-bold text-white">🃏 Flashcards</div>
        <div className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{idx + 1} / {FLASHCARDS.length}</div>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {FLASHCARDS.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full" style={{
            background: known.includes(i) ? "#4ade80" : unknown.includes(i) ? "#ef4444" : i === idx ? "#facc15" : "rgba(255,255,255,0.1)"
          }} />
        ))}
      </div>

      {finished ? (
        <div className="rounded-2xl p-8 text-center" style={{ background: "#0d1424", border: "1px solid rgba(74,222,128,0.3)" }}>
          <div className="text-4xl mb-4">🎉</div>
          <div className="text-xl font-bold text-white mb-2">Session Complete!</div>
          <div className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            ✅ Known: <strong style={{ color: "#4ade80" }}>{known.length}</strong> &nbsp;|&nbsp;
            ❌ Review: <strong style={{ color: "#ef4444" }}>{unknown.length}</strong>
          </div>
          <button onClick={reset} className="px-6 py-2.5 rounded-lg font-semibold text-sm" style={{ background: "#4ade80", color: "#0a1a0e" }}>
            <RotateCcw size={14} className="inline mr-2" />Play Again
          </button>
        </div>
      ) : (
        <>
          {/* Card */}
          <div
            onClick={() => setFlipped((f) => !f)}
            className="rounded-2xl p-8 text-center cursor-pointer transition-all min-h-[220px] flex flex-col items-center justify-center"
            style={{ background: flipped ? "rgba(74,222,128,0.07)" : "#0d1424", border: `1px solid ${flipped ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)"}` }}
          >
            <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              {flipped ? "Answer" : "Question — tap to reveal"}
            </div>
            <div className="text-lg font-semibold leading-relaxed" style={{ color: flipped ? "#4ade80" : "rgba(255,255,255,0.9)" }}>
              {flipped ? card.a : card.q}
            </div>
          </div>

          {/* Action buttons */}
          {flipped && (
            <div className="flex gap-3">
              <button onClick={() => next("unknown")} className="flex-1 py-3 rounded-xl font-semibold text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                ❌ Need Review
              </button>
              <button onClick={() => next("known")} className="flex-1 py-3 rounded-xl font-semibold text-sm" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>
                ✅ I Know This
              </button>
            </div>
          )}

          <div className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Tap the card to flip · {remaining} cards remaining</div>
        </>
      )}
    </div>
  );
}

// ── Quick Fire Quiz ────────────────────────────────────────────
function QuizGame({ onBack }: { onBack: () => void }) {
  const [idx, setIdx]       = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [done, setDone]     = useState(false);
  const [results, setResults] = useState<{ correct: boolean; selected: number | null }[]>([]);

  const q = QUIZ_QUESTIONS[idx];

  useEffect(() => {
    if (done || selected !== null) return;
    setTimeLeft(10);
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          handleAnswer(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [idx, done, selected]);

  const handleAnswer = (opt: number | null) => {
    setSelected(opt);
    const correct = opt === q.correct;
    if (correct) setScore((s) => s + 1);
    setResults((r) => [...r, { correct, selected: opt }]);
    setTimeout(() => {
      if (idx + 1 >= QUIZ_QUESTIONS.length) { setDone(true); return; }
      setIdx((i) => i + 1);
      setSelected(null);
    }, 1000);
  };

  const reset = () => { setIdx(0); setSelected(null); setScore(0); setTimeLeft(10); setDone(false); setResults([]); };

  if (done) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>← Back</button>
          <div className="text-lg font-bold text-white">⚡ Quick Fire Quiz</div>
        </div>
        <div className="rounded-2xl p-8 text-center" style={{ background: "#0d1424", border: `1px solid ${pct >= 70 ? "rgba(74,222,128,0.4)" : pct >= 50 ? "rgba(250,204,21,0.4)" : "rgba(239,68,68,0.4)"}` }}>
          <Trophy size={40} className="mx-auto mb-4" style={{ color: pct >= 70 ? "#4ade80" : pct >= 50 ? "#facc15" : "#ef4444" }} />
          <div className="text-4xl font-black text-white mb-1">{score}/{QUIZ_QUESTIONS.length}</div>
          <div className="text-lg font-semibold mb-2" style={{ color: pct >= 70 ? "#4ade80" : pct >= 50 ? "#facc15" : "#ef4444" }}>
            {pct >= 70 ? "Excellent! 🎖" : pct >= 50 ? "Good effort! 💪" : "Keep practising! 📚"}
          </div>
          <div className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>Score: {pct}%</div>
          <button onClick={reset} className="px-6 py-2.5 rounded-lg font-semibold text-sm mr-3" style={{ background: "#4ade80", color: "#0a1a0e" }}>
            <RotateCcw size={14} className="inline mr-2" />Try Again
          </button>
          <button onClick={onBack} className="px-6 py-2.5 rounded-lg font-semibold text-sm" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>← Back</button>
        <div className="text-lg font-bold text-white">⚡ Quick Fire Quiz</div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Q {idx + 1}/{QUIZ_QUESTIONS.length}</span>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ background: timeLeft <= 3 ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)", color: timeLeft <= 3 ? "#ef4444" : "#facc15" }}>
            <Clock size={13} /> {timeLeft}s
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="rounded-full overflow-hidden h-2" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div className="h-full rounded-full transition-all"
          style={{ width: `${(timeLeft / 10) * 100}%`, background: timeLeft <= 3 ? "#ef4444" : "#facc15", transition: "width 1s linear" }} />
      </div>

      {/* Question */}
      <div className="rounded-xl p-6" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="text-base font-semibold text-white leading-relaxed">{q.q}</div>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {q.options.map((opt, i) => {
          let borderColor = "rgba(255,255,255,0.08)";
          let bgColor = "#0d1424";
          let textColor = "rgba(255,255,255,0.75)";
          if (selected !== null) {
            if (i === q.correct) { bgColor = "rgba(74,222,128,0.1)"; borderColor = "rgba(74,222,128,0.5)"; textColor = "#4ade80"; }
            else if (i === selected) { bgColor = "rgba(239,68,68,0.1)"; borderColor = "rgba(239,68,68,0.5)"; textColor = "#ef4444"; }
          }
          return (
            <button key={i} onClick={() => selected === null && handleAnswer(i)}
              disabled={selected !== null}
              className="w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium"
              style={{ background: bgColor, border: `1px solid ${borderColor}`, color: textColor }}>
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Word Scramble ──────────────────────────────────────────────
function ScrambleGame({ onBack }: { onBack: () => void }) {
  const [idx, setIdx]     = useState(0);
  const [input, setInput] = useState("");
  const [scrambled, setScrambled] = useState(() => scramble(SCRAMBLE_WORDS[0].word));
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone]   = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const current = SCRAMBLE_WORDS[idx];

  const check = () => {
    if (input.trim().toUpperCase() === current.word) {
      setResult("correct");
      setScore((s) => s + (hintUsed ? 0.5 : 1));
      setTimeout(advance, 800);
    } else {
      setResult("wrong");
    }
  };

  const advance = () => {
    const next = idx + 1;
    if (next >= SCRAMBLE_WORDS.length) { setDone(true); return; }
    setIdx(next);
    setInput("");
    setResult(null);
    setHintUsed(false);
    setScrambled(scramble(SCRAMBLE_WORDS[next].word));
  };

  const skip = () => { setResult(null); advance(); };
  const reset = () => { setIdx(0); setInput(""); setResult(null); setScore(0); setDone(false); setHintUsed(false); setScrambled(scramble(SCRAMBLE_WORDS[0].word)); };

  if (done) {
    return (
      <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>← Back</button>
          <div className="text-lg font-bold text-white">🔤 Word Scramble</div>
        </div>
        <div className="rounded-2xl p-8 text-center" style={{ background: "#0d1424", border: "1px solid rgba(167,139,250,0.4)" }}>
          <div className="text-4xl mb-4">🎉</div>
          <div className="text-2xl font-black text-white mb-2">Score: {score}/{SCRAMBLE_WORDS.length}</div>
          <div className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>Half point for hints used</div>
          <button onClick={reset} className="px-6 py-2.5 rounded-lg font-semibold text-sm" style={{ background: "#a78bfa", color: "#fff" }}>
            <RotateCcw size={14} className="inline mr-2" />Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>← Back</button>
        <div className="text-lg font-bold text-white">🔤 Word Scramble</div>
        <div className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Word {idx + 1}/{SCRAMBLE_WORDS.length} · Score: {score}</div>
      </div>

      <div className="rounded-2xl p-8 text-center" style={{ background: "#0d1424", border: "1px solid rgba(167,139,250,0.3)" }}>
        <div className="text-xs mb-3 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Unscramble this word</div>
        <div className="text-4xl font-black tracking-[0.3em] mb-6" style={{ color: "#a78bfa" }}>{scrambled}</div>

        {hintUsed && (
          <div className="text-xs mb-4 px-3 py-2 rounded-lg inline-block" style={{ background: "rgba(250,204,21,0.1)", color: "#facc15", border: "1px solid rgba(250,204,21,0.2)" }}>
            💡 Hint: {current.hint}
          </div>
        )}

        <div className="flex gap-2 max-w-xs mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value.toUpperCase()); setResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="Type your answer..."
            className="flex-1 rounded-lg px-3 py-2.5 text-sm text-white text-center uppercase tracking-wider outline-none"
            style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${result === "correct" ? "rgba(74,222,128,0.5)" : result === "wrong" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}` }}
          />
          <button onClick={check} className="px-4 py-2.5 rounded-lg font-semibold text-sm" style={{ background: "#a78bfa", color: "#fff" }}>Go</button>
        </div>

        {result === "wrong" && (
          <div className="mt-3 text-xs" style={{ color: "#ef4444" }}>Not quite — try again!</div>
        )}
        {result === "correct" && (
          <div className="mt-3 text-sm font-bold" style={{ color: "#4ade80" }}>✅ Correct!</div>
        )}
      </div>

      <div className="flex gap-3 justify-center">
        {!hintUsed && (
          <button onClick={() => setHintUsed(true)} className="text-xs px-4 py-2 rounded-lg" style={{ background: "rgba(250,204,21,0.1)", color: "#facc15", border: "1px solid rgba(250,204,21,0.2)" }}>
            💡 Use Hint (-0.5 pts)
          </button>
        )}
        <button onClick={skip} className="text-xs px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
          Skip →
        </button>
      </div>
    </div>
  );
}
