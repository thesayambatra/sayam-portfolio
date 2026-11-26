export interface RoadmapDay {
  day: number;
  phase: number;
  phaseName: string;
  date?: string;
  exam: "CDS" | "AFCAT" | "Both";
  topics: string[];
  objectives: string[];
  studyHours: number;
  practiceQuestions: number;
  revisionTask: string;
  completed: boolean;
}

function buildPhase(
  start: number,
  end: number,
  phase: number,
  phaseName: string,
  schedule: { exam: "CDS" | "AFCAT" | "Both"; topics: string[]; objectives: string[]; hours: number; pq: number; revision: string }[]
): RoadmapDay[] {
  const days: RoadmapDay[] = [];
  for (let d = start; d <= end; d++) {
    const idx = (d - start) % schedule.length;
    const s = schedule[idx];
    days.push({ day: d, phase, phaseName, exam: s.exam, topics: s.topics, objectives: s.objectives, studyHours: s.hours, practiceQuestions: s.pq, revisionTask: s.revision, completed: false });
  }
  return days;
}

const p1 = buildPhase(1, 30, 1, "Foundation", [
  { exam: "Both", topics: ["Number System", "Indian History Basics"], objectives: ["Understand number types", "Ancient India overview"], hours: 4, pq: 20, revision: "Review notes on number system" },
  { exam: "Both", topics: ["HCF & LCM", "Freedom Movement"], objectives: ["Solve HCF/LCM problems", "1857 Revolt"], hours: 4, pq: 20, revision: "Practice 10 HCF questions" },
  { exam: "Both", topics: ["Percentages", "Indian Constitution Basics"], objectives: ["Percentage formula", "Preamble & Articles"], hours: 4, pq: 20, revision: "Revise Preamble" },
  { exam: "Both", topics: ["Profit & Loss", "Physical Geography"], objectives: ["P&L fundamentals", "Continents & Oceans"], hours: 4, pq: 20, revision: "World map practice" },
  { exam: "Both", topics: ["English Grammar – Parts of Speech", "Indian Geography"], objectives: ["Identify parts of speech", "States & capitals"], hours: 4, pq: 20, revision: "Grammar exercises" },
  { exam: "Both", topics: ["Tenses", "Indian Economy Basics"], objectives: ["All 12 tenses", "GDP, Inflation"], hours: 4, pq: 20, revision: "Tense conversion drill" },
  { exam: "Both", topics: ["Weekly Revision Day 1", "Current Affairs Overview"], objectives: ["Revise week's topics", "News roundup"], hours: 3, pq: 30, revision: "Full week quick quiz" },
]);

const p2 = buildPhase(31, 60, 2, "Concept Building", [
  { exam: "CDS", topics: ["Algebra – Linear Equations", "Medieval History"], objectives: ["Solve linear equations", "Mughal Empire"], hours: 5, pq: 25, revision: "Equation worksheet" },
  { exam: "AFCAT", topics: ["Reasoning – Analogies", "Indian Air Force History"], objectives: ["Analogy patterns", "IAF formation 1932"], hours: 5, pq: 25, revision: "10 analogy questions" },
  { exam: "Both", topics: ["Polity – Parliament", "Trigonometry Basics"], objectives: ["Lok Sabha vs Rajya Sabha", "Sin/Cos/Tan"], hours: 5, pq: 25, revision: "Parliament flowchart" },
  { exam: "Both", topics: ["Biology – Human Body", "Sentence Improvement"], objectives: ["Organ systems", "5 improvement types"], hours: 5, pq: 25, revision: "Biology diagram" },
  { exam: "CDS", topics: ["Trigonometry Identities", "Modern India"], objectives: ["Pythagorean identities", "Colonialism"], hours: 5, pq: 25, revision: "10 identity proofs" },
  { exam: "AFCAT", topics: ["Spatial Reasoning", "Aviation History"], objectives: ["Mirror images", "Wright brothers – modern jets"], hours: 5, pq: 25, revision: "5 figure-series questions" },
  { exam: "Both", topics: ["Weekly Mock Quiz", "GK Revision"], objectives: ["Test week progress", "Revise GK topics"], hours: 4, pq: 40, revision: "Mock quiz analysis" },
]);

const p3 = buildPhase(61, 90, 3, "Intermediate Practice", [
  { exam: "CDS", topics: ["Geometry – Triangles", "Chemistry Basics"], objectives: ["Congruence, similarity", "Periodic table"], hours: 6, pq: 30, revision: "5 geometry proofs" },
  { exam: "AFCAT", topics: ["Numerical Ability – Time & Work", "World Geography"], objectives: ["Work formula", "Major rivers"], hours: 6, pq: 30, revision: "10 T&W problems" },
  { exam: "Both", topics: ["Reading Comprehension", "Environmental Science"], objectives: ["Para inference", "Ecology fundamentals"], hours: 6, pq: 30, revision: "2 comprehension passages" },
  { exam: "Both", topics: ["Vocabulary Building – Synonyms/Antonyms", "Defence Updates"], objectives: ["50 high-frequency words", "Recent exercises"], hours: 5, pq: 30, revision: "Flashcard drill" },
  { exam: "CDS", topics: ["Mensuration – 2D Shapes", "Physics – Mechanics"], objectives: ["Area formulae", "Newton's laws"], hours: 6, pq: 30, revision: "Formula chart" },
  { exam: "AFCAT", topics: ["Military Aptitude", "IAF Ranks & Badges"], objectives: ["Leadership scenarios", "All IAF ranks"], hours: 5, pq: 30, revision: "Rank flashcards" },
  { exam: "Both", topics: ["Subject Mock Test", "Error Analysis"], objectives: ["Full subject test", "Identify weak areas"], hours: 4, pq: 50, revision: "Review wrong answers" },
]);

const p4 = buildPhase(91, 120, 4, "Advanced Preparation", [
  { exam: "CDS", topics: ["Statistics", "Economics – Budget & Banking"], objectives: ["SD, Probability", "Union Budget structure"], hours: 7, pq: 40, revision: "Statistics mini-test" },
  { exam: "AFCAT", topics: ["Advanced Reasoning", "Science & Technology"], objectives: ["Data sufficiency", "Space missions"], hours: 7, pq: 40, revision: "5 DI sets" },
  { exam: "Both", topics: ["PYQ Analysis 2022", "Weak Area Revision"], objectives: ["Pattern identification", "Personalised revision"], hours: 7, pq: 40, revision: "PYQ error log" },
  { exam: "Both", topics: ["PYQ Analysis 2023", "Current Affairs Deep Dive"], objectives: ["Recent question patterns", "Important appointments"], hours: 7, pq: 40, revision: "Current affairs quiz" },
  { exam: "CDS", topics: ["Coordinate Geometry", "Post-Independence India"], objectives: ["Straight lines, circles", "Constitution drafting"], hours: 7, pq: 40, revision: "Graph practice" },
  { exam: "AFCAT", topics: ["Percentage & Ratio Advanced", "Sports & Awards"], objectives: ["Mixed P&R problems", "Arjuna, Khel Ratna"], hours: 7, pq: 40, revision: "30 mixed numericals" },
  { exam: "Both", topics: ["Half Mock Test CDS/AFCAT", "Review Session"], objectives: ["90-min timed test", "Error analysis"], hours: 5, pq: 60, revision: "Score analysis chart" },
]);

const p5 = buildPhase(121, 150, 5, "Revision & Mock Tests", [
  { exam: "CDS", topics: ["Full CDS Mock Test 1", "English Revision"], objectives: ["Complete paper in time", "Grammar accuracy >80%"], hours: 8, pq: 100, revision: "Detailed score review" },
  { exam: "AFCAT", topics: ["Full AFCAT Mock Test 1", "GA Revision"], objectives: ["Complete paper in time", "GA score >70%"], hours: 8, pq: 100, revision: "Topic-wise analysis" },
  { exam: "Both", topics: ["PYQ Marathon – History & Polity", "Vocab Blast"], objectives: ["50 PYQ each", "100 new words"], hours: 7, pq: 50, revision: "Quick MCQ practice" },
  { exam: "CDS", topics: ["Full CDS Mock Test 2", "Math Speed Drill"], objectives: ["Improve time per question", "1 min/question"], hours: 8, pq: 100, revision: "Compare Mock 1 vs 2" },
  { exam: "AFCAT", topics: ["Full AFCAT Mock Test 2", "Reasoning Speed Drill"], objectives: ["Improve accuracy", "Spatial ability 70%+"], hours: 8, pq: 100, revision: "Compare Mock 1 vs 2" },
  { exam: "Both", topics: ["PYQ Marathon – Science", "Formula Revision"], objectives: ["Science PYQ", "All formulae"], hours: 6, pq: 50, revision: "Science flashcards" },
  { exam: "Both", topics: ["Weekly Analysis", "Weak Topic Blast"], objectives: ["Identify improvement areas", "Target weakest subject"], hours: 5, pq: 60, revision: "Personalised plan update" },
]);

const p6 = buildPhase(151, 180, 6, "Final Revision", [
  { exam: "Both", topics: ["Full CDS Mock Test 3", "Quick GK Revision"], objectives: ["Target >65% accuracy", "GK last pass"], hours: 8, pq: 100, revision: "Review all errors" },
  { exam: "Both", topics: ["Full AFCAT Mock Test 3", "Vocabulary Final Drill"], objectives: ["Target >70% accuracy", "Top 200 words"], hours: 8, pq: 100, revision: "Review all errors" },
  { exam: "Both", topics: ["PYQ Marathon All Subjects", "Important Dates Revision"], objectives: ["PYQ final pass", "Key historical dates"], hours: 7, pq: 80, revision: "Date-event flashcards" },
  { exam: "Both", topics: ["Mental Maths & Speed", "SSB Prep Intro"], objectives: ["Calculate in 30 sec", "OIR, PPDT basics"], hours: 6, pq: 60, revision: "Speed calculation drill" },
  { exam: "Both", topics: ["Full Mock Test 4 (CDS)", "Current Affairs Final"], objectives: ["Peak performance test", "Last month CA"], hours: 8, pq: 100, revision: "Final score analysis" },
  { exam: "Both", topics: ["Full Mock Test 4 (AFCAT)", "Confidence Building"], objectives: ["Target highest score", "Positive mindset"], hours: 8, pq: 100, revision: "Review exam strategy" },
  { exam: "Both", topics: ["EXAM DAY PREP", "Final Revision Tips"], objectives: ["Documents, hall ticket", "Relaxation techniques"], hours: 3, pq: 20, revision: "Light revision only" },
]);

export const roadmapDays: RoadmapDay[] = [...p1, ...p2, ...p3, ...p4, ...p5, ...p6];
