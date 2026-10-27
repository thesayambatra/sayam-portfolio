import './CtaBanner.css'

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-inner">
        <div className="cta-glow" />
        <p className="cta-eyebrow">Open to opportunities</p>
        <h2 className="cta-heading">Let's build something<br /><span>great together.</span></h2>
        <p className="cta-sub">Whether it's growing a YouTube channel, creating content, or building a brand — I'm ready.</p>
        <div className="cta-actions">
          <a href="mailto:sayambatra20@gmail.com" className="btn-primary">Email Me</a>
          <a href="tel:+917840025266" className="btn-secondary">Call Me</a>
        </div>
      </div>
    </section>
  )
}
