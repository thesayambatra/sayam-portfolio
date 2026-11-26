// Utility helpers shared across views

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function daysBetween(date1: Date, date2: Date): number {
  return Math.round((date2.getTime() - date1.getTime()) / 86400000);
}

export function getTodayMinutes(): number {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

export function pct(n: number, d: number): number {
  if (!d) return 0;
  return Math.round((n / d) * 100);
}

// Motivational quotes – defence-oriented
export const motivationalQuotes = [
  { quote: "The soldier is the Army. No army is better than its soldiers.", author: "Field Marshal Sam Manekshaw" },
  { quote: "Either I will come back after hoisting the tricolor, or I will come back wrapped in it.", author: "Capt. Vikram Batra, PVC" },
  { quote: "A soldier fights not because he hates what is in front of him, but because he loves what is behind him.", author: "G.K. Chesterton" },
  { quote: "Sleep peacefully at night, soldiers are awake at the border.", author: "Indian Army Motto" },
  { quote: "The difficult we do immediately; the impossible takes a little longer.", author: "Indian Air Force" },
  { quote: "Duty, Honour, Country.", author: "Indian Military Academy" },
  { quote: "To command is to serve, nothing more and nothing less.", author: "André Malraux" },
  { quote: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
  { quote: "The path to glory is often lonely, but the destination is worth every step.", author: "Unknown Soldier" },
  { quote: "युद्ध का नियम – जो टूट नहीं सकता, उसे मोड़ना सीखो (Rule of war – learn to bend what cannot be broken).", author: "Military Wisdom" },
];

export function getRandomQuote(seed?: number) {
  const idx = seed !== undefined ? seed % motivationalQuotes.length : Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[idx];
}

export function getCurrentHour(): number {
  return new Date().getHours();
}

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}
