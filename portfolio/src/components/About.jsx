import './About.css'

const hobbies = ['Research', 'Logic Puzzles', 'Kho-Kho', 'Badminton', 'Cricket', 'Fitness', 'Video Editing', 'Graphic Design']
const languages = ['Hindi', 'English', 'French']

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <h2 className="section-title">About <span>Me</span></h2>
        <div className="bento">

          <div className="bento-card bento-bio">
            <div className="bento-label">Bio</div>
            <p>BCA student at Christ University, Delhi NCR. I live at the intersection of content, data, and creativity — helping creators and educators grow on YouTube through SEO-backed strategies, sharp edits, and analytics-driven decisions.</p>
            <p style={{marginTop:'12px'}}>At Unacademy I managed 10+ channels and contributed to <strong>100M+ cumulative views</strong>. Outside that I work directly with independent creators on everything from thumbnails to full channel strategy.</p>
          </div>

          <div className="bento-card bento-edu">
            <div className="bento-label">Education</div>
            <div className="edu-degree">BCA</div>
            <div className="edu-school">Christ University</div>
            <div className="edu-loc">Delhi NCR Campus</div>
            <div className="edu-years">2023 → 2026</div>
          </div>

          <div className="bento-card bento-langs">
            <div className="bento-label">Languages</div>
            <div className="lang-list">
              {languages.map(l => (
                <div key={l} className="lang-item">{l}</div>
              ))}
            </div>
          </div>

          <div className="bento-card bento-hobbies">
            <div className="bento-label">Hobbies & Interests</div>
            <div className="tag-group">
              {hobbies.map(h => <span key={h} className="tag">{h}</span>)}
            </div>
          </div>

          <div className="bento-card bento-stat bento-stat-red">
            <div className="bento-big-num">18M</div>
            <div className="bento-stat-desc">Highest single video views</div>
          </div>

          <div className="bento-card bento-stat bento-stat-green">
            <div className="bento-big-num">5+</div>
            <div className="bento-stat-desc">Instagram pages managed</div>
          </div>

        </div>
      </div>
    </section>
  )
}
