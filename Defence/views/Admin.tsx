"use client";
import { useState } from "react";
import { Upload, Plus, Users, Settings2, BarChart2, FileText, Edit, Trash2, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui";

const demoUsers = [
  { id: "u1", name: "Arjun Sharma", email: "arjun@example.com", exam: "CDS", tests: 5, score: 72, joined: "2024-10-01" },
  { id: "u2", name: "Priya Nair", email: "priya@example.com", exam: "AFCAT", tests: 8, score: 65, joined: "2024-10-15" },
  { id: "u3", name: "Rahul Verma", email: "rahul@example.com", exam: "Both", tests: 12, score: 80, joined: "2024-09-20" },
  { id: "u4", name: "Deepika Singh", email: "deepika@example.com", exam: "CDS", tests: 3, score: 55, joined: "2024-11-01" },
];

const platformStats = [
  { label: "Total Users", value: "1,247" },
  { label: "Tests Taken", value: "8,932" },
  { label: "Questions Added", value: "2,845" },
  { label: "Materials Uploaded", value: "156" },
];

export default function Admin() {
  const [tab, setTab] = useState<"overview" | "questions" | "materials" | "users">("overview");
  const [newQ, setNewQ] = useState({ question: "", subject: "English", topic: "", optA: "", optB: "", optC: "", optD: "", correct: 0, explanation: "", exam: "CDS" });
  const [saved, setSaved] = useState(false);

  const saveQuestion = () => {
    if (!newQ.question.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setNewQ({ question: "", subject: "English", topic: "", optA: "", optB: "", optC: "", optD: "", correct: 0, explanation: "", exam: "CDS" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading title="Admin Panel" sub="Manage questions, materials, users and platform settings." />

      {/* Warning */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
        ⚠️ Admin Panel – This section is for administrators only. Changes here affect all users.
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: "overview", label: "Overview" },
          { id: "questions", label: "Add Questions" },
          { id: "materials", label: "Upload Materials" },
          { id: "users", label: "Manage Users" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-gold-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformStats.map((s) => (
              <div key={s.label} className="card text-center border border-white/5">
                <div className="text-2xl font-bold text-gold-400">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Question Bank", count: "2,845 questions", icon: FileText, color: "blue", actions: ["Add Questions", "Import CSV", "Export"] },
              { title: "Study Materials", count: "156 files", icon: Upload, color: "green", actions: ["Upload PDF", "Add Notes", "Manage"] },
              { title: "Mock Tests", count: "24 tests", icon: Settings2, color: "gold", actions: ["Create Test", "Edit Tests", "Analytics"] },
              { title: "Current Affairs", count: "340 articles", icon: BarChart2, color: "purple", actions: ["Publish", "Schedule", "Archive"] },
            ].map((card) => (
              <div key={card.title} className="card border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    card.color === "blue" ? "bg-blue-500/15" : card.color === "green" ? "bg-green-500/15" : card.color === "gold" ? "bg-gold-500/15" : "bg-purple-500/15"
                  }`}>
                    <card.icon size={18} className={
                      card.color === "blue" ? "text-blue-400" : card.color === "green" ? "text-green-400" : card.color === "gold" ? "text-gold-400" : "text-purple-400"
                    } />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{card.title}</div>
                    <div className="text-xs text-white/50">{card.count}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {card.actions.map((a) => (
                    <button key={a} className="btn-outline text-xs py-1">{a}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "questions" && (
        <div className="max-w-2xl space-y-4">
          <div className="card border border-white/5">
            <div className="text-sm font-semibold text-white mb-4">Add New Question</div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/50 block mb-1">Exam</label>
                  <select className="input-field w-full" value={newQ.exam} onChange={(e) => setNewQ({ ...newQ, exam: e.target.value })}>
                    <option>CDS</option><option>AFCAT</option><option>Both</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Subject</label>
                  <select className="input-field w-full" value={newQ.subject} onChange={(e) => setNewQ({ ...newQ, subject: e.target.value })}>
                    <option>English</option><option>General Knowledge</option><option>Elementary Mathematics</option><option>General Awareness</option><option>Numerical Ability</option><option>Reasoning & Military Aptitude</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Topic</label>
                <input className="input-field w-full" placeholder="e.g. Grammar" value={newQ.topic} onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })} />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Question</label>
                <textarea className="input-field w-full h-20 resize-none" value={newQ.question} onChange={(e) => setNewQ({ ...newQ, question: e.target.value })} placeholder="Enter the question..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["optA", "optB", "optC", "optD"].map((opt, i) => (
                  <div key={opt}>
                    <label className="text-xs text-white/50 block mb-1">Option {String.fromCharCode(65 + i)}</label>
                    <input className="input-field w-full" value={(newQ as any)[opt]} onChange={(e) => setNewQ({ ...newQ, [opt]: e.target.value })} />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Correct Answer</label>
                <select className="input-field w-full" value={newQ.correct} onChange={(e) => setNewQ({ ...newQ, correct: +e.target.value })}>
                  {["Option A", "Option B", "Option C", "Option D"].map((o, i) => (
                    <option key={i} value={i}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Explanation</label>
                <textarea className="input-field w-full h-16 resize-none" value={newQ.explanation} onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })} placeholder="Explain the correct answer..." />
              </div>
              <button onClick={saveQuestion} className={`btn-gold w-full flex items-center justify-center gap-2 ${saved ? "bg-green-500 hover:bg-green-500" : ""}`}>
                {saved ? <><Check size={15} /> Question Saved!</> : <><Plus size={15} /> Add Question</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "materials" && (
        <div className="max-w-xl">
          <div className="card border border-dashed border-white/20 text-center py-16 hover:border-gold-500/50 transition-colors cursor-pointer">
            <Upload size={40} className="mx-auto text-white/30 mb-4" />
            <div className="text-white/60 font-medium">Drag & drop files here or click to browse</div>
            <div className="text-xs text-white/40 mt-2">Supported: PDF, DOC, DOCX, PPT, Images (max 50MB)</div>
            <button className="btn-gold mt-6">Browse Files</button>
          </div>
          <div className="mt-4 text-xs text-white/40">Uploaded files are available to all students in the Resources section.</div>
        </div>
      )}

      {tab === "users" && (
        <div className="card border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-white">{demoUsers.length} Users</div>
            <button className="btn-outline text-xs flex items-center gap-1"><Plus size={12} /> Add User</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-white/40 border-b border-white/5">
                  <th className="text-left pb-2 font-medium">Name</th>
                  <th className="text-left pb-2 font-medium hidden md:table-cell">Email</th>
                  <th className="text-center pb-2 font-medium">Exam</th>
                  <th className="text-center pb-2 font-medium hidden sm:table-cell">Tests</th>
                  <th className="text-center pb-2 font-medium">Avg Score</th>
                  <th className="text-center pb-2 font-medium hidden md:table-cell">Joined</th>
                  <th className="text-center pb-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {demoUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/2">
                    <td className="py-2.5 text-white/80 font-medium">{u.name}</td>
                    <td className="py-2.5 text-white/50 hidden md:table-cell">{u.email}</td>
                    <td className="py-2.5 text-center"><span className={`badge text-[10px] ${u.exam === "CDS" ? "badge-blue" : u.exam === "AFCAT" ? "badge-gold" : "badge-green"}`}>{u.exam}</span></td>
                    <td className="py-2.5 text-center text-white/60 hidden sm:table-cell">{u.tests}</td>
                    <td className="py-2.5 text-center">
                      <span className={u.score >= 70 ? "text-green-400" : u.score >= 50 ? "text-yellow-400" : "text-red-400"}>{u.score}%</span>
                    </td>
                    <td className="py-2.5 text-center text-white/50 text-xs hidden md:table-cell">{u.joined}</td>
                    <td className="py-2.5 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="text-white/30 hover:text-blue-400 transition-colors"><Edit size={14} /></button>
                        <button className="text-white/30 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
