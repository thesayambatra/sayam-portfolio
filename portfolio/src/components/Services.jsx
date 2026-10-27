import './Services.css'

const services = [
  {
    icon: '📈',
    title: 'YouTube Channel Growth',
    color: 'red',
    points: ['SEO-optimised titles & descriptions', 'Thumbnail strategy', 'Analytics-driven decisions', 'Trend research & content calendar'],
  },
  {
    icon: '🎬',
    title: 'Video Editing',
    color: 'purple',
    points: ['Short-form: Reels, Shorts, TikTok', 'Long-form YouTube videos', 'Motion graphics & AE effects', 'Colour grading & audio sync'],
  },
  {
    icon: '🧠',
    title: 'Content Strategy',
    color: 'green',
    points: ['Niche & audience research', 'Content formats & ideation', 'Publishing schedules', 'Engagement & retention tactics'],
  },
  {
    icon: '🏷️',
    title: 'Brand Building',
    color: 'orange',
    points: ['Social media presence setup', 'Festival & promo creatives', 'AI-generated brand videos', 'Digital catalogues & event shoots'],
  },
  {
    icon: '📊',
    title: 'Analytics & Reporting',
    color: 'purple',
    points: ['YouTube Studio deep-dives', 'CTR, watch time & retention', 'Power BI dashboards', 'Monthly performance reports'],
  },
  {
    icon: '🤝',
    title: 'Creator Management',
    color: 'green',
    points: ['End-to-end channel management', 'Educator & creator collaboration', 'Team coordination & intern management', 'Multi-platform growth'],
  },
]

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <h2 className="section-title">What I <span>Offer</span></h2>
        <p className="services-sub">Services I provide to creators, educators, and brands.</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card service-${s.color}`}>
              <div className="service-top">
                <span className="service-icon">{s.icon}</span>
                <h3 className="service-title">{s.title}</h3>
              </div>
              <ul className="service-points">
                {s.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
