import type { Question } from "./questions";

export interface MockTest {
  id: string;
  title: string;
  exam: "CDS" | "AFCAT" | "Subject" | "Chapter";
  type: "full" | "subject" | "chapter" | "pyq";
  duration: number; // minutes
  totalQuestions: number;
  sections: { name: string; questions: number; subject: string }[];
  negativeMarking: number; // fraction deducted per wrong answer
  instructions: string[];
}

export const mockTests: MockTest[] = [
  {
    id: "cds-full-1",
    title: "CDS Full Mock Test 1",
    exam: "CDS",
    type: "full",
    duration: 180,
    totalQuestions: 300,
    sections: [
      { name: "English", questions: 100, subject: "English" },
      { name: "General Knowledge", questions: 100, subject: "General Knowledge" },
      { name: "Elementary Mathematics", questions: 100, subject: "Elementary Mathematics" },
    ],
    negativeMarking: 0.33,
    instructions: [
      "Total duration: 3 hours (60 min per section)",
      "Each correct answer: +1 mark",
      "Each wrong answer: -1/3 mark",
      "Unattempted questions: 0 marks",
      "Do not use calculators",
      "Use rough work space provided",
    ],
  },
  {
    id: "cds-ota-1",
    title: "CDS OTA Mock Test 1",
    exam: "CDS",
    type: "full",
    duration: 120,
    totalQuestions: 200,
    sections: [
      { name: "English", questions: 100, subject: "English" },
      { name: "General Knowledge", questions: 100, subject: "General Knowledge" },
    ],
    negativeMarking: 0.33,
    instructions: [
      "OTA: Only English and GK papers",
      "Total duration: 2 hours",
      "Each correct answer: +1 mark",
      "Each wrong answer: -1/3 mark",
    ],
  },
  {
    id: "afcat-full-1",
    title: "AFCAT Full Mock Test 1",
    exam: "AFCAT",
    type: "full",
    duration: 120,
    totalQuestions: 100,
    sections: [
      { name: "General Awareness", questions: 25, subject: "General Awareness" },
      { name: "Verbal Ability", questions: 20, subject: "Verbal Ability in English" },
      { name: "Numerical Ability", questions: 18, subject: "Numerical Ability" },
      { name: "Reasoning & Military Aptitude", questions: 37, subject: "Reasoning & Military Aptitude" },
    ],
    negativeMarking: 1,
    instructions: [
      "Total duration: 2 hours",
      "Each correct answer: +3 marks",
      "Each wrong answer: -1 mark",
      "Total marks: 300",
      "Candidates must attempt all sections",
    ],
  },
  {
    id: "cds-english-sub",
    title: "CDS English Subject Test",
    exam: "CDS",
    type: "subject",
    duration: 60,
    totalQuestions: 50,
    sections: [{ name: "English", questions: 50, subject: "English" }],
    negativeMarking: 0.33,
    instructions: ["Subject-specific test", "Duration: 60 minutes", "Negative marking: 1/3"],
  },
  {
    id: "afcat-ga-sub",
    title: "AFCAT General Awareness Test",
    exam: "AFCAT",
    type: "subject",
    duration: 45,
    totalQuestions: 25,
    sections: [{ name: "General Awareness", questions: 25, subject: "General Awareness" }],
    negativeMarking: 1,
    instructions: ["Subject-specific test", "Duration: 45 minutes", "+3 for correct, -1 for wrong"],
  },
];
