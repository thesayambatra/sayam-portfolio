"use client";
import { ReactNode, useEffect, useState } from "react";

// ---------- Progress Ring ----------
export function ProgressRing({ progress, size = 120, stroke = 10, color = "#e3a92e", label, sublabel }: {
  progress: number; size?: number; stroke?: number; color?: string; label?: string; sublabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="timer-circle">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{label ?? `${Math.round(progress)}%`}</span>
        {sublabel && <span className="text-xs text-white/50">{sublabel}</span>}
      </div>
    </div>
  );
}

// ---------- Countdown Timer ----------
export function CountdownTimer({ targetDate, compact }: { targetDate: string; compact?: boolean }) {
  const target = new Date(targetDate).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  if (compact) {
    return <span className="font-mono text-sm text-gold-400">{days}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s</span>;
  }
  return (
    <div className="grid grid-cols-4 gap-2">
      {[
        { v: days, l: "Days" },
        { v: hours, l: "Hours" },
        { v: minutes, l: "Mins" },
        { v: seconds, l: "Secs" },
      ].map((u) => (
        <div key={u.l} className="bg-navy-900 border border-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gold-400 font-mono">{String(u.v).padStart(2, "0")}</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wide">{u.l}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- Modal ----------
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-navy-800 border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ---------- Toast ----------
export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-navy-800 border border-gold-500/40 rounded-lg px-4 py-3 text-sm text-white shadow-2xl animate-slide-up">
      {message}
    </div>
  );
}

// ---------- Stat Card ----------
export function StatCard({ icon, title, value, sub, accent = "gold" }: {
  icon?: ReactNode; title: string; value: string | number; sub?: string; accent?: "gold" | "green" | "blue" | "red" | "purple";
}) {
  const colors = {
    gold: "text-gold-400 bg-gold-500/10",
    green: "text-green-400 bg-green-500/10",
    blue: "text-blue-400 bg-blue-500/10",
    red: "text-red-400 bg-red-500/10",
    purple: "text-purple-400 bg-purple-500/10",
  };
  return (
    <div className="card flex items-center gap-4 hover:border-white/10 transition-all duration-200">
      {icon && <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[accent]}`}>{icon}</div>}
      <div>
        <div className="text-xs text-white/50 uppercase tracking-wide">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
        {sub && <div className="text-xs text-white/40">{sub}</div>}
      </div>
    </div>
  );
}

// ---------- Progress Bar ----------
export function ProgressBar({ value, color = "#e3a92e", height = 8 }: { value: number; color?: string; height?: number }) {
  return (
    <div className="w-full bg-white/5 rounded-full overflow-hidden" style={{ height }}>
      <div
        className="rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color, height }}
      />
    </div>
  );
}

// ---------- Section Heading ----------
export function SectionHeading({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {sub && <p className="text-sm text-white/50 mt-1">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

