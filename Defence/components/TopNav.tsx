"use client";
import { Search, Bell, Menu, ChevronDown } from "lucide-react";
import { useProgress } from "@/lib/store/progressStore";

const TOP_LINKS = [
  { id: "dashboard",      label: "Home" },
  { id: "syllabus",       label: "Courses", hasDropdown: true },
  { id: "mocktests",      label: "Mock Tests" },
  { id: "ssb",            label: "SSB / AFSB" },
  { id: "resources",      label: "Resources", hasDropdown: true },
  { id: "currentaffairs", label: "Community" },
];

interface TopNavProps {
  active: string;
  onNavigate: (id: string) => void;
  onMenuOpen: () => void;
}

export default function TopNav({ active, onNavigate, onMenuOpen }: TopNavProps) {
  const { name } = useProgress();
  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("defenceprep-user") || "{}") : {};
  const displayName = user.name || name;
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <header
      className="sticky top-0 z-50 flex items-center gap-4 px-4 md:px-6 h-14"
      style={{ background: "#0d1424", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Logo */}
      <button
        onClick={() => onNavigate("dashboard")}
        className="flex items-center gap-2 flex-shrink-0 mr-2"
      >
        {/* Star/wings icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <polygon points="16,3 19.5,12 29,12 21.5,18 24.5,27 16,21.5 7.5,27 10.5,18 3,12 12.5,12" fill="#4ade80" />
        </svg>
        <span className="text-white font-bold text-sm hidden sm:block tracking-wide">DefencePrep</span>
      </button>

      {/* Nav links — desktop */}
      <nav className="hidden lg:flex items-center gap-1 flex-1">
        {TOP_LINKS.map((link) => {
          const isActive = active === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
              style={isActive ? { background: "#4ade8020", color: "#4ade80", border: "1px solid #4ade8030" } : {}}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown size={13} className="opacity-60" />}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 lg:flex-none" />

      {/* Search */}
      <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
        <Search size={14} />
        <span className="hidden lg:block text-xs">Search...</span>
      </button>

      {/* Bell */}
      <button className="relative p-2 rounded-lg transition-all hover:bg-white/5 text-white/50 hover:text-white">
        <Bell size={18} />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
      </button>

      {/* Avatar */}
      <button
        onClick={() => onNavigate("profile")}
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #573CFA, #7c63fb)" }}
      >
        {initials}
      </button>

      {/* Mobile hamburger */}
      <button onClick={onMenuOpen} className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white">
        <Menu size={20} />
      </button>
    </header>
  );
}
