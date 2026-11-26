"use client";
import { useEffect, useState } from "react";
import Sidebar, { NAV_ITEMS } from "@/components/Sidebar";
import { Search, Bell } from "lucide-react";
import { useProgress } from "@/lib/store/progressStore";
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
  const { darkMode } = useProgress();
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Check if user exists in localStorage (simple auth for demo)
    const user = localStorage.getItem("defenceprep-user");
    if (user) setAuthed(true);
    setReady(true);
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.style.background = "#0b1728";
    } else {
      document.body.classList.remove("dark");
      document.body.style.background = "#f0f4f8";
    }
  }, [darkMode]);

  // Handle mobile sidebar overlay
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!ready) return <div className="min-h-screen bg-navy-950" />;

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const renderView = () => {
    switch (active) {
      case "dashboard": return <Dashboard onNavigate={setActive} />;
      case "syllabus": return <Syllabus />;
      case "roadmap": return <Roadmap />;
      case "planner": return <Planner />;
      case "mocktests": return <MockTests />;
      case "pyq": return <PYQ />;
      case "resources": return <Resources />;
      case "currentaffairs": return <CurrentAffairs />;
      case "ssb": return <SSB />;
      case "analytics": return <Analytics />;
      case "admin": return <Admin />;
      case "profile": return <Profile />;
      default: return <Dashboard onNavigate={setActive} />;
    }
  };

  const currentNavItem = NAV_ITEMS.find((n) => n.id === active);

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-navy-950" : "bg-gray-100"}`}>
      <Sidebar active={active} onNavigate={setActive} collapsed={collapsed} onCollapse={setCollapsed} />
      <main className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <header className={`sticky top-0 z-30 ${darkMode ? "bg-navy-950/80" : "bg-gray-100/80"} backdrop-blur-md border-b ${
          darkMode ? "border-white/5" : "border-gray-200"
        } px-6 py-3 flex items-center gap-4`}>
          <div className="text-sm text-white/40">{currentNavItem?.group}</div>
          <div className="text-white/20">/</div>
          <div className="text-sm font-semibold text-white">{currentNavItem?.label ?? "Dashboard"}</div>
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-2 text-xs text-white/50 bg-white/5 border border-white/5 rounded-lg px-3 py-1.5">
            <Search size={12} className="text-gold-400" />
            Search syllabus, tests, GK...
          </div>
          <button className="relative p-2 rounded-lg hover:bg-white/10 text-white/60">
            <Bell size={16} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">3</span>
          </button>
        </header>

        <div className="p-6 max-w-7xl mx-auto animate-fade-in">{renderView()}</div>
      </main>
    </div>
  );
}
