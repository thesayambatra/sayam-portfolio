"use client";
import { useState } from "react";
import { Shield, Target, Users, Trophy } from "lucide-react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetExam, setTargetExam] = useState<"CDS" | "AFCAT" | "Both">("Both");
  const [error, setError] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && !name.trim()) return setError("Please enter your name");
    if (!email.includes("@")) return setError("Please enter a valid email");
    if (password.length < 4) return setError("Password must be at least 4 characters");
    // Simple demo auth: persist to localStorage
    const users = JSON.parse(localStorage.getItem("defenceprep-users") || "{}");
    if (mode === "register") {
      if (users[email]) return setError("User already exists. Please login.");
      users[email] = { name, password, exam: targetExam, created: new Date().toISOString() };
      localStorage.setItem("defenceprep-users", JSON.stringify(users));
      localStorage.setItem("defenceprep-user", JSON.stringify({ email, name, exam: targetExam }));
    } else {
      const u = users[email];
      if (!u) return setError("User not found. Please register first.");
      if (u.password !== password) return setError("Incorrect password.");
      localStorage.setItem("defenceprep-user", JSON.stringify({ email, name: u.name, exam: u.exam }));
    }
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-olive-500/5 rounded-full blur-3xl" />

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Branding */}
        <div className="hidden md:block animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold-500 flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">DEFENCEPREP</div>
              <div className="text-xs text-gold-400 tracking-widest uppercase">Your Gateway to the Indian Armed Forces</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Crack CDS & AFCAT with <span className="text-gold-400">military precision</span>.
          </h1>
          <p className="text-white/50 mb-8 leading-relaxed">
            A complete command centre for your defence exam preparation – 180-day roadmap, mock tests, previous-year questions, SSB interview training and performance analytics.
          </p>
          <div className="space-y-3">
            {[
              { icon: Target, text: "180-day structured roadmap for CDS & AFCAT" },
              { icon: Users, text: "SSB / AFSB interview training with AI feedback" },
              { icon: Trophy, text: "Full-length mock tests with negative marking" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-white/60">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <f.icon size={15} className="text-gold-400" />
                </div>
                <span className="text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-navy-800/80 border border-white/10 rounded-2xl p-8 backdrop-blur-sm animate-slide-up">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">{mode === "login" ? "Welcome back, Cadet" : "Begin your journey"}</h2>
            <p className="text-sm text-white/50 mt-1">
              {mode === "login" ? "Enter your credentials to continue" : "Create your DEFENCEPREP account"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-xs text-white/60 mb-1.5 block">Full Name</label>
                <input className="input-field w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aspirant Name" />
              </div>
            )}
            <div>
              <label className="text-xs text-white/60 mb-1.5 block">Email</label>
              <input className="input-field w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="cadet@example.com" />
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1.5 block">Password</label>
              <input className="input-field w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            {mode === "register" && (
              <div>
                <label className="text-xs text-white/60 mb-1.5 block">Target Exam</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["CDS", "AFCAT", "Both"] as const).map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setTargetExam(ex)}
                      className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                        targetExam === ex
                          ? "bg-gold-500/20 border-gold-500 text-gold-400"
                          : "border-white/10 text-white/60 hover:border-white/30"
                      }`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</div>}
            <button type="submit" className="btn-gold w-full py-3 rounded-xl font-semibold">
              {mode === "login" ? "Login to Command Centre" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-sm text-gold-400 hover:text-gold-300"
            >
              {mode === "login" ? "New here? Create an account →" : "Already registered? Login →"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <button
              onClick={() => {
                localStorage.setItem("defenceprep-user", JSON.stringify({ email: "demo@defenceprep.in", name: "Demo Cadet", exam: "Both" }));
                onLogin();
              }}
              className="text-xs text-white/40 hover:text-white/70"
            >
              Continue as Guest (Demo Account) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
