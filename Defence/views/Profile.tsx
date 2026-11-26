"use client";
import { useState } from "react";
import { User, Shield, Bell, Moon, Sun, Target, Calendar, Save, LogOut } from "lucide-react";
import { useProgress } from "@/lib/store/progressStore";
import { SectionHeading } from "@/components/ui";

export default function Profile() {
  const { name, exam, targetDate, dailyGoalHours, darkMode, setProfile, setDailyGoal, toggleDarkMode } = useProgress();
  const [localName, setLocalName] = useState(name);
  const [localExam, setLocalExam] = useState<"CDS" | "AFCAT" | "Both">(exam);
  const [localDate, setLocalDate] = useState(targetDate);
  const [localGoal, setLocalGoal] = useState(dailyGoalHours);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setProfile(localName, localExam, localDate);
    setDailyGoal(localGoal);
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("defenceprep-user") || "{}");
      localStorage.setItem("defenceprep-user", JSON.stringify({ ...user, name: localName, exam: localExam }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("defenceprep-user");
    window.location.reload();
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <SectionHeading title="Profile & Settings" sub="Manage your account, preferences and notifications." />

      {/* Profile Card */}
      <div className="card border border-white/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center text-2xl font-bold text-white">
            {localName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-xl font-bold text-white">{localName}</div>
            <div className="text-sm text-white/50">{localExam} Aspirant</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Full Name</label>
            <input className="input-field w-full" value={localName} onChange={(e) => setLocalName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Target Exam</label>
            <div className="grid grid-cols-3 gap-2">
              {(["CDS", "AFCAT", "Both"] as const).map((ex) => (
                <button key={ex} onClick={() => setLocalExam(ex)} className={`py-2 rounded-lg text-sm font-medium border transition-all ${localExam === ex ? "bg-gold-500/20 border-gold-500 text-gold-400" : "border-white/10 text-white/60 hover:border-white/20"}`}>{ex}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Exam Date</label>
            <input type="date" className="input-field w-full" value={localDate} onChange={(e) => setLocalDate(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Daily Study Goal (hours)</label>
            <input type="range" min={1} max={12} step={0.5} value={localGoal} onChange={(e) => setLocalGoal(+e.target.value)} className="w-full" />
            <div className="text-sm text-gold-400 mt-1">{localGoal} hours / day</div>
          </div>

          <button onClick={handleSave} className={`btn-gold w-full flex items-center justify-center gap-2 ${saved ? "bg-green-500 hover:bg-green-500" : ""}`}>
            <Save size={15} /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="card border border-white/5 space-y-3">
        <div className="text-sm font-semibold text-white mb-4">Preferences</div>
        {[
          {
            icon: darkMode ? Moon : Sun,
            label: "Dark Mode",
            desc: "Military dark theme for focused study",
            action: (
              <button
                onClick={toggleDarkMode}
                className={`w-11 h-6 rounded-full transition-all relative ${darkMode ? "bg-gold-500" : "bg-white/20"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${darkMode ? "left-6" : "left-1"}`} />
              </button>
            ),
          },
          {
            icon: Bell,
            label: "Notifications",
            desc: "Daily reminders and study alerts",
            action: (
              <button className="w-11 h-6 rounded-full bg-gold-500 relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-6" />
              </button>
            ),
          },
        ].map((pref, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                <pref.icon size={16} className="text-white/60" />
              </div>
              <div>
                <div className="text-sm text-white">{pref.label}</div>
                <div className="text-xs text-white/40">{pref.desc}</div>
              </div>
            </div>
            {pref.action}
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
      >
        <LogOut size={15} /> Sign Out
      </button>
    </div>
  );
}
