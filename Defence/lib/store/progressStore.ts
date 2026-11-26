"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TestResult {
  testId: string;
  date: string;
  score: number;
  total: number;
  timeTaken: number; // seconds
  subjectScores: Record<string, { correct: number; wrong: number; unattempted: number }>;
}

export interface StudySession {
  date: string;
  hours: number;
  subject: string;
}

export interface ProgressState {
  // User profile
  name: string;
  exam: "CDS" | "AFCAT" | "Both";
  targetDate: string;
  dailyGoalHours: number;
  streakDays: number;
  lastStudyDate: string;

  // Progress
  topicsCompleted: string[]; // topic IDs
  roadmapCompleted: number[]; // day numbers
  bookmarkedQuestions: string[];
  testResults: TestResult[];
  studySessions: StudySession[];
  totalStudyHours: number;
  notes: Record<string, string>; // topicId -> note
  darkMode: boolean;
  notificationsEnabled: boolean;

  // Actions
  setProfile: (name: string, exam: "CDS" | "AFCAT" | "Both", targetDate: string) => void;
  completeTopic: (id: string) => void;
  uncompleteTopic: (id: string) => void;
  completeRoadmapDay: (day: number) => void;
  uncompleteRoadmapDay: (day: number) => void;
  bookmarkQuestion: (id: string) => void;
  unbookmarkQuestion: (id: string) => void;
  addTestResult: (result: TestResult) => void;
  addStudySession: (session: StudySession) => void;
  saveNote: (topicId: string, note: string) => void;
  toggleDarkMode: () => void;
  setDailyGoal: (hours: number) => void;
  updateStreak: () => void;
}

// Lightweight zustand store with localStorage persistence
// For production, replace persist storage with a Supabase adapter
export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      name: "Cadet",
      exam: "Both",
      targetDate: "2025-11-01",
      dailyGoalHours: 5,
      streakDays: 0,
      lastStudyDate: "",
      topicsCompleted: [],
      roadmapCompleted: [],
      bookmarkedQuestions: [],
      testResults: [],
      studySessions: [],
      totalStudyHours: 0,
      notes: {},
      darkMode: true,
      notificationsEnabled: true,

      setProfile: (name, exam, targetDate) => set({ name, exam, targetDate }),
      completeTopic: (id) => set((s) => ({ topicsCompleted: s.topicsCompleted.includes(id) ? s.topicsCompleted : [...s.topicsCompleted, id] })),
      uncompleteTopic: (id) => set((s) => ({ topicsCompleted: s.topicsCompleted.filter((t) => t !== id) })),
      completeRoadmapDay: (day) => set((s) => ({ roadmapCompleted: s.roadmapCompleted.includes(day) ? s.roadmapCompleted : [...s.roadmapCompleted, day] })),
      uncompleteRoadmapDay: (day) => set((s) => ({ roadmapCompleted: s.roadmapCompleted.filter((d) => d !== day) })),
      bookmarkQuestion: (id) => set((s) => ({ bookmarkedQuestions: s.bookmarkedQuestions.includes(id) ? s.bookmarkedQuestions : [...s.bookmarkedQuestions, id] })),
      unbookmarkQuestion: (id) => set((s) => ({ bookmarkedQuestions: s.bookmarkedQuestions.filter((q) => q !== id) })),
      addTestResult: (result) => set((s) => ({ testResults: [result, ...s.testResults].slice(0, 50) })),
      addStudySession: (session) => set((s) => ({ studySessions: [session, ...s.studySessions].slice(0, 200), totalStudyHours: s.totalStudyHours + session.hours })),
      saveNote: (topicId, note) => set((s) => ({ notes: { ...s.notes, [topicId]: note } })),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setDailyGoal: (hours) => set({ dailyGoalHours: hours }),
      updateStreak: () => {
        const today = new Date().toISOString().split("T")[0];
        const { lastStudyDate, streakDays } = get();
        if (lastStudyDate === today) return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        set({ lastStudyDate: today, streakDays: lastStudyDate === yesterday ? streakDays + 1 : 1 });
      },
    }),
    { name: "defenceprep-progress" }
  )
);
