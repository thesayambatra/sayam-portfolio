"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw, Plus, Trash2, Check, Clock, BookOpen } from "lucide-react";
import { useProgress } from "@/lib/store/progressStore";
import { SectionHeading } from "@/components/ui";
import { formatTime } from "@/lib/utils";

interface Task {
  id: string;
  text: string;
  done: boolean;
  subject: string;
  duration: number; // minutes
}

const SCHEDULE_TEMPLATES = {
  "3h": [
    { subject: "English", duration: 60, task: "Grammar & Vocabulary" },
    { subject: "General Knowledge", duration: 60, task: "History & Polity" },
    { subject: "Mathematics", duration: 60, task: "Arithmetic Practice" },
  ],
  "5h": [
    { subject: "English", duration: 60, task: "Grammar & Comprehension" },
    { subject: "Mathematics", duration: 90, task: "Algebra & Geometry" },
    { subject: "General Knowledge", duration: 60, task: "History, Geography & Polity" },
    { subject: "AFCAT / Reasoning", duration: 60, task: "Reasoning & Military Aptitude" },
    { subject: "Revision", duration: 30, task: "Quick revision of previous topics" },
  ],
  "8h": [
    { subject: "English", duration: 90, task: "Grammar, Vocabulary & Comprehension" },
    { subject: "Mathematics", duration: 120, task: "Full Math practice – Algebra to Statistics" },
    { subject: "General Knowledge", duration: 120, task: "History, Geography, Polity, Science" },
    { subject: "AFCAT Prep", duration: 60, task: "GA, Numerical Ability" },
    { subject: "Reasoning", duration: 60, task: "Verbal & Non-verbal Reasoning" },
    { subject: "PYQ Practice", duration: 30, task: "Previous year questions" },
    { subject: "Current Affairs", duration: 30, task: "News digest & defence updates" },
    { subject: "Revision", duration: 60, task: "Evening – full day revision" },
  ],
};

export default function Planner() {
  const { addStudySession, totalStudyHours } = useProgress();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newSubject, setNewSubject] = useState("English");
  const [newDuration, setNewDuration] = useState(30);
  const [selectedSchedule, setSelectedSchedule] = useState<"3h" | "5h" | "8h">("5h");

  // Pomodoro
  const [pomMode, setPomMode] = useState<"work" | "break">("work");
  const [pomSecs, setPomSecs] = useState(25 * 60);
  const [pomRunning, setPomRunning] = useState(false);
  const [pomCycle, setPomCycle] = useState(0);
  const pomRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (pomRunning) {
      pomRef.current = setInterval(() => {
        setPomSecs((s) => {
          if (s <= 1) {
            setPomRunning(false);
            const newMode = pomMode === "work" ? "break" : "work";
            setPomMode(newMode);
            if (pomMode === "work") {
              setPomCycle((c) => c + 1);
              addStudySession({ date: new Date().toISOString().split("T")[0], hours: 25 / 60, subject: "Pomodoro" });
            }
            return newMode === "work" ? 25 * 60 : (pomCycle + 1) % 4 === 0 ? 15 * 60 : 5 * 60;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (pomRef.current) clearInterval(pomRef.current);
    }
    return () => { if (pomRef.current) clearInterval(pomRef.current); };
  }, [pomRunning, pomMode, pomCycle]);

  const resetPomodoro = () => {
    setPomRunning(false);
    setPomMode("work");
    setPomSecs(25 * 60);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), text: newTask.trim(), done: false, subject: newSubject, duration: newDuration }]);
    setNewTask("");
  };

  const loadTemplate = (tpl: "3h" | "5h" | "8h") => {
    setSelectedSchedule(tpl);
    const tplTasks = SCHEDULE_TEMPLATES[tpl];
    setTasks(tplTasks.map((t, i) => ({ id: `tpl-${i}`, text: t.task, done: false, subject: t.subject, duration: t.duration })));
  };

  const toggleTask = (id: string) => setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const removeTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const completedTasks = tasks.filter((t) => t.done).length;
  const totalMins = tasks.reduce((s, t) => s + t.duration, 0);
  const doneMins = tasks.filter((t) => t.done).reduce((s, t) => s + t.duration, 0);

  const pomPct = pomMode === "work"
    ? ((25 * 60 - pomSecs) / (25 * 60)) * 100
    : ((5 * 60 - pomSecs) / (5 * 60)) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading title="Study Planner" sub="Manage your daily schedule, tasks, and Pomodoro timer." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pomodoro Timer */}
        <div className="card flex flex-col items-center gap-5 py-8">
          <div className="text-sm font-semibold text-white/60 uppercase tracking-widest">Pomodoro Timer</div>
          <div className="relative w-44 h-44">
            <svg className="timer-circle absolute" width="176" height="176">
              <circle cx="88" cy="88" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <circle cx="88" cy="88" r="80" stroke={pomMode === "work" ? "#e3a92e" : "#22c55e"} strokeWidth="8" fill="none"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - pomPct / 100)}
                strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-white font-mono">{formatTime(pomSecs)}</div>
              <div className={`text-xs uppercase tracking-widest mt-1 ${pomMode === "work" ? "text-gold-400" : "text-green-400"}`}>
                {pomMode === "work" ? "Focus" : "Break"}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setPomRunning(!pomRunning)} className={`w-11 h-11 rounded-full flex items-center justify-center ${pomRunning ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-gold-500/20 text-gold-400 hover:bg-gold-500/30"}`}>
              {pomRunning ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button onClick={resetPomodoro} className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60">
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="text-xs text-white/40">Cycles completed: {pomCycle}</div>
          <div className="text-xs text-white/40">Total hours logged: {totalStudyHours.toFixed(1)}h</div>
        </div>

        {/* Task List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Template selector */}
          <div className="card">
            <div className="text-sm font-semibold text-white mb-3">Load Schedule Template</div>
            <div className="grid grid-cols-3 gap-2">
              {(["3h", "5h", "8h"] as const).map((tpl) => (
                <button
                  key={tpl}
                  onClick={() => loadTemplate(tpl)}
                  className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                    selectedSchedule === tpl ? "bg-gold-500/20 border-gold-500 text-gold-400" : "border-white/10 text-white/60 hover:border-white/20"
                  }`}
                >
                  {tpl} Study
                </button>
              ))}
            </div>
            <div className="mt-3 text-xs text-white/40">
              Loaded {tasks.length} tasks · {Math.floor(totalMins / 60)}h {totalMins % 60}m total · {completedTasks}/{tasks.length} done
            </div>
          </div>

          {/* Add custom task */}
          <div className="card">
            <div className="text-sm font-semibold text-white mb-3">Add Custom Task</div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                className="input-field sm:col-span-2"
                placeholder="Task description..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <select className="input-field" value={newSubject} onChange={(e) => setNewSubject(e.target.value)}>
                {["English", "Mathematics", "General Knowledge", "Reasoning", "AFCAT Prep", "Revision"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input type="number" className="input-field w-20" value={newDuration} min={5} max={180} step={5} onChange={(e) => setNewDuration(+e.target.value)} />
                <button onClick={addTask} className="btn-gold flex items-center gap-1 px-3">
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Task list */}
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <div className="card text-center py-10 text-white/40">
                <BookOpen size={28} className="mx-auto mb-2" />
                Load a template or add tasks above
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  task.done ? "bg-navy-800/30 border-white/5 opacity-60" : "bg-navy-800 border-white/5 hover:border-white/10"
                }`}>
                  <button onClick={() => toggleTask(task.id)} className={task.done ? "text-green-400" : "text-white/30 hover:text-white/60"}>
                    {task.done ? <Check size={16} /> : <Circle size={16} />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm ${task.done ? "line-through text-white/40" : "text-white/80"}`}>{task.text}</span>
                    <div className="text-xs text-white/40 mt-0.5">{task.subject}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Clock size={11} /> {task.duration}m
                  </div>
                  <button onClick={() => removeTask(task.id)} className="text-white/20 hover:text-red-400 transition-colors ml-1">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Circle({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>;
}
