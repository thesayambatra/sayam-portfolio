import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-inner">
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
            <div>
              <div className="hero-stat-num stat-red">100M+</div>
              <div className="hero-stat-label">Cumulative Views</div>
            </div>
            <div>
              <div className="hero-stat-num stat-purple">10+</div>
              <div className="hero-stat-label">Channels Managed</div>
            </div>
            <div>
              <div className="hero-stat-num stat-green">40M+</div>
              <div className="hero-stat-label">Views in a Month</div>
            </div>
            <div>
              <div className="hero-stat-num stat-orange">3yrs</div>
              <div className="hero-stat-label">Experience</div>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Let's Work Together</a>
            <a href="#editing" className="btn-secondary">See My Work</a>
          </div>
        </div>

        {/* Profile image */}
        <div className="hero-photo-wrap">
          <div className="hero-photo-glow" />
          <div className="hero-photo-ring" />
          <img
            src="/profile.png"
            alt="Sayam Batra"
            className="hero-photo"
          />
          <div className="hero-photo-chips">
            <div className="hero-chip">🎬 Adobe Premiere Pro</div>
            <div className="hero-chip">📊 YouTube Analytics</div>
            <div className="hero-chip">🔍 YouTube SEO</div>
            <div className="hero-chip">🤖 AI Tools</div>
          </div>
        </div>
      </div>
    </section>
  )
}
