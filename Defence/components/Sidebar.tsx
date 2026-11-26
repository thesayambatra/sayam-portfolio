"use client";
import {
  LayoutDashboard, BookOpen, Map, Calendar, ClipboardList,
  FileText, Newspaper, Users, BarChart2, Shield, Star,
  Search, Bell, Settings, ChevronRight, FlaskConical,
  Brain, Award, Moon, Sun, LogOut, X,
} from "lucide-react";
import { useProgress } from "@/lib/store/progressStore";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Main" },
  { id: "syllabus", label: "Syllabus", icon: BookOpen, group: "Prepare" },
  { id: "roadmap", label: "180-Day Roadmap", icon: Map, group: "Prepare" },
  { id: "planner", label: "Study Planner", icon: Calendar, group: "Prepare" },
  { id: "mocktests", label: "Mock Tests", icon: ClipboardList, group: "Practice" },
  { id: "pyq", label: "Previous Year Q", icon: FileText, group: "Practice" },
  { id: "resources", label: "Resources", icon: FlaskConical, group: "Learn" },
  { id: "currentaffairs", label: "Current Affairs", icon: Newspaper, group: "Learn" },
  { id: "ssb", label: "SSB / AFSB Prep", icon: Brain, group: "Interview" },
  { id: "analytics", label: "Analytics", icon: BarChart2, group: "Progress" },
  { id: "admin", label: "Admin Panel", icon: Award, group: "Admin" },
];

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ active, onNavigate, collapsed, onCollapse, mobileOpen = false, onMobileClose }: SidebarProps) {
  const { name, exam, streakDays, toggleDarkMode, darkMode } = useProgress();

  const groups: string[] = NAV_ITEMS.reduce<string[]>((acc, item) => {
    if (!acc.includes(item.group)) acc.push(item.group);
    return acc;
  }, []);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    onMobileClose?.();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          flex flex-col h-screen
          transition-all duration-300 flex-shrink-0
          md:sticky md:top-0 md:translate-x-0
          ${collapsed ? "md:w-16" : "md:w-64"}
          fixed top-0 left-0 z-50 w-72
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:flex
        `}
        style={{ background: "var(--bg2)", borderRight: "1px solid var(--border)" }}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 ${collapsed ? "md:justify-center" : ""}`} style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--primary)" }}>
            <Shield size={18} className="text-white" />
          </div>
          <div className={`${collapsed ? "md:hidden" : ""}`}>
            <div className="text-sm font-bold text-white leading-tight">DEFENCEPREP</div>
            <div className="text-[10px] uppercase tracking-widest" style={{ color: "var(--primary-light)" }}>Armed Forces Prep</div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onMobileClose}
            className="ml-auto p-1 rounded-lg hover:bg-white/10 text-white/60 md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {groups.map((group) => {
            const items = NAV_ITEMS.filter((i) => i.group === group);
            return (
              <div key={group}>
                {!collapsed && (
                  <div className="text-[10px] uppercase text-white/30 tracking-widest px-3 mb-1 font-semibold">{group}</div>
                )}
                <div className="hidden md:block text-[10px] uppercase text-white/30 tracking-widest px-3 mb-1 font-semibold">
                  {collapsed ? "" : ""}
                </div>
                <div className="space-y-0.5">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        title={collapsed ? item.label : undefined}
                        className={`nav-item w-full text-left ${isActive ? "nav-item-active" : "nav-item-inactive"} ${
                          collapsed ? "md:justify-center md:px-2" : ""
                        }`}
                      >
                        <Icon size={17} className="flex-shrink-0" />
                        <span className={`${collapsed ? "md:hidden" : ""}`}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 space-y-2" style={{ borderTop: "1px solid var(--border)" }}>
          <div className={`flex items-center gap-3 px-2 py-2 rounded-lg ${collapsed ? "md:hidden" : ""}`} style={{ background: "rgba(87,60,250,0.12)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "var(--primary)" }}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white leading-tight truncate">{name}</div>
              <div className="text-[10px] text-white/50">{exam} · 🔥 {streakDays}d streak</div>
            </div>
          </div>
          <div className={`flex items-center gap-2 ${collapsed ? "md:flex-col" : ""}`}>
            <button onClick={() => onCollapse(!collapsed)} className="btn-ghost p-2 hidden md:flex" title={collapsed ? "Expand" : "Collapse"}>
              <ChevronRight size={15} className={`transition-transform ${collapsed ? "" : "rotate-180"}`} />
            </button>
            <button onClick={toggleDarkMode} className="btn-ghost p-2" title="Toggle theme">
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={() => handleNavigate("profile")} className={`btn-ghost p-2 ${collapsed ? "md:hidden" : "ml-auto"}`} title="Settings">
              <Settings size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
