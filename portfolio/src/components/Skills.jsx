import './Skills.css'

const skillGroups = [
  { category: 'Social Media & Content', color: 'purple', skills: ['YouTube', 'Instagram', 'YouTube SEO', 'Content Strategy', 'Analytics', 'Audience Insights'] },
  { category: 'Video Editing',          color: 'red',    skills: ['Adobe Premiere Pro', 'After Effects', 'Short-form Editing', 'YouTube Shorts', 'Reels'] },
  { category: 'Data & Analytics',       color: 'green',  skills: ['SQL', 'Python', 'Excel', 'Power BI', 'YouTube Studio'] },
  { category: 'AI Tools',               color: 'orange', skills: ['ChatGPT', 'Gemini', 'GitHub Copilot'] },
  { category: 'Soft Skills',            color: 'purple', skills: ['Problem-Solving', 'Logical Thinking', 'Communication', 'Teamwork'] },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">My <span>Skills</span></h2>
        <div className="skills-bento">
          {skillGroups.map((g, i) => (
            <div key={i} className={`skill-block skill-${g.color}`}>
              <div className="skill-block-title">{g.category}</div>
              <div className="skill-tags">
                {g.skills.map(s => <span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
