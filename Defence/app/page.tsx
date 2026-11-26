"use client";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import LeftNav from "@/components/LeftNav";
import Dashboard from "@/views/Dashboard";
import Syllabus from "@/views/Syllabus";
import Roadmap from "@/views/Roadmap";
import Planner from "@/views/Planner";
import MockTests from "@/views/MockTests";
import PYQ from "@/views/PYQ";
import Resources from "@/views/Resources";
import CurrentAffairs from "@/views/CurrentAffairs";
import SSB from "@/views/SSB";
import Analytics from "@/views/Analytics";
import Admin from "@/views/Admin";
import Profile from "@/views/Profile";
import Login from "@/views/Login";

export default function Home() {
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("defenceprep-user");
    if (user) setAuthed(true);
    setReady(true);
    document.body.style.background = "#0a0f1e";
  }, []);

  if (!ready) return <div className="min-h-screen" style={{ background: "#0a0f1e" }} />;
  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const renderView = () => {
    switch (active) {
      case "dashboard":     return <Dashboard onNavigate={setActive} />;
      case "syllabus":      return <Syllabus />;
      case "roadmap":       return <Roadmap />;
      case "planner":       return <Planner />;
      case "mocktests":     return <MockTests />;
      case "pyq":           return <PYQ />;
      case "resources":     return <Resources />;
      case "currentaffairs":return <CurrentAffairs />;
      case "ssb":           return <SSB />;
      case "analytics":     return <Analytics />;
      case "admin":         return <Admin />;
      case "profile":       return <Profile />;
      default:              return <Dashboard onNavigate={setActive} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0a0f1e" }}>
      {/* Top Navbar */}
      <TopNav active={active} onNavigate={setActive} onMenuOpen={() => setMobileOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftNav active={active} onNavigate={(id) => { setActive(id); setMobileOpen(false); }} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 md:p-6 max-w-screen-2xl mx-auto animate-fade-in">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}
