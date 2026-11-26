"use client";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from "recharts";
import { useProgress } from "@/lib/store/progressStore";
import { cdsSyllabus, afcatSyllabus } from "@/lib/data/syllabus";
import { mockTests } from "@/lib/data/mockTests";
import { SectionHeading, ProgressBar } from "@/components/ui";
import { pct, formatDate } from "@/lib/utils";
import { TrendingUp, Clock, Target, Award } from "lucide-react";

const COLORS = { CDS: "#4f8ef7", AFCAT: "#e3a92e", pass: "#22c55e", fail: "#ef4444" };

export default function Analytics() {
  const { testResults, topicsCompleted, studySessions, totalStudyHours } = useProgress();

  // Subject performance from test results
  const subjectPerf: Record<string, { correct: number; total: number }> = {};
  testResults.forEach((t) => {
    Object.entries(t.subjectScores).forEach(([sub, v]) => {
      if (!subjectPerf[sub]) subjectPerf[sub] = { correct: 0, total: 0 };
      subjectPerf[sub].correct += v.correct;
      subjectPerf[sub].total += v.correct + v.wrong + v.unattempted;
    });
  });
  const subjectData = Object.entries(subjectPerf).map(([sub, v]) => ({
    subject: sub.split(" ")[0], // Shorten label
    accuracy: pct(v.correct, v.total),
  }));

  // Test score trend (last 10)
  const trendData = testResults.slice(0, 10).reverse().map((t, i) => ({
    name: `T${i + 1}`,
    score: pct(t.score, t.total),
    date: t.date,
  }));

  // Weekly study hours (last 7 days)
  const today = new Date();
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    const hours = studySessions.filter((s) => s.date === dateStr).reduce((a, s) => a + s.hours, 0);
    return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()], hours: +hours.toFixed(1) };
  });

  // Syllabus completion per subject
  const allSubjects = [...cdsSyllabus, ...afcatSyllabus];
  const syllabusData = allSubjects.map((s) => {
    const done = s.topics.filter((t) => topicsCompleted.includes(t.id)).length;
    return { subject: s.subject.split(" ")[0], completion: pct(done, s.topics.length) };
  });

  const avgScore = testResults.length ? Math.round(testResults.reduce((s, t) => s + pct(t.score, t.total), 0) / testResults.length) : 0;
  const avgTime = testResults.length ? Math.round(testResults.reduce((s, t) => s + t.timeTaken, 0) / testResults.length / 60) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading title="Performance Analytics" sub="Deep dive into your test scores, accuracy, study patterns and progress." />

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Award, title: "Avg Score", value: `${avgScore}%`, sub: `${testResults.length} tests`, accent: "gold" as const },
          { icon: Clock, title: "Avg Time/Test", value: `${avgTime}m`, sub: "per mock test", accent: "blue" as const },
          { icon: TrendingUp, title: "Study Hours", value: `${totalStudyHours.toFixed(1)}h`, sub: "total logged", accent: "green" as const },
          { icon: Target, title: "Topics Done", value: topicsCompleted.length, sub: "syllabus items", accent: "purple" as const },
        ].map((s) => (
          <div key={s.title} className="card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              s.accent === "gold" ? "bg-gold-500/10" : s.accent === "blue" ? "bg-blue-500/10" : s.accent === "green" ? "bg-green-500/10" : "bg-purple-500/10"
            }`}>
              <s.icon size={18} className={
                s.accent === "gold" ? "text-gold-400" : s.accent === "blue" ? "text-blue-400" : s.accent === "green" ? "text-green-400" : "text-purple-400"
              } />
            </div>
            <div>
              <div className="text-xs text-white/50">{s.title}</div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/40">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {testResults.length === 0 ? (
        <div className="card text-center py-16">
          <TrendingUp size={40} className="mx-auto text-white/20 mb-4" />
          <div className="text-white/50">No test data yet. Take a mock test to see analytics.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Trend */}
          {trendData.length > 1 && (
            <div className="card">
              <div className="font-semibold text-white mb-4">Score Trend</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} />
                  <Tooltip contentStyle={{ background: "#12233a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} itemStyle={{ color: "#e3a92e" }} />
                  <Line type="monotone" dataKey="score" stroke="#e3a92e" strokeWidth={2} dot={{ fill: "#e3a92e", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Weekly Study Hours */}
          <div className="card">
            <div className="font-semibold text-white mb-4">Study Hours (Last 7 Days)</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} />
                <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} />
                <Tooltip contentStyle={{ background: "#12233a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} itemStyle={{ color: "#22c55e" }} />
                <Bar dataKey="hours" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Subject Accuracy */}
          {subjectData.length > 0 && (
            <div className="card">
              <div className="font-semibold text-white mb-4">Subject-wise Accuracy</div>
              <div className="space-y-3">
                {subjectData.sort((a, b) => a.accuracy - b.accuracy).map((s) => (
                  <div key={s.subject}>
                    <div className="flex justify-between text-xs text-white/60 mb-1">
                      <span>{s.subject}</span>
                      <span className={s.accuracy >= 70 ? "text-green-400" : s.accuracy >= 50 ? "text-yellow-400" : "text-red-400"}>{s.accuracy}%</span>
                    </div>
                    <ProgressBar value={s.accuracy} color={s.accuracy >= 70 ? "#22c55e" : s.accuracy >= 50 ? "#f59e0b" : "#ef4444"} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Syllabus Completion */}
          <div className="card">
            <div className="font-semibold text-white mb-4">Syllabus Completion</div>
            <div className="space-y-3">
              {syllabusData.map((s) => (
                <div key={s.subject}>
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>{s.subject}</span><span className="text-gold-400">{s.completion}%</span>
                  </div>
                  <ProgressBar value={s.completion} color="#e3a92e" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Test History Table */}
      {testResults.length > 0 && (
        <div className="card">
          <div className="font-semibold text-white mb-4">Test History</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-white/40 border-b border-white/5">
                  <th className="text-left pb-2 font-medium">Test</th>
                  <th className="text-center pb-2 font-medium">Date</th>
                  <th className="text-center pb-2 font-medium">Score</th>
                  <th className="text-center pb-2 font-medium">%</th>
                  <th className="text-center pb-2 font-medium">Time</th>
                  <th className="text-center pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {testResults.map((t, i) => {
                  const mt = mockTests.find((m) => m.id === t.testId);
                  const sc = pct(t.score, t.total);
                  return (
                    <tr key={i} className="hover:bg-white/2">
                      <td className="py-2.5 text-white/80">{mt?.title ?? t.testId}</td>
                      <td className="py-2.5 text-center text-white/50">{t.date}</td>
                      <td className="py-2.5 text-center text-white">{t.score}/{t.total}</td>
                      <td className="py-2.5 text-center">
                        <span className={sc >= 70 ? "text-green-400" : sc >= 50 ? "text-yellow-400" : "text-red-400"}>{sc}%</span>
                      </td>
                      <td className="py-2.5 text-center text-white/50">{Math.floor(t.timeTaken / 60)}m {t.timeTaken % 60}s</td>
                      <td className="py-2.5 text-center">
                        <span className={`badge ${sc >= 70 ? "badge-green" : sc >= 50 ? "badge-gold" : "badge-red"}`}>{sc >= 70 ? "Pass" : sc >= 50 ? "Average" : "Fail"}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
