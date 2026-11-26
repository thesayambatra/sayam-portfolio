"use client";
import { useEffect, useState } from "react";
import Sidebar, { NAV_ITEMS } from "@/components/Sidebar";
import { Search, Bell, Menu } from "lucide-react";
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
  // Start expanded on desktop — users can collapse manually
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("defenceprep-user");
    if (user) setAuthed(true);
    setReady(true);
  }, []);

  useEffect(() => {
    document.body.style.background = "#0a0f1e";
  }, []);

  if (!ready) return <div className="min-h-screen" style={{ background: "#0a0f1e" }} />;
  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const renderView = () => {
    switch (active) {
      case "dashboard":      return <Dashboard onNavigate={setActive} />;
      case "syllabus":       return <Syllabus />;
      case "roadmap":        return <Roadmap />;
      case "planner":        return <Planner />;
      case "mocktests":      return <MockTests />;
      case "pyq":            return <PYQ />;
      case "resources":      return <Resources />;
      case "currentaffairs": return <CurrentAffairs />;
      case "ssb":            return <SSB />;
      case "analytics":      return <Analytics />;
      case "admin":          return <Admin />;
      case "profile":        return <Profile />;
      default:               return <Dashboard onNavigate={setActive} />;
    }
  };

  const currentNavItem = NAV_ITEMS.find((n) => n.id === active);

  return (
    <div className="flex min-h-screen" style={{ background: "#0a0f1e" }}>
      <Sidebar
        active={active}
        onNavigate={setActive}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main className="flex-1 overflow-x-hidden min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 backdrop-blur-md px-4 md:px-6 py-3 flex items-center gap-3"
          style={{ background: "rgba(13,11,26,0.9)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-white/60"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            {currentNavItem?.group && (
              <>
                <span className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {currentNavItem.group}
                </span>
                <span className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
              </>
            )}
            <span className="text-sm font-semibold text-white truncate">
              {currentNavItem?.label ?? "Dashboard"}
            </span>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div
            className="hidden md:flex items-center gap-2 text-xs rounded-lg px-3 py-1.5"
            style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Search size={12} style={{ color: "var(--primary-light)" }} />
            Search syllabus, tests, GK...
          </div>

          {/* Bell */}
          <button className="relative p-2 rounded-lg text-white/60 hover:text-white">
            <Bell size={16} />
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-white font-bold"
              style={{ background: "var(--primary)" }}
            >3</span>
          </button>
        </header>

        <div className="p-4 md:p-6 max-w-7xl mx-auto animate-fade-in">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
