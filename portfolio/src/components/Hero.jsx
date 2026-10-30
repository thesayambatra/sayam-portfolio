import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* bg orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="container hero-inner">
        {/* LEFT */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Available for Work
          </div>

          <h1 className="hero-name">
            Sayam<br />
            <span className="hero-name-accent">Batra.</span>
          </h1>

          <p className="hero-title">
            YouTube Growth · <strong>Creator Management</strong> · Video Editing
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num stat-red">100M+</div>
              <div className="hero-stat-label">Cumulative Views</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-num stat-purple">10+</div>
              <div className="hero-stat-label">Channels Managed</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-num stat-green">40M+</div>
              <div className="hero-stat-label">Views/Month</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-num stat-orange">3yrs</div>
              <div className="hero-stat-label">Experience</div>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Let's Work Together</a>
            <a href="#editing" className="btn-secondary">↓ See My Work</a>
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="hero-photo-wrap">
          <div className="hero-photo-bg" />
          <div className="hero-photo-ring" />
          <div className="hero-photo-container">
            <img src="/profile-1.png" alt="Sayam Batra" className="hero-photo" />
          </div>
          <div className="hero-chips">
            <div className="hero-chip chip-1">🎬 Premiere Pro</div>
            <div className="hero-chip chip-2">📊 Analytics</div>
            <div className="hero-chip chip-3">🔍 YouTube SEO</div>
            <div className="hero-chip chip-4">🤖 AI Tools</div>
          </div>
        </div>
      </div>
    </section>
  )
}
