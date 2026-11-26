"use client";
import { useState } from "react";
import { Brain, MessageSquare, Users, Mic, ChevronRight, ChevronDown, Zap, Star } from "lucide-react";
import { ssbTests, lecturettteTopics, gdTopics } from "@/lib/data/ssbPrep";
import { SectionHeading } from "@/components/ui";

const aiQuestions = [
  "Tell me about yourself in 2 minutes.",
  "Why do you want to join the Indian Armed Forces?",
  "What is your biggest strength and weakness?",
  "Describe a situation where you showed leadership.",
  "How do you handle failure and setbacks?",
  "What do you know about the current defence scenario of India?",
  "Describe a time when you resolved a conflict.",
  "Where do you see yourself in 10 years?",
  "What are the core values of the Indian Army/Air Force?",
  "Why should we select you over other candidates?",
];

const olqs = [
  { name: "Effective Intelligence", desc: "Ability to understand problems and find practical solutions quickly." },
  { name: "Reasoning Ability", desc: "Logical and systematic thinking to arrive at correct conclusions." },
  { name: "Organising Ability", desc: "Planning, coordinating and managing resources and people efficiently." },
  { name: "Power of Expression", desc: "Communicating ideas clearly and effectively verbally and in writing." },
  { name: "Social Adaptability", desc: "Ability to mix and work with diverse groups of people." },
  { name: "Cooperation", desc: "Working harmoniously with others towards a common goal." },
  { name: "Sense of Responsibility", desc: "Taking ownership of tasks and being reliable and dependable." },
  { name: "Initiative", desc: "Taking action independently without waiting for instructions." },
  { name: "Self-Confidence", desc: "Believing in your own abilities while remaining open to feedback." },
  { name: "Speed of Decision", desc: "Making timely and effective decisions under pressure." },
  { name: "Ability to Influence Group", desc: "Motivating and persuading others to follow your lead." },
  { name: "Liveliness", desc: "Showing energy, enthusiasm and a positive attitude." },
  { name: "Determination", desc: "Persisting through obstacles to achieve goals." },
  { name: "Courage", desc: "Acting rightly despite risk or difficulty." },
  { name: "Stamina", desc: "Physical and mental endurance to sustain performance over time." },
];

export default function SSB() {
  const [tab, setTab] = useState<"tests" | "interview" | "olq" | "lecturette" | "gd">("tests");
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [aiQ, setAiQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [showOLQ, setShowOLQ] = useState<string | null>(null);

  const generateFeedback = () => {
    if (!userAnswer.trim()) { setAiFeedback("Please type your answer first."); return; }
    const len = userAnswer.trim().split(/\s+/).length;
    const feedback = [];
    if (len < 30) feedback.push("❌ Answer is too brief. Aim for at least 2–3 minutes of speech (100–150 words minimum).");
    else feedback.push("✅ Length is appropriate.");
    if (userAnswer.includes("I") && userAnswer.includes("because")) feedback.push("✅ You are providing reasoning for your statements.");
    if (!userAnswer.toLowerCase().includes("example") && !userAnswer.includes("for instance")) feedback.push("⚠️ Consider including a concrete example or personal experience.");
    if (userAnswer.split(".").length > 3) feedback.push("✅ Well-structured with multiple points.");
    feedback.push("💡 Tip: Speak clearly, make eye contact, and demonstrate Officer Like Qualities (OLQs) in your answer.");
    setAiFeedback(feedback.join("\n"));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading title="SSB / AFSB Interview Preparation" sub="Complete preparation for Service Selection Board & Air Force Selection Board." />

      <div className="flex flex-wrap gap-2">
        {[
          { id: "tests", label: "Psychological Tests" },
          { id: "interview", label: "Personal Interview" },
          { id: "olq", label: "OLQs" },
          { id: "lecturette", label: "Lecturette" },
          { id: "gd", label: "Group Discussion" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-gold-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "tests" && (
        <div className="space-y-4">
          <div className="bg-olive-500/10 border border-olive-500/20 rounded-xl p-4 text-sm text-olive-300">
            The SSB process spans 5 days. It tests your Officer Like Qualities (OLQs) through psychological, group and interview tasks. Click each test to learn more.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ssbTests.map((test) => {
              const isOpen = selectedTest === test.id;
              return (
                <div key={test.id} className="card border border-white/5 overflow-hidden">
                  <button className="w-full flex items-center gap-3 text-left" onClick={() => setSelectedTest(isOpen ? null : test.id)}>
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <Brain size={18} className="text-gold-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{test.name}</div>
                      <div className="text-xs text-white/50">{test.fullName} · {test.category}</div>
                    </div>
                    {isOpen ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
                  </button>
                  {isOpen && (
                    <div className="mt-3 border-t border-white/5 pt-3 space-y-3">
                      <p className="text-sm text-white/60">{test.description}</p>
                      <div>
                        <div className="text-xs text-gold-400 font-semibold uppercase tracking-wide mb-2">Tips for Success</div>
                        <div className="space-y-1">
                          {test.tips.map((tip, i) => (
                            <div key={i} className="text-xs text-white/60 flex gap-2">
                              <Zap size={11} className="text-gold-400 flex-shrink-0 mt-0.5" /> {tip}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "interview" && (
        <div className="space-y-4">
          <div className="card border border-gold-500/20 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center">
                <Mic size={18} className="text-gold-400" />
              </div>
              <div>
                <div className="font-semibold text-white">AI Mock Interview</div>
                <div className="text-xs text-white/50">Practice your answers. Get instant feedback on structure and content.</div>
              </div>
            </div>

            <div className="bg-navy-900/60 rounded-xl p-4 mb-4">
              <div className="text-xs text-white/40 mb-1 uppercase tracking-wide">Question {aiQ + 1} of {aiQuestions.length}</div>
              <div className="text-sm font-medium text-white leading-relaxed">{aiQuestions[aiQ]}</div>
            </div>

            <textarea
              className="input-field w-full h-28 resize-none mb-3"
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => { setUserAnswer(e.target.value); setAiFeedback(""); }}
            />

            {aiFeedback && (
              <div className="bg-navy-900/60 border border-white/10 rounded-xl p-4 mb-4 space-y-1.5">
                <div className="text-xs font-semibold text-gold-400 uppercase tracking-wide mb-2">AI Feedback</div>
                {aiFeedback.split("\n").map((line, i) => (
                  <div key={i} className="text-xs text-white/60">{line}</div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={generateFeedback} className="btn-gold flex-1">Get Feedback</button>
              <button onClick={() => { setAiQ((q) => (q + 1) % aiQuestions.length); setUserAnswer(""); setAiFeedback(""); }} className="btn-outline">Next Q</button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">All Practice Questions</div>
            {aiQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => { setAiQ(i); setUserAnswer(""); setAiFeedback(""); }}
                className={`w-full text-left p-3 rounded-xl text-sm border transition-all ${aiQ === i ? "bg-gold-500/10 border-gold-500/30 text-white" : "bg-navy-800/50 border-white/5 text-white/60 hover:border-white/15"}`}
              >
                <span className="text-xs text-white/30 mr-2">{i + 1}.</span>{q}
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === "olq" && (
        <div className="space-y-3">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
            There are <strong>15 Officer Like Qualities (OLQs)</strong> that the SSB assesses. Demonstrate these qualities across all tests and interactions.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {olqs.map((olq, i) => {
              const isOpen = showOLQ === olq.name;
              return (
                <button
                  key={i}
                  onClick={() => setShowOLQ(isOpen ? null : olq.name)}
                  className="card border border-white/5 hover:border-white/10 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-gold-500/15 flex items-center justify-center text-xs font-bold text-gold-400">{i + 1}</div>
                    <span className="font-medium text-white text-sm flex-1">{olq.name}</span>
                    {isOpen ? <ChevronDown size={14} className="text-white/40" /> : <ChevronRight size={14} className="text-white/40" />}
                  </div>
                  {isOpen && <div className="mt-2 text-xs text-white/50 pl-10">{olq.desc}</div>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {tab === "lecturette" && (
        <div className="space-y-4">
          <div className="bg-olive-500/10 border border-olive-500/20 rounded-xl p-4 text-sm text-olive-300">
            In the Lecturette, you get a card with 4 topics. Choose one and speak for <strong>3 minutes</strong>. Prepare on a wide range of current affairs and national issues.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lecturettteTopics.map((topic, i) => (
              <div key={i} className="card border border-white/5 hover:border-white/10 transition-all flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center text-xs font-bold text-blue-400">{i + 1}</div>
                <span className="text-sm text-white/80">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "gd" && (
        <div className="space-y-4">
          <div className="bg-olive-500/10 border border-olive-500/20 rounded-xl p-4 text-sm text-olive-300">
            In Group Discussion, you are assessed on communication, leadership, logical reasoning and ability to contribute constructively to the group. Avoid dominating or being passive.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gdTopics.map((topic, i) => (
              <div key={i} className="card border border-white/5 hover:border-white/10 transition-all flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center text-xs font-bold text-purple-400">{i + 1}</div>
                <span className="text-sm text-white/80">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
