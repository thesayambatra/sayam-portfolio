# DEFENCEPREP – Your Gateway to the Indian Armed Forces

A complete CDS (IMA/INA/AFA/OTA) and AFCAT (Flying, Ground Duty) examination preparation platform built as a military command-centre-style web application.

## Tech Stack
- **Frontend:** Next.js 14 (React 18, TypeScript)
- **Styling:** Tailwind CSS (navy / olive / gold military palette)
- **State:** Zustand with localStorage persistence (per-user progress)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Backend (optional):** Supabase-ready (`@supabase/supabase-js` installed; add credentials in `.env.local` to enable cloud auth + Postgres persistence)

## Modules
| Module | Path | Features |
|---|---|---|
| Login / Register | `/` | Local auth, guest demo account |
| Dashboard | Dashboard view | Streak, study hours, exam countdown, progress rings, weak/strong subjects, today's mission |
| Syllabus | Syllabus view | Full CDS + AFCAT syllabus with OTA track, subtopics, difficulty, completion tracking, personal notes |
| 180-Day Roadmap | Roadmap view | 6 phases, per-day topics/objectives/hours/questions, completion checkboxes, auto progress |
| Study Planner | Planner view | 3h/5h/8h templates, custom tasks, Pomodoro timer with study-hour logging |
| Mock Tests | MockTests view | CDS/AFCAT/OTA full + subject tests, exam timer, question navigator, mark-for-review, bookmarks, negative marking, auto-scoring, per-question explanations |
| Previous Year Questions | PYQ view | Year/subject/difficulty/search filters, bookmarking, explanations |
| Resources | Resources view | Study materials, formula sheets, vocabulary builder |
| Current Affairs | CurrentAffairs view | Daily updates, defence exercises, CA quiz |
| SSB / AFSB Prep | SSB view | OIR/PPDT/TAT/WAT/SRT/SDT guides, 15 OLQs, lecturette & GD topics, AI mock interview with feedback |
| Analytics | Analytics view | Score trends, weekly study hours, subject accuracy, syllabus completion, test history |
| Admin Panel | Admin view | Platform overview, question builder, material upload, user management |
| Profile & Settings | Profile view | Name/exam/target date, daily goal, dark mode, logout |

## Run
```powershell
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Persistence
All progress (completed topics, roadmap days, test results, study hours, bookmarks, notes, streaks) is stored automatically in the browser via `zustand/persist` under the key `defenceprep-progress`. To move to a shared database, set the Supabase env vars and wire the store's persistence layer to Supabase tables.

## Exam Patterns (configurable in `lib/data/mockTests.ts`)
- **CDS:** 3 papers, 100 Qs each, 1 mark per correct, −1/3 per wrong, 180 min (OTA: English + GK only)
- **AFCAT:** 100 Qs, +3 per correct, −1 per wrong, 120 min
