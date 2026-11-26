export type Difficulty = "easy" | "medium" | "hard";
export type Exam = "CDS" | "AFCAT" | "Both";

export interface Question {
  id: string;
  exam: Exam;
  subject: string;
  topic: string;
  year?: number;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
  bookmarked?: boolean;
  attempted?: boolean;
  userAnswer?: number;
}

export const questionBank: Question[] = [
  // ───── CDS ENGLISH ─────
  {
    id: "q-en-1", exam: "CDS", subject: "English", topic: "Grammar", year: 2023, difficulty: "medium",
    question: "Choose the correct form of the verb: 'Neither the students nor the teacher _____ present.'",
    options: ["were", "are", "was", "been"],
    correct: 2,
    explanation: "When 'neither...nor' joins a singular and plural subject, the verb agrees with the closer subject. 'Teacher' is singular, so 'was' is correct."
  },
  {
    id: "q-en-2", exam: "CDS", subject: "English", topic: "Vocabulary", year: 2022, difficulty: "easy",
    question: "Find the synonym of 'TENACIOUS'.",
    options: ["Weak", "Persistent", "Careless", "Temporary"],
    correct: 1,
    explanation: "'Tenacious' means persistent, determined, not easily giving up. 'Persistent' is the correct synonym."
  },
  {
    id: "q-en-3", exam: "CDS", subject: "English", topic: "Comprehension", year: 2023, difficulty: "hard",
    question: "Identify the error: 'He insisted on me (A) / going there (B) / to attend (C) / the meeting. (D)'",
    options: ["A", "B", "C", "D"],
    correct: 0,
    explanation: "After 'insist on', a gerund (V+ing) should follow. The correct form is 'He insisted on my going there.' The pronoun before a gerund should be possessive — 'my' not 'me'."
  },
  {
    id: "q-en-4", exam: "CDS", subject: "English", topic: "Idioms", year: 2021, difficulty: "medium",
    question: "What does 'bite the bullet' mean?",
    options: ["To eat something hard", "To endure a painful situation with courage", "To shoot someone", "To refuse a task"],
    correct: 1,
    explanation: "'Bite the bullet' means to endure a difficult situation with courage, originally referring to biting a bullet during surgery without anaesthesia."
  },
  {
    id: "q-en-5", exam: "CDS", subject: "English", topic: "Sentence Improvement", year: 2022, difficulty: "medium",
    question: "Improve the sentence: 'He is senior than me by three years.'",
    options: ["He is more senior than me by three years.", "He is senior to me by three years.", "He is senior than me by three years.", "He is senior from me by three years."],
    correct: 1,
    explanation: "'Senior', 'junior', 'superior', 'inferior', 'elder' take 'to' (not 'than'). Correct: 'senior to me'."
  },

  // ───── CDS GK ─────
  {
    id: "q-gk-1", exam: "CDS", subject: "General Knowledge", topic: "History", year: 2023, difficulty: "medium",
    question: "The 'Doctrine of Lapse' was introduced by which Governor-General?",
    options: ["Lord Dalhousie", "Lord Cornwallis", "Lord Curzon", "Lord Wellesley"],
    correct: 0,
    explanation: "The Doctrine of Lapse was introduced by Lord Dalhousie (1848–1856). Under this policy, any princely state without a natural heir would be annexed by the British."
  },
  {
    id: "q-gk-2", exam: "CDS", subject: "General Knowledge", topic: "Polity", year: 2022, difficulty: "hard",
    question: "Which Article of the Indian Constitution deals with the Right to Constitutional Remedies?",
    options: ["Article 19", "Article 21", "Article 32", "Article 44"],
    correct: 2,
    explanation: "Article 32 gives the right to move the Supreme Court for enforcement of Fundamental Rights. Dr. Ambedkar called it the 'Heart and Soul of the Constitution'."
  },
  {
    id: "q-gk-3", exam: "CDS", subject: "General Knowledge", topic: "Geography", year: 2023, difficulty: "medium",
    question: "Which is the longest river in India?",
    options: ["Brahmaputra", "Ganga", "Godavari", "Yamuna"],
    correct: 1,
    explanation: "The Ganga (2,525 km) is the longest river in India, flowing from Gangotri Glacier to the Bay of Bengal."
  },
  {
    id: "q-gk-4", exam: "CDS", subject: "General Knowledge", topic: "Defence", year: 2023, difficulty: "hard",
    question: "Operation Vijay (1999) was associated with which conflict?",
    options: ["Bangladesh Liberation War", "Kargil War", "Operation Bluestar", "Siachen Conflict"],
    correct: 1,
    explanation: "Operation Vijay was the Indian Army's operation to recapture the Kargil heights from Pakistani intruders in 1999, culminating in a decisive Indian victory."
  },
  {
    id: "q-gk-5", exam: "CDS", subject: "General Knowledge", topic: "Physics", year: 2022, difficulty: "easy",
    question: "What is the SI unit of electric current?",
    options: ["Volt", "Watt", "Ampere", "Ohm"],
    correct: 2,
    explanation: "The SI unit of electric current is the Ampere (A), named after the French physicist André-Marie Ampère."
  },
  {
    id: "q-gk-6", exam: "CDS", subject: "General Knowledge", topic: "Economics", year: 2021, difficulty: "medium",
    question: "Which body is responsible for conducting monetary policy in India?",
    options: ["Ministry of Finance", "SEBI", "Reserve Bank of India", "NITI Aayog"],
    correct: 2,
    explanation: "The Reserve Bank of India (RBI) is the central bank and monetary authority of India, responsible for regulating the money supply and credit system."
  },

  // ───── CDS MATHEMATICS ─────
  {
    id: "q-math-1", exam: "CDS", subject: "Elementary Mathematics", topic: "Arithmetic", year: 2023, difficulty: "medium",
    question: "A train 240 m long passes a pole in 24 seconds. What is its speed in km/h?",
    options: ["36 km/h", "48 km/h", "54 km/h", "60 km/h"],
    correct: 0,
    explanation: "Speed = Distance / Time = 240/24 = 10 m/s. Converting: 10 × 18/5 = 36 km/h."
  },
  {
    id: "q-math-2", exam: "CDS", subject: "Elementary Mathematics", topic: "Algebra", year: 2022, difficulty: "hard",
    question: "If x + 1/x = 5, what is the value of x² + 1/x²?",
    options: ["23", "25", "27", "21"],
    correct: 0,
    explanation: "(x + 1/x)² = x² + 2 + 1/x². So x² + 1/x² = 25 – 2 = 23."
  },
  {
    id: "q-math-3", exam: "CDS", subject: "Elementary Mathematics", topic: "Trigonometry", year: 2023, difficulty: "hard",
    question: "What is the value of sin 30° + cos 60°?",
    options: ["0", "1", "√2", "2"],
    correct: 1,
    explanation: "sin 30° = 1/2 and cos 60° = 1/2. Therefore sin 30° + cos 60° = 1/2 + 1/2 = 1."
  },
  {
    id: "q-math-4", exam: "CDS", subject: "Elementary Mathematics", topic: "Geometry", year: 2021, difficulty: "medium",
    question: "The sum of all interior angles of a hexagon is:",
    options: ["540°", "630°", "720°", "810°"],
    correct: 2,
    explanation: "Sum of interior angles = (n – 2) × 180°. For hexagon (n = 6): (6 – 2) × 180° = 720°."
  },
  {
    id: "q-math-5", exam: "CDS", subject: "Elementary Mathematics", topic: "Mensuration", year: 2022, difficulty: "medium",
    question: "The volume of a cylinder with radius 7 cm and height 10 cm is:",
    options: ["1540 cm³", "1240 cm³", "1420 cm³", "1340 cm³"],
    correct: 0,
    explanation: "Volume = πr²h = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 70 = 1540 cm³."
  },

  // ───── AFCAT ─────
  {
    id: "q-af-1", exam: "AFCAT", subject: "General Awareness", topic: "Indian Air Force", year: 2023, difficulty: "hard",
    question: "What is the motto of the Indian Air Force?",
    options: ["Nabha Sprisham Diptam", "Sare Jahan Se Accha", "Service Before Self", "Jai Hind"],
    correct: 0,
    explanation: "'Nabha Sprisham Diptam' means 'Touch the sky with glory' — a phrase from the Bhagavad Gita (Chapter 11, Verse 24). It is the official motto of the Indian Air Force."
  },
  {
    id: "q-af-2", exam: "AFCAT", subject: "Verbal Ability in English", topic: "Vocabulary", year: 2022, difficulty: "medium",
    question: "Choose the word most similar in meaning to 'LACONIC'.",
    options: ["Verbose", "Concise", "Humorous", "Sorrowful"],
    correct: 1,
    explanation: "'Laconic' means using very few words. 'Concise' is the best synonym. 'Verbose' is the antonym."
  },
  {
    id: "q-af-3", exam: "AFCAT", subject: "Numerical Ability", topic: "Percentage", year: 2023, difficulty: "easy",
    question: "What percentage of 80 is 20?",
    options: ["15%", "20%", "25%", "30%"],
    correct: 2,
    explanation: "(20/80) × 100 = 25%. So 20 is 25% of 80."
  },
  {
    id: "q-af-4", exam: "AFCAT", subject: "Reasoning & Military Aptitude", topic: "Analogies", year: 2022, difficulty: "medium",
    question: "Wing Commander is to Squadron Leader as Brigadier is to:",
    options: ["Major General", "Colonel", "Lieutenant Colonel", "Captain"],
    correct: 1,
    explanation: "Wing Commander is one rank above Squadron Leader in the IAF. Similarly, Brigadier is one rank above Colonel in the Indian Army."
  },
  {
    id: "q-af-5", exam: "AFCAT", subject: "General Awareness", topic: "Defence", year: 2023, difficulty: "hard",
    question: "Which fighter aircraft is a product of the DRDO's Light Combat Aircraft programme?",
    options: ["Mirage 2000", "Sukhoi Su-30MKI", "HAL Tejas", "Jaguar"],
    correct: 2,
    explanation: "The HAL Tejas (meaning 'Radiance' in Sanskrit) is India's indigenously developed Light Combat Aircraft (LCA), developed by the Aeronautical Development Agency under DRDO."
  },
  {
    id: "q-af-6", exam: "AFCAT", subject: "Numerical Ability", topic: "Time & Work", year: 2022, difficulty: "medium",
    question: "A can do a piece of work in 10 days and B in 15 days. In how many days can they do it together?",
    options: ["5 days", "6 days", "8 days", "12 days"],
    correct: 1,
    explanation: "A's rate = 1/10, B's rate = 1/15. Combined = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. Time = 6 days."
  },
  {
    id: "q-af-7", exam: "AFCAT", subject: "Reasoning & Military Aptitude", topic: "Spatial Ability", year: 2023, difficulty: "hard",
    question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correct: 1,
    explanation: "At 3:15, minute hand = 90°. Hour hand moves 0.5°/min; at 3:15 it's at 90° + 7.5° = 97.5°. Angle = 97.5° – 90° = 7.5°."
  },
  {
    id: "q-af-8", exam: "AFCAT", subject: "General Awareness", topic: "Sports", year: 2022, difficulty: "easy",
    question: "Which Indian woman became the first to win a boxing World Championship title?",
    options: ["Saina Nehwal", "P.V. Sindhu", "Mary Kom", "Dipa Karmakar"],
    correct: 2,
    explanation: "Mary Kom became the first Indian woman to win the World Amateur Boxing Championship, winning her first title in 2002 and subsequently winning 6 World Championship gold medals."
  },

  // ───── CDS OTA TRACK ─────
  {
    id: "q-ota-1", exam: "CDS", subject: "English", topic: "OTA Track", year: 2023, difficulty: "medium",
    question: "OTA: Select the best alternative: 'The committee ___ their decision.'",
    options: ["have announced", "has announced", "announced", "are announcing"],
    correct: 1,
    explanation: "In formal British English (used in Indian exams), collective nouns like 'committee' take a singular verb. 'Has announced' is correct."
  },
];
