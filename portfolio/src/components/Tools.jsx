import './Tools.css'

const tools = [
  { name: 'Premiere Pro', icon: '🎬', color: 'purple' },
  { name: 'After Effects', icon: '✨', color: 'purple' },
  { name: 'YouTube Studio', icon: '▶️', color: 'red' },
  { name: 'ChatGPT', icon: '🤖', color: 'green' },
  { name: 'Gemini', icon: '💎', color: 'blue' },
  { name: 'GitHub Copilot', icon: '🐙', color: 'dark' },
  { name: 'Power BI', icon: '📊', color: 'orange' },
  { name: 'Python', icon: '🐍', color: 'green' },
  { name: 'SQL', icon: '🗄️', color: 'blue' },
  { name: 'Excel', icon: '📗', color: 'green' },
  { name: 'Instagram', icon: '📸', color: 'pink' },
  { name: 'Canva', icon: '🎨', color: 'purple' },
]

export default function Tools() {
  return (
    <section id="tools" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <h2 className="section-title">Tools & <span>Software</span></h2>
        <div className="tools-grid">
          {tools.map((t, i) => (
            <div key={i} className={`tool-card tool-${t.color}`}>
              <span className="tool-icon">{t.icon}</span>
              <span className="tool-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
