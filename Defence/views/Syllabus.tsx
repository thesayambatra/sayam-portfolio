"use client";
import { useState } from "react";
import { CheckCircle, Circle, ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { cdsSyllabus, afcatSyllabus } from "@/lib/data/syllabus";
import { useProgress } from "@/lib/store/progressStore";
import { ProgressBar, SectionHeading } from "@/components/ui";
import { pct } from "@/lib/utils";

export default function Syllabus() {
  const { topicsCompleted, completeTopic, uncompleteTopic, notes, saveNote } = useProgress();
  const [tab, setTab] = useState<"CDS" | "AFCAT" | "OTA">("CDS");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const syllabus = tab === "AFCAT" ? afcatSyllabus : cdsSyllabus;

  const getSubjectProgress = (subject: (typeof cdsSyllabus)[0]) => {
    const done = subject.topics.filter((t) => topicsCompleted.includes(t.id)).length;
    return pct(done, subject.topics.length);
  };

  const toggleTopic = (id: string) => {
    if (topicsCompleted.includes(id)) uncompleteTopic(id);
    else completeTopic(id);
  };

  const startEditNote = (topicId: string) => {
    setEditingNote(topicId);
    setNoteText(notes[topicId] ?? "");
  };

  const totalTopics = syllabus.flatMap((s) => s.topics).length;
  const completedTopics = syllabus.flatMap((s) => s.topics).filter((t) => topicsCompleted.includes(t.id)).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading
        title="Syllabus Tracker"
        sub="Mark topics complete as you study. Track your progress per subject."
        right={
          <div className="text-right">
            <div className="text-2xl font-bold text-gold-400">{pct(completedTopics, totalTopics)}%</div>
            <div className="text-xs text-white/50">{completedTopics}/{totalTopics} topics done</div>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["CDS", "AFCAT", "OTA"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? "bg-gold-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {t === "OTA" ? "CDS OTA Track" : t}
          </button>
        ))}
      </div>

      {/* OTA Note */}
      {tab === "OTA" && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
          <strong>OTA (Officers Training Academy)</strong> – CDS OTA examination includes only <strong>English</strong> and <strong>General Knowledge</strong> papers. No Mathematics paper.
          Use the CDS English and GK subjects below for OTA preparation.
        </div>
      )}

      {/* Overall bar */}
      <div className="card py-4">
        <div className="flex justify-between text-xs text-white/60 mb-2">
          <span>{tab} Syllabus Completion</span>
          <span>{completedTopics}/{totalTopics} topics</span>
        </div>
        <ProgressBar value={pct(completedTopics, totalTopics)} />
      </div>

      {/* Subjects */}
      <div className="space-y-3">
        {(tab === "OTA" ? cdsSyllabus.filter((s) => s.id !== "cds-math") : syllabus).map((subject) => {
          const prog = getSubjectProgress(subject);
          const isExpanded = expandedSubject === subject.id;
          return (
            <div key={subject.id} className="card border border-white/5 overflow-hidden">
              {/* Subject header */}
              <button
                className="w-full flex items-center gap-4 text-left"
                onClick={() => setExpandedSubject(isExpanded ? null : subject.id)}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${subject.color}20` }}>
                  <BookOpen size={18} style={{ color: subject.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white">{subject.subject}</div>
                  <div className="text-xs text-white/50">{subject.topics.length} topics</div>
                </div>
                <div className="w-20 text-right mr-3">
                  <ProgressBar value={prog} color={subject.color} height={5} />
                  <div className="text-xs text-white/50 mt-1">{prog}%</div>
                </div>
                {isExpanded ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
              </button>

              {/* Topics */}
              {isExpanded && (
                <div className="mt-4 border-t border-white/5 pt-4 space-y-2">
                  {subject.topics.map((topic) => {
                    const done = topicsCompleted.includes(topic.id);
                    const topicExpanded = expandedTopic === topic.id;
                    return (
                      <div key={topic.id} className="rounded-lg bg-navy-900/50 overflow-hidden">
                        <div
                          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-navy-900 transition-colors"
                          onClick={() => setExpandedTopic(topicExpanded ? null : topic.id)}
                        >
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleTopic(topic.id); }}
                            className={`flex-shrink-0 ${done ? "text-green-400" : "text-white/30 hover:text-white/60"}`}
                          >
                            {done ? <CheckCircle size={18} /> : <Circle size={18} />}
                          </button>
                          <span className={`text-sm flex-1 ${done ? "line-through text-white/40" : "text-white/80"}`}>{topic.title}</span>
                          <span className={`diff-${topic.difficulty}`}>{topic.difficulty}</span>
                          {topicExpanded ? <ChevronDown size={14} className="text-white/30" /> : <ChevronRight size={14} className="text-white/30" />}
                        </div>
                        {topicExpanded && (
                          <div className="px-4 pb-3 space-y-3">
                            <div className="flex flex-wrap gap-1.5">
                              {topic.subtopics.map((s, i) => (
                                <span key={i} className="text-xs bg-navy-800 border border-white/10 rounded px-2 py-0.5 text-white/60">{s}</span>
                              ))}
                            </div>
                            {/* Notes */}
                            {editingNote === topic.id ? (
                              <div>
                                <textarea
                                  className="input-field w-full text-xs h-20 resize-none"
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  placeholder="Add your notes here..."
                                />
                                <div className="flex gap-2 mt-2">
                                  <button onClick={() => { saveNote(topic.id, noteText); setEditingNote(null); }} className="btn-gold text-xs">Save</button>
                                  <button onClick={() => setEditingNote(null)} className="btn-outline text-xs">Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                {notes[topic.id] && <div className="text-xs text-white/50 bg-navy-800 rounded p-2 mb-2">{notes[topic.id]}</div>}
                                <button onClick={() => startEditNote(topic.id)} className="text-xs text-gold-400 hover:text-gold-300">
                                  {notes[topic.id] ? "Edit note" : "+ Add notes"}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
