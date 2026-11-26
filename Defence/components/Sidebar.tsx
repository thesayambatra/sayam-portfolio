"use client";
import {
  LayoutDashboard, BookOpen, Map, Calendar, ClipboardList,
  FileText, Newspaper, Users, BarChart2, Shield, Star,
  Search, Bell, Settings, ChevronRight, FlaskConical,
  Brain, Award, Moon, Sun, LogOut,
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
}

export default function Sidebar({ active, onNavigate, collapsed, onCollapse }: SidebarProps) {
  const { name, exam, streakDays, toggleDarkMode, darkMode } = useProgress();

  const groups: string[] = NAV_ITEMS.reduce<string[]>((acc, item) => {
    if (!acc.includes(item.group)) acc.push(item.group);
    return acc;
  }, []);

  return (
    <aside
      className={`flex flex-col bg-navy-900 border-r border-white/5 h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex-shrink-0`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b border-white/5 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center flex-shrink-0">
          <Shield size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-white leading-tight">DEFENCEPREP</div>
            <div className="text-[10px] text-gold-400 uppercase tracking-widest">Armed Forces Prep</div>
          </div>
        )}
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
              <div className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={`nav-item w-full text-left ${isActive ? "nav-item-active" : "nav-item-inactive"} ${
                        collapsed ? "justify-center px-2" : ""
                      }`}
                    >
                      <Icon size={17} className="flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-gold-500/10">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-xs font-bold text-white">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">{name}</div>
              <div className="text-[10px] text-white/50">{exam} · 🔥 {streakDays}d streak</div>
            </div>
          </div>
        )}
        <div className={`flex ${collapsed ? "flex-col items-center gap-2" : "items-center gap-2"}`}>
          <button onClick={() => onCollapse(!collapsed)} className="btn-ghost p-2" title={collapsed ? "Expand" : "Collapse"}>
            <ChevronRight size={15} className={`transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
          <button onClick={toggleDarkMode} className="btn-ghost p-2" title="Toggle theme">
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          {!collapsed && (
            <button onClick={() => onNavigate("profile")} className="btn-ghost p-2 ml-auto" title="Settings">
              <Settings size={15} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
