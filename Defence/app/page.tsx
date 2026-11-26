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
    document.body.style.background = "var(--bg)";
  }, [darkMode]);

  // Collapse sidebar on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
        setMobileOpen(false);
      }
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
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Sidebar — hidden on mobile (drawer), visible on md+ */}
      <div className="hidden md:flex">
        <Sidebar
          active={active}
          onNavigate={setActive}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Mobile drawer sidebar */}
      <div className="md:hidden">
        <Sidebar
          active={active}
          onNavigate={(id) => { setActive(id); setMobileOpen(false); }}
          collapsed={false}
          onCollapse={setCollapsed}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>

      <main className="flex-1 overflow-x-hidden min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 backdrop-blur-md px-4 md:px-6 py-3 flex items-center gap-3" style={{ background: "rgba(13,11,26,0.85)", borderBottom: "1px solid var(--border)" }}>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white/60 flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="text-sm text-white/40 hidden sm:block">{currentNavItem?.group}</div>
          <div className="text-white/20 hidden sm:block">/</div>
          <div className="text-sm font-semibold text-white truncate">{currentNavItem?.label ?? "Dashboard"}</div>
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-2 text-xs rounded-lg px-3 py-1.5" style={{ color: "var(--muted)", background: "rgba(87,60,250,0.08)", border: "1px solid var(--border)" }}>
            <Search size={12} className="text-gold-400" />
            Search syllabus, tests, GK...
          </div>
          <button className="relative p-2 rounded-lg hover:bg-white/10 text-white/60 flex-shrink-0">
            <Bell size={16} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">3</span>
          </button>
        </header>

        <div className="p-4 md:p-6 max-w-7xl mx-auto animate-fade-in">{renderView()}</div>
      </main>
    </div>
  );
}
