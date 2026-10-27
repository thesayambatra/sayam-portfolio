import './Experience.css'

const experiences = [
  {
    role: 'YouTube Growth & Content Strategy',
    company: 'Unacademy',
    location: 'Bengaluru (Contractual)',
    period: 'Mar 2026 – Aug 2026',
    color: 'purple',
    emoji: '🎓',
    points: [
      'Managed 10+ YouTube channels and 5+ Instagram pages, overseeing content strategy, publishing, scheduling, and optimization.',
      'Led the JEE content team, coordinating and managing 5 interns to drive content production and channel growth.',
      'Collaborated with educators to develop engaging JEE content ideas, formats, and topics aligned with audience interests and emerging trends.',
      'Contributed to 40M+ views in July through strategic content planning, educator collaborations, and execution of high-performing JEE content.',
      'Managed video editing, thumbnails, captions, SEO, and publishing workflows for YouTube Shorts, Instagram Reels, and other short-form content.',
      'Analyzed content performance, engagement, and audience behavior to optimize strategies and improve reach.',
      'Contributed to 100M+ cumulative views across managed platforms through content strategy and growth initiatives.',
    ],
  },
  {
    role: 'YouTube & Creator Management',
    company: 'Freelance',
    location: '',
    period: 'Sep 2024 – Feb 2026',
    color: 'orange',
    emoji: '🎬',
    points: [
      'Managed YouTube channels and content for multiple creators.',
      'Handled video uploads, titles, descriptions, thumbnails, SEO, and publishing.',
      'Analysed YouTube Studio metrics: views, CTR, watch time, retention, subscriber growth.',
      'Researched content trends and helped improve channel performance.',
      'Edited videos using Adobe Premiere Pro and After Effects.',
    ],
  },
  {
    role: 'Content & Brand Manager',
    company: 'Vespa Home Appliances',
    location: '',
    period: 'Aug 2023 – Mar 2026',
    color: 'green',
    emoji: '🏠',
    points: [
      'Led full digital branding for Vespa — coolers, motors, and home appliances.',
      'Created AI videos, festival promos, and brand content for Instagram and YouTube.',
      'Managed Instagram and YouTube presence end-to-end.',
      'Assisted in digital e-catalogues for product lines.',
      'Shot and covered brand events, meetups, and product launches.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <h2 className="section-title">Work <span>Experience</span></h2>
        <p className="exp-intro">3 years of building, growing, and creating across platforms.</p>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <div key={i} className={`tl-item tl-${exp.color}`}>
              {/* Node */}
              <div className="tl-node">
                <span className="tl-emoji">{exp.emoji}</span>
              </div>

              {/* Card */}
              <div className="tl-card">
                <div className="tl-card-top">
                  <div>
                    <span className={`tl-period tl-period-${exp.color}`}>{exp.period}</span>
                    <h3 className="tl-role">{exp.role}</h3>
                    <p className="tl-company">
                      {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                    </p>
                  </div>
                </div>
                <ul className="tl-points">
                  {exp.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Journey start */}
          <div className="tl-start">
            <div className="tl-start-dot" />
            <span className="tl-start-label">Journey Begins · 2023</span>
          </div>
        </div>
      </div>
    </section>
  )
}
