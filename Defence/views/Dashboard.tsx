"use client";
import { useEffect, useState } from "react";
import {
  Flame, Clock, Target, TrendingUp, Calendar, Award, AlertTriangle,
  CheckCircle, BookOpen, Zap, ArrowRight, Star, Shield,
} from "lucide-react";
import { ProgressRing, CountdownTimer, StatCard, ProgressBar, SectionHeading } from "@/components/ui";
import { useProgress } from "@/lib/store/progressStore";
import { cdsSyllabus, afcatSyllabus } from "@/lib/data/syllabus";
import { roadmapDays } from "@/lib/data/roadmap";
import { mockTests } from "@/lib/data/mockTests";
import { getGreeting, getRandomQuote, pct } from "@/lib/utils";

export default function Dashboard({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { name, exam, topicsCompleted, roadmapCompleted, testResults, totalStudyHours, streakDays, targetDate, updateStreak } = useProgress();

  useEffect(() => { updateStreak(); }, []);

  const quote = getRandomQuote(new Date().getDate());
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("defenceprep-user") || "{}") : {};
  const displayName = user.name || name;

  // Calculate totals
  const allTopics = [...cdsSyllabus, ...afcatSyllabus].flatMap((s) => s.topics);
  const cdsTopics = cdsSyllabus.flatMap((s) => s.topics);
  const afcatTopics = afcatSyllabus.flatMap((s) => s.topics);

  const totalTopics = allTopics.length;
  const completedTopics = topicsCompleted.length;
  const totalRoadmap = roadmapDays.length;
  const completedRoadmap = roadmapCompleted.length;

  const todayDayNumber = Math.min(completedRoadmap + 1, 180);
  const todayTasks = roadmapDays.find((d) => d.day === todayDayNumber);

  const recentTests = testResults.slice(0, 3);
  const avgScore = testResults.length
    ? Math.round(testResults.reduce((s, t) => s + pct(t.score, t.total), 0) / testResults.length)
    : 0;

  // Weak / strong subjects based on test results
  const subjectPerf: Record<string, { correct: number; total: number }> = {};
  testResults.forEach((t) => {
    Object.entries(t.subjectScores).forEach(([sub, v]) => {
      if (!subjectPerf[sub]) subjectPerf[sub] = { correct: 0, total: 0 };
      subjectPerf[sub].correct += v.correct;
      subjectPerf[sub].total += v.correct + v.wrong + v.unattempted;
    });
  });
  const subjectList = Object.entries(subjectPerf).map(([sub, v]) => ({ sub, pct: pct(v.correct, v.total) })).sort((a, b) => a.pct - b.pct);
  const weakSubjects = subjectList.slice(0, 3);
  const strongSubjects = [...subjectList].sort((a, b) => b.pct - a.pct).slice(0, 3);

  const daysToTarget = Math.max(0, Math.ceil((new Date(targetDate).getTime() - Date.now()) / 86400000));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-sm text-white/50">{getGreeting()},</div>
          <h1 className="text-3xl font-bold text-white">{displayName} 🎖</h1>
          <p className="text-sm text-white/50 mt-1">
            Day <span className="text-gold-400 font-semibold">{todayDayNumber}</span> of your 180-day mission
          </p>
        </div>
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-4">
          <div className="text-xs text-white/50 mb-2">Exam Countdown</div>
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>

      {/* Daily Quote */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gold-500/10 via-olive-500/10 to-navy-800 border border-gold-500/20 p-5">
        <div className="absolute top-0 right-0 w-32 h-full opacity-10">
          <Shield size={120} className="text-gold-400 absolute -right-4 -top-4" />
        </div>
        <div className="relative">
          <div className="text-xs text-gold-400 uppercase tracking-widest mb-2 font-semibold">🌟 Thought of the Day</div>
          <blockquote className="text-sm text-white/80 italic">"{quote.quote}"</blockquote>
          <cite className="text-xs text-gold-400 mt-2 block not-italic">— {quote.author}</cite>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Flame size={18} />} title="Day Streak" value={`${streakDays}🔥`} sub="consecutive days" accent="gold" />
        <StatCard icon={<Clock size={18} />} title="Study Hours" value={`${totalStudyHours.toFixed(1)}h`} sub="total logged" accent="blue" />
        <StatCard icon={<Target size={18} />} title="Avg Score" value={`${avgScore}%`} sub="mock tests" accent="green" />
        <StatCard icon={<Award size={18} />} title="Topics Done" value={`${completedTopics}/${totalTopics}`} sub="syllabus" accent="purple" />
      </div>

      {/* Progress Rings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card flex flex-col items-center gap-3 py-6">
          <ProgressRing progress={pct(completedTopics, totalTopics)} color="#e3a92e" sublabel="Syllabus" />
          <div className="text-center">
            <div className="text-sm font-semibold text-white">Overall Progress</div>
            <div className="text-xs text-white/50">{completedTopics} of {totalTopics} topics complete</div>
          </div>
        </div>
        <div className="card flex flex-col items-center gap-3 py-6">
          <ProgressRing progress={pct(cdsTopics.filter((t) => topicsCompleted.includes(t.id)).length, cdsTopics.length)} color="#22c55e" sublabel="CDS" />
          <div className="text-center">
            <div className="text-sm font-semibold text-white">CDS Preparation</div>
            <div className="text-xs text-white/50">{cdsTopics.filter((t) => topicsCompleted.includes(t.id)).length} of {cdsTopics.length} topics</div>
          </div>
        </div>
        <div className="card flex flex-col items-center gap-3 py-6">
          <ProgressRing progress={pct(completedRoadmap, totalRoadmap)} color="#06b6d4" sublabel="Roadmap" />
          <div className="text-center">
            <div className="text-sm font-semibold text-white">180-Day Roadmap</div>
            <div className="text-xs text-white/50">{completedRoadmap} of {totalRoadmap} days complete</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold text-white">Today's Mission</div>
              <div className="text-xs text-white/50">Day {todayDayNumber} of Roadmap</div>
            </div>
            <button onClick={() => onNavigate("roadmap")} className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
              View Roadmap <ArrowRight size={12} />
            </button>
          </div>
          {todayTasks ? (
            <div className="space-y-3">
              <div className="bg-navy-900/80 rounded-lg p-3">
                <div className="text-xs text-white/50 mb-1 uppercase tracking-wide">Phase {todayTasks.phase} · {todayTasks.phaseName}</div>
                <div className="space-y-1.5">
                  {todayTasks.topics.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Zap size={12} className="text-gold-400 flex-shrink-0" />
                      <span className="text-sm text-white/80">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-navy-900/60 rounded-lg p-2.5 text-center">
                  <div className="text-lg font-bold text-gold-400">{todayTasks.studyHours}h</div>
                  <div className="text-xs text-white/50">Study Time</div>
                </div>
                <div className="bg-navy-900/60 rounded-lg p-2.5 text-center">
                  <div className="text-lg font-bold text-blue-400">{todayTasks.practiceQuestions}</div>
                  <div className="text-xs text-white/50">Practice Qs</div>
                </div>
              </div>
              <div className="text-xs text-white/50 bg-navy-900/50 rounded-lg px-3 py-2">
                📝 Revision: {todayTasks.revisionTask}
              </div>
            </div>
          ) : (
            <div className="text-white/40 text-sm">All 180 days completed! 🎉</div>
          )}
        </div>

        {/* Weak / Strong Subjects */}
        <div className="card">
          <div className="font-semibold text-white mb-4">Subject Performance</div>
          {subjectList.length > 0 ? (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-red-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <AlertTriangle size={11} /> Needs Attention
                </div>
                <div className="space-y-2">
                  {weakSubjects.map((s) => (
                    <div key={s.sub}>
                      <div className="flex justify-between text-xs text-white/70 mb-1">
                        <span>{s.sub}</span><span className="text-red-400">{s.pct}%</span>
                      </div>
                      <ProgressBar value={s.pct} color="#ef4444" height={5} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-green-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Star size={11} /> Strong Areas
                </div>
                <div className="space-y-2">
                  {strongSubjects.map((s) => (
                    <div key={s.sub}>
                      <div className="flex justify-between text-xs text-white/70 mb-1">
                        <span>{s.sub}</span><span className="text-green-400">{s.pct}%</span>
                      </div>
                      <ProgressBar value={s.pct} color="#22c55e" height={5} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <BookOpen size={32} className="mx-auto text-white/20 mb-2" />
              <div className="text-sm text-white/40">Take a mock test to see performance insights</div>
              <button onClick={() => onNavigate("mocktests")} className="btn-gold mt-3 text-xs">Start Mock Test</button>
            </div>
          )}
        </div>

        {/* Recent Tests */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white">Recent Tests</div>
            <button onClick={() => onNavigate("analytics")} className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
              Analytics <ArrowRight size={12} />
            </button>
          </div>
          {recentTests.length > 0 ? (
            <div className="space-y-3">
              {recentTests.map((t, i) => {
                const score = pct(t.score, t.total);
                const mt = mockTests.find((m) => m.id === t.testId);
                return (
                  <div key={i} className="flex items-center gap-3 p-3 bg-navy-900/60 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                      score >= 70 ? "bg-green-500/20 text-green-400" : score >= 50 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                    }`}>{score}%</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{mt?.title ?? t.testId}</div>
                      <div className="text-xs text-white/40">{t.date} · {Math.floor(t.timeTaken / 60)}m {t.timeTaken % 60}s</div>
                    </div>
                    <ProgressBar value={score} color={score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444"} height={4} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-sm text-white/40">No tests taken yet</div>
              <button onClick={() => onNavigate("mocktests")} className="btn-gold mt-3 text-xs">Take First Test</button>
            </div>
          )}
        </div>

        {/* Upcoming Mock Tests */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white">Upcoming Tests</div>
            <button onClick={() => onNavigate("mocktests")} className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
              All Tests <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {mockTests.slice(0, 4).map((mt) => (
              <div key={mt.id} className="flex items-center gap-3 p-3 bg-navy-900/60 rounded-lg hover:bg-navy-900 transition-colors cursor-pointer" onClick={() => onNavigate("mocktests")}>
                <div className={`badge ${mt.exam === "CDS" ? "badge-blue" : mt.exam === "AFCAT" ? "badge-gold" : "badge-green"}`}>{mt.exam}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{mt.title}</div>
                  <div className="text-xs text-white/40">{mt.totalQuestions} Qs · {mt.duration} min</div>
                </div>
                <ArrowRight size={14} className="text-white/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
