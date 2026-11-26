"use client";
import {
  Home, BookOpen, ClipboardList, FlaskConical,
  Brain, Users, BarChart2, X,
} from "lucide-react";

const LEFT_NAV = [
  { id: "dashboard",      label: "Home",       icon: Home },
  { id: "syllabus",       label: "Learn",      icon: BookOpen },
  { id: "mocktests",      label: "Practice",   icon: ClipboardList },
  { id: "pyq",            label: "Tests",      icon: FlaskConical },
  { id: "ssb",            label: "SSB/AFSB",   icon: Brain },
  { id: "resources",      label: "Resources",  icon: BookOpen },
  { id: "currentaffairs", label: "Community",  icon: Users },
];

interface LeftNavProps {
  active: string;
  onNavigate: (id: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function LeftNav({ active, onNavigate, mobileOpen, onMobileClose }: LeftNavProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onMobileClose} />
      )}

      <aside
        className={`
          flex-shrink-0 flex flex-col items-center py-4 gap-1
          lg:flex lg:w-16 lg:sticky lg:top-14 lg:h-[calc(100vh-56px)]
          fixed top-14 left-0 h-[calc(100vh-56px)] z-50 w-56
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ background: "#0d1424", borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Mobile close */}
        <button onClick={onMobileClose} className="lg:hidden self-end px-4 mb-2 text-white/40 hover:text-white">
          <X size={18} />
        </button>

        {LEFT_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onMobileClose(); }}
              title={item.label}
              className={`
                flex flex-col items-center gap-1 w-full px-2 py-3 rounded-lg transition-all
                lg:w-12 lg:h-14
              `}
              style={{
                background: isActive ? "rgba(74, 222, 128, 0.12)" : "transparent",
                color: isActive ? "#4ade80" : "rgba(255,255,255,0.4)",
              }}
            >
              <Icon size={20} />
              <span className="text-[9px] font-medium tracking-wide lg:block">{item.label}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
}
