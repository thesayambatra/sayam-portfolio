"use client";
import {
  LayoutDashboard, BookOpen, Map, Calendar, ClipboardList,
  FileText, Newspaper, BarChart2, Shield,
  Settings, ChevronLeft, ChevronRight, FlaskConical,
  Brain, Award, Moon, Sun, X, User, Gamepad2,
} from "lucide-react";
import { useProgress } from "@/lib/store/progressStore";

export const NAV_ITEMS = [
  { id: "dashboard",      label: "Dashboard",       icon: LayoutDashboard, group: "Main" },
  { id: "syllabus",       label: "Syllabus",         icon: BookOpen,        group: "Prepare" },
  { id: "roadmap",        label: "180-Day Roadmap",  icon: Map,             group: "Prepare" },
  { id: "planner",        label: "Study Planner",    icon: Calendar,        group: "Prepare" },
  { id: "mocktests",      label: "Mock Tests",       icon: ClipboardList,   group: "Practice" },
  { id: "pyq",            label: "Previous Year Qs", icon: FileText,        group: "Practice" },
  { id: "resources",      label: "Resources",        icon: FlaskConical,    group: "Learn" },
  { id: "currentaffairs", label: "Current Affairs",  icon: Newspaper,       group: "Learn" },
  { id: "ssb",            label: "SSB / AFSB Prep",  icon: Brain,           group: "Interview" },
  { id: "games",          label: "Mind Games",       icon: Gamepad2,        group: "Learn" },
  { id: "analytics",      label: "Analytics",        icon: BarChart2,       group: "Progress" },
  { id: "admin",          label: "Admin Panel",      icon: Award,           group: "Admin" },
];

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  active, onNavigate, collapsed, onCollapse,
  mobileOpen = false, onMobileClose,
}: SidebarProps) {
  const { name, exam, streakDays, toggleDarkMode, darkMode } = useProgress();

  const groups = NAV_ITEMS.reduce<string[]>((acc, item) => {
    if (!acc.includes(item.group)) acc.push(item.group);
    return acc;
  }, []);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    onMobileClose?.();
  };

  const sidebarContent = (
    <aside
      className="flex flex-col h-full"
      style={{ background: "#0d1424", borderRight: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 h-14 flex-shrink-0 ${collapsed ? "justify-center px-0" : ""}`}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--primary)" }}
        >
          <Shield size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-bold text-white leading-tight">DEFENCEPREP</div>
            <div className="text-[9px] uppercase tracking-widest" style={{ color: "var(--primary-light)" }}>
              Armed Forces Prep
            </div>
          </div>
        )}
        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="ml-auto p-1 rounded-lg text-white/40 hover:text-white md:hidden"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-5 px-2">
        {groups.map((group) => {
          const items = NAV_ITEMS.filter((i) => i.group === group);
          return (
            <div key={group}>
              {/* Group label — only when expanded */}
              {!collapsed && (
                <div
                  className="text-[10px] uppercase tracking-widest font-semibold px-3 mb-1.5"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {group}
                </div>
              )}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 rounded-lg transition-all duration-150 text-sm font-medium
                        ${collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5"}
                      `}
                      style={{
                        background: isActive ? "rgba(87,60,250,0.18)" : "transparent",
                        color: isActive ? "var(--primary-light)" : "rgba(255,255,255,0.55)",
                        borderLeft: isActive && !collapsed ? "2px solid var(--primary)" : "2px solid transparent",
                      }}
                    >
                      <Icon size={17} className="flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom bar */}
      <div
        className="flex-shrink-0 p-3 space-y-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* User pill — only when expanded */}
        {!collapsed && (
          <button
            onClick={() => handleNavigate("profile")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all"
            style={{ background: "rgba(87,60,250,0.1)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "var(--primary)" }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 text-left">
              <div className="text-sm font-semibold text-white truncate leading-tight">{name}</div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                {exam} · 🔥 {streakDays}d streak
              </div>
            </div>
          </button>
        )}

        {/* Action row */}
        <div className={`flex items-center ${collapsed ? "flex-col gap-2 items-center" : "gap-1"}`}>
          {/* Toggle collapse — desktop only */}
          <button
            onClick={() => onCollapse(!collapsed)}
            className="hidden md:flex p-2 rounded-lg transition-all"
            style={{ color: "rgba(255,255,255,0.4)" }}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg transition-all"
            style={{ color: "rgba(255,255,255,0.4)" }}
            title="Toggle theme"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {collapsed && (
            <button
              onClick={() => handleNavigate("profile")}
              className="p-2 rounded-lg transition-all"
              style={{ color: "rgba(255,255,255,0.4)" }}
              title="Profile"
            >
              <User size={15} />
            </button>
          )}

          {!collapsed && (
            <button
              onClick={() => handleNavigate("profile")}
              className="ml-auto p-2 rounded-lg transition-all"
              style={{ color: "rgba(255,255,255,0.4)" }}
              title="Settings"
            >
              <Settings size={15} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Desktop sidebar — always visible, collapsible */}
      <div
        className={`hidden md:flex flex-col h-screen sticky top-0 flex-shrink-0 transition-all duration-300 ${
          collapsed ? "w-[60px]" : "w-56"
        }`}
      >
        {sidebarContent}
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 z-50 md:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
